import { displayValue } from './format.js';
import { request } from './api.js';

const rows = document.getElementById('postings');
const status = document.getElementById('status');

async function loadData() {
  const data = await request();
  console.log('GET /postings — початковий варіант', data);
  return data;
}

function renderTable(data) {
  rows.replaceChildren();
  for (const model of data) {
    const row = document.createElement('tr');

    const descriptionCell = document.createElement('td');
    descriptionCell.textContent = model.content;
    row.appendChild(descriptionCell);

    const senderCell = document.createElement('td');
    senderCell.textContent = model.from;
    row.appendChild(senderCell);

    const recipientCell = document.createElement('td');
    recipientCell.textContent = model.to;
    row.appendChild(recipientCell);

    const deliveryTypeCell = document.createElement('td');
    deliveryTypeCell.textContent = displayValue('deliveryType', model);
    row.appendChild(deliveryTypeCell);

    const weightCell = document.createElement('td');
    weightCell.textContent = model.weight;
    row.appendChild(weightCell);

    const widthCell = document.createElement('td');
    widthCell.textContent = model.width;
    row.appendChild(widthCell);

    const heightCell = document.createElement('td');
    heightCell.textContent = model.height;
    row.appendChild(heightCell);

    const lengthCell = document.createElement('td');
    lengthCell.textContent = model.depth;
    row.appendChild(lengthCell);

    const declaredValueCell = document.createElement('td');
    declaredValueCell.textContent = model.value;
    row.appendChild(declaredValueCell);

    const deliveryPriceCell = document.createElement('td');
    deliveryPriceCell.textContent = model.price;
    row.appendChild(deliveryPriceCell);

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
