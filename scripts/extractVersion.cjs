const fs = require("node:fs");
const path = require("node:path");
const toml = require("toml");

const configDirFromEnv =
  process.env.TAURI_CONFIG_DIR || path.join(__dirname, "./src-tauri");
let version = null;

function parseJsonFile(filepath) {
  const contents = fs.readFileSync(filepath, "utf-8");
  return JSON.parse(contents);
}

function parseTomlFile(filepath) {
  const contents = fs.readFileSync(filepath, "utf-8");
  return toml.parse(contents);
}

if (!configPathFromEnv) {
  const defaultDir = path.join(__dirname, "../../src-tauri");
  const candidates = [
    path.join(defaultDir, "tauri.conf.json"),
    path.join(defaultDir, "tauri.conf.json5"),
    path.join(defaultDir, "Tauri.toml"),
  ];

  for (const filepath of candidates) {
    if (fs.existsSync(filepath)) {
      const config = filepath.endsWith(".toml")
        ? parseTomlFile(filepath)
        : parseJsonFile(filepath);
      version = extractVersion(config);
      break;
    }
  }
} else {
  const resolvedPath = path.resolve(configPathFromEnv);
  if (!fs.existsSync(resolvedPath)) {
    console.error(`Specified config file not found: ${resolvedPath}`);
    process.exit(1);
  }

  const config = resolvedPath.endsWith(".toml")
    ? parseTomlFile(resolvedPath)
    : parseJsonFile(resolvedPath);

  version = extractVersion(config);
}

if (!version) {
  console.error("Version not found in Tauri configuration files.");
  process.exit(1);
}

console.log(`Version: ${version}`);

// GitHub Actionsの出力として設定
const outputFilePath = process.env.GITHUB_OUTPUT;
fs.appendFileSync(outputFilePath, `version=${version}\n`);
