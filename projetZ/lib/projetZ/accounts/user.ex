defmodule ProjetZ.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset
  alias Pbkdf2

  @derive {Jason.Encoder, except: [:password, :__meta__, :clocks, :inserted_at, :updated_at]}
  schema "users" do
    field :username, :string
    field :email, :string
    field :password, :string
    field :role, Ecto.Enum, values: [:employee, :administrator]

    has_many :clocks, ProjetZ.Clocks.Clock, on_delete: :delete_all

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:username, :email, :password, :role])
    |> validate_required([:username, :email, :password, :role])
    |> validate_format(:email, ~r/@/)
    |> hash_password(attrs["password"])
  end


  defp hash_password(changeset, password) when is_binary(password) do
    add_hash = Pbkdf2.add_hash(password)
    IO.inspect(add_hash, label: "hashed password")

    # Ici, nous devons extraire la chaîne de caractères de hachage du map.
    hashed_password = Map.fetch!(add_hash, :password_hash)

    change(changeset, %{password: hashed_password})
  end

end
