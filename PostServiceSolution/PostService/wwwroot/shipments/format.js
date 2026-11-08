export function displayValue(field, model) {
  if (field === 'deliveryType') return ['У відділення', 'Кур’єром', 'Експрес'][model[field]] ?? model[field];
  return model[field] ?? '';
}
