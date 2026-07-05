const token = sessionStorage.getItem('acme_token');

if (!token) {
  window.location.href = 'index.html';
}

// ---- Datos de ejemplo (mock) ----
const inventario = [
  { sku: 'FER-001', producto: 'Martillo 16oz', categoria: 'Herramientas', stock: 42, precio: 5990 },
  { sku: 'FER-002', producto: 'Taladro percutor 750W', categoria: 'Eléctricas', stock: 15, precio: 45990 },
  { sku: 'FER-003', producto: 'Cable eléctrico 2.5mm (rollo 100m)', categoria: 'Energía', stock: 8, precio: 38990 },
  { sku: 'FER-004', producto: 'Set llaves allen', categoria: 'Herramientas', stock: 60, precio: 4990 },
  { sku: 'FER-005', producto: 'Tablero eléctrico 12 puestos', categoria: 'Energía', stock: 5, precio: 22990 },
];

const ventas = [
  { id: 'V-1001', cliente: 'Constructora Los Andes', producto: 'Cable eléctrico 2.5mm', cantidad: 10, total: 389900, fecha: '2026-07-01' },
  { id: 'V-1002', cliente: 'Juan Pérez', producto: 'Martillo 16oz', cantidad: 2, total: 11980, fecha: '2026-07-02' },
  { id: 'V-1003', cliente: 'Ferretería El Roble (reventa)', producto: 'Taladro percutor 750W', cantidad: 3, total: 137970, fecha: '2026-07-03' },
  { id: 'V-1004', cliente: 'María González', producto: 'Set llaves allen', cantidad: 1, total: 4990, fecha: '2026-07-04' },
];

const clientes = [
  { rut: '76.123.456-7', nombre: 'Constructora Los Andes', tipo: 'Empresa', ciudad: 'Temuco', totalCompras: 4850000 },
  { rut: '12.345.678-9', nombre: 'Juan Pérez', tipo: 'Persona', ciudad: 'Padre Las Casas', totalCompras: 89900 },
  { rut: '77.888.999-1', nombre: 'Ferretería El Roble', tipo: 'Empresa', ciudad: 'Villarrica', totalCompras: 2130000 },
  { rut: '13.222.333-4', nombre: 'María González', tipo: 'Persona', ciudad: 'Temuco', totalCompras: 45990 },
];

// ---- Formateo de moneda CLP ----
function clp(valor) {
  return valor.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 });
}

// ---- Renderizado de tablas ----
function renderInventario() {
  const tbody = document.querySelector('#tabla-inventario tbody');
  tbody.innerHTML = inventario.map(p => `
    <tr>
      <td>${p.sku}</td>
      <td>${p.producto}</td>
      <td>${p.categoria}</td>
      <td>${p.stock}${p.stock <= 10 ? ' ⚠️' : ''}</td>
      <td>${clp(p.precio)}</td>
    </tr>
  `).join('');
}

function renderVentas() {
  const tbody = document.querySelector('#tabla-ventas tbody');
  tbody.innerHTML = ventas.map(v => `
    <tr>
      <td>${v.id}</td>
      <td>${v.cliente}</td>
      <td>${v.producto}</td>
      <td>${v.cantidad}</td>
      <td>${clp(v.total)}</td>
      <td>${v.fecha}</td>
    </tr>
  `).join('');
}

function renderClientes() {
  const tbody = document.querySelector('#tabla-clientes tbody');
  tbody.innerHTML = clientes.map(c => `
    <tr>
      <td>${c.rut}</td>
      <td>${c.nombre}</td>
      <td>${c.tipo}</td>
      <td>${c.ciudad}</td>
      <td>${clp(c.totalCompras)}</td>
    </tr>
  `).join('');
}

// ---- Navegación por pestañas ----
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});

// ---- Verificación de sesión contra el backend (igual que antes) ----
async function cargarDashboard() {
  try {
    const res = await fetch('/erp/dashboard', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();

    if (!res.ok) {
      sessionStorage.removeItem('acme_token');
      window.location.href = 'index.html';
      return;
    }

    document.getElementById('bienvenida').textContent = data.mensaje;
    renderInventario();
    renderVentas();
    renderClientes();
  } catch (err) {
    document.getElementById('bienvenida').textContent = 'Error de conexión';
  }
}

document.getElementById('logout').addEventListener('click', () => {
  sessionStorage.removeItem('acme_token');
  window.location.href = 'index.html';
});

cargarDashboard();

