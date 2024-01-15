import axios from "axios";
export async function meetLink(payload, uniqueId) {
  const { name, title, users, createdBy } = payload;
  try {
    const meetUrl = await axios.post(
      "https://dev-video-app-api.business-in-a-box.com/conference/",
      {
        name: name, // This is the body part
        title: title,
        users: [users],
        createdBy: createdBy,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      }
    );
    if(meetUrl.status === 201){
      const url = meetUrl.data.name
      window.open(process.env.VIDEO_CONF_APP_URL +'/'+ url, "_blank");
    }  } catch (e) {
    alert(e);
  }
}
