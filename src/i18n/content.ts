import { HOME_IMAGES, PROJECTS_IMAGES, SERVICES_IMAGES } from "@/constants/images";
import type { Locale } from "./routing";

export type PriceOption = {
  id: string;
  label: string;
  price: string;
  detail: string;
};

export type PriceService = {
  id: string;
  title: string;
  category: string;
  description: string;
  basePrice: string;
  options: PriceOption[];
  includes: string[];
};

export type PriceData = {
  services: PriceService[];
  additionalServices: { id: string; label: string }[];
  cleaningDurations: {
    id: string;
    label: string;
    hours: string;
    description: string;
    multiplier: number;
  }[];
  paymentMethods: { id: string; label: string; description: string }[];
  frequencyOptions: { id: string; label: string; discount: number }[];
  istanbulDistricts: string[];
  timeRangeOptions: string[];
};

type MetadataCopy = {
  title: string;
  description: string;
  imageAlt: string;
  keywords?: string[];
};

export type ServicesPageUi = {
  wizardSteps: string[];
  fieldLabels: Record<string, string>;
  compactHeader: {
    eyebrow: string;
    title: string;
    description: string;
  };
  serviceMenu: {
    eyebrow: string;
    title: string;
  };
  steps: {
    location: {
      title: string;
      text: string;
      city: string;
      district: string;
      cityOption: string;
      selectDistrict: string;
    };
    service: {
      title: string;
      text: string;
      serviceType: string;
      package: string;
      duration: string;
      frequency: string;
      payment: string;
      base: string;
      off: string;
    };
    home: {
      title: string;
      text: string;
      rooms: string;
      bathrooms: string;
      squareMeters: string;
      required: string;
      optional: string;
      date: string;
      startTime: string;
      selectTime: string;
      extras: string;
      note: string;
      notePlaceholder: string;
    };
    contact: {
      title: string;
      text: string;
      firstName: string;
      lastName: string;
      phone: string;
      email: string;
      address: string;
      namePlaceholder: string;
      surnamePlaceholder: string;
      addressPlaceholder: string;
      addressHint: string;
      approval: string;
    };
  };
  buttons: {
    back: string;
    continue: string;
    sending: string;
    sendRequest: string;
  };
  feedback: {
    fixFields: string;
    success: string;
    submitFallback: string;
  };
  validation: Record<string, string>;
  summary: Record<string, string>;
  price: Record<string, string>;
};

type SiteContent = {
  localeName: string;
  openGraphLocale: string;
  metadata: {
    root: MetadataCopy;
    home: MetadataCopy;
    services: MetadataCopy;
    contact: MetadataCopy;
  };
  nav: {
    services: string;
    results: string;
    reviews: string;
    contact: string;
    languageLabel: string;
  };
  home: {
    hero: {
      imageAlt: string;
      eyebrow: string;
      headlineLines: string[];
      aboutEyebrow: string;
      aboutTitle: string[];
      aboutParagraphs: string[][];
      careEyebrow: string;
      trustPoints: string[];
    };
    results: {
      eyebrow: string;
      title: string;
      lines: string[];
      projects: IProjects[];
    };
    services: {
      eyebrow: string;
      title: string;
      lines: string[];
      cards: IServices[];
    };
    testimonials: {
      eyebrow: string;
      title: string[];
      lines: string[];
      items: ITestimonials[];
    };
    footer: {
      intro: string;
      links: {
        category: string;
        links: { name: string; href: string }[];
      }[];
    };
  };
  contact: {
    title: string;
  };
  socialFloating: {
    openLabel: string;
    closeLabel: string;
  };
  servicesPage: {
    ui: ServicesPageUi;
    priceData: PriceData;
  };
};

const istanbulDistricts = [
  "Adalar",
  "Arnavutköy",
  "Ataşehir",
  "Avcılar",
  "Bağcılar",
  "Bahçelievler",
  "Bakırköy",
  "Başakşehir",
  "Bayrampaşa",
  "Beşiktaş",
  "Beykoz",
  "Beylikdüzü",
  "Beyoğlu",
  "Büyükçekmece",
  "Çatalca",
  "Çekmeköy",
  "Esenler",
  "Esenyurt",
  "Eyüpsultan",
  "Fatih",
  "Gaziosmanpaşa",
  "Güngören",
  "Kadıköy",
  "Kağıthane",
  "Kartal",
  "Küçükçekmece",
  "Maltepe",
  "Pendik",
  "Sancaktepe",
  "Sarıyer",
  "Şile",
  "Silivri",
  "Şişli",
  "Sultanbeyli",
  "Sultangazi",
  "Tuzla",
  "Ümraniye",
  "Üsküdar",
  "Zeytinburnu",
];

const timeRangeOptions = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
];

const fieldLabels = {
  tr: {
    city: "Şehir",
    district: "İlçe",
    serviceId: "Hizmet türü",
    optionId: "Paket",
    cleaningDurationId: "Süre",
    paymentMethodId: "Ödeme",
    frequencyId: "Sıklık",
    rooms: "Oda",
    bathrooms: "Banyo",
    squareMeters: "Metrekare",
    date: "Tarih",
    timeRange: "Saat",
    firstName: "Ad",
    lastName: "Soyad",
    phone: "Telefon",
    email: "E-posta",
    address: "Adres",
    approval: "Onay",
  },
  ru: {
    city: "Город",
    district: "Район",
    serviceId: "Тип услуги",
    optionId: "Пакет",
    cleaningDurationId: "Длительность",
    paymentMethodId: "Оплата",
    frequencyId: "Частота",
    rooms: "Комнаты",
    bathrooms: "Ванные",
    squareMeters: "Квадратные метры",
    date: "Дата",
    timeRange: "Время",
    firstName: "Имя",
    lastName: "Фамилия",
    phone: "Телефон",
    email: "Эл. почта",
    address: "Адрес",
    approval: "Согласие",
  },
  en: {
    city: "City",
    district: "District",
    serviceId: "Service type",
    optionId: "Package",
    cleaningDurationId: "Duration",
    paymentMethodId: "Payment",
    frequencyId: "Frequency",
    rooms: "Rooms",
    bathrooms: "Bathrooms",
    squareMeters: "Square meters",
    date: "Date",
    timeRange: "Time",
    firstName: "First name",
    lastName: "Last name",
    phone: "Phone",
    email: "Email",
    address: "Address",
    approval: "Approval",
  },
} satisfies Record<Locale, Record<string, string>>;

