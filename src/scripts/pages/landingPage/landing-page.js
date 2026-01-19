import '../../../components/headerlanding.js';

export default class landingPage {
  async render() {
    return `
      <header-landing>
            <nav class="breadcrumb">
  <ul id="breadcrumbList"></ul>
</nav></header-landing>

      <section id="home" class="hero-section" style="background-image: url('./images/bg-campus.jpg'); background-size: cover; background-position: center;">
        <div class="hero-overlay">
          <div class="hero-content">
            <img src="./images/logo-ukdw.png" alt="Logo UKDW" class="hero-logo" />
            <img src="./images/logo-parkirdw.png" alt="Logo ParkirDW" class="hero-logo1" />
            <h1>WELCOME TO <br><span>PARKIRDW</span></h1>
            <p>BASEMENT B2 – PARKIRAN MAHASISWA</p>
          </div>
        </div>
      </section>


      <section id="about" class="about-section">
        <div class="about-container">
          <div class="about-text">
            <h2>ABOUT</h2>
            <p>
              Sistem aplikasi berbasis website bernama “ParkirDW” dengan implementasi QR Code yang perlu didaftarkan oleh mahasiswa agar mendapatkan QR
              untuk di scan di akses masuk basement untuk mengkonfirmasi bahwa di jam berapa akan muncul identitasnya bahwa mahasiswa x dengan No. kendaraan x sudah masuk ke area basement UKDW dengan akses keluar yang perlu melakukan scan barcode.
              Begitupun juga untuk akses keluar dari basement. Sehingga, diharapkan bahwa saat aplikasi berbasis web ini dikembangkan akan mempermudah petugas parkir untuk mencari informasi kendaraan lewat sistem apabila terjadi indikasi pencurian bermotor di lingkungan kampus. 
            </p>
          </div>
          <div class="about-image">
            <img src="./images/logo-parkirdw.png" alt="Logo ParkirDW" />
          </div>
        </div>
      </section>


     <section id="caraakses" class="fitur-section">
        <div class="fitur-title">
        </div>
        <div class="fitur-container">
          <div class="fitur-item">
            <img src="./images/icon-registrasi.png" alt="Registrasi" />
            <p>Registrasi Kendaraan<br>Mahasiswa</p>
          </div>
          <div class="fitur-item">
            <img src="./images/icon-scanqr.png" alt="Scan QR" />
            <p>Scan QR Code<br>Kendaraan Terdaftar</p>
          </div>
          <div class="fitur-item">
            <img src="./images/icon-akses.png" alt="Akses Parkir" />
            <p>Akses Masuk dan Keluar<br>Parkiran B2</p>
          </div>
        </div>
      </section>


      <section id="registrasi" class="hero-section1" style="background-image: url('./images/bg-campus1.png'); background-size: cover; background-position: center;">
        <div class="hero-overlay1">
          <div class="hero-content1">
            <div class="logo-group">
              <img src="./images/logo-ukdw.png" alt="Logo UKDW" class="hero-logo" />
              <img src="./images/logo-parkirdw.png" alt="Logo ParkirDW" class="hero-logo1" />
           </div>

            <!-- Tombol Register -->
            <a href="#/signup" class="register-button">REGISTER NOW!</a>
          </div>
        </div>
      </section>



    `;
  }

  async afterRender() {
    // Do your job here
  }
}
