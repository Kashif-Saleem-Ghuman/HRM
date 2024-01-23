import axios from "axios";
export async function meetLink(payload, uniqueId) {
  this.loading = true;
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
      this.loading = false;
    }  } catch (e) {
    alert(e);
  }
}
export async function makeCall(id, userId) {
  const activeId = id;
  const activeUserId = userId;
  const prefix = "HRM-";
  const random = Math.random().toString(36).substr(2, 5) + '-' + Date.now().toString(36).substr(2, 5);
  this.uniqueId = `${prefix}${random}`;
  var meetId = this.uniqueId.toUpperCase();
  const params = {
    name: meetId,
    title: meetId,
    users: activeId,
    createdBy: activeUserId,
  };
  this.meetLink(params, meetId);
}