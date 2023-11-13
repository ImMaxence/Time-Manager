defmodule ProjetZ.Repo do
  use Ecto.Repo,
    otp_app: :projetZ,
    adapter: Ecto.Adapters.Postgres
end