const priceData: Record<Locale, PriceData> = {
  tr: {
    istanbulDistricts,
    timeRangeOptions,
    cleaningDurations: [
      {
        id: "standard",
        label: "Standart",
        hours: "3-5 saat",
        description: "Bakımlı alanlar için düzenli ev temizliği.",
        multiplier: 1,
      },
      {
        id: "extended",
        label: "Uzatılmış",
        hours: "5-7 saat",
        description: "Daha büyük evler veya yoğun kullanım için ek süre.",
        multiplier: 1.18,
      },
      {
        id: "deep",
        label: "Derin",
        hours: "7-9 saat",
        description: "Detaylı temizlik ihtiyaçları için ekstra odak.",
        multiplier: 1.38,
      },
    ],
    paymentMethods: [
      { id: "cash", label: "Nakit", description: "Hizmetten sonra nakit ödeme." },
      { id: "card", label: "Kredi kartı", description: "Kredi kartı ile ödeme." },
    ],
    frequencyOptions: [
      { id: "one-time", label: "Tek seferlik", discount: 0 },
      { id: "weekly", label: "Haftalık", discount: 0.1 },
      { id: "monthly", label: "Aylık", discount: 0.05 },
    ],
    additionalServices: [
      { id: "cam", label: "Camları iki taraftan yıkama" },
      { id: "koltuk-matras", label: "Koltuk ve yatak yıkama" },
      { id: "utu", label: "Kıyafet ütüleme" },
      { id: "balkon", label: "Balkon temizliği" },
      { id: "buzdolabi", label: "Buzdolabı iç temizliği" },
      { id: "firin", label: "Fırın iç temizliği" },
      { id: "evcil", label: "Evcil hayvan sonrası temizlik" },
      { id: "ozon", label: "Ozonlama" },
      { id: "agir-kir", label: "Yoğun kir giderme" },
      { id: "ofis", label: "Ofis ve ticari alan temizliği" },
    ],
    services: [
      {
        id: "hafif-temizlik",
        title: "Hafif Temizlik",
        category: "Düzenli Temizlik",
        description:
          "Haftada 1-2 kez düzenli temizlik isteyen evler için yüzeyleri temiz ve ferah tutan bakım hizmeti.",
        basePrice: "2.700 TL",
        options: [
          { id: "1-1", label: "1+1", price: "2.700 TL", detail: "Kompakt evler için" },
          { id: "2-1", label: "2+1", price: "3.700 TL", detail: "Orta ölçekli evler için" },
          { id: "3-1", label: "3+1", price: "4.700 TL", detail: "Geniş aile evleri için" },
          { id: "4-1", label: "4+1", price: "5.700 TL", detail: "Büyük evler için" },
          { id: "ozel", label: "Diğer", price: "Teklif alınız", detail: "Özel metrekare ve planlar" },
        ],
        includes: [
          "Ulaşılabilir yüzeylerde toz alma",
          "Zemin süpürme ve silme",
          "Mutfak ve banyo yüzeyleri",
        ],
      },
      {
        id: "detayli-temizlik",
        title: "Detaylı Temizlik",
        category: "Derin Temizlik",
        description:
          "Birikmiş kir, yağ, toz ve kireç izlerini gidermek için tüm alanlarda kapsamlı temizlik.",
        basePrice: "4.000 TL",
        options: [
          { id: "1-1", label: "1+1", price: "4.000 TL", detail: "Detaylı başlangıç paketi" },
          { id: "2-1", label: "2+1", price: "5.500 TL", detail: "Dengeli kapsam" },
          { id: "3-1", label: "3+1", price: "7.000 TL", detail: "Geniş kapsamlı temizlik" },
          { id: "4-1", label: "4+1", price: "8.500 TL", detail: "Büyük alan planı" },
          { id: "ozel", label: "Diğer", price: "Teklif alınız", detail: "Özel planlama" },
        ],
        includes: [
          "Hafif temizliğe ek kapsam",
          "Zor alan ve köşe temizliği",
          "Yağ ve kireç giderme",
        ],
      },
      {
        id: "insaat-sonrasi-temizlik",
        title: "İnşaat Sonrası Temizlik",
        category: "Tadilat Sonrası",
        description:
          "İnşaat ve tadilat sonrası toz, boya izi, çimento kalıntısı ve kaba kirlerin temizlenmesi.",
        basePrice: "6.000 TL",
        options: [
          { id: "1-1", label: "1+1", price: "6.000 TL", detail: "Başlangıç fiyatı" },
          { id: "2-1", label: "2+1", price: "7.000 TL", detail: "Başlangıç fiyatı" },
          { id: "3-1", label: "3+1", price: "8.000 TL", detail: "Başlangıç fiyatı" },
          { id: "4-1", label: "4+1", price: "9.000 TL", detail: "Başlangıç fiyatı" },
          { id: "ozel", label: "Diğer", price: "Teklif alınız", detail: "Keşif sonrası fiyat" },
        ],
        includes: [
          "İnce inşaat tozu temizliği",
          "Boya ve yapıştırıcı izi giderme",
          "Profesyonel zemin temizliği",
        ],
      },
      {
        id: "tasinma-temizligi",
        title: "Taşınma Öncesi / Sonrası Temizlik",
        category: "Boş Ev Hazırlığı",
        description:
          "Yeni taşınma, ev teslimi veya kiracı değişimi öncesi boş alanları kullanıma hazır hale getiren kapsamlı temizlik.",
        basePrice: "Teklif alınız",
        options: [
          { id: "bos-daire", label: "Boş daire", price: "Teklif alınız", detail: "Taşınma öncesi hazırlık" },
          { id: "teslim", label: "Ev teslimi", price: "Teklif alınız", detail: "Kiracı değişimi veya satış öncesi" },
          { id: "ozel", label: "Özel plan", price: "Teklif alınız", detail: "Alan durumuna göre" },
        ],
        includes: ["Boş alan temizliği", "Dolap içleri", "Kapı, duvar ve zemin detayları"],
      },
      {
        id: "koltuk-yikama",
        title: "Koltuk Yıkama",
        category: "Kumaş Bakımı",
        description:
          "Koltuk ve oturma gruplarında leke ön işlemi, yıkama ve vakumlu kurutma.",
        basePrice: "600 TL",
        options: [
          { id: "tekli", label: "1 kişilik", price: "600 TL", detail: "Tekli koltuk" },
          { id: "ikili", label: "2 kişilik", price: "900 TL", detail: "İkili koltuk" },
          { id: "uclu", label: "3 kişilik", price: "1.200 TL", detail: "Üçlü koltuk" },
          { id: "dortlu", label: "4 kişilik", price: "1.500 TL", detail: "Geniş oturma alanı" },
          { id: "ozel", label: "Diğer", price: "Teklif alınız", detail: "Özel ölçüler" },
        ],
        includes: ["Leke ön işlemi", "Kumaş yıkama", "Vakumlu kurutma"],
      },
      {
        id: "yatak-yikama",
        title: "Yatak Yıkama",
        category: "Hijyen Bakımı",
        description: "Yatak yüzeylerinde hijyen, ferahlık ve derin temizlik sağlayan bakım.",
        basePrice: "1.000 TL",
        options: [
          { id: "tek", label: "Tek kişilik", price: "1.000 TL", detail: "Standart yatak" },
          { id: "cift", label: "Çift kişilik", price: "1.500 TL", detail: "Geniş yatak" },
          { id: "ozel", label: "Diğer", price: "Teklif alınız", detail: "Özel ölçüler" },
        ],
        includes: ["Yüzey hijyeni", "Koku giderme", "Vakumlu temizlik"],
      },
      {
        id: "sandalye-yikama",
        title: "Sandalye Yıkama",
        category: "Kumaş Bakımı",
        description:
          "Ev, ofis ve işletme sandalyeleri için hızlı ve düzenli kumaş temizliği.",
        basePrice: "300 TL",
        options: [
          { id: "standart", label: "Standart boy", price: "300 TL", detail: "Tek sandalye" },
          { id: "buyuk", label: "Büyük boy", price: "450 TL", detail: "Geniş oturum" },
          { id: "ozel", label: "Diğer", price: "Teklif alınız", detail: "Toplu adetler" },
        ],
        includes: ["Kumaş temizliği", "Leke ön işlemi", "Hızlı kuruma"],
      },
      {
        id: "puf-yikama",
        title: "Puf Yıkama",
        category: "Kumaş Bakımı",
        description: "Puf ve tamamlayıcı oturma ürünleri için özel kumaş bakımı.",
        basePrice: "400 TL",
        options: [
          { id: "standart", label: "Standart boy", price: "400 TL", detail: "Tek puf" },
          { id: "buyuk", label: "Büyük boy", price: "500 TL", detail: "Geniş puf" },
          { id: "ozel", label: "Diğer", price: "Teklif alınız", detail: "Özel ölçüler" },
        ],
        includes: ["Kumaş bakımı", "Leke ön işlemi", "Koku giderme"],
      },
      {
        id: "hali-yikama",
        title: "Halı Yıkama",
        category: "Metrekare Hizmeti",
        description:
          "Halı yapısı ve kirlilik durumuna göre profesyonel temizlik ve teslim planı.",
        basePrice: "450-550 TL / m2",
        options: [
          { id: "metrekare", label: "Metrekare", price: "450-550 TL / m2", detail: "Malzeme ve kirliliğe göre" },
          { id: "toplu", label: "Toplu halı", price: "Teklif alınız", detail: "Birden fazla halı için" },
        ],
        includes: ["Malzeme kontrolü", "Derin yıkama", "Teslim planı"],
      },
    ],
  },
  ru: {
    istanbulDistricts,
    timeRangeOptions,
    cleaningDurations: [
      {
        id: "standard",
        label: "Стандарт",
        hours: "3-5 часов",
        description: "Регулярная уборка для поддержанных домашних пространств.",
        multiplier: 1,
      },
      {
        id: "extended",
        label: "Расширенная",
        hours: "5-7 часов",
        description: "Больше времени для больших домов или более активного использования.",
        multiplier: 1.18,
      },
      {
        id: "deep",
        label: "Глубокая",
        hours: "7-9 часов",
        description: "Дополнительный фокус для детальной уборки.",
        multiplier: 1.38,
      },
    ],
    paymentMethods: [
      { id: "cash", label: "Наличные", description: "Оплата наличными после услуги." },
      { id: "card", label: "Карта", description: "Оплата банковской картой." },
    ],
    frequencyOptions: [
      { id: "one-time", label: "Разово", discount: 0 },
      { id: "weekly", label: "Еженедельно", discount: 0.1 },
      { id: "monthly", label: "Ежемесячно", discount: 0.05 },
    ],
    additionalServices: [
      { id: "cam", label: "Мытье окон с двух сторон" },
      { id: "koltuk-matras", label: "Чистка дивана и матраса" },
      { id: "utu", label: "Глажка одежды" },
      { id: "balkon", label: "Уборка балкона" },
      { id: "buzdolabi", label: "Чистка холодильника внутри" },
      { id: "firin", label: "Чистка духовки внутри" },
      { id: "evcil", label: "Уборка после домашних животных" },
      { id: "ozon", label: "Озонирование" },
      { id: "agir-kir", label: "Удаление сильных загрязнений" },
      { id: "ofis", label: "Уборка офиса и коммерческих помещений" },
    ],
    services: [
      {
        id: "hafif-temizlik",
        title: "Легкая уборка",
        category: "Регулярная уборка",
        description:
          "Поддерживающая уборка для домов, которым нужна регулярная чистота 1-2 раза в неделю.",
        basePrice: "2.700 TL",
        options: [
          { id: "1-1", label: "1+1", price: "2.700 TL", detail: "Для компактных квартир" },
          { id: "2-1", label: "2+1", price: "3.700 TL", detail: "Для средних квартир" },
          { id: "3-1", label: "3+1", price: "4.700 TL", detail: "Для просторных семейных домов" },
          { id: "4-1", label: "4+1", price: "5.700 TL", detail: "Для больших домов" },
          { id: "ozel", label: "Другое", price: "По запросу", detail: "Особая площадь и планировка" },
        ],
        includes: ["Пыль на доступных поверхностях", "Пылесос и мытье полов", "Кухонные и ванные поверхности"],
      },
      {
        id: "detayli-temizlik",
        title: "Детальная уборка",
        category: "Глубокая уборка",
        description:
          "Комплексная уборка всех зон для удаления накопившейся грязи, жира, пыли и известкового налета.",
        basePrice: "4.000 TL",
        options: [
          { id: "1-1", label: "1+1", price: "4.000 TL", detail: "Стартовый детальный пакет" },
          { id: "2-1", label: "2+1", price: "5.500 TL", detail: "Сбалансированный объем" },
          { id: "3-1", label: "3+1", price: "7.000 TL", detail: "Расширенная уборка" },
          { id: "4-1", label: "4+1", price: "8.500 TL", detail: "План для больших помещений" },
          { id: "ozel", label: "Другое", price: "По запросу", detail: "Индивидуальное планирование" },
        ],
        includes: ["Все из легкой уборки", "Сложные зоны и углы", "Удаление жира и известкового налета"],
      },
      {
        id: "insaat-sonrasi-temizlik",
        title: "Уборка после ремонта",
        category: "После ремонта",
        description:
          "Удаление пыли, следов краски, цементных остатков и грубых загрязнений после строительства или ремонта.",
        basePrice: "6.000 TL",
        options: [
          { id: "1-1", label: "1+1", price: "6.000 TL", detail: "Стартовая цена" },
          { id: "2-1", label: "2+1", price: "7.000 TL", detail: "Стартовая цена" },
          { id: "3-1", label: "3+1", price: "8.000 TL", detail: "Стартовая цена" },
          { id: "4-1", label: "4+1", price: "9.000 TL", detail: "Стартовая цена" },
          { id: "ozel", label: "Другое", price: "По запросу", detail: "Цена после оценки" },
        ],
        includes: ["Уборка мелкой строительной пыли", "Удаление краски и клея", "Профессиональная чистка полов"],
      },
      {
        id: "tasinma-temizligi",
        title: "Уборка до / после переезда",
        category: "Подготовка пустого дома",
        description:
          "Комплексная уборка пустых помещений перед переездом, сдачей дома или сменой арендатора.",
        basePrice: "По запросу",
        options: [
          { id: "bos-daire", label: "Пустая квартира", price: "По запросу", detail: "Подготовка перед переездом" },
          { id: "teslim", label: "Сдача дома", price: "По запросу", detail: "Перед сменой арендатора или продажей" },
          { id: "ozel", label: "Особый план", price: "По запросу", detail: "По состоянию помещения" },
        ],
        includes: ["Уборка пустого помещения", "Внутри шкафов", "Детали дверей, стен и пола"],
      },
      {
        id: "koltuk-yikama",
        title: "Чистка диванов",
        category: "Уход за тканью",
        description: "Предобработка пятен, мойка и вакуумная сушка диванов и мягкой мебели.",
        basePrice: "600 TL",
        options: [
          { id: "tekli", label: "1 место", price: "600 TL", detail: "Одноместное кресло" },
          { id: "ikili", label: "2 места", price: "900 TL", detail: "Двухместный диван" },
          { id: "uclu", label: "3 места", price: "1.200 TL", detail: "Трехместный диван" },
          { id: "dortlu", label: "4 места", price: "1.500 TL", detail: "Большая зона сидения" },
          { id: "ozel", label: "Другое", price: "По запросу", detail: "Особые размеры" },
        ],
        includes: ["Предобработка пятен", "Чистка ткани", "Вакуумная сушка"],
      },
      {
        id: "yatak-yikama",
        title: "Чистка матрасов",
        category: "Гигиенический уход",
        description: "Уход, который дает матрасам чистоту, свежесть и глубокую гигиену.",
        basePrice: "1.000 TL",
        options: [
          { id: "tek", label: "Односпальный", price: "1.000 TL", detail: "Стандартный матрас" },
          { id: "cift", label: "Двуспальный", price: "1.500 TL", detail: "Большой матрас" },
          { id: "ozel", label: "Другое", price: "По запросу", detail: "Особые размеры" },
        ],
        includes: ["Гигиена поверхности", "Удаление запаха", "Вакуумная чистка"],
      },
      {
        id: "sandalye-yikama",
        title: "Чистка стульев",
        category: "Уход за тканью",
        description: "Быстрая и аккуратная чистка тканевых стульев для дома, офиса и бизнеса.",
        basePrice: "300 TL",
        options: [
          { id: "standart", label: "Стандартный размер", price: "300 TL", detail: "Один стул" },
          { id: "buyuk", label: "Большой размер", price: "450 TL", detail: "Широкое сиденье" },
          { id: "ozel", label: "Другое", price: "По запросу", detail: "Большие партии" },
        ],
        includes: ["Чистка ткани", "Предобработка пятен", "Быстрое высыхание"],
      },
      {
        id: "puf-yikama",
        title: "Чистка пуфов",
        category: "Уход за тканью",
        description: "Специальный уход за тканью пуфов и дополнительных сидений.",
        basePrice: "400 TL",
        options: [
          { id: "standart", label: "Стандартный размер", price: "400 TL", detail: "Один пуф" },
          { id: "buyuk", label: "Большой размер", price: "500 TL", detail: "Большой пуф" },
          { id: "ozel", label: "Другое", price: "По запросу", detail: "Особые размеры" },
        ],
        includes: ["Уход за тканью", "Предобработка пятен", "Удаление запаха"],
      },
      {
        id: "hali-yikama",
        title: "Чистка ковров",
        category: "Услуга по метражу",
        description: "Профессиональная чистка и план доставки по материалу ковра и степени загрязнения.",
        basePrice: "450-550 TL / m2",
        options: [
          { id: "metrekare", label: "Квадратный метр", price: "450-550 TL / m2", detail: "По материалу и загрязнению" },
          { id: "toplu", label: "Несколько ковров", price: "По запросу", detail: "Для нескольких ковров" },
        ],
        includes: ["Проверка материала", "Глубокая мойка", "План доставки"],
      },
    ],
  },
  en: {
    istanbulDistricts,
    timeRangeOptions,
    cleaningDurations: [
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
    ],
    paymentMethods: [
      { id: "cash", label: "Cash", description: "Pay in cash after service." },
      { id: "card", label: "Credit Card", description: "Pay with a credit card." },
    ],
    frequencyOptions: [
      { id: "one-time", label: "One-time", discount: 0 },
      { id: "weekly", label: "Weekly", discount: 0.1 },
      { id: "monthly", label: "Monthly", discount: 0.05 },
    ],
    additionalServices: [
      { id: "cam", label: "Wash windows on both sides" },
      { id: "koltuk-matras", label: "Sofa and mattress cleaning" },
      { id: "utu", label: "Clothes ironing" },
      { id: "balkon", label: "Balcony cleaning" },
      { id: "buzdolabi", label: "Inside refrigerator cleaning" },
      { id: "firin", label: "Inside oven cleaning" },
      { id: "evcil", label: "After-pet cleaning" },
      { id: "ozon", label: "Ozone treatment" },
      { id: "agir-kir", label: "Heavy dirt removal" },
      { id: "ofis", label: "Office and commercial cleaning" },
    ],
    services: [
      {
        id: "hafif-temizlik",
        title: "Light Cleaning",
        category: "Regular Cleaning",
        description:
          "Maintenance cleaning that keeps surfaces clean and fresh for homes that need service 1-2 times a week.",
        basePrice: "2.700 TL",
        options: [
          { id: "1-1", label: "1+1", price: "2.700 TL", detail: "For compact homes" },
          { id: "2-1", label: "2+1", price: "3.700 TL", detail: "For mid-size homes" },
          { id: "3-1", label: "3+1", price: "4.700 TL", detail: "For spacious family homes" },
          { id: "4-1", label: "4+1", price: "5.700 TL", detail: "For larger homes" },
          { id: "ozel", label: "Other", price: "Get a quote", detail: "Custom size and layouts" },
        ],
        includes: ["Dusting reachable surfaces", "Vacuuming and mopping floors", "Kitchen and bathroom surfaces"],
      },
      {
        id: "detayli-temizlik",
        title: "Detailed Cleaning",
        category: "Deep Cleaning",
        description:
          "Comprehensive cleaning across all areas to remove built-up dirt, grease, dust, and limescale.",
        basePrice: "4.000 TL",
        options: [
          { id: "1-1", label: "1+1", price: "4.000 TL", detail: "Detailed starter package" },
          { id: "2-1", label: "2+1", price: "5.500 TL", detail: "Balanced scope" },
          { id: "3-1", label: "3+1", price: "7.000 TL", detail: "Broad cleaning scope" },
          { id: "4-1", label: "4+1", price: "8.500 TL", detail: "Large space plan" },
          { id: "ozel", label: "Other", price: "Get a quote", detail: "Custom planning" },
        ],
        includes: ["Everything in light cleaning", "Hard-to-reach areas and corners", "Grease and limescale removal"],
      },
      {
        id: "insaat-sonrasi-temizlik",
        title: "Post-Construction Cleaning",
        category: "After Renovation",
        description:
          "Cleaning dust, paint marks, cement residue, and rough debris after construction or renovation.",
        basePrice: "6.000 TL",
        options: [
          { id: "1-1", label: "1+1", price: "6.000 TL", detail: "Starting price" },
          { id: "2-1", label: "2+1", price: "7.000 TL", detail: "Starting price" },
          { id: "3-1", label: "3+1", price: "8.000 TL", detail: "Starting price" },
          { id: "4-1", label: "4+1", price: "9.000 TL", detail: "Starting price" },
          { id: "ozel", label: "Other", price: "Get a quote", detail: "Price after assessment" },
        ],
        includes: ["Fine construction dust cleaning", "Paint and adhesive mark removal", "Professional floor cleaning"],
      },
      {
        id: "tasinma-temizligi",
        title: "Move-In / Move-Out Cleaning",
        category: "Empty Home Prep",
        description:
          "Comprehensive cleaning that gets empty spaces ready before moving in, handover, or tenant change.",
        basePrice: "Get a quote",
        options: [
          { id: "bos-daire", label: "Empty apartment", price: "Get a quote", detail: "Move-in preparation" },
          { id: "teslim", label: "Home handover", price: "Get a quote", detail: "Before tenant change or sale" },
          { id: "ozel", label: "Custom plan", price: "Get a quote", detail: "Based on space condition" },
        ],
        includes: ["Empty space cleaning", "Inside cabinets", "Door, wall, and floor details"],
      },
      {
        id: "koltuk-yikama",
        title: "Sofa Cleaning",
        category: "Fabric Care",
        description: "Stain pre-treatment, washing, and vacuum drying for sofas and seating groups.",
        basePrice: "600 TL",
        options: [
          { id: "tekli", label: "1 seat", price: "600 TL", detail: "Single armchair" },
          { id: "ikili", label: "2 seats", price: "900 TL", detail: "Two-seat sofa" },
          { id: "uclu", label: "3 seats", price: "1.200 TL", detail: "Three-seat sofa" },
          { id: "dortlu", label: "4 seats", price: "1.500 TL", detail: "Large seating area" },
          { id: "ozel", label: "Other", price: "Get a quote", detail: "Custom dimensions" },
        ],
        includes: ["Stain pre-treatment", "Fabric washing", "Vacuum drying"],
      },
      {
        id: "yatak-yikama",
        title: "Mattress Cleaning",
        category: "Hygiene Care",
        description: "Care that brings hygiene, freshness, and deep cleaning to mattress surfaces.",
        basePrice: "1.000 TL",
        options: [
          { id: "tek", label: "Single", price: "1.000 TL", detail: "Standard mattress" },
          { id: "cift", label: "Double", price: "1.500 TL", detail: "Large mattress" },
          { id: "ozel", label: "Other", price: "Get a quote", detail: "Custom dimensions" },
        ],
        includes: ["Surface hygiene", "Odor removal", "Vacuum cleaning"],
      },
      {
        id: "sandalye-yikama",
        title: "Chair Cleaning",
        category: "Fabric Care",
        description: "Fast, consistent fabric cleaning for home, office, and business chairs.",
        basePrice: "300 TL",
        options: [
          { id: "standart", label: "Standard size", price: "300 TL", detail: "Single chair" },
          { id: "buyuk", label: "Large size", price: "450 TL", detail: "Wide seat" },
          { id: "ozel", label: "Other", price: "Get a quote", detail: "Bulk quantities" },
        ],
        includes: ["Fabric cleaning", "Stain pre-treatment", "Fast drying"],
      },
      {
        id: "puf-yikama",
        title: "Pouf Cleaning",
        category: "Fabric Care",
        description: "Special fabric care for poufs and complementary seating pieces.",
        basePrice: "400 TL",
        options: [
          { id: "standart", label: "Standard size", price: "400 TL", detail: "Single pouf" },
          { id: "buyuk", label: "Large size", price: "500 TL", detail: "Large pouf" },
          { id: "ozel", label: "Other", price: "Get a quote", detail: "Custom dimensions" },
        ],
        includes: ["Fabric care", "Stain pre-treatment", "Odor removal"],
      },
      {
        id: "hali-yikama",
        title: "Carpet Cleaning",
        category: "Square-Meter Service",
        description:
          "Professional cleaning and delivery plan based on carpet material and dirt level.",
        basePrice: "450-550 TL / m2",
        options: [
          { id: "metrekare", label: "Square meter", price: "450-550 TL / m2", detail: "Based on material and dirt" },
          { id: "toplu", label: "Multiple carpets", price: "Get a quote", detail: "For more than one carpet" },
        ],
        includes: ["Material check", "Deep washing", "Delivery plan"],
      },
    ],
  },
};

