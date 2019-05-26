export default {

    /**
     *  获取cookie
     */
    getChromeCookieValue: (matchedUrl, cookieName) => {
        return new Promise((resolve, reject) => {
            chrome.cookies.get({url: matchedUrl, name: cookieName}, (cookie) => {
                if (cookie) {
                    resolve(cookie.value);
                } else {
                    reject('Can\'t get cookie! Check the name!');
                }
            });
        });
    },
    isJson: (data) => {
        try {
            if (typeof data === 'string') {
                JSON.parse(data);
            }
        } catch (e) {
            return false;
        }
        return true;
    }
}