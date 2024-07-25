var express = require('express');
var app = express();
var port = 3000;

app.use(express.static("public"));

app.get('/calculate', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    const operation = req.query.operation;

    console.log(`Received request with num1=${num1}, num2=${num2}, operation=${operation}`);

    if (isNaN(num1) || isNaN(num2)) {
        return res.status(400).json({ error: 'Invalid numbers' });
    }


    if (![ '-', '*', '/'].includes(operation)) {
        return res.status(400).json({ error: 'Invalid operation' });
    }

    try {
        const expression = `${num1} ${operation} ${num2}`;
        console.log(`Evaluating expression: ${expression}`);
        const result = eval(expression);


        if (!isFinite(result)) {
            throw new Error('Result is not a finite number');
        }

        res.json({ result: result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
