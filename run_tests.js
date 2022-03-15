import { sendSlackMessage } from "./utils/slack.js";

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
const argv = yargs(hideBin(process.argv)).argv;

import util from "util";
import child_process from "child_process";
const exec = util.promisify(child_process.exec);

async function runLoadTest(
  scenario = "get_users",
  config = "normal"
) {
  let output = {};

  try {
    console.log("Running test: ", scenario);
    console.log("Running config: ", config);

    const scriptCommand = `artillery run --config config/${config}.yml --environment stage --output reports/${scenario} 
    && artillery report reports/${scenario}
    && open reports/${scenario}`;
    
    console.log("Running script command: ", scriptCommand);
    
    await sendSlackMessage(
    `Running load test command: ${scriptCommand}`
    );
    
    await exec(scriptCommand);
  } catch (err) {
    console.error(err);
  }


  await sendSlackMessage(
    `Load test run has been finished.
    stdout ${output.stdout} | stderr ${output.stderr}`
  );

  return output;
}

async function main() {
  const output = await runLoadTest(argv.count, argv.page, argv.config);
}

main();
