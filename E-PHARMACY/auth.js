// Import Firebase Auth modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "ضع_الـ_API_KEY_هنا",
  authDomain: "اسم_المشروع.firebaseapp.com",
  projectId: "اسم_المشروع",
  storageBucket: "اسم_المشروع.appspot.com",
  messagingSenderId: "رقم",
  appId: "الكود_بتاع_appId"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// إنشاء حساب جديد
export function signupUser(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("✅ تم إنشاء الحساب بنجاح!");
      window.location.href = "index.html";
    })
    .catch((error) => {
      alert("❌ خطأ: " + error.message);
    });
}

// تسجيل الدخول
export function loginUser(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("✅ تم تسجيل الدخول!");
      window.location.href = "index.html";
    })
    .catch((error) => {
      alert("❌ خطأ: " + error.message);
    });
}

// تسجيل الخروج
export function logoutUser() {
  signOut(auth)
    .then(() => {
      alert("🚪 تم تسجيل الخروج");
      window.location.href = "login.html";
    })
    .catch((error) => {
      alert("❌ خطأ أثناء تسجيل الخروج: " + error.message);
    });
}
window.location.href = "index.html";
