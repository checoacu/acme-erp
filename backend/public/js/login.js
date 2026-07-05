document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const mensaje = document.getElementById('mensaje');

  try {
    const res = await fetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      mensaje.textContent = data.error || 'Error al iniciar sesión';
      return;
    }

    // Guardamos el token solo en memoria de la sesión del navegador
    sessionStorage.setItem('acme_token', data.token);
    window.location.href = 'dashboard.html';

  } catch (err) {
    mensaje.textContent = 'No se pudo conectar con el servidor';
  }
});
