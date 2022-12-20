import axios from 'axios';
export async function getUser() {
    let userID = localStorage.getItem("userID");
    try {
        const avtar = await axios.get(process.env.USER_API_URL + "/" + userID, {
            headers: {
                "Authorization": "Bearer " + this.getAccessToken
            }
        });
        this.userPhoto = avtar.data[0].Photo;
        localStorage.setItem('businessId',avtar.data[0].BusinessId )
    }
    catch (e) {
        alert(e)
    }
}
export async function getBusinessId() {
    let businessId = localStorage.getItem("businessId");
    try {
        const businessid = await axios.get(process.env.ORG_API_URL + "/" + businessId, {
            headers: {
                "Authorization": "Bearer " + this.getAccessToken
            }
        });
    }
    catch (e) {
        alert(e)
    }
}
export function openPopupNotification(n) {
    this.popupMessages.push(this.popupNotificationMsgs[n])
}
