import axios from "axios";
import { createConfig } from "../config";
import { hrmApiAxiosInstance } from "../hrm-api-axios-instance";
export async function addFiles(payload, files) {
  let fd = new FormData();
  if (files.length === 0) {
    return this.$openPopupNotification(7);
  }
  for (let i = 0; i < files.length; i++) {
    fd.append("files", files[i]);
  }
  try {
    const url = `/employees/${payload}/files`;
    const config = createConfig();
    const addFiles = await hrmApiAxiosInstance.post(url, fd, config);
    return addFiles;
  } catch (e) {
    console.log(e);
  }
}
export async function getFiles(payload) {
  try {
    const url = `/employees/${payload}/files`;
    const config = createConfig();
    const files = await hrmApiAxiosInstance.get(url, config);
    return files.data;
  } catch (e) {
    if (e.response.status === 500) {
      return window.open("/not-found", "_self");
    }
    console.log(e);
  }
}
export async function deleteFiles(payload) {
  try {
    const url = `/employees/${payload.employeeId}/files/${payload.id}`;
    const config = createConfig();
    const files = await hrmApiAxiosInstance.delete(url, config);
    return files.data;
  } catch (e) {
    console.log(e);
  }
}
