import { displayValue } from './format.js';
import { request } from './api.js';

const rows = document.getElementById('postings');
const status = document.getElementById('status');
const columns = [...document.querySelectorAll('#table-header th[x-column]')]
  .map(header => header.getAttribute('x-column'));

async function loadData() {
  const data = await request();
  console.log('GET /postings', data);
  return data;
}

function createCell(fieldName, model) {
  const cell = document.createElement('td');
  cell.textContent = displayValue(fieldName, model);
  return cell;
}

function renderTable(data) {
  rows.replaceChildren();
  for (const model of data) {
    const row = document.createElement('tr');
    for (const field of columns) row.appendChild(createCell(field, model));

    const actions = document.createElement('td');
    const edit = document.createElement('a');
    edit.href = `edit.html?id=${model.id}`;
    edit.textContent = 'Редагувати';
    actions.appendChild(edit);
    row.appendChild(actions);
    rows.appendChild(row);
  }
}

async function refresh() {
  const reload = document.getElementById('reload');
  reload.disabled = true;
  status.textContent = 'Завантаження…';
  try {
    const data = await loadData();
    renderTable(data);
    status.textContent = data.length ? `Записів: ${data.length}` : 'Відправлень поки немає.';
  } catch (error) {
    status.textContent = `Не вдалося завантажити список. ${error.message}`;
  } finally {
    reload.disabled = false;
  }
}

document.getElementById('reload').addEventListener('click', refresh);
refresh();
