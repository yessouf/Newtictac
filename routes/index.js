var express = require('express');
var router = express.Router();
var request = require('sync-request');
var userModel = require('../models/users');
var journeyModel = require('../models/journey');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login',);
});



router.get('/homePage',  function(req, res, next){
  if(req.session.user == null){
    res.redirect('/')
  } else {
    
    
    res.render('homePage', )
  }
});


/*router.post('/ticket', async function(req, res, next) {

  var journeyList = await journeyModel.find()

  for (var i =0; i<journeyList; i++){
    if(req.body.departureFromFront.toLowerCase() && req.body.arrivalFromFront.toLowerCase() ==
    journeyList[i].departure.toLowerCase() && journeyList[i].arrival.toLowerCase()){
      var journey = []
      journey.push(journey[i])
    
    }
  }
 
  res.render("ticket", {journey})
}
)
 */
 

router.post('/ticket', async function(req, res, next) {

  var journey = await journeyModel.find({
    departure: req.body.departureFromFront,
    arrival: req.body.arrivalFromFront,
  })
   console.log(journey)
  if(journey[0] != null){
    
   res.render('ticket', {journey} )
  } else {
    res.render('erreur')
  }
  
})



router.get('/trajet', function(req, res, next){
    if(req.session.trajet != null){
      req.session.trajet.push({
        departure:req.query.departure,
        arrival:req.query.arrival,
        date: req.query.date,
        departureTime: req.query.departureTime,
        price: req.query.price})
      res.render('trajet', {trajet:req.session.trajet})
    } else {
    req.session.trajet = []
      
    req.session.trajet.push({
    departure:req.query.departure,
    arrival:req.query.arrival,
    date: req.query.date,
    departureTime: req.query.departureTime,
    price: req.query.price
    })

    res.render('trajet',{trajet :req.session.trajet} )
    }
}
);


router.get('/lastTrip', function(req, res, next){

trajet = req.session.trajet
res.render('lastTrip', {trajet : req.session.trajet})
})




// Remplissage de la base de donnée, une fois suffit
router.get('/save', async function(req, res, next) {

  // How many journeys we want
  var count = 300

  // Save  ---------------------------------------------------
    for(var i = 0; i< count; i++){

    departureCity = city[Math.floor(Math.random() * Math.floor(city.length))]
    arrivalCity = city[Math.floor(Math.random() * Math.floor(city.length))]

    if(departureCity != arrivalCity){

      var newUser = new journeyModel ({
        departure: departureCity , 
        arrival: arrivalCity, 
        date: date[Math.floor(Math.random() * Math.floor(date.length))],
        departureTime:Math.floor(Math.random() * Math.floor(23)) + ":00",
        price: Math.floor(Math.random() * Math.floor(125)) + 25,
      });
       
       await newUser.save();

    }

  }
  res.render('index', { title: 'Express' });
});


// Cette route est juste une verification du Save.
// Vous pouvez choisir de la garder ou la supprimer.
router.get('/result', function(req, res, next) {

  // Permet de savoir combien de trajets il y a par ville en base
  for(i=0; i<city.length; i++){

    journeyModel.find( 
      { departure: city[i] } , //filtre
  
      function (err, journey) {

          console.log(`Nombre de trajets au départ de ${journey[0].departure} : `, journey.length);
      }
    )

  }


  res.render('index', { title: 'Express' });
});

module.exports = router;
