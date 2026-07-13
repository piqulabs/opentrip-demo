export type Departure = {
  id: string;
  label: string;
  startDate: string;
  endDate: string;
  seatsTotal: number;
  seatsInitialAvailable: number;
};

export type ItineraryBlock = {
  time: string;
  title: string;
  detail: string;
};

export type ItineraryDay = {
  day: number;
  title: string;
  overnight: string;
  blocks: ItineraryBlock[];
};

export type Testimonial = {
  name: string;
  city: string;
  tripLabel: string;
  photo: string;
  quote: string;
};

export type GalleryShot = {
  src: string;
  alt: string;
  caption: string;
};

export const TRIP_ID = "komodo-3d2n";

export const trip = {
  id: TRIP_ID,
  brand: "Jelajah Nusa",
  name: "Komodo Open Trip 3D2N",
  tagline: "Phinisi sharing, kuota transparan, DP langsung nutup kursi.",
  destination: "Labuan Bajo, NTT",
  duration: "3 hari 2 malam",
  vessel: "Phinisi superior, kabin twin share ber-AC",
  pricePerPerson: 2_950_000,
  dpPercent: 30,
  seatsTotal: 15,
  meetingPoint: "Dermaga KP3 Labuan Bajo (dekat Pelabuhan Marina)",
  meetingNote:
    "Jemput hotel area Labuan Bajo / Bandara Komodo (LBJ) jam 09.00-10.00, tergantung jadwal penerbangan. Titik kumpul final di dermaga KP3 sebelum naik kapal.",
  waGroupMock: "https://chat.whatsapp.com/JelajahNusaKomodoDemo",
  waAdmin: "6281234567890",
  heroImage:
    "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1600&q=80",
  heroAlt: "Pemandangan perbukitan dan teluk di kawasan Labuan Bajo",
};

export const departures: Departure[] = [
  {
    id: "2026-08-12",
    label: "12-14 Agustus 2026",
    startDate: "2026-08-12",
    endDate: "2026-08-14",
    seatsTotal: 15,
    seatsInitialAvailable: 3,
  },
  {
    id: "2026-08-19",
    label: "19-21 Agustus 2026",
    startDate: "2026-08-19",
    endDate: "2026-08-21",
    seatsTotal: 15,
    seatsInitialAvailable: 8,
  },
  {
    id: "2026-08-26",
    label: "26-28 Agustus 2026",
    startDate: "2026-08-26",
    endDate: "2026-08-28",
    seatsTotal: 15,
    seatsInitialAvailable: 12,
  },
];

