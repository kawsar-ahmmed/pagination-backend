const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5001;
const app = express();
// Middleware 
app.use(cors());
app.use(express.json());
require('dotenv').config()

// MongoDB
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.EMA_DB}:${process.env.EMA_PASSWORD}@cluster0.ah7yvhk.mongodb.net/?retryWrites=true&w=majority`;

//
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        const productCollection = client.db('emaJohn').collection('product');
        //
        app.get('/product', async(req, res)=> {
            const query ={};
            const cursor = productCollection.find(query);
            const result = await cursor.limit(10).toArray();
            res.send(result);
        })

    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('john is running')
});

app.listen(port, () => {
    console.log('john is running', port)
})