defmodule ProjetZWeb.ClockController do
  use ProjetZWeb, :controller

  alias ProjetZ.Clocks
  alias ProjetZ.Clocks.Clock
  alias ProjetZ.Works
  alias ProjetZ.Works.WorkingTime

  action_fallback(ProjetZWeb.FallbackController)

  def index(conn, %{"userID" => user_id}) do
    clocks = Clocks.list_clocks_for_user(user_id)

    if Enum.empty?(clocks) do
      conn
      |> put_status(:not_found)
      |> json(%{error: "No clocks found for this user"})
    else
      render(conn, "index.json", clocks: clocks)
    end
  end

  def get_all_clocks(conn, _params) do
    clocks = ProjetZ.Clocks.list_clocks()

    if Enum.empty?(clocks) do
      conn
      |> put_status(:not_found)
      |> json(%{error: "No clocks found in database"})
    else
      render(conn, "index.json", clocks: clocks)
    end
  end

  def create(conn, %{"userID" => user_id}) do
    existing_clock = Clocks.get_clock_by_user_id(user_id)

    case existing_clock do
      nil ->
        # Créer une nouvelle entrée avec status = true
        create_new_clock(conn, %{
          "user_id" => user_id,
          "time" => DateTime.utc_now(),
          "status" => true
        })

      %Clock{} = clock ->
        # Mettre à jour l'entrée existante en basculant le status et en mettant à jour le time
        update_clock(conn, clock)
    end
  end

  defp create_new_clock(conn, params) do
    with {:ok, %Clock{} = new_clock} <- Clocks.create_clock(params) do
      conn
      |> put_status(:created)
      |> render("show.json", clock: new_clock)
    else
      {:error, %Ecto.Changeset{} = changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(YourAppWeb.ChangesetView, "error.json", changeset: changeset)
    end
  end

  defp update_clock(conn, clock) do
    updated_params = %{
      "status" => not clock.status,
      "time" => DateTime.utc_now()
    }

    case Clocks.update_clock(clock, updated_params) do
      {:ok, %Clock{} = updated_clock} ->
        if not updated_clock.status do
          create_working_time_for_clock(conn, clock.time, DateTime.utc_now(), clock.user_id)
        end

        conn
        |> put_status(:ok)
        |> render("show.json", clock: updated_clock)

      {:error, %Ecto.Changeset{} = changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(YourAppWeb.ChangesetView, "error.json", changeset: changeset)
    end
  end

  defp create_working_time_for_clock(conn, start_time, end_time, user_id) do
    working_time_params = %{
      "user_id" => user_id,
      "start_time" => start_time,
      "end_time" => end_time
    }

    with {:ok, %WorkingTime{} = working_time} <- Works.create_working_time(working_time_params) do
      IO.puts("WorkingTime created successfully")
    else
      {:error, changeset} ->
        IO.puts("Failed to create WorkingTime: #{inspect(changeset)}")
    end

    conn
  end
end
