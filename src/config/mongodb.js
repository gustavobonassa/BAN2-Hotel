const { MongoClient } = require("mongodb");

// Connection URI
const uri = "mongodb+srv://omnistack:omnistack@cluster0.n4nnb.mongodb.net/ban2hotel?retryWrites=true&w=majority";

// Create a new MongoClient
const client = new MongoClient(uri, { useUnifiedTopology: true });

client.connect();

module.exports = client;