export const itinerary: ItineraryDay[] = [
  {
    day: 1,
    title: "Labuan Bajo - Kelor - Manjarite - Kalong",
    overnight: "Tidur di kapal (kabin AC)",
    blocks: [
      {
        time: "09.00-10.00",
        title: "Jemput hotel / Bandara Komodo (LBJ)",
        detail:
          "Driver jemput sesuai urutan hotel area Labuan Bajo. Kalau landing pagi, langsung diantar ke dermaga. Bawa tas kecil aja ke kapal; koper besar bisa dititip di basecamp kami (gratis).",
      },
      {
        time: "10.30",
        title: "Briefing di Dermaga KP3",
        detail:
          "Kenalan crew, cek safety vest, bagi kabin twin share. Kapal: phinisi superior, AC di kabin, kamar mandi share (bersih, air tawar terbatas).",
      },
      {
        time: "11.00",
        title: "Berlayar ke Pulau Kelor",
        detail:
          "Trekking singkat naik bukit (~20-25 menit, tandus, panas). View 360° ke teluk. Turun pelan-pelan, ada yang licin.",
      },
      {
        time: "12.30",
        title: "Makan siang di kapal",
        detail:
          "Nasi, lauk laut/ayam, sayur, buah. Menu menyesuaikan hasil belanja pagi di pasar Labuan Bajo.",
      },
      {
        time: "13.30-15.00",
        title: "Snorkeling Manjarite",
        detail:
          "Air relatif tenang, terumbu dangkal, cocok buat yang baru pertama snorkel. Masker + snorkel + fin disediakan. Life jacket wajib buat yang kurang percaya diri.",
      },
      {
        time: "16.30-18.00",
        title: "Pulau Kalong: sunset + kelelawar",
        detail:
          "Santai di deck, kopi/teh. Menjelang maghrib, ribuan flying fox keluar dari mangrove. Kalau beruntung, langitnya oranye pekat.",
      },
      {
        time: "19.00",
        title: "Makan malam + istirahat",
        detail:
          "Makan malam di deck. Generator mati sekitar jam 22.00-23.00 (tergantung kapal); bawa powerbank.",
      },
    ],
  },
  {
    day: 2,
    title: "Padar - Pink Beach - Komodo - Taka Makassar - Manta Point",
    overnight: "Tidur di kapal (kabin AC)",
    blocks: [
      {
        time: "04.45",
        title: "Bangun untuk Padar",
        detail:
          "Crew bangunin. Sarapan ringan (roti/pisang/kopi) sebelum turun. Trekking Padar butuh stamina: ~30-45 menit naik, tanah longsoran, sepatu antislip wajib.",
      },
      {
        time: "05.30-07.30",
        title: "Sunrise trekking Pulau Padar",
        detail:
          "Viewpoint ikonik tiga teluk. Antri foto agak lama kalau ramai. Turun sebelum panas menyengat.",
      },
      {
        time: "08.00",
        title: "Sarapan lengkap di kapal",
        detail: "Nasi/mie + telur + buah. Kapal pindah ke Pink Beach sambil makan.",
      },
      {
        time: "09.00-10.30",
        title: "Pink Beach (Long Beach)",
        detail:
          "Pasir kemerahan dari pecahan karang foraminifera. Snorkeling di sisi kiri pantai biasanya lebih hidup. Jangan injak karang.",
      },
      {
        time: "11.00-12.30",
        title: "Trekking Pulau Komodo + ranger",
        detail:
          "Wajib ikut ranger TN Komodo. Trek pendek lihat komodo liar. Jaga jarak, jangan jongkok di depan mereka, jangan bawa plastik berbau makanan.",
      },
      {
        time: "12.30",
        title: "Makan siang di kapal",
        detail: "Kapal menuju Taka Makassar sambil makan.",
      },
      {
        time: "14.00-15.00",
        title: "Taka Makassar (sandbar)",
        detail:
          "Pasir timbul di tengah laut (tergantung pasang). Foto di sandbar, snorkeling dangkal. Kalau pasang tinggi, sandbar bisa tenggelam  -  normal.",
      },
      {
        time: "15.30-16.30",
        title: "Manta Point",
        detail:
          "Snorkeling drift menunggu manta. Kehadiran manta tidak dijamin: tergantung plankton & arus. Kalau kosong, crew cari spot cadangan (Siaba/Sebayur).",
      },
      {
        time: "18.30",
        title: "Makan malam + istirahat",
        detail:
          "Anchor di teluk tenang. Malam kedua di kapal. Siapkan baju ganti kering; angin malam di Flores dingin.",
      },
    ],
  },
  {
    day: 3,
    title: "Siaba / Sebayur - kembali Labuan Bajo",
    overnight: "Trip selesai",
    blocks: [
      {
        time: "06.30-08.00",
        title: "Snorkeling pagi di Siaba / Sebayur",
        detail:
          "Sering ada penyu. Arus sedang. Ini sesi terakhir di air sebelum pulang.",
      },
      {
        time: "08.00",
        title: "Sarapan di kapal",
        detail: "Sarapan + packing tas. Cek barang di kabin (charger, masker, sandal).",
      },
      {
        time: "09.00-11.00",
        title: "Berlayar kembali ke Labuan Bajo",
        detail:
          "ETA dermaga KP3 sekitar jam 11.00-12.00 tergantung cuaca. Drop-off hotel / bandara untuk penerbangan siang (rekomendasi terbang setelah jam 14.00).",
      },
      {
        time: "Catatan",
        title: "Itinerary bisa bergeser",
        detail:
          "Urutan spot menyesuaikan cuaca, arus, dan aturan TN Komodo hari itu. Yang tidak berubah: makan sesuai program, safety briefing, dan transparansi kalau ada spot yang diganti.",
      },
    ],
  },
];

export const included = [
  "Kapal phinisi superior 3D2N (live on board)",
  "Kabin twin share ber-AC",
  "Makan penuh selama di kapal (3x makan/hari + camilan ringan)",
  "Air mineral, teh, kopi",
  "Alat snorkeling (masker, snorkel, fin)",
  "Life jacket",
  "Tour leader + crew kapal",
  "Dokumentasi foto trip (Google Drive, 2-3 hari setelah pulang)",
  "Transfer hotel area Labuan Bajo / Bandara Komodo (LBJ) - dermaga",
];

