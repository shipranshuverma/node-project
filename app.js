const express = require('express');
const app = express();

app.get('/', (req,res)=>{
 res.send('DevOps project running!');
});

app.listen(3000, ()=>{
 console.log('Running on port 3000');
});