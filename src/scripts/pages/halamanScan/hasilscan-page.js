import '../../../components/headerumum.js';

export default class hasilscan {
  async render() {
    // status bisa kamu ubah ke: 'in-success', 'in-fail', 'out-success', 'out-fail'
    const status = 'in-success'; 

    // variabel tampilan
    let icon = '';
    let message = '';
    let tanggal = '';
    let jam = '';
    let color = '';

    if (status === 'in-success') {
      icon = '<img src="./images/check-icon.png" alt="Success" class="icon">';
      message = 'Sukses Scan In, Silahkan Masuk';
      tanggal = '14 Juli 2025';
      jam = '07.15';
      color = 'success';
    } else if (status === 'in-fail') {
      icon = '<img src="./images/fail-icon.png" alt="Failed" class="icon">';
      message = 'Gagal Scan In, Coba Lagi';
      tanggal = 'Error';
      jam = 'Error';
      color = 'fail';
    } else if (status === 'out-success') {
      icon = '<img src="./images/check-icon.png" alt="Success" class="icon">';
      message = 'Sukses Scan Out, Silahkan Keluar';
      tanggal = '14 Juli 2025';
      jam = '18.10';
      color = 'success';
    } else if (status === 'out-fail') {
      icon = '<img src="./images/fail-icon.png" alt="Failed" class="icon">';
      message = 'Gagal Scan Out, Coba Lagi';
      tanggal = 'Error';
      jam = 'Error';
      color = 'fail';
    }

    return `
      <header-umum></header-umum>

      <div class="hasilscan-container ${color}">
        <div class="card-scan">
          <div class="user-info">
            <h2>AB 2056 MQ</h2>
            <p>JONATHAN SOVISA</p>
            <p>Mahasiswa Aktif UKDW</p>
          </div>

          <div class="scan-result">
            ${icon}
            <p class="message">${message}</p>
          </div>

          <div class="detail-info">
            <p><strong>Waktu:</strong> ${tanggal} ${jam} </p>
          </div>

          <footer class="footer-scan">
            <p>PARKIRDW – Universitas Kristen Duta Wacana</p>
            <p>Jl. dr. Wahidin Sudirohusodo No. 5–25, Yogyakarta</p>
          </footer>
        </div>
      </div>
    `;
  }

  async afterRender() {
    // nanti bisa diisi untuk logic scan QR atau status dari API
  }
}
