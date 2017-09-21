const mongoose = require('mongoose');
const dbName = 'ex-auth';
const dbUri = `mongodb://localhost/${dbName}`;

mongoose.connect(dbUri, { useMongoClient: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log(`Connected to the ${dbName} database`);
});

