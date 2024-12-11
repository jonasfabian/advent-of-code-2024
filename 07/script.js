fetch("data.txt")
    .then(res => res.text()
    .then(res => res.split("\n"))
    .then(res => res.map(line => {
        const parts = line.split(': ');
        const numbers = parts[1].split(' ');
        return {output: parts[0], numbers: numbers}
    }))
    .then(res => res.map(line => {
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
        const generateOperators = (count) => {
            const ops = ['+', '*', '||'];
            const combinations = [];
            const max = Math.pow(ops.length, count);

            for (let i = 0; i < max; i++) {
                let pattern = [];
                let num = i;
                for (let bit = 0; bit < count; bit++) {
                    pattern.push(ops[num % ops.length]);
                    num = Math.floor(num / ops.length);
                }
                combinations.push(pattern);
            }
            return combinations;
        }

        const evaluate = (nums, ops) => {
            let result = nums[0];
            for (let i = 0; i < ops.length; i++) {
                const op = ops[i];
                const nextNum = nums[i+1];
                if (op === '+') {
                    result = result + nextNum;
                } else if (op === '*') {
                    result = result * nextNum;
                } else if (op === '||') {
                    result = parseInt(result.toString() + nextNum.toString(), 10);
                }
            }
            return result;
        }

        let totalSum = 0;

        res.forEach(line => {
            const output = parseInt(line.output, 10);
            const nums = line.numbers.filter((_, idx) => idx % 2 === 0).map(Number);

            if (nums.length === 1) {
                if (nums[0] === output) {
                    totalSum += output;
                }
                return;
            }

            const opsComb = generateOperators(nums.length - 1);
            const found = opsComb.some(ops => evaluate(nums, ops) === output);

            if (found) {
                totalSum += output;
            }
        });

        console.log("total: ", totalSum);
        return res;
    })
    .then(res => res));
