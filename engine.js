const elements = {
    gameFrame: document.getElementById("gameFrame"),
}

const tips = [
    "a² + b² = c²... Warte, wie war das nochmal mit Deutsch?",
    "Die Antwort auf alles ist 42. Oder war es 43?",
    "Wenn du nicht weiterkommst, probier's mal mit Gemütlichkeit.",
    "Das leben ist kurz, rede schneller.",
    "@todo: Ein gutes Spiel programmieren!"
];

const engine = {
    messageChannel: document.getElementById("gameFrame").contentWindow,
    health: 5,
    difficulty: "easy",
    ready: (data) => {
        loading_screen.hide();
    },
    load: (data) => {
        loading_screen.show();
        window.setTimeout(() => {
            elements.gameFrame.src = `rooms/${data.room}/index.html`;
        }, 1000);
        window.history.pushState(null, null, "/?l=" + data.room);
    },
    setValues: (data) => {
        if (data.health) health_display.update(data.health);
        if (data.max_health) health_display.setMax(data.max_health);
        if (data.difficulty) engine.difficulty = data.difficulty;
    },
};

window.onmessage = (e) => {
    // Check if is json object
    if (!e.data || typeof e.data !== "object") return;
    // Run action
    engine[e.data.type](e.data);
};

// 
// Health display
// 
const health_display = {
    health: 5,
    max_health: 5,
    elements: {
        healthText: document.getElementById("health-text"),
    },
    update: (health) => {
        health_display.health = health;
        health_display.elements.healthText.innerText = `${health_display.health} / ${health_display.max_health}`;
    },
    setMax: (max) => {
        health_display.max_health = max;
        health_display.update(health_display.health);
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
    lastClosed: 0,
    show: () => {
        loading_screen.elements.screen.animate([
            {
                opacity: 0.95,
                transform: "translateY(-100vh)"
            },
            {
                opacity: 1,
                transform: "translateY(0)"
            }
        ], {
            duration: 1000,
            easing: "cubic-bezier(.5,0,0,1)",
            fill: "forwards"
        });
        loading_screen.lastClosed = Date.now();
    },
    hide: () => {
        window.setTimeout(() => {
            loading_screen.elements.screen.animate([
                {
                    opacity: 1,
                    transform: "translateY(0)"
                },
                {
                    opacity: 0.95,
                    transform: "translateY(-100vh)"
                }
            ], {
                duration: 1000,
                easing: "cubic-bezier(.5,0,0,1)",
                fill: "forwards"
            });
        }, Math.max(0, 2500 - (Date.now() - loading_screen.lastClosed)));
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

// Check for l parameter (location - load that room)
if ((new URLSearchParams(window.location.search)).get("l"))
    engine.load({ room: (new URLSearchParams(window.location.search)).get("l") });
