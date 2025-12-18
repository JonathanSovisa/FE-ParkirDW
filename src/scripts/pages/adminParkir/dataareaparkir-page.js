import '../../../components/headeradmin.js';
import '../../../components/sidebaradmin.js';
import DataAreaParkirPresenter from './dataareaparkir-page-presenter.js';

export default class datakendaraan {
  async render() {
    return `
      <header-admin></header-admin>
      <div class="dashboard-container">
        <sidebar-admin></sidebar-admin>

        <main class="dashboard-content">
          <h2>DATA AREA PARKIR</h2>

          <!-- FILTERS -->
          <div class="filter-box">
            <input type="text" id="searchInput" placeholder="Cari nama area...">

            <select id="sortKapasitas">
              <option value="">Sort Kapasitas</option>
              <option value="avail-asc">Tersedia Tersedikit</option>
              <option value="avail-desc">Tersedia Terbanyak</option>
            </select>
          </div>

          <!-- Tabel Data -->
          <div class="vehicle-table">
            <table>
              <thead>
                <tr>
                  <th>ID Area</th>
                  <th>Nama Area</th>
                  <th>Kapasitas Total</th>
                  <th>Kapasitas Tersedia</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody id="areaParkirBody"></tbody>
            </table>
          </div>

          <!-- Pagination -->
          <div class="pagination">
            <button id="firstPage" class="page-btn">««</button>
            <button id="prevPage" class="page-btn">‹</button>
            <span id="pageInfo"></span>
            <button id="nextPage" class="page-btn">›</button>
            <button id="lastPage" class="page-btn">»»</button>
          </div>

          <div id="toastContainer" class="toast-container"></div>

          <!-- POPUP EDIT KECIL -->
          <div class="popup-edit" id="popupEdit">
            <div class="popup-box">
              <h4>Edit Area</h4>
              
              <label>Nama Area</label>
              <input type="text" id="popupNama">

              <label>Kapasitas Total</label>
              <input type="number" id="popupTotal">

              <label>Kapasitas Tersedia</label>
              <input type="number" id="popupAvail">

              <div class="popup-actions">
                <button id="popupCancel">Batal</button>
                <button id="popupSave">Simpan</button>
              </div>
            </div>
          </div>

        </main>
      </div>

    `;
  }

  async afterRender() {
    const presenter = new DataAreaParkirPresenter();
    presenter.init();
  }

}