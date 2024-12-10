let validityList = [];
let correctedList = [];

fetch("data.txt")
    .then(res => res.text())
    .then(res => {
        const content = res.split('\n');
        const splitIndex = content.findIndex(r => r === "");

        const rules = content.slice(0, splitIndex);
        const updates = content.slice(splitIndex + 1);

        return { rules: rules, updates: updates };
    })
    .then(res => {
        res.updates = res.updates.map((originalUpdate) => {
            let update = originalUpdate;
            let updateIsValid = true;

            res.rules.forEach((rule) => {
                const valid = evaluateRule(rule, update);
                if (!valid) {
                    updateIsValid = false;
                    update = flip(rule, update); 
                }
            });

            let finalCheck = res.rules.every(rule => evaluateRule(rule, update));
            if (finalCheck) {
                if (update !== originalUpdate) {
                    correctedList.push(update);
                } else {
                    validityList.push(update);
                }
            }
            return update;
        });

        return res;
    })
    .then(res => {
        const first = evaluateCenter(validityList);
        const second = evaluateCenter(correctedList);
        console.log({ first, second });
        return res;
    });

const evaluateRule = (rule, update) => {
    const [first, second] = rule.split("|");
    const updateList = update.split(",");
    const indexOfFirst = updateList.indexOf(first);
    const indexOfSecond = updateList.indexOf(second);

    if (indexOfFirst === -1 || indexOfSecond === -1) return true;
    return indexOfFirst < indexOfSecond;
}

const flip = (rule, update) => {
    const [first, second] = rule.split("|");
    let updateList = update.split(",");
    const indexOfFirst = updateList.indexOf(first);
    const indexOfSecond = updateList.indexOf(second);

    if (indexOfFirst === -1 || indexOfSecond === -1) return update;
    updateList[indexOfFirst] = second;
    updateList[indexOfSecond] = first;

    return updateList.join(",");
}

const evaluateCenter = (updates) => {
    let localTotal = 0;
    updates.forEach(update => {
        const updateArr = update.split(",");
        const centerIndex = Math.floor((updateArr.length - 1) / 2);
        const centerValue = parseInt(updateArr[centerIndex], 10);
        localTotal += centerValue;
    });
    return localTotal;
}
