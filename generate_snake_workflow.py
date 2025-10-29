#!/usr/bin/env python3
"""
Snake Contribution Generator

This script reads a YAML configuration file and generates a GitHub Actions workflow
to automatically create snake contribution graphics based on the configuration.
"""

import yaml
import os
import sys
from datetime import datetime
from typing import Dict, List, Any

def load_config(config_path: str = "snake-config.yaml") -> Dict[str, Any]:
    """Load and validate the YAML configuration file."""
    try:
        with open(config_path, 'r') as file:
            config = yaml.safe_load(file)
        
        # Validate required fields
        required_fields = ['github']
        for field in required_fields:
            if field not in config:
                raise ValueError(f"Required field '{field}' missing from configuration")
        
        return config
    except FileNotFoundError:
        print(f"Configuration file '{config_path}' not found.")
        sys.exit(1)
    except yaml.YAMLError as e:
        print(f"Error parsing YAML configuration: {e}")
        sys.exit(1)

def generate_github_workflow(config: Dict[str, Any]) -> str:
    """Generate GitHub Actions workflow content from configuration."""
    
    github_config = config.get('github', {})
    outputs_config = config.get('outputs', [])
    automation_config = config.get('automation', {})
    
    username = github_config.get('username', '${github.repository_owner}')
    schedule = automation_config.get('schedule', '0 0 1,15 * *')
    auto_commit = automation_config.get('auto_commit', True)
    commit_branch = automation_config.get('commit_branch', 'main')
    commit_message = automation_config.get('commit_message', 'Update snake contributions on ${DATE}')
    
    # Build outputs section
    outputs_section = ""
    for i, output in enumerate(outputs_config):
        path = output.get('path', f'output-{i}.svg')
        output_type = output.get('type', 'svg')
        
        # Build query string for options
        query_params = []
        if output.get('palette'):
            query_params.append(f"palette={output['palette']}")
        if output.get('color_snake'):
            query_params.append(f"color_snake={output['color_snake']}")
        if output.get('color_dots'):
            query_params.append(f"color_dots={output['color_dots']}")
        
        query_string = f"?{'&'.join(query_params)}" if query_params else ""
        outputs_section += f"      {path}{query_string}\n"
    
    if not outputs_section.strip():
        outputs_section = "      github-contribution-grid-snake.svg\n"
    
    # Build cron schedule if automation is enabled
    cron_schedule = ""
    if automation_config.get('enabled', True):
        cron_schedule = f"""
  schedule:
    - cron: "{schedule}"
"""
    
    workflow_content = f"""name: Generate Snake Contributions

on:
  push:
    branches: ["main", "master"]
  pull_request:
    branches: ["main", "master"]
{cron_schedule}

jobs:
  generate-snake:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout repository
      uses: actions/checkout@v4
      
    - name: Generate snake contribution graphics
      uses: Platane/snk@v3
      with:
        github_user_name: {username}
        outputs: |
{outputs_section.rstrip()}
    
    - name: Commit changes
      if: {str(auto_commit).lower()}
      run: |
        git config --local user.email "action@github.com"
        git config --local user.name "GitHub Action"
        git add .
        git diff --staged --quiet || git commit -m "{commit_message}"
        git push
        
      env:
        GITHUB_TOKEN: ${{{{ secrets.GITHUB_TOKEN }}}}
"""
    
    return workflow_content

def generate_readme_content(config: Dict[str, Any]) -> str:
    """Generate README.md content with snake integration."""
    
    readme_config = config.get('readme_integration', {})
    
    if not readme_config.get('enabled', False):
        return ""
    
    outputs_config = config.get('outputs', [])
    svg_outputs = [output for output in outputs_config if output.get('type') == 'svg']
    
    if not svg_outputs:
        return ""
    
    primary_svg = svg_outputs[0].get('path', 'github-snake.svg')
    dark_svg = None
    
    # Look for dark theme SVG
    for output in svg_outputs:
        if 'dark' in output.get('path', '').lower():
            dark_svg = output.get('path')
            break
    
    tag_type = readme_config.get('tag_type', 'picture')
    position = readme_config.get('position', 'top')
    
    if tag_type == 'picture' and dark_svg:
        snake_content = f"""<picture>
  <source media="(prefers-color-scheme: dark)" srcset="{dark_svg}" />
  <source media="(prefers-color-scheme: light)" srcset="{primary_svg}" />
  <img alt="Snake Contribution Graphics" src="{primary_svg}" />
</picture>"""
    else:
        snake_content = f'<img src="{primary_svg}" alt="Snake Contribution Graphics" />'
    
    return snake_content

def create_workflow_files(config: Dict[str, Any]) -> None:
    """Create all necessary workflow files."""
    
    # Create .github/workflows directory
    workflow_dir = ".github/workflows"
    os.makedirs(workflow_dir, exist_ok=True)
    
    # Generate and write workflow file
    workflow_content = generate_github_workflow(config)
    workflow_path = os.path.join(workflow_dir, "generate-snake.yml")
    
    with open(workflow_path, 'w') as f:
        f.write(workflow_content)
    
    print(f"Created GitHub workflow: {workflow_path}")
    
    # Generate README content if enabled
    readme_content = generate_readme_content(config)
    if readme_content:
        readme_config = config.get('readme_integration', {})
        readme_path = readme_config.get('readme_path', 'README.md')
        
        # Backup existing README
        if os.path.exists(readme_path):
            backup_path = f"{readme_path}.backup"
            os.rename(readme_path, backup_path)
            print(f"Backed up existing README to {backup_path}")
        
        # Create new README with snake content
        position = readme_config.get('position', 'top')
        new_readme = ""
        
        if position == "top":
            new_readme = f"{readme_content}\n\n"
        elif position == "bottom":
            new_readme = ""
        else:
            # Position is a line number or "middle"
            new_readme = ""
        
        # Add snake content at specified position
        if position == "top":
            # Add rest of content if README already exists
            if os.path.exists(backup_path):
                with open(backup_path, 'r') as f:
                    existing_content = f.read()
                new_readme += existing_content
        elif position == "bottom":
            # Add content at bottom
            if os.path.exists(backup_path):
                with open(backup_path, 'r') as f:
                    existing_content = f.read()
                new_readme = existing_content + f"\n\n{readme_content}\n"
            else:
                new_readme = readme_content
        else:
            # For line numbers or "middle", we'd need more complex logic
            # For now, just add at top
            new_readme = readme_content + "\n"
            if os.path.exists(backup_path):
                with open(backup_path, 'r') as f:
                    existing_content = f.read()
                new_readme += existing_content
        
        with open(readme_path, 'w') as f:
            f.write(new_readme)
        
        print(f"Updated README.md with snake graphics")

def main():
    """Main function to generate snake contribution automation."""
    
    print("Snake Contribution Generator")
    print("=" * 40)
    
    # Load configuration
    config_path = sys.argv[1] if len(sys.argv) > 1 else "snake-config.yaml"
    config = load_config(config_path)
    
    print(f"Loaded configuration from {config_path}")
    
    # Create workflow files
    create_workflow_files(config)
    
    print("\nSnake contribution automation setup complete!")
    print("\nNext steps:")
    print("1. Update the username in snake-config.yaml with your GitHub username")
    print("2. Customize the output configurations as needed")
    print("3. Commit and push the generated .github/workflows/generate-snake.yml file")
    print("4. Your snake contributions will be generated automatically according to your schedule")
    
    if config.get('readme_integration', {}).get('enabled', False):
        print("5. Your README.md has been updated with snake graphics")

if __name__ == "__main__":
    main()