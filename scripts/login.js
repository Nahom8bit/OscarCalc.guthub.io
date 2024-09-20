document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const loginPage = document.getElementById('loginPage');
    const appContent = document.getElementById('appContent');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Updated credentials
        if (username === 'admasadmin' && password === 'admas1990') {
            loginPage.style.display = 'none';
            appContent.style.display = 'block';
        } else {
            alert('Invalid username or password');
        }
    });
});
