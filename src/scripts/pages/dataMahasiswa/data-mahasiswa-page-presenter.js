import { 
  getKendaraanByNIM, 
  getAllAreaParkir, 
  scanIn 
} from '../../data/api.js';

const DataMahasiswaPresenter = {
  async init() {
    const nama = localStorage.getItem("NAMA");
    const nim = localStorage.getItem("NIM");

    if (!nama || !nim) {
      window.location.hash = "/login";
      return;
    }

    this.setProfile(nama);
    await this.loadKendaraan(nim, nama);
    await this.renderAreaParkir();
  },

  setProfile(nama) {
    document.querySelector(".name").textContent = nama;
    document.querySelector(".status").textContent = "Mahasiswa Aktif UKDW";

    document.querySelector(".initial-box").textContent =
      nama.split(" ").map(n => n[0]).join("").toUpperCase();
  },

  async loadKendaraan(nim, nama) {
    const result = await getKendaraanByNIM(nim);
    if (!result.data.length) return;

    const kendaraan = result.data[0];
    const BASE_URL = "http://localhost:4000";

    document.querySelector(".qr-img").src = BASE_URL + kendaraan.qrPath;
    document.querySelector(".qr-popup-img").src = BASE_URL + kendaraan.qrPath;
    document.querySelector(".qr-name").innerHTML = `${nama}<br>${kendaraan.noKendaraan}`;
    document.querySelector(".barcode-text").textContent = kendaraan.noKendaraan;

    this.noKendaraan = kendaraan.noKendaraan;
  },

  async renderAreaParkir() {
    const result = await getAllAreaParkir();
    const grid = document.getElementById('parkingGrid');
    grid.innerHTML = '';

    result.data.forEach(area => {
      const slot = document.createElement('div');
      slot.className = 'parking-slot';
      slot.dataset.area = area.namaArea;
      slot.dataset.kapasitas = area.kapasitasTersedia;

      if (area.kapasitasTersedia <= 0) {
        slot.classList.add('disabled');
      }

      slot.innerHTML = `
        <div class="slot-label">${area.namaArea}</div>
        <div class="slot-value">${area.kapasitasTersedia}</div>
      `;

      grid.appendChild(slot);
    });
  },

  async confirmParkir(namaArea) {
    try {
      await scanIn(this.noKendaraan, namaArea);
      alert("✅ Parkir berhasil!");
      await this.renderAreaParkir(); // refresh kapasitas
    } catch (err) {
      alert(err.message);
    }
  }
};

export default DataMahasiswaPresenter;
