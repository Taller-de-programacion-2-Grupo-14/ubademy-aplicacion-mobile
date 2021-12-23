export async function sendPushNotification(title, body, user_id) {
    console.log('en notisss', user_id);
    return fetch(`${global.host}/notification`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "title": title,
            "body": body,
            "user_id": user_id
        })
    });
}