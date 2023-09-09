import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "";
const yourPassword = "";
const yourAPIKey = "";
const yourBearerToken = "";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response."});
});

app.get("/noAuth", async (req, res) => {
 await axios.get('https://secrets-api.appbrewery.com/random').then(response=>{
  res.render('index.ejs',{content:JSON.stringify(response.data)})
 }).catch(err=>{
  console.log(err)
 })
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
});

app.get("/basicAuth", async (req, res) => {
  await axios.get('https://secrets-api.appbrewery.com/all?page=1',{
    auth:{
      username:'mohamedali11',
      password:'0112866087'
    }
  }).then(response=>{
    res.render('index.ejs',{content:JSON.stringify(response.data)})
  })
  

  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */
});

app.get("/apiKey", async (req, res) => {
  await axios.get('https://secrets-api.appbrewery.com/filter?score=5&apiKey=890b5d2c-3997-4452-8f39-924b2fd2e79d').then(
    response=>res.render('index.ejs',{content:JSON.stringify(response.data)})
  )
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
});

app.get("/bearerToken", async(req, res) => {
  
  await axios.get('https://secrets-api.appbrewery.com/secrets/1',{headers:{Authorization:'Bearer fde053e0-b693-4bd4-9d63-717187f92ee2'}}).then(response=>
  res.render('index.ejs',{content:JSON.stringify(response.data)}))
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
