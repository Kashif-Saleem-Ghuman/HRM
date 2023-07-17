export async function vfileAdded(file, name, event) {
  this.isFlag = true;
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
      console.log(res)
      // this.openPopupNotification(0);
      this.avatarUrl = res;
      this.updateForm[name] = this.avatarUrl;
      // this.form[name] = this.avatarUrl;
      // console.log(
      //   name,
      //   this.updateForm,
      //   "https://dev-account-api.business-in-a-box.com/v1/user/avatar/upload"
      // );
    })
    .catch((err) => {
      console.log("There was an issue in employees API", err);
    });
  this.loading = false;
}
export async function updateAllData() {
  if (this.isFlag == false) {
    alert("No data to Update");
    return true;
  }
  this.loading = true;
  // var data = JSON.stringify(this.updateForm);
  await this.$axios
    .$put(`${process.env.API_URL}/employees/${this.id}`, this.updateForm, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        'Content-Type': 'application/json',
      },

    })
    .then((res) => {
      // console.log(data, this.updateForm, "http://dev-hrm.business-in-a-box.com/");
      this.openPopupNotification(1);
      // this.$store.dispatch("employee/setUser" , { id: this.$route.params.id})
      this.form = res
      console.log(res, "callled")
      this.inactive = "disabled";
      this.updateButton = "disabled";
      this.loading = false;
      this.isFlag = false;
      this.updateForm={}
    })
    .catch((err) => {
      console.log("There was an issue in employees API", err);
    });
  this.loading = false;
}
export function handleInput(event, name, addresses) {
  let add = {};
  this.isFlag = true;
  if (addresses == "team") {
    this.updateForm.teams = this.updateForm.teams || [];
    // console.log(this.updateform.teams, "calllled")
    this.updateForm.teams.push(event);
    console.log(event, name, "calllled");
    return;
  }
  if (addresses === "addresses") {
    if (event == "USA") {
      alert("callled")
      this.cureentState = this.states.filter((item, index) => {
        if (item.code == event) {
          // this.stateVisible = true;
          this.isFlag = true;
          return item;
        }
      });
    }
    if (event == "Canada") {
      this.cureentState = this.states.filter((item, index) => {
        if (item.code == event) {
          this.stateVisible = true;
          this.isFlag = true;
          return item;
        }
      });
    }
    if (event == "Other") {
      // this.updateForm.addresses[0]["state"] = "";
      this.stateVisible = false;
    }
    // add[name] = event;
    // this.updateForm.address = this.updateForm.address || [];
    // this.updateForm.address = {
    //   ...this.updateForm.address,
    //   ...add,
    // };
    // this.form.address = {
    //   ...this.form.address,
    //   ...add,
    // };
    // console.log(this.updateForm, "update");
  } else {
    this.isFlag = true;
    this.updateForm[name] = event;
    // this.form[name] = event;
    console.log(this.updateForm, "update");
  }
}
export function handleInputObject(event, name, emContact) {
  console.log(event, name, emContact, "callled")
  let add = {};
  this.isFlag = true;
  if (emContact == "emContact1") {
    add[name] = event;

    this.updateForm.emergencyContacts = this.updateForm.emergencyContacts || [];
    this.updateForm.emergencyContacts[0]= {...this.form.emergencyContacts[0]}
    this.updateForm.emergencyContacts[1] = {
      ...this.updateForm.emergencyContacts[1],
      ...this.form.emergencyContacts[1],
      ...add,
    };
    console.log(this.updateForm.emergencyContacts[1], "aslkdnalsdjlk")
  } else {
    add[name] = event;
    this.updateForm.emergencyContacts = this.updateForm.emergencyContacts || [];
    this.updateForm.emergencyContacts[1]= {...this.form.emergencyContacts[1]}
    this.updateForm.emergencyContacts[0] = {
      ...this.form.emergencyContacts[1],
      ...this.updateForm.emergencyContacts[0],
      ...add,
    };
  }
}
export function addHandleInput(event, name, addresses) {
  this.isFlag = true;
    this.addForm[name] = event;
    // this.form[name] = event;
    console.log(this.addForm, "update");
}
