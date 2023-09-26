import axios from "axios";

export async function makeTimeEntry(activity, date, start, end) {
  try {
    const response = await axios.post(
      process.env.API_URL + "/time-entries",
      { date, start, end, activity },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return response.data;
  } catch (e) {
    alert(e);
  }
}
  