<<<<<<< HEAD
function getUserIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('userId');
}

const userId = getUserIdFromURL(); // Replace with the actual logged-in user ID

// JavaScript to open and close the modal
document.getElementById('editProfileBtn').addEventListener('click', function() {
    document.getElementById('profileModal').classList.remove('hidden');
});

document.getElementById('closeModal').addEventListener('click', function() {
    document.getElementById('profileModal').classList.add('hidden');
});
=======
var userData = localStorage.getItem('user');
var userDeatails = JSON.parse(userData);
const userId = userDeatails.id; // user id

// Load user data on window load
window.onload = fetchUserProfile;
>>>>>>> 7eb773628abb53ae7d065993708171f4b87e0f15


async function fetchUserProfile() {
    try {
        const response = await fetch(`http://localhost:3000/api/user/${userId}`);
        const data = await response.json();

<<<<<<< HEAD
=======
        console.log('API Response:', data);

>>>>>>> 7eb773628abb53ae7d065993708171f4b87e0f15
        if (data.success) {
            const user = data.data;

            // Populate user data into the profile fields
            document.querySelector('.profile-name').textContent = `${user.firstName} ${user.lastName}`;
<<<<<<< HEAD
            document.querySelector('.profile-location').textContent = user.services[0].location || 'Not Available';
            document.querySelector('.profile-email').textContent = user.email;
            document.querySelector('.profile-phone').textContent = user.phone || 'Not Available';
            document.querySelector('.profile-role').textContent = user.role || 'Not Available';
            document.querySelector('.profile-status').textContent = user.status || 'Not Available';

            document.querySelector('.profile-image').src = user.photoURL ? `../../../backend/src/${user.photoURL}` : "https://www.w3schools.com/howto/img_avatar.png";

=======
            document.querySelector('.profile-email').textContent = user.email;
            document.querySelector('.profile-phone').textContent = user.phone;
            document.querySelector('.profile-role').textContent = user.role;
            document.querySelector('.profile-status').textContent = user.status;

            // Display the profile image if available
            const profileImage = document.querySelector('.profile-image');
            console.log('User photoURL:', user);

            if (profileImage) {
                if (user.photoURL) {
                    profileImage.src = user.photoURL;
                    profileImage.alt = `${user.firstName} ${user.lastName}'s Profile Image`;
                } else {
                    profileImage.src = "https://www.w3schools.com/w3images/avatar2.png";
                    profileImage.alt = `${user.firstName} ${user.lastName}'s Profile Image`;
                }
            } else {
                console.warn("Element with class 'profile-image' not found.");
            }
            // profileImage.src = user.photoURL || "https://www.w3schools.com/w3images/avatar2.png";
            // profileImage.alt = `${user.firstName} ${user.lastName}'s Profile Image`;

            // Check if the form element exists before adding the event listener
            // const profileForm = document.querySelector("#profileForm");
            // if (profileForm) {
            //     profileForm.addEventListener("submit", async function (event) {
            //         event.preventDefault(); // Prevent the default form submission

            //         const formData = new FormData(); // Use FormData to handle files and text data

            //         // Add each selected image file to the FormData object
            //         const imageFiles = document.querySelector("#profileImage").files;
            //         for (let i = 0; i < imageFiles.length; i++) {
            //             formData.append("profileForm", imageFiles[i]);
            //         }

            //         try {
            //             const response = await fetch('http://localhost:3000/api/editProfile/create', {
            //                 method: 'POST',
            //                 body: formData // Pass FormData directly
            //             });

            //             if (!response.ok) throw new Error(`Error: ${response.statusText}`);

            //             const result = await response.json(); // Parse the JSON response
            //             console.log(result); // Log the result for debugging

            //             if (result.success) {
            //                 alert("Images uploaded successfully!");
            //             } else {
            //                 alert("Failed to upload images.");
            //             }
            //         } catch (error) {
            //             console.error('Submission error:', error); // Log any errors
            //         }
            //     });
            // } else {
            //     console.warn("Form element with id 'profileForm' not found.");
            // }
        } else {
            console.error('User data could not be retrieved.');
>>>>>>> 7eb773628abb53ae7d065993708171f4b87e0f15
        }
    } catch (error) {
        console.error('Error fetching user profile:', error);
    }
}

