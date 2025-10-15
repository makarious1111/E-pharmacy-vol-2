// script.js — المتجر الإلكتروني لصيدلية سامح و سامي

let products = [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let currentPage = 1;
const itemsPerPage = 6;

// ---------------- تحميل المنتجات من Firestore ----------------
async function loadProductsFromFirestore() {
  const snapshot = await db.collection("products").get();
  products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// ---------------- عرض المنتجات ----------------
function renderProducts() {
  const grid = document.getElementById("productGrid");
  if (!grid) return;

  const searchValue = document.getElementById("searchInput")?.value.toLowerCase() || "";
  const catFilter = document.getElementById("filterCategory")?.value || "";
  const pointFilter = document.getElementById("filterPoint")?.value || "";

  let filtered = products.filter(p =>
    p.name.toLowerCase().includes(searchValue) &&
    (!catFilter || p.category === catFilter) &&
    (!pointFilter || p.point === pointFilter)
  );

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginated = filtered.slice(start, end);

  grid.innerHTML = paginated.map(p => `
    <div class="product-card">
      <img src="${p.img}" alt="${p.name}" class="product-img">
      <h3>${p.name}</h3>
      <p class="price">${p.price} ج.م</p>
      <p class="muted small">${translateCat(p.category)} • ${translatePoint(p.point)}</p>
      <button onclick="addToCart('${p.id}')" class="btn full">أضف للسلة</button>
    </div>
  `).join("");

  document.getElementById("pageInfo").textContent = `صفحة ${currentPage}`;
}

// ---------------- سلة المشتريات ----------------
function renderCart() {
  const cartEl = document.getElementById("cartItems");
  const subtotalEl = document.getElementById("subtotal");
  if (!cartEl || !subtotalEl) return;

  if (cart.length === 0) {
    cartEl.innerHTML = `<div class="small muted">السلة فارغة</div>`;
    subtotalEl.textContent = "ج.م 0.00";
    return;
  }

  let total = 0;
  cartEl.innerHTML = cart.map((item, i) => {
    total += item.price;
    return `
      <div class="cart-item">
        <div>${item.name}</div>
        <div class="small muted">${item.price} ج.م</div>
        <button class="icon-btn" onclick="removeFromCart(${i})">✕</button>
      </div>
    `;
  }).join("");

  subtotalEl.textContent = `ج.م ${total.toFixed(2)}`;
}

// ---------------- إضافة للسلة ----------------
function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  cart.push(product);
  saveCart();
  renderCart();
  showToast(`${product.name} أُضيف للسلة`);
}

// ---------------- إزالة منتج ----------------
function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  renderCart();
}

// ---------------- حفظ السلة ----------------
async function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  const user = auth.currentUser;
  if (user) {
    await db.collection("carts").doc(user.uid).set({ cart });
  }
}

// ---------------- تحميل سلة المستخدم ----------------
async function loadCart() {
  const user = auth.currentUser;
  if (user) {
    const doc = await db.collection("carts").doc(user.uid).get();
    if (doc.exists) {
      cart = doc.data().cart || [];
      renderCart();
    }
  }
}

// ---------------- Toast ----------------
function showToast(msg) {
  const t = document.getElementById("toast");
  if (!t) return;
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2000);
}

// ---------------- ترجمة ----------------
function translateCat(c) {
  return c === "medicine" ? "دواء"
    : c === "vitamin" ? "فيتامين"
    : c === "device" ? "جهاز"
    : c === "syrup" ? "شراب"
    : "أخرى";
}
function translatePoint(p) {
  return p === "main" ? "الرئيسي"
    : p === "shobra" ? "فرع شبرا"
    : p === "maadi" ? "فرع المعادي"
    : "غير محدد";
}

// ---------------- ترقيم الصفحات ----------------
document.getElementById("nextPage")?.addEventListener("click", () => {
  currentPage++;
  renderProducts();
});
document.getElementById("prevPage")?.addEventListener("click", () => {
  if (currentPage > 1) currentPage--;
  renderProducts();
});

// ---------------- بحث + فلاتر ----------------
document.getElementById("searchInput")?.addEventListener("input", renderProducts);
document.getElementById("filterCategory")?.addEventListener("change", renderProducts);
document.getElementById("filterPoint")?.addEventListener("change", renderProducts);

// ---------------- تحميل أولي ----------------
document.addEventListener("DOMContentLoaded", async () => {
  await loadProductsFromFirestore();
  await loadCart();
  renderProducts();
  renderCart();
});

window.addEventListener("beforeunload", saveCart);
