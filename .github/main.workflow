workflow "Build, Test, and Publish" {
  on = "push"
  resolves = [
    "Install",
    "Test",
    "Deploy"
  ]
}

action "Install" {
  uses = "./workflows/action-puppeteer/"
  args = "install"
}

action "Test" {
  uses = "./workflows/action-puppeteer/"
  needs = ["Install"]
  args = "ci"
}

action "Deploy" {
  uses = "./workflows/action-puppeteer/"
  needs = ["Test"]
  args = "deploy"
  secrets = ["NOW_TOKEN"]
}
