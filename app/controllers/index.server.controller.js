exports.trainAndPredict = function(req, res) {
    console.log("================= trainAndPredict req.dailyRecords >>>> ", req.dailyRecords);
  
    const tf = require('@tensorflow/tfjs');
    require('@tensorflow/tfjs-node');
    const fs = require('fs');
    
    // Load iris training data
    const record = JSON.parse(fs.readFileSync('./record_train.json'));
  
    // Load iris testing data
    const testingData = req.dailyRecords.map(item => [
      item.body_temperature,
      item.heart_rate,
      item.systolic_pressure,
      item.diastolic_pressure,
      item.respiratory_rate
    ]);
  
    // convert/setup our data for tensorflow.js
  
    //tensor of features for training data
    const trainingData = tf.tensor2d(record.map(item => [
      item.body_temperature,
      item.heart_rate,
      item.systolic_pressure,
      item.diastolic_pressure,
      item.respiratory_rate
    ]));
    
    //tensor of output for training data
    //the values for species will be:
    // status 1:       1,0
    // status 2:       0,1
    const outputData = tf.tensor2d(record.map(item => [
      item.status === 1 ? 1 : 0,
      item.status === 2 ? 1 : 0
    ]));
    
    // build neural network using a sequential model
    const model = tf.sequential();
    //add the first layer
    model.add(tf.layers.dense({
      inputShape: [5], // 5 input neurons (features)
      activation: "sigmoid",
      units: 30, //dimension of output space (first hidden layer)
    }));
    
    //add the second hidden layer
    model.add(tf.layers.dense({
      inputShape: [30], //dimension of hidden layer (2/3 rule)
      activation: "sigmoid",
      units: 15, //dimension of final output (die or live)
    }));
    
    //add output layer
    model.add(tf.layers.dense({
      activation: "sigmoid",
      units: 2, //dimension of final output
    }));
    
    //compile the model with an MSE loss function and Adam algorithm
    model.compile({
      loss: "meanSquaredError",
      optimizer: tf.train.adam(.003),
      metrics: ['accuracy'],
    });
    
    // train/fit the model for the fixed number of epochs
    const startTime = Date.now();
    
    async function run() {
      const startTime = Date.now();
      await model.fit(trainingData, outputData, {
        epochs: 1000,
        callbacks: {
          onEpochEnd: async (epoch, log) => {
            elapsedTime = Date.now() - startTime;
          }
        }
      }); //fit
  
      // get the prediction results
      const results = model.predict(tf.tensor2d(testingData));
      console.log('prediction results: ', results.dataSync());
      
      var dangerCount = 0;
      const array = results.arraySync();
      array.forEach(result => {
        if (result[0] < result[1]) {
          dangerCount++;
        }
      });
  
      console.log("dangerCount >> ", dangerCount);
  
      var status;
      if (dangerCount > 1) {
        status = 'danger';
      } else {
        status = 'ok';
      }
      
      res.status(200).send(status);
    } //end of run function
    
    run();
  };
  