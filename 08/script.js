let mapData = null;

fetch("data.txt")
    .then(res => res.text())
    .then(text => {
        mapData = text
            .trim()
            .split("\n")
            .map(line => line.split(""));
        return mapData;
    })
    .then(res => { // find antennas
        let antennas = [];
        for (let i = 0; i < res.length; i++) { // y
            for (let j = 0; j < res[i].length; j++) { // x
                if (res[i][j] !== '.') {
                    antennas.push({ value: res[i][j], x: j, y: i });
                }
            }
        }
        return antennas;
    })
    .then(res => { // setup charMap: frequency -> array of {x,y}
        let charMap = new Map();
        res.forEach(r => {
            if (!charMap.has(r.value)) {
                charMap.set(r.value, [{ x: r.x, y: r.y }]);
            } else {
                charMap.get(r.value).push({ x: r.x, y: r.y });
            }
        });
        return charMap;
    })
    .then(res => {
        const allNodes = new Set();
        const width = mapData[0].length;
        const height = mapData.length;

        Array.from(res.values()).forEach(entryCoordinates => {
            for (let i = 0; i < entryCoordinates.length; i++) {
                for (let j = i + 1; j < entryCoordinates.length; j++) {
                    const antinodes = calcualteAntinodes(entryCoordinates[i], entryCoordinates[j], width, height);
                    antinodes.forEach(a => {
                        if (a.x >= 0 && a.x < width && a.y >= 0 && a.y < height) { // check bounds
                            allNodes.add(JSON.stringify(a));
                        }
                    });
                }
            }
        });

        const validNodes = Array.from(allNodes).map(str => JSON.parse(str));
        console.log("Unique antinode count:", validNodes.length);

        return res;
    })
    .then(res => res);

function ggt(a, b) { // grösster gemeinsamer teiler
    if (b === 0) return a;
    return gcd(b, a % b);
}

function calcualteAntinodes(antenna1, antenna2, width, height) {
    const dx = antenna2.x - antenna1.x;
    const dy = antenna2.y - antenna1.y;
    const g = ggt(Math.abs(dx), Math.abs(dy));
    const stepX = g === 0 ? 0 : dx / g;
    const stepY = g === 0 ? 0 : dy / g;

    const points = new Set();

    if (stepX === 0 && stepY === 0) {
        points.add(JSON.stringify({ x: antenna1.x, y: antenna1.y }));
        return Array.from(points).map(str => JSON.parse(str));
    }

    function walk(x, y, sx, sy) {
        while (x >= 0 && x < width && y >= 0 && y < height) {
            points.add(JSON.stringify({x, y}));
            x += sx;
            y += sy;
        }
    }

    walk(antenna1.x, antenna1.y, stepX, stepY);
    walk(antenna1.x, antenna1.y, -stepX, -stepY);

    return Array.from(points).map(str => JSON.parse(str));
}
