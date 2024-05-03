import { DateTime } from "luxon";
import { hrmApiAxiosInstance } from "../hrm-api-axios-instance";
import { createConfig } from "../config";
import {ACTIVITY_TYPE} from "@/utils/constant/Constant";

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

function getTimeDiffInSeconds(start, end) {
  return Math.floor(
    (new Date(end).getTime() -
      new Date(start).getTime()) /
    1000
  );
}
export function setChronoMeter(timeEntryValue) {
  let chronometer = 0;
  let timeEntry = timeEntryValue.find((timeEntry) => timeEntry.activity === ACTIVITY_TYPE.IN)
  if(timeEntry && timeEntry?.isTimerEntry){
    chronometer = getTimeDiffInSeconds(timeEntry.start, timeEntry.end)
  }
  return chronometer;
}

export async function stopTimer({ end }) {
  const config = createConfig();
  const url = "/timers/stop";
  try {
    const timer = await hrmApiAxiosInstance.put(url, { end }, config);
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
    console.log();
    return timer.data;
  } catch (e) {
    console.error(e);
  }
}
