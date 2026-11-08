"use strict";

class Parcel {
  #weight;
  static #count = 0;

  constructor(recipient, weight, length, width, height) {
    this.recipient = recipient;
    this.weight = weight;
    this.length = length;
    this.width = width;
    this.height = height;
    Parcel.#count++;
  }

  get weight() { return this.#weight; }

  set weight(value) {
    if (typeof value !== "number" || !Number.isFinite(value) || value <= 0) {
      throw new Error("Вага має бути додатним числом");
    }
    this.#weight = value;
  }

  get volumetricWeight() { return this.length * this.width * this.height / 5000; }
  get chargeableWeight() { return Math.max(this.weight, this.volumetricWeight); }

  describe() {
    return `${this.recipient}: ${this.weight} кг, ${this.length} × ${this.width} × ${this.height} см; об’ємна вага ${this.volumetricWeight} кг, розрахункова ${this.chargeableWeight} кг`;
  }

  static getCount() { return Parcel.#count; }
}

class ParcelPriceCalculator {
  constructor(ratePerKg) { this.ratePerKg = ratePerKg; }
  calculate(parcel) { return parcel.chargeableWeight * this.ratePerKg; }
  getName() { return "Базовий тариф"; }
}

class PostOfficeParcelPriceCalculator extends ParcelPriceCalculator {
  constructor() { super(15); }
  getName() { return "Відділення пошти"; }
}

class CourierParcelPriceCalculator extends ParcelPriceCalculator {
  constructor() { super(30); }
  getName() { return "Кур’єр"; }
}

class ExpressParcelPriceCalculator extends ParcelPriceCalculator {
  constructor() { super(30); }
  calculate(parcel) { return super.calculate(parcel) + parcel.chargeableWeight * 25; }
  getName() { return "Експрес"; }
}

const parcels = [
  new Parcel("Олена Бондар", 2.5, 20, 15, 10),
  new Parcel("Андрій Мельник", 1, 50, 40, 30),
  new Parcel("Ірина Коваль", 5, 30, 20, 10)
];
const calculators = [
  new PostOfficeParcelPriceCalculator(),
  new CourierParcelPriceCalculator(),
  new ExpressParcelPriceCalculator()
];
const output = [];

for (const parcel of parcels) {
  console.log(parcel.describe());
  output.push(parcel.describe());
  for (const calculator of calculators) {
    const line = `${calculator.getName()}: ${calculator.calculate(parcel).toFixed(2)} грн`;
    console.log(line);
    output.push(line);
  }
  output.push("");
}
const countLine = `Кількість відправлень: ${Parcel.getCount()}`;
console.log(countLine);
output.push(countLine);
document.getElementById("results").textContent = output.join("\n");
