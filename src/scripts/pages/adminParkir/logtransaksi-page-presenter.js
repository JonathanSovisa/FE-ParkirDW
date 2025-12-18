import { getAllScanLog } from '../../data/api.js';

// =========================
// HELPER FORMAT WIB
// =========================
const formatWIB = (value) => {
  if (!value) return '-';

  const d = new Date(value);
  if (isNaN(d.getTime())) return '-';

  return d.toLocaleString('id-ID', {
    timeZone: 'Asia/Jakarta',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
};

// =========================
// PRESENTER (SAMA KAYAK DATA AREA PARKIR)
// =========================
const LogTransaksiPresenter = {
  async init() {
    this.data = [];
    this.filteredData = [];
    this.currentPage = 1;
    this.itemsPerPage = 10;

    this.tableBody = document.getElementById('logBody');
    this.jurusanSelect = document.getElementById('jurusan');

    // pagination buttons
    this.btnFirst = document.querySelector('.page-btn.first');
    this.btnPrev = document.querySelector('.page-btn.prev');
    this.btnNext = document.querySelector('.page-btn.next');
    this.btnLast = document.querySelector('.page-btn.last');

    await this.loadData();
    this.initEvents();
    this.renderTable();
  },

  async loadData() {
    const result = await getAllScanLog();
    this.data = result.data;
    this.filteredData = [...this.data];
  },

  initEvents() {
    // filter jurusan
    this.jurusanSelect.addEventListener('change', () => {
      this.applyFilter();
    });

    // pagination (SAMA PERSIS)
    this.btnFirst.onclick = () => {
      this.currentPage = 1;
      this.renderTable();
    };

    this.btnPrev.onclick = () => {
      if (this.currentPage > 1) this.currentPage--;
      this.renderTable();
    };

    this.btnNext.onclick = () => {
      if (this.currentPage < this.totalPages()) this.currentPage++;
      this.renderTable();
    };

    this.btnLast.onclick = () => {
      this.currentPage = this.totalPages();
      this.renderTable();
    };
  },

  applyFilter() {
    const selected = this.jurusanSelect.value;

    if (!selected) {
      this.filteredData = [...this.data];
    } else {
      this.filteredData = this.data.filter(
        item => item.namaProdi === selected
      );
    }

    this.currentPage = 1;
    this.renderTable();
  },

  totalPages() {
    return Math.ceil(this.filteredData.length / this.itemsPerPage);
  },

  renderTable() {
    this.tableBody.innerHTML = '';

    const start = (this.currentPage - 1) * this.itemsPerPage;
    const pageData = this.filteredData.slice(start, start + this.itemsPerPage);

    pageData.forEach(item => {
      this.tableBody.innerHTML += `
        <tr>
          <td>${item.NIM}</td>
          <td>${item.nmMhs}</td>
          <td>${item.noKendaraan}</td>
          <td>${item.namaArea}</td>
          <td>${formatWIB(item.waktuMasuk)}</td>
          <td>${item.waktuKeluar ? formatWIB(item.waktuKeluar) : '-'}</td>
        </tr>
      `;
    });

    // ✅ PAGE INFO (SAMA KAYAK CONTOH)
    document.getElementById('pageInfo').innerHTML =
      `Halaman ${this.currentPage} / ${this.totalPages() || 1}`;
  }
};

export default LogTransaksiPresenter;
