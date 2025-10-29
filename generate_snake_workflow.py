name: Generate Snake Contributions

permissions:
  contents: write

on:
  push:
    branches: ["main", "master"]
  pull_request:
    branches: ["main", "master"]
  schedule:
    - cron: "0 0 1,15 * *"

jobs:
  generate-snake:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Generate snake contribution graphics
        uses: Platane/snk@v3
        with:
          github_user_name: currentsuspect
          outputs: |
            github-snake.svg?palette=github
            github-snake-dark.svg?palette=github-dark
            snake.gif?color_snake=#FFFFFF&color_dots=#222222,#444444,#666666,#888888,#AAAAAA

      - name: Commit changes
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add .
          git diff --staged --quiet || git commit -m "Update snake contributions on $(date)"
          git push
