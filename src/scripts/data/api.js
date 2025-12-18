import CONFIG from '../config';

const ENDPOINTS = {
  LOGINMHS: `${CONFIG.BASE_URL}/mahasiswa/login`,
  LOGINADMIN: `${CONFIG.BASE_URL}/admin/login`,
  GETADMIN: `${CONFIG.BASE_URL}/admin`,
  REGISTER: `${CONFIG.BASE_URL}/mahasiswa`,
  GETMAHASISWA: `${CONFIG.BASE_URL}/mahasiswa`,
  PRODI: `${CONFIG.BASE_URL}/programstudi`,
  KENDARAAN: `${CONFIG.BASE_URL}/kendaraan`,
  AREAPARKIR: `${CONFIG.BASE_URL}/areaparkir`,
  SCAN: `${CONFIG.BASE_URL}/scan`,
};

// LOGIN MAHASISWA
export async function loginMahasiswa({ NIM, password }) {
  const response = await fetch(ENDPOINTS.LOGINMHS, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ NIM, password }),
  });

  if (!response.ok) {
    throw new Error('NIM atau password salah');
  }

  return response.json(); 
}

// LOGIN ADMIN
export async function loginAdmin({ email, password }) {
  const res = await fetch(ENDPOINTS.LOGINADMIN, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  if (!res.ok) throw new Error('Admin ID atau password salah');
  return res.json();
}




// POST – REGISTER MAHASISWA AWAL
export async function registerMahasiswa(mahasiswaData) {
  const response = await fetch(ENDPOINTS.REGISTER, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(mahasiswaData),
  });

  if (!response.ok) {
    throw new Error('Gagal register mahasiswa');
  }

  return response.json();
}



// ------------------------------- API MAHASISWA GET, CREATE, UPDATE, DELETE -------------------------------------

export async function getMahasiswaCount() {
  const res = await fetch(ENDPOINTS.GETMAHASISWA);
  if (!res.ok) throw new Error("Gagal mengambil data mahasiswa");

  const json = await res.json();
  return Array.isArray(json.data) ? json.data.length : 0;
}

// POST – REGISTER KENDARAAN MAHASISWA AWAL
export async function registerKendaraan(data) {
  const response = await fetch(ENDPOINTS.KENDARAAN, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Gagal mendaftarkan kendaraan');
  }

  return response.json();
}


// GET – ambil semua program studi untuk form login
export async function getProgramStudi() {
  const response = await fetch(ENDPOINTS.PRODI);

  if (!response.ok) {
    throw new Error('Gagal mengambil data Program Studi');
  }

  return response.json(); 
}



// ------------------------- API KENDARAAN - GET, UPDATE, DELETE --------------------------------------

// GET - Ambil kendaraan berdasarkan NIM UNTUK menampilkan Barcode
export async function getKendaraanByNIM(nim) {
  const response = await fetch(`${ENDPOINTS.KENDARAAN}/nim/${nim}`);

  if (!response.ok) {
    throw new Error('Gagal mengambil data kendaraan');
  }

  return response.json();  
}



// ------------------------- API AREA PARKIR - GET, UPDATE, DELETE --------------------------------------

// AREA PARKIR — GET ALL
export async function getAllAreaParkir() {
  const response = await fetch(ENDPOINTS.AREAPARKIR);

  if (!response.ok) {
    throw new Error('Gagal mengambil data Area Parkir');
  }

  return response.json();
}


// AREA PARKIR — UPDATE
export async function updateAreaParkir(id, body) {
  const response = await fetch(`${ENDPOINTS.AREAPARKIR}/${id}`, {
    method: 'PATCH', 
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error('Gagal update Area Parkir');
  }

  return response.json();
}

// AREA PARKIR — DELETE
export async function deleteAreaParkir(id) {
  const response = await fetch(`${ENDPOINTS.AREAPARKIR}/${id}`, {
    method: 'DELETE'
  });

  if (!response.ok) {
    throw new Error('Gagal menghapus Area Parkir');
  }

  return response.json();
}




// ------------------------- API LOG SCAN - GET --------------------------------------

export const getAllScanLog = async () => {
  const response = await fetch(ENDPOINTS.SCAN);
  return response.json();
};


// ------------------------- API DATA KENDARAAN MAHASISWA - GET, UPDATE, DELETE --------------------------------------

export async function getAllKendaraan() {
  const response = await fetch(ENDPOINTS.KENDARAAN);

  if (!response.ok) {
    throw new Error('Gagal mengambil data kendaraan');
  }

  return response.json();
}

// UPDATE (PATCH) – Update data kendaraan
export async function updateKendaraan(id, body) {
  const response = await fetch(`${ENDPOINTS.KENDARAAN}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) throw new Error("Gagal update kendaraan");

  return response.json();
}

// DELETE – Hapus kendaraan
export async function deleteKendaraan(id) {
  const response = await fetch(`${ENDPOINTS.KENDARAAN}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) throw new Error("Gagal menghapus kendaraan");

  return response.json();
}



// ----------------------- API ADMIN GET -------------------------

export async function getAdminCount() {
  const res = await fetch(ENDPOINTS.GETADMIN);
  if (!res.ok) throw new Error("Gagal mengambil data admin");

  const json = await res.json();
  return Array.isArray(json.data) ? json.data.length : 0;
}


// ------------------------- API SCAN IN / OUT --------------------------------------

// SCAN MASUK
export async function scanIn(noKendaraan, ID_Area) {
  const response = await fetch(`${ENDPOINTS.SCAN}/in`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ noKendaraan, ID_Area }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Gagal scan masuk");
  }

  return result.data;
}

// SCAN KELUAR
export async function scanOut(noKendaraan) {
  const response = await fetch(`${ENDPOINTS.SCAN}/out`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ noKendaraan }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Gagal scan keluar");
  }

  return result.data;
}



