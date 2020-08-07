
const deleteMessage = (btn) => {

    const msgID = btn.parentNode.querySelector('[name=msgId]').value;
    const csrfToken = btn.parentNode.querySelector('[name=_csrf]').value;
    const msgElement = btn.closest('div');

    fetch(`/admin/mailbox/${msgID}`, {
        method: 'DELETE',
        headers: {
            'csrf-token': csrfToken
        }
    })
    .then((result) => {
       return result.json();
    })
    .then(data => {
        console.log(data);
        msgElement.parentNode.removeChild(msgElement);
    })
    .catch((err) => {
        console.log(err);
    });
};

const deleteUser = (btn) => {

    const userID = btn.parentNode.querySelector('[name=userId]').value;
    const csrf = btn.parentNode.querySelector('[name=_csrf]').value;

    const element = btn.closest('tr');

    fetch(`/admin/users/${userID}`, {
        method: 'DELETE',
        headers: {
            'csrf-token': csrf
        }
    })
    .then((result) => {
        return result.json();
    })
    .then(data => {
        element.parentNode.removeChild(element);
        console.log(data);
    })
    .catch((err) => {
        console.log(err);
    });

    console.log(userID, csrf);

}