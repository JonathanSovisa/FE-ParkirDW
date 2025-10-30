import '../../../components/headerumum.js';

export default class scanMasuk {
  async render() {
    return `
      <header-umum></header-umum>

      <main class="scan-masuk-container">
        <section class="scan-card">
          <div class="scan-info">
            <h2 class="nama">NAMA MAHASISWA</h2>
            <p class="status">Mahasiswa Aktif UKDW Jogja</p>
            <p class="nopol">No. Polisi –</p>

            <div class="waktu">
              <p><strong>Tanggal Masuk –</strong></p>
              <p><strong>Jam Masuk –</strong></p>
            </div>

            <input type="text" class="nim-input" placeholder="Masukkan NIM..." disabled />
          </div>
        </section>
      </main>
    `;
  }

  async afterRender() {
    // nanti di sini bisa kamu isi logika QR code scan
  }
}
