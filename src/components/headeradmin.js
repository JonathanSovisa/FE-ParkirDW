class headeradmin extends HTMLElement {
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

        <div class="user-card">
            <img src="./images/profil-jonathan.png" alt="Foto Profil" class="user-photo" />
            <span class="user-name">Bambang Yudiyono</span>
        
             <div class="dropdown-toggle">⋮</div>

            <!-- Dropdown Menu (disembunyikan dulu) -->
             <div class="dropdown-menu" id="dropdownMenu">
                <button id="profileBtn">
                    <i class="fas fa-user"></i> Profile
                </button>
                <button id="logoutBtn">
                    <i class="fas fa-sign-out-alt"></i> Logout
                </button>
            </div>
        </div>
        </header>
        `;
  }
}


customElements.define('header-admin', headeradmin);
