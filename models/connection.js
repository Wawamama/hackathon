var mongoose = require('mongoose');

var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology: true
   };

mongoose.connect('mongodb+srv://<INFO_DB>',
   options,
   function(err) {
    if (err) {
      console.log(`error, failed to connect to the database because --> ${err}`);
    } else {
      console.info('*** Database Ticketac connection : Success ***');
    }
   }
);
