import axios from "axios";

/**
 * @param { string } id 
 * @returns { Promise<any> }
 */
export async function submitTimesheet(id) {
  try {
    const response = await axios.put(
      `${process.env.API_URL}/timesheets/${id}/submit`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return response.data;
  } catch (e) {
    this.$openPopupNotification({text:e.response.data.message, variant:'danger'})
  }
}
