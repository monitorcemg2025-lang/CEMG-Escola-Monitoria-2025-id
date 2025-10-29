const STORAGE_KEY = 'schedules';
const LIMIT = 1000;

function save(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data.slice(-LIMIT)));
}

function load() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}

function render() {
    const tbody = document.querySelector('#schedule-table tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    const data = load();
    data.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${item.monitorName}</td><td>${item.date}</td><td>${item.entry}</td><td>${item.exit}</td>`;
        tbody.appendChild(tr);
    });
}

document.getElementById('schedule-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {
        monitorName: document.getElementById('monitor-name').value,
        date: document.getElementById('date').value,
        entry: document.getElementById('entry-time').value,
        exit: document.getElementById('exit-time').value
    };
    const arr = load();
    arr.push(data);
    save(arr);
    render();
    e.target.reset();
});

document.addEventListener('DOMContentLoaded', render);
