import { createConfig } from "../config";
import { hrmApiAxiosInstance } from "../hrm-api-axios-instance";
export async function meetLink(payload) {
  this.loading = true;
  const { name, title, users, createdBy } = payload;
  try {
    const url = `https://dev-video-app-api.business-in-a-box.com/conference/`;
    const params = {
      name: name, // This is the body part
      title: title,
      users: [users],
      createdBy: createdBy,
    }
    const config = createConfig();
    const meetUrl = await hrmApiAxiosInstance.post(
      url,
      params,
      config
    );
    if(meetUrl.status === 201){
      const url = meetUrl.data.name
      window.open(process.env.VIDEO_CONF_APP_URL +'/'+ url, "_blank");
      this.loading = false;
    }  } catch (e) {
    console.log(e)
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