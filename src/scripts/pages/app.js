import routes from '../routes/routes';
import { getActiveRoute } from '../routes/url-parser';

class App {
  #content = null;
  #drawerButton = null;
  #navigationDrawer = null;

  constructor({ navigationDrawer, drawerButton, content }) {
    this.#content = content;
    this.#drawerButton = drawerButton;
    this.#navigationDrawer = navigationDrawer;

    this._setupDrawer();
  }

  _setupDrawer() {
    // 🔹 Toggle drawer ketika tombol ditekan
    this.#drawerButton?.addEventListener('click', () => {
      this.#navigationDrawer?.classList.toggle('open');
    });

    // 🔹 Tutup drawer saat salah satu link diklik
    document.body.addEventListener('click', (event) => {
      if (!this.#navigationDrawer) return;

      this.#navigationDrawer.querySelectorAll('a').forEach((link) => {
        if (link.contains(event.target)) {
          this.#navigationDrawer.classList.remove('open');
        }
      });
    });
  }

  async renderPage() {
    const url = getActiveRoute();
    const page = routes[url];

    this.#content.innerHTML = await page.render();
    await page.afterRender();

    // 🔹 Update link aktif setiap kali halaman berubah
    this._updateActiveLink(url);
  }

  _updateActiveLink(url) {
    // Cari semua link sidebar
    const links = document.querySelectorAll('.sidebar-menu a');

    links.forEach((link) => {
      const href = link.getAttribute('href');

      // Bandingkan href dengan route aktif
      if (href === `#${url}` || href === `#/${url}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
}

export default App;
