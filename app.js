
var buttonSolver = document.getElementById('solver');
var puzzle = document.getElementById('sudoku');
var inputArray = []

//---------------------------------------------------------------------//

//creating the grid of input parameters

for(var i=0; i<81; i++){
    var num = document.createElement('input');
    num.setAttribute('type', 'number');
    num.setAttribute('min', '1');
    num.setAttribute('max', '9');


    //Shading added to the grid
    var currBoxStartCol = Math.floor( (i % 9) / 3) * 3;
    var currBoxStartRow = Math.floor(Math.floor(i / 9) / 3) * 3;
    var currBoxNumber = (currBoxStartCol / 3) + currBoxStartRow;
    if (currBoxNumber % 2 === 0) {
        num.classList.add('in-even-box');
    }

    puzzle.appendChild(num);

}

//---------------------------------------------------------------------//


//function to pack input parameters and get it ready to send to the API

function starter(){
    inputArray = [];
    var inputs = document.querySelectorAll('input');

    inputs.forEach(input=>{
        if (input.value){
           inputArray.push(input.value);
        }
        else{
            inputArray.push(0);
        }
    })

}

//---------------------------------------------------------------------//


//function that display the solution to the user

function display(data){

    
    var inputs = document.querySelectorAll('input');
    var counter = 0;

    inputs.forEach(input=>{
        input.value = data.answer[counter];
        counter++
    })
    
}



//---------------------------------------------------------------------//

//function that send a request to the server to execute the post request


function solution (){
    starter();

    fetch('http://localhost:3000/solved', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(inputArray)
    })  .then(response=>response.json())
        .then(data => {
            console.log(data)
            display(data);
        })
        .catch((error) => {
            console.error('Error:', error)
        })
}




buttonSolver.addEventListener("click", solution);
