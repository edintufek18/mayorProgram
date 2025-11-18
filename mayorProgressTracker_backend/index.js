const mongoose = require("mongoose");
const express = require('express')
const cors = require('cors')
require('dotenv').config();
const app = express()
const port = process.env.PORT || 3000;

const corsOptions = {
    origin: process.env.CORS_ORIGIN, // Allow only requests from this origin
    methods: 'GET,POST', // Allow only these methods
};

// Use CORS middleware with specified options
app.use(cors(corsOptions));

app.use(express.json());
// CONNECTION TO DATABASE
mongoose.connect(process.env.MONGO_URI,
{ useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch(err => console.error('❌ Connection error:', err));

// CREATING SCHEMA AND MODELS FOR THE COLLECTIONS

const municipalitySchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String
}, { collection: 'municipality' }); // Explicitly set collection name

const municipalityModel = mongoose.model('municipality', municipalitySchema);

const mayorSchema = new mongoose.Schema({
    
    municipality_id: { type: mongoose.Schema.Types.ObjectId, ref: 'municipality' },
    name: String
}, { collection: 'mayor' }); // Explicitly set collection name

const mayorModel = mongoose.model('mayor', mayorSchema);

const taskSchema = new mongoose.Schema({
  municipality_id: { type: mongoose.Schema.Types.ObjectId, ref: 'municipality' },
  status: String,
  description:String
}, { collection: 'task' }); // Explicitly set collection name

const taskModel = mongoose.model('task', taskSchema);

// CREATING REST API REQUEST WITH LOGIC

app.get('/api/summary/:municipality', async (req, res) => {
  const municipalityParam = req.params.municipality;
  const selectedMunicipality = await municipalityModel.findOne({name:municipalityParam});

  if (!selectedMunicipality) return res.status(404).json({ error: 'Municipality not found' });

  const selectedMayor = await mayorModel.findOne({municipality_id:selectedMunicipality._id});

  const selectedTasks = await taskModel.find({municipality_id:selectedMunicipality._id});
  res.json({
    municipality: selectedMunicipality.name,
    mayor: selectedMayor ? selectedMayor.name : null,
    tasks: selectedTasks.map(t => ({ status: t.status, description: t.description }))
  });
})


// PUT INTO LOCALHOST

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

