const express = require('express');
const { firebaseAdmin } = require('../config/firebase');
const router = express.Router();

// Goal tracking route
router.get('/', async (req, res) => {
  try {
    const snapshot = await firebaseAdmin.firestore().collection('goals').get();
    const goals = snapshot.docs.map(doc => doc.data());
    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch goals' });
  }
});

// Create a goal
router.post('/', async (req, res) => {
  const goalData = req.body;
  try {
    const newGoal = await firebaseAdmin.firestore().collection('goals').add(goalData);
    res.status(201).json({ message: 'Goal created successfully', id: newGoal.id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create goal' });
  }
});

module.exports = router;
