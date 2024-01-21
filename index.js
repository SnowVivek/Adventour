const express = require("express");
const mustacheExpress = require('mustache-express');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const session = require('express-session');


const app = express();
const port = 5000;

app.use(express.static('public'));
// app.use(express.json());
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/Frontend/');

// Use body-parser to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "your-secret-key", // Change this to a strong, random string
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true, // Set to true if your app is served over HTTPS
      sameSite: "None",
    },
  })
);


function travel_algorithm(category, sub_category)
{
  if (category==="honeymoon")
  {
    if(sub_category==="hilly")
    {
          places = [
            {"price":12000, "img_src":"/places/honeymoon/kodaikanal-city.avif", "place":"Kodaikanal, Tamil Nadu"},
            {"price":14500, "img_src":"/places/honeymoon/Mussoorie_Karan.avif", "place":"Mussoorie, Uttarakhand"},
            {"price":16000, "img_src":"/places/honeymoon/Auli.avif", "place":"Auli, Delhi"},
          ];

          return places;
    }

    else if(sub_category==="beach")
    {
      places = [
        {"price":12000, "img_src":"/places/honeymoon/Goa.jpeg", "place":"Goa"},
        {"price":14500, "img_src":"/places/honeymoon/Kovalam.jpeg", "place":"Kovalam, Kerala"},
        {"price":16000, "img_src":"/places/honeymoon/Havelock.jpeg", "place":"Havelock Island, Andaman and Nicobar Islands"},
      ];

      return places;
    }

    else if(sub_category==="forest")
    {
      places = [
        {"price":12000, "img_src":"/places/honeymoon/Coorg.jpeg", "place":"Coorg, Karnataka"},
        {"price":14500, "img_src":"/places/honeymoon/Wayanad.jpeg", "place":"Wayanad, Kerala"},
        {"price":16000, "img_src":"/places/honeymoon/binsar.jpeg", "place":"Binsar, Uttarakhand"},
      ];

      return places;
    }

  }

  if (category==="pilgrimage")
  {
    if(sub_category==="hilly")
    {
      
        places = [
          {"price":12000, "img_src":"/places/pilgrimage/rishikesh.jpeg", "place":"Rishikesh, Uttarakhand"},
          {"price":14500, "img_src":"/places/pilgrimage/haridwar.jpeg", "place":"Haridwar, Uttarakhand"},
          {"price":16000, "img_src":"/places/pilgrimage/badrinath.jpeg", "place":"Badrinath, Uttarakhand"},
        ];
        return places;
       
    }

    else if(sub_category==="beach")
    {
  
      places = [
        {"price":12000, "img_src":"/places/pilgrimage/kanyakumari.jpeg", "place":"Kanyakumari, Tamil Nadu"},
        {"price":14500, "img_src":"/places/pilgrimage/rameshwaram.jpeg", "place":"Rameshwaram, Tamil Nadu"},
        {"price":16000, "img_src":"/places/pilgrimage/puri.jpeg", "place":"Puri, Odisha"},
      ];
      return places;
    }

    else if(sub_category==="forest")
    {
      places = [
        {"price":12000, "img_src":"/places/pilgrimage/sabarimala.jpeg", "place":"Sabarimala, Kerala"},
        {"price":14500, "img_src":"/places/pilgrimage/Tirupati_Hills.jpeg", "place":"Tirumala Hills, Andhra Pradesh"},
        {"price":16000, "img_src":"/places/pilgrimage/dandakarnya.jpeg", "place":"Dandakaranya"},
      ];
      return places;
    }

  }

  if (category==="wildscapes")
  {
    if(sub_category==="hilly")
    {

          places = [
            {"price":12000, "img_src":"/places/wildscapes/spiti_valley.jpeg", "place":"Spiti Valley, Himachal Pradesh"},
            {"price":14500, "img_src":"/places/wildscapes/valley_of_flowers.jpeg", "place":"Valley of Flowers, Uttarakhand"},
            {"price":16000, "img_src":"/places/wildscapes/tawang.jpeg", "place":"Tawang, Arunachal Pradesh"},
          ];
          return places;
      }

    

    else if(sub_category==="beach")
    {
      places = [
        {"price":12000, "img_src":"/places/wildscapes/andaman_nicobar.jpeg", "place":"Andaman and Nicobar Islands"},
        {"price":14500, "img_src":"/places/wildscapes/gokarna.jpeg", "price":"Gokarna, Karnataka"},
        {"price":16000, "img_src":"/places/wildscapes/Dhanushkodi.jpeg", "place":"Dhanushkodi, Tamil Nadu"},
      ];
      return places;
    }

    else if(sub_category==="forest")
    {
      places = [
        {"price":12000, "img_src":"/places/wildscapes/corbett.jpeg", "place":"Jim Corbett National Park, Uttarakhand"},
        {"price":14500, "img_src":"/places/wildscapes/silent_valley.jpeg", "place":"Silent Valley National Park, Kerala"},
        {"price":16000, "img_src":"/places/wildscapes/dudhwa.jpeg", "place":"Dudhwa National Park, Uttar Pradesh"},
      ];
      return places;
    }

  }
}

app.get("/", function (request, response) {
  response.render('index');
});

app.get("/home", function (request, response) {
  response.render('home');
});


app.post("/api/v1/login", function(request, response){
  const { username, password } = request.body;
  
  const storedHashedPassword = '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918';
  const hashedEnteredPassword = crypto.createHash('sha256').update(password).digest('hex');

 if (storedHashedPassword === hashedEnteredPassword) 
 {
    request.session.username = username;
    response.status(200).render('questionaries');
 } 
 else 
 {
  response.status(403).send('Password does not match');  
 }

});

app.post("/api/v1/suggest", function(request, response){
  const { category, sub_category } = request.body;
  const output = travel_algorithm(category, sub_category);
  response.render("suggestion", { places : output });  
});


// app.post("/hash", function(request, response){
//   const password = request.body.password;
//   const hashedEnteredPassword = crypto.createHash('sha256').update(password).digest('hex');
//   response.send(hashedEnteredPassword);
// });

app.listen(port, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", port);
});