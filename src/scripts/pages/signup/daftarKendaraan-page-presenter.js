import { registerKendaraan } from '../../data/api.js';



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


const SignUpKendaraanPresenter = {

  async handleSubmit(event) {
    event.preventDefault();

    const NIM = localStorage.getItem('NIM'); // ← Ambil otomatis dari user yang login
    if (!NIM) {
      showToast('Anda harus login terlebih dahulu');
      window.location.hash = '/login';
      return;
    }

    const noKendaraan = document.getElementById('noKendaraan').value;
    const tahunKendaraan = document.getElementById('tahunKendaraan').value;
    const merekKendaraan = document.getElementById('merekKendaraan').value;
    const warnaKendaraan = document.getElementById('warnaKendaraan').value;

    try {
      await registerKendaraan({
        NIM,
        noKendaraan,
        tahunKendaraan,
        merekKendaraan,
        warnaKendaraan
      });

      showToast('Kendaraan berhasil didaftarkan!');
      window.location.hash = '/login';

    } catch (error) {
      console.error(error);
      showToast('Gagal mendaftar kendaraan: ' + error.message);
    }
  },
};

export default SignUpKendaraanPresenter;
