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
        // this.openPopupNotification(0);
        this.avatarUrl = res;
        this.updateForm[name] = this.avatarUrl;
        this.form[name] = this.avatarUrl;
        console.log(
          name,
          this.updateForm,
          "https://dev-account-api.business-in-a-box.com/v1/user/avatar/upload"
        );
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
  export function handleInput(event, name, addresses, personalEmails) {
    let add = {};
    this.isFlag = true;
    if (addresses == "addresses") {
      if (event == "USA") {
        console.log(this.states)
        this.cureentState = this.states.filter((item, index) => {
          if (item.code == event || item.code == "all") {
            this.stateVisible = true;
            this.isFlag = true;
            return item;
          }
        });
      }
      if (event == "Canada") {
        console.log(this.states)
        this.cureentState = this.states.filter((item, index) => {
          if (item.code == event || item.code == "all") {
            this.stateVisible = true;
            this.isFlag = true;
            return item;
          }
        });
      }
      if
       (event == "Other") {
        this.updateForm.addresses[0]["state"] = "";
        this.stateVisible = false;
      }
      add[name] = event;
      this.form.addresses[0] = {
        ...this.form.addresses[0],
        ...add,
      };
      this.updateForm.addresses = this.updateForm.addresses || [];
      this.updateForm.addresses[0] = {
        ...this.updateForm.addresses[0],
        ...add,
      };
      console.log(
        this.updateForm,
        "this.updateForm.addresses[0]this.updateForm.addresses[0]"
      );
    } else {
      this.isFlag = true;
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
      this.updateForm.emergencyContacts = this.updateForm.emergencyContacts || [];
      this.updateForm.emergencyContacts[1] = {
        ...this.updateForm.emergencyContacts[1],
        ...add,
      };
      this.form.emergencyContacts[1] = {
        ...this.updateForm.emergencyContacts[1],
        ...add,
      };
    } else {
      add[name] = event;
      this.updateForm.emergencyContacts = this.updateForm.emergencyContacts || [];
      this.updateForm.emergencyContacts[0] = {
        ...this.updateForm.emergencyContacts[0],
        ...add,
      };
      this.form.emergencyContacts[0] = {
        ...this.updateForm.emergencyContacts[0],
        ...add,
      };
    }
  }
  
  