defmodule ProjetZ.Works.WorkingTime do
  use Ecto.Schema
  import Ecto.Changeset

  schema "working_times" do
    field :start_time, :utc_datetime
    field :end_time, :utc_datetime
    field :user_id, :id

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(working_time, attrs) do
    working_time
    |> cast(attrs, [:user_id, :start_time, :end_time])
    |> validate_required([:user_id, :start_time, :end_time])
  end
end
