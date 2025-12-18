import '../../../components/headerlanding.js';
import SignUpPresenter from './signup-page-presenter.js';

export default class signUp {
  async render() {
    return `
      <header-landing></header-landing>
       <section class="signup-container">
        <h1 class="title">Welcome,<br><span class="subtitle">ParkirDW!</span></h1>
        
        <form id="signupForm" class="signup-form">
          <label for="nim">NIM</label>
          <input type="text" id="nim" name="nim" placeholder="Enter your NIM here" required />

          <label for="prodi">Program Studi</label>
             <select id="prodi" name="prodi" required>
            <option value="">Select your Prodi here</option>
          </select>

          <label for="nama">Nama Lengkap</label>
          <input type="text" id="nama" name="nama" placeholder="Enter your Nama here" required />

          <label for="noHP">No Handphone</label>
          <input type="text" id="noHP" name="noHP" placeholder="Enter your No. Polisi Kendaraan here" required />

          <label for="alamat">Alamat</label>
          <input type="text" id="alamat" name="alamat" placeholder="Enter your Alamat here" required />

          <label for="password">Password</label>
          <input type="text" id="password" name="password" placeholder="Enter your Password here" required />

          <button type="submit" class="signup-button">Create Account Here</button>
        </form>

        <p class="login-link">Already have an account? <a href="#/login">Log In</a></p>
      </section>
    `;
  }

  async afterRender() {
    await SignUpPresenter.loadProdi();
    const form = document.getElementById('signupForm');
    form.addEventListener('submit', SignUpPresenter.handleSubmit);
  }
}
