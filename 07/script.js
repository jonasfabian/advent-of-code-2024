fetch("data.txt")
    .then(res => res.text()
    .then(res => res.split("\n"))
    .then(res => res.map(line => {
        const parts = line.split(': ');
        const numbers = parts[1].split(' ');
        return {output: parts[0], numbers: numbers}
    }))
    .then(res => res.map((line) => {
        let temp = [];
        line.numbers.forEach((entry, index) => {
            if (index > 0) {
                temp.push('.');
            }
            temp.push(entry);
        });
        line.numbers = temp;
        return line;
    }))
    .then(res => {
        console.log(res)
        return res;
    })
    .then(res => {
        // TODO
        return res;
    })
    .then(res => res));
