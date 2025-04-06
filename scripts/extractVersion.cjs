const fs = require("node:fs");
const path = require("node:path");
const toml = require("toml");

const configPathFromEnv = process.env.TAURI_CONFIG_PATH;
let version = null;

console.log("TAURI_CONFIG_DIR: ", configPathFromEnv);
console.log("Current Directory: ", process.cwd());

function parseJsonFile(filepath) {
  const contents = fs.readFileSync(filepath, "utf-8");
  return JSON.parse(contents);
}

function parseTomlFile(filepath) {
  const contents = fs.readFileSync(filepath, "utf-8");
  return toml.parse(contents);
}

function extractVersion(config) {
  return config.package?.version || config.version || null;
}

if (!configPathFromEnv) {
  console.log(
    "TAURI_CONFIG_DIR is not set. Searching for default configuration files..."
  );

  const defaultDir = path.join(__dirname, "../../src-tauri");
  const candidates = [
    path.join(defaultDir, "tauri.conf.json"),
    path.join(defaultDir, "tauri.conf.json5"),
    path.join(defaultDir, "Tauri.toml"),
  ];

  for (const filepath of candidates) {
    if (fs.existsSync(filepath)) {
      console.log(`Found configuration file: ${filepath}`);

      const config = filepath.endsWith(".toml")
        ? parseTomlFile(filepath)
        : parseJsonFile(filepath);

      console.debug("Parsed configuration: ", config);
      version = extractVersion(config);
      break;
    }
  }
} else {
  console.log("TAURI_CONFIG_DIR is set. Using specified configuration file.");

  const resolvedPath = path.resolve(configPathFromEnv);
  console.log("Resolved TAURI_CONFIG_DIR: ", resolvedPath);

  if (!fs.existsSync(resolvedPath)) {
    console.error(`Specified config file not found: ${resolvedPath}`);
    process.exit(1);
  }

  const config = resolvedPath.endsWith(".toml")
    ? parseTomlFile(resolvedPath)
    : parseJsonFile(resolvedPath);

  console.debug("Parsed configuration: ", config);

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
