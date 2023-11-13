defmodule ProjetZ.Clocks.Clock do
  use Ecto.Schema
  import Ecto.Changeset

  schema "clocks" do
    field :status, :boolean, default: false
    field :time, :utc_datetime
    belongs_to :user, ProjetZ.Accounts.User   # Ajout de cette ligne pour l'association

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(clock, attrs) do
    clock
    |> cast(attrs, [:time, :status, :user_id])   # Ajout de :user_id à la liste
    |> validate_required([:time, :status, :user_id])  # Ajout de :user_id à la liste
  end
end
