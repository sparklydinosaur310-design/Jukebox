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

