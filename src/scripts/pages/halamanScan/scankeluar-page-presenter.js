import { Html5Qrcode } from "html5-qrcode";
import { scanOut } from "../../data/api.js";

const ScanKeluarPresenter = {
  async init() {
    this._initScanner();
  },

  async _initScanner() {
    const html5QrCode = new Html5Qrcode("qr-reader");

    await html5QrCode.start(
      { facingMode: "environment" },
      {
        fps: 25,
        qrbox: 350,
        aspectRatio: 1.0,
      },
      async (decodedText) => {
        await html5QrCode.stop();
        await this._handleScan(decodedText);
      }
    );
  },

  async _handleScan(decodedText) {
    try {
      const noKendaraan = decodedText.trim().toUpperCase();

      const result = await scanOut(noKendaraan);

      this._updateUI(result);
      alert("Scan keluar berhasil. Terima kasih.");
    } catch (err) {
      alert(err.message);
    }
  },

  _updateUI(data) {
    document.querySelector(".nopol").textContent =
      `No. Polisi – ${data.noKendaraan ?? "-"}`;

    document.querySelector(".waktu").innerHTML = `
      <p><strong>Tanggal Keluar –</strong> ${new Date(data.waktuKeluar).toLocaleDateString()}</p>
      <p><strong>Jam Keluar –</strong> ${new Date(data.waktuKeluar).toLocaleTimeString()}</p>
    `;
  }
};

export default ScanKeluarPresenter;
