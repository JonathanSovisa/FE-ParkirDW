import {
  getMahasiswaCount,
  getAdminCount,
  getAllAreaParkir,
  getAllKendaraan,
  getAllScanLog
} from "../../data/api.js";

// =========================
// HELPER
// =========================
const toDate = (value) => {
  if (!value) return null;
  const d = new Date(value);
  return isNaN(d.getTime()) ? null : d;
};

const getTanggalWIB = (date) =>
  date.toLocaleDateString("en-CA", { timeZone: "Asia/Jakarta" });

// =========================
// PRESENTER
// =========================
export default class DashboardAdminPresenter {
  constructor(view) {
    this.view = view;
  }

  async init() {
    await Promise.all([
      this.loadStats(),
      this.loadChartJam(),
      this.loadProdiTerbanyak(),
      this.loadChartPlat(),
      this.loadScanHariIni()
    ]);
  }

  // =========================
  // STATS
  // =========================
  async loadStats() {
    this.view.updateMahasiswaStat(await getMahasiswaCount());
    this.view.updateAdminStat(await getAdminCount());

    const kendaraan = await getAllKendaraan();
    this.view.updateKendaraanStat(kendaraan.data.length);

    const area = await getAllAreaParkir();
    const total = area.data.reduce((a, b) => a + b.kapasitasTersedia, 0);
    this.view.updateKapasitasStat(total);
  }

  // =========================
  // CHART JAM KEDATANGAN
  // =========================
  async loadChartJam() {
  const { data } = await getAllScanLog();

  const jamMap = {
    "06.00 - 10.00": 0,
    "10.00 - 14.00": 0,
    "14.00 - 18.00": 0,
    "18.00 - 22.00": 0,
  };

  data.forEach(item => {
    const date = toDate(item.waktuMasuk);
    if (!date) return;

    // ✅ AMBIL JAM WIB (INI KUNCINYA)
    const jam = Number(
      date.toLocaleString("id-ID", {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        hour12: false
      })
    );

    if (jam >= 6 && jam < 10) jamMap["06.00 - 10.00"]++;
    else if (jam >= 10 && jam < 14) jamMap["10.00 - 14.00"]++;
    else if (jam >= 14 && jam < 18) jamMap["14.00 - 18.00"]++;
    else if (jam >= 18 && jam < 22) jamMap["18.00 - 22.00"]++;
  });

  console.log("Jam Map FIX:", jamMap);
  this.view.renderChartJam(jamMap);
}

  // =========================
  // PRODI TERBANYAK
  // =========================
  async loadProdiTerbanyak() {
    const { data } = await getAllScanLog();

    const map = {};
    data.forEach(d => {
      if (!d.namaProdi) return;
      map[d.namaProdi] = (map[d.namaProdi] || 0) + 1;
    });

    const result = Object.entries(map)
      .map(([namaProdi, total]) => ({ namaProdi, total }))
      .sort((a, b) => b.total - a.total);

    this.view.renderProdiTable(result);
  }

  // =========================
  // CHART PLAT
  // =========================
  async loadChartPlat() {
    const { data } = await getAllScanLog();

    const map = {};
    data.forEach(d => {
      if (!d.noKendaraan) return;
      const kode = d.noKendaraan.split(" ")[0];
      map[kode] = (map[kode] || 0) + 1;
    });

    this.view.renderChartPlat(map);
  }

  // =========================
  // SCAN HARI INI (5 TERAKHIR)
  // =========================
  async loadScanHariIni() {
    const { data } = await getAllScanLog();

    const todayWIB = new Date().toLocaleDateString("en-CA", {
      timeZone: "Asia/Jakarta"
    });

    const filtered = data.filter(item => {
      const date = toDate(item.waktuMasuk);
      if (!date) return false;

      return getTanggalWIB(date) === todayWIB;
    });

    this.view.renderScanTable(filtered.slice(0, 5));
  }
}
