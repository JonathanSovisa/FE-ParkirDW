import landingPage from '../pages/landingPage/landing-page.js';
import signUp from '../pages/signup/signup-page.js';
import signUpKendaraan from '../pages/signup/daftarKendaraan-page.js';
import login from '../pages/login/login-page.js';
import datamhs from '../pages/dataMahasiswa/data-mahasiswa-page.js';
import dashboardadmin from '../pages/adminParkir/dashboardadmin-page.js';
import datakendaraan from '../pages/adminParkir/datakendaraan-page.js';
import logtransaksi from '../pages/adminParkir/logtransaksi-page.js';
import scanMasuk from '../pages/halamanScan/scanmasuk-page.js';
import scanKeluar from '../pages/halamanScan/scankeluar-page.js';
import hasilscan from '../pages/halamanScan/hasilscan-page.js';
import dataareaparkir from '../pages/adminParkir/dataareaparkir-page.js';

const routes = {
  '/': new landingPage(),
  '/signup': new signUp(),
  '/signupkendaraan': new signUpKendaraan(),

  '/login': new login(),
  '/datamhs': new datamhs(),

  '/dashboardadmin': new dashboardadmin(),
  '/datakendaraan': new datakendaraan(),
  '/dataareaparkir': new dataareaparkir(),
  '/logtransaksi': new logtransaksi(),

  '/scanmasuk': new scanMasuk(),
  '/scankeluar': new scanKeluar(),
  '/hasilscan': new hasilscan(),
};

export default routes;
