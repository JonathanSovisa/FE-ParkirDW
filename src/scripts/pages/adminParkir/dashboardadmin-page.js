import '../../../components/headeradmin.js';
import '../../../components/sidebaradmin.js';

export default class dashboardadmin {
  async render() {
    return `
      <header-admin></header-admin>
      <div class="dashboard-container">
        <sidebar-admin></sidebar-admin>
        <main class="dashboard-content">
          <div class="admin-profile">
            <div class="profile-box">
              <div class="initial-box">BY</div>
              <div class="profile-info">
                <h3>BAMBANG YUDIYONO</h3>
                <p>Admin Parkir UKDW Yogyakarta</p>
              </div>
            </div>
          </div>

          <div class="stats-container">
            <div class="stat-box">
              <h2>0</h2>
              <p>Mahasiswa Terdaftar</p>
            </div>
            <div class="stat-box">
              <h2>0</h2>
              <p>Admin Terdaftar</p>
            </div>
            <div class="stat-box">
              <h2>0</h2>
              <p>Kendaraan Terdaftar</p>
            </div>
            <div class="stat-box">
              <h2>500</h2>
              <p>Kapasitas Tersedia</p>
            </div>
          </div>
        </main>
      </div>
    `;
  }

  async afterRender() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        alert('Kamu telah logout!');
        // tambahkan redirect atau proses logout di sini
      });
    }
  }
}
