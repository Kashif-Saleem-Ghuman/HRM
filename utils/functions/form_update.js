export async function vfileAdded(file, name, event) {
  if (file.size > 2000000) {
    return true;
  }
  this.fileDetail = file;
  let formData = new FormData();
  formData.append("width", file.width);
  formData.append("height", file.height);
  formData.append("left", "0");
  formData.append("top", "0");
  formData.append("file", this.fileDetail);
  await this.$axios
    .$post(
      `https://dev-account-api.business-in-a-box.com/v1/user/avatar/upload`,
      formData,
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
      // this.avatarUrl[name] = res;
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
  var data = JSON.stringify(this.updateForm);
  await this.$axios
    .$put(`${process.env.API_URL}/employees/${this.id}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      console.log(
        res.maritalStatus,
        this.updateForm,
        "http://dev-hrm.business-in-a-box.com/"
      );

      // this.$store.dispatch("token/setActiveUserData" ,  res )
      this.name = res;
      this.form = res;
      this.loading = false;
      this.isFlag = false;
      this.openPopupNotification(1);

      this.$nuxt.$emit("top-nav-key");

      this.updateForm = {};
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
    this.updateForm.teams.push(event);
    return;
  }
  if (addresses === "addresses") {
    if (event == "USA") {
      this.currentState = this.states.filter((item, index) => {
        if (item.code == event) {
          // this.stateVisible = true;
          this.isFlag = true;
          return item;
        }
      });
    }
    if (event == "Canada") {
      this.currentState = this.states.filter((item, index) => {
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
      this.otherStateVisible = true;
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
  } else {
    this.isFlag = true;
    this.updateForm[name] = event;
    // this.form[name] = event;
    // if (!/^[^@]+@\w+(\.\w+)+\w$/.test(this.updateForm.primaryEmail)) {
    //   this.errorMsgPrimaryEmail = true;
    //   return true;
    // }else{
    //   this.errorMsgPrimaryEmail = false;
    // }
  }
}
export function handleInputObject(event, name, emContact) {
  let add = {};
  this.isFlag = true;
  if (emContact == "emContact") {
    add[name] = event;
    this.updateForm.emergencyContact = this.updateForm.emergencyContact || [];
    this.updateForm.emergencyContact = {
      ...this.updateForm.emergencyContact,
      ...add,
    };
    // this.form.emergencyContacts = {
    //   ...this.form.emergencyContacts,
    //   ...add,
    // };
  }
}
export function addHandleInput(event, name, addresses) {
  this.addForm[name] = event;
  if (
    this.addForm.start != null ||
    this.addForm.endDate != null ||
    this.addForm.type != null
  ) {
    this.errorMsgStartDate = false;
    this.errorMsgEndDate = false;
    this.errorMsgSelect = false;
  }
}
export async function selectUserHandle(event, name) {
  this.id = event;
  this.$store.commit("employee/SET_SELECTED_EMPLOYEE_ID", {
    employeeId: this.id,
  });
  await this.$store
    .dispatch("leavesdata/setLeaveVacationsAllowance", this.id)
    .then((result) => {
      this.allowanceLeavesDetailedData = result;
      this.is_data_fetched = true;
    });
  this.isFlag = true;
  this.addForm[name] = event;
  const keyValue = this.apiUsedValue[this.leaveTypeActiveValue];
  return this.getLeaveAllowance[keyValue];
}
export function selectLeaveTypeHandle(event, name) {
  this.leaveTypeActiveValue = event;
  this.isFlag = true;
  this.addForm[name] = event;
  const keyValueAllowance = this.apiAllowanceValue[this.leaveTypeActiveValue];
  return this.getLeaveAllowance[keyValueAllowance];
}
export function editHandleInput(event, name, addresses) {
  // this.isFlag = true;
  this.updateForm[name] = event;
  // this.form[name] = event;
}
export function handleOrgProfile(event, name, addresses) {
  this.isFlag = true;
  if (addresses == "team") {
    this.updateForm.teams = this.updateForm.teams || [];
    this.updateForm.teams.push(event);
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
      this.otherStateVisible = true;
    }
    this.updateForm[name] = event;
    this.form[name] = event;
  } else {
    this.isFlag = true;
    this.updateForm[name] = event;
  }
}
