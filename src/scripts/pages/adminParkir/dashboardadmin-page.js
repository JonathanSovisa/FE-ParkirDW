import '../../../components/headeradmin.js';
import '../../../components/sidebaradmin.js';
import Chart from 'chart.js/auto';
import DashboardAdminPresenter from './dashboardadmin-page-presenter.js';

let chartJamInstance = null;
let chartPlatInstance = null;

export default class DashboardAdminPage {
  async render() {
    return `
      <header-admin></header-admin>
      <div class="dashboard-container">
        <sidebar-admin></sidebar-admin>

        <main class="dashboard-content">

          <div class="admin-profile">
            <div class="profile-box">
              <div class="initial-box" id="adminInitial"></div>
              <div class="profile-info">
                <h3 id="adminName"></h3>
                <p>Admin Parkir UKDW Yogyakarta</p>
              </div>
            </div>
          </div>

          <div class="stats-container">
            <div class="stat-box">
              <h2 id="statMahasiswa">0</h2>
              <p>Mahasiswa Terdaftar</p>
            </div>
            <div class="stat-box">
              <h2 id="statAdmin">0</h2>
              <p>Admin Terdaftar</p>
            </div>
            <div class="stat-box">
              <h2 id="statKendaraan">0</h2>
              <p>Kendaraan Terdaftar</p>
            </div>
            <div class="stat-box">
              <h2 id="statKapasitas">0</h2>
              <p>Kapasitas Tersedia</p>
            </div>
          </div>

          <div class="charts-row">

            <section class="table-section">
              <h3>Akumulasi Prodi</h3>
              <table class="scan-table">
                <thead>
                  <tr>
                    <th>Program Studi</th>
                    <th>Jumlah Parkir</th>
                  </tr>
                </thead>
                <tbody id="prodiTableBody"></tbody>
              </table>
            </section>

            <section class="table-section">
              <h3>Aktivitas Scan Hari Ini</h3>
              <table class="scan-table">
                <thead>
                  <tr>
                    <th>NIM</th>
                    <th>Prodi</th>
                    <th>Masuk</th>
                    <th>Keluar</th>
                    <th>Area</th>
                  </tr>
                </thead>
                <tbody id="scanTableBody"></tbody>
              </table>
            </section>

             <section class="chart-section">
              <h3>Kondisi Parkir B2 Saat Ini</h3>

              <div class="parkir-gauge">
                <div class="progress">
                  <div class="progress-bar" id="parkirGauge"></div>
                </div>
                <p id="parkirText"></p>
              </div>

            </section>

            <section class="chart-section chart-plat-small">
              <h3>Plat Kendaraan</h3>
              <canvas id="chartPlat"></canvas>
            </section>

            
          </div>

          <div class="charts-row">
            
          </div>

        </main>
      </div>
    `;
  }

async afterRender() {
  const nama = localStorage.getItem('NAMA');
  this.setAdminProfile(nama || "ADMIN");

  this.presenter = new DashboardAdminPresenter(this);
  await this.presenter.init();
}



  setAdminProfile(fullName) {
  const nameEl = document.getElementById("adminName");
  const initialEl = document.getElementById("adminInitial");

  if (!nameEl || !initialEl) return;

  nameEl.textContent = fullName.toUpperCase();

  const initials = fullName
    .split(" ")
    .filter(n => n.length > 0)
    .map(n => n[0])
    .join("")
    .toUpperCase();

  initialEl.textContent = initials;
}


formatTime(value) {
  if (!value) return "-";   // 🔥 PENTING

  const d = new Date(value);
  if (isNaN(d.getTime())) return "-";

  return d.toLocaleTimeString("id-ID", {
    timeZone: "Asia/Jakarta",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
}



  // ===== RENDER UI =====

renderChartJam(data) {
  if (chartJamInstance) chartJamInstance.destroy();

  chartJamInstance = new Chart(document.getElementById("chartJam"), {
    type: "bar",
    data: {
      labels: Object.keys(data),
      datasets: [{
        label: "Jumlah Kedatangan",
        data: Object.values(data),
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          suggestedMax: Math.max(...Object.values(data)) + 1
        }
      }
    }
  });
}


  renderChartPlat(data) {
    if (chartPlatInstance) chartPlatInstance.destroy();

    chartPlatInstance = new Chart(document.getElementById("chartPlat"), {
      type: "pie",
      data: {
        labels: Object.keys(data),
        datasets: [{ data: Object.values(data) }]
      }
    });
  }

  renderProdiTable(data) {
    const tbody = document.getElementById("prodiTableBody");
    tbody.innerHTML = data.map(d => `
      <tr>
        <td>${d.namaProdi}</td>
        <td>${d.total}</td>
      </tr>
    `).join("");
  }

renderScanTable(data) {
  const tbody = document.getElementById("scanTableBody");

  tbody.innerHTML = data.map(d => `
    <tr>
      <td>${d.NIM}</td>
      <td>${d.namaProdi}</td>
      <td>${this.formatTime(d.waktuMasuk)}</td>
      <td>${d.waktuKeluar ? this.formatTime(d.waktuKeluar) : "-"}</td>
      <td>${d.namaArea}</td>
    </tr>
  `).join("");
}


renderGaugeChart({ parkirAktif, kapasitas, persen }) {
  const bar = document.getElementById('parkirGauge');
  const text = document.getElementById('parkirText');

  bar.style.width = `${persen}%`;

  if (persen < 60) bar.style.backgroundColor = '#22c55e';
  else if (persen < 85) bar.style.backgroundColor = '#facc15';
  else bar.style.backgroundColor = '#ef4444';

  text.innerText = `${parkirAktif} / ${kapasitas} kendaraan (${persen}%)`;
}



  updateMahasiswaStat(v) { document.getElementById("statMahasiswa").textContent = v; }
  updateAdminStat(v) { document.getElementById("statAdmin").textContent = v; }
  updateKendaraanStat(v) { document.getElementById("statKendaraan").textContent = v; }
  updateKapasitasStat(v) { document.getElementById("statKapasitas").textContent = v; }
}
