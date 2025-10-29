async function login(username, password) {
    try {
        const response = await fetch('data/mock-api.json');
        const data = await response.json();
        return data.monitors.some(m => m.username === username && m.password === password);
    } catch {
        return false;
    }
}

document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    if (await login(username, password)) {
        localStorage.setItem('loggedIn', 'true');
        location.href = 'main.html';
    } else {
        alert('Usuário ou senha incorretos!');
    }
});
