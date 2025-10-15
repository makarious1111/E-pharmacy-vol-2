// nav.js — صيدلية سامح و سامي

const userType = localStorage.getItem('userType') || 'guest'; 
// ممكن تكون guest / customer / admin

// تحميل ملف الـ Navbar تلقائيًا
function loadNav() {
  fetch('nav.html')
    .then(res => res.text())
    .then(html => {
      document.body.insertAdjacentHTML('afterbegin', html);
      renderNavLinks();
    })
    .catch(err => console.error('فشل تحميل الـ Navbar:', err));
}

// رسم روابط الـ Navbar حسب نوع المستخدم
function renderNavLinks() {
  const navLinks = document.getElementById('navLinks');
  if (!navLinks) return;

  let links = `
    <a href="index.html">المتجر</a>
    <a href="contact.html">تواصل معنا</a>
     <a href="signup.html">سجل الان </a>
  `;

  if (userType === 'guest') {
    links += `<a href="login.html" class="highlight">تسجيل الدخول</a>`;
  } 
  else if (userType === 'customer') {
    links += `
      <a href="cart.html">سلة المشتريات</a>
      <a href="profile.html">حسابي</a>
      <button class="logout-btn" onclick="logout()">تسجيل الخروج</button>
    `;
  } 
  else if (userType === 'admin') {
    links += `
      <a href="dashboard.html">لوحة التحكم</a>
      <a href="inventory.html">المخزون</a>
      <a href="sales.html">المبيعات</a>
      <button class="logout-btn" onclick="logout()">تسجيل الخروج</button>
    `;
  }

  navLinks.innerHTML = links;
}

// تسجيل الخروج
function logout() {
  localStorage.removeItem('userType');
  window.location.href = 'index.html';
}

// تحميل الـ Navbar عند فتح الصفحة
document.addEventListener('DOMContentLoaded', loadNav);
fetch('nav.html')
  .then(response => response.text())
  .then(data => document.getElementById('nav').innerHTML = data);
