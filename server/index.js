const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const notesRoutes = require('./routes/notes');
const app = express();

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Mini Notes App backend is running');
});
app.use('/notes', notesRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(5000, () => console.log('Server running on port 5000')))
  .catch(err => console.error(err));
