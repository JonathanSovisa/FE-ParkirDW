class headerlanding extends HTMLElement {
  connectedCallback() {
    this.innerHTML = ` 
 
 <header>
      <div class="main-header container">
       <div class="brand">
          <img src="./images/logo-ukdw.png" alt="Logo UKDW" class="logo">
          <div class="brand-text">
            <h1>PARKIRDW</h1>
            <h4 style="color: #ffffff;">UNIVERSITAS KRISTEN DUTA WACANA</h4>
          </div>
        </div>


        <nav id="navigation-drawer" class="navigation-drawer">
          <ul id="nav-list" class="nav-list">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#caraakses">Cara Akses</a></li>
            <li><a href="#/signup">Registrasi</a></li>
          </ul>
        </nav>

        <button id="drawer-button" class="drawer-button">☰</button>
      </div>
    </header>

            `;
  }
}


customElements.define('header-landing', headerlanding);
