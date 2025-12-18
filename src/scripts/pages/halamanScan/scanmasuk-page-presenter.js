import { Html5Qrcode } from "html5-qrcode";
import { scanIn, getAllAreaParkir } from "../../data/api.js";

const ScanMasukPresenter = {
  _noKendaraan: null,

  async init() {
    await this._loadAreaParkir();
    this._initScanner();
    this._initButton();
  },

  async _loadAreaParkir() {
    const res = await getAllAreaParkir();
    const select = document.querySelector(".area-select");

    res.data.forEach(area => {
      const option = document.createElement("option");
      option.value = area.ID_Area;
      option.textContent = `${area.namaArea} (Sisa ${area.kapasitasTersedia})`;
      select.appendChild(option);
    });
  },

  _initButton() {
    document.querySelector(".btn-scan-masuk")
      .addEventListener("click", () => this._submitScan());
  },

  async _initScanner() {
    const html5QrCode = new Html5Qrcode("qr-reader");

    await html5QrCode.start(
      { facingMode: "environment" },
      { fps: 25, qrbox: 300 },
      async (decodedText) => {
        await html5QrCode.stop();
        this._handleScan(decodedText);
      }
    );
  },

  _handleScan(decodedText) {
    this._noKendaraan = decodedText.trim().toUpperCase();

    document.querySelector(".nopol").textContent =
      `No. Polisi – ${this._noKendaraan}`;

    document.querySelector(".btn-scan-masuk").disabled = false;
  },

  async _submitScan() {
    const ID_Area = document.querySelector(".area-select").value;

    if (!ID_Area) {
      alert("Pilih area parkir terlebih dahulu");
      return;
    }

    try {
      const result = await scanIn(this._noKendaraan, ID_Area);

      document.querySelector(".waktu").innerHTML = `
        <p><strong>Tanggal Masuk –</strong> ${new Date(result.waktuMasuk).toLocaleDateString()}</p>
        <p><strong>Jam Masuk –</strong> ${new Date(result.waktuMasuk).toLocaleTimeString()}</p>
      `;

      alert("Scan masuk berhasil. Silakan parkir.");
    } catch (err) {
      alert(err.message);
    }
  }
};

export default ScanMasukPresenter;
