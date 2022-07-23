const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;


// Middleware
app.use(cors())
app.use(express.json())
require('dotenv').config()


const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.w7k54.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

app.get('/', (req, res) => {
  res.send('Hello World!')
})

async function run() {
  try {
    await client.connect()
    const fitnessCollection = client.db("FitnessClub").collection("services");
    const blogsCollection = client.db("FitnessClub").collection("blogs");

    //  ============ Services Api ==============  //

    app.get("/services", async (req, res) => {
      const result = await fitnessCollection.find({}).toArray()
      res.send(result)
    })

    app.get("/services/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) }
      const result = await fitnessCollection.findOne(filter)
      res.send(result)
    })

    //  ============ Blogs Api ==============  //
    app.get("/blogs", async (req, res) => {
      const result = await blogsCollection.find({}).toArray()
      res.send(result)
    })

    app.get("/blogs/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) }
      const result = await blogsCollection.findOne(filter)
      res.send(result)
    })

  }
  catch {

  }
}
run()

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})