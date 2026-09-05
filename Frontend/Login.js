document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const payload = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };

    try {
        const response = await fetch('http://127.0.0.1:8000/api/login', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (response.ok) {
            // Updated line: reads data.token from AuthController response
            localStorage.setItem('api_token', data.token);
            localStorage.setItem('user_role', data.user.role);

            alert(`Welcome back, ${data.user.name}!`);
            window.location.href = 'index.html'; // Redirect to main portal
        } else {
            alert(data.message || 'Invalid credentials');
        }
    } catch (err) {
        console.error(err);
        alert('Could not connect to the server.');
    }
});