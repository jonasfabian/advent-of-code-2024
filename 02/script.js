let safeCount = 0;

fetch("data.txt")
    .then((res) => res.text())
    .then((text) => text.split(/\r\n|\n/))
    .then((res) => res.map(line => line.split(' ')))
    .then((lines) => {
        lines.forEach(line => {
            const isSafe = (line) => {
                for (let i = 0; i < line.length - 1; i++) {
                    const difference = Math.abs(Number(line[i]) - Number(line[i + 1]));
                    if (difference < 1 || difference > 3) {
                        return false;
                    }
                }

                let isAscending = true;
                let isDescending = true;

                for (let i = 0; i < line.length - 1; i++) {
                    const a = Number(line[i]);
                    const b = Number(line[i + 1]);
                    if (a >= b) isAscending = false;
                    if (a <= b) isDescending = false;
                }

                return isAscending || isDescending;
            };

            if (isSafe(line)) {
                safeCount++;
                return;
            }

            for (let i = 0; i < line.length; i++) {
                const modifiedLine = [...line.slice(0, i), ...line.slice(i + 1)];
                if (isSafe(modifiedLine)) {
                    safeCount++;
                    return;
                }
            }
        });

        return lines;
    })
    .then(() => console.log(`${safeCount}`));
