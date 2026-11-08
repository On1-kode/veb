'use strict';

(() => {
  const expressions = [
    ['"10" + 5', "10" + 5], ['"10" - 5', "10" - 5],
    ['"10" * "2"', "10" * "2"], ['10 + true', 10 + true],
    ['10 + false', 10 + false], ['Number("125 грн")', Number("125 грн")],
    ['Number("")', Number("")], ['Boolean("false")', Boolean("false")],
    ['Boolean("")', Boolean("")]
  ];

  function appendResult(listId, text) {
    const item = document.createElement('li');
    item.textContent = text;
    document.getElementById(listId).appendChild(item);
  }

  for (const [expression, value] of expressions) {
    console.log(expression, value, typeof value);
    const displayed = typeof value === 'string' ? JSON.stringify(value) : String(value);
    appendResult('expressions', `${expression} → ${displayed} (${typeof value})`);
  }

  const items = [
    { name: 'Зошит', price: 40, quantity: 3 },
    { name: 'Ручка', price: 25, quantity: 2 },
    { name: 'Папка', price: 80, quantity: 1 }
  ];
  const vatRate = 0.2;
  const vatByItem = [];

  function ItemCostCalculator(price, quantity) {
    return price * quantity;
  }

  function OrderSumCalculator(order, rate, vatResults) {
    let total = 0;
    for (const { name, price, quantity } of order) {
      const netCost = ItemCostCalculator(price, quantity);
      const vat = Math.round(netCost * rate * 100) / 100;
      vatResults.push({ name, vat });
      total += netCost + vat;
    }
    return total;
  }

  const total = OrderSumCalculator(items, vatRate, vatByItem);
  console.log('Загальна вартість із ПДВ:', total);
  console.log('ПДВ за позиціями:', vatByItem);
  document.getElementById('total').textContent = `Разом із ПДВ (20%): ${total.toFixed(2)} грн`;
  for (const { name, vat } of vatByItem) {
    appendResult('vat', `${name}: ${vat.toFixed(2)} грн ПДВ`);
  }
})();
