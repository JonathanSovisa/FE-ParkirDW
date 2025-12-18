class headeradmin extends HTMLElement {
  connectedCallback() {
    const nama = localStorage.getItem("NAMA") || "ADMIN";

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
            <span class="user-name">${nama}</span>

            <div class="dropdown-toggle" id="dropdownToggle">⋮</div>

            <div class="dropdown-menu" id="dropdownMenu">
              <button id="logoutBtn">
                <i class="fas fa-sign-out-alt"></i> Logout
              </button>
            </div>
          </div>
        </div>
      </header>
    `;

    this.initEvents();
  }

  initEvents() {
    const toggle = this.querySelector("#dropdownToggle");
    const menu = this.querySelector("#dropdownMenu");
    const logoutBtn = this.querySelector("#logoutBtn");

    // buka/tutup dropdown
    toggle.addEventListener("click", () => {
      menu.classList.toggle("show");
    });

    // logout
    logoutBtn.addEventListener("click", () => {
      localStorage.clear();
      alert("Kamu telah logout!");
      window.location.hash = "/login";
    });

    // klik di luar nutup dropdown
    document.addEventListener("click", (e) => {
      if (!this.contains(e.target)) {
        menu.classList.remove("show");
      }
    });
  }
}

customElements.define("header-admin", headeradmin);
