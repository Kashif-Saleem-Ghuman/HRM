export async function getUser() {
    let userID = localStorage.getItem("userID");
    try {
        const avtar = await axios.get(process.env.USER_API_URL + "/" + userID, {
            headers: {
                "Authorization": "Bearer " + this.getAccessToken
            }
        });
        this.userPhoto = avtar.data[0].Photo;
    }
    catch (e) { }
}
export function openPopupNotification(n) {
    this.popupMessages.push(this.popupNotificationMsgs[n])
  }
