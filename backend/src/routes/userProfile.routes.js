<<<<<<< HEAD
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

=======
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userProfile.controller');
const { updateUserProfilePhoto } = require('../controllers/userProfile.controller');
const multer = require('multer');
// Route to get user profile by ID
router.get('/:id', userController.getUserProfile);

const profiles = multer({ dest: 'profileImg/' });

router.patch('/create', profiles.array('profileImg', 1), updateUserProfilePhoto); 
>>>>>>> 7eb773628abb53ae7d065993708171f4b87e0f15

module.exports = router;
