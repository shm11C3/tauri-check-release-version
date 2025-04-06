# Tauri Check Release Version Action

Validate tauri version and GitHub tags to prevent overwriting releases.

## 💡 What this does

This GitHub Action checks if the given version already exists as a tag on GitHub Releases.
If it does, the workflow will fail to prevent accidental duplicate releases.

## ✅ Inputs

| Name                | Required | Description                                                   |
| ------------------- | -------- | ------------------------------------------------------------- |
| `github_token`      | ✅       | GitHub token for API access                                   |
| `owner`             | ✅       | GitHub repository owner                                       |
| `repo`              | ✅       | GitHub repository name                                        |
| `tag_name_format`   | ❌       | Tag format like `{VERSION}` (default)                         |
| `tauri_config_path` | ❌       | Path to tauri config (default: `./src-tauri/tauri.conf.json`) |

## 📦 Example Usage

```yaml
- uses: yourname/check-tauri-release@v1
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    owner: yourname
    repo: yourapp
    tag_name_format: v{VERSION}
    tauri_config_path: ./src-tauri/tauri.conf.json
```
