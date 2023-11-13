#!/bin/sh

mix do local.hex --force, local.rebar --force, deps.get
mix ecto.create
mix ecto.migrate
mix phx.server