export const excluded = [
  "Tiket pesawat ke/dari Labuan Bajo",
  "Tiket masuk Taman Nasional Komodo (estimasi WNI ~Rp250.000-275.000/orang untuk rute standar; WNA lebih mahal)",
  "Ranger fee di Pulau Komodo (dibayar on-site, ikut aturan TN)",
  "Asuransi perjalanan",
  "Tip crew kapal (opsional, biasanya dikumpulkan H-1 di grup WA)",
  "Pengeluaran pribadi (laundry, oleh-oleh, makan di darat sebelum/sesudah trip)",
  "Sewa kamera underwater / GoPro (kalau ada di kapal, ~Rp50.000-100.000/hari)",
  "Ganti rugi alat snorkeling yang hilang/rusak",
];

export const gallery: GalleryShot[] = [
  {
    src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=900&q=80",
    alt: "Perahu di teluk Labuan Bajo",
    caption: "Dermaga Labuan Bajo, pagi sebelum berangkat",
  },
  {
    src: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=80",
    alt: "Air laut jernih untuk snorkeling",
    caption: "Snorkeling Manjarite, hari pertama",
  },
  {
    src: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=900&q=80",
    alt: "Pantai tropis berpasir",
    caption: "Pink Beach, pasirnya emang agak kemerahan",
  },
  {
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
    alt: "Pantai dan laut biru",
    caption: "Sandbar Taka Makassar saat surut",
  },
  {
    src: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?auto=format&fit=crop&w=900&q=80",
    alt: "Sunset di atas laut",
    caption: "Sunset dari deck phinisi",
  },
  {
    src: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=900&q=80",
    alt: "Kapal layar di laut",
    caption: "Phinisi veranda, tempat nongkrong malam-malam",
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Dinda Prameswari",
    city: "Jakarta",
    tripLabel: "Komodo 3D2N, Juni 2026",
    photo:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    quote:
      "Padar naiknya emang berat, lutut saya sempat gemeter. Tapi crew sabar nungguin. Manta Point kosong waktu itu, diganti Siaba, dikasih tau duluan di grup.",
  },
  {
    name: "Rafi Nugroho",
    city: "Bandung",
    tripLabel: "Komodo 3D2N, Mei 2026",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    quote:
      "Yang saya suka: daftar termasuk/tidak termasuknya jelas. Tiket TN bayar sendiri di tempat, nggak ada kejutan di kapal. Kabin AC-nya dingin, generator mati jam 11 malam.",
  },
  {
    name: "Salsa & Dimas",
    city: "Surabaya",
    tripLabel: "Komodo 3D2N, April 2026",
    photo:
      "https://images.unsplash.com/photo-1524504388940-b1c17226555e?auto=format&fit=crop&w=200&q=80",
    quote:
      "Booking dari HP, DP langsung, kursi kepegang. Dulu ever ghosting operator lain karena nunggu transfer manual 2 hari. Di sini WA grup masuk 5 menit setelah bayar.",
  },
];

export const faqs = [
  {
    q: "Bawa apa aja?",
    a: "Sepatu antislip / trail untuk Padar, sandal jepit, baju ganti cepat kering, sunblock reef-safe, obat pribadi, powerbank, jas hujan tipis, uang tunai untuk tiket TN + tip. Tas kabin cukup 1 cabin bag; koper besar dititip basecamp.",
  },
  {
    q: "Meeting point di mana?",
    a: "Dermaga KP3 Labuan Bajo. Jemput hotel area LBJ / bandara jam 09.00-10.00. Detail driver dikirim H-1 di grup WA trip.",
  },
  {
    q: "Kalau cuaca buruk?",
    a: "Spot bisa digeser atau diganti demi keselamatan. Kalau trip dibatalkan total dari sisi operator (cuaca ekstrem), DP dialihkan ke tanggal lain atau dikembalikan sesuai kebijakan di bawah.",
  },
  {
    q: "Kebijakan refund?",
    a: "Cancel >=14 hari sebelum berangkat: DP bisa full credit ke trip berikutnya (berlaku 6 bulan). Cancel 7-13 hari: credit 50%. Cancel <7 hari / no-show: DP hangus. Sisa pelunasan H-7; kalau belum lunas, kursi dilepas.",
  },
  {
    q: "Makanannya gimana? Ada opsi vegetarian?",
    a: "Masakan rumahan Indonesia di kapal. Kasih tau alergi / vegetarian saat booking. Kami usahain, tapi dapur kapal terbatas, bukan restoran.",
  },
  {
    q: "Bisa private cabin?",
    a: "Open trip ini twin share. Mau private / charter hubungi WA admin. Harganya beda.",
  },
];

export function formatIDR(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function calcDp(pricePerPerson: number, guests: number): number {
  return Math.round(pricePerPerson * guests * (trip.dpPercent / 100));
}

export function calcTotal(pricePerPerson: number, guests: number): number {
  return pricePerPerson * guests;
}

