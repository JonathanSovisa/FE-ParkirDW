import '../../../components/headerdatamhs.js';
import DataMahasiswaPresenter from './data-mahasiswa-page-presenter.js';


export default class datamhs {
  async render() {
    return `
    
 <header-datamhs></header-datamhs>
   
      <section class="student-container">
        <div class="profile-section">
          <div class="profile-box">
            <div class="initial-box"></div>
            <div class="profile-info">
              <h2 class="name"></h2>
              <p class="status"></p>
            </div>
          </div>

          <div class="qr-section">
            <img src="" alt="QR Code" class="qr-img" />
            <p class="qr-name"></p>
            <p class="qr-link" id="lihatBarcode">Lihat Barcode</p>
          </div>
        </div>

           <!-- AREA PARKIR -->
      <section class="parking-section">
        <h3>AREA PARKIR TERSEDIA</h3>
        <div class="parking-grid" id="parkingGrid"></div>
      </section>
 
      <!-- QR Popup -->
 <div class="qr-popup-overlay" id="qrPopup">
   <div class="qr-popup-box">
     <img src="" alt="QR Code" class="qr-popup-img" />
     <div class="barcode-text"></div>
     <div class="npp-text">(Mahasiswa Aktif UKDW)</div>
     <button id="closeQrBtn" class="btn-close">Kembali</button>
   </div>
 </div>


 <!-- POPUP KONFIRMASI PARKIR -->
<div class="popup-overlay" id="parkingPopup">
  <div class="popup-box">
    <h3>Konfirmasi Parkir</h3>
    <p id="popupMessage"></p>
    <div class="popup-buttons">
      <button id="confirmParkBtn" class="btn-confirm">Ya, Parkir</button>
      <button id="cancelParkBtn" class="btn-cancel">Batal</button>
    </div>
  </div>
</div>
    `;
  }

  async afterRender() {

    await DataMahasiswaPresenter.init();


    //Tombol Edit
    document.querySelectorAll('.fa-pen').forEach(btn =>
      btn.addEventListener('click', () => alert('Kamu menekan tombol Edit!'))
    );

    //Tombol Save
    document.querySelectorAll('.fa-file').forEach(btn =>
      btn.addEventListener('click', () => alert('Kamu menekan tombol Save!'))
    );

    //QR Pop Up
    const qrPopup = document.getElementById('qrPopup');
    const lihatBarcode = document.getElementById('lihatBarcode');
    const closeQrBtn = document.getElementById('closeQrBtn');

    //Lihat Barcode
    lihatBarcode.addEventListener('click', () => {
      qrPopup.style.display = 'flex';
    });

    //Close QR Button
    closeQrBtn.addEventListener('click', () => {
      qrPopup.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
      if (e.target === qrPopup) {
        qrPopup.style.display = 'none';
      }
    });


    const toggleBtn = document.querySelector('.dropdown-toggle');
    const menu = document.getElementById('dropdownMenu');
    toggleBtn.addEventListener('click', () => {
      menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    });


    // === POPUP KONFIRMASI PARKIR ===
    const parkingSlots = document.querySelectorAll('.parking-slot');
    const parkingPopup = document.getElementById('parkingPopup');
    const popupMessage = document.getElementById('popupMessage');
    const confirmBtn = document.getElementById('confirmParkBtn');
    const cancelBtn = document.getElementById('cancelParkBtn');

    let selectedSlot = null;

 

    // tombol batal
    cancelBtn.addEventListener('click', () => {
      parkingPopup.style.display = 'none';
      selectedSlot = null;
    });


    // klik di luar popup
    window.addEventListener('click', (e) => {
      if (e.target === parkingPopup) {
        parkingPopup.style.display = 'none';
      }
    });


    document.getElementById('logoutBtn').addEventListener('click', () => {
      alert('Kamu telah logout!');
      // tambahkan redirect atau proses logout sebenarnya di sini
    });







  }
}