const servicesUi: Record<Locale, ServicesPageUi> = {
  tr: {
    wizardSteps: ["Konum", "Hizmet", "Ev", "İletişim"],
    fieldLabels: fieldLabels.tr,
    compactHeader: {
      eyebrow: "(Hizmetler)",
      title: "HI-Clean talebi",
      description:
        "Hizmeti, paketi, tarihi ve iletişim bilgilerini tek bir net talepte seçin.",
    },
    serviceMenu: { eyebrow: "Fiyat listesi", title: "Hizmetler" },
    steps: {
      location: {
        title: "Konum",
        text: "Ekibin İstanbul'da nereye gelmesi gerektiğini seçin.",
        city: "Şehir",
        district: "İlçe",
        cityOption: "İstanbul",
        selectDistrict: "İlçe seçin",
      },
      service: {
        title: "Hizmet",
        text: "Bir hizmet ve kompakt fiyat paketi seçin.",
        serviceType: "Hizmet türü",
        package: "Paket",
        duration: "Süre",
        frequency: "Sıklık",
        payment: "Ödeme",
        base: "Baz",
        off: "indirim",
      },
      home: {
        title: "Ev",
        text: "Alan büyüklüğünü ve tercih ettiğiniz saati ekleyin.",
        rooms: "Oda",
        bathrooms: "Banyo",
        squareMeters: "Metrekare",
        required: "Gerekli",
        optional: "İsteğe bağlı",
        date: "Tarih",
        startTime: "Başlangıç saati",
        selectTime: "Saat seçin",
        extras: "Ek hizmetler",
        note: "Not",
        notePlaceholder: "Evcil hayvan, giriş notları, özel detaylar",
      },
      contact: {
        title: "İletişim",
        text: "İletişim bilgilerinizle tamamlayın.",
        firstName: "Ad",
        lastName: "Soyad",
        phone: "Telefon",
        email: "E-posta",
        address: "Adres",
        namePlaceholder: "Ad",
        surnamePlaceholder: "Soyad",
        addressPlaceholder: "Örnek: Moda Mah Caferağa Sok No 12 Daire 4",
        addressHint: "Örnek: Moda Mah Caferağa Sok No 12 Daire 4. Virgül kullanmak zorunlu değildir.",
        approval: "Bu temizlik talebi hakkında benimle iletişime geçilmesini onaylıyorum.",
      },
    },
    buttons: {
      back: "Geri",
      continue: "Devam",
      sending: "Gönderiliyor...",
      sendRequest: "Talep gönder",
    },
    feedback: {
      fixFields: "Devam etmek için bu alanları düzeltin:",
      success: "Talep başarıyla gönderildi! Kısa süre içinde sizinle iletişime geçeceğiz.",
      submitFallback: "Talep gönderilemedi. Lütfen tekrar deneyin.",
    },
    validation: {
      cityRequired: "Şehir seçin.",
      districtRequired: "İlçe seçin.",
      serviceRequired: "Hizmet seçin.",
      packageRequired: "Paket seçin.",
      durationRequired: "Süre seçin.",
      frequencyRequired: "Sıklık seçin.",
      paymentRequired: "Ödeme yöntemi seçin.",
      roomsRange: "1 ile 12 arasında bir sayı girin.",
      bathroomsRange: "1 ile 8 arasında bir sayı girin.",
      squareMetersRequired: "Bu paket için metrekare girin.",
      squareMetersRange: "1 ile 1000 arasında bir sayı girin.",
      dateRequired: "Hizmet tarihi seçin.",
      dateInvalid: "Geçerli bir hizmet tarihi seçin.",
      datePast: "Bugünü veya ileri bir tarihi seçin.",
      timeRequired: "Saat seçin.",
      firstNameMin: "En az 2 karakter girin.",
      lastNameMin: "En az 2 karakter girin.",
      phoneRequired: "Telefon numarası girin.",
      phoneInvalid: "Geçerli bir telefon numarası girin.",
      emailInvalid: "Geçerli bir e-posta adresi girin.",
      addressDetailed: "Mahalle, sokak ve bina detaylarını girin. Virgül isteğe bağlıdır.",
      approvalRequired: "İletişim iznini onaylayın.",
    },
    summary: {
      service: "Hizmet",
      package: "Paket",
      duration: "Süre",
      payment: "Ödeme",
      frequency: "Sıklık",
      estimate: "Tahmin",
      extras: "Ekler",
      none: "Yok",
      plan: "Plan",
      rooms: "Oda",
      included: "Dahil",
      breakdown: "Dağılım",
    },
    price: {
      customQuote: "Özel teklif",
      package: "Paket",
      reason: "Sebep",
      manualPricing: "Manuel fiyatlandırma",
      from: "Başlangıç",
      perM2: "/ m2",
      base: "Baz",
      duration: "Süre",
      rooms: "Oda",
      bathrooms: "Banyo",
      extras: "Ekler",
      discount: "İndirim",
      zeroCurrency: "0 TL",
    },
  },
  ru: {
    wizardSteps: ["Локация", "Услуга", "Дом", "Контакты"],
    fieldLabels: fieldLabels.ru,
    compactHeader: {
      eyebrow: "(Услуги)",
      title: "Заявка HI-Clean",
      description:
        "Выберите услугу, пакет, дату и контактные данные в одной понятной заявке.",
    },
    serviceMenu: { eyebrow: "Прайс-лист", title: "Услуги" },
    steps: {
      location: {
        title: "Локация",
        text: "Выберите, куда команда должна приехать в Стамбуле.",
        city: "Город",
        district: "Район",
        cityOption: "Стамбул",
        selectDistrict: "Выберите район",
      },
      service: {
        title: "Услуга",
        text: "Выберите услугу и компактный ценовой пакет.",
        serviceType: "Тип услуги",
        package: "Пакет",
        duration: "Длительность",
        frequency: "Частота",
        payment: "Оплата",
        base: "База",
        off: "скидка",
      },
      home: {
        title: "Дом",
        text: "Добавьте размер помещения и удобное время.",
        rooms: "Комнаты",
        bathrooms: "Ванные",
        squareMeters: "Квадратные метры",
        required: "Обязательно",
        optional: "Необязательно",
        date: "Дата",
        startTime: "Время начала",
        selectTime: "Выберите время",
        extras: "Дополнительно",
        note: "Комментарий",
        notePlaceholder: "Питомцы, доступ, особые детали",
      },
      contact: {
        title: "Контакты",
        text: "Завершите заявку контактными данными.",
        firstName: "Имя",
        lastName: "Фамилия",
        phone: "Телефон",
        email: "Эл. почта",
        address: "Адрес",
        namePlaceholder: "Имя",
        surnamePlaceholder: "Фамилия",
        addressPlaceholder: "Пример: Moda Mah Caferaga Sok No 12 Daire 4",
        addressHint: "Пример: Moda Mah Caferaga Sok No 12 Daire 4. Запятые необязательны.",
        approval: "Я согласен, чтобы со мной связались по этой заявке на уборку.",
      },
    },
    buttons: {
      back: "Назад",
      continue: "Далее",
      sending: "Отправляем...",
      sendRequest: "Отправить заявку",
    },
    feedback: {
      fixFields: "Исправьте эти поля, чтобы продолжить:",
      success: "Заявка успешно отправлена! Мы скоро свяжемся с вами.",
      submitFallback: "Не удалось отправить заявку. Попробуйте еще раз.",
    },
    validation: {
      cityRequired: "Выберите город.",
      districtRequired: "Выберите район.",
      serviceRequired: "Выберите услугу.",
      packageRequired: "Выберите пакет.",
      durationRequired: "Выберите длительность.",
      frequencyRequired: "Выберите частоту.",
      paymentRequired: "Выберите способ оплаты.",
      roomsRange: "Введите число от 1 до 12.",
      bathroomsRange: "Введите число от 1 до 8.",
      squareMetersRequired: "Введите метраж для этого пакета.",
      squareMetersRange: "Введите число от 1 до 1000.",
      dateRequired: "Выберите дату услуги.",
      dateInvalid: "Выберите корректную дату услуги.",
      datePast: "Выберите сегодня или будущую дату.",
      timeRequired: "Выберите время.",
      firstNameMin: "Введите минимум 2 символа.",
      lastNameMin: "Введите минимум 2 символа.",
      phoneRequired: "Введите номер телефона.",
      phoneInvalid: "Введите корректный номер телефона.",
      emailInvalid: "Введите корректный адрес эл. почты.",
      addressDetailed: "Введите район, улицу и детали здания. Запятые необязательны.",
      approvalRequired: "Подтвердите разрешение на связь.",
    },
    summary: {
      service: "Услуга",
      package: "Пакет",
      duration: "Длительность",
      payment: "Оплата",
      frequency: "Частота",
      estimate: "Расчет",
      extras: "Дополнительно",
      none: "Нет",
      plan: "План",
      rooms: "Комнаты",
      included: "Включено",
      breakdown: "Разбивка",
    },
    price: {
      customQuote: "Индивидуальный расчет",
      package: "Пакет",
      reason: "Причина",
      manualPricing: "Ручной расчет",
      from: "От",
      perM2: "/ m2",
      base: "База",
      duration: "Длительность",
      rooms: "Комнаты",
      bathrooms: "Ванные",
      extras: "Дополнительно",
      discount: "Скидка",
      zeroCurrency: "0 TL",
    },
  },
  en: {
    wizardSteps: ["Location", "Service", "Home", "Contact"],
    fieldLabels: fieldLabels.en,
    compactHeader: {
      eyebrow: "(Services)",
      title: "HI-Clean request",
      description:
        "Choose the service, package, date, and contact details in one clear request.",
    },
    serviceMenu: { eyebrow: "Price list", title: "Services" },
    steps: {
      location: {
        title: "Location",
        text: "Choose where the team should come in Istanbul.",
        city: "City",
        district: "District",
        cityOption: "Istanbul",
        selectDistrict: "Select district",
      },
      service: {
        title: "Service",
        text: "Pick a service and a compact price package.",
        serviceType: "Service type",
        package: "Package",
        duration: "Duration",
        frequency: "Frequency",
        payment: "Payment",
        base: "Base",
        off: "off",
      },
      home: {
        title: "Home",
        text: "Add the size and preferred time.",
        rooms: "Rooms",
        bathrooms: "Bathrooms",
        squareMeters: "Square meters",
        required: "Required",
        optional: "Optional",
        date: "Date",
        startTime: "Start Time",
        selectTime: "Select time",
        extras: "Extras",
        note: "Note",
        notePlaceholder: "Pets, access notes, special details",
      },
      contact: {
        title: "Contact",
        text: "Finish with your contact details.",
        firstName: "First name",
        lastName: "Last name",
        phone: "Phone",
        email: "Email",
        address: "Address",
        namePlaceholder: "Name",
        surnamePlaceholder: "Surname",
        addressPlaceholder: "Example: Moda Mah Caferaga Sok No 12 Daire 4",
        addressHint: "Example: Moda Mah Caferaga Sok No 12 Daire 4. Commas are optional.",
        approval: "I approve being contacted about this cleaning request.",
      },
    },
    buttons: {
      back: "Back",
      continue: "Continue",
      sending: "Sending...",
      sendRequest: "Send request",
    },
    feedback: {
      fixFields: "Fix these fields to continue:",
      success: "Request was sent successfully! We will contact you soon.",
      submitFallback: "Could not send the request. Please try again.",
    },
    validation: {
      cityRequired: "Select a city.",
      districtRequired: "Select a district.",
      serviceRequired: "Select a service.",
      packageRequired: "Choose a package.",
      durationRequired: "Choose a duration.",
      frequencyRequired: "Choose a frequency.",
      paymentRequired: "Choose a payment method.",
      roomsRange: "Enter a number from 1 to 12.",
      bathroomsRange: "Enter a number from 1 to 8.",
      squareMetersRequired: "Enter square meters for this package.",
      squareMetersRange: "Enter a number from 1 to 1000.",
      dateRequired: "Choose a service date.",
      dateInvalid: "Choose a valid service date.",
      datePast: "Choose today or a future date.",
      timeRequired: "Select a time range.",
      firstNameMin: "Enter at least 2 characters.",
      lastNameMin: "Enter at least 2 characters.",
      phoneRequired: "Enter a phone number.",
      phoneInvalid: "Enter a valid phone number.",
      emailInvalid: "Enter a valid email address.",
      addressDetailed: "Enter neighborhood, street and building details. Commas are optional.",
      approvalRequired: "Approve contact permission.",
    },
    summary: {
      service: "Service",
      package: "Package",
      duration: "Duration",
      payment: "Payment",
      frequency: "Frequency",
      estimate: "Estimate",
      extras: "Extras",
      none: "None",
      plan: "Plan",
      rooms: "Rooms",
      included: "Included",
      breakdown: "Breakdown",
    },
    price: {
      customQuote: "Custom quote",
      package: "Package",
      reason: "Reason",
      manualPricing: "Manual pricing",
      from: "From",
      perM2: "/ m2",
      base: "Base",
      duration: "Duration",
      rooms: "Rooms",
      bathrooms: "Bathrooms",
      extras: "Extras",
      discount: "Discount",
      zeroCurrency: "0 TL",
    },
  },
};

