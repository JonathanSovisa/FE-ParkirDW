import '../../../components/headerlanding.js';
import LoginPresenter from './login-page-presenter.js';

export default class login {
  async render() {
    return `

    <header-landing></header-landing>
      <section class="login-container">
        <h1 class="title">Login Here,<br><span class="subtitle">ParkirDW!</span></h1>
        
        <form id="loginForm" class="login-form">
          <label for="nim">NIM</label>
          <input type="text" id="nim" name="nim" placeholder="Enter your NIM here" required />

          <label for="password">Password</label>
          <input type="password" id="password" name="password" placeholder="Enter your Password here" required />

          <button type="submit" class="login-button">Login</button>
        </form>
      </section>
    `;
  }

  async afterRender() {
    const form = document.getElementById('loginForm');
    form.addEventListener('submit', LoginPresenter.handleLogin);
  }
}
