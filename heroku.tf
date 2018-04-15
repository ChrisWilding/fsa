provider "heroku" {
}

resource "heroku_app" "default" {
  name   = "cw-fsa"
  region = "eu"
  stack  = "container"
}
