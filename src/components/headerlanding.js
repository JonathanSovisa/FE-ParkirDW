class headerlanding extends HTMLElement {
  connectedCallback() {
    this.innerHTML = ` 
      <header>
        <div class="main-header container">
          <!-- BRAND -->
          <div class="brand">
            <img src="./images/logo-ukdw.png" alt="Logo UKDW" class="logo">
            <div class="brand-text">
              <h1>PARKIRDW</h1>
              <h4 style="color:#fff; font-size:13px;">
                UNIVERSITAS KRISTEN DUTA WACANA
              </h4>
            </div>
          </div>

          <!-- NAVIGATION -->
          <nav id="navigation-drawer" class="navigation-drawer">
            <ul class="nav-list">
              <li><a href="#">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#caraakses">Cara Akses</a></li>
              <li><a href="#/signup">Registrasi</a></li>
            </ul>
          </nav>

          <!-- DRAWER BUTTON -->
          <button id="drawer-button" class="drawer-button">☰</button>
        </div>

        <!-- BREADCRUMB -->
        <nav class="breadcrumb">
          
        </nav>
      </header>
    `;

    this._initDrawer();
    this._renderBreadcrumb();

    window.addEventListener("hashchange", () => {
      this._renderBreadcrumb();
    });
  }

  /* =========================
     DRAWER MOBILE
  ========================= */
  _initDrawer() {
    const drawer = this.querySelector("#navigation-drawer");
    const button = this.querySelector("#drawer-button");

    button.addEventListener("click", () => {
      drawer.classList.toggle("open");
    });

    drawer.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        drawer.classList.remove("open");
      });
    });
  }

  /* =========================
     BREADCRUMB SPA
  ========================= */
  _renderBreadcrumb() {
    const list = this.querySelector("#breadcrumbList");
    const breadcrumbNav = this.querySelector(".breadcrumb");
    if (!list || !breadcrumbNav) return;

    const hash = window.location.hash || "#/";
    list.innerHTML = "";

    // Sembunyikan di landing page
    if (hash === "#/" || hash === "") {
      breadcrumbNav.style.display = "none";
      return;
    }

    breadcrumbNav.style.display = "block";

    // Mapping nama halaman
    const map = {
      "#/signup": "Register",
      "#/login": "Login",
      "#/admin": "Admin",
      "#/admin/dashboard": "Dashboard",
      "#/admin/area": "Area Parkir",
      "#/admin/kendaraan": "Data Kendaraan",
    };

    // Home selalu tampil
    list.innerHTML += `<li><a href="#/">Home</a></li>`;

    const parts = hash.replace("#", "").split("/").filter(Boolean);
    let path = "";

    parts.forEach((part, index) => {
      path += "/" + part;
      const fullHash = "#" + path;
      const label = map[fullHash] || part;

      if (index === parts.length - 1) {
        list.innerHTML += `<li>${label}</li>`;
      } else {
        list.innerHTML += `<li><a href="${fullHash}">${label}</a></li>`;
      }
    });
  }
}

customElements.define("header-landing", headerlanding);
