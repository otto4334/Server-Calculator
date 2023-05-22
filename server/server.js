const express = require('express')
const PORT = process.env.port || 8100;
const app = express();

app.use(express.static('server/public'));
app.use(express.json())

let findValue = [];

app.get('/findValue', (req, res) => {
  console.log('Get Request for Values', req)
  res.status(200).send(findValue);
});

app.post('/findValue', (req, res) => {
  console.log('Inside /findValue', req.body);
  findValue.push(req.body);
  for (let value of findValue) {
    let solution = findNumber(value);
    value.solution = solution; 
}
});

app.get('/solveValue', (req, res) =>{
  console.log ('/solveValue', req)
  res.status(201).send(findValue)
});
  
app.delete('/solveValue', (req, res) => {
  let valueIndex = req.params.solveValue;
  let deletedValue = solveValue[valueIndex];
  solveValue[valueIndex] = []
    res.sendStatus (204).send(deletedValue);
});

function findNumber(equationObject) {
  if (equationObject.operator == '+') {
    let solveValue = Number (equationObject.num1) + Number (equationObject.num2);
    return solveValue
  }
  else if (equationObject.operator = '-') {
    let solveValue = Number (equationObject .num1) - Number (equationObject .num2);
    return solveValue;
  }
  else if (equationObject.operator == '*') {
    let solveValue = Number(equationObject.num1) * Number (equationObject .num2);
    return solveValue;
  }
  else {
    let solveValue = Number (equationObject.num1) / Number (equationObject.num2);
    return solveValue;
  }
};
  
app.listen(PORT, () => {
  console.log("app is listening on port", PORT);
});