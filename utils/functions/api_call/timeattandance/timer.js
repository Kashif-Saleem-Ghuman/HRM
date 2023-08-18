import axios from "axios";

export async function startTimer() {
  this.loading = true
  try {
    const timer = await axios.post(
      process.env.API_URL + "/timers/start",
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    this.timer = timer.data;
  } catch (e) {
    alert(e);
  }
  this.loading = false
}

export async function stopTimer() {
  this.loading = true
  try {
    const timer = await axios.put(
      process.env.API_URL + "/timers/stop",
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    this.timer = timer.data;
  } catch (e) {
    alert(e);
  }
  this.loading = false
}