const messageChannel = window.top;

window.addEventListener("load", () => {
    messageChannel.postMessage({
        type: "ready",
        room: "welcome"
    });
});