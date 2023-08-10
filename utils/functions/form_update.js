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
      console.log(res);
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
  // if (!this.updateForm.address) {
  //   this.errorMsgStreet = true;
  //   return true;
  // }
  // this.errorMsgStreet = false;
  // if (!this.updateForm.address.street) {
  //   this.errorMsgStreet = true;
  //   return true;
  // }
  // this.errorMsgSuit = false;
  // if (!this.updateForm.address.suit) {
  //   this.errorMsgSuit = true;
  //   return true;
  // }
  // this.errorMsgSuit = false;
  // if (!this.updateForm.address.country) {
  //   this.errorMsgCountry = true;
  //   return true;
  // }
  // this.errorMsgCountry = false;
  // if (!this.updateForm.address.state) {
  //   this.errorMsgState = true;
  //   return true;
  // }
  // this.errorMsgState = false;
  // if (!this.updateForm.address.postalCode) {
  //   this.errorMsgPostalCode = true;
  //   return true;
  // }
  // this.errorMsgPostalCode = false;
  this.loading = true;
  var data = JSON.stringify(this.updateForm);
  await this.$axios
    .$put(`${process.env.API_URL}/employees/${this.id}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      // console.log(data, this.updateForm, "http://dev-hrm.business-in-a-box.com/");
      this.openPopupNotification(1);
      // this.$store.dispatch("employee/setUser" , { id: this.$route.params.id})
      this.localData = data
      this.form = res;
      console.log(res, "callled");
      this.loading = false;
      this.isFlag = false;
      this.updateForm = {};
    })
    .catch((err) => {
      console.log("There was an issue in employees API", err);
      
    });
  this.loading = false;
}
export function handleInput(event, name, addresses) {
  let add = {};
  // this.isFlag = true;
  if (addresses == "team") {
    this.updateForm.teams = this.updateForm.teams || [];
    // console.log(this.updateform.teams, "calllled")
    this.updateForm.teams.push(event);
    console.log(event, name, "calllled");
    return;
  }
  if (addresses === "addresses") {
    if (event == "USA") {
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
      this.otherStateVisible = true
    }
    add[name] = event;
    this.updateForm.address = this.updateForm.address || [];
    this.updateForm.address = {
      ...this.updateForm.address,
      ...add,
    };
    // this.form.address = {
    //   ...this.form.address,
    //   ...add,
    // };
    console.log(this.updateForm, "updateFormmmmmmmmmmmmmmmmmmmmmmm");
  } else {
    this.isFlag = true;
    this.updateForm[name] = event;
    // this.form[name] = event;
    console.log(this.updateForm, "update");
  }
}
export function handleInputObject(event, name, emContact) {
  console.log(event, name, emContact, "callled");
  let add = {};
  this.isFlag = true;
  if (emContact == "emContact") {
    add[name] = event;
    this.updateForm.emergencyContacts = this.updateForm.emergencyContacts || [];
    this.updateForm.emergencyContacts = {
      ...this.updateForm.emergencyContacts,
      ...add,
    };
    this.form.emergencyContacts = {
      ...this.form.emergencyContacts,
      ...add,
    };
    console.log(this.updateForm, "aslkdnalsdjlk");
  
  }
}
export function addHandleInput(event, name, addresses) {
  this.isFlag = true;
  this.addForm[name] = event;
  // this.form[name] = event;
  // console.log(this.addForm, "update");
  console.log(this.addForm.start, "this.addForm.start");
  if (this.addForm.start != "" || this.addForm.endDate != "" || this.addForm.type != "") {
    this.errorMsgStartDate = false;
    this.errorMsgEndDate = false;
    this.errorMsgSelect = false;
  }
}
export function editHandleInput(event, name, addresses) {
  // this.isFlag = true;
  this.updateForm[name] = event;
  // this.form[name] = event;
  console.log(this.updateForm, "update");
}
export function handleOrgProfile(event, name, addresses) {
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
      this.cureentState = this.states.filter((item, index) => {
        if (item.code == event) {
          this.stateVisible = true;
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
      this.otherStateVisible = true
    }
    this.updateForm[name] = event;
    this.form[name] = event;
    console.log(this.updateForm, "updateFormmmmmmmmmmmmmmmmmmmmmmm");
  } else {
    this.isFlag = true;
    this.updateForm[name] = event;
    // this.form[name] = event;
    console.log(this.updateForm, "update");
  }
}