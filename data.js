// Data Website Kelas Hukum Keluarga Islam (HKI 2022)
const INITIAL_DATA = {
  classInfo: {
    title: "Class of HKI 2022",
    subtitle: "Hukum Keluarga Islam • Fakultas Hukum & Syariah",
    university: "Universitas Islam Negeri",
    motto: "Fiat Justitia Ruat Caelum — Menegakkan Keadilan, Mengukir Kenangan HKI",
    stats: {
      totalStudents: 38,
      totalMemories: 142,
      sksCompleted: 144,
      togetherYears: 4
    }
  },
  lawQuotes: [
    {
      article: "Pasal 1 Ayat (1) Versi HKI",
      content: "Hak atas Kenangan & Persahabatan Kelas bersifat mutlak, tidak dapat disanggah oleh waktu, dan dilindungi oleh ikatan almamater seumur hidup."
    },
    {
      article: "Pasal 1 Kompilasi Hukum Islam (KHI)",
      content: "Perkawinan adalah ikatan akad yang sangat kuat atau mīṡāqan galīẓan untuk menaati perintah Allah dan melaksanakannya merupakan ibadah."
    },
    {
      article: "Asas Kebersamaan HKI",
      content: "In Dubio Pro Amicitia — Dalam keraguan, utamakan persahabatan, kekeluargaan, dan rasa saling melengkapi."
    },
    {
      article: "Pasal 2 Ayat (3) Versi HKI",
      content: "Barangsiapa melupakan momen makrab dan begadang revisi skripsi, diancam dengan pidana rindu seberat-beratnya."
    }
  ],
  // 18 Akun Pengguna Terdaftar (user1 s.d. user18, Password awal: 112233)
  users: [
    { id: "usr-1", username: "user1", name: "Muhammad Ridwan Ismail", email: "user1@hki.com", password: "112233", role: "Super Admin" },
    { id: "usr-2", username: "user2", name: "Aceng Usman", email: "user2@hki.com", password: "112233", role: "Anggota" },
    { id: "usr-3", username: "user3", name: "Ade Ahmad Satibi", email: "user3@hki.com", password: "112233", role: "Anggota" },
