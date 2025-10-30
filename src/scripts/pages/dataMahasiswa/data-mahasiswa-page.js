import '../../../components/headerdatamhs.js';


export default class datamhs {
  async render() {
    return `
    
 <header-datamhs></header-datamhs>
   
      <section class="student-container">
        <div class="profile-section">
          <div class="profile-box">
            <div class="initial-box">JS</div>
            <div class="profile-info">
              <h2 class="name">JONATHAN SOVISA</h2>
              <p class="status">Mahasiswa Aktif UKDW Jogja</p>
            </div>
          </div>

          <div class="qr-section">
            <img src="./images/qr-example.png" alt="QR Code" class="qr-img" />
            <p class="qr-name">Jonathan Sovisa<br>Generate: 11 Juli 2025</p>
            <p class="qr-link" id="lihatBarcode">Lihat Barcode</p>
          </div>
        </div>

        

           <!-- AREA PARKIR -->
<div class="parking-section">
  <h3>AREA PARKIR TERSEDIA</h3>

  <div class="parking-grid">
    <div class="parking-row">
      <div class="parking-slot">
        <div class="slot-label">A1</div>
        <div class="slot-value">15</div>
      </div>
      <div class="parking-slot">
        <div class="slot-label">A2</div>
        <div class="slot-value">15</div>
      </div>
      <div class="parking-slot">
        <div class="slot-label">A3</div>
        <div class="slot-value">15</div>
      </div>
      <div class="parking-slot">
        <div class="slot-label">A4</div>
        <div class="slot-value">15</div>
      </div>
      <div class="parking-slot">
        <div class="slot-label">A5</div>
        <div class="slot-value">10</div>
      </div>
      <div class="parking-slot">
        <div class="slot-label">A6</div>
        <div class="slot-value">10</div>
      </div>
      <div class="parking-slot">
        <div class="slot-label">A7</div>
        <div class="slot-value">10</div>
      </div>
      <div class="parking-slot">
        <div class="slot-label">A8</div>
        <div class="slot-value">10</div>
      </div>
    </div>

    <div class="parking-row">
      <div class="parking-slot">
        <div class="slot-label">B1</div>
        <div class="slot-value">10</div>
      </div>
      <div class="parking-slot">
        <div class="slot-label">B2</div>
        <div class="slot-value">10</div>
      </div>
      <div class="parking-slot">
        <div class="slot-label">B3</div>
        <div class="slot-value">10</div>
      </div>
      <div class="parking-slot">
        <div class="slot-label">B4</div>
        <div class="slot-value">10</div>
      </div>
      <div class="parking-slot">
        <div class="slot-label">B5</div>
        <div class="slot-value">10</div>
      </div>
      <div class="parking-slot">
        <div class="slot-label">B6</div>
        <div class="slot-value">10</div>
      </div>
      <div class="parking-slot">
        <div class="slot-label">B7</div>
        <div class="slot-value">10</div>
      </div>
      <div class="parking-slot">
        <div class="slot-label">B8</div>
        <div class="slot-value">10</div>
      </div>
    </div>

    <div class="parking-row">
      <div class="parking-slot">
        <div class="slot-label">C1</div>
        <div class="slot-value">10</div>
      </div>
      <div class="parking-slot">
        <div class="slot-label">C2</div>
        <div class="slot-value">10</div>
      </div>
      <div class="parking-slot">
        <div class="slot-label">C3</div>
        <div class="slot-value">10</div>
      </div>
      <div class="parking-slot">
        <div class="slot-label">C4</div>
        <div class="slot-value">10</div>
      </div>
      <div class="parking-slot">
        <div class="slot-label">C5</div>
        <div class="slot-value">10</div>
      </div>
      <div class="parking-slot">
        <div class="slot-label">C6</div>
        <div class="slot-value">10</div>
      </div>
      <div class="parking-slot">
        <div class="slot-label">C7</div>
        <div class="slot-value">10</div>
      </div>
      <div class="parking-slot">
        <div class="slot-label">C8</div>
        <div class="slot-value">10</div>
      </div>
    </div>

  </div>
</div>
      </section>



      <!-- QR Popup -->
 <div class="qr-popup-overlay" id="qrPopup">
   <div class="qr-popup-box">
     <img src="./images/qr-example.png" alt="QR Code" class="qr-popup-img" />
     <div class="barcode-text">AB 2056 MQ</div>
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

    // klik slot
    parkingSlots.forEach(slot => {
      slot.addEventListener('click', () => {
        const label = slot.querySelector('.slot-label').textContent;
        const capacity = slot.querySelector('.slot-value').textContent;

        selectedSlot = label;
        popupMessage.innerHTML = `
          Apakah kamu ingin parkir di <strong>${label}</strong>?<br>
          Kapasitas tersedia: <strong>${capacity}</strong> kendaraan.
          `;
        parkingPopup.style.display = 'flex';
      });
    });

    // tombol batal
    cancelBtn.addEventListener('click', () => {
      parkingPopup.style.display = 'none';
      selectedSlot = null;
    });

    // tombol konfirmasi
    confirmBtn.addEventListener('click', () => {
      alert(`Kamu memilih parkir di slot ${selectedSlot}! 🚗`);
      parkingPopup.style.display = 'none';
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
