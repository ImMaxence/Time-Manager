defmodule ProjetZ.Guardian do
  use Guardian, otp_app: :projetZ

  def subject_for_token(user, _claims) do
    # Utilisez l'identifiant de l'utilisateur pour le sujet du token
    {:ok, "User:#{user.id}"}
  end

  def resource_from_claims(claims) do
    # Extrait l'utilisateur à partir des claims du token
    userId = claims["sub"]
    id = String.split(userId, ":")
    user = ProjetZ.Accounts.get_user!(Enum.at(id, 1))
    {:ok, user}
  end
end
