const ingredients = [
  { name: "Top Bun", emoji: "🍞", price: 10, stock: 10, maxStock: 10 },
  { name: "Lettuce", emoji: "🥬", price: 5, stock: 8, maxStock: 8 },
  { name: "Tomato", emoji: "🍅", price: 5, stock: 8, maxStock: 8 },
  { name: "Cheese", emoji: "🧀", price: 8, stock: 6, maxStock: 6 },
  { name: "Patty", emoji: "🍖", price: 15, stock: 5, maxStock: 5 },
  { name: "Onion", emoji: "🧅", price: 4, stock: 7, maxStock: 7 },
  { name: "Bottom Bun", emoji: "🍞", price: 10, stock: 10, maxStock: 10 },
];

let burgerStack = [];

const ingredientList = document.getElementById("ingredient-list");
const burgerPreview = document.getElementById("burger-preview");
const totalPriceEl = document.getElementById("total-price");

// Create ingredient buttons
function renderIngredients() {
  ingredientList.innerHTML = "";
  ingredients.forEach((ing, i) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${ing.emoji} ${ing.name} - ₹${ing.price} (${ing.stock} left)</span>
      <button id="add-btn-${i}" onclick="addIngredient(${i})" ${
      ing.stock === 0 ? "disabled" : ""
    }>Add</button>
    `;
    ingredientList.appendChild(li);
  });
}

function addIngredient(index) {
  const ing = ingredients[index];
  if (ing.stock > 0) {
    burgerStack.push(index);
    ing.stock--;
    renderIngredients();
    renderBurger();
  }
}

function removeLast() {
  if (burgerStack.length > 0) {
    const last = burgerStack.pop();
    ingredients[last].stock++;
    renderIngredients();
    renderBurger();
  }
}

function resetBurger() {
  burgerStack = [];
  ingredients.forEach((ing) => (ing.stock = ing.maxStock));
  renderIngredients();
  renderBurger();
}

function renderBurger() {
  const countMap = {};
  let total = 0;
  burgerPreview.innerHTML = "";

  burgerStack.forEach((i) => {
    countMap[i] = (countMap[i] || 0) + 1;
  });

  for (let i in countMap) {
    const ing = ingredients[i];
    const count = countMap[i];
    const item = document.createElement("div");
    item.textContent = `${ing.emoji} ${ing.name} × ${count} (₹${
      ing.price * count
    })`;
    burgerPreview.appendChild(item);
    total += ing.price * count;
  }

  totalPriceEl.textContent = `Total Price: ₹${total}`;
}

function saveBurger() {
  if (burgerStack.length === 0) return alert("Please add ingredients first!");

  const summary = burgerStack.reduce((acc, i) => {
    acc[i] = (acc[i] || 0) + 1;
    return acc;
  }, {});

  const saved = Object.keys(summary)
    .map((i) => {
      const ing = ingredients[i];
      return `${ing.name} × ${summary[i]}`;
    })
    .join("\n");

  alert("🍔 Burger Saved!\n\n" + saved);
}

// Init
renderIngredients();
renderBurger();
