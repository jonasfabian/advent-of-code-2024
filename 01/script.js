let firsts = [];
let seconds = [];
let sum = 0;
let similarityMap = new Map();

fetch("data.txt")
    .then((res) => res.text())
    .then((text) => text.split(/\r\n|\n/))
    .then((lines) => lines.map(line => {
        firsts.push(line.split('   ')[0]);
        seconds.push(line.split('   ')[1]);
        return line;
    }))
    .then((text) => {
        firsts = firsts.sort();
        seconds = seconds.sort();
        return text;
    })   
    .finally(() => {
        for(let i = 0; i < firsts.length; i++){
            sum += Math.abs(firsts[i] - seconds[i]);
            similarityMap.set(firsts[i], seconds.filter(el => el === firsts[i]).length * firsts[i]);
        }
        console.log(similarityMap.values().reduce((acc, curr) => acc += curr));
    });

