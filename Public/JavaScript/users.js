const users = [];

// Join User to room add color too??
function joinUser(id, username, roomCode) {
    const user = { id, username, roomCode }

    users.push(user);

    return user;
}

function getUser(id) {
    return users.find(user => user.id === id);
}

function removeUser(id) {
    const index = users.findIndex(user => user.id === id);

    if (index != -1) {
        return users.splice(index, 1)[0];
    }
}

module.exports = {
    joinUser,
    getUser,
    removeUser
}