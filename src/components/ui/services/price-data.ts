export type PriceOption = {
  id: string;
  label: string;
  price: string;
  detail: string;
};

export type ServiceDetailSection = {
  title: string;
  items: string[];
};

export type Service = {
  id: string;
  title: string;
  category: string;
  multiplier: string;
  description: string;
  duration: string;
  basePrice: string;
  options: PriceOption[];
  includes: string[];
  detailSections: ServiceDetailSection[];
};

export type CampaignItem = {
  title: string;
  description: string;
};

export type AdditionalService = {
  id: string;
  label: string;
};

export const services: Service[] = [
  {
    id: "hafif-temizlik",
    title: "Hafif Temizlik",
    category: "Duzenli Temizlik",
    multiplier: "1x",
    description:
      "Haftada 1-2 kez duzenli temizlik isteyen evler icin yuzeyleri temiz ve ferah tutan bakim hizmeti.",
    duration: "3-5 saat",
    basePrice: "2.700 TL",
    options: [
      { id: "1-1", label: "1+1", price: "2.700 TL", detail: "Kompakt evler icin" },
      { id: "2-1", label: "2+1", price: "3.700 TL", detail: "Orta olcekli evler icin" },
      { id: "3-1", label: "3+1", price: "4.700 TL", detail: "Genis aile evleri icin" },
      { id: "4-1", label: "4+1", price: "5.700 TL", detail: "Buyuk evler icin" },
      { id: "ozel", label: "Diger", price: "Teklif aliniz", detail: "Ozel metrekare ve planlar" },
    ],
    includes: ["Ulasilabilir yuzeylerde toz alma", "Zemin supurme ve silme", "Mutfak ve banyo yuzeyleri"],
    detailSections: [
      {
        title: "Tum odalar",
        items: [
          "Ulasilabilir yuzeylerde toz alma",
          "Mobilya ve dekor urunlerini silme",
          "Hali ve zeminleri supurme",
          "Zeminleri silme",
          "Cop cikarma",
          "Ayna temizligi",
          "Hafif kirleri giderme",
          "Anahtar ve kapi kollarini silme",
        ],
      },
      {
        title: "Mutfak",
        items: [
          "Tezgahlari silme",
          "Lavabo temizligi",
          "Mutfak dolabi dis yuzeylerini silme",
          "Beyaz esya dis yuzey temizligi",
          "Ocak dis yuzey temizligi",
          "Hafif yag temizligi",
          "Zemin silme",
        ],
      },
      {
        title: "Banyo",
        items: [
          "Klozet temizligi",
          "Lavabo temizligi",
          "Ayna silme",
          "Dus veya kuvet temizligi",
          "Yuzey dezenfeksiyonu",
          "Zemin silme",
        ],
      },
    ],
  },
  {
    id: "detayli-temizlik",
    title: "Detayli Temizlik",
    category: "Derin Temizlik",
    multiplier: "1,5-2x",
    description:
      "Birikmis kir, yag, toz ve kirec izlerini gidermek icin tum alanlarda kapsamli temizlik.",
    duration: "5-8 saat",
    basePrice: "4.000 TL",
    options: [
      { id: "1-1", label: "1+1", price: "4.000 TL", detail: "Detayli baslangic paketi" },
      { id: "2-1", label: "2+1", price: "5.500 TL", detail: "Dengeli kapsam" },
      { id: "3-1", label: "3+1", price: "7.000 TL", detail: "Genis kapsamli temizlik" },
      { id: "4-1", label: "4+1", price: "8.500 TL", detail: "Buyuk alan plani" },
      { id: "ozel", label: "Diger", price: "Teklif aliniz", detail: "Ozel planlama" },
    ],
    includes: ["Hafif temizlige ek kapsam", "Zor alan ve kose temizligi", "Yag ve kirec giderme"],
    detailSections: [
      {
        title: "Tum odalar",
        items: [
          "Hafif temizlik kapsamindaki tum islemler",
          "Supurgelik temizligi",
          "Kapi ve kapi cercevelerini silme",
          "Ulasilmasi zor alanlari temizleme",
          "Orumcek agi temizligi",
          "Havalandirma izgaralarini temizleme",
          "Aydinlatmalari silme",
          "Mobilya altlarini temizleme",
          "Kose ve birlesim noktalarini detayli temizleme",
          "Pencere pervazlarini silme",
          "Zeminlerde derin temizlik",
        ],
      },
      {
        title: "Mutfak",
        items: [
          "Ocakta derin temizlik",
          "Davlumbaz temizligi",
          "Mikrodalga ic ve dis temizligi",
          "Mutfak yuzeylerinde yag cozme",
          "Mutfak arasi fayans temizligi",
          "Dolap dis yuzeylerini temizleme",
          "Talebe gore dolap ici temizligi",
          "Buzdolabi dis temizligi",
          "Lavabo dezenfeksiyonu",
          "Yag ve leke giderme",
        ],
      },
      {
        title: "Banyo",
        items: [
          "Fayans ve derzlerde derin temizlik",
          "Kirec giderme",
          "Dus kabini temizligi",
          "Detayli dezenfeksiyon",
          "Zor alan temizligi",
          "Havalandirma temizligi",
          "Batarya parlatma",
        ],
      },
    ],
  },
  {
    id: "insaat-sonrasi-temizlik",
    title: "Insaat Sonrasi Temizlik",
    category: "Tadilat Sonrasi",
    multiplier: "2,5-4x",
    description:
      "Insaat ve tadilat sonrasi toz, boya izi, cimento kalintisi ve kaba kirlerin temizlenmesi.",
    duration: "6-10 saat",
    basePrice: "6.000 TL",
    options: [
      { id: "1-1", label: "1+1", price: "6.000 TL", detail: "Baslangic fiyati" },
      { id: "2-1", label: "2+1", price: "7.000 TL", detail: "Baslangic fiyati" },
      { id: "3-1", label: "3+1", price: "8.000 TL", detail: "Baslangic fiyati" },
      { id: "4-1", label: "4+1", price: "9.000 TL", detail: "Baslangic fiyati" },
      { id: "ozel", label: "Diger", price: "Teklif aliniz", detail: "Kesif sonrasi fiyat" },
    ],
    includes: ["Ince insaat tozu temizligi", "Boya ve yapistirici izi giderme", "Profesyonel zemin temizligi"],
    detailSections: [
      {
        title: "Tum alanlar",
        items: [
          "Insaat tozunu giderme",
          "Tum yuzeyleri vakumlama",
          "Duvar ve kapilari silme",
          "Supurgelik temizligi",
          "Cam ve cerceve temizligi",
          "Pencere pervazlarini temizleme",
          "Boya ve yapistirici izlerini giderme",
          "Anahtar ve priz temizligi",
          "Profesyonel urunlerle zemin yikama",
          "Dolap ici ve disi temizligi",
          "Aydinlatma temizligi",
        ],
      },
      {
        title: "Mutfak",
        items: [
          "Cihazlardaki insaat tozunu giderme",
          "Mutfak dolaplarini temizleme",
          "Yuzeylerde yag cozme",
          "Lavabo ve batarya temizligi",
        ],
      },
      {
        title: "Banyo",
        items: [
          "Cimento tozunu giderme",
          "Tadilat sonrasi fayans temizligi",
          "Insaat kaynakli kirleri giderme",
          "Saniter alanlarda tam dezenfeksiyon",
        ],
      },
    ],
  },
  {
    id: "tasinma-temizligi",
    title: "Tasinma Oncesi / Sonrasi Temizlik",
    category: "Bos Ev Hazirligi",
    multiplier: "1,7-2,2x",
    description:
      "Yeni tasinma, ev teslimi veya kiraci degisimi oncesi bos alanlari kullanima hazir hale getiren kapsamli temizlik.",
    duration: "5-9 saat",
    basePrice: "Teklif aliniz",
    options: [
      { id: "bos-daire", label: "Bos daire", price: "Teklif aliniz", detail: "Tasinma oncesi hazirlik" },
      { id: "teslim", label: "Ev teslimi", price: "Teklif aliniz", detail: "Kiraci degisimi veya satis oncesi" },
      { id: "ozel", label: "Ozel plan", price: "Teklif aliniz", detail: "Alan durumuna gore" },
    ],
    includes: ["Bos alan temizligi", "Dolap icleri", "Kapi, duvar ve zemin detaylari"],
    detailSections: [
      {
        title: "Tum odalar",
        items: [
          "Alani tamamen temizleme",
          "Zeminleri yikama",
          "Supurgelik temizligi",
          "Duvar ve kapilari silme",
          "Camlari icten silme",
          "Dolap iclerini temizleme",
          "Tum yuzeylerde toz alma",
          "Kapi kollari ve anahtarlari dezenfekte etme",
          "Kose ve zor alanlari temizleme",
        ],
      },
      {
        title: "Mutfak",
        items: [
          "Mutfagi icten ve distan temizleme",
          "Dolap temizligi",
          "Tezgah silme",
          "Beyaz esya temizligi",
          "Ocak ve firin temizligi",
          "Lavabo dezenfeksiyonu",
        ],
      },
      {
        title: "Banyo",
        items: [
          "Tam dezenfeksiyon",
          "Sihhi tesisat urunlerini temizleme",
          "Kirec giderme",
          "Dus veya kuvet temizligi",
          "Ayna temizligi",
          "Fayans ve derz temizligi",
        ],
      },
    ],
  },
  {
    id: "koltuk-yikama",
    title: "Koltuk Yikama",
    category: "Kumas Bakimi",
    multiplier: "Parca bazli",
    description: "Koltuk ve oturma gruplarinda leke on islemi, yikama ve vakumlu kurutma.",
    duration: "1-3 saat",
    basePrice: "600 TL",
    options: [
      { id: "tekli", label: "1 kisilik", price: "600 TL", detail: "Tekli koltuk" },
      { id: "ikili", label: "2 kisilik", price: "900 TL", detail: "Ikili koltuk" },
      { id: "uclu", label: "3 kisilik", price: "1.200 TL", detail: "Uclu koltuk" },
      { id: "dortlu", label: "4 kisilik", price: "1.500 TL", detail: "Genis oturma alani" },
      { id: "ozel", label: "Diger", price: "Teklif aliniz", detail: "Ozel olculer" },
    ],
    includes: ["Leke on islemi", "Kumas yikama", "Vakumlu kurutma"],
    detailSections: [
      {
        title: "Kapsam",
        items: ["Kumas kontrolu", "Leke on islemi", "Profesyonel yikama", "Vakumlu kurutma", "Koku giderme"],
      },
    ],
  },
  {
    id: "yatak-yikama",
    title: "Yatak Yikama",
    category: "Hijyen Bakimi",
    multiplier: "Olcu bazli",
    description: "Yatak yuzeylerinde hijyen, ferahlik ve derin temizlik saglayan bakim.",
    duration: "1-2 saat",
    basePrice: "1.000 TL",
    options: [
      { id: "tek", label: "Tek kisilik", price: "1.000 TL", detail: "Standart yatak" },
      { id: "cift", label: "Cift kisilik", price: "1.500 TL", detail: "Genis yatak" },
      { id: "ozel", label: "Diger", price: "Teklif aliniz", detail: "Ozel olculer" },
    ],
    includes: ["Yuzey hijyeni", "Koku giderme", "Vakumlu temizlik"],
    detailSections: [
      {
        title: "Kapsam",
        items: ["Yatak yuzey kontrolu", "Derin vakumlama", "Kumas yuzey temizligi", "Koku giderme", "Hijyen bakimi"],
      },
    ],
  },
  {
    id: "sandalye-yikama",
    title: "Sandalye Yikama",
    category: "Kumas Bakimi",
    multiplier: "Adet bazli",
    description: "Ev, ofis ve isletme sandalyeleri icin hizli ve duzenli kumas temizligi.",
    duration: "1-2 saat",
    basePrice: "300 TL",
    options: [
      { id: "standart", label: "Standart boy", price: "300 TL", detail: "Tek sandalye" },
      { id: "buyuk", label: "Buyuk boy", price: "450 TL", detail: "Genis oturum" },
      { id: "ozel", label: "Diger", price: "Teklif aliniz", detail: "Toplu adetler" },
    ],
    includes: ["Kumas temizligi", "Leke on islemi", "Hizli kuruma"],
    detailSections: [
      {
        title: "Kapsam",
        items: ["Kumas kontrolu", "Leke on islemi", "Yikama", "Vakumlu kurutma", "Toplu adet planlama"],
      },
    ],
  },
  {
    id: "puf-yikama",
    title: "Puf Yikama",
    category: "Kumas Bakimi",
    multiplier: "Parca bazli",
    description: "Puf ve tamamlayici oturma urunleri icin ozel kumas bakimi.",
    duration: "1 saat",
    basePrice: "400 TL",
    options: [
      { id: "standart", label: "Standart boy", price: "400 TL", detail: "Tek puf" },
      { id: "buyuk", label: "Buyuk boy", price: "500 TL", detail: "Genis puf" },
      { id: "ozel", label: "Diger", price: "Teklif aliniz", detail: "Ozel olculer" },
    ],
    includes: ["Kumas bakimi", "Leke on islemi", "Koku giderme"],
    detailSections: [
      {
        title: "Kapsam",
        items: ["Kumas kontrolu", "Leke on islemi", "Profesyonel yikama", "Vakumlu kurutma", "Koku giderme"],
      },
    ],
  },
  {
    id: "hali-yikama",
    title: "Hali Yikama",
    category: "Metrekare Hizmeti",
    multiplier: "m2 bazli",
    description: "Hali yapisi ve kirlilik durumuna gore profesyonel temizlik ve teslim plani.",
    duration: "Planli teslim",
    basePrice: "450-550 TL / m2",
    options: [
      { id: "metrekare", label: "Metrekare", price: "450-550 TL / m2", detail: "Malzeme ve kirlilige gore" },
      { id: "toplu", label: "Toplu hali", price: "Teklif aliniz", detail: "Birden fazla hali icin" },
    ],
    includes: ["Malzeme kontrolu", "Derin yikama", "Teslim plani"],
    detailSections: [
      {
        title: "Kapsam",
        items: ["Hali malzeme kontrolu", "Kirlilik seviyesi degerlendirmesi", "Derin yikama", "Koku giderme", "Teslim planlama"],
      },
    ],
  },
];

