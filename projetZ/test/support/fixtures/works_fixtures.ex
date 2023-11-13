defmodule ProjetZ.WorksFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `ProjetZ.Works` context.
  """

  @doc """
  Generate a working_time.
  """
  def working_time_fixture(attrs \\ %{}) do
    {:ok, working_time} =
      attrs
      |> Enum.into(%{
        end_time: ~U[2023-10-23 16:43:00Z],
        start_time: ~U[2023-10-23 16:43:00Z]
      })
      |> ProjetZ.Works.create_working_time()

    working_time
  end
end
