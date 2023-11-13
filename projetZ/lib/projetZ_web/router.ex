defmodule ProjetZWeb.Router do
  use ProjetZWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_live_flash
    plug :put_root_layout, html: {ProjetZWeb.Layouts, :root}
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  pipeline :jwt_authenticated do
    plug AuthPipeline
  end

  scope "/", ProjetZWeb do
    pipe_through :browser
    get "/", PageController, :home
  end

  scope "/api", ProjetZWeb do
    pipe_through :api
    post "/login", UserController, :login
    resources "/users", UserController, query_params: [:email, :username]
  end

  scope "/api", ProjetZWeb do
    pipe_through [:api, :jwt_authenticated]

    # Protected routes
    # Les routes pour WorkingTime
    get "/workingtimes/:user_id", WorkingTimeController, :index
    get "/workingtimes/:user_id/:id", WorkingTimeController, :show_for_user
    post "/workingtimes/:user_id", WorkingTimeController, :create
    put "/workingtimes/:id", WorkingTimeController, :update
    delete "/workingtimes/:id", WorkingTimeController, :delete

    # Les routes pour Clock
    get "/clocks", ClockController, :get_all_clocks
    get "/clocks/:userID", ClockController, :index
    post "/clocks/:userID", ClockController, :create
  end

  # Enable LiveDashboard and Swoosh mailbox preview in development
  if Application.compile_env(:projetZ, :dev_routes) do
    import Phoenix.LiveDashboard.Router
    scope "/dev" do
      pipe_through :browser
      live_dashboard "/dashboard", metrics: ProjetZWeb.Telemetry
      forward "/mailbox", Plug.Swoosh.MailboxPreview
    end
  end
end
