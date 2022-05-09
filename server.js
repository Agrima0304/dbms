const express = require("express");
const PORT = 3000;
const App = express();
require('./database')
App.get('/',(req,res)=>{
    res.send({
        "email":"a@gm.com"
    })
})

App.listen(PORT, () => {
    console.log('App started on 3000')
});
