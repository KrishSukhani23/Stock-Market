var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();


app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static("public"))

app.get('/', (req,res)=>{
    res.render('login')
})

app.post('/login',async(req, res)=>{
    const response = await axios.get('https://stockprediction-5e4ce.firebaseio.com/userInfo.json');
    console.log(response.data);
    for(var key in response.data)
    {
        var user = response.data[key];
        if(user.email === req.body.email && user.password === req.body.password)
        {
            
            return res.render('Homepage')
        }
    } 
})

app.post('/register',async(req, res)=>{
    console.log(req.body);
    if(req.body.email === null || req.body.email.trim().length === 0)
    {
        console.log('Name should not be empty');
        return;
    }
    if(req.body.password === null || req.body.password.trim().length === 0)
    {
        console.log('Password should not be empty');
        return;
    }
    if(req.body.contact < 10 || req.body.conact > 10)
    {
        console.log('Contact can be less or greater than 10');
        return;
    }

    const obj = {
        'email': req.body.email,
        'password': req.body.password,
        'contact': req.body.contact,
        'wallet': 0,
    }
    const response = await axios.post('https://stockprediction-5e4ce.firebaseio.com/userInfo.json', obj);
    console.log(response);
    return response;
})

app.listen(5000,()=>{
    console.log("Server started");
})