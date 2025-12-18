import { registerMahasiswa, getProgramStudi } from '../../data/api.js';


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

const SignUpPresenter = {

  async loadProdi() {
    const select = document.getElementById('prodi');

    try {
      const result = await getProgramStudi();  
      const list = result.data; // backend: { message, data: [...] }

      list.forEach((prodi) => {
        const option = document.createElement('option');
        option.value = prodi.ID_Prodi;
        option.textContent = prodi.namaProdi;
        select.appendChild(option);
      });

    } catch (err) {
      console.error('Gagal load prodi:', err);
      showToast('Gagal memuat daftar Program Studi');
    }
  },

  async handleSubmit(event) {
    event.preventDefault();

    const NIM = document.getElementById('nim').value;
    const ID_Prodi = document.getElementById('prodi').value;
    const nmMhs = document.getElementById('nama').value;
    const noHP = document.getElementById('noHP').value;
    const alamat = document.getElementById('alamat').value;
    const password = document.getElementById('password').value;

    try {
      await registerMahasiswa({
        NIM,
        ID_Prodi,
        nmMhs,
        noHP,
        alamat,
        password,
      });

      localStorage.setItem('NIM', NIM);
      localStorage.setItem('NAMA', nmMhs);

      showToast('Registrasi berhasil!');
      window.location.hash = '/signupkendaraan';

    } catch (error) {
      console.error(error);
      showToast(error.message, "error");
    }
  },
};

export default SignUpPresenter;
