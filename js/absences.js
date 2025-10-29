const STORAGE_KEY = 'absences';
const LIMIT = 1000;

function save(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data.slice(-LIMIT)));
}

function load() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}

function render() {
    const tbody = document.querySelector('#absences-table tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    const data = load();
    data.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${item.name}</td><td>${item.grade}</td><td>${item.date}</td><td>${item.reason}</td>`;
        tbody.appendChild(tr);
    });
}

document.getElementById('absence-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {
        name: document.getElementById('student-name').value,
        grade: document.getElementById('grade').value,
        date: document.getElementById('absence-date').value,
        reason: document.getElementById('reason').value
    };
    const arr = load();
    arr.push(data);
    save(arr);
    render();
    e.target.reset();
});

document.addEventListener('DOMContentLoaded', render);
