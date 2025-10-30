class headerumum extends HTMLElement {
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
        </header>
        `;
  }
}


customElements.define('header-umum', headerumum);
