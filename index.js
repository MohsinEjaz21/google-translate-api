const express = require('express')
const translate = require('@vitalets/google-translate-api');
const bodyParser = require("body-parser");
const app = express()


app.get('/', (req, res) => {
    res.send("hello World 😀")
})


// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
//                 TRANSLATION GET REQUEST
// get shows : GET request in node
//:title : Shows the text wrtten after url i.e,   in chrome  
// http://localhost:5000/api/translate/yoursInputText
//req contain params  and in params we are passing :title so we get the 
// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&


app.get('/api/translate/:myInputText/:translateTo', (req, res) => {
    translate(req.params.myInputText, { to: req.params.translateTo ? req.params.translateTo : 'ar' }).then(trans => {
        let responseObj = { inputText: req.params.myInputText, translatedText: trans.text }
        res.send(responseObj)
    }).catch(err => {
        res.send(err.code)
    });
})



// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
//                 TRANSLATION POST REQUEST
// http://localhost:3000/api/handle
// parameters are { "inputText": "Hi my Name is Mohsin" }
// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/api/translate', (request, res) => {
    let param = request.body;
    translate(param.inputText, { to: param.translateTo }).then(trans => {
        let responseObj = { inputText: request.body.inputText, translatedText: trans.text }
        res.send(responseObj)
    }).catch(err => {
        res.status(500).send(err.code);
    });
});


const port = process.env.PORT || 4000
app.listen(port, () => console.log(`Listening at  port : ${port}`))
