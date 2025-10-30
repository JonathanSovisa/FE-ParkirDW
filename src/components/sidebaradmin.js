class sidebaradmin extends HTMLElement {
  connectedCallback() {
    this.innerHTML = ` 
 
     <aside class="sidebar-admin">
        <nav class="sidebar-menu">
          <ul>
            <li><a href="#/dashboardadmin" class="active">Dashboard</a></li>
            <li><a href="#/datakendaraan">Data Kendaraan Mahasiswa</a></li>
            <li><a href="#/logmasuk">Log Transaksi Masuk</a></li>
            <li><a href="#/logkeluar">Log Transaksi Keluar</a></li>
          </ul>
        </nav>
      </aside>

            `;
  }
}


customElements.define('sidebar-admin', sidebaradmin);
