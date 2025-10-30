import '../../../components/headeradmin.js';
import '../../../components/sidebaradmin.js';

export default class logkeluar {
  async render() {
    return `
      <header-admin></header-admin>

      <div class="dashboard-container">
        <sidebar-admin></sidebar-admin>

        <main class="dashboard-content">
          <h2>LOG TRANSAKSI KELUAR</h2>

          <!-- Filter Jurusan -->
          <div class="filter-box">
            <label for="jurusan">Jurusan</label>
            <select id="jurusan" class="jurusan-select">
              <option value="">Pilih</option>
              <option value="SI">Sistem Informasi</option>
              <option value="TI">Teknik Informatika</option>
              <option value="DKV">Desain Komunikasi Visual</option>
              <option value="MI">Manajemen Informatika</option>
            </select>
          </div>

          <!-- Tabel Log Keluar -->
          <div class="log-table">
            <table>
              <thead>
                <tr>
                  <th>No</th>
                  <th>NIM</th>
                  <th>Nama Lengkap</th>
                  <th>No. Polisi Kendaraan</th>
                  <th>Area Parkir</th>
                  <th>Tanggal Keluar</th>
                  <th>Jam Keluar</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>72220535</td>
                  <td>Jonathan Sovisa</td>
                  <td>AB 2056 MQ</td>
                  <td>A8</td>
                  <td>14 Juli 2025</td>
                  <td>18.10</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>72220536</td>
                  <td>Ananda Leon Saputra</td>
                  <td>AB 3722 MS</td>
                  <td>A1</td>
                  <td>14 Juli 2025</td>
                  <td>18.15</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>72220537</td>
                  <td>Filistera Santoso</td>
                  <td>K 2345 AA</td>
                  <td>A5</td>
                  <td>15 Juli 2025</td>
                  <td>10.40</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>72220538</td>
                  <td>Yonathan Delfian Abdiel Sugi</td>
                  <td>AE 2051 JO</td>
                  <td>C1</td>
                  <td>15 Juli 2025</td>
                  <td>10.45</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <div class="pagination">
            <button class="page-btn">««</button>
            <button class="page-btn">‹</button>
            <button class="page-btn">›</button>
            <button class="page-btn">»»</button>
          </div>
        </main>
      </div>
    `;
  }

async afterRender() {
     const jurusanSelect = document.getElementById('jurusan');
    jurusanSelect.addEventListener('change', () => {
      alert(`Filter berdasarkan jurusan: ${jurusanSelect.value || 'Semua'}`);
    });

    
  }
}
