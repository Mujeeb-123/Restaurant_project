const menuItems = [
  { id: 1, name: "Masala Dosa", price: 50, veg: true, category: "main", img: "dosa.jpg" },
  { id: 2, name: "Chicken Biryani", price: 150, veg: false, category: "main", img: "biryani.jpg" },
  { id: 3, name: "Gulab Jamun", price: 40, veg: true, category: "dessert", img: "gulab-jamun.jpg" },
  { id: 4, name: "Paneer Tikka", price: 100, veg: true, category: "starter", img: "Paneer-Tikka-Featured.jpg" },
  { id: 5, name: "Rasmalai", price: 80, veg: true, category: "dessert", img: "Rasmalai-720x722.jpg" },
  { id: 6, name: "Chicken Tikka", price: 200, veg: false, category: "starter", img: "chicken_tikka.webp" },
  { id: 7, name: "Butter Chicken", price: 250, veg: false, category: "main", img: "butter.webp" },
  { id: 8, name: "Veg Biryani", price: 250, veg: true, category: "main", img: "veg-biryani-1300x972.jpeg" },
];

let cart = [];
let orderQueue = [];

function showSection(id) {
  document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function filterMenu() {
  const vegFilter = document.getElementById("vegFilter").value;
  const categoryFilter = document.getElementById("categoryFilter").value;

  const filtered = menuItems.filter(item => {
    const vegMatch = vegFilter === "all" || (vegFilter === "veg" && item.veg) || (vegFilter === "nonveg" && !item.veg);
    const catMatch = categoryFilter === "all" || item.category === categoryFilter;
    return vegMatch && catMatch;
  });

  displayMenu(filtered);
}

function displayMenu(items) {
  const container = document.getElementById("menuItems");
  container.innerHTML = "";
  items.forEach(item => {
    const div = document.createElement("div");
    div.className = "menu-item";
    div.innerHTML = `
      <img src="${item.img}" alt="${item.name}" />
      <h3>${item.name}</h3>
      <p>₹${item.price}</p>
      <button onclick="addToCart(${item.id})">Add to Cart</button>
    `;
    container.appendChild(div);
  });
}

displayMenu(menuItems);

function addToCart(id) {
  const item = menuItems.find(m => m.id === id);
  cart.push(item);
  updateCart();
  updateInvoice();
  showPopup(`${item.name} added to cart!`);
}

function updateCart() {
  const cartContainer = document.getElementById("cartItems");
  const totalPriceEl = document.getElementById("totalPrice");
  cartContainer.innerHTML = "";

  let total = 0;
  cart.forEach((item, i) => {
    const div = document.createElement("div");
    div.textContent = `${item.name} - ₹${item.price}`;
    cartContainer.appendChild(div);
    total += item.price;
  });

  totalPriceEl.textContent = total;
}

function placeOrder() {
  if (cart.length === 0) return alert("Cart is empty");
  orderQueue.push([...cart]);
  cart = [];
  updateCart();
  updateInvoice();
  updateQueue();
  showPopup("Order placed!");
}

function updateQueue() {
  const container = document.getElementById("orderQueue");
  container.innerHTML = "";
  orderQueue.forEach((order, i) => {
    const div = document.createElement("div");
    div.innerHTML = `<strong>Order ${i + 1}</strong><ul>${order.map(o => `<li>${o.name}</li>`).join('')}</ul>`;
    container.appendChild(div);
  });
}

function updateInvoice() {
  const invoiceContent = document.getElementById("invoiceContent");
  invoiceContent.innerHTML = "";

  if (cart.length === 0) {
    invoiceContent.textContent = "Cart is empty.";
    return;
  }

  let total = 0;
  const ul = document.createElement("ul");
  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - ₹${item.price}`;
    total += item.price;
    ul.appendChild(li);
  });

  invoiceContent.appendChild(ul);
  invoiceContent.innerHTML += `<strong>Total: ₹${total}</strong>`;
}

function bookTable(e) {
  e.preventDefault();
  const inputs = e.target.querySelectorAll("input");
  const details = Array.from(inputs).map(i => i.value);
  const bookingList = document.getElementById("bookingList");
  const p = document.createElement("p");
  p.textContent = `Booked: ${details.join(" | ")}`;
  bookingList.appendChild(p);
  showPopup("Table booked successfully!");
  e.target.reset();
}

function showPopup(message) {
  const popup = document.getElementById("popup");
  popup.textContent = message;
  popup.style.display = "block";
  setTimeout(() => {
    popup.style.display = "none";
  }, 2000);
}

document.addEventListener("DOMContentLoaded", () => filterMenu());
