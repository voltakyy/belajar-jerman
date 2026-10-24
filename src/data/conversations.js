// Database Percakapan Bahasa Jerman Praktis (Deutsch im Alltag)
// Dibuat berdasarkan prinsip Comprehensible Input (CI) dan Lexical Chunking
// Dilengkapi teks Jerman, panduan lafal (pronunciation), arti bahasa Indonesia,
// pemecahan kata (chunks), penanda gender artikel (der/die/das), latihan pola kalimat, dan catatan budaya.

export const CONVERSATIONS = [
  // ================= TEMA 1: BEGRÜSSUNG & KENNENLERNEN =================
  {
    id: 'intro-01',
    category: 'Perkenalan',
    level: 'Dasar',
    title: 'Sapaan Santai & Menanyakan Kabar',
    titleDe: 'Begrüßung & Wie geht\'s?',
    icon: '👋',
    summary: 'Percakapan sehari-hari saat bertemu teman atau kenalan di Jerman.',
    dialogue: [
      {
        speaker: 'Lukas',
        role: 'A',
        de: 'Hallo Anna! Schön dich zu sehen. Wie geht es dir?',
        phonetic: 'Halo Ana! Syoen dikh tsu ze-hen. Vi get es dir?',
        id: 'Halo Anna! Senang melihatmu. Bagaimana kabarmu?',
        tokens: [
          { de: 'Hallo', id: 'halo' },
          { de: 'Schön', id: 'senang / indah' },
          { de: 'dich zu sehen', id: 'melihatmu / berjumpa denganmu' },
          { de: 'Wie geht es dir?', id: 'bagaimana kabarmu? (informal)' }
        ]
      },
      {
        speaker: 'Anna',
        role: 'B',
        de: 'Hallo Lukas! Mir geht\'s super, danke! Und wie geht\'s dir?',
        phonetic: 'Halo Lukas! Mir gets zupa, danke! Unt vi gets dir?',
        id: 'Halo Lukas! Kabarku sangat baik, terima kasih! Dan bagaimana kabarmu?',
        tokens: [
          { de: 'Mir geht\'s super', id: 'kabarku luar biasa / sangat baik' },
          { de: 'danke', id: 'terima kasih' },
          { de: 'Und wie geht\'s dir?', id: 'dan bagaimana denganmu?' }
        ]
      },
      {
        speaker: 'Lukas',
        role: 'A',
        de: 'Auch gut! Ich habe viel zu tun, aber alles läuft prima. Hast du Zeit für einen Kaffee?',
        phonetic: 'Aukh gut! Ikh habe fil tsu tun, aba ales loyft prima. Hast du tsayt fuer ainen Kafe?',
        id: 'Juga baik! Aku ada banyak kerjaan, tapi semuanya berjalan lancar. Kamu ada waktu untuk minum kopi?',
        tokens: [
          { de: 'Auch gut', id: 'juga baik' },
          { de: 'viel zu tun', id: 'banyak yang harus dikerjakan / sibuk' },
          { de: 'alles läuft prima', id: 'semuanya berjalan lancar / bagus' },
          { de: 'Hast du Zeit', id: 'apakah kamu punya waktu' },
          { de: 'für einen Kaffee', id: 'untuk secangkir kopi', gender: 'der' }
        ]
      },
      {
        speaker: 'Anna',
        role: 'B',
        de: 'Ja, sehr gerne! Gleich da drüben gibt es ein tolles Café.',
        phonetic: 'Ya, zer gerne! Glaykh da dryuben gibt es ain toles Kafe.',
        id: 'Ya, dengan senang hati! Tepat di seberang sana ada kafe yang bagus.',
        tokens: [
          { de: 'sehr gerne', id: 'dengan senang hati / mau banget' },
          { de: 'Gleich da drüben', id: 'tepat di seberang sana' },
          { de: 'gibt es', id: 'ada (there is / there are)' },
          { de: 'ein tolles Café', id: 'sebuah kafe yang keren', gender: 'das' }
        ]
      }
    ],
    chunks: [
      {
        phrase: 'Wie geht es dir? / Wie geht\'s?',
        meaning: 'Bagaimana kabarmu? (akrab/informal)',
        usage: 'Gunakan ini untuk teman, keluarga, atau rekan sebaya. Untuk situasi resmi gunakan "Wie geht es Ihnen?".'
      },
      {
        phrase: 'Mir geht\'s super / gut / so lala',
        meaning: 'Kabarku sangat baik / baik / biasa saja',
        usage: 'Dalam bahasa Jerman kita menjawab dengan "Mir geht es...", bukan "Ich bin gut" (Ich bin gut berarti "aku jago/ahli").'
      },
      {
        phrase: 'Sehr gerne!',
        meaning: 'Dengan senang hati! / Mau banget!',
        usage: 'Respon positif yang sangat natural saat menyetujui ajakan seseorang.'
      },
      {
        phrase: 'Hast du Zeit für...?',
        meaning: 'Kamu punya waktu untuk... kah?',
        usage: 'Pola standar untuk mengajak seseorang nongkrong atau beraktivitas santai.'
      }
    ],
    patternDrill: {
      template: 'Hast du Zeit für [Aktivitas]?',
      phoneticTemplate: 'Hast du tsayt fuer [Aktivitas]?',
      meaningTemplate: 'Apakah kamu ada waktu untuk [Aktivitas]?',
      slots: [
        { word: 'einen Kaffee (secangkir kopi)', translation: 'ngopi bareng' },
        { word: 'ein Mittagessen (makan siang)', translation: 'makan siang bersama' },
        { word: 'einen Spaziergang (jalan-jalan santai)', translation: 'jalan santai di taman' },
        { word: 'ein Bier (segelas bir)', translation: 'minum santai sore' }
      ]
    },
    culturalNote: 'Di Jerman, pertanyaan "Wie geht\'s?" sering kali dianggap pertanyaan sungguhan, bukan sekadar basa-basi kosong seperti di Amerika. Teman dekat di Jerman mungkin akan menceritakan kondisi harinya secara jujur ("Ein bisschen stressig", "Geht so").'
  },

  {
    id: 'intro-02',
    category: 'Perkenalan',
    level: 'Dasar',
    title: 'Perkenalan Diri, Asal Indonesia & Profesi',
    titleDe: 'Sich vorstellen & Herkunft',
    icon: '🤝',
    summary: 'Menyebutkan nama, asal negara (Indonesien), tempat tinggal sekarang, dan pekerjaan.',
    dialogue: [
      {
        speaker: 'Maximilian',
        role: 'A',
        de: 'Guten Tag! Mein Name ist Maximilian. Freut mich, Sie kennenzulernen.',
        phonetic: 'Guten Tak! Mayn Name ist Maksimilian. Froyt mikh, Zi kenentsulernen.',
        id: 'Selamat siang! Nama saya Maximilian. Senang berkenalan dengan Anda (formal).',
        tokens: [
          { de: 'Guten Tag', id: 'selamat siang / halo' },
          { de: 'Mein Name ist', id: 'nama saya adalah' },
          { de: 'Freut mich', id: 'senang sekali' },
          { de: 'Sie kennenzulernen', id: 'berkenalan dengan Anda' }
        ]
      },
      {
        speaker: 'Budi',
        role: 'B',
        de: 'Guten Tag! Ich heiße Budi. Ganz meinerseits!',
        phonetic: 'Guten Tak! Ikh hayse Budi. Gants maynrzayts!',
        id: 'Selamat siang! Nama saya Budi. Senang juga berkenalan dengan Anda (senang timbal balik)!',
        tokens: [
          { de: 'Ich heiße', id: 'nama saya dipanggil' },
          { de: 'Ganz meinerseits', id: 'senang juga (sama-sama senang)' }
        ]
      },
      {
        speaker: 'Maximilian',
        role: 'A',
        de: 'Sie sprechen aber schon gut Deutsch! Woher kommen Sie?',
        phonetic: 'Zi syprekhen aba syon gut Doytsy! Voher komen Zi?',
        id: 'Tapi Anda bicaranya sudah bagus bahasa Jermannya! Dari mana Anda berasal?',
        tokens: [
          { de: 'Sie sprechen', id: 'Anda berbicara' },
          { de: 'schon gut', id: 'sudah bagus' },
          { de: 'Deutsch', id: 'bahasa Jerman' },
          { de: 'Woher kommen Sie?', id: 'dari mana Anda berasal?' }
        ]
      },
      {
        speaker: 'Budi',
        role: 'B',
        de: 'Danke! Ich komme aus Indonesien, aber ich wohne jetzt in Berlin und arbeite als Softwareentwickler.',
        phonetic: 'Danke! Ikh kome aus Indonesien, aba ikh vohne yetst in Berlin unt arbayte als Software-entvikla.',
        id: 'Terima kasih! Saya berasal dari Indonesia, tetapi sekarang saya tinggal di Berlin dan bekerja sebagai software developer.',
        tokens: [
          { de: 'Ich komme aus', id: 'saya berasal dari' },
          { de: 'Indonesien', id: 'Indonesia' },
          { de: 'ich wohne jetzt in', id: 'saya tinggal sekarang di' },
          { de: 'arbeite als', id: 'bekerja sebagai' },
          { de: 'Softwareentwickler', id: 'pengembang perangkat lunak', gender: 'der' }
        ]
      }
    ],
    chunks: [
      {
        phrase: 'Freut mich! / Freut mich, Sie kennenzulernen',
        meaning: 'Senang berkenalan dengan Anda (Nice to meet you)',
        usage: 'Frasa wajib dan sopan saat bersalaman pertama kali.'
      },
      {
        phrase: 'Ganz meinerseits!',
        meaning: 'Sama-sama / Kebahagiaan saya juga',
        usage: 'Balasan yang sangat berkelas ketika lawan bicara berkata "Freut mich!".'
      },
      {
        phrase: 'Ich komme aus...',
        meaning: 'Saya berasal dari...',
        usage: 'Contoh: Ich komme aus Indonesien (huruf s dibaca z: in-do-ne-zi-en).'
      },
      {
        phrase: 'Ich arbeite als [Profesi]',
        meaning: 'Saya bekerja sebagai [Profesi]',
        usage: 'Gunakan preposisi "als" tanpa artikel untuk menyebutkan profesi.'
      }
    ],
    patternDrill: {
      template: 'Ich komme aus Indonesien, wohne in [Kota] und arbeite als [Profesi].',
      phoneticTemplate: 'Ikh kome aus Indonesien, vohne in [Kota] unt arbayte als [Profesi].',
      meaningTemplate: 'Saya berasal dari Indonesia, tinggal di [Kota] dan bekerja sebagai [Profesi].',
      slots: [
        { word: 'Berlin / Softwareentwickler', translation: 'Berlin / programmer pengembang perangkat lunak' },
        { word: 'München / Ingenieur', translation: 'Munich / insinyur teknik' },
        { word: 'Hamburg / Grafikdesigner', translation: 'Hamburg / desainer grafis' },
        { word: 'Frankfurt / Student', translation: 'Frankfurt / mahasiswa pelajar' }
      ]
    },
    culturalNote: 'Di Jerman, huruf kapital wajib digunakan untuk SEMUA kata benda (Nomen), seperti *Name*, *Deutsch*, *Softwareentwickler*, *Kaffee*. Ini bukan typo, melainkan aturan gramatika resmi bahasa Jerman yang sangat konsisten!'
  },

  // ================= TEMA 2: IM CAFÉ & RESTAURANT =================
  {
    id: 'food-01',
    category: 'Kafe & Resto',
    level: 'Dasar',
    title: 'Memesan Minuman & Kopi di Kafe',
    titleDe: 'Im Café bestellen',
    icon: '☕',
    summary: 'Cara memesan kopi, jenis susu, air mineral bersoda (Sprudel) vs biasa (still).',
    dialogue: [
      {
        speaker: 'Kellnerin (Pelayan)',
        role: 'A',
        de: 'Guten Tag! Was darf es für Sie sein? Haben Sie schon gewählt?',
        phonetic: 'Guten Tak! Vas darf es fuer Zi zayn? Haben Zi syon gevælt?',
        id: 'Selamat siang! Mau pesan apa untuk Anda? Apakah Anda sudah memilih?',
        tokens: [
          { de: 'Was darf es sein?', id: 'mau pesan apa / ada yang bisa saya ambilkan?' },
          { de: 'schon gewählt', id: 'sudah menentukan pilihan' }
        ]
      },
      {
        speaker: 'Gast (Tamu)',
        role: 'B',
        de: 'Guten Tag! Ich hätte gerne einen Cappuccino mit Hafermilch, bitte.',
        phonetic: 'Guten Tak! Ikh hæte gerne ainen Kaputsyino mit Hafamilkh, bite.',
        id: 'Selamat siang! Saya ingin pesan satu cappuccino dengan susu oat (oat milk), tolong.',
        tokens: [
          { de: 'Ich hätte gerne', id: 'saya ingin sekali / saya minta tolong' },
          { de: 'einen Cappuccino', id: 'sebuah cappuccino (akkusativ)', gender: 'der' },
          { de: 'mit Hafermilch', id: 'dengan susu havermut/oat', gender: 'die' },
          { de: 'bitte', id: 'tolong / please' }
        ]
      },
      {
        speaker: 'Kellnerin (Pelayan)',
        role: 'A',
        de: 'Gerne! Möchten Sie auch etwas Wasser dazu? Mit oder ohne Kohlensäure?',
        phonetic: 'Gerne! Moekhten Zi aukh etvas Vasa datsu? Mit oda ohne Kolen-zoyre?',
        id: 'Baik! Apakah Anda ingin air putih juga menyertainya? Dengan soda atau tanpa soda?',
        tokens: [
          { de: 'Möchten Sie', id: 'apakah Anda ingin' },
          { de: 'Wasser', id: 'air putih mineral', gender: 'das' },
          { de: 'Mit oder ohne', id: 'dengan atau tanpa' },
          { de: 'Kohlensäure', id: 'karbonasi / gelembung gas soda', gender: 'die' }
        ]
      },
      {
        speaker: 'Gast (Tamu)',
        role: 'B',
        de: 'Ein stilles Wasser, bitte. Und ein Stück Apfelkuchen dazu.',
        phonetic: 'Ain stiles Vasa, bite. Unt ain Sytuk Apfelkukhen datsu.',
        id: 'Satu air mineral tanpa soda (still), tolong. Dan sepotong kue pai apel.',
        tokens: [
          { de: 'stilles Wasser', id: 'air putih biasa tanpa soda (still water)' },
          { de: 'ein Stück', id: 'sepotong / satu iris', gender: 'das' },
          { de: 'Apfelkuchen', id: 'kue pai apel khas Jerman', gender: 'der' }
        ]
      }
    ],
    chunks: [
      {
        phrase: 'Ich hätte gerne... (bitte)',
        meaning: 'Saya ingin pesan... (tolong)',
        usage: 'Frasa memesan paling sopan dan elegan di seluruh negara berbahasa Jerman (Konjunktiv II).'
      },
      {
        phrase: 'Mit oder ohne Kohlensäure?',
        meaning: 'Dengan soda atau tanpa soda (air biasa)?',
        usage: 'Di Jerman, "Wasser" secara default adalah air bersoda (Sprudel/mit Gas). Jika ingin air biasa, katakan "stilles Wasser".'
      },
      {
        phrase: 'Was darf es sein?',
        meaning: 'Ada yang bisa saya bantu / mau pesan apa?',
        usage: 'Kalimat sapaan khas pramusaji Jerman saat menghampiri meja Anda.'
      },
      {
        phrase: '...dazu',
        meaning: '...sebagai tambahan / pendamping',
        usage: 'Misal: "Ein Glas Wasser dazu" (plus segelas air putih).'
      }
    ],
    patternDrill: {
      template: 'Ich hätte gerne [Minuman] mit [Pelengkap], bitte.',
      phoneticTemplate: 'Ikh hæte gerne [Minuman] mit [Pelengkap], bite.',
      meaningTemplate: 'Saya ingin pesan [Minuman] dengan [Pelengkap], tolong.',
      slots: [
        { word: 'einen Cappuccino / Hafermilch', translation: 'satu cappuccino / susu oat' },
        { word: 'einen schwarzen Kaffee / Zucker', translation: 'kopi hitam / gula' },
        { word: 'einen Tee / Zitrone', translation: 'secangkir teh / irisan lemon' },
        { word: 'eine heiße Schokolade / Sahne', translation: 'cokelat panas / krim kocok (whipped cream)' }
      ]
    },
    culturalNote: 'Di Jerman dan Austria, air keran (Leitungswasser) hampir tidak pernah disajikan gratis di restoran. Anda harus memesan botol air mineral berbayar, dan jika Anda tidak menegaskan "still" (tanpa soda), pelayan akan membawakan air mineral berkarbonasi tajam (*Sprudelwasser*).'
  },

  {
    id: 'food-02',
    category: 'Kafe & Resto',
    level: 'Menengah',
    title: 'Membayar Tagihan: Bersama atau Pisah?',
    titleDe: 'Die Rechnung bezahlen (Zusammen oder getrennt?)',
    icon: '💳',
    summary: 'Bagaimana meminta bon tagihan dan budaya Jerman membagi pembayaran secara mandiri di meja.',
    dialogue: [
      {
        speaker: 'Gast (Tamu)',
        role: 'A',
        de: 'Entschuldigung! Wir würden gerne bezahlen, bitte.',
        phonetic: 'Entsyuldigung! Vir vuerden gerne betsalen, bite.',
        id: 'Permisi! Kami ingin membayar tagihannya, tolong.',
        tokens: [
          { de: 'Entschuldigung', id: 'permisi / maaf' },
          { de: 'Wir würden gerne bezahlen', id: 'kami ingin membayar tagihan' }
        ]
      },
      {
        speaker: 'Kellner (Pelayan)',
        role: 'B',
        de: 'Sehr gerne. Zusammen oder getrennt?',
        phonetic: 'Zer gerne. Tsuzamen oda getrent?',
        id: 'Tentu. Digabung jadi satu atau bayar masing-masing (pisah)?',
        tokens: [
          { de: 'Zusammen', id: 'bersama-sama / digabung jadi satu' },
          { de: 'oder', id: 'atau' },
          { de: 'getrennt', id: 'terpisah / masing-masing' }
        ]
      },
      {
        speaker: 'Gast (Tamu)',
        role: 'A',
        de: 'Getrennt, bitte. Für mich waren es das Schnitzel und ein großes Mineralwasser.',
        phonetic: 'Getrent, bite. Fuer mikh varen es das Synitsel unt ain grosses Mineralvasa.',
        id: 'Terpisah, tolong. Bagian saya tadi adalah Schnitzel dan satu air mineral ukuran besar.',
        tokens: [
          { de: 'Getrennt', id: 'terpisah' },
          { de: 'Für mich waren es', id: 'untuk saya tadi adalah' },
          { de: 'das Schnitzel', id: 'daging katsu schnitzel khas Jerman', gender: 'das' }
        ]
      },
      {
        speaker: 'Kellner (Pelayan)',
        role: 'B',
        de: 'Das macht dann achtzehn Euro fünfzig. Zahlen Sie bar oder mit Karte?',
        phonetic: 'Das makht dan akht-tsehn Oyro fuenf-tsikh. Tsalen Zi bar oda mit Karte?',
        id: 'Totalnya jadi 18 Euro 50 sen. Anda membayar tunai atau dengan kartu?',
        tokens: [
          { de: 'Das macht...', id: 'totalnya jadi...' },
          { de: 'achtzehn Euro fünfzig', id: '18,50 Euro' },
          { de: 'bar', id: 'tunai (cash)' },
          { de: 'mit Karte', id: 'dengan kartu (debit/kredit)' }
        ]
      },
      {
        speaker: 'Gast (Tamu)',
        role: 'A',
        de: 'Mit Karte bitte. Machen Sie zwanzig Euro, der Rest ist für Sie.',
        phonetic: 'Mit Karte bite. Makhen Zi tsvantsikh Oyro, der Rest ist fuer Zi.',
        id: 'Pakai kartu tolong. Genapkan saja jadi 20 Euro, sisanya (tip) untuk Anda.',
        tokens: [
          { de: 'Machen Sie zwanzig Euro', id: 'buatlah jadi 20 Euro (tips)' },
          { de: 'der Rest ist für Sie', id: 'sisanya untuk Anda (uang tip / Trinkgeld)', gender: 'der' }
        ]
      }
    ],
    chunks: [
      {
        phrase: 'Wir möchten bezahlen, bitte / Die Rechnung, bitte',
        meaning: 'Kami ingin bayar, tolong / Minta bonnya, tolong',
        usage: 'Kalimat paling umum untuk meminta tagihan di akhir santap makan.'
      },
      {
        phrase: 'Zusammen oder getrennt?',
        meaning: 'Digabung jadi satu atau bayar terpisah?',
        usage: 'Pertanyaan legendaris di restoran Jerman. Pelayan akan menghitung pesanan masing-masing orang secara langsung di meja.'
      },
      {
        phrase: 'Zahlen Sie bar oder mit Karte?',
        meaning: 'Bayar tunai atau pakai kartu?',
        usage: 'Banyak tempat tradisional di Jerman yang masih menulis "Nur Barzahlung" (Hanya menerima tunai).'
      },
      {
        phrase: 'Stimmt so! / Der Rest ist für Sie',
        meaning: 'Kembaliannya ambil saja (uang tip)',
        usage: 'Di Jerman, uang tip (Trinkgeld) biasanya sekitar 5% hingga 10% dan disebutkan langsung saat membayar.'
      }
    ],
    patternDrill: {
      template: 'Für mich waren es [Makanan] und [Minuman].',
      phoneticTemplate: 'Fuer mikh varen es [Makanan] unt [Minuman].',
      meaningTemplate: 'Pesanan saya tadi adalah [Makanan] dan [Minuman].',
      slots: [
        { word: 'die Currywurst / eine Cola', translation: 'sosis kari / satu cola' },
        { word: 'der Cheeseburger / ein Apfelschorle', translation: 'cheeseburger / jus apel soda' },
        { word: 'die Gemüsesuppe / ein Tee', translation: 'sup sayuran / secangkir teh' }
      ]
    },
    culturalNote: 'Budaya membagi bon (*getrennt zahlen*) sangat wajar dan dihargai di Jerman, bahkan saat berkencan santai. Pelayan membawa dompet kulit besar (*Kellnerbörse*) dan mesin kartu ke meja Anda untuk memproses pembayaran satu per satu.'
  },

  // ================= TEMA 3: EINKAUFEN & BÄCKEREI =================
  {
    id: 'shop-01',
    category: 'Belanja',
    level: 'Dasar',
    title: 'Membeli Roti di Toko Roti Jerman (Bäckerei)',
    titleDe: 'Beim Bäcker einkaufen',
    icon: '🥖',
    summary: 'Membeli roti gandum segar (Brötchen), kue, dan ungkapan "ada lagi yang lain?".',
    dialogue: [
      {
        speaker: 'Verkäuferin (Penjual)',
        role: 'A',
        de: 'Guten Morgen! Der Nächste, bitte! Was darf ich Ihnen geben?',
        phonetic: 'Guten Morgen! Der Nækhste, bite! Vas darf ikh Inen geben?',
        id: 'Selamat pagi! Antrean berikutnya, tolong! Apa yang bisa saya berikan untuk Anda?',
        tokens: [
          { de: 'Der Nächste, bitte!', id: 'antrean berikutnya, silakan!', gender: 'der' },
          { de: 'Was darf ich geben?', id: 'apa yang bisa saya berikan?' }
        ]
      },
      {
        speaker: 'Kunde (Pembeli)',
        role: 'B',
        de: 'Guten Morgen! Ich nehme bitte drei normale Brötchen und ein Vollkornbrot.',
        phonetic: 'Guten Morgen! Ikh neme bite dray normale Broetkhyen unt ain Fol-korn-brot.',
        id: 'Selamat pagi! Saya ambil tiga roti bulat biasa (Brötchen) dan satu roti gandum utuh, tolong.',
        tokens: [
          { de: 'Ich nehme bitte', id: 'saya ambil tolong' },
          { de: 'drei normale Brötchen', id: 'tiga roti kecil bulat khas Jerman', gender: 'das' },
          { de: 'ein Vollkornbrot', id: 'satu roti gandum utuh (whole wheat)', gender: 'das' }
        ]
      },
      {
        speaker: 'Verkäuferin (Penjual)',
        role: 'A',
        de: 'Gerne. Soll ich das Brot gleich schneiden?',
        phonetic: 'Gerne. Zol ikh das Brot glaykh synayden?',
        id: 'Baik. Apakah rotinya mau langsung saya potong-potongkan?',
        tokens: [
          { de: 'Soll ich', id: 'apakah sebaiknya saya' },
          { de: 'das Brot', id: 'roti tersebut', gender: 'das' },
          { de: 'schneiden', id: 'memotong / mengiris' }
        ]
      },
      {
        speaker: 'Kunde (Pembeli)',
        role: 'B',
        de: 'Ja bitte, in dicke Scheiben. Und haben Sie noch Brezeln?',
        phonetic: 'Ya bite, in dike Syayben. Unt haben Zi nokh Bretseln?',
        id: 'Ya tolong, iris tebal-tebal ya. Dan apakah Anda masih punya pretzel?',
        tokens: [
          { de: 'in dicke Scheiben', id: 'dalam irisan tebal' },
          { de: 'Brezeln', id: 'kue pretzel asin khas Jerman', gender: 'die' }
        ]
      },
      {
        speaker: 'Verkäuferin (Penjual)',
        role: 'A',
        de: 'Ja, ganz frisch aus dem Ofen! Noch etwas dazu?',
        phonetic: 'Ya, gants fris dust dem Ofen! Nokh etvas datsu?',
        id: 'Ada, baru saja matang segar dari oven! Masih ada yang lain lagi?',
        tokens: [
          { de: 'frisch aus dem Ofen', id: 'segar keluar dari oven' },
          { de: 'Noch etwas dazu?', id: 'masih ada lagi yang lain?' }
        ]
      },
      {
        speaker: 'Kunde (Pembeli)',
        role: 'B',
        de: 'Nein danke, das ist alles für heute.',
        phonetic: 'Nayn danke, das ist ales fuer hoyte.',
        id: 'Tidak terima kasih, itu saja semuanya untuk hari ini.',
        tokens: [
          { de: 'das ist alles', id: 'itu saja semuanya (that is all)' },
          { de: 'für heute', id: 'untuk hari ini' }
        ]
      }
    ],
    chunks: [
      {
        phrase: 'Ich nehme bitte...',
        meaning: 'Saya ambil... tolong',
        usage: 'Frasa paling praktis saat berbelanja bahan makanan atau roti.'
      },
      {
        phrase: 'Soll ich das Brot schneiden?',
        meaning: 'Apakah rotinya perlu diiris/dipotongkan?',
        usage: 'Toko roti Jerman memiliki mesin pemotong otomatis gratis. Anda bisa minta dipotong tipis (dünn) atau tebal (dick).'
      },
      {
        phrase: 'Sonst noch etwas? / Noch etwas dazu?',
        meaning: 'Ada lagi yang lain?',
        usage: 'Pertanyaan standar penjual toko sebelum menghitung total belanjaan.'
      },
      {
        phrase: 'Das ist alles, danke!',
        meaning: 'Itu saja, terima kasih!',
        usage: 'Ungkapan penutup paling natural untuk menyudahi pesanan Anda.'
      }
    ],
    patternDrill: {
      template: 'Ich nehme bitte [Jumlah] [Barang]. Haben Sie noch [Produk Lain]?',
      phoneticTemplate: 'Ikh neme bite [Jumlah] [Barang]. Haben Zi nokh [Produk Lain]?',
      meaningTemplate: 'Saya ambil [Jumlah] [Barang] tolong. Apakah masih punya [Produk Lain]?',
      slots: [
        { word: 'zwei Croissants / Brezeln', translation: 'dua croissant / pretzel' },
        { word: 'ein Roggenbrot / Käsebrötchen', translation: 'satu roti gandum hitam / roti keju' },
        { word: 'vier Brötchen / Apfelkuchen', translation: 'empat roti bulat / kue apel' }
      ]
    },
    culturalNote: 'Jerman memiliki tradisi roti (*Brotkultur*) yang diakui UNESCO dengan lebih dari 3.000 varian roti. Orang Jerman sarapan dengan *Brötchen* (roti bulat kecil renyah) yang dibeli segar di *Bäckerei* setiap pagi.'
  },

  {
    id: 'shop-02',
    category: 'Belanja',
    level: 'Praktis',
    title: 'Di Supermarket Jerman & Sistem Botol Pfand',
    titleDe: 'Im Supermarkt & das Pfandsystem',
    icon: '🛒',
    summary: 'Menanyakan lokasi barang, kantong belanja (Tüte), dan menukar botol daur ulang (Pfand).',
    dialogue: [
      {
        speaker: 'Kunde (Pembeli)',
        role: 'A',
        de: 'Entschuldigung, wo finde ich hier die Eier und das Olivenöl?',
        phonetic: 'Entsyuldigung, vo finde ikh hir di Alya unt das Oliven-oel?',
        id: 'Permisi, di mana saya bisa menemukan telur dan minyak zaitun di sini?',
        tokens: [
          { de: 'wo finde ich', id: 'di mana saya menemukan' },
          { de: 'die Eier', id: 'telur-telur (plural)', gender: 'pl' },
          { de: 'das Olivenöl', id: 'minyak zaitun', gender: 'das' }
        ]
      },
      {
        speaker: 'Mitarbeiter (Karyawan)',
        role: 'B',
        de: 'Die Eier sind in Gang drei, direkt neben den Milchprodukten. Das Öl ist in Gang fünf.',
        phonetic: 'Di Aya zint in Gang dray, direkt neben den Milkh-produkten. Das Oel ist in Gang fuenf.',
        id: 'Telur ada di lorong 3, tepat di samping produk olahan susu. Minyak ada di lorong 5.',
        tokens: [
          { de: 'in Gang drei', id: 'di lorong 3', gender: 'der' },
          { de: 'neben den Milchprodukten', id: 'di samping produk susu' }
        ]
      },
      {
        speaker: 'Kunde (Pembeli)',
        role: 'A',
        de: 'Vielen Dank! Und wo steht der Pfandautomat für die leeren Flaschen?',
        phonetic: 'Filen Dank! Unt vo stet der Pfand-automat fuer di leren Flasyen?',
        id: 'Terima kasih banyak! Dan di mana mesin otomatis Pfand untuk mengembalikan botol kosong?',
        tokens: [
          { de: 'Vielen Dank', id: 'terima kasih banyak' },
          { de: 'der Pfandautomat', id: 'mesin penukar botol daur ulang berpant', gender: 'der' },
          { de: 'leeren Flaschen', id: 'botol-botol kosong' }
        ]
      },
      {
        speaker: 'Mitarbeiter (Karyawan)',
        role: 'B',
        de: 'Ganz hinten links beim Eingang. Vergessen Sie nicht, den Bon an der Kasse abzugeben!',
        phonetic: 'Gants hinten links baym Ayn-gang. Fagesen Zi nikht, den Bon an der Kase ap-tsu-geben!',
        id: 'Paling belakang sebelah kiri dekat pintu masuk. Jangan lupa serahkan struk kuitansinya di kasir ya!',
        tokens: [
          { de: 'Ganz hinten links', id: 'paling belakang sebelah kiri' },
          { de: 'den Bon an der Kasse abgeben', id: 'menyerahkan kupon struk di meja kasir' }
        ]
      }
    ],
    chunks: [
      {
        phrase: 'Entschuldigung, wo finde ich...?',
        meaning: 'Permisi, di mana saya bisa menemukan...?',
        usage: 'Cara paling sopan bertanya letak rak barang di supermarket seperti Rewe, Edeka, Aldi, atau Lidl.'
      },
      {
        phrase: 'Der Pfandautomat',
        meaning: 'Mesin pengembalian botol Pfand',
        usage: 'Di Jerman, botol plastik dan kaleng minuman memiliki deposit 0,25 Euro yang uangnya bisa diambil kembali lewat mesin ini.'
      },
      {
        phrase: 'Brauchen Sie eine Tüte?',
        meaning: 'Apakah Anda membutuhkan kantong belanja plastik/kertas?',
        usage: 'Kasir Jerman selalu menanyakan ini karena kantong belanja tidak gratis. Warga biasanya membawa tas kain sendiri (Jutebeutel).'
      },
      {
        phrase: 'Mit Karte oder bar?',
        meaning: 'Pakai kartu atau tunai?',
        usage: 'Pertanyaan standar di kasir.'
      }
    ],
    patternDrill: {
      template: 'Entschuldigung, wo finde ich [Barang Supermarket]?',
      phoneticTemplate: 'Entsyuldigung, vo finde ikh [Barang Supermarket]?',
      meaningTemplate: 'Permisi, di mana saya bisa menemukan [Barang Supermarket]?',
      slots: [
        { word: 'die frische Milch (susu segar)', translation: 'susu segar' },
        { word: 'den Zucker (gula pasir)', translation: 'gula pasir' },
        { word: 'das Toilettenpapier (tisu toilet)', translation: 'tisu toilet' },
        { word: 'den Reis (beras)', translation: 'beras putih' }
      ]
    },
    culturalNote: 'Kasir di supermarket Jerman terkenal bergerak sangat cepat (*High-Speed Kasse*)! Begitu barang Anda di-scan, Anda harus segera memasukkannya ke dalam tas tanpa berlambat-lambat agar tidak membuat antrean di belakang menunggu.'
  },

  // ================= TEMA 4: UNTERWEGS & VERKEHR =================
  {
    id: 'travel-01',
    category: 'Transportasi',
    level: 'Menengah',
    title: 'Naik Kereta Api di Stasiun (Hauptbahnhof) & Jalur Peron',
    titleDe: 'Am Hauptbahnhof & Gleis finden',
    icon: '🚆',
    summary: 'Mencari jalur kereta (Gleis), keterlambatan (Verspätung), dan ganti kereta (umsteigen).',
    dialogue: [
      {
        speaker: 'Reisender (Penumpang)',
        role: 'A',
        de: 'Entschuldigung, fährt dieser ICE direkt nach Frankfurt?',
        phonetic: 'Entsyuldigung, fært dizer I-Tse-E direkt nakh Frankfurt?',
        id: 'Permisi, apakah kereta cepat ICE ini berangkat langsung ke Frankfurt?',
        tokens: [
          { de: 'fährt dieser ICE', id: 'apakah kereta ICE ini berjalan/berangkat', gender: 'der' },
          { de: 'direkt nach', id: 'langsung menuju ke' }
        ]
      },
      {
        speaker: 'Bahn-Mitarbeiter (Petugas)',
        role: 'B',
        de: 'Nein, Sie müssen in Hannover einmal umsteigen.',
        phonetic: 'Nayn, Zi muesen in Hanover ayn-mal um-staygen.',
        id: 'Tidak, Anda harus transit ganti kereta sekali di Hannover.',
        tokens: [
          { de: 'Sie müssen', id: 'Anda harus (keharusan)' },
          { de: 'einmal', id: 'satu kali' },
          { de: 'umsteigen', id: 'transit ganti kereta (separable verb)' }
        ]
      },
      {
        speaker: 'Reisender (Penumpang)',
        role: 'A',
        de: 'Ach so, verstehe. Von welchem Gleis fährt der Zug ab?',
        phonetic: 'Akh zo, fasyehe. Fon velkhem Glays fært der Tsug ap?',
        id: 'Oh begitu, saya paham. Dari peron jalur mana kereta itu berangkat?',
        tokens: [
          { de: 'Ach so, verstehe', id: 'oh begitu, saya paham' },
          { de: 'Von welchem Gleis', id: 'dari peron jalur nomor berapa', gender: 'das' },
          { de: 'fährt ab', id: 'berangkat (abfahren)' }
        ]
      },
      {
        speaker: 'Bahn-Mitarbeiter (Petugas)',
        role: 'B',
        de: 'Normalerweise von Gleis 7, aber heute hat er leider zehn Minuten Verspätung.',
        phonetic: 'Normala-vayze fon Glays ziben, aba hoyte hat er layda tsehn Minuten Fashpætung.',
        id: 'Biasanya dari jalur 7, tetapi hari ini sayangnya dia ada keterlambatan sepuluh menit.',
        tokens: [
          { de: 'Normalerweise', id: 'biasanya / secara normal' },
          { de: 'Gleis 7', id: 'jalur peron 7' },
          { de: 'hat Verspätung', id: 'mengalami keterlambatan (delay)', gender: 'die' }
        ]
      }
    ],
    chunks: [
      {
        phrase: 'Fährt dieser Zug nach...?',
        meaning: 'Apakah kereta ini menuju ke...?',
        usage: 'Gunakan ini untuk memastikan Anda tidak salah menaiki gerbong kereta api.'
      },
      {
        phrase: 'Umsteigen (in [Kota])',
        meaning: 'Ganti kereta / transit di [Kota]',
        usage: 'Kata kerja terpisah (*trennbares Verb*): "Ich steige in Hannover um".'
      },
      {
        phrase: 'Von welchem Gleis...?',
        meaning: 'Dari peron jalur berapa...?',
        usage: '"Gleis" adalah istilah peron nomor rel di stasiun Jerman (Deutsche Bahn).'
      },
      {
        phrase: '...hat Verspätung',
        meaning: '...mengalami keterlambatan (delay)',
        usage: 'Frasa yang sangat sering didengar melalui pengeras suara stasiun Jerman.'
      }
    ],
    patternDrill: {
      template: 'Muss ich [Aksi] oder fährt der Zug direkt nach [Tujuan]?',
      phoneticTemplate: 'Mus ikh [Aksi] oda fært der Tsug direkt nakh [Tujuan]?',
      meaningTemplate: 'Haruskah saya [Aksi] atau keretanya jalan langsung ke [Tujuan]?',
      slots: [
        { word: 'umsteigen (transit) / München', translation: 'ganti kereta / Munich' },
        { word: 'das Ticket stempeln (cap tiket) / Köln', translation: 'memvalidasi tiket / Koln' },
        { word: 'den Sitzplatz reservieren (pesan kursi) / Hamburg', translation: 'reservasi kursi / Hamburg' }
      ]
    },
    culturalNote: 'Di stasiun kereta api Jerman (*Hauptbahnhof* / Hbf) tidak ada gerbang palang tiket (*turnstile*). Anda bisa langsung jalan ke peron, tetapi Anda WAJIB memiliki tiket valid karena kondektur (*Zugbegleiter*) akan memeriksa secara acak di dalam gerbong. Denda tanpa tiket (*Schwarzfahren*) mencapai 60 Euro!'
  },

  {
    id: 'travel-02',
    category: 'Transportasi',
    level: 'Dasar',
    title: 'Tersesat & Menanyakan Arah Jalan di Kota',
    titleDe: 'Nach dem Weg fragen',
    icon: '🧭',
    summary: 'Bagaimana menanyakan arah ke tempat wisata, stasiun, belok kiri/kanan, dan lurus terus.',
    dialogue: [
      {
        speaker: 'Tourist (Turis)',
        role: 'A',
        de: 'Entschuldigung, darf ich Sie kurz etwas fragen? Ich habe mich verlaufen.',
        phonetic: 'Entsyuldigung, darf ikh Zi kurts etvas fragen? Ikh habe mikh falawfen.',
        id: 'Permisi, bolehkah saya bertanya sebentar kepada Anda? Saya tersesat.',
        tokens: [
          { de: 'darf ich kurz fragen', id: 'bolehkah saya bertanya sebentar' },
          { de: 'Ich habe mich verlaufen', id: 'saya tersesat jalan' }
        ]
      },
      {
        speaker: 'Passant (Pejalan Kaki)',
        role: 'B',
        de: 'Ja natürlich! Wohin möchten Sie denn?',
        phonetic: 'Ya natyurlikh! Vohin moekhten Zi den?',
        id: 'Ya tentu saja! Memangnya Anda mau pergi ke mana?',
        tokens: [
          { de: 'Ja natürlich', id: 'ya tentu saja' },
          { de: 'Wohin möchten Sie?', id: 'ke mana Anda ingin pergi?' }
        ]
      },
      {
        speaker: 'Tourist (Turis)',
        role: 'A',
        de: 'Wie komme ich von hier zum Brandenburger Tor? Ist es weit zu Fuß?',
        phonetic: 'Vi kome ikh fon hir tsum Brandenburga Tor? Ist es vayt tsu Fus?',
        id: 'Bagaimana cara saya dari sini menuju ke Gerbang Brandenburg? Apakah jauh jika jalan kaki?',
        tokens: [
          { de: 'Wie komme ich zu', id: 'bagaimana saya sampai ke' },
          { de: 'zum Brandenburger Tor', id: 'ke Gerbang Brandenburg', gender: 'das' },
          { de: 'Ist es weit zu Fuß?', id: 'apakah jauh jalan kaki?' }
        ]
      },
      {
        speaker: 'Passant (Pejalan Kaki)',
        role: 'B',
        de: 'Nein, gar nicht weit! Gehen Sie einfach geradeaus, an der Ampel biegen Sie rechts ab. Nach zweihundert Metern sehen Sie es schon.',
        phonetic: 'Nayn, gar nikht vayt! Gehen Zi aynfakh gerade-aus, an der Ampel bigen Zi rekhts ap. Nakh tsvay-hundat Metern zehen Zi es syon.',
        id: 'Tidak, sama sekali tidak jauh! Jalan saja lurus terus, di lampu merah belok ke kanan. Setelah 200 meter Anda sudah akan melihatnya.',
        tokens: [
          { de: 'gar nicht weit', id: 'sama sekali tidak jauh' },
          { de: 'geradeaus', id: 'lurus terus' },
          { de: 'an der Ampel', id: 'di lampu merah lalu lintas', gender: 'die' },
          { de: 'biegen Sie rechts ab', id: 'beloklah ke kanan' }
        ]
      }
    ],
    chunks: [
      {
        phrase: 'Wie komme ich zu...?',
        meaning: 'Bagaimana cara saya menuju ke...?',
        usage: 'Pola paling lazim menanyakan rute: "Wie komme ich zum Bahnhof / zur Apotheke?".'
      },
      {
        phrase: 'Geradeaus / Rechts / Links',
        meaning: 'Lurus terus / Kanan / Kiri',
        usage: 'Tiga arah petunjuk navigasi dasar dalam bahasa Jerman.'
      },
      {
        phrase: 'Ist es weit zu Fuß?',
        meaning: 'Apakah jauh ditempuh dengan jalan kaki?',
        usage: 'Untuk memastikan apakah perlu naik bus/U-Bahn atau cukup berjalan kaki.'
      },
      {
        phrase: 'Ich habe mich verlaufen',
        meaning: 'Saya tersesat jalan',
        usage: 'Frasa penjelas keadaan saat meminta bantuan orang lokal di jalan.'
      }
    ],
    patternDrill: {
      template: 'Gehen Sie [Petunjuk Arah] und dann [Aksi Belok].',
      phoneticTemplate: 'Gehen Zi [Petunjuk Arah] unt dan [Aksi Belok].',
      meaningTemplate: 'Jalanlah [Petunjuk Arah] dan kemudian [Aksi Belok].',
      slots: [
        { word: 'geradeaus (lurus terus) / biegen Sie links ab (belok kiri)', translation: 'lurus terus / belok ke kiri' },
        { word: 'bis zur Kreuzung (sampai perempatan) / biegen Sie rechts ab (belok kanan)', translation: 'sampai perempatan / belok ke kanan' },
        { word: 'an der Kirche vorbei (melewati gereja) / sehen Sie die U-Bahn (Anda lihat stasiun MRT)', translation: 'melewati gereja / melihat stasiun' }
      ]
    },
    culturalNote: 'Masyarakat Jerman sangat menghormati rambu penyeberangan jalan (*Ampel*). Menyeberang jalan saat lampu pejalan kaki masih merah (*bei Rot über die Ampel gehen*) sangat dipandang negatif secara sosial, apalagi jika di sekitar situ ada anak-anak kecil!'
  },

  // ================= TEMA 5: ALLTAG & VERABREDUNGEN =================
  {
    id: 'daily-01',
    category: 'Kehidupan Harian',
    level: 'Dasar',
    title: 'Mengajak Teman Janjian di Akhir Pekan',
    titleDe: 'Verabredung am Wochenende',
    icon: '🗓️',
    summary: 'Bagaimana merencanakan janji temu, menentukan jam, dan budaya ketepatan waktu Jerman.',
    dialogue: [
      {
        speaker: 'Felix',
        role: 'A',
        de: 'Hi Jonas! Was machst du schönes am Wochenende? Hast du Lust ins Kino zu gehen?',
        phonetic: 'Hay Yonas! Vas makhst du syoenes am Vokhen-ende? Hast du Lust ins Kino tsu gehen?',
        id: 'Hai Jonas! Lagi ada rencana asyik apa akhir pekan ini? Ada minat mau nonton ke bioskop?',
        tokens: [
          { de: 'Was machst du am Wochenende?', id: 'apa yang kamu lakukan akhir pekan ini?', gender: 'das' },
          { de: 'Hast du Lust...?', id: 'apakah kamu berminat / ada kemauan...?' },
          { de: 'ins Kino zu gehen', id: 'pergi ke bioskop', gender: 'das' }
        ]
      },
      {
        speaker: 'Jonas',
        role: 'B',
        de: 'Klingt super! Ich habe am Samstagabend noch nichts vor. Welcher Film läuft denn?',
        phonetic: 'Klinkt zupa! Ikh habe am Zamstak-abent nokh nikhts for. Velkha Film loyft den?',
        id: 'Kedengarannya mantap! Aku malam Minggu belum ada acara apa-apa. Film apa memangnya yang lagi tayang?',
        tokens: [
          { de: 'Klingt super!', id: 'kedengarannya keren!' },
          { de: 'nichts vorhaben', id: 'tidak ada rencana agenda' },
          { de: 'Welcher Film läuft?', id: 'film apa yang sedang tayang/putar?', gender: 'der' }
        ]
      },
      {
        speaker: 'Felix',
        role: 'A',
        de: 'Der neue Science-Fiction-Film. Wann wollen wir uns treffen? Passt dir neunzehn Uhr?',
        phonetic: 'Der noye Science-Fiction-Film. Van volen vir uns trefen? Past dir noyntsehn Ur?',
        id: 'Film fiksi ilmiah terbaru. Kapan kita mau ketemuan? Jam 19:00 (tujuh malam) cocok buatmu?',
        tokens: [
          { de: 'Wann wollen wir uns treffen?', id: 'kapan kita mau saling bertemu?' },
          { de: 'Passt dir...?', id: 'apakah cocok waktu tersebut buatmu?' },
          { de: 'neunzehn Uhr', id: 'jam 19.00 malam' }
        ]
      },
      {
        speaker: 'Jonas',
        role: 'B',
        de: 'Neunzehn Uhr passt mir perfekt. Lass uns direkt vor dem Kinoeingang treffen. Bitte sei pünktlich!',
        phonetic: 'Noyntsehn Ur past mir perfekt. Las uns direkt for dem Kino-ayn-gang trefen. Bite zay puenktlikh!',
        id: 'Jam 19:00 pas banget buatku. Ayo kita langsung ketemu di depan pintu masuk bioskop. Tolong tepat waktu ya!',
        tokens: [
          { de: 'passt mir perfekt', id: 'sangat cocok / pas sekali buatku' },
          { de: 'Lass uns treffen', id: 'ayo kita bertemu' },
          { de: 'Bitte sei pünktlich!', id: 'tolong tepat waktulah!' }
        ]
      }
    ],
    chunks: [
      {
        phrase: 'Hast du Lust auf... / Lust zu...?',
        meaning: 'Apakah kamu ada minat/mood untuk...?',
        usage: 'Cara paling asyik dan kasual mengajak teman beraktivitas.'
      },
      {
        phrase: 'Klingt super! / Klingt gut!',
        meaning: 'Kedengarannya keren! / Asyik tuh!',
        usage: 'Respon antusias yang sering terdengar dalam obrolan sehari-hari.'
      },
      {
        phrase: 'Passt es dir? / Passt dir das?',
        meaning: 'Apakah waktunya cocok untukmu?',
        usage: 'Cara menanyakan apakah jadwal waktu tersebut bisa diterima oleh teman Anda.'
      },
      {
        phrase: 'Pünktlich sein',
        meaning: 'Tepat waktu',
        usage: 'Nilai sosial tertinggi di Jerman. Terlambat 5 menit tanpa kabar dianggap sangat tidak sopan.'
      }
    ],
    patternDrill: {
      template: 'Passt dir [Waktu] um [Jam] Uhr?',
      phoneticTemplate: 'Past dir [Waktu] um [Jam] Ur?',
      meaningTemplate: 'Apakah cocok untukmu hari [Waktu] jam [Jam]?',
      slots: [
        { word: 'am Samstag (hari Sabtu) / 18', translation: 'Sabtu / jam 18:00' },
        { word: 'am Sonntag (hari Minggu) / 14', translation: 'Minggu / jam 14:00' },
        { word: 'morgen (besok) / 20', translation: 'besok / jam 20:00' },
        { word: 'am Freitag (hari Jumat) / 19', translation: 'Jumat / jam 19:00' }
      ]
    },
    culturalNote: 'Pepatah Jerman terkenal: "Fünf Minuten vor der Zeit ist des Deutschen Pünktlichkeit" (Lima menit sebelum waktu yang ditentukan adalah ketepatan waktu orang Jerman). Hadirlah tepat waktu atau 5 menit lebih awal saat membuat janji temu!'
  },

  // ================= TEMA 6: GESUNDHEIT & APOTHEKE =================
  {
    id: 'health-01',
    category: 'Kesehatan',
    level: 'Praktis',
    title: 'Di Apotek: Mengeluhkan Masuk Angin & Obat Sakit Kepala',
    titleDe: 'In der Apotheke & Symptome beschreiben',
    icon: '💊',
    summary: 'Bagaimana menceritakan gejala flu, demam, tenggorokan sakit, dan resep minum obat.',
    dialogue: [
      {
        speaker: 'Apothekerin (Apoteker)',
        role: 'A',
        de: 'Guten Tag! Wie kann ich Ihnen helfen?',
        phonetic: 'Guten Tak! Vi kan ikh Inen helfen?',
        id: 'Selamat siang! Bagaimana saya bisa membantu Anda?',
        tokens: [
          { de: 'Wie kann ich Ihnen helfen?', id: 'bagaimana saya bisa membantu Anda?' }
        ]
      },
      {
        speaker: 'Kunde (Pasien)',
        role: 'B',
        de: 'Guten Tag. Ich fühle mich seit zwei Tagen gar nicht gut. Ich habe starke Kopfschmerzen und Halsschmerzen.',
        phonetic: 'Guten Tak. Ikh fyehle mikh zayt tsvay Tagen gar nikht gut. Ikh habe sytarke Kopf-symaertsen unt Hals-symaertsen.',
        id: 'Selamat siang. Saya merasa sama sekali tidak enak badan sejak dua hari lalu. Saya mengalami sakit kepala parah dan radang tenggorokan.',
        tokens: [
          { de: 'Ich fühle mich nicht gut', id: 'saya merasa tidak enak badan' },
          { de: 'seit zwei Tagen', id: 'sejak dua hari belakangan' },
          { de: 'Kopfschmerzen', id: 'sakit kepala / pusing', gender: 'pl' },
          { de: 'Halsschmerzen', id: 'sakit tenggorokan', gender: 'pl' }
        ]
      },
      {
        speaker: 'Apothekerin (Apoteker)',
        role: 'A',
        de: 'Haben Sie auch Fieber gemessen? Müssen Sie husten?',
        phonetic: 'Haben Zi aukh Fiba geme-sen? Muesen Zi husten?',
        id: 'Apakah Anda juga sudah mengukur demam panas tubuh? Apakah Anda batuk-batuk?',
        tokens: [
          { de: 'Fieber gemessen', id: 'mengukur demam suhu tubuh', gender: 'das' },
          { de: 'husten', id: 'batuk' }
        ]
      },
      {
        speaker: 'Kunde (Pasien)',
        role: 'B',
        de: 'Leichtes Fieber, etwa 38 Grad. Haben Sie etwas Wirksames dagegen?',
        phonetic: 'Laykhtes Fiba, etva akht-unt-dray-sikh Grat. Haben Zi etvas virk-zames da-gegen?',
        id: 'Demam ringan, sekitar 38 derajat. Apakah Anda punya obat yang manjur untuk mengatasi ini?',
        tokens: [
          { de: 'Leichtes Fieber', id: 'demam ringan' },
          { de: 'etwas Wirksames dagegen', id: 'sesuatu yang manjur/efektif mengatasinya' }
        ]
      },
      {
        speaker: 'Apothekerin (Apoteker)',
        role: 'A',
        de: 'Ich empfehle Ihnen diese Tabletten gegen Schmerzen und Fieber. Nehmen Sie dreimal täglich eine Tablette nach dem Essen mit reichlich Wasser.',
        phonetic: 'Ikh empfele Inen dize Tableten gegen Symaertsen unt Fiba. Nemen Zi dray-mal tæklikhor ayne Tablette nakh dem Esen mit raykh-likh Vasa.',
        id: 'Saya sarankan tablet ini untuk nyeri dan demam. Minumlah satu tablet tiga kali sehari sesudah makan dengan banyak air putih.',
        tokens: [
          { de: 'Ich empfehle Ihnen', id: 'saya rekomendasikan/sarankan kepada Anda' },
          { de: 'dreimal täglich', id: 'tiga kali dalam sehari' },
          { de: 'nach dem Essen', id: 'setelah makan' },
          { de: 'mit reichlich Wasser', id: 'dengan banyak air' }
        ]
      }
    ],
    chunks: [
      {
        phrase: 'Ich habe [Anggota Tubuh] + schmerzen',
        meaning: 'Saya sakit [Bagian Tubuh]',
        usage: 'Formula bahasa Jerman: Kopfschmerzen (kepala), Halsschmerzen (tenggorokan), Bauchschmerzen (perut), Rückenschmerzen (punggung).'
      },
      {
        phrase: 'Ich fühle mich nicht wohl / gar nicht gut',
        meaning: 'Saya merasa tidak sehat / kurang fit',
        usage: 'Untuk menyatakan kondisi badan yang drop.'
      },
      {
        phrase: 'Dreimal täglich eine Tablette',
        meaning: 'Satu tablet tiga kali sehari',
        usage: 'Petunjuk dosis standar dari apoteker Jerman.'
      },
      {
        phrase: 'Gute Besserung!',
        meaning: 'Lekas sembuh! / Semoga lekas pulih!',
        usage: 'Ucapan wajib ketika mengetahui seseorang sedang sakit.'
      }
    ],
    patternDrill: {
      template: 'Ich habe seit gestern [Gejala Sakit]. Haben Sie [Jenis Obat] dagegen?',
      phoneticTemplate: 'Ikh habe zayt gestan [Gejala Sakit]. Haben Zi [Jenis Obat] da-gegen?',
      meaningTemplate: 'Saya sejak kemarin mengalami [Gejala Sakit]. Apakah ada [Jenis Obat] untuk mengatasinya?',
      slots: [
        { word: 'Kopfschmerzen (sakit kepala) / Schmerztabletten (obat pereda nyeri)', translation: 'sakit kepala / tablet pereda nyeri' },
        { word: 'Halsschmerzen (radang tenggorokan) / Halspastillen (permen pelega tenggorokan)', translation: 'sakit tenggorokan / tablet hisap' },
        { word: 'Bauchschmerzen (sakit perut) / Magentropfen (tetes obat maag)', translation: 'sakit lambung/perut / obat tetes maag' }
      ]
    },
    culturalNote: 'Di Jerman, obat tidak bisa dibeli di supermarket biasa. Anda harus ke *Apotheke* (dikenal dengan lambang huruf "A" merah besar). Sebagian besar antibiotik memerlukan resep dokter (*Rezept*), tetapi obat flu dan pereda demam ringan tersedia bebas (*rezeptfrei*).'
  },

  // ================= TEMA 7: DEUTSCHE REDEWENDUNGEN & SLANG =================
  {
    id: 'slang-01',
    category: 'Ungkapan Gaul',
    level: 'Menengah',
    title: 'Slang Jerman Sehari-hari: "Kein Bock", "Alles klar", & "Na?"',
    titleDe: 'Umgangssprache & Typisch Deutsch',
    icon: '🔥',
    summary: 'Ungkapan gaul paling sering diucapkan anak muda dan warga Jerman di kehidupan nyata.',
    dialogue: [
      {
        speaker: 'Tim',
        role: 'A',
        de: 'Na, wie läuft\'s? Hast du Lust heute Abend mit auf die Party zu kommen?',
        phonetic: 'Na, vi loyfts? Hast du Lust hoyte Abent mit auf di Parti tsu komen?',
        id: 'Na, gimana kabarnya? Kamu mau ikut datang ke pesta nanti malam nggak?',
        tokens: [
          { de: 'Na?', id: 'sapaan super singkat khas Jerman ("hai, gimana?")' },
          { de: 'wie läuft\'s?', id: 'bagaimana kelanjutannya / apa kabar?' }
        ]
      },
      {
        speaker: 'Sara',
        role: 'B',
        de: 'Ehrlich gesagt habe ich heute echt null Bock. Ich bin total kaputt von der Arbeit.',
        phonetic: 'Er-likh gezakt habe ikh hoyte ekht nul Bok. Ikh bin total kaput fon der Arbayt.',
        id: 'Jujur aja hari ini aku bener-bener lagi nggak ada mood / mager parah (null Bock). Aku capek banget karena kerjaan.',
        tokens: [
          { de: 'Ehrlich gesagt', id: 'sejujurnya / jujur saja' },
          { de: 'null Bock haben', id: 'mager banget / tidak ada mood sama sekali (slang)' },
          { de: 'total kaputt', id: 'capek remuk / lelah sekali' }
        ]
      },
      {
        speaker: 'Tim',
        role: 'A',
        de: 'Alles klar, kein Problem! Ruh dich schön aus. Wir sehen uns nächste Woche, genau?',
        phonetic: 'Ales klar, kayn Problem! Ru dikh syoen aus. Vir zehen uns nækhste Vokhe, genaw?',
        id: 'Semuanya beres, nggak masalah! Istirahatlah dengan baik ya. Kita ketemu minggu depan, kan?',
        tokens: [
          { de: 'Alles klar', id: 'beres / oke paham / no problem' },
          { de: 'Ruh dich aus', id: 'istirahatlah' },
          { de: 'genau?', id: 'bukan? / tepat kan?' }
        ]
      },
      {
        speaker: 'Sara',
        role: 'B',
        de: 'Genau! Mach\'s gut und feiert schön!',
        phonetic: 'Genaw! Makhs gut unt fayat syoen!',
        id: 'Tepat sekali! Jaga diri baik-baik (take care) dan selamat bersenang-senang di pesta!',
        tokens: [
          { de: 'Genau!', id: 'persis! / betul sekali!' },
          { de: 'Mach\'s gut!', id: 'jaga diri baik-baik! (take care / bye)' },
          { de: 'feiert schön', id: 'selamat berpesta bersenang-senang' }
        ]
      }
    ],
    chunks: [
      {
        phrase: 'Na?',
        meaning: 'Hai! / Gimana kabarmu? / Apa kabar?',
        usage: 'Kata satu suku kata serbaguna paling Jerman sedunia. Bisa berfungsi sebagai sapaan, pertanyaan, sekaligus respon.'
      },
      {
        phrase: 'Kein Bock haben / Null Bock',
        meaning: 'Mager / Nggak ada mood sama sekali (I don\'t feel like it)',
        usage: 'Slang anak muda nomor satu di Jerman. "Ich habe keinen Bock" = Aku nggak minat/mager.'
      },
      {
        phrase: 'Alles klar!',
        meaning: 'Semuanya beres! / Oke paham! / Paham!',
        usage: 'Kata sakti yang digunakan untuk mengonfirmasi pemahaman atau menyetujui situasi.'
      },
      {
        phrase: 'Genau! (dibaca: ge-na-u)',
        meaning: 'Tepat sekali! / Betul! / Exactly!',
        usage: 'Kata yang paling sering diulang orang Jerman saat mendengarkan obrolan orang lain untuk menunjukkan mereka menyimak.'
      },
      {
        phrase: 'Mach\'s gut!',
        meaning: 'Jaga diri baik-baik! (Take care!)',
        usage: 'Salam perpisahan santai antar teman akrab.'
      }
    ],
    patternDrill: {
      template: 'Ich habe heute [Tingkat Mood] auf [Kegiatan], weil ich [Alasan] bin.',
      phoneticTemplate: 'Ikh habe hoyte [Tingkat Mood] auf [Kegiatan], vayl ikh [Alasan] bin.',
      meaningTemplate: 'Saya hari ini [Tingkat Mood] untuk [Kegiatan], karena saya [Alasan].',
      slots: [
        { word: 'echt keinen Bock (beneran mager) / Sport (olahraga) / müde (mengantuk)', translation: 'mager parah / olahraga / mengantuk' },
        { word: 'total Lust (pengen banget) / Pizza (makan pizza) / hungrig (lapar)', translation: 'pengen banget / makan pizza / lapar' },
        { word: 'keine Zeit (tidak ada waktu) / Lernen (belajar) / beschäftigt (sibuk)', translation: 'tidak ada waktu / belajar / sibuk' }
      ]
    },
    culturalNote: 'Kata "Genau" diucapkan orang Jerman ratusan kali sehari dalam percakapan sebagai *feedback* aktif. Jika Anda sering mengangguk dan berkata "Genau", percakapan Anda akan terdengar sangat fasih dan menyatu dengan native speakers!'
  }
];

// Kategori percakapan untuk navigasi filter
export const CATEGORIES = [
  { id: 'all', label: 'Semua Percakapan', icon: '🇩🇪' },
  { id: 'Perkenalan', label: 'Perkenalan', icon: '👋' },
  { id: 'Kafe & Resto', label: 'Kafe & Restoran', icon: '☕' },
  { id: 'Belanja', label: 'Belanja & Toko Roti', icon: '🥖' },
  { id: 'Transportasi', label: 'Kereta & Petunjuk Arah', icon: '🚆' },
  { id: 'Kehidupan Harian', label: 'Kehidupan & Janjian', icon: '🗓️' },
  { id: 'Kesehatan', label: 'Apotek & Kesehatan', icon: '💊' },
  { id: 'Ungkapan Gaul', label: 'Slang & Idiom Populer', icon: '🔥' }
];

export const LEVELS = ['Semua Level', 'Dasar', 'Menengah', 'Praktis'];
