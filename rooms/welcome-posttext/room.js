const messageChannel = window.top;

window.addEventListener("load", () => {
    messageChannel.postMessage({
        type: "ready",
        room: "welcome-posttext"
    });
});

// 
// Room actions
// 
const texts = [
    "Seid gegrüßt, Abenteurer, in unserem verfluchten Lande! Hier regiert die Macht der Sprache, und die Stilmittel bestimmen das Schicksal aller Bewohner.",
    "Eure Reise beginnt heute im <span class='fancy'>Tal der Metaphern</span>, einem magischen Ort voller Bilder und Vergleiche.",
    "Während eurer Reise, Abenteurer, werdet Ihr die <span class='fancy'>Magie der Sprache</span> entdecken und die Gehimnisse unserer Ländereien verstehen.",
    "Doch seid gewarnt, denn die Macht der Worte kann auch gefährlich sein. Wir haben schon viele Helden in der <span class='fancy'>Klimax-Wüste</span> oder auch den <span class='fancy'>Abgrund der Ironie</span> stürzen sehen.",
    "Bitte sorgt dafür, dass unsere Ländereien nicht den bösen Mächten verfallen. Wir zählen auf Euch, Abenteurer!",
    "Doch genug der Worte, Abenteurer. Eure Reise beginnt jetzt. Möge die Macht der Sprache mit Euch sein!"
];

const room = {
    elements: {
        container: document.getElementById("text-tiles"),
        body: document.body
    },
    currentText: 0,
    clickToContinue: false,
    nextText: () => {
        if (room.currentText < texts.length) {
            // Remove active id from previous text
            if (room.currentText != 0) document.getElementById("active").id = "";
            // Create new text element
            let textElement = document.createElement("div");
            textElement.classList.add("text-tile", "text-tile-" + room.currentText);
            textElement.id = "active";
            textElement.innerHTML = texts[room.currentText];
            // Add text to container
            room.elements.container.appendChild(textElement);
            // Increment current text
            room.currentText++;
            // Auto scroll to bottom
            room.elements.body.scrollTop = room.elements.body.scrollHeight;
        } else {
            if (room.clickToContinue) {
                messageChannel.postMessage({
                    type: "load",
                    room: "tal-der-metaphern",
                });
            }
            room.clickToContinue = true;
            let continueElement = document.createElement("div");
            continueElement.classList.add("text-tile", "text-tile-continue");
            continueElement.innerHTML = "Mit dem nächsten Klick beginnt Eure Reise!";
            room.elements.container.appendChild(continueElement);
            room.elements.body.scrollTop = room.elements.body.scrollHeight;
        }
    },
};
window.addEventListener("click", room.nextText);
room.nextText();