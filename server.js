// Import express
const express = require('express');
const app = express();
// Import csvtojson module
const csv = require('csvtojson');
// Import Mongodb
const mongoClient = require('mongodb').MongoClient,
  assert = require('assert');

// Server up and running on port 7600
const server = app.listen(7600, (err, callback) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Your nodejs server running on port 7600');
  }
});

var path = require('path');
var http = require('http');
var multer  = require('multer');

var storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, file.originalname, "") + path.extname(file.originalname)
  }
})

var upload = multer({ storage: storage })

app.use(express.static(path.join(__dirname, 'public')));

app.set('port', process.env.PORT || 3000);


app.post('/savedata', upload.single('file'), function(req,res,next){
    console.log('Uploade Successful ', req.file, req.body);
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


// Mongodb Connection URL 
const url = 'mongodb://admin:admin@cluster0-shard-00-00-wkiof.mongodb.net:27017,cluster0-shard-00-01-wkiof.mongodb.net:27017,cluster0-shard-00-02-wkiof.mongodb.net:27017/carinfo?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true?authMode=scram-sha1';

// Use connect method to connect to the Server
mongoClient.connect(url, (err, db) => {
  assert.equal(null, err);

  console.log("Connected correctly to server");

  insertDocuments(db, function () {
    db.close();
  });
});


const insertDocuments = (db, callback) => {
  // Get the vehicle collection
  let collection = db.collection('vehicle');

  // CSV File Path
  const csvFilePath = 'uploads/example.csv';

  /**
   * Read csv file and save every row of
   * data on mongodb database
   */
  csv()
    .fromFile(csvFilePath)
    .on('csv', (csvRow) => {
      csvRow.forEach(function (element) {
        // Save data on mongo database
        collection.insertOne({ 
										DealerId: element, 
										dealerName: element, 
										dealerPhone: element, 
										dealerPhone: element, 
										dealerEmail : element, 
										dealerAddress : element,
										dealerCity : element,
										dealerState : element,
										dealerZip : element,
										dealerTagline : element,
										vehicleClassification : element,
										vehicleCertifiedFlag : element,
										vehicleFactoryWarrantyFlag : element,
										vehicleDealerWarrantyFlag : element,
										vehicleExtendedWarrantyAv1Flag : element,
										vehicleAutoCheckFlag : element,
										vehicleCondition : element,
										vehicleVinNumber : element,
										vehicleStockNuber : element,
										vehicleYear : element,
										vehicleMake : element,
										vehicleModel : element,
										vehicleTrim : element,
										vehicleMileage : element,
										vehicleMSRP : element,
										vehicleRetailWholesaleValue : element,
										vehicleInvoiceAmount : element,
										vehiclePackAmount : element,
										vehicleTotalCost : element,
										vehicleSellingPrice : element,
										vehicleEngineDisplacementCI : element,
										vehicleEngineCyl : element,
										vehicleEngineHP : element,
										vehicleHPRPM : element,
										vehicleEngineTorque : element,
										vehicleTorqueRPM : element,
										vehicleTransmissionType : element,
										vehicleTransmissionGears : element,
										vehicleTransmissionName : element,
										vehicleCityMPG : element,
										vehicleHwyMPG : element,
										vehicleFuelTankCapacity : element,
										vehicleExteriorColor : element,
										vehicleInteriorColor : element,
										vehicleOptionalEquipment : element,
										vehicleComments : element,
										vehicleAdTitle : element,
										vehicleVideoURL : element,
										vehicleImgURL : element,
										vehicleImgURL2 : element,
										vehicleImgURL3 : element,
										vehicleImageURLModifiedDate : element,
										vehicleDetailLink : element },(err, result) => {
          if (err) {
            console.log(err);
          } else {
            callback(result);
          }
        });
      }, this);
    })
    .on('done', (error) => {
      console.log('end')
    });
}
