const PALLETTE = {
    k: "#2a1707",
    d: "#6b4423",
    m: "#8f5e2e",
    l: "#b98a4a",
    g: "#d0d0d0",
    s: "#555555",
    i: "#120a04",
    y: "#ffe066",
};

function pixelSprite(rows, scale, pal = PALLETTE) {
    const w = rows[0].length, h = rows.length;
    const c = document.createElement("canvas");
    c.width = w;
    c.height = h;
    c.style.width = w * scale + "px";
    c.style.height = h * scale + "px";
    const ctx = c.getContext("2d");
    rows.forEach((rows, y) => {
        [...row].forEach((ch, x) => {
            if (pal[ch]) {
                ctx.fillStyle = pal[ch];
                ctx.fillRect(x, y, 1, 1);
            }
        });
    });
    return c;
}

const CHEST_CLOSED = [
    ".kkkkkkkkkkkkkk.",
    "kllllllllllllllk",
    "kmmmmmmmmmmmmmmk",
    "kmmdmmmmmmmmdmmk",
    "kmmmmmmssmmmmmmk",
    "kkkkkkkggkkkkkkk",
    "kmmmmmmggmmmmmmk",
    "kmmmmmmssmmmmmmk",
    "kmmdmmmmmmmmdmmk",
    "kmmmmmmmmmmmmmmk",
    "kddddddddddddddk",
    "kkkkkkkkkkkkkkkk",
];

const CHEST_OPEN = [
    ".kkkkkkkkkkkkkk.",
    "kllllllllllllllk",
    "kmmmmmmmmmmmmmmk",
    "kmmdmmmmmmmmdmmk",
    "kmmmmmmmmmmmmmmk",
    "kddddddddddddddk",
    "kkkkkkkkkkkkkkkk",
    "kiiiiiiiiiiiiiik",
    "kiiiiiiiiiiiiiik",
    "kllllllllllllllk",
    "kmmmmmmssmmmmmmk",
    "kmmdmmmmmmmmdmmk",
    "kmmmmmmmmmmmmmmk",
    "kddddddddddddddk",
    "kkkkkkkkkkkkkkkk",
];

const JUKEBOX = [
    "kkkkkkkkkkkkkkkk",
    "kllllllllllllllk",
    "kmmmmmmmmmmmmmmk",
    "kddddddddddddddk",
    "kmmkkkkkkkkkkmmk",
    "kmmkiiiiiiiikmmk",
    "kmmkiiiiiiiikmmk",
    "kmmkkkkkkkkkkmmk",
    "kmmmmmmmmmmmmmmk",
    "kmmdmmmmmmmmdmmk",
    "kmmmmmmmmmmmmmmk",
    "kddddddddddddddk",
    "kmmmmmmmmmmmmmmk",
    "kmmmmmmmmmmmmmmk",
    "kkkkkkkkkkkkkkkk",
];

const NOTE = [
    "...yyyy.",
    "...y..yy",
    "...y....",
    "...y....",
    "...y....",
    ".yyy....",
    "yyyy....",
    ".yy.....",
];

const DISC_ROWS = (() => {
    const rows = [];
    for (let y = 0; y < 16; y++) {
        let r = "";
        for (let x = 0; x < 16; x++) {
            const d = Math.hypot(x - 7.5, y -7.5);
            if (d < 1.6) r += ".";
            else if (d < 4.3) r += "c";
            else if (d < 7.9) r += d < 5.4 || d > 6.6 ? "o" : "w";
            else r += ".";
        }
        rows.push(r);
    }
    return rows;
})();

function discSprite(color, scale = 4) {
    return pixelSprite(DISC_ROWS, scale, { c: color, o: "#101010", w: "#2e2e2e"});
}

(function makeDirt() {
    const c = document.createElement("canvas");
    c.width = c.height = 16;
    const x = c.getContext("2d");
    const cols = ["#5a3d24", "#4e341e", "#654529", "#47301c"];
    for (let i = 0; i < 16; i++)
        for (let j = 0; j < 16; j++) {
            x.fillStyle = cols[Math.floor(Math.random() * cols.length)];
            x.fillRect(i, j, 1, 1);
        }
    document.body.style.backgroundImage = `url(${c.toDataURL()})`;
    document.body.style.backgroundSize = "64px 64px";
})();

const TRACKS = [
    {
        name: "Calm Piano",
        color: "#e63946",
        bpm: 70, step: 0.5, gain: 1,
        wave: { mel: "triangle", arp: "sine", bass: "sine" },
        chords: [
            { bass: "A2", arp: ["A3", "C4", "E4"] },
            { bass: "F2", arp: ["F3", "A3", "C4"] },
            { bass: "C3", arp: ["C4", "E4", "G4"] },
            { bass: "G2", arp: ["G3", "B3", "D4"] },
        ],
        sections: [
            [
                [["E5", 1], ["D5", 0.5], ["C5", 0.5], ["E5", 2]],
                [["C5", 1], ["A4", 1], ["C5", 2]],
                [["E5", 1], ["G5", 1], ["E5", 1], ["D5", 1]],
                [["D5", 2], ["B4", 1], ["D5", 1]],
            ],
            [
                [["A4", 1], ["C5", 1], ["E5", 2]],
                [["F5", 1], ["E5", 1], ["C5", 2]],
                [["G4", 1], ["C5", 1], ["E5", 1], ["G5", 1]]
                [["F5", 1], ["D5", 1], ["B4", 2]],
            ],
        ],
        order: [0, 1, 0]
    },
    
]