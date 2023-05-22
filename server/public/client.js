console.log('Hello')
function submitForm(event) {
    // Stop page from refreshing
    event.preventDefault();
    console.log ('Submitting');

    // Retrieve from form
    let inputOne = document.querySelector('#inputValueOne').value;
    let inputTwo = document.querySelector('#inputValueTwo').value;
    let operator = document.querySelector('#arithmetic').value;

    console.log ('Inputs:', inputOne, inputTwo, operator);

    let equation = {
        num1: inputOne, 
        num2: inputTwo, 
        operator: operator,
    };

    console.log(equation);

    fetch('/findValue', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(equation)
    }).then((response) => {
        console.log('POST Response:', response.json()) 
    }).then (appendData())
    document.querySelector('#contentDiv').innerHTML = '';
}

function appendData() {
    fetch('/solveValue')
    .then(response => response.json())
    .then((json) => {
        console.log(json)
for (let value of json) {
    document.querySelector('#inputValueOne').value = '';
    document.querySelector('#inputValueTwo').value = '';
    document.querySelector('#arithmetic').value = '';
    document.querySelector('#contentDiv').innerHTML += `<p> ${value.solution} </p>`
    console.log(value)
}})};

function clearOnSubmit(onClick) {
    document.querySelector('#contentDiv').innerHTML = '';
    fetch('/solveValue', {
        method: 'DELETE'})
    .then(res => res.json())
}