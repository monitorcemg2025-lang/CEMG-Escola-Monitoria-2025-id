function checkLibs() {
    if (!window.jspdf) { alert('jsPDF não carregado'); return false; }
    if (!window.jspdf.autoTable) { alert('AutoTable não carregado'); return false; }
    return true;
}

function getData(key) {
    return JSON.parse(localStorage.getItem(key) || '[]');
}

function filter(data, period) {
    const today = new Date();
    return data.filter(item => {
        const d = new Date(item.date);
        if (period === 'daily') return d.toDateString() === today.toDateString();
        if (period === 'weekly') {
            const weekAgo = new Date(today); weekAgo.setDate(today.getDate() - 7);
            return d >= weekAgo && d <= today;
        }
        if (period === 'monthly') {
            const monthAgo = new Date(today); monthAgo.setMonth(today.getMonth() - 1);
            return d >= monthAgo && d <= today;
        }
        return true;
    });
}

function generateAbsencesPDF(period) {
    if (!checkLibs()) return;
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const data = filter(getData('absences'), period);
    doc.text('Centro de Excelência Miguel das Graças - Faltas', 10, 10);
    if (data.length === 0) doc.text('Nenhum registro.', 10, 20);
    else doc.autoTable({ head: [['Aluno', 'Série', 'Data', 'Motivo']], body: data.map(i => [i.name, i.grade, i.date, i.reason]), startY: 20 });
    doc.save(`faltas_${period}.pdf`);
}

function generateSchedulesPDF(period) {
    if (!checkLibs()) return;
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const data = filter(getData('schedules'), period);
    doc.text('Centro de Excelência Miguel das Graças - Horários', 10, 10);
    if (data.length === 0) doc.text('Nenhum registro.', 10, 20);
    else doc.autoTable({ head: [['Monitor', 'Data', 'Entrada', 'Saída']], body: data.map(i => [i.monitorName, i.date, i.entry, i.exit]), startY: 20 });
    doc.save(`horarios_${period}.pdf`);
}
