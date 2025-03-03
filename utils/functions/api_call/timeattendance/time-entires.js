import axios from "axios";

export async function makeTimeEntry(activity, date, start, end, source) {
  try {
    const response = await axios.post(
      process.env.API_URL + "/time-entries",
      { date, start, end, activity, source },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return response.data;
  } catch (e) {
    console.error(e);
    const message = e?.response?.data?.message
    if (message) {
      this.$openPopupNotification({text:message, variant:'danger'})
    }
    throw e;
  }
}

export async function editTimeEntry(
  { id, date, start, end, activity, source },
) {
  try {
    const response = await axios.put(
      `${process.env.API_URL}/time-entries/${id}`,
      { date, start, end, activity, source },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return response.data;
  } catch (e) {
    console.error(e);
    const message = e?.response?.data?.message
    if (message) {
      this.$openPopupNotification({text:message, variant:'danger'})
    }
    throw new Error(message);
  }
}

export async function deleteTimeEntry(id) {
  try {
    const response = await axios.delete(
      `${process.env.API_URL}/time-entries/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return response.data;
  } catch (e) {
    this.$openPopupNotification({text:e, variant:'danger'})
  }
}
