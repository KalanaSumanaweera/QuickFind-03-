// frontend/src/js/auth.js
document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    if (loginForm) {
        loginForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            console.log('Login attempt:', { email, password }); // Log login attempt

            try {
                const responseLogin = await fetch('http://localhost:3000/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password })
                });

                const data = await responseLogin.json();
                console.log('Login response:', data); // Log the response

                if (responseLogin.ok) {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('user', JSON.stringify(data.user));
                    alert('Login successful!');

                    // Redirect based on role
                    if (data.user.role === 'customer') {
                        window.location.href = '../index.html';
                    } else if (data.user.role === 'service_provider') {
                        window.location.href = '../provider-dashboard.html'; // Redirect to provider dashboard
                    } else {
                        window.location.href = '../login.html';
                    }
                } else {
                    alert(data.message || 'Login failed');
                }
            } catch (error) {
                console.error('Login error:', error);
                alert('Login failed. Please try again.');
            }
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const accountType = document.querySelector('input[name="accountType"]:checked').value;

            console.log('Signup attempt:', { firstName, lastName, email, phone, password, accountType }); // Log signup attempt

            if (password !== confirmPassword) {
                alert("Passwords don't match!");
                return;
            }

            try {
                const responseSignup = await fetch('http://localhost:3000/api/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        firstName,
                        lastName,
                        email,
                        phone,
                        password,
                        role: accountType
                    })
                });

                const data = await responseSignup.json();
                console.log('Registration response:', data); // Log the response

                if (responseSignup.ok) {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('user', JSON.stringify(data.user));
                    alert('Registration successful!');

                    window.location.href = '../auth/login.html';

                } else {
                    alert(data.message || 'Registration failed');
                }
            } catch (error) {
                console.error('Registration error:', error);
                alert('Registration failed. Please try again.');
            }
        });
    }
});
