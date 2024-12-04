let count = 0;

fetch("data.txt")
    .then((res) => res.text())
    .then((res) => res.split('\n'))
    .then((lines) => lines.map(line => line.split('')))
    .then((res) => traverseHorizontal(res))
    .then((res) => traverseVertical(res))
    .then((res) => traverseDiagonal(res))
    .then((res) => traverseMAS(res))
    .then((res) => console.log(xmasCount));

const traverseHorizontal = (data) => {
    for (let i = 0; i < data.length; i++) { // traverse each line
        let line = data[i];
        for (let j = 0; j < line.length - 3; j++) { // traverse from left to right, except the last three
            const slidingWindow = line[j] + line[j + 1] + line[j + 2] + line[j + 3];
            if (slidingWindow === 'XMAS' || slidingWindow === 'SAMX') count++;
        }
    }
    return data;
}

const traverseVertical = (data) => {
    for (let i = 0; i < data.length - 3; i++) {
        for (let j = 0; j < data[0].length; j++) {
            const slidingWindow = data[i][j] + data[i + 1][j] + data[i + 2][j] + data[i + 3][j];
            if (slidingWindow === 'XMAS' || slidingWindow === 'SAMX') count++;
        }
    }
    return data;
}

const traverseDiagonal = (data) => {
    for (let i = 0; i < data.length - 3; i++) {
        for (let j = 0; j < data[0].length - 3; j++) {
            const slidingWindow = data[i][j] + data[i + 1][j + 1] + data[i + 2][j + 2] + data[i + 3][j + 3];
            if (slidingWindow === 'XMAS' || slidingWindow === 'SAMX') count++;
        }
    }

    for (let i = 0; i < data.length - 3; i++) {
        for (let j = 3; j < data[0].length; j++) {
            const slidingWindow = data[i][j] + data[i + 1][j - 1] + data[i + 2][j - 2] + data[i + 3][j - 3];
            if (slidingWindow === 'XMAS' || slidingWindow === 'SAMX') count++;
        }
    }

    return data;
}

let xmasCount = 0;

const traverseMAS = (data) => {
    const validSequences = ['MAS', 'SAM'];
    for (let i = 1; i < data.length - 1; i++) {
        for (let j = 1; j < data[0].length - 1; j++) {
            const center = data[i][j];
            if (center === 'A' && validSequences.includes(data[i - 1][j - 1] + center + data[i + 1][j + 1]) && validSequences.includes(data[i - 1][j + 1] + center + data[i + 1][j - 1])) {
                xmasCount++;
            }
        }
    }
    return data;
}
