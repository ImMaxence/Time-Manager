defmodule ProjetZ.WorksTest do
  use ProjetZ.DataCase

  alias ProjetZ.Works

  describe "working_times" do
    alias ProjetZ.Works.WorkingTime

    import ProjetZ.WorksFixtures

    @invalid_attrs %{start_time: nil, end_time: nil}

    test "list_working_times/0 returns all working_times" do
      working_time = working_time_fixture()
      assert Works.list_working_times() == [working_time]
    end

    test "get_working_time!/1 returns the working_time with given id" do
      working_time = working_time_fixture()
      assert Works.get_working_time!(working_time.id) == working_time
    end

    test "create_working_time/1 with valid data creates a working_time" do
      valid_attrs = %{start_time: ~U[2023-10-23 16:43:00Z], end_time: ~U[2023-10-23 16:43:00Z]}

      assert {:ok, %WorkingTime{} = working_time} = Works.create_working_time(valid_attrs)
      assert working_time.start_time == ~U[2023-10-23 16:43:00Z]
      assert working_time.end_time == ~U[2023-10-23 16:43:00Z]
    end

    test "create_working_time/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Works.create_working_time(@invalid_attrs)
    end

    test "update_working_time/2 with valid data updates the working_time" do
      working_time = working_time_fixture()
      update_attrs = %{start_time: ~U[2023-10-24 16:43:00Z], end_time: ~U[2023-10-24 16:43:00Z]}

      assert {:ok, %WorkingTime{} = working_time} = Works.update_working_time(working_time, update_attrs)
      assert working_time.start_time == ~U[2023-10-24 16:43:00Z]
      assert working_time.end_time == ~U[2023-10-24 16:43:00Z]
    end

    test "update_working_time/2 with invalid data returns error changeset" do
      working_time = working_time_fixture()
      assert {:error, %Ecto.Changeset{}} = Works.update_working_time(working_time, @invalid_attrs)
      assert working_time == Works.get_working_time!(working_time.id)
    end

    test "delete_working_time/1 deletes the working_time" do
      working_time = working_time_fixture()
      assert {:ok, %WorkingTime{}} = Works.delete_working_time(working_time)
      assert_raise Ecto.NoResultsError, fn -> Works.get_working_time!(working_time.id) end
    end

    test "change_working_time/1 returns a working_time changeset" do
      working_time = working_time_fixture()
      assert %Ecto.Changeset{} = Works.change_working_time(working_time)
    end
  end
end
