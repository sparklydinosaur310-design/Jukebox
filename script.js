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

function discSprite(color, scale = 4) {}