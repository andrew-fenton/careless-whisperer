export async function getUserInfo(): Promise<chrome.identity.UserInfo> {
    return new Promise((resolve, reject) => {
        chrome.identity.getProfileUserInfo({}, (userInfo: chrome.identity.UserInfo) => {
        if (chrome.runtime.lastError) {
            reject(new Error(chrome.runtime.lastError.message));
        } else {
            resolve(userInfo);
        }
        });
    });
}
