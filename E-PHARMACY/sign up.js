// signup.js — تسجيل أدمن جديد في Firebase
 <script src="nav.html" defer></script>
document.getElementById('signupBtn').addEventListener('click', async () => {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const feedback = document.getElementById('feedback');

  if (!email || !password) {
    feedback.innerText = "من فضلك املأ جميع الحقول!";
    feedback.className = "error";
    return;
  }

  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;

    await db.collection("users").doc(user.uid).set({
      email: email,
      role: "admin",
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    feedback.innerText = "تم إنشاء الحساب بنجاح ✅";
    feedback.className = "success";
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1500);
  } catch (error) {
    feedback.innerText = error.message;
    feedback.className = "error";
  }
});
