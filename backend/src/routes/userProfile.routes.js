// routes/userProfile.routes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userProfile.controller');

// Define the route for getting user profile
router.get('/:id', userController.getUserProfile);

// Define the route for updating user profile photo
router.post('/:id/photo', userController.updateUserProfilePhoto);

router.put('/update', userController.updateProfile);


// Define the route for fetching recent activities
// Assuming you want to get recent activities for a logged-in user
// router.get('/api/user/recent-activities', async (req, res) => {
//     const userId = req.user.id;  // Ensure userId is being extracted properly
//     try {
//         // Fetch recent activities based on the correct userId
//         const recentActivities = await getRecentActivities(userId);
//         res.status(200).json(recentActivities);
//     } catch (err) {
//         console.error('Error fetching recent activities:', err);
//         res.status(500).json({ error: 'Failed to fetch recent activities' });
//     }
// });


module.exports = router;
