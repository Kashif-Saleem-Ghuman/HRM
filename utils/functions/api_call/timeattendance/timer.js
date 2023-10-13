import axios from "axios";
import { DateTime } from "luxon";
import { hrmApiAxiosInstance } from "../hrm-api-axios-instance";
import { createConfig } from "../config";

export async function startTimer() {
  const config = createConfig();
  try {
    const url = "/timers/start";
    const timer = await hrmApiAxiosInstance.post(
      url,
      {
        date: DateTime.now().startOf("day").toUTC().toISO(),
        start: DateTime.now().toUTC().toISO(),
      },
      config
    );
    return timer.data;
  } catch (e) {
    console.error(e);
  }
}

export async function stopTimer() {
  const config = createConfig();
  const url = "/timers/stop";
  try {
    const timer = await axios.put(url, {}, config);
    return timer.data;
  } catch (e) {
    console.error(e);
  }
}
