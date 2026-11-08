'use strict';

function calculateAverage(grades) {
  if (!Array.isArray(grades) || grades.length === 0) {
    throw new Error('Введіть непорожній масив оцінок.');
  }

  let total = 0;
  for (const [index, grade] of grades.entries()) {
    if (!Number.isFinite(grade) || grade < 0 || grade > 100) {
      throw new Error(`Оцінка №${index + 1} має бути числом від 0 до 100.`);
    }
    total += grade;
  }
  return total / grades.length;
}

const result = document.getElementById('result');
document.getElementById('grades-form').addEventListener('submit', event => {
  event.preventDefault();
  try {
    const grades = JSON.parse(document.getElementById('grades').value);
    result.textContent = `Середня оцінка: ${calculateAverage(grades).toLocaleString('uk-UA')}`;
  } catch (error) {
    result.textContent = error instanceof SyntaxError
      ? 'Помилка: введіть масив JSON, наприклад [85, 90, 78].'
      : `Помилка: ${error.message}`;
  }
});
