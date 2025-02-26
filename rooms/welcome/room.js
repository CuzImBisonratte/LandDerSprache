const messageChannel = window.top;

window.addEventListener("load", () => {
    messageChannel.postMessage({
        type: "ready",
        room: "welcome"
    });
});

// 
// Room actions
// 
const room = {
    start: (difficulty) => {
        messageChannel.postMessage({
            type: "setValues",
            difficulty: difficulty,
        });
        messageChannel.postMessage({
            type: "load",
            room: "welcome-posttext",
        });
    },
};