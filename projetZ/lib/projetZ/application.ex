defmodule ProjetZ.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      ProjetZWeb.Telemetry,
      ProjetZ.Repo,
      {DNSCluster, query: Application.get_env(:projetZ, :dns_cluster_query) || :ignore},
      {Phoenix.PubSub, name: ProjetZ.PubSub},
      # Start the Finch HTTP client for sending emails
      {Finch, name: ProjetZ.Finch},
      # Start a worker by calling: ProjetZ.Worker.start_link(arg)
      # {ProjetZ.Worker, arg},
      # Start to serve requests, typically the last entry
      ProjetZWeb.Endpoint
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: ProjetZ.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    ProjetZWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
