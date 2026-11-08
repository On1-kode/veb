'use strict';

const value1 = document.getElementById('value1');
const value2 = document.getElementById('value2');
const result = document.getElementById('result');
const historyList = document.getElementById('history');

function calculate() {
  const first = Number(value1.value.trim().replace(',', '.'));
  const second = Number(value2.value.trim().replace(',', '.'));
  const sum = first + second;
  if (!value1.value.trim() || !value2.value.trim() || !Number.isFinite(sum)) {
    result.textContent = 'Введіть два коректні числа.';
    return;
  }

  result.textContent = sum;
  const item = document.createElement('li');
  item.textContent = `${first} + ${second} = ${sum}`;
  historyList.appendChild(item);
}
