const express = require('express')
const app = express()
const fs = require('fs');
const readline = require('readline');

function convert(file) {

    return new Promise((resolve, reject) => {

        const stream = fs.createReadStream(file);
        // Handle stream error (IE: file not found)
        stream.on('error', reject);

        const reader = readline.createInterface({
            input: stream
        });

        const array = [];

        reader.on('line', line => {
            array.push(JSON.parse(line));
        });

        reader.on('close', () => resolve(array));
    });
}


app.get("/test/:name/:pass", (req, res) => {
    convert('User.txt')
    .then(v => {
        console.log(v);
        if(v.filter(value=>value.username === req.params.name && value.password === req.params.pass).length > 0){
            res.status(200).json({ message: "SUCCESS" });
        }   else res.status(200).json({ message: "Fail" });
    })
    .catch(err => console.error(err));
   
})

 module.exports = {
  path: '/api',
  handler: app
 }