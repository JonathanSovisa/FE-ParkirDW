import '../../../components/headerumum.js';


export default class scanKeluar {
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
              <p><strong>Tanggal Keluar –</strong></p>
              <p><strong>Jam Keluar –</strong></p>
            </div>

            <input type="text" class="nim-input" placeholder="Masukkan NIM..." disabled />
          </div>
        </section>
      </main>
    `;
  }

async afterRender() {
  
  
  }
}

