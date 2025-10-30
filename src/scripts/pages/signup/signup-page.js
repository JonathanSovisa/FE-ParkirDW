import '../../../components/headerlanding.js';

export default class signUp {
  async render() {
    return `
      <header-landing></header-landing>
       <section class="signup-container">
        <h1 class="title">Welcome,<br><span class="subtitle">ParkirDW!</span></h1>
        
        <form id="signupForm" class="signup-form">
          <label for="nim">NIM</label>
          <input type="text" id="nim" name="nim" placeholder="Enter your NIM here" required />

          <label for="nama">Nama Lengkap</label>
          <input type="text" id="nama" name="nama" placeholder="Enter your Nama here" required />

          <label for="jurusan">Jurusan</label>
          <input type="text" id="jurusan" name="jurusan" placeholder="Enter your Jurusan here" required />

          <label for="nopol">No. Polisi Kendaraan</label>
          <input type="text" id="nopol" name="nopol" placeholder="Enter your No. Polisi Kendaraan here" required />

          <label for="password">Password</label>
          <input type="password" id="password" name="password" placeholder="Enter your Password here" required />

          <button type="submit" class="signup-button">Create Account Here</button>
        </form>

        <p class="login-link">Already have an account? <a href="#/login">Log In</a></p>
      </section>
    `;
  }

  async afterRender() {
    // Do your job here
  }
}
