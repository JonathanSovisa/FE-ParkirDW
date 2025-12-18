import '../../../components/headeradmin.js';
import '../../../components/sidebaradmin.js';

import DataKendaraanPresenter from './datakendaraan-page-presenter.js';

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
            <label>Jurusan</label>
            <select id="jurusan">
              <option value="">Semua Jurusan</option>
            </select>
            <button id="btnTambahKendaraan" class="create-btn">+ Tambah Kendaraan</button>
          </div>

          <!-- Table (sudah dibungkus vehicle-table) -->
          <div class="vehicle-table">
            <table>
              <thead>
                <tr>
                  <th>No</th>
                  <th>NIM</th>
                  <th>Nama</th>
                  <th>No Polisi</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody id="kendaraanBody"></tbody>
            </table>
          </div>

          <!-- POPUP ADD -->
          <div id="popupAdd" class="popup hidden">
            <div class="popup-content">
              <h3 id="popupTitle">Tambah Kendaraan</h3>

              <label>NIM</label>
              <input id="formNIM">

              <label>No Polisi</label>
              <input id="formNoKendaraan">

              <label>Tahun</label>
              <input id="formTahun" type="number">

              <label>Merek</label>
              <input id="formMerek">

              <label>Warna</label>
              <input id="formWarna">

              <div class="popup-actions">
                <button id="btnCancel">Batal</button>
                <button id="btnSimpan">Simpan</button>
              </div>
            </div>
          </div>

          <!-- POPUP EDIT -->
          <div id="popupEdit" class="popup hidden">
            <div class="popup-content">
              <h3>Edit Kendaraan</h3>

              <label>NIM</label>
              <input id="editNIM" readonly>

              <label>No Polisi</label>
              <input id="editNoKendaraan">

              <label>Tahun</label>
              <input id="editTahunKendaraan" type="number">

              <label>Merek</label>
              <input id="editMerekKendaraan">

              <label>Warna</label>
              <input id="editWarnaKendaraan">

              <div class="popup-actions">
                <button id="editCancel">Batal</button>
                <button id="editSave">Simpan</button>
              </div>
            </div>
          </div>


              <!-- Pagination -->
          <div class="pagination">
            <button id="firstPage" class="page-btn">««</button>
            <button id="prevPage" class="page-btn">‹</button>
            <span id="pageInfo"></span>
            <button id="nextPage" class="page-btn">›</button>
            <button id="lastPage" class="page-btn">»»</button>
          </div>

        </main>
      </div>
    `;
  }

  async afterRender() {
    DataKendaraanPresenter.init();
  }
}
