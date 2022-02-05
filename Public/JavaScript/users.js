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

module.exports = {
    joinUser,
    getUser
}