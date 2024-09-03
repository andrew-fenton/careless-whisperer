import axios from "axios";
import { getUserInfo } from "../controllers/UserInfo";

chrome.runtime.onInstalled.addListener(async () => {
    try {
        const userInfo = await getUserInfo();
        await axios.post('http://localhost:3000/users', {
            googleId: userInfo.id,
            email: userInfo.email,
        });
        console.log('User information sent to the server.');
    } catch (error) {
        console.error('Error fetching user information:', error);
    }
});