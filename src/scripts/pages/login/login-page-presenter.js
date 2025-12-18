import { loginMahasiswa, loginAdmin } from '../../data/api.js';


// =========================
// TOAST NOTIFICATION
// =========================
function showToast(message, type = "success") {
  const container = document.getElementById("toastContainer");

  const toast = document.createElement("div");
  toast.classList.add("toast", type === "success" ? "toast-success" : "toast-error");
  toast.textContent = message;

  container.appendChild(toast);

  setTimeout(() => toast.remove(), 3000);
}


const LoginPresenter = {

  async handleLogin(event) {
    event.preventDefault();

    const nim = document.getElementById('nim').value.trim();
    const password = document.getElementById('password').value.trim();

    const isAdmin = nim.toLowerCase().endsWith("@adminparkirukdw.com");

    try {
      if (isAdmin) {
        const result = await loginAdmin({ email: nim, password });

        localStorage.setItem('ROLE', 'ADMIN');
        localStorage.setItem('ADMIN_ID', result.data.email);
        localStorage.setItem('NAMA', result.data.nama);

        showToast('Login Admin Berhasil!');
        window.location.hash = '/dashboardadmin';

      } else {
        const result = await loginMahasiswa({ NIM: nim, password });

        localStorage.setItem('ROLE', 'MAHASISWA');
        localStorage.setItem('NIM', result.data.NIM);
        localStorage.setItem('NAMA', result.data.nama); 

        showToast('Login Mahasiswa Berhasil!');
        window.location.hash = '/datamhs';

      }

    } catch (error) {
      showToast('Login gagal: ' + error.message);
    }
  },

};

export default LoginPresenter;