export const additionalServices: AdditionalService[] = [
  { id: "cam", label: "Camlari iki taraftan yikama" },
  { id: "koltuk-matras", label: "Koltuk ve yatak yikama" },
  { id: "utu", label: "Kiyafet utuleme" },
  { id: "balkon", label: "Balkon temizligi" },
  { id: "buzdolabi", label: "Buzdolabi ic temizligi" },
  { id: "firin", label: "Firin ic temizligi" },
  { id: "evcil", label: "Evcil hayvan sonrasi temizlik" },
  { id: "ozon", label: "Ozonlama" },
  { id: "agir-kir", label: "Yogun kir giderme" },
  { id: "ofis", label: "Ofis ve ticari alan temizligi" },
];

export const campaignItems: CampaignItem[] = [
  {
    title: "Ilk hizmet hediyesi",
    description: "Ilk kez rezervasyon olusturan musterilerimize kucuk bir hos geldiniz hediyesi sunulur.",
  },
  {
    title: "Toplu talep avantaji",
    description: "Buyuk veya grup siparislerinde indirim, ek hizmet ya da urun hediyesi planlanabilir.",
  },
];

export const istanbulDistricts = [
  "Adalar",
  "Arnavutkoy",
  "Atasehir",
  "Avcilar",
  "Bagcilar",
  "Bahcelievler",
  "Bakirkoy",
  "Basaksehir",
  "Bayrampasa",
  "Besiktas",
  "Beykoz",
  "Beylikduzu",
  "Beyoglu",
  "Buyukcekmece",
  "Catalca",
  "Cekmekoy",
  "Esenler",
  "Esenyurt",
  "Eyupsultan",
  "Fatih",
  "Gaziosmanpasa",
  "Gungoren",
  "Kadikoy",
  "Kagithane",
  "Kartal",
  "Kucukcekmece",
  "Maltepe",
  "Pendik",
  "Sancaktepe",
  "Sariyer",
  "Sile",
  "Silivri",
  "Sisli",
  "Sultanbeyli",
  "Sultangazi",
  "Tuzla",
  "Umraniye",
  "Uskudar",
  "Zeytinburnu",
];

export const cleaningDurations = [
  {
    id: "standard",
    label: "Standard",
    hours: "3-5 hours",
    description: "Regular home cleaning for maintained spaces.",
    multiplier: 1,
  },
  {
    id: "extended",
    label: "Extended",
    hours: "5-7 hours",
    description: "More time for larger homes or heavier use.",
    multiplier: 1.18,
  },
  {
    id: "deep",
    label: "Deep",
    hours: "7-9 hours",
    description: "Extra focus for detailed cleaning needs.",
    multiplier: 1.38,
  },
] as const;

export const paymentMethods = [
  {
    id: "cash",
    label: "Cash",
    description: "Pay in cash after service.",
  },
  {
    id: "card",
    label: "Credit Card",
    description: "Pay with a credit card.",
  },
] as const;

export const frequencyOptions = [
  { id: "one-time", label: "One-time", discount: 0 },
  { id: "weekly", label: "Weekly", discount: 0.1 },
  { id: "monthly", label: "Monthly", discount: 0.05 },
] as const;

export const timeRangeOptions = [
  "09:00 - 12:00",
  "12:00 - 15:00",
  "15:00 - 18:00",
  "18:00 - 20:00",
];
