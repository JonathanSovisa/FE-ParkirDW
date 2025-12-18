import {
  getProgramStudi,
  getAllKendaraan,
  registerKendaraan,
  updateKendaraan,
  deleteKendaraan
} from '../../data/api.js';


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

// NORMALISASI PLAT INDONESIA
function normalizePlateFE(plate) {
  if (!plate) return null;

  plate = plate.replace(/\s+/g, '').toUpperCase();
  const match = plate.match(/^([A-Z]{1,2})(\d{1,4})([A-Z]{1,3})$/);
  if (!match) return null;

  const [, depan, angka, belakang] = match;
  return `${depan} ${angka} ${belakang}`;
}

const DataKendaraanPresenter = {

async init() {
  this.jurusanSelect = document.getElementById('jurusan');
  this.tbody = document.getElementById('kendaraanBody');

  // ✅ INISIALISASI DULU
  this.filteredData = [];
  this.currentPage = 1;
  this.itemsPerPage = 10;

  await this.loadProgramStudi();
  await this.loadKendaraan(); // sekarang AMAN

  this.jurusanSelect.addEventListener('change', () => this.applyFilter());

  this.initPagination();
  this.initAddPopup();
  this.initEditPopup();
  this.initDelete();
  this.initRealtimeValidation();
},


  // ------------------------- LOAD DATA -------------------------
  async loadProgramStudi() {
    const res = await getProgramStudi();
    res.data.forEach(p => {
      const opt = document.createElement('option');
      opt.value = p.namaProdi;
      opt.textContent = p.namaProdi;
      this.jurusanSelect.appendChild(opt);
    });
  },

async loadKendaraan() {
  const res = await getAllKendaraan();
  this.allData = res.data;
  this.filteredData = [...this.allData];
  this.currentPage = 1;
  this.renderTable();
},

applyFilter() {
  const val = this.jurusanSelect.value;

  if (!val) {
    this.filteredData = [...this.allData];
  } else {
    this.filteredData = this.allData.filter(d => d.namaProdi === val);
  }

  this.currentPage = 1;
  this.renderTable();
},

totalPages() {
  return Math.ceil(this.filteredData.length / this.itemsPerPage) || 1;
},


  // ------------------------- RENDER TABLE -------------------------
renderTable() {
  this.tbody.innerHTML = "";

  const start = (this.currentPage - 1) * this.itemsPerPage;
  const pageData = this.filteredData.slice(start, start + this.itemsPerPage);

  pageData.forEach((item, i) => {
    this.tbody.innerHTML += `
      <tr data-id="${item.ID_Kendaraan}">
        <td>${start + i + 1}</td>
        <td>${item.NIM}</td>
        <td>${item.nmMhs}</td>
        <td>${item.noKendaraan}</td>
        <td>
          <button class="btn-action editKendaraan"><i class="fas fa-pen"></i></button>
          <button class="btn-action deleteKendaraan"><i class="fas fa-trash"></i></button>
        </td>
      </tr>
    `;
  });

  document.getElementById('pageInfo').textContent =
    `Halaman ${this.currentPage} / ${this.totalPages()}`;
},


  // ------------------------- VALIDASI REALTIME -------------------------
  initRealtimeValidation() {
    const inputAdd = document.getElementById("formNoKendaraan");
    const inputEdit = document.getElementById("editNoKendaraan");

    [inputAdd, inputEdit].forEach((el) => {
      el.addEventListener("input", (e) => {
        e.target.value = e.target.value.toUpperCase().replace(/[^A-Z0-9 ]/g, "");
      });
    });
  },


 // --------------------------- PAGINATION ------------------------------------------------

 initPagination() {
  document.getElementById('firstPage').onclick = () => {
    this.currentPage = 1;
    this.renderTable();
  };

  document.getElementById('prevPage').onclick = () => {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.renderTable();
    }
  };

  document.getElementById('nextPage').onclick = () => {
    if (this.currentPage < this.totalPages()) {
      this.currentPage++;
      this.renderTable();
    }
  };

  document.getElementById('lastPage').onclick = () => {
    this.currentPage = this.totalPages();
    this.renderTable();
  };
},



  // ------------------------- ADD -------------------------
  initAddPopup() {
    const btnOpen = document.getElementById("btnTambahKendaraan");
    const popup = document.getElementById("popupAdd");

    btnOpen.addEventListener("click", () => popup.classList.remove("hidden"));
    document.getElementById("btnCancel").onclick = () => popup.classList.add("hidden");

    document.getElementById("btnSimpan").onclick = async () => {

      const plat = normalizePlateFE(document.getElementById('formNoKendaraan').value);
      if (!plat) {
        alert("Format nomor kendaraan tidak valid! Contoh: AB 1234 CD");
        return;
      }

      const data = {
        NIM: document.getElementById('formNIM').value.trim(),
        noKendaraan: plat,
        tahunKendaraan: Number(document.getElementById('formTahun').value),
        merekKendaraan: document.getElementById('formMerek').value.trim(),
        warnaKendaraan: document.getElementById('formWarna').value.trim(),
      };

      try {
        await registerKendaraan(data);

        showToast("Berhasil ditambahkan!");
      } catch (err) {
        showToast("Gagal menambahkan kendaraan!", "error");
      }

      popup.classList.add("hidden");
      await DataKendaraanPresenter.loadKendaraan();
    };
  },


  // ------------------------- EDIT -------------------------
  initEditPopup() {
    document.addEventListener("click", (e) => {
      const btn = e.target.closest(".editKendaraan");
      if (!btn) return;

      const row = btn.closest("tr");
      const id = row.dataset.id;

      const data = this.allData.find(d => d.ID_Kendaraan == id);
      if (!data) return;

      document.getElementById('editNIM').value = data.NIM;
      document.getElementById('editNoKendaraan').value = data.noKendaraan;
      document.getElementById('editTahunKendaraan').value = data.tahunKendaraan;
      document.getElementById('editMerekKendaraan').value = data.merekKendaraan;
      document.getElementById('editWarnaKendaraan').value = data.warnaKendaraan;

      const popup = document.getElementById("popupEdit");
      popup.dataset.id = data.ID_Kendaraan;
      popup.classList.remove("hidden");
    });

    document.getElementById("editCancel").onclick = () => {
      document.getElementById("popupEdit").classList.add("hidden");
    };

    document.getElementById("editSave").onclick = async () => {
      const popup = document.getElementById("popupEdit");
      const id = popup.dataset.id;

      const plat = normalizePlateFE(document.getElementById('editNoKendaraan').value);
      if (!plat) {
        alert("Format nomor kendaraan tidak valid! Contoh: AB 1234 CD");
        return;
      }

      const body = {
        noKendaraan: plat,
        tahunKendaraan: Number(document.getElementById('editTahunKendaraan').value),
        merekKendaraan: document.getElementById('editMerekKendaraan').value,
        warnaKendaraan: document.getElementById('editWarnaKendaraan').value,
      };

      try {
        await updateKendaraan(id, body);
        showToast("Berhasil mengupdate data kendaraan!", "success");

        document.getElementById('popupEdit').style.display = 'none';

        await this.loadKendaraan();
        this.applyFilter();
      } catch (err) {
        showToast("Gagal mengupdate area!", "error");
      }
    };
  },

 

  // ------------------------- DELETE -------------------------
  initDelete() {
    document.addEventListener("click", async (e) => {
      const btn = e.target.closest(".deleteKendaraan");
      if (!btn) return;

      const row = btn.closest("tr");
      const id = row.dataset.id;

      if (!confirm("Yakin hapus kendaraan ini?")) return;

      try {
        await deleteKendaraan(id);
        showToast("Berhasil dihapus!");
        await this.loadKendaraan();
      } catch (err) {
        showToast("Gagal menghapus:\n" + err.message);
      }
    });
  },
};

export default DataKendaraanPresenter;
