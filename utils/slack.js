import axios from "axios";
import _ from "lodash";

/**
 * To add another, Go to Apps > [App name] > Add an Incoming Webhook
 * To do a shoutout use, <!here>
 * @param message
 * @param channel
 */
export async function sendSlackMessage(message, channel = "") {
  const channels = {
    "#[channel]": "[Incoming webhook url]",
  };

  const requestBody = _.isObject(message) ? message : { text: message };
  const url = channels[channel];
  if (!url) throw new Error("No Slack Channel Available");

  const response = await axios.post(url, requestBody);
  console.log(`Message sent: ${message} to ${channel}`);
}
