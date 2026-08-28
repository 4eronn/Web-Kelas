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
    { id: "usr-1", username: "ismail@hki.com", name: "Muhammad Ridwan Ismail", email: "Kosma", password: "112233", role: "Super Admin" },
    { id: "usr-2", username: "aceng@hki.com", name: "Aceng Usman", email: "user2@hki.com", password: "112233", role: "Anggota" },
    { id: "usr-3", username: "kibo@hki.com", name: "Ade Ahmad Satibi", email: "user3@hki.com", password: "112233", role: "Anggota" },
    { id: "usr-4", username: "agus@hki.com", name: "Agus Setiyawan", email: "user4@hki.com", password: "112233", role: "Anggota" },
    { id: "usr-5", username: "ajzi@hki.com", name: "Ajzi Manumayasya", email: "user5@hki.com", password: "112233", role: "Anggota" },
    { id: "usr-6", username: "alif@hki.com", name: "Alif Subbanul Qirom", email: "user6@hki.com", password: "112233", role: "Anggota" },
    { id: "usr-7", username: "eka@hki.com", name: "Eka Wulandari", email: "user7@hki.com", password: "112233", role: "Anggota" },
    { id: "usr-8", username: "Hasan@hki.com", name: "Hasan Basri", email: "user8@hki.com", password: "112233", role: "Anggota" },
    { id: "usr-9", username: "Abai@hki.com", name: "Muhammad Abdurachman", email: "user9@hki.com", password: "112233", role: "Anggota" },
    { id: "usr-10", username: "ridwan@hki.com", name: "Muhammad Ridwan", email: "user10@hki.com", password: "112233", role: "Anggota" },
    { id: "usr-11", username: "nurul@hki.com", name: "Nurul Zakiah Hidayat", email: "user11@hki.com", password: "112233", role: "Anggota" },
    { id: "usr-12", username: "rivaldi@hki.com", name: "Rivaldi Bagja", email: "user12@hki.com", password: "112233", role: "Anggota" },
    { id: "usr-13", username: "qia@hki.com", name: "Sidqia Rizky Awaliyah", email: "user13@hki.com", password: "112233", role: "Anggota" },
    { id: "usr-14", username: "ama@hki.com", name: "Siti Ainur Rahmah", email: "user14@hki.com", password: "112233", role: "Anggota" },
    { id: "usr-15", username: "cipa@hki.com", name: "Siti Nurasyfa", email: "user15@hki.com", password: "112233", role: "Anggota" },
    { id: "usr-16", username: "syahrul@hki.com", name: "Syahrul Amarullah", email: "user16@hki.com", password: "112233", role: "Anggota" },
    { id: "usr-17", username: "syarif@hki.com", name: "Syarif Hidayat", email: "user17@hki.com", password: "112233", role: "Anggota" }
  ],

  // Kategori: Kuliah, Kegiatan, Sidang, Lucu, Wisuda
  galleryCategories: [
    { id: "all", label: "Semua Kenangan", icon: "sparkles" },
    { id: "kuliah", label: "Kuliah", icon: "book-open" },
    { id: "kegiatan", label: "Kegiatan", icon: "compass" },
    { id: "sidang", label: "Sidang", icon: "gavel" },
    { id: "lucu", label: "Lucu", icon: "smile" },
    { id: "wisuda", label: "Wisuda", icon: "award" }
  ],

  galleryItems: [
    {
      id: "mem-1",
      title: "Praktikum Sidang Semu Pengadilan Agama HKI",
      category: "sidang",
      mediaType: "image",
      date: "14 Mei 2024",
      location: "Ruang Sidang Utama PA",
      image: "assets/Muhammad Ridwan Ismail.png",
      description: "Praktikum simulasi sidang sengketa Waris & Harta Bersama dipimpin oleh Muhammad Ridwan Ismail sebagai Hakim Ketua.",
      likes: 54,
      tags: ["#SidangSemuPA", "#HukumKeluargaIslam", "#MootCourt"],
      uploader: "Muhammad Ridwan Ismail"
    },
    {
      id: "mem-2",
      title: "Malam Keakraban (MAKRAB) Anak Hukum HKI",
      category: "kegiatan",
      mediaType: "image",
      date: "18 November 2023",
      location: "Villa Nusantara, Puncak",
      image: "assets/Alif Subbanul Qirom.png",
      description: "Api unggun malam hari, tukar kado silang, dan sesi curhat impian masa depan calon Sarjana Hukum.",
      likes: 89,
      tags: ["#MakrabHKI", "#AnakHukum", "#WarmMemories"],
      uploader: "Alif Subbanul Qirom"
    },
    {
      id: "mem-3",
      title: "Kunjungan Studi Lapangan KUA & BBP4",
      category: "kegiatan",
      mediaType: "image",
      date: "10 Maret 2024",
      location: "Kantor Urusan Agama (KUA) Pusat",
      image: "assets/Siti Ainur Rahmah.png",
      description: "Observasi tata cara pencatatan nikah rujukan Undang-Undang Perkawinan dan bimbingan perkawinan prasikap Sakinah.",
      likes: 67,
      tags: ["#StudiKUA", "#PencatatanNikah", "#HukumKeluarga"],
      uploader: "Siti Ainur Rahmah"
    },
    {
      id: "mem-4",
      title: "Begadang Revisi & Belajar Faraidh (Waris)",
      category: "kuliah",
      mediaType: "image",
      date: "22 Juni 2023",
      location: "Perpustakaan Hukum & Gazebo Kampus",
      image: "assets/Rivaldi Bagja.png",
      description: "Hitung-hitungan bagian waris (Ashabah, Dzawil Furud) sampai kepala pusing, tapi tetep tersenyum demi nilai A Faraidh!",
      likes: 42,
      tags: ["#IlmuFaraidh", "#PejuangUAS", "#HukumWaris"],
      uploader: "Rivaldi Bagja"
    },
    {
      id: "mem-5",
      title: "Perayaan Sempro Perdana HKI 2022",
      category: "sidang",
      mediaType: "image",
      date: "15 Januari 2025",
      location: "Gedung Dekanat FH & Syariah",
      image: "assets/Syahrul Amarullah.png",
      description: "Kelulusan Ujian Seminar Proposal Judul Hukum Mediasi Perceraian! Selempang & buket ucapan meriah.",
      likes: 112,
      tags: ["#SemproDone", "#CalonSH", "#BanggaHKI"],
      uploader: "Syahrul Amarullah"
    },
    {
      id: "mem-6",
      title: "Tawa & Makan Bersama Selepas Kuliah",
      category: "lucu",
      mediaType: "image",
      date: "04 Oktober 2023",
      location: "Kantin FH",
      image: "assets/Eka Wulandari.png",
      description: "Bahasan serius materi Rujuk & Thalaq di kelas, pas makan siang malah ketawa ngakak gara-gara tebak-tebakan mahar nikah.",
      likes: 78,
      tags: ["#KantinMemories", "#TawaHKI", "#AnakHukum"],
      uploader: "Eka Wulandari"
    },
    {
      id: "mem-7",
      title: "Foto Angkatan Studio HKI Elegance Red & Black",
      category: "wisuda",
      mediaType: "image",
      date: "20 Februari 2025",
      location: "Studio Photo Lux",
      image: "assets/Sidqia Rizky Awaliyah.png",
      description: "Foto resmi 1 angkatan berpakaian formal suit & dress merah-hitam elegan. Bukti keanggunan dan kebersamaan Hukum Keluarga Islam!",
      likes: 135,
      tags: ["#BukuKenanganHKI", "#MerahPutihHitam", "#Angkatan2022"],
      uploader: "Muhammad Ridwan Ismail"
    },
    {
      id: "mem-8",
      title: "Bimbingan Draf Skripsi Hukum Perkawinan",
      category: "kuliah",
      mediaType: "image",
      date: "11 November 2024",
      location: "Ruang Dosen Pengadilan & PA",
      image: "assets/Nurul Zakiah Hidayat.png",
      description: "Antri bimbingan skripsi dari pagi bersama Pak Hendra, tegang dapet coretan metode penelitian tapi saling dukung sesama teman.",
      likes: 61,
      tags: ["#PejuangSkripsi", "#SkripsiHKI", "#BimbinganPA"],
      uploader: "Nurul Zakiah Hidayat"
    }
  ],
      id: "stu-1",
      name: "Muhammad Ridwan Ismail",
      role: "Ketua Kelas / Super Admin",
      badge: "Super Admin",
      avatar: "assets/Muhammad Ridwan Ismail.png",
      quote: "Fiat Justitia Ruat Caelum — Menegakkan keadilan, mengukir kebersamaan HKI."
    },
    {
      id: "stu-2",
      name: "Aceng Usman",
      role: "Mahasiswa HKI 2022",
      badge: "Anggota",
      avatar: "assets/Aceng Usman.png",
      quote: "Semangat memperjuangkan impian calon Sarjana Hukum."
    },
    {
      id: "stu-3",
      name: "Ade Ahmad Satibi",
      role: "Mahasiswa HKI 2022",
      badge: "Anggota",
      avatar: "assets/Ade Ahmad Satibi.png",
      quote: "Kebersamaan adalah kunci keberhasilan kelas kita."
    },
    {
      id: "stu-4",
      name: "Agus Setiyawan",
      role: "Mahasiswa HKI 2022",
      badge: "Anggota",
      avatar: "assets/Agus Setiyawan.png",
      quote: "Menatap masa depan cerah bersama Hukum Keluarga Islam."
    },
    {
      id: "stu-5",
      name: "Ajzi Manumayasya",
      role: "Mahasiswa HKI 2022",
      badge: "Anggota",
      avatar: "assets/Ajzi Manumayasya.png",
      quote: "Terus melangkah menuju gelar S.H. penuh kebanggaan."
    },
    {
      id: "stu-6",
      name: "Alif Subbanul Qirom",
      role: "Mahasiswa HKI 2022",
      badge: "Anggota",
      avatar: "assets/Alif Subbanul Qirom.png",
      quote: "Ilmu dan kebaikan untuk pengabdian masyarakat."
    },
    {
      id: "stu-7",
      name: "Eka Wulandari",
      role: "Mahasiswa HKI 2022",
      badge: "Anggota",
      avatar: "assets/Eka Wulandari.png",
      quote: "Kenangan perkuliahan yang indah dan tak terlupakan."
    },
    {
      id: "stu-8",
      name: "Hasan Basri",
      role: "Mahasiswa HKI 2022",
      badge: "Anggota",
      avatar: "assets/Hasan Basri.png",
      quote: "Sukses bersama seluruh teman-teman seperjuangan."
    },
    {
      id: "stu-9",
      name: "Muhammad Abdurachman",
      role: "Mahasiswa HKI 2022",
      badge: "Anggota",
      avatar: "assets/Muhammad Abdurachman.png",
      quote: "Setiap proses adalah pelajaran berharga."
    },
    {
      id: "stu-10",
      name: "Muhammad Ridwan",
      role: "Mahasiswa HKI 2022",
      badge: "Anggota",
      avatar: "assets/Muhammad Ridwan.png",
      quote: "Pantang menyerah meraih cita-cita tertinggi."
    },
    {
      id: "stu-11",
      name: "Nurul Zakiah Hidayat",
      role: "Mahasiswa HKI 2022",
      badge: "Anggota",
      avatar: "assets/Nurul Zakiah Hidayat.png",
      quote: "Bersyukur atas setiap momen indah di HKI."
    },
    {
      id: "stu-12",
      name: "Rivaldi Bagja",
      role: "Mahasiswa HKI 2022",
      badge: "Anggota",
      avatar: "assets/Rivaldi Bagja.png",
      quote: "Persahabatan HKI abadi sepanjang masa."
    },
    {
      id: "stu-13",
      name: "Sidqia Rizky Awaliyah",
      role: "Mahasiswa HKI 2022",
      badge: "Anggota",
      avatar: "assets/Sidqia Rizky Awaliyah.png",
      quote: "Mengukir senyum dan prestasi manis di kampus."
    },
    {
      id: "stu-14",
      name: "Siti Ainur Rahmah",
      role: "Mahasiswa HKI 2022",
      badge: "Anggota",
      avatar: "assets/Siti Ainur Rahmah.png",
      quote: "Menyongsong masa depan dengan senyuman dan kebaikan."
    },
    {
      id: "stu-15",
      name: "Siti Nurasyfa",
      role: "Mahasiswa HKI 2022",
      badge: "Anggota",
      avatar: "assets/Siti Nurasyfa.png",
      quote: "Kebersamaan yang penuh dengan rasa syukur."
    },
    {
      id: "stu-16",
      name: "Syahrul Amarullah",
      role: "Mahasiswa HKI 2022",
      badge: "Anggota",
      avatar: "assets/Syahrul Amarullah.png",
      quote: "Terus berkarya dan mengabdi untuk keadilan."
    },
    {
      id: "stu-17",
      name: "Syarif Hidayat",
      role: "Mahasiswa HKI 2022",
      badge: "Anggota",
      avatar: "assets/Syarif Hidayat.png",
      quote: "Salam hangat untuk seluruh keluarga besar HKI 2022."
    }
  ],

  timeline: [
    {
      year: "2022",
      semester: "Semester 1 - Welcoming MABA FH",
      title: "Awal Perkuliahan & Pembentukan Kelas HKI",
      description: "Pertama kali berkumpul di Auditorium FH. Berjabat tangan, membentuk ikatan HKI 2022, dan memilih Komti pertama.",
      icon: "users"
    },
    {
      year: "2023",
      semester: "Semester 3 - Makrab & Studi Faraidh",
      title: "Malam Keakraban & Kajian Hukum Keluarga",
      description: "Makrab di Puncak bersama, kebersamaan malam hari, diskusi fiqih munakahat, dan kehangatan persaudaraan anak hukum.",
      icon: "heart"
    },
    {
      year: "2024",
      semester: "Semester 5 - Sidang PA & KUA",
      title: "Praktikum Peradilan Agama & Kunjungan KUA",
      description: "Mengenakan toga sidang peradilan agama, simulasi mediasi perceraian & sengketa waris, serta observasi pelayanan KUA.",
      icon: "gavel"
    },
    {
      year: "2025",
      semester: "Semester 7 & 8 - Sempro & Skripsi",
      title: "Ujian Proposal & Garis Finish S.H.",
      description: "Perjuangan draf skripsi hukum keluarga Islam, ujian proposal, hingga gelar Sarjana Hukum (S.H.) berada di tangan!",
      icon: "graduation-cap"
    }
  ],

  notes: [
 }
  ]
};
