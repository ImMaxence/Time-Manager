defmodule ProjetZWeb.WorkingTimeController do
  use ProjetZWeb, :controller

  alias ProjetZ.Works
  alias ProjetZ.Works.WorkingTime

  action_fallback ProjetZWeb.FallbackController

  def index(conn, %{"user_id" => user_id} = params) do
    working_times = Works.list_working_times_for_user(user_id, params)

    if Enum.empty?(working_times) do
      conn
      |> put_status(:not_found)
      |> json(%{error: "No working_times found for this user"})
    else
    render(conn, "index.json", working_times: working_times)
    end
  end




  def show_for_user(conn, %{"user_id" => user_id, "id" => id}) do
    working_time = Works.get_working_time_for_user!(user_id, id)
    render(conn, "show.json", working_time: working_time)
  end

  def create(conn, %{"user_id" => user_id, "working_time" => working_time_params}) do
    case Works.create_working_time(%{"user_id" => user_id} |> Map.merge(working_time_params)) do
      {:ok, working_time} ->
        conn
        |> put_status(:created)
        |> render("show.json", working_time: working_time)

      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(ProjetZWeb.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def update(conn, %{"id" => id, "working_time" => working_time_params}) do
    working_time = Works.get_working_time!(id)

    with {:ok, %WorkingTime{} = updated_working_time} <- Works.update_working_time(working_time, working_time_params) do
      render(conn, "show.json", working_time: updated_working_time)
    end
  end

  def delete(conn, %{"id" => id}) do
    working_time = Works.get_working_time!(id)

    with {:ok, %WorkingTime{}} <- Works.delete_working_time(working_time) do
      send_resp(conn, :no_content, "")
    end
  end

end
