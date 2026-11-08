import { request } from './api.js';

const form = document.getElementById('posting-form');
const fieldset = document.getElementById('posting-fields');
const status = document.getElementById('status');
const fields = [...form.querySelectorAll('input, select')];
const id = new URLSearchParams(location.search).get('id');
const path = id === null ? '/postings' : `/postings/${encodeURIComponent(id)}`;

function setError(field, message) {
  const error = document.getElementById(`${field.id}-error`);
  error.textContent = message;
  error.hidden = !message;
  if (message) field.setAttribute('aria-invalid', 'true');
  else field.removeAttribute('aria-invalid');
}

function validate(field) {
  let message = '';
  if (field.required && !field.value.trim()) message = 'Заповніть це поле.';
  else if (!field.validity.valid) {
    message = field.type === 'number'
      ? `Введіть число від ${field.min} з точністю до сотих.`
      : 'Перевірте довжину значення.';
  }
  setError(field, message);
  return !message;
}

for (const field of fields) {
  field.addEventListener('change', () => validate(field));
  field.addEventListener('input', () => setError(field, ''));
}

document.getElementById('cancel').addEventListener('click', () => location.assign('./'));

form.addEventListener('submit', async event => {
  event.preventDefault();
  const invalid = fields.filter(field => !validate(field));
  if (invalid.length) {
    status.textContent = 'Виправте виділені поля.';
    invalid[0].focus();
    return;
  }

  const value = Object.fromEntries(fields.map(field => [
    field.name, field.value.trim() === '' ? null :
      (field.type === 'number' || field.name === 'deliveryType') ? Number(field.value) : field.value.trim()
  ]));
  fieldset.disabled = true;
  status.textContent = 'Збереження…';
  try {
    await request(path, id === null ? 'POST' : 'PUT', value);
    location.assign('./');
  } catch (error) {
    status.textContent = `Не вдалося зберегти. ${error.message}`;
    for (const field of fields) {
      const messages = Object.entries(error.fields ?? {})
        .find(([name]) => name.toLowerCase() === field.name.toLowerCase())?.[1];
      if (messages) setError(field, messages.join(' '));
    }
    fieldset.disabled = false;
  }
});

async function initialize() {
  if (id !== null) {
    try {
      const posting = await request(path);
      for (const field of fields) field.value = posting[field.name] ?? '';
    } catch (error) {
      status.textContent = `Не вдалося відкрити відправлення. ${error.message}`;
      return;
    }
  } else {
    document.getElementById('editor-title').textContent = 'Нове відправлення';
  }
  fieldset.disabled = false;
}

initialize();
