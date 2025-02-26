const elements = {
    iframe: document.getElementById("game"),
}

const rooms = [
    "welcome"
];

const tips = [
    "a² + b² = c²... Warte, wie war das nochmal mit Deutsch?",
    "Die Antwort auf alles ist 42. Oder war es 43?",
    "Wenn du nicht weiterkommst, probier's mal mit Gemütlichkeit.",
    "Das leben ist kurz, rede schneller.",
    "@todo: Ein gutes Spiel programmieren!"
];

window.onmessage = (e) => {
    // Check if is json object
    if (!e.data || typeof e.data !== "object") return;
    // Switch through type
    msg = e.data;
    switch (msg.type) {
        case "init":
            // Initialize the game
            console.log("Initializing game");
            break;
        case "load":
            // Load a room
            if (rooms.includes(msg.room)) {
                console.log("Loading room: " + msg.room);
                // Load room
                document.getElementById("game").src = "rooms/" + msg.room + ".html";
            } else {
                console.error("Room not found: " + msg.room);
            }
            break;
        case "error":
            // Error message
            console.error(msg.message);
            break;
        default:
            console.log("Unknown message type: ", msg);
            break;
    }
};

// 
// Loading screen
// 
const loading_screen = {
    elements: {
        screen: document.getElementById("loading-screen"),
        message: document.getElementById("loading-message"),
    },
    show: () => {

    },
    hide: () => {

    },
    hideMSG: () => {
        return new Promise((resolve, reject) => {
            // Animate message
            loading_screen.elements.message.animate([
                { opacity: 1 },
                { opacity: 0 }
            ], {
                duration: 2000,
                easing: "ease-in-out",
                fill: "forwards"
            }).onfinish = resolve;
        });
    },
    showMSG: () => {
        return new Promise((resolve, reject) => {
            // Animate message
            loading_screen.elements.message.animate([
                { opacity: 0 },
                { opacity: 1 }
            ], {
                duration: 2000,
                easing: "ease-in-out",
                fill: "forwards"
            }).onfinish = resolve;
        });
    },
    changeMSG: async () => {
        await loading_screen.hideMSG();
        let newTip = tips[Math.floor(Math.random() * tips.length)];
        while (loading_screen.elements.message.innerText === newTip) newTip = tips[Math.floor(Math.random() * tips.length)];
        loading_screen.elements.message.innerText = newTip;
        await new Promise((resolve, reject) => setTimeout(resolve, 2000));
        await loading_screen.showMSG();
    }
};
window.setInterval(loading_screen.changeMSG, 10000 + 6000);
loading_screen.changeMSG();