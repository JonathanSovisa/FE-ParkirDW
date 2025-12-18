import '../../../components/headerumum.js';

export default class scanKeluar {
  async render() {
    return `
      <header-umum></header-umum>

      <main class="scan-masuk-container">
        <div class="scan-layout">
          
          <!-- KIRI -->
          <div class="scan-left">
            <h2 class="nama">SCAN KELUAR</h2>

            <p class="nopol">No. Polisi –</p>

            <div class="waktu">
              <p><strong>Tanggal Keluar –</strong></p>
              <p><strong>Jam Keluar –</strong></p>
            </div>
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
    const presenter = await import('./scankeluar-page-presenter.js');
    presenter.default.init();
  }
}
