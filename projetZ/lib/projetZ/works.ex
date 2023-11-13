defmodule ProjetZ.Works do
  @moduledoc """
  The Works context.
  """

  import Ecto.Query, warn: false
  alias ProjetZ.Repo

  alias ProjetZ.Works.WorkingTime

  @doc """
  Returns the list of working_times.

  ## Examples

      iex> list_working_times()
      [%WorkingTime{}, ...]

  """

  def list_working_times_for_user(nil, _params), do: {:error, "Invalid user_id"}

  def list_working_times_for_user(user_id, params) do
    start_date = Map.get(params, "start")
    end_date = Map.get(params, "end")

    query =
      from(wt in WorkingTime,
        where: wt.user_id == ^user_id
      )

    query =
      case start_date do
        nil -> query
        _ -> from(wt in query, where: wt.start_time >= ^start_date)
      end

    query =
      case end_date do
        nil -> query
        _ -> from(wt in query, where: wt.end_time <= ^end_date)
      end

    Repo.all(query)
  end

  def get_working_time_for_user!(user_id, id) do
    query =
      from(wt in WorkingTime,
        where: wt.user_id == ^user_id and wt.id == ^id
      )

    Repo.one!(query)
  end

  @doc """
  Gets a single working_time.

  Raises `Ecto.NoResultsError` if the Working time does not exist.

  ## Examples

      iex> get_working_time!(123)
      %WorkingTime{}

      iex> get_working_time!(456)
      ** (Ecto.NoResultsError)

  """
  def get_working_time!(id), do: Repo.get!(WorkingTime, id)

  @doc """
  Creates a working_time.

  ## Examples

      iex> create_working_time(%{field: value})
      {:ok, %WorkingTime{}}

      iex> create_working_time(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_working_time(attrs \\ %{}) do
    %WorkingTime{}
    |> WorkingTime.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a working_time.

  ## Examples

      iex> update_working_time(working_time, %{field: new_value})
      {:ok, %WorkingTime{}}

      iex> update_working_time(working_time, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_working_time(%WorkingTime{} = working_time, attrs) do
    working_time
    |> WorkingTime.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a working_time.

  ## Examples

      iex> delete_working_time(working_time)
      {:ok, %WorkingTime{}}

      iex> delete_working_time(working_time)
      {:error, %Ecto.Changeset{}}

  """
  def delete_working_time(%WorkingTime{} = working_time) do
    Repo.delete(working_time)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking working_time changes.

  ## Examples

      iex> change_working_time(working_time)
      %Ecto.Changeset{data: %WorkingTime{}}

  """
  def change_working_time(%WorkingTime{} = working_time, attrs \\ %{}) do
    WorkingTime.changeset(working_time, attrs)
  end
end
