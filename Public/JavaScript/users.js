const users = [];
const colors = ["#5cb85c", "#d9534f", "#5567db"];

// Join User to room add color too??
function joinUser(id, username, roomCode) {
    const userColor = colors[Math.floor(Math.random() * colors.length)];
    const user = { id, username, roomCode, userColor }

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