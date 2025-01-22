const express = require('express');
const { firebaseAdmin } = require('../config/firebase');
const router = express.Router();

// Example task model
const Task = require('../models/Task');

// Get tasks for today
router.get('/today', async (req, res) => {
  try {
    const snapshot = await firebaseAdmin.firestore().collection('tasks').get();
    const tasks = snapshot.docs.map(doc => doc.data());
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// Create a task
router.post('/', async (req, res) => {
  const taskData = req.body;
  try {
    const newTask = await firebaseAdmin.firestore().collection('tasks').add(taskData);
    res.status(201).json({ message: 'Task created successfully', id: newTask.id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// Update a task
router.put('/:taskId', async (req, res) => {
  const { taskId } = req.params;
  const updatedData = req.body;
  try {
    await firebaseAdmin.firestore().collection('tasks').doc(taskId).update(updatedData);
    res.status(200).json({ message: 'Task updated' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
});

module.exports = router;
