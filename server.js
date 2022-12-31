//establishing all requirements for server
const PORT = 3000;
const axios = require('axios').default;
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());



// post route to solve suduko puzzle
app.post("/solved", (req, res) => {

    var submit = '{"input":[' + req.body + ']}';


    const options = {
        method: 'POST',
        url: 'https://sudoku-solver3.p.rapidapi.com/sudokusolver/',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': process.env.Rapid_API_Key,
            'X-RapidAPI-Host': 'sudoku-solver3.p.rapidapi.com'
        },
        data: submit
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
        console.log(response);
        res.json(response.data);
    }).catch(function (error) {
        console.error(error);
    });
});



//listening to port (arrow functions used)
app.listen(PORT, () => console.log(`server listening on PORT ${PORT}`));