const fs = require('fs');
const { parse } = require('./node_modules/papaparse')
const src = fs.createReadStream('./src/doc.csv');

const getResult = (data) => {
    const result = [];

    const _data = [...data];
    _data.shift();

    _data.forEach(([name, age]) => {
        result.push({
            name,
            age
        });
    });

    return result;
}

const setResultFile = (result) => {
    const jsonContent = JSON.stringify(result);

    fs.writeFile("RESULT.json", jsonContent, 'utf8', (err) => {
        if (err) {
            console.log("Error.");

            return console.log(err);
        }

        console.log("Success.");
    });
}

parse(src, {
    worker: true,
    complete: ({ data }) => {
        const res = { ...getResult(data) };

        setResultFile(res);          
    }
});