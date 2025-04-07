# Tauri Check Release Version Action

Validate tauri version and GitHub tags to prevent overwriting releases.

## 💡 What this does

This GitHub Action checks if the given version already exists as a tag on GitHub Releases.
If it does, the workflow will fail to prevent accidental duplicate releases.

## ✅ Inputs

| Name                | Required | Description                                                   |
| ------------------- | -------- | ------------------------------------------------------------- |
| `github_token`      | yes       | GitHub token for API access                                   |
| `owner`             | yes       | GitHub repository owner                                       |
| `repo`              | yes       | GitHub repository name                                        |
| `tag_name_format`   | no       | Tag format like `{VERSION}` (default)                         |
| `tauri_config_path` | no       | Path to tauri config (default: `./src-tauri/tauri.conf.json`) |

## 📦 Example Usage

```yaml
- uses: shm11C3/tauri-check-release-version@v1.0.2
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    owner: yourname
    repo: yourapp
    tag_name_format: v{VERSION}
    tauri_config_path: ./src-tauri/tauri.conf.json
```

## 🧪 Example App

This repository includes a real sample Tauri project under `example-app/`.
It is used in CI to verify that the action works with an actual Tauri environment.

To run locally:

```bash
cd example-app
npm install
cargo install tauri-cli
npm run tauri dev
```
