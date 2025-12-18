import '../../../components/headerlanding.js';
import SignUpKendaraanPresenter from './daftarKendaraan-page-presenter.js';

export default class signUpKendaraan {
  async render() {
    return `
      <header-landing></header-landing>

      <section class="signup-container">
        <h1 class="title">Daftarkan Kendaraan Anda</h1>

        <form id="kendaraanForm" class="signup-form">

          <label for="noKendaraan">Nomor Kendaraan</label>
          <input type="text" id="noKendaraan" name="noKendaraan" placeholder="Contoh: AB 1234 CD" required />

          <label for="tahunKendaraan">Tahun Kendaraan</label>
          <input type="number" id="tahunKendaraan" name="tahunKendaraan" placeholder="2020" required />

          <label for="merekKendaraan">Merek Kendaraan</label>
          <input type="text" id="merekKendaraan" name="merekKendaraan" placeholder="Honda / Yamaha / Suzuki" required />

          <label for="warnaKendaraan">Warna Kendaraan</label>
          <input type="text" id="warnaKendaraan" name="warnaKendaraan" placeholder="Hitam / Merah / Biru" required />

          <button type="submit" class="signup-button">Daftarkan Kendaraan</button>
        </form>
      </section>
    `;
  }

  async afterRender() {
    const form = document.getElementById('kendaraanForm');
    form.addEventListener('submit', SignUpKendaraanPresenter.handleSubmit);
  }
}
