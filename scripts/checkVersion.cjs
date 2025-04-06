const { Octokit } = require("@octokit/rest");

// GitHub Actionsから取得したバージョン
const version = process.env.VERSION;
const githubToken = process.env.GITHUB_TOKEN;
const tagNameFormat = process.env.TAG_NAME_FORMAT || "{VERSION}";
const owner = process.env.OWNER;
const repo = process.env.REPO;

if (!version) {
  console.error("VERSION environment variable is not set.");
  process.exit(1);
}

if (!githubToken) {
  console.error("GITHUB_TOKEN is not set.");
  process.exit(1);
}

if (!owner) {
  console.error("OWNER is not set.");
  process.exit(1);
}
if (!repo) {
  console.error("REPO is not set.");
  process.exit(1);
}

const octokit = new Octokit({ auth: githubToken });

(async () => {
  try {
    const releases = await octokit.repos.listReleases({
      owner,
      repo,
    });
    const existingVersions = releases.data.map((release) => release.tag_name);

    console.log("existingVersions: ", existingVersions.join(", "));

    if (
      existingVersions.includes(tagNameFormat.replace("{VERSION}", version))
    ) {
      console.error(`Version ${version} already exists.`);
      process.exit(1);
    }

    console.log("Version check passed.");
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
})();
