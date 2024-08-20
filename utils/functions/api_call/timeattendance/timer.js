import { DateTime } from "luxon";
import { hrmApiAxiosInstance } from "../hrm-api-axios-instance";
import { createConfig } from "../config";
import {ACTIVITY_TYPE} from "@/utils/constant/Constant";

export async function startTimer() {
  const config = createConfig();
  try {
    const url = "/time-entries  ";
    const timer = await hrmApiAxiosInstance.post(
      url,
      {
        date: DateTime.now().toISODate(),
        start: DateTime.now().toUTC().toISO(),
        activity: "in",
        source: "timer",
      },
      config
    );
    return timer.data;
  } catch (e) {
    const message = e?.response?.data?.message
    if (message) {
      this.openPopupNotification({text:message, variant:'danger'})
      this.$nuxt.$emit("timer-stop");
    }
  }
}

export async function stopTimer({ id, end, activity, source }) {
  const config = createConfig();
  const url = "/time-entries/" + id;
  try {
    const timer = await hrmApiAxiosInstance.put(url, { end, activity, source }, config);
    return timer.data;
  } catch (e) {
    console.error(e);
  }
}


export async function getActiveTimer({ employeeId }) {
  const config = createConfig();
  let url = "/timers?";

  if (employeeId) {
    url += `employeeId=${employeeId}`
  }
  try {
    const timer = await hrmApiAxiosInstance.get(url, config);
    return timer.data;
  } catch (e) {
    console.error(e);
  }
}
