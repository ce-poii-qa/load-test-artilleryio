import { sendSlackMessage } from "./utils/slack.js";

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
const argv = yargs(hideBin(process.argv)).argv;

import util from "util";
import child_process from "child_process";
const exec = util.promisify(child_process.exec);

async function runLoadTest(
  scenario = "get_users",
  config = "normal",
  env = "reqres"
) {
  let output = {};

  let localPath = 'node_modules/.bin'
  try {
    const scriptCommand = 
    `${localPath}/artillery run tests/${scenario}.yml --config config/${config}.yml --environment ${env} --output reports/${scenario} && ${localPath}/artillery report reports/${scenario} && open reports/${scenario}.html`;

    console.log("Running script command: ", scriptCommand);
    
    // await sendSlackMessage(
    // `Running load test command: ${scriptCommand}`
    // );
    
    await exec(scriptCommand);
  } catch (err) {
    console.error(err);
  }

  // await sendSlackMessage(
  //   `Load test run has been finished.
  //   stdout ${output.stdout} | stderr ${output.stderr}`
  // );

  console.log(output.stdout)
  return output;
}

async function main() {
  const output = await runLoadTest(argv.scenario, argv.config, argv.env);
}

main();
