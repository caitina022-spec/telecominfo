const { spawnSync } = require("child_process");
const path = require("path");

const rootDir = path.join(__dirname, "..");

const steps = [
  ["Validate portal data", "scripts/validate-data.js"],
  ["Ingest raw news sample", "scripts/ingest-raw-news.js"],
  ["Normalize news records", "scripts/normalize-news.js"],
  ["Generate daily report", "scripts/generate-daily-report.js"],
];

function runStep([label, scriptPath]) {
  console.log(`\n== ${label} ==`);
  const result = spawnSync(process.execPath, [scriptPath], {
    cwd: rootDir,
    stdio: "inherit",
  });

  if (result.status !== 0) {
    throw new Error(`${label} failed.`);
  }
}

function runPipeline() {
  steps.forEach(runStep);
  console.log("\nDaily pipeline completed.");
}

if (require.main === module) {
  try {
    runPipeline();
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

module.exports = {
  runPipeline,
};
