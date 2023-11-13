defmodule AuthPipeline do
  use Guardian.Plug.Pipeline, otp_app: :ProjetZ,
  module: ProjetZ.Guardian,
  error_handler: AuthErrorHandler

  plug Guardian.Plug.VerifyHeader, realm: "Bearer"
  plug Guardian.Plug.EnsureAuthenticated
  plug Guardian.Plug.LoadResource
end
