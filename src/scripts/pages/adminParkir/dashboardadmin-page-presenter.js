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
      this.loadGaugeChartParkir(),
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




async loadGaugeChartParkir() {
  const [{ data: scanLog }, areaParkir] = await Promise.all([
    getAllScanLog(),
    getAllAreaParkir()
  ]);

  // 1. Hitung kendaraan aktif
  const parkirAktif = scanLog.filter(item => !item.waktuKeluar).length;

  // 2. Hitung total kapasitas parkir (SUM)
  const totalKapasitas = areaParkir.data.reduce(
    (total, area) => total + Number(area.kapasitasTotal),
    0
  );

  // 3. Hitung persentase (aman)
  const persen = totalKapasitas
    ? Math.round((parkirAktif / totalKapasitas) * 100)
    : 0;

  this.view.renderGaugeChart({
    parkirAktif,
    kapasitas: totalKapasitas,
    persen
  });
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
