fetch("data.txt")
    .then(res => res.text())
    .then(res => res.split("\n"))
    .then(res => res.map(line => line.split("")))
    .then(res => update(res))
    .then(res => res.flat().filter(x => x === 'X').length)
    .then(res => console.log(res));

const findGuardPosition = (positions) => {
    for (let i = 0; i < positions.length; i++) {
        for (let j = 0; j < positions[i].length; j++) {
            const currentElement = positions[i][j];
            if (['v', '^', '<', '>'].includes(currentElement)) {
                return { x: j, y: i, char: currentElement };
            }
        }
    }
    return { x: -1, j: -1, char: '' };
}

const update = (positions) => {

    let guardPositon = findGuardPosition(positions);

    while (true) {
        const failCondition = guardPositon.x < 0 ||
            guardPositon.x >= positions[0].length ||
            guardPositon.y < 0 ||
            guardPositon.y >= positions.length;

        if (failCondition) {
            break;
        }

        switch (guardPositon.char) {
            case '^': // up
                if (positions[guardPositon.y - 1][guardPositon.x] === '#') {
                    // has collision
                    guardPositon.char = '>';
                } else {
                    // has no collision
                    positions[guardPositon.y][guardPositon.x] = 'X';
                    guardPositon.y -= 1;
                }
                break;
            case '>': // right
                if (positions[guardPositon.y][guardPositon.x + 1] === '#') {
                    guardPositon.char = 'v';
                } else {
                    positions[guardPositon.y][guardPositon.x] = 'X';
                    guardPositon.x += 1;
                }
                break;
            case 'v': // down
                if (positions[guardPositon.y + 1][guardPositon.x] === '#') {
                    guardPositon.char = '<';
                } else {
                    positions[guardPositon.y][guardPositon.x] = 'X';
                    guardPositon.y += 1;
                }
                break;
            case '<': // left
                if (positions[guardPositon.y][guardPositon.x - 1] === '#') {
                    guardPositon.char = '^';
                } else {
                    positions[guardPositon.y][guardPositon.x] = 'X';
                    guardPositon.x -= 1;
                }
                break;
        }
    }

    return positions;
}
