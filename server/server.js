const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { firebaseAdmin } = require('./config/firebase');
const taskRoutes = require('./routes/tasks');
const goalRoutes = require('./routes/goals');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/tasks', taskRoutes);
app.use('/goals', goalRoutes);

// Firebase cloud function for notification
app.post('/sendNotification', async (req, res) => {
  const { message, token } = req.body;
  const messagePayload = {
    notification: {
      title: 'Daily Task Reminder',
      body: message,
    },
    token: token,
  };

  try {
    const response = await firebaseAdmin.messaging().send(messagePayload);
    res.status(200).json({ message: 'Notification sent!', response });
  } catch (error) {
    res.status(500).json({ message: 'Error sending notification', error });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
