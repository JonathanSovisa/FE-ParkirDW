import '../../../components/headeradmin.js';
import '../../../components/sidebaradmin.js';

export default class datakendaraan {
  async render() {
    return `
      <header-admin></header-admin>
      <div class="dashboard-container">
        <sidebar-admin></sidebar-admin>

        <main class="dashboard-content">
          <h2>DATA KENDARAAN MAHASISWA</h2>

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

          <!-- Tabel Data -->
          <div class="vehicle-table">
            <table>
              <thead>
                <tr>
                  <th>No</th>
                  <th>NIM</th>
                  <th>Nama Lengkap</th>
                  <th>No. Polisi Kendaraan</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody id="kendaraanBody">
                <tr>
                  <td>1</td>
                  <td>72220535</td>
                  <td>Jonathan Sovisa</td>
                  <td>AB 2056 MQ</td>
                  <td>
                    <button class="btn-action view"><i class="fas fa-file"></i></button>
                    <button class="btn-action edit"><i class="fas fa-pen"></i></button>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>72220536</td>
                  <td>Ananda Leon Saputra</td>
                  <td>AB 3722 MS</td>
                  <td>
                    <button class="btn-action view"><i class="fas fa-file"></i></button>
                    <button class="btn-action edit"><i class="fas fa-pen"></i></button>
                  </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>72220537</td>
                  <td>Filistera Santoso</td>
                  <td>K 2345 AA</td>
                  <td>
                    <button class="btn-action view"><i class="fas fa-file"></i></button>
                    <button class="btn-action edit"><i class="fas fa-pen"></i></button>
                  </td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>72220538</td>
                  <td>Yonathan Delfian Abdiel Sugi</td>
                  <td>AE 2051 JO</td>
                  <td>
                    <button class="btn-action view"><i class="fas fa-file"></i></button>
                    <button class="btn-action edit"><i class="fas fa-pen"></i></button>
                  </td>
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
    document.querySelectorAll('.btn-action.view').forEach(btn => {
      btn.addEventListener('click', () => alert('Lihat detail kendaraan'));
    });

    document.querySelectorAll('.btn-action.edit').forEach(btn => {
      btn.addEventListener('click', () => alert('Edit data kendaraan'));
    });

     const jurusanSelect = document.getElementById('jurusan');
    jurusanSelect.addEventListener('change', () => {
      alert(`Filter berdasarkan jurusan: ${jurusanSelect.value || 'Semua'}`);
    });

    
  }
}
