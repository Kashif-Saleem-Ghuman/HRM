import axios from "axios";
export async function getUser() {
  let userID = localStorage.getItem("userID");
  try {
    const avtar = await axios.get(process.env.USER_API_URL + "/" + userID, {
      headers: {
        Authorization: "Bearer " + this.getAccessToken,
      },
    });
    localStorage.setItem("userPhoto", avtar.data[0].Photo);
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
export function handleInput(event, name, addresses, personalEmails) {
  let add = {};
  this.isFlag = true;
  if (addresses == "addresses") {
    add[name] = event;
            this.updateForm.addresses=this.updateForm.addresses || [];
            this.updateForm.addresses[0] = {...this.updateForm.addresses[0], ...add }
            console.log(this.updateForm, "update");
  } 
  // if(personalEmails == 'personalEmails'){
  //   this.updateForm.personalEmails=this.updateForm.personalEmails || [];
  //   this.updateForm.personalEmails[0] = {...this.updateForm.personalEmails[0], ...add }
  //   console.log(this.updateForm, "update");
  // }
  else {
    this.updateForm[name] = event;
    this.form[name] = event;
    console.log(this.updateForm, "update");

  }
}
export function handleInputObject(event, name, emContact) {
  let add = {};
  this.isFlag = true;
  if (emContact == "emContact1") {
    add[name] = event;
    this.updateForm.emergencyContacts=this.updateForm.emergencyContacts || [];
      this.updateForm.emergencyContacts[1] = {...this.updateForm.emergencyContacts[1], ...add }
      this.form.emergencyContacts[1] = {...this.updateForm.emergencyContacts[1], ...add }
    }
  else {
    add[name] = event;
    this.updateForm.emergencyContacts=this.updateForm.emergencyContacts || [];
      this.updateForm.emergencyContacts[0] = {...this.updateForm.emergencyContacts[0], ...add }
      this.form.emergencyContacts[0] = {...this.updateForm.emergencyContacts[0], ...add }
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
export async function vfileAdded(file, name, event) {
  this.isFlag = true
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
      this.avatarUrl = res;
      this.updateForm[name] = this.avatarUrl;
    this.form[name] = this.avatarUrl;
      console.log(name, this.updateForm, "https://dev-account-api.business-in-a-box.com/v1/user/avatar/upload")
    })
    .catch((err) => {
      console.log("There was an issue in employees API", err);
    });
  this.loading = false;
}
