import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// My MongoDB Connection
mongoose.connect('mongodb+srv://20255221_db_user:DdO3Y6cPFpSVhwRQ@aptechprojects.ns4ubnz.mongodb.net/?appName=AptechProjects')
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));


const Event = mongoose.model('Event', { 
    eventName: String, 
    location: String,
    date: String,
    organizer: String,
    description: String
});

//The API Routes
app.get('/api/events', async (req, res) => res.json(await Event.find()));
app.post('/api/events', async (req, res) => {
    const newEvent = new Event(req.body);
    await newEvent.save();
    res.status(201).json(newEvent);
});
app.delete('/api/events/:id', async (req, res) => {
    await Event.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

app.listen(5000, () => console.log(`Server running on port 5000`));
