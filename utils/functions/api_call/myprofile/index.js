import axios from "axios";
export async function addFiles(payload, files) {
  let fd = new FormData();
  
  for (let i = 0; i < files.length; i++) {
    fd.append("files", files[i])
    console.log(files[i], "kasdjhkjahsdkjahskdjk")
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
    // this.files = files;
    console.log(files, "employeeTime");
  } catch (e) {
    alert(e);
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
    //   this.filesUploaded = files.data;
    //   this.fileList += 1;
      return files.data
      console.log(files, "employeeTime");
    } catch (e) {
      alert(e);
    }
  }
 
