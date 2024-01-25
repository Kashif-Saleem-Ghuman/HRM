import axios from "axios";
export async function addFiles(payload, files) {
  let fd = new FormData();
  if (files.length === 0) {
    return this.openPopupNotification(7);
  }
  for (let i = 0; i < files.length; i++) {
    fd.append("files", files[i]);
  }

  try {
    const files = await axios.post(
      `${process.env.API_URL}/employees/${payload}/files`,
      fd,
      {
        headers: {
          Authorization: "Bearer " + this.getAccessToken,
          "Content-Type": "multipart/form-data",
        },
      }
    );
  } catch (e) {
    console.log(e);
  }
}
export async function getFiles(payload) {
  try {
    const files = await axios.get(
      `${process.env.API_URL}/employees/${payload}/files`,
      {
        headers: {
          Authorization: "Bearer " + this.getAccessToken,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return files.data;
  } catch (e) {
    if (e.response.status === 500) {
      return window.open('/not-found',"_self")
    }
    console.log(e);
  }
}
export async function deleteFiles(payload) {
  try {
    const files = await axios.delete(
      `${process.env.API_URL}/employees/${payload.employeeId}/files/${payload.id}`,
      {
        headers: {
          Authorization: "Bearer " + this.getAccessToken,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return files.data;
  } catch (e) {
    console.log(e);
  }
}
