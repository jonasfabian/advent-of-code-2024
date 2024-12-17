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
                    const antinodes = calcualteAntinodes(entryCoordinates[i], entryCoordinates[j]);
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

function calcualteAntinodes(antenna1, antenna2) {
    const xDistance = antenna2.x - antenna1.x;
    const yDistance = antenna2.y - antenna1.y;

    const antinode = { x: antenna1.x - xDistance, y: antenna1.y - yDistance };
    const antinode2 = { x: antenna2.x + xDistance, y: antenna2.y + yDistance };

    return [antinode, antinode2];
}
