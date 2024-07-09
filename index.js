const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/workout-logger', { useNewUrlParser: true, useUnifiedTopology: true });

const workoutSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  exercises: [
    {
      exercise: String,
      sets: [
        {
          reps: Number,
          weight: Number,
        },
      ],
    },
  ],
});

const Workout = mongoose.model('Workout', workoutSchema);

// API routes
app.post('/api/workouts', async (req, res) => {
  const newWorkout = new Workout(req.body);
  await newWorkout.save();
  res.send(newWorkout);
});

app.get('/api/workouts', async (req, res) => {
  const workouts = await Workout.find();
  res.send(workouts);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

const goalSchema = new mongoose.Schema({
    goalType: String,
    description: String,
    target: Number,
    progress: Number,
    startDate: { type: Date, default: Date.now },
    endDate: Date,
  });
  
  const Goal = mongoose.model('Goal', goalSchema);
  
  // API routes for goals
  app.post('/api/goals', async (req, res) => {
    const newGoal = new Goal(req.body);
    await newGoal.save();
    res.send(newGoal);
  });
  
  app.get('/api/goals', async (req, res) => {
    const goals = await Goal.find();
    res.send(goals);
  });
  
  app.put('/api/goals/:id', async (req, res) => {
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(updatedGoal);
  });
  
  app.delete('/api/goals/:id', async (req, res) => {
    await Goal.findByIdAndDelete(req.params.id);
    res.send({ message: 'Goal deleted' });
  });
  
