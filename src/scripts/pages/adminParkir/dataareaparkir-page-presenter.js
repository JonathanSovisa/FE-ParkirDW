import { getAllAreaParkir, updateAreaParkir, deleteAreaParkir } from '../../data/api.js';

// =========================
// TOAST NOTIFICATION
// =========================
function showToast(message, type = "success") {
  const container = document.getElementById("toastContainer");

  const toast = document.createElement("div");
  toast.classList.add("toast", type === "success" ? "toast-success" : "toast-error");
  toast.textContent = message;

  container.appendChild(toast);

  setTimeout(() => toast.remove(), 3000);
}

export default class DataAreaParkirPresenter {
  constructor() {
    this.data = [];
    this.filteredData = [];
    this.currentPage = 1;
    this.itemsPerPage = 10;
    this.eventsInitialized = false;
    this.editID = null;
  }

  async init() {
    await this.loadData();
    this.initEvents();
    this.renderTable();
  }

  async loadData() {
    const result = await getAllAreaParkir();
    this.data = result.data;
    this.filteredData = [...this.data];
  }

  initEvents() {
    if (this.eventsInitialized) return;
    this.eventsInitialized = true;


    document.getElementById('searchInput').addEventListener('input', () => this.applyFilters());
    document.getElementById('sortKapasitas').addEventListener('change', () => this.applyFilters());

    // pagination
    document.getElementById('firstPage').onclick = () => { this.currentPage = 1; this.renderTable(); };
    document.getElementById('prevPage').onclick = () => { if (this.currentPage > 1) this.currentPage--; this.renderTable(); };
    document.getElementById('nextPage').onclick = () => { if (this.currentPage < this.totalPages()) this.currentPage++; this.renderTable(); };
    document.getElementById('lastPage').onclick = () => { this.currentPage = this.totalPages(); this.renderTable(); };

    // POPUP BUTTONS
    document.getElementById('popupCancel').onclick = () =>
      document.getElementById('popupEdit').style.display = 'none';

    document.getElementById('popupSave').onclick = () => this.savePopupEdit();

    // CLICK ACTIONS – FIXED AND SAFE
    document.body.addEventListener('click', (e) => {
      const btnEdit = e.target.closest('.edit');
      const btnDelete = e.target.closest('.delete');

      if (!btnEdit && !btnDelete) return;

      const row = e.target.closest('tr');
      if (!row) return;

      const id = row.dataset.id;

      if (btnEdit) this.openEdit(id);
      if (btnDelete) this.deleteArea(id);
    });
  }

  // FILTER + SORT
  applyFilters() {
    const s = document.getElementById('searchInput').value.toLowerCase();
    const sort = document.getElementById('sortKapasitas').value;

    this.filteredData = this.data.filter(item =>
      item.namaArea.toLowerCase().includes(s)
    );

    if (sort === 'avail-asc') {
      this.filteredData.sort((a, b) => a.kapasitasTersedia - b.kapasitasTersedia);
    }
    if (sort === 'avail-desc') {
      this.filteredData.sort((a, b) => b.kapasitasTersedia - a.kapasitasTersedia);
    }

    this.currentPage = 1;
    this.renderTable();
  }

  // TABLE RENDER
  totalPages() {
    return Math.ceil(this.filteredData.length / this.itemsPerPage);
  }

  renderTable() {
    const tbody = document.getElementById('areaParkirBody');
    tbody.innerHTML = '';

    const start = (this.currentPage - 1) * this.itemsPerPage;
    const pagedata = this.filteredData.slice(start, start + this.itemsPerPage);

    pagedata.forEach(item => {
      tbody.innerHTML += `
        <tr data-id="${item.ID_Area}">
          <td>${item.ID_Area}</td>
          <td>${item.namaArea}</td>
          <td>${item.kapasitasTotal}</td>
          <td>${item.kapasitasTersedia}</td>
          <td>
            <button class="btn-action edit"><i class="fas fa-pen"></i></button>
            <button class="btn-action delete"><i class="fas fa-trash"></i></button>
          </td>
        </tr>
      `;
    });

    document.getElementById('pageInfo').innerHTML =
      `Halaman ${this.currentPage} / ${this.totalPages()}`;
  }

  // EDIT POPUP — FULL FIX
  openEdit(id) {
    const item = this.data.find(d => String(d.ID_Area) === String(id));

    if (!item) {
      console.error("DATA AREA TIDAK DITEMUKAN. ID:", id, this.data);
      showToast("Gagal membuka edit — data tidak ditemukan", "error");
      return;
    }

    this.editID = id;

    document.getElementById('popupNama').value = item.namaArea;
    document.getElementById('popupTotal').value = item.kapasitasTotal;
    document.getElementById('popupAvail').value = item.kapasitasTersedia;

    document.getElementById('popupEdit').style.display = 'flex';
  }

  async savePopupEdit() {
    const body = {
      namaArea: document.getElementById('popupNama').value,
      kapasitasTotal: Number(document.getElementById('popupTotal').value),
      kapasitasTersedia: Number(document.getElementById('popupAvail').value),
    };

    try {
      await updateAreaParkir(this.editID, body);
      showToast("Berhasil mengupdate area!", "success");

      document.getElementById('popupEdit').style.display = 'none';

      await this.loadData();
      this.applyFilters();
    } catch (err) {
      showToast("Gagal mengupdate area!", "error");
    }
  }

  // DELETE
  async deleteArea(id) {
    const yakin = confirm("Hapus area ini?");
    if (!yakin) return;

    try {
      await deleteAreaParkir(id);
      showToast("Area berhasil dihapus!", "success");

      await this.loadData();
      this.applyFilters();
    } catch (err) {
      showToast("Gagal menghapus area!", "error");
    }
  }
}
