defmodule ProjetZWeb.UserController do
  use ProjetZWeb, :controller

  alias ProjetZ.Accounts
  alias ProjetZ.Accounts.User
  alias ProjetZ.Repo

  action_fallback(ProjetZWeb.FallbackController)

  def index(conn, %{"username" => username, "email" => email}) do
    user = Repo.get_by!(User, username: username, email: email)
    render(conn, :show, user: user)
  end

  def index(conn, _params) do
    users = Accounts.list_users()
    render(conn, :index, users: users)
  end

  def create(conn, %{"user" => user_params}) do
    username = user_params["username"]
    email = user_params["email"]

    case {Repo.get_by(User, username: username), Repo.get_by(User, email: email)} do
      {nil, nil} ->
        # Plus besoin de réaffecter le password ici, car il sera pris en charge par `changeset`
        with {:ok, %User{} = user} <- Accounts.create_user(user_params) do
          conn
          |> put_status(:created)
          |> put_resp_header("location", "/api/users/#{user.id}")
          |> render(:show, user: user)
        end

      {_, _} ->
        conn
        |> put_status(:unprocessable_entity)
        |> json(%{
          error: "L'utilisateur avec ce nom d'utilisateur ou cette adresse e-mail existe déjà."
        })
    end
  end

  def login(conn, %{"username" => username, "password" => password}) do
    case ProjetZ.Accounts.authenticate(username, password) do
      {:ok, user} ->
        user_info = %{
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role
        }

        {:ok, token, _full_claims} =
          ProjetZ.Guardian.encode_and_sign(user, %{user_info: user_info})

        json(conn, %{
          jwt: token,
          user: user_info,
          message: "Connection successfull !"
        })

      _ ->
        conn
        |> put_status(:unauthorized)
        |> json(%{error: "Unauthorized to login, please check your informations"})
    end
  end

  def show(conn, %{"id" => id}) do
    user = Accounts.get_user!(id)
    render(conn, :show, user: user)
  end

  def update(conn, %{"id" => id, "user" => user_params}) do
    user = Accounts.get_user!(id)

    with {:ok, %User{} = user} <- Accounts.update_user(user, user_params) do
      render(conn, :show, user: user)
    end
  end

  def delete(conn, %{"id" => id}) do
    user = Accounts.get_user!(id)

    with {:ok, %User{}} <- Accounts.delete_user(user) do
      send_resp(conn, :no_content, "")
    end
  end
end
