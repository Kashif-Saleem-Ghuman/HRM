export async function vfileAdded(file, id, name, event) {
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
      this.$nuxt.$emit("dropzone-key");
      // this.openPopupNotification(0);
      this.avatarUrl = res;
      this.form.photo = res;
      this.$root.$emit("update-header-photo");
      this.$root.$emit("top-nav-photo-update", res);
      this.$root.$emit("photo-updated");
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
      this.stateVisible = false;
      this.otherStateVisible = true;
    }

    add[name] = event;
    this.updateForm.address = this.updateForm.address || [];
    this.updateForm.address = {
      ...this.updateForm.address,
      ...add,
    };
  } else {
    this.isFlag = true;
    this.updateForm[name] = event;
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
  }
}
export function addHandleInput(event, name) {
  if (name === "isHalfDay") {
    this.isHalfday = event;
  }
  if (name === "start" || name === "end") {
    this[name] = event;
  }
  const startDefined = typeof this.start === "string";
  const endDefined = typeof this.end === "string";
  const datesMatch = startDefined && endDefined && this.start === this.end;
  if (!datesMatch) {
    this.isHalfday = false;
    this.$nuxt.$emit("update-checkbox");
    this.addForm.isHalfDay = false;
  }
  this.addForm[name] = event;
  if (
    this.addForm.start != null ||
    this.addForm.endDate != null ||
    this.addForm.type != null
  ) {
    this.errorMsgStartDate = false;
    this.errorMsgEndDate = false;
    this.errorMsgEndDateGreater = false;
  }
}
export async function selectUserHandle(event, name) {
  this.id = event;
  this.$store.commit("employee/SET_SELECTED_EMPLOYEE_ID", {
    employeeId: this.id,
  });
  await this.$store
    .dispatch("leavesdata/setLeaveVacationsAllowance", { id: this.id })
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
