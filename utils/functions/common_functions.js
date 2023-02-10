import axios from "axios";
export async function getUser() {
  let userID = localStorage.getItem("userID");
  try {
    const avtar = await axios.get(process.env.USER_API_URL + "/" + userID, {
      headers: {
        Authorization: "Bearer " + this.getAccessToken,
      },
    });
    this.userPhoto = avtar.data[0].Photo;
    localStorage.setItem("businessId", avtar.data[0].BusinessId);
  } catch (e) {
    alert(e);
  }
}
export async function getEmployess() {
  // let userID = localStorage.getItem("userID");
  try {
    const response = await axios.get(process.env.API_URL + "employees", {
      headers: {
        Authorization: "Bearer " + this.getAccessToken,
      },
    });
    console.log(response, "calllllled");
  } catch (e) {
    alert(e);
  }
}
export async function getBusinessId() {
  let businessId = localStorage.getItem("businessId");
  try {
    const businessid = await axios.get(
      process.env.ORG_API_URL + "/" + businessId,
      {
        headers: {
          Authorization: "Bearer " + this.getAccessToken,
        },
      }
    );
  } catch (e) {
    alert(e);
  }
}
export function openPopupNotification(n) {
  this.popupMessages.push(this.popupNotificationMsgs[n]);
}
export function handleInput(event, name, addresses) {
  let add = {};
  this.isFlag = true;
  if (addresses == "addresses") {
    console.log('hello')
    add[name]=event;
    this.updateForm[addresses]=[add];
    console.log(this.updateForm[addresses]=[add], "update");
    
    // this.updateForm[addresses][name] = event;
    // console.log(this.updateForm[addresses][name], "update");
  } else {
    this.updateForm[name] = event;
    this.form[name] = event;
  }
}
export async function updateAllData() {
  if (this.isFlag == false) {
    alert("No data to Update");
    return true;
  }
  this.loading = true;
  await this.$axios
    .$put(`${process.env.API_URL}/employees/${this.id}`, this.updateForm, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
    .then((res) => {
      console.log(this.updateForm, "http://dev-hrm.business-in-a-box.com/");
      this.openPopupNotification(1);
      this.form = res;
      this.inactive = "disabled";
      this.updateButton = "disabled";
      this.loading = false;
      this.isFlag = false;
    })
    .catch((err) => {
      console.log("There was an issue in employees API", err);
    });
  this.loading = false;
}
export async function vfileAdded(file) {
  this.fileDetail = file;
  let pimg = new FormData();
  pimg.append("file", this.fileDetail);
  await this.$axios
    .$post(
      `https://dev-account-api.business-in-a-box.com/v1/user/avatar/upload`,
      pimg,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "multipart/form-data",
        },
      }
    )
    .then((res) => {
      // this.openPopupNotification(0);
      this.avatraUrl = res;
      // console.log(res, "https://dev-account-api.business-in-a-box.com/v1/user/avatar/upload")
    })
    .catch((err) => {
      console.log("There was an issue in employees API", err);
    });
  await this.$axios
    .$put(
      `${process.env.API_URL}/employees/${this.id}`,
      { photo: this.avatraUrl },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      this.openPopupNotification(0);
      this.form = res;
      console.log(
        res,
        "asldasdhlkajhdjksahdkjahkdjhaskdhaksjdhkjashkjahsdhkjashdkjashdkjhaksd"
      );
    })
    .catch((err) => {
      console.log("There was an issue in employees API", err);
    });
  this.loading = false;
}
