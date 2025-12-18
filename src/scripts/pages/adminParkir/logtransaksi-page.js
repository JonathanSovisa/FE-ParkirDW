import '../../../components/headeradmin.js';
import '../../../components/sidebaradmin.js';

export default class logtransaksi {
  async render() {
    return `
      <header-admin></header-admin>

      <div class="dashboard-container">
        <sidebar-admin></sidebar-admin>

        <main class="dashboard-content">
          <h2>LOG TRANSAKSI PARKIR B2</h2>

          <!-- Filter Jurusan -->
          <div class="filter-box">
            <label for="jurusan">Jurusan</label>
            <select id="jurusan" class="jurusan-select">
              <option value="">Semua</option>
              <option value="Filsafat Keahlian">Filsafat Keahlian</option>
              <option value="Manajemen">Manajemen</option>
              <option value="Akuntansi">Akuntansi</option>
              <option value="Kedokteran">Kedokteran</option>
              <option value="Bioteknologi">Bioteknologi</option>
              <option value="Arsitektur">Arsitektur</option>
              <option value="Desain Produk">Desain Produk</option>
              <option value="Informatika">Informatika</option>
              <option value="Sistem Informasi">Sistem Informasi</option>
              <option value="Pendidikan Bahasa Inggris">Pendidikan Bahasa Inggris</option>
              <option value="Humanitas">Humanitas</option>
            </select>

          </div>

          <!-- Tabel Log Masuk -->
          <div class="log-table">
            <table>
              <thead>
                <tr>
                  <th>NIM</th>
                  <th>Nama Lengkap</th>
                  <th>No. Polisi Kendaraan</th>
                  <th>Area Parkir</th>
                  <th>Waktu Masuk</th>
                  <th>Waktu Keluar</th>
                </tr>
              </thead>
              <tbody id="logBody"></tbody>
            </table>
          </div>

          <!-- Pagination -->
        <div class="pagination">
          <button class="page-btn first">««</button>
          <button class="page-btn prev">‹</button>

          <span id="pageInfo"></span>

          <button class="page-btn next">›</button>
          <button class="page-btn last">»»</button>
        </div>

        </main>
      </div>
    `;
  }

async afterRender() {
    const jurusanSelect = document.getElementById('jurusan');

    // Panggil presenter
    const { default: LogTransaksiPresenter } = await import('./logtransaksi-page-presenter.js');
    LogTransaksiPresenter.init();
      
  }
}

