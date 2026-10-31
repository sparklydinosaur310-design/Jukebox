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
    {
        name: "Pixel Meadow",
        color: "#2a9d8f",
        bpm: 110, step: 0.5, gain: 0.55,
        wave: { mel: "square", arp: "square", bass: "triangle" },
        chords: [
            { bass: "D3", arp: ["D4", "F#4", "A4"] },
            { bass: "A2", arp: ["A3", "C#4", "E4"] },
            { bass: "B2", arp: ["B3", "D4", "F#4"] },
            { bass: "G2", arp: ["G3", "B3", "D4"] },
        ],
        sections: [
            [
                [["F#5", 0.5], ["A5", 0.5], ["F#5", 0.5], ["E5", 0.5], ["D5", 2]],
                [["E5", 0.5], ["C#5", 0.5], ["E5", 0.5], ["A5", 0.5], ["E5", 2]],
                [["D5", 0.5], ["F#5", 0.5], ["B5", 1], ["A5", 1], ["F#5", 1]],
                [["G5", 1], ["F#5", 0.5], ["E5", 0.5], ["D5", 2]],
            ],
            [
                [["A5", 1], ["F#5", 1], ["D5", 1], ["F#5", 1]],
                [["E5", 1], ["C#5", 1], ["E5", 2]],
                [["D5", 1], ["B4", 1], ["D5", 1], ["F#5", 1]],
                [["B5", 1], ["A5", 1], ["G5", 2]],
            ],
        ],
        order: [0, 1, 0, 1],
    },
    {
        name: "Deep Cave",
        colol: "#4361ee",
        bpm: 56, step: 1, gain: 1,
        wave: { mel: "sine", arp: "triangle", bass: "sine"},
        chords: [
            { bass: "D2", arp: ["D3", "A3", "F4"] },
            { bass: "Bb2", arp: ["Bb3", "D4", "F4"] },
            { bass: "F2", arp: ["F3", "A3", "C4"] },
            { bass: "C3", arp: ["C4", "E4", "G4"] },
        ],
        sections: [
            [
                [["A4", 2], ["F4", 1], ["A4", 1]],
                [["D5", 3], ["C5", 1]],
                [["C5", 2], ["A4", 2]],
                [["G4", 2], ["E4", 2]],
            ],
            [
                [["D5", 2], ["E5", 1], ["F5", 1]],
                [["F5", 2], ["D5", 2]],
                [["A4", 1], ["C5", 1], ["F5", 2]],
                [["E5", 3], ["G4", 1]],
            ],
        ],
        order: [0, 1, 0],
    },
];