export const content = {
  tr: {
    localeName: "Türkçe",
    openGraphLocale: "tr_TR",
    metadata: {
      root: {
        title: "HI-Clean | İstanbul'da Daire ve Ev Temizliği",
        description:
          "İstanbul'da daire, ev, detaylı, taşınma, koltuk, yatak, sandalye, puf ve halı temizliği.",
        imageAlt: "HI-Clean temizlik hizmeti logosu",
        keywords: [
          "HI-Clean",
          "İstanbul temizlik",
          "daire temizliği",
          "ev temizliği",
          "detaylı temizlik",
          "koltuk temizliği",
          "halı temizliği",
        ],
      },
      home: {
        title: "HI-Clean | İstanbul'da Daire ve Ev Temizliği",
        description:
          "İstanbul'da daire, ev, detaylı, taşınma ve kumaş temizliği için HI-Clean ile güvenilir hizmet alın.",
        imageAlt: "HI-Clean temizlik hizmeti logosu",
      },
      services: {
        title: "Hizmetler ve Fiyatlar | HI-Clean",
        description:
          "HI-Clean hizmetini seçin, tahmini fiyatı hesaplayın ve İstanbul için temizlik talebi gönderin.",
        imageAlt: "HI-Clean temizlik hizmeti logosu",
      },
      contact: {
        title: "İletişim | HI-Clean",
        description:
          "İstanbul'da temizlik için HI-Clean'e WhatsApp, Instagram veya Telegram üzerinden yazın.",
        imageAlt: "HI-Clean temizlik hizmeti logosu",
      },
    },
    nav: {
      services: "Hizmetler",
      results: "Sonuçlar",
      reviews: "Yorumlar",
      contact: "İletişim",
      languageLabel: "Dil seçin",
    },
    home: {
      hero: {
        imageAlt: "Aydınlık bir evde HI-Clean ekibi",
        eyebrow: "(Daireler ve evler)",
        headlineLines: [
          "Daireler ve evler için",
          "yeniden ferah hissettiren",
          "aydınlık ve güvenilir temizlik.",
        ],
        aboutEyebrow: "(Hakkımızda)",
        aboutTitle: ["Temiz Evler,", "Sakin Günler"],
        aboutParagraphs: [
          [
            "HI-Clean, evinin her küçük detayını yönetmeden",
            "bakımlı hissetmesini isteyen insanlar için kuruldu.",
            "Ekibimiz düzenli temizlik, detaylı yenileme",
            "ve taşınma işlerini sade ve özenli bir süreçle yürütür.",
          ],
          [
            "Günlük yaşamı şekillendiren odalara odaklanırız:",
            "mutfaklar, banyolar, zeminler, camlar ve bir alanı",
            "gerçekten tamamlanmış hissettiren sessiz köşeler.",
          ],
        ],
        careEyebrow: "(Neleri üstleniyoruz)",
        trustPoints: [
          "Daire temizliği",
          "Ev temizliği",
          "Detaylı temizlik",
          "Taşınma ferahlığı",
          "Cam bakımı",
          "Misafire hazır düzen",
        ],
      },
      results: {
        eyebrow: "(Son sonuçlar)",
        title: "Sonuçlar",
        lines: [
          "Yaşanan dairelerden",
          "misafire hazır evlere, her temizlik",
          "görünür bir özenle tamamlanır.",
        ],
        projects: [
          { name: "Daire Yenileme", year: "Daireler", image: PROJECTS_IMAGES[0] },
          { name: "Aile Evi Ferahlığı", year: "Evler", image: PROJECTS_IMAGES[1] },
          { name: "Taşınma Detayı", year: "Taşınma", image: PROJECTS_IMAGES[2] },
          { name: "Tadilat Sonrası Parlaklık", year: "Derin temizlik", image: PROJECTS_IMAGES[3] },
        ],
      },
      services: {
        eyebrow: "(Ne yapıyoruz)",
        title: "Hizmetler",
        lines: [
          "Günlük evler, derin yenilemeler",
          "ve taşınmaya hazır alanlar için",
          "pratik temizlik paketleri.",
        ],
        cards: [
          {
            title: ["Daire", "Temizliği"],
            description:
              "Mutfaklar, banyolar, yatak odaları ve yaşam alanları için güvenilir düzenli temizlik.",
            details: {
              title: "Dahil Bakım",
              services: ["Toz ve yüzeyler", "Mutfak düzeni", "Banyo hijyeni", "Zeminler ve süpürme"],
            },
            image: SERVICES_IMAGES[0],
          },
          {
            title: ["Ev", "Temizliği"],
            description:
              "Sürekli ilgi ve detay isteyen evler için oda oda temizlik.",
            details: {
              title: "Ev Hizmetleri",
              services: ["Yatak ve yaşam odaları", "Merdiven ve koridorlar", "Çöp çıkarma", "Ferah son dokunuşlar"],
            },
            image: SERVICES_IMAGES[1],
          },
          {
            title: ["Derin", "Temizlik"],
            description:
              "Taşınmalar, sezonluk yenilemeler ve ekstra özen isteyen alanlar için odaklı temizlik.",
            details: {
              title: "Derin Detaylar",
              services: ["Cihaz dış yüzeyleri", "Süpürgelik ve kenarlar", "İç cam bakımı", "Tadilat sonrası toz"],
            },
            image: SERVICES_IMAGES[2],
          },
        ],
      },
      testimonials: {
        eyebrow: "(Yorumlar)",
        title: ["Müşterilerimiz", "ne söylüyor"],
        lines: [
          "Ferah odalar, kolay rezervasyon",
          "ve insanların eve davet ederken",
          "rahat hissettiği bir temizlik ekibi.",
        ],
        items: [
          {
            testimonial: "Daire daha eşyaları açmadan aydınlık hissettirdi.",
            extra_comment:
              "HI-Clean taşınma temizliğimizi hızlıca halletti ve her odayı ailemiz için ferah, parlak ve hazır bıraktı.",
            avatar: HOME_IMAGES[0],
            name: "Maya Johnson",
            company: "Daire müşterisi",
          },
          {
            testimonial: "Detaya gerçekten dikkat eden güvenilir haftalık temizlik.",
            extra_comment:
              "Ekip dakik, evimize özenli davranıyor ve mutfakla banyoları her seferinde yepyeni gösteriyor.",
            avatar: HOME_IMAGES[1],
            name: "Daniel Reed",
            company: "Ev müşterisi",
          },
          {
            testimonial: "Tüm evi hafifleten bir derin temizlikti.",
            extra_comment:
              "Köşelerden süpürgeliklere, camlardan sık dokunulan yüzeylere kadar bizim kaçırdığımız küçük detayları üstlendiler.",
            avatar: HOME_IMAGES[2],
            name: "Sofia Carter",
            company: "Derin temizlik",
          },
          {
            testimonial: "Kolay rezervasyon, sorunsuz hizmet, tertemiz sonuç.",
            extra_comment:
              "Misafirlerden önce aynı hafta içinde ferahlık gerekiyordu. HI-Clean süreci kolaylaştırdı ve ev mükemmel göründü.",
            avatar: HOME_IMAGES[3],
            name: "Nora Wilson",
            company: "Misafire hazır temizlik",
          },
          {
            testimonial: "Alanı gerçekten önemseyerek temizlediler.",
            extra_comment:
              "Hiçbir şey aceleye gelmedi. Ekip dikkatli hareket etti, detayları kontrol etti ve evi ağır kokular olmadan ferah bıraktı.",
            avatar: HOME_IMAGES[4],
            name: "Adam Brooks",
            company: "Düzenli müşteri",
          },
          {
            testimonial: "Tadilat tozu ve son işler için mükemmeldi.",
            extra_comment:
              "Her yerde ince toz vardı. HI-Clean evi yeniden sakin, yaşanabilir ve rahat bir hale getirdi.",
            avatar: HOME_IMAGES[5],
            name: "Elena Park",
            company: "Tadilat temizliği",
          },
        ],
      },
      footer: {
        intro: "İlk mesajdan itibaren kolay hissettiren bir ev temizliği ayırtın.",
        links: [
          {
            category: "Keşfet",
            links: [
              { name: "Ana sayfa", href: "#top" },
              { name: "Hizmetler", href: "#services" },
              { name: "Sonuçlar", href: "#results" },
              { name: "Yorumlar", href: "#reviews" },
            ],
          },
          {
            category: "Temizlik",
            links: [
              { name: "Daireler", href: "#services" },
              { name: "Evler", href: "#services" },
              { name: "Derin Temizlik", href: "#services" },
            ],
          },
          {
            category: "İletişim",
            links: [
              { name: "Temizlik Ayırt", href: "mailto:hello@hi-clean.com" },
              { name: "HI-Clean'i Ara", href: "tel:+905523973333" },
            ],
          },
          {
            category: "Sosyal",
            links: [
              { name: "WhatsApp +90 552 397 33 33", href: "https://wa.me/905523973333" },
              { name: "Telegram @HI_CLEAN1", href: "https://t.me/HI_CLEAN1" },
              { name: "Instagram", href: "https://www.instagram.com/hiclean.ist/" },
            ],
          },
        ],
      },
    },
    contact: { title: "İletişim" },
    socialFloating: {
      openLabel: "Sosyal bağlantıları aç",
      closeLabel: "Sosyal bağlantıları kapat",
    },
    servicesPage: {
      ui: servicesUi.tr,
      priceData: priceData.tr,
    },
  },
  ru: {
    localeName: "Русский",
    openGraphLocale: "ru_RU",
    metadata: {
      root: {
        title: "HI-Clean | Уборка квартир и домов в Стамбуле",
        description:
          "Премиальная уборка квартир, домов, генеральная уборка, уборка перед переездом, чистка диванов, матрасов, стульев, пуфов и ковров в Стамбуле.",
        imageAlt: "Логотип клинингового сервиса HI-Clean",
        keywords: [
          "HI-Clean",
          "уборка Стамбул",
          "уборка квартир",
          "уборка домов",
          "генеральная уборка",
          "чистка диванов",
          "чистка ковров",
        ],
      },
      home: {
        title: "HI-Clean | Уборка квартир и домов в Стамбуле",
        description:
          "Закажите надежную уборку квартир, домов, генеральную, переездную и тканевую чистку в Стамбуле с HI-Clean.",
        imageAlt: "Логотип клинингового сервиса HI-Clean",
      },
      services: {
        title: "Услуги и цены | HI-Clean",
        description:
          "Выберите услугу HI-Clean, рассчитайте примерную стоимость и отправьте заявку на уборку в Стамбуле.",
        imageAlt: "Логотип клинингового сервиса HI-Clean",
      },
      contact: {
        title: "Контакты | HI-Clean",
        description:
          "Напишите HI-Clean в WhatsApp, Instagram или Telegram для уборки в Стамбуле.",
        imageAlt: "Логотип клинингового сервиса HI-Clean",
      },
    },
    nav: {
      services: "Услуги",
      results: "Результаты",
      reviews: "Отзывы",
      contact: "Контакты",
      languageLabel: "Выберите язык",
    },
    home: {
      hero: {
        imageAlt: "Команда HI-Clean в светлом доме",
        eyebrow: "(Квартиры и дома)",
        headlineLines: [
          "Светлая и надежная уборка",
          "для квартир и домов,",
          "которым снова нужна свежесть.",
        ],
        aboutEyebrow: "(О нас)",
        aboutTitle: ["Чистые дома,", "спокойные дни"],
        aboutParagraphs: [
          [
            "HI-Clean создан для людей, которые хотят,",
            "чтобы дом ощущался ухоженным без контроля каждой мелочи.",
            "Наша команда выполняет регулярную уборку, глубокое обновление",
            "и подготовку к переезду через простой и бережный процесс.",
          ],
          [
            "Мы фокусируемся на комнатах, которые формируют повседневность:",
            "кухнях, ванных, полах, окнах и всех тихих углах,",
            "из-за которых пространство выглядит по-настоящему завершенным.",
          ],
        ],
        careEyebrow: "(О чем мы заботимся)",
        trustPoints: [
          "Уборка квартир",
          "Уборка домов",
          "Глубокая уборка",
          "Свежесть перед въездом",
          "Уход за окнами",
          "Дом к приезду гостей",
        ],
      },
      results: {
        eyebrow: "(Недавние результаты)",
        title: "Результаты",
        lines: [
          "От жилых квартир",
          "до домов, готовых к гостям,",
          "каждая уборка завершена с видимой заботой.",
        ],
        projects: [
          { name: "Обновление квартиры", year: "Квартиры", image: PROJECTS_IMAGES[0] },
          { name: "Свежесть семейного дома", year: "Дома", image: PROJECTS_IMAGES[1] },
          { name: "Детали перед въездом", year: "Переезд", image: PROJECTS_IMAGES[2] },
          { name: "Блеск после ремонта", year: "Глубокая уборка", image: PROJECTS_IMAGES[3] },
        ],
      },
      services: {
        eyebrow: "(Что мы делаем)",
        title: "Услуги",
        lines: [
          "Практичные пакеты уборки",
          "для обычных домов, глубокого обновления",
          "и пространств, готовых к переезду.",
        ],
        cards: [
          {
            title: ["Уборка", "квартир"],
            description:
              "Надежная регулярная уборка кухонь, ванных, спален и жилых зон.",
            details: {
              title: "Включенный уход",
              services: ["Пыль и поверхности", "Порядок на кухне", "Гигиена ванной", "Полы и пылесос"],
            },
            image: SERVICES_IMAGES[0],
          },
          {
            title: ["Уборка", "домов"],
            description:
              "Покомнатная уборка для домов, которым нужны постоянное внимание и детали.",
            details: {
              title: "Домашние услуги",
              services: ["Спальни и гостиные", "Лестницы и коридоры", "Вынос мусора", "Свежие финальные штрихи"],
            },
            image: SERVICES_IMAGES[1],
          },
          {
            title: ["Глубокая", "уборка"],
            description:
              "Сфокусированная уборка для переезда, сезонного обновления и пространств, которым нужна особая забота.",
            details: {
              title: "Глубокие детали",
              services: ["Внешние поверхности техники", "Плинтусы и края", "Уход за окнами внутри", "Пыль после ремонта"],
            },
            image: SERVICES_IMAGES[2],
          },
        ],
      },
      testimonials: {
        eyebrow: "(Отзывы)",
        title: ["Что говорят", "наши клиенты"],
        lines: [
          "Свежие комнаты, простое бронирование",
          "и команда уборки, которую люди",
          "спокойно приглашают домой.",
        ],
        items: [
          {
            testimonial: "Квартира стала светлой еще до того, как мы распаковали вещи.",
            extra_comment:
              "HI-Clean быстро провели уборку перед въездом и оставили каждую комнату свежей, чистой и готовой для семьи.",
            avatar: HOME_IMAGES[0],
            name: "Maya Johnson",
            company: "Клиент квартиры",
          },
          {
            testimonial: "Надежная еженедельная уборка с настоящим вниманием к деталям.",
            extra_comment:
              "Команда пунктуальна, бережно относится к дому и каждый раз оставляет кухню и ванные как новые.",
            avatar: HOME_IMAGES[1],
            name: "Daniel Reed",
            company: "Клиент дома",
          },
          {
            testimonial: "Глубокая уборка, после которой весь дом стал легче.",
            extra_comment:
              "Они занялись мелочами, которые мы всегда пропускаем: углами, плинтусами, окнами и поверхностями частого касания.",
            avatar: HOME_IMAGES[2],
            name: "Sofia Carter",
            company: "Глубокая уборка",
          },
          {
            testimonial: "Легкое бронирование, ровный сервис, безупречный результат.",
            extra_comment:
              "Нам нужна была срочная уборка перед гостями. HI-Clean сделали процесс простым, а дом выглядел отлично.",
            avatar: HOME_IMAGES[3],
            name: "Nora Wilson",
            company: "Уборка перед гостями",
          },
          {
            testimonial: "Они убирали так, будто пространство им действительно важно.",
            extra_comment:
              "Ничего не было сделано в спешке. Команда работала аккуратно, проверяла детали и оставила дом свежим без резких запахов.",
            avatar: HOME_IMAGES[4],
            name: "Adam Brooks",
            company: "Постоянный клиент",
          },
          {
            testimonial: "Идеально после ремонтной пыли и финальных работ.",
            extra_comment:
              "В квартире была мелкая пыль повсюду. HI-Clean вернули ей спокойное, жилое и комфортное состояние.",
            avatar: HOME_IMAGES[5],
            name: "Elena Park",
            company: "Уборка после ремонта",
          },
        ],
      },
      footer: {
        intro: "Закажите домашнюю уборку, которая ощущается простой уже с первого сообщения.",
        links: [
          {
            category: "Навигация",
            links: [
              { name: "Главная", href: "#top" },
              { name: "Услуги", href: "#services" },
              { name: "Результаты", href: "#results" },
              { name: "Отзывы", href: "#reviews" },
            ],
          },
          {
            category: "Уборка",
            links: [
              { name: "Квартиры", href: "#services" },
              { name: "Дома", href: "#services" },
              { name: "Глубокая уборка", href: "#services" },
            ],
          },
          {
            category: "Контакты",
            links: [
              { name: "Заказать уборку", href: "mailto:hello@hi-clean.com" },
              { name: "Позвонить HI-Clean", href: "tel:+905523973333" },
            ],
          },
          {
            category: "Соцсети",
            links: [
              { name: "WhatsApp +90 552 397 33 33", href: "https://wa.me/905523973333" },
              { name: "Telegram @HI_CLEAN1", href: "https://t.me/HI_CLEAN1" },
              { name: "Instagram", href: "https://www.instagram.com/hiclean.ist/" },
            ],
          },
        ],
      },
    },
    contact: { title: "Контакты" },
    socialFloating: {
      openLabel: "Открыть социальные ссылки",
      closeLabel: "Закрыть социальные ссылки",
    },
    servicesPage: {
      ui: servicesUi.ru,
      priceData: priceData.ru,
    },
  },
  en: {
    localeName: "English",
    openGraphLocale: "en_US",
    metadata: {
      root: {
        title: "HI-Clean | Apartment and House Cleaning in Istanbul",
        description:
          "Premium apartment, house, deep, move-in, sofa, mattress, chair, pouf, and carpet cleaning in Istanbul.",
        imageAlt: "HI-Clean cleaning service logo",
        keywords: [
          "HI-Clean",
          "Istanbul cleaning",
          "apartment cleaning",
          "house cleaning",
          "deep cleaning",
          "sofa cleaning",
          "carpet cleaning",
        ],
      },
      home: {
        title: "HI-Clean | Apartment and House Cleaning in Istanbul",
        description:
          "Book reliable apartment, house, deep, move-in, and fabric cleaning in Istanbul with HI-Clean.",
        imageAlt: "HI-Clean cleaning service logo",
      },
      services: {
        title: "Services and Prices | HI-Clean",
        description:
          "Choose a HI-Clean service, calculate an estimate, and send a cleaning request for Istanbul.",
        imageAlt: "HI-Clean cleaning service logo",
      },
      contact: {
        title: "Contact | HI-Clean",
        description:
          "Message HI-Clean on WhatsApp, Instagram, or Telegram for cleaning in Istanbul.",
        imageAlt: "HI-Clean cleaning service logo",
      },
    },
    nav: {
      services: "Services",
      results: "Results",
      reviews: "Reviews",
      contact: "Contact",
      languageLabel: "Select language",
    },
    home: {
      hero: {
        imageAlt: "HI-Clean team in a bright home",
        eyebrow: "(Apartments and houses)",
        headlineLines: [
          "Bright, reliable cleaning for",
          "apartments and houses that",
          "need to feel fresh again.",
        ],
        aboutEyebrow: "(About Us)",
        aboutTitle: ["Clean Homes,", "Calm Days"],
        aboutParagraphs: [
          [
            "HI-Clean is built for people who want their home",
            "to feel cared for without managing every small detail.",
            "Our team handles regular cleaning, deep refreshes,",
            "and move-in work with a simple, careful process.",
          ],
          [
            "We focus on the rooms that shape daily life:",
            "kitchens, bathrooms, floors, windows, and all the",
            "quiet corners that make a space feel truly finished.",
          ],
        ],
        careEyebrow: "(What we take care of)",
        trustPoints: [
          "Apartment cleaning",
          "House cleaning",
          "Deep cleaning",
          "Move-in refresh",
          "Window care",
          "Guest-ready reset",
        ],
      },
      results: {
        eyebrow: "(Recent results)",
        title: "Results",
        lines: [
          "From lived-in apartments to",
          "guest-ready homes, every clean",
          "is finished with visible care.",
        ],
        projects: [
          { name: "Apartment Reset", year: "Apartments", image: PROJECTS_IMAGES[0] },
          { name: "Family Home Refresh", year: "Houses", image: PROJECTS_IMAGES[1] },
          { name: "Move-In Detail", year: "Move-in", image: PROJECTS_IMAGES[2] },
          { name: "After-Renovation Polish", year: "Deep clean", image: PROJECTS_IMAGES[3] },
        ],
      },
      services: {
        eyebrow: "(What we do)",
        title: "Services",
        lines: [
          "Practical cleaning packages",
          "for everyday homes, deep resets,",
          "and move-in-ready spaces.",
        ],
        cards: [
          {
            title: ["Apartment", "Cleaning"],
            description:
              "Reliable regular cleaning for kitchens, bathrooms, bedrooms, and living spaces.",
            details: {
              title: "Included Care",
              services: ["Dusting and surfaces", "Kitchen reset", "Bathroom sanitation", "Floors and vacuuming"],
            },
            image: SERVICES_IMAGES[0],
          },
          {
            title: ["House", "Cleaning"],
            description:
              "Room-by-room cleaning for homes that need consistent attention and detail.",
            details: {
              title: "Home Services",
              services: ["Bedrooms and living rooms", "Stairs and hallways", "Trash removal", "Fresh finishing touches"],
            },
            image: SERVICES_IMAGES[1],
          },
          {
            title: ["Deep", "Cleaning"],
            description:
              "A focused clean for move-ins, seasonal refreshes, and spaces that need extra care.",
            details: {
              title: "Deep Details",
              services: ["Appliance exteriors", "Baseboards and edges", "Interior window care", "Post-renovation dust"],
            },
            image: SERVICES_IMAGES[2],
          },
        ],
      },
      testimonials: {
        eyebrow: "(Testimonials)",
        title: ["What our", "clients say"],
        lines: [
          "Fresh rooms, simple booking,",
          "and a cleaning team people",
          "feel comfortable inviting in.",
        ],
        items: [
          {
            testimonial: "The apartment felt bright before we even unpacked.",
            extra_comment:
              "HI-Clean handled our move-in cleaning quickly and left every room fresh, polished, and ready for the family.",
            avatar: HOME_IMAGES[0],
            name: "Maya Johnson",
            company: "Apartment client",
          },
          {
            testimonial: "Reliable weekly cleaning with real attention to detail.",
            extra_comment:
              "The team is punctual, careful with our home, and always leaves the kitchen and bathrooms looking brand new.",
            avatar: HOME_IMAGES[1],
            name: "Daniel Reed",
            company: "House client",
          },
          {
            testimonial: "A deep clean that made the whole house feel lighter.",
            extra_comment:
              "They took care of the small things we always miss, from corners and baseboards to windows and high-touch surfaces.",
            avatar: HOME_IMAGES[2],
            name: "Sofia Carter",
            company: "Deep cleaning",
          },
          {
            testimonial: "Easy booking, smooth service, spotless result.",
            extra_comment:
              "We needed a same-week refresh before guests arrived. HI-Clean made the process simple and the house looked excellent.",
            avatar: HOME_IMAGES[3],
            name: "Nora Wilson",
            company: "Guest-ready clean",
          },
          {
            testimonial: "They cleaned like they cared about the space.",
            extra_comment:
              "Nothing felt rushed. The team moved carefully, checked details, and left our home smelling fresh without harsh odors.",
            avatar: HOME_IMAGES[4],
            name: "Adam Brooks",
            company: "Regular client",
          },
          {
            testimonial: "Perfect after renovation dust and finishing work.",
            extra_comment:
              "Our place had fine dust everywhere. HI-Clean brought it back to a calm, livable, comfortable home.",
            avatar: HOME_IMAGES[5],
            name: "Elena Park",
            company: "Renovation clean",
          },
        ],
      },
      footer: {
        intro: "Book a home cleaning that feels easy from the first message.",
        links: [
          {
            category: "Explore",
            links: [
              { name: "Home", href: "#top" },
              { name: "Services", href: "#services" },
              { name: "Results", href: "#results" },
              { name: "Reviews", href: "#reviews" },
            ],
          },
          {
            category: "Cleaning",
            links: [
              { name: "Apartments", href: "#services" },
              { name: "Houses", href: "#services" },
              { name: "Deep Cleaning", href: "#services" },
            ],
          },
          {
            category: "Contact",
            links: [
              { name: "Book a Clean", href: "mailto:hello@hi-clean.com" },
              { name: "Call HI-Clean", href: "tel:+905523973333" },
            ],
          },
          {
            category: "Socials",
            links: [
              { name: "WhatsApp +90 552 397 33 33", href: "https://wa.me/905523973333" },
              { name: "Telegram @HI_CLEAN1", href: "https://t.me/HI_CLEAN1" },
              { name: "Instagram", href: "https://www.instagram.com/hiclean.ist/" },
            ],
          },
        ],
      },
    },
    contact: { title: "Contact" },
    socialFloating: {
      openLabel: "Open social links",
      closeLabel: "Close social links",
    },
    servicesPage: {
      ui: servicesUi.en,
      priceData: priceData.en,
    },
  },
} satisfies Record<Locale, SiteContent>;

export function getContent(locale: Locale) {
  return content[locale];
}
