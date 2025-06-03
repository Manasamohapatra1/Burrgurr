const ingredients = [
  { name: "Lettuce", emoji: "🥬" },
  { name: "Tomato", emoji: "🍅" },
  { name: "Cheese", emoji: "🧀" },
  { name: "Patty", emoji: "🍖" },
  { name: "Onion", emoji: "🧅" },
  { name: "Pickle", emoji: "🥒" },
];

const selectedIngredients = new Set();
const ingredientsList = document.getElementById("ingredientsList");
const burgerPreview = document.getElementById("burgerPreview");
const createBtn = document.getElementById("createBurgerBtn");

const renderIngredients = () => {
  ingredientsList.innerHTML = "";
  ingredients.forEach((item) => {
    const btn = document.createElement("div");
    btn.className = "ingredient-item";
    btn.innerText = `${item.emoji} ${item.name}`;
    btn.onclick = () => toggleIngredient(item.name, btn);
    ingredientsList.appendChild(btn);
  });
};

const toggleIngredient = (name, btn) => {
  if (selectedIngredients.has(name)) {
    selectedIngredients.delete(name);
    btn.classList.remove("active");
  } else {
    selectedIngredients.add(name);
    btn.classList.add("active");
  }
};

const createBurger = () => {
  if (selectedIngredients.size === 0) {
    burgerPreview.innerHTML =
      "<p class='text-danger'>Please select at least one ingredient!</p>";
    return;
  }

  const ingredientsHTML = [...selectedIngredients]
    .map((name) => {
      const { emoji } = ingredients.find((ing) => ing.name === name);
      return `<span class="mx-1">${emoji} ${name}</span>`;
    })
    .join("<br>");

  burgerPreview.innerHTML = `
    <h3>Your Custom Burger:</h3>
    <div class="mt-3">${ingredientsHTML}</div>
  `;
};

if (ingredientsList && burgerPreview && createBtn) {
  createBtn.addEventListener("click", createBurger);
  renderIngredients();
}