function freq(note) {
    const m = note.match(/^([A-G])([#b?])(\d)$/);
    const base = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11}[m[1]]
    + (m[2] === "#" ? 1 : m[2] === "b" ? -1 : 0);
    const semis = base + (Number(m[3]) - 4) * 12 - 9;
    return 440 * Math.pow(2, semis / 12);
}

const player = { ctx: null, gain: null, timer: null, nodes: [] };

function tone(ctx, dest, hz, start, dur, type, vol) {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.value = hz;
    g.gain.setValueAtTime(0.0001, start);
    g.gain.linearRampToValueAtTime(vol, start + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, start + dur);
    osc.connect(g);
    g.connect(dest);
    osc.start(start);
    osc.stop(start + dur + 0.05);
    player.nodes.push(osc);
}

function scheduleTrack(ctx, dest, t, t0) {
    const beat = 60 / t.bpm;
    const arpOrder = [0, 1, 2, 1];
    let bar = 0;

    t.order.forEach((si) => {
        t.sections[si].forEach((melody, i) => {
            const chord = t.chords[i];
            const start = t0 + bar * 4 * beat;

            tone(ctx, dest, freq(chord.bass), start, 4 * beat, t.waves.bass, 0.16 * t.gain);

            const count = Math.round(4 / t.step);
            for (let k = 0; k < count; k++) {
                const n = chord.arp[arpOrder[k % 4]];
                tone(ctx, dest, freq(n), start + k * t,step * beat, t,step * beat * 1.6, t.wave.arp, 0.07 * t.gain);
        }

        let pos = 0;
        melody.forEach(([note, len]) => {
            tone(ctx, dest, freq(note), start + pos * beat, len * beat * 0.95, t.wave.mel, 0.14 * t.gain);
            pos += len;
        });
        bar++;
    });
});
return bar * 4 * beat;
}

function startTrack(track,  onEnd) {
    stopTrack();
    if (!player.ctx) player.ctx = new (window.AudioContext || window.webkitAudioContext)
    const ctx = player.ctx;
    ctx.resume();

    const g = ctx.createGain();
    g.gain.value = 0.9;
    g.connect(ctx.destination);
    player.gain = g;

    const t0 = ctx.currentTime + 0.1;
    const end = t0 + scheduleTrack(ctx, g, track, t0) + 0.8;

    player.timer = setInterval(() => {
        if (ctx.currentTime >= end) {
            stopTrack();
            onEnd();
        }
    }, 150);
}

function stopTrack() {
    clearInterval(player.timer);
    player.nodes.forEach((o) => { try { o.stop(); } catch (e) {} });
    player.nodes = [];
    if (player.gain) { player.gain.disconnect(); player.gain = null; }
}

const pauseAudio = () => player.ctx && player.ctx.suspend();
const resumeAudio = () => player.ctx && player.ctx.resume();

const slots = [null, null, null];
let current = -1;
let playing = false;
let chestOpen = false;

const chestEL = document.getElementById("chest");
const inventory = document.getElementById("inventory");
const slotsBox = document.getElementById("slots");
const jukeboxWrap = document.getElementById("jukeboxWrap");
const jukeboxEL = document.getElementById("jukebox");
const noteEL = document.getElementById("note");
const statusEL = document.getElementById("status");

jukeboxEL.appendChild(pixelSprite(JUKEBOX, 10));
noteEL.appendChild(pixelSprite(NOTE, 5));
chestEL.tabIndex = 0;

function say(text) { statusEL.textContent = text; }

function makeDisc(trackIndex, onClick, spinning) {
    const wrap = document.createElement("div");
    wrap.className = "disc-wrap" + (spinning ? " spin" : "");
    wrap.title = "Disc: " + TRACKS[trackIndex].name;
    wrap.appendChild(discSprite(TRACKS[trackIndex].color));
    wrap.oneclick = onClick;
    return wrap;
}

function renderChest() {
    chestEL.innerHTML = "";
    chestEL.appendChild(pixelSprite(chestOpen ? CHEST_OPEN : CHEST_CLOSED, 10));
    chestEL.title = chestOpen ? "Click to close" : "Click to open";
}

function renderInventory() {
    inventory.innerHTML = "";
    TRACKS.forEach((t, i) => {
        const cell = document.createElement("div");
        cell.className = "slot";
        if (!slots.includes(i)) cell.appendChild(makeDisc(i, () => placeDisc(i), false));
        inventory.appendChild(cell);
    });
}

function renderSlots() {
    slotsBox.innterHTML = "";
    slots.forEach((trackIndex, s) => {
        const cell = document.createElement("div");
        cell.className = "slot" + (s === current && playing ? " playing" : "");
        if (trackIndex !== null) {
            cell.appendChild(makeDisc(trackIndex, () => removeDisc(s), s === current && playing));
        }
        const label = document.createElement("div");
        label.className = "slot-label";
        label.textContent = ["1st", "2nd", "3rd"][s];
        cell.appendChild(label);
        slotsBox.appendChild(cell);
    });
    jukeboxWrap.classList.toggle("playing", playing);
}

function render() {
    renderChest();
    renderInventory();
    renderSlots();
}

function placeDisc(trackIndex) {
    const free = slots.indexOf(null);
    if (free === -1) {
        say("Jukebox is full! Click a disc in a slot to take it out.");
        return;
    }
    slots[free] = trackIndex;
    say("Added " + TRACKS[trackIndex].name + ". Click the jukebox to play");
    render();
}

function removeDisc(slotIndex) {
    if (slotIndex === current) {
        stopTrack();
        current = -1;
        playing = false;
        say ("stopped");
    }
    slots[slotIndex] = null;
    render();
}

function nextFilled(start) {
    for (let i = start; i < slots,length; i++ ) if (slots[i] !== null) return i;
    return -1;
}

function playSlot(i) {
    if (i === -1) {
        stopTrack();
        current = -1;
        playing = false;
        say ("All discs finished. Click the jukebox to play again.");
        render();
        return;
    }
    current = i;
    playing = true;
    const track = TRACKS[slots[i]];
    startTrack(track, () => playSlot(nextFilled(current + 1)));
    say("Now playing: " + track.name);
    render();
}

function togglePlay() {
    if (slots.every((s) => s === null)) {
        say("Put a disc in the jukebox first!");
        return;
    }
    if (playing) {
        pauseAudio();
        playing = false;
        say("Paused.");
        render();
    } else {
        playSlot(nextFilled(0));
    }
}

function skip() {
    if (current === -1) return;
    playSlot(nextFilled(current + 1));
}

chestEL.onclick = () => {
    chestOpen = !chestOpen;
    inventory.classList.toggle("hidden", !chestOpen);
    renderChest();
};
chestEL.onkeydown = (e) => { if (e.key === "Enter" || e.key === " ") chestEL.click(); };

jukeboxEl.onclick = togglePlay;
jukeboxEL.oncontextmenu = (e) => { e.preventDefault(); skip(); };
document.getElementById("playBtn").onclick = togglePlay;
document.getElementById("skipBtn").onclick = skip;

render();