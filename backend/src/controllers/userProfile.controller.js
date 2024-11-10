const User = require('../models/user.model');
const multer = require('multer');
const Favourite = require('../models/favourite.model');
const Service = require('../models/service.model')

// Configure multer for file storage
const profileImage = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'profileImages/');
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}-${file.originalname}`);
        }
    })
});

// Controller to get user profile by ID
exports.getUserProfile = async (req, res) => {
    const userId = req.params.id;

    try {

        
        const user = await User.findOne({
            where: { id: userId },
            attributes: ['id', 'firstName', 'lastName', 'email', 'phone', 'role', 'status', 'photoURL', 'createdAt', 'updatedAt'],
            include: [
                {
                    model: Service,
                    as: 'services',  // Use the alias defined in your association
                    attributes: ['title', 'description', 'location'],
                    
                }
            ]
        });

        if (user) {
            res.json({
                success: true,
                data: user
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Controller to update user profile photo
exports.updateUserProfilePhoto = [
    profileImage.single('photo'), // Handle single file upload with field name 'photo'
    async (req, res) => {
        const userId = req.params.id;

        try {
            const user = await User.findByPk(userId);

            if (user) {
                // Update the user's profile photo URL in the database
                user.photoURL = req.file ?  req.file.path.replace(/\\/g, '/') : user.photoURL;
                await user.save();

                res.json({
                    success: true,
                    message: 'Profile photo updated successfully',
                    data: user
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }
        } catch (error) {
            console.error('Error updating profile photo:', error);
            res.status(500).json({
                success: false,
                message: 'Server error'
            });
        }
    }
];

exports.updateProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Assume user ID is stored in req.user (e.g., from authentication middleware)
        const { firstName, lastName, email, password, location, contact } = req.body;

        // Update user profile in the database
        const [updatedRows] = await User.update(
            {
                firstName,
                lastName,
                email,
                password, // Store passwords securely in real applications!
                location,
                contact,
            },
            { where: { id: userId } }
        );

        if (updatedRows > 0) {
            return res.status(200).json({ success: true, message: 'Profile updated successfully' });
        } else {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ success: false, message: 'Failed to update profile' });
    }
};
// exports.getRecentActivities = async (req, res) => {
//     const userId = req.query.userId;  

//     try {
//         const favourites = await Favourite.findAll({
//             where: { userId },
//             order: [['createdAt']], // Sort by most recent
//             limit: 5, // Limit to the 5 most recent activities
//             include: [
//                 {
//                     model: Service,
//                     attributes: ['title']
//                 }
//             ]
//         });

//         res.status(200).json(favourites); // Return the recent favourites
//     } catch (err) {
//         console.error('Error fetching recent activities:', err); // Log the error
//         res.status(500).json({ message: 'Error fetching recent activities', error: err });
//     }
// };
