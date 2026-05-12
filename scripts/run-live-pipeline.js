const { spawnSync } = require("child_process");
const path = require("path");

const rootDir = path.join(__dirname, "..");

function run(label, args) {
  console.log(`\n== ${label} ==`);
  const result = spawnSync(process.execPath, args, {
    cwd: rootDir,
    stdio: "inherit",
  });

  if (result.status !== 0) {
    throw new Error(`${label} failed.`);
  }
}

function runLivePipeline() {
  run("Validate portal data", ["scripts/validate-data.js"]);
  run("Fetch live source pages", ["scripts/fetch-live-news.js"]);
  run("Ingest fetched raw news", ["scripts/ingest-raw-news.js", "reports/fetched-raw-news.json"]);
  run("Normalize news records", ["scripts/normalize-news.js"]);
  run("Generate daily report", ["scripts/generate-daily-report.js"]);
  console.log("\nLive daily pipeline completed.");
}

if (require.main === module) {
  try {
    runLivePipeline();
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

module.exports = {
  runLivePipeline,
};
