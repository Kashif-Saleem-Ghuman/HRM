import { createConfig } from "../config";
import axios from "axios";
export async function meetLink(payload) {
  this.loading = true;
  const { name, title, users, createdBy } = payload;

  const isFirefox = typeof navigator !== "undefined" && navigator.userAgent.toLowerCase().includes("firefox");

  let newWindow;
  if (isFirefox) {
    newWindow = window.open("", "_blank");
  }

  try {
    const url = `${process.env.VIDEO_CONF_API_URL}/conference/`;
    const params = {
      name: name, // This is the body part
      title: title,
      users: [users],
      createdBy: createdBy,
    }
    const config = createConfig();
    const meetUrl = await axios.post(url, params, config);

    if (meetUrl.status === 201) {
      const url = meetUrl.data.name;
      const finalUrl = process.env.VIDEO_CONF_APP_URL + "/" + url;

      if (isFirefox && newWindow) {
        newWindow.location.href = finalUrl;
      } else {
        window.open(finalUrl, "_blank");
      }
    } else {
      if (isFirefox && newWindow) newWindow.close();
    }
  } catch (e) {
    console.log(e);
    if (isFirefox && newWindow) newWindow.close();
  } finally {
    this.loading = false;
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