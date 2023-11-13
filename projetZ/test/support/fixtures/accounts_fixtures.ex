defmodule ProjetZ.AccountsFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `ProjetZ.Accounts` context.
  """

  @doc """
  Generate a user.
  """
  def user_fixture(attrs \\ %{}) do
    {:ok, user} =
      attrs
      |> Enum.into(%{
        email: "some email",
        username: "some username"
      })
      |> ProjetZ.Accounts.create_user()

    user
  end
end
