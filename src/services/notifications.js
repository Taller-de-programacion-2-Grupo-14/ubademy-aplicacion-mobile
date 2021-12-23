export async function sendPushNotification(title, body, user_id) {
    return fetch(`${global.host}/notification`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
        },
        body: JSON.stringify({
            "title": title,
            "body": body,
            "user_id": user_id
        })
    });
}