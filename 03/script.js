// task 1

fetch("data.txt")
    .then((res) => res.text())
    .then((res) => res.match(/(mul\()([0-9]{1,3}),([0-9]{1,3})\)/g))
    .then((res) => res.map(r => {
        const numbers = r.split(',');
        const first = numbers[0].match(/[0-9]{1,3}/g);
        const second = numbers[1].match(/[0-9]{1,3}/g);
        return first * second;
    }))
    .then((res) => {
        const result = res.reduce((acc, curr) => acc += curr);
        return res;
    });

// task 2

fetch("data.txt")
    .then((res) => res.text())
    .then((res) => res.match(/(mul\()([0-9]{1,3}),([0-9]{1,3})\)|(do\(\)|(don't\(\)))/g))
    .then((commands) => {
        let ignore = false;
        const multiplications = [];
        commands.forEach((command) => {
            if (command == 'don\'t()') {
                ignore = true;
            } else if (command == 'do()') {
                ignore = false;
            } else {
                if (!ignore) {
                    multiplications.push(command);
                }
            }
        });
        return  multiplications;
    })
    .then((res) => res.map(r => {
        const numbers = r.split(',');
        const first = numbers[0].match(/[0-9]{1,3}/g);
        const second = numbers[1].match(/[0-9]{1,3}/g);
        return first * second;
    }))
    .then((res) => {
        const result = res.reduce((acc, curr) => acc += curr);
        console.log(result)
        return res;
    });