<<<<<<< HEAD
async function uploadProfileImage(file) {
    const formData = new FormData();
    formData.append('photo', file);  // Ensure 'photo' is the same field name used in the backend

    try {
        const response = await fetch(`http://localhost:3000/api/user/${userId}/photo`, {
            method: 'POST',
            body: formData
        });

        // Check if the response was successful
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error uploading photo:', errorText);
            alert("Error uploading profile photo. Please try again.");
            return;
        }

        const result = await response.json();

        if (result.success) {
            // Update the profile image on the page
            document.querySelector('.profile-image').src = URL.createObjectURL(file);
            console.log('Profile photo updated successfully');
            alert("Profile photo updated successfully");
        } else {
            console.error('Failed to update profile photo:', result.message);
            alert("Failed to update profile photo. Please try again later.");
        }
    } catch (error) {
        console.error('Error uploading profile photo:', error);
        alert("An error occurred while updating the profile photo.");
    }
}

document.addEventListener('DOMContentLoaded', fetchUserProfile);

// Handle profile image upload
const profileImageInput = document.querySelector('#profileImage');
profileImageInput.addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
        uploadProfileImage(file);
    }
});

// document.addEventListener('DOMContentLoaded', () => {
//     const profileForm = document.getElementById('profileUpdateForm');

//     profileForm.addEventListener('submit', (e) => {
//         e.preventDefault();

//         // Get values from input fields
//         const firstName = document.getElementById('firstName').value;
//         const lastName = document.getElementById('lastName').value;
//         const email = document.getElementById('profileEmail').value;
//         const password = document.getElementById('profilePassword').value;
//         const location = document.getElementById('profileLocation').value;
//         const contact = document.getElementById('profileContact').value;

//         // Log values to console (or use these values as needed)
//         console.log('First Name:', firstName);
//         console.log('Last Name:', lastName);
//         console.log('Email:', email);
//         console.log('Password:', password);
//         console.log('Location:', location);
//         console.log('Contact Number:', contact);

//         // Example: You can use these values to send a request to your server
//         const updatedData = {
//             firstName,
//             lastName,
//             email,
//             password,
//             location,
//             contact,
//         };

//         // Replace with the actual endpoint and logic to save to the database
//         fetch('http://localhost:3000/api/profile/update', {
//             method: 'PUT',
   
//             body: JSON.stringify(updatedData),
//         })
//             .then(response => response.json())
//             .then(data => {
//                 if (data.success) {
//                     alert('Profile updated successfully');
//                     // Optionally, close the modal after updating
//                     document.getElementById('profileModal').classList.add('hidden');
//                 } else {
//                     alert('Error updating profile');
//                 }
//             })
//             .catch(error => console.error('Error updating profile:', error));
//     });
// });



// // // Fetch recent activities when the page loads
// // window.onload = function() {
// //     fetch('http://localhost:3000/api/user/recent-activities', {  
// //         method: 'GET',
// //         headers: {
// //             'Content-Type': 'application/json',
// //         }
// //     })
// //     .then(response => response.json())
// //     .then(data => {
// //         // Pass the data to the function that updates the UI
// //         updateRecentActivities(data);
// //     })
// //     .catch(error => {
// //         console.error('Error fetching recent activities:', error);
// //     });
// // };

// // function updateRecentActivities(favourites) {
// //     const activityFeed = document.getElementById('recentActivityFeed');
// //     activityFeed.innerHTML = '';  // Clear previous activity feed

// //     favourites.forEach(fav => {
// //         const newActivity = document.createElement('li');
// //         const activityText = `Favorited "${fav.Service.title}" on ${new Date(fav.createdAt).toLocaleDateString()}`;
// //         newActivity.classList.add('flex', 'items-center', 'text-text-secondary');
// //         newActivity.innerHTML = `
// //             <span class="material-icons text-primary mr-2">history</span>
// //             ${activityText}
// //         `;
// //         activityFeed.appendChild(newActivity);
// //     });
// // }
=======
>>>>>>> 7eb773628abb53ae7d065993708171f4b87e0f15
