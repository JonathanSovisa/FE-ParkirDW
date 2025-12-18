import '../../../components/headerumum.js';

export default class scanMasuk {
  async render() {
    return `
      <header-umum></header-umum>

      <main class="scan-masuk-container">
        <div class="scan-layout">

          <!-- KIRI -->
          <div class="scan-left">
            <h2 class="nama">SCAN MASUK</h2>
            <p class="status">Mahasiswa Aktif UKDW Jogja</p>

            <p class="nopol">No. Polisi –</p>

            <div class="waktu">
              <p><strong>Tanggal Masuk –</strong></p>
              <p><strong>Jam Masuk –</strong></p>
            </div>

            <!-- PILIH AREA -->
            <select class="area-select">
              <option value="">Pilih Area Parkir</option>
            </select>

            <!-- KONFIRMASI -->
            <button class="btn-scan-masuk" disabled>
              Konfirmasi Masuk
            </button>
          </div>

          <!-- KANAN -->
          <div class="scan-right">
            <div id="qr-reader" class="qr-reader"></div>
          </div>

        </div>
      </main>
    `;
  }

  async afterRender() {
    const presenter = await import('./scanmasuk-page-presenter.js');
    presenter.default.init();
  }
}
