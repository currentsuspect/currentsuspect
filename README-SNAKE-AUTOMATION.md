# Snake Contribution Automation

This project provides an automated system for generating snake contribution graphics using YAML configuration and GitHub Actions.

## Features

- **YAML-based Configuration**: Easily customize your snake graphics through a simple YAML file
- **Automatic Generation**: Scheduled updates via GitHub Actions
- **Multiple Output Formats**: Generate SVG and GIF formats with custom colors
- **Dark Mode Support**: Automatic light/dark theme detection
- **README Integration**: Optional automatic README updates
- **Flexible Scheduling**: Customize how often graphics are updated

## Quick Start

### 1. Configure Your Username

Edit `snake-config.yaml` and replace `your-username-here` with your actual GitHub username:

```yaml
github:
  username: "your-actual-github-username"
```

### 2. Customize Outputs (Optional)

Modify the `outputs` section in `snake-config.yaml` to customize:

- **Path**: Where to save the generated files
- **Type**: `svg` or `gif`
- **Palette**: Color theme (github, github-dark, github-light)
- **Colors**: Custom colors for snake and dots

### 3. Setup Automation

The Python script has already generated the GitHub Actions workflow. Simply:

1. Commit and push the files:
   ```bash
   git add .
   git commit -m "Add automated snake contributions"
   git push
   ```

2. Your snake graphics will be generated automatically according to the schedule in `snake-config.yaml`

## Configuration Reference

### GitHub Configuration

```yaml
github:
  username: "your-username"          # Required: Your GitHub username
  token: "${GITHUB_TOKEN}"           # Optional: GitHub token for private repos
  repository: "${GITHUB_REPOSITORY}" # Optional: Repository path
```

### Output Configuration

```yaml
outputs:
  - path: "github-snake.svg"         # Output file path
    type: "svg"                      # File type: svg or gif
    palette: "github"                # Color palette
    color_snake: "orange"            # Snake color (for gif)
    color_dots: "#color1,color2,..." # Dot colors (5 colors for gif)
```

**Supported Palettes:**
- `github`: Standard GitHub colors
- `github-dark`: Dark theme colors
- `github-light`: Light theme colors

### Automation Configuration

```yaml
automation:
  enabled: true              # Enable/disable automation
  schedule: "0 0 1,15 * *"   # CRON schedule (default: 1st and 15th of month)
  commit_branch: "main"      # Branch to commit to
  auto_commit: true          # Automatically commit changes
```

**CRON Schedule Examples:**
- `"0 0 * * *"`: Daily at midnight
- `"0 0 1 * *"`: Monthly on the 1st
- `"0 0 1,15 * *"`: Twice monthly on 1st and 15th
- `"0 0 * * 1"`: Weekly on Mondays

### README Integration

```yaml
readme_integration:
  enabled: true              # Enable README updates
  readme_path: "README.md"   # README file path
  tag_type: "picture"        # Image tag type: "svg" or "picture"
  position: "top"            # Position: "top", "bottom", or line number
```

## Generated Files

After running `generate_snake_workflow.py`, you'll have:

```
├── snake-config.yaml          # Your configuration file
├── generate_snake_workflow.py # Python script to regenerate workflow
├── .github/
│   └── workflows/
│       └── generate-snake.yml # GitHub Actions workflow
└── README.md                  # Updated with snake graphics (if enabled)
```

## How It Works

1. **Python Script**: `generate_snake_workflow.py` reads your YAML configuration
2. **Workflow Generation**: Creates `.github/workflows/generate-snake.yml`
3. **GitHub Actions**: The workflow runs on schedule or push/PR events
4. **Snake Generation**: Uses the `Platane/snk@v3` action to generate graphics
5. **Auto-commit**: Changes are automatically committed back to your repository

## Advanced Usage

### Custom Color Schemes

For GIF outputs, you can specify custom colors:

```yaml
outputs:
  - path: "custom-snake.gif"
    type: "gif"
    color_snake: "#ff6b6b"           # Red snake
    color_dots: "#e3f2fd,#bbdefb,#90caf9,#64b5f6,#2196f3"
```

The `color_dots` requires exactly 5 colors:
1. Zero contributions
2. Low contributions  
3. Medium contributions
4. High contributions
5. Highest contributions

### Multiple Output Formats

Generate both SVG and GIF in one configuration:

```yaml
outputs:
  - path: "snake.svg"
    type: "svg"
    palette: "github"
  - path: "snake.gif"
    type: "gif"
    palette: "github"
    color_snake: "green"
    color_dots: "#f0f0f0,#c6e48b,#7bc96f,#239a3b,#196127"
```

### Disabling Automation

To disable automatic generation but keep manual generation:

```yaml
automation:
  enabled: false
  auto_commit: false
```

## Troubleshooting

### Common Issues

**Username Not Found:**
- Ensure your username is correct in `snake-config.yaml`
- Check that the username exists on GitHub

**No Contributions Showing:**
- GitHub Actions may need time to run after first setup
- Check the Actions tab in your repository for errors

**Workflow Not Running:**
- Verify the workflow file is in `.github/workflows/`
- Check that GitHub Actions are enabled in your repository settings

**Permission Issues:**
- Ensure the workflow has write access to your repository
- Check repository settings > Actions > General > Workflow permissions

### Manual Generation

You can manually trigger the workflow:

1. Go to the Actions tab in your GitHub repository
2. Select "Generate Snake Contributions"
3. Click "Run workflow"
4. Choose branch and click "Run workflow"

## Dependencies

The Python script requires:
- Python 3.6+
- PyYAML

Install dependencies:
```bash
pip install PyYAML
```

## Customization

### Modifying Schedule

Edit the `schedule` in `snake-config.yaml`:

```yaml
automation:
  schedule: "0 0 * * 1"  # Every Monday
```

### Adding Custom Outputs

Add more output configurations:

```yaml
outputs:
  - path: "primary-snake.svg"
    type: "svg"
    palette: "github"
  - path: "dark-snake.svg"  
    type: "svg"
    palette: "github-dark"
  - path: "animated.gif"
    type: "gif"
    palette: "github"
    color_snake: "purple"
```

## License

This project uses the MIT License. The underlying `snk` tool is maintained by Platane.

## Credits

- Snake graphics generated by [Platane/snk](https://github.com/Platane/snk)
- GitHub Actions integration
- YAML configuration system