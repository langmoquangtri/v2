var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_vite = require("vite");
var import_app = require("firebase/app");
var import_firestore = require("firebase/firestore");
var firebaseConfig = {
  apiKey: "AIzaSyAT-B3qaiggBIURgQ2KZNxyoOZF3EfDhbw",
  authDomain: "lang-mo-cms.firebaseapp.com",
  projectId: "lang-mo-cms",
  storageBucket: "lang-mo-cms.firebasestorage.app",
  messagingSenderId: "809136893303",
  appId: "1:809136893303:web:fba4babcac9f18459fc572",
  measurementId: "G-TQ2HFMVPHD"
};
var firebaseApp = (0, import_app.initializeApp)(firebaseConfig);
var db = (0, import_firestore.getFirestore)(firebaseApp);
var banners = [
  {
    id: "b1",
    title: "Ch\u1EBF T\xE1c Bia M\u1ED9 \u0110\xE1 T\u1EF1 Nhi\xEAn & Granite Cao C\u1EA5p",
    subtitle: "Ch\u1EA1m kh\u1EAFc tinh x\u1EA3o b\u1EDFi ngh\u1EC7 nh\xE2n l\xE0ng ngh\u1EC1 truy\u1EC1n th\u1ED1ng. S\u1EED d\u1EE5ng d\xF2ng \u0111\xE1 tuy\u1EC3n ch\u1ECDn ch\u1ECBu l\u1EF1c ch\u1ECBu nhi\u1EC7t t\u1ED1t nh\u1EA5t, kh\u1EAFc ch\u1EEF s\xE2u m\u1EA1 v\xE0ng 24K tr\u01B0\u1EDDng t\u1ED3n c\xF9ng th\u1EDDi gian.",
    imageUrl: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=1200&auto=format&fit=crop",
    badge: "Tinh Hoa L\xE0ng Ngh\u1EC1 \u0110\xE1 M\u1EF9 Ngh\u1EC7",
    ctaText: "Kh\xE1m Ph\xE1 B\u1ED9 S\u01B0u T\u1EADp",
    ctaLink: "/san-pham"
  },
  {
    id: "b2",
    title: "L\u01B0u Danh Thi\xEAn Thu - Tr\u1ECDn V\u1EB9n \u0110\u1EA1o Hi\u1EBFu",
    subtitle: "Cam k\u1EBFt s\u1EED d\u1EE5ng \u0111\xE1 t\u1EF1 nhi\xEAn nguy\xEAn kh\u1ED1i 100%. Thi\u1EBFt k\u1EBF chu\u1EA9n phong th\u1EE7y th\u01B0\u1EDBc L\u1ED7 Ban, ch\u1EA1m kh\u1EAFc r\u1ED3ng ph\u01B0\u1EE3ng, hoa sen tinh t\u1EBF.",
    imageUrl: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=1200&auto=format&fit=crop",
    badge: "Phong Th\u1EE7y C\xE1t T\u01B0\u1EDDng",
    ctaText: "T\u01B0 V\u1EA5n Phong Th\u1EE7y Mi\u1EC5n Ph\xED",
    ctaLink: "/lien-he"
  }
];
var categories = [
  {
    id: "cat-1",
    name: "Bia M\u1ED9 \u0110\xE1 Granite (Hoa C\u01B0\u01A1ng)",
    slug: "bia-mo-da-granite",
    description: "C\xE1c m\u1EABu bia l\xE0m t\u1EEB \u0111\xE1 hoa c\u01B0\u01A1ng nh\u1EADp kh\u1EA9u cao c\u1EA5p c\xF3 \u0111\u1ED9 c\u1EE9ng c\u1EF1c cao, b\u1EC1 m\u1EB7t s\xE1ng b\xF3ng sang tr\u1ECDng, ch\u1ED1ng ch\u1ECBu m\u01B0a n\u1EAFng tuy\u1EC7t \u0111\u1ED1i.",
    imageUrl: "https://images.unsplash.com/photo-1604147706283-d7119b5b822c?q=80&w=500&auto=format&fit=crop",
    iconName: "Layers"
  },
  {
    id: "cat-2",
    name: "Bia M\u1ED9 \u0110\xE1 Xanh Thanh H\xF3a",
    slug: "bia-mo-da-xanh-thanh-hoa",
    description: "S\u1EED d\u1EE5ng d\xF2ng \u0111\xE1 xanh r\xEAu, xanh \u0111en nguy\xEAn kh\u1ED1i Thanh H\xF3a c\u1ED5 k\xEDnh, d\u1EBBo dai, l\xFD t\u01B0\u1EDFng cho \u0111i\xEAu kh\u1EAFc r\u1ED3ng ph\u01B0\u1EE3ng, ch\u1EEF H\xE1n c\u1ED5 truy\u1EC1n.",
    imageUrl: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?q=80&w=500&auto=format&fit=crop",
    iconName: "Feather"
  },
  {
    id: "cat-3",
    name: "M\u1ED9 \u0110\xE1 M\u1EF9 Ngh\u1EC7 Nguy\xEAn Kh\u1ED1i",
    slug: "mo-da-my-nghe",
    description: "Nh\u1EADn thi\u1EBFt k\u1EBF v\xE0 l\u1EAFp \u0111\u1EB7t tr\u1ECDn g\xF3i m\u1ED9 \u0111\xE1 tam c\u1EA5p, m\u1ED9 tr\xF2n, l\u0103ng c\xE1nh, l\u0103ng th\u1EDD chung chu\u1EA9n phong th\u1EE7y d\xF2ng h\u1ECD.",
    imageUrl: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=500&auto=format&fit=crop",
    iconName: "Castle"
  },
  {
    id: "cat-4",
    name: "Bia Di T\xEDch & Bia Ghi Danh",
    slug: "bia-di-tich-bia-ghi-danh",
    description: "Bia \u0111\xE1 kh\u1ED5 l\u1EDBn ph\u1EE5c v\u1EE5 \u0111\xECnh, ch\xF9a, \u0111\u1EC1n mi\u1EBFu ho\u1EB7c \u0111\xE0i t\u01B0\u1EDFng ni\u1EC7m anh h\xF9ng li\u1EC7t s\u0129. Ch\u1EEF kh\u1EAFc s\xE2u s\xE2u s\u1EAFc, ch\xEDnh x\xE1c tuy\u1EC7t \u0111\u1ED1i.",
    imageUrl: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?q=80&w=500&auto=format&fit=crop",
    iconName: "Award"
  }
];
var products = [
  {
    id: "p1",
    name: "Bia M\u1ED9 \u0110\xE1 Granite \u0110en Kim Sa Cao C\u1EA5p",
    slug: "bia-mo-da-granite-den-kim-sa",
    categorySlug: "bia-mo-da-granite",
    categoryName: "Bia M\u1ED9 \u0110\xE1 Granite (Hoa C\u01B0\u01A1ng)",
    price: 135e4,
    priceStr: "1.350.000 \u0111",
    imageUrl: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?q=80&w=600&auto=format&fit=crop",
    shortDescription: "Ch\u1EA5t li\u1EC7u \u0111\xE1 granite \u0111en kim sa h\u1EA1t trung sang tr\u1ECDng, b\u1EAFt s\xE1ng l\u1EA5p l\xE1nh d\u01B0\u1EDBi \xE1nh n\u1EAFng m\u1EB7t tr\u1EDDi, ch\u1EEF kh\u1EAFc s\xE2u s\u01A1n m\u1EA1 v\xE0ng 24K c\u1EF1c b\u1EC1n b\u1EC9.",
    description: "Bia m\u1ED9 \u0111\xE1 Granite \u0111en kim sa l\xE0 s\u1EA3n ph\u1EA9m \u0111\u01B0\u1EE3c \u01B0a chu\u1ED9ng nh\u1EA5t nh\u1EDD v\u1EBB \u0111\u1EB9p sang tr\u1ECDng, qu\xFD ph\xE1i. Nh\u1EEFng h\u1EA1t kim sa \xF3ng \xE1nh \u1EA9n s\xE2u trong l\u1EDBp \u0111\xE1 t\u1EA1o hi\u1EC7u \u1EE9ng l\u1EA5p l\xE1nh trang nghi\xEAm d\u01B0\u1EDBi \xE1nh n\u1EAFng m\u1EB7t tr\u1EDDi. \u0110\xE1 \u0111\u01B0\u1EE3c nh\u1EADp kh\u1EA9u ch\xEDnh ng\u1EA1ch, c\xF3 \u0111\u1ED9 b\xF3ng t\u1EF1 nhi\xEAn v\u0129nh c\u1EEDu, kh\xF4ng b\u1ECB phai m\xE0u hay bong tr\xF3c d\u01B0\u1EDBi t\xE1c \u0111\u1ED9ng kh\u1EAFc nghi\u1EC7t c\u1EE7a th\u1EDDi ti\u1EBFt Vi\u1EC7t Nam.",
    specifications: [
      { key: "K\xEDch th\u01B0\u1EDBc ph\u1ED5 bi\u1EBFn", value: "30x40 cm, 35x50 cm, 40x60 cm (Nh\u1EADn \u0111\u1EB7t theo k\xEDch th\u01B0\u1EDBc y\xEAu c\u1EA7u)" },
      { key: "Ch\u1EA5t li\u1EC7u", value: "\u0110\xE1 Granite \u0110en Kim Sa nh\u1EADp kh\u1EA9u" },
      { key: "C\xF4ng ngh\u1EC7 kh\u1EAFc", value: "Kh\u1EAFc CNC ch\xECm s\xE2u k\u1EBFt h\u1EE3p \u0111\u1EE5c tay th\u1EE7 c\xF4ng chi ti\u1EBFt hoa v\u0103n" },
      { key: "Ch\u1EA5t li\u1EC7u ph\u1EE7 ch\u1EEF", value: "S\u01A1n v\xE0ng cao c\u1EA5p ch\u1ECBu nhi\u1EC7t ho\u1EB7c m\u1EA1 v\xE0ng l\xE1 24K (theo y\xEAu c\u1EA7u)" },
      { key: "Th\u1EDDi gian ho\xE0n th\xE0nh", value: "3 - 5 ng\xE0y" }
    ],
    features: [
      "B\u1EC1 m\u1EB7t ph\u1EB3ng tuy\u1EC7t \u0111\u1ED1i, \u0111\u1ED9 b\xF3ng g\u01B0\u01A1ng c\u1EF1c cao d\u1EC5 d\xE0ng lau ch\xF9i v\u1EC7 sinh.",
      "\u0110\u1ED9 c\u1EE9ng cao, ch\u1ECBu l\u1EF1c n\xE9n c\u1EF1c t\u1ED1t, kh\xF4ng n\u1EE9t n\u1EBB qua th\u1EDDi gian.",
      "Hoa v\u0103n vi\u1EC1n ch\u1EEF v\u1EA1n, r\u1ED3ng ch\u1EA7u nguy\u1EC7t ho\u1EB7c hoa sen t\xF9y ch\u1ECDn.",
      "Cam k\u1EBFt b\u1EA3o h\xE0nh ch\u1EEF kh\u1EAFc l\xEAn t\u1EDBi 15 n\u0103m kh\xF4ng phai m\xE0u s\u01A1n."
    ],
    isFeatured: true,
    rating: 5,
    inStock: true
  },
  {
    id: "p2",
    name: "Bia M\u1ED9 \u0110\xE1 Xanh R\xEAu Kh\u1EAFc Hoa Sen C\u1ED5",
    slug: "bia-mo-da-xanh-reu-hoa-sen-co",
    categorySlug: "bia-mo-da-xanh-thanh-hoa",
    categoryName: "Bia M\u1ED9 \u0110\xE1 Xanh Thanh H\xF3a",
    price: 185e4,
    priceStr: "1.850.000 \u0111",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
    shortDescription: "\u0110\xE1 xanh r\xEAu Thanh H\xF3a nguy\xEAn kh\u1ED1i d\u1EBBo dai tuy\u1EC7t v\u1EDDi, \u0111i\xEAu kh\u1EAFc hoa sen ch\u1EA1m n\u1ED5i m\u1ED9c m\u1EA1c c\u1ED5 k\xEDnh, mang \u0111\u1EADm gi\xE1 tr\u1ECB t\xE2m linh truy\u1EC1n th\u1ED1ng.",
    description: "S\u1EA3n ph\u1EA9m \u0111\u01B0\u1EE3c ch\u1EBF t\xE1c t\u1EEB \u0111\xE1 xanh r\xEAu t\u1EF1 nhi\xEAn khai th\xE1c t\u1EA1i m\u1ECF \u0111\xE1 v\xF9ng n\xFAi Y\xEAn \u0110\u1ECBnh, Thanh H\xF3a. Ch\u1EA5t \u0111\xE1 c\xF3 th\u1EDB m\u1ECBn, d\u1EBBo dai ch\u1ECBu m\xE0i m\xF2n cao, m\xE0u s\u1EAFc xanh ng\u1ECDc c\u1ED5 k\xEDnh sang tr\u1ECDng. \u0110i\u1EC3m n\u1ED5i b\u1EADt l\xE0 b\xF4ng sen \u0111\u01B0\u1EE3c ngh\u1EC7 nh\xE2n ch\u1EA1m n\u1ED5i tinh t\u1EBF \u1EDF ch\xE2n bia, t\u01B0\u1EE3ng tr\u01B0ng cho s\u1EF1 thanh cao, an y\xEAn, tho\xE1t t\u1EE5c c\u1EE7a ng\u01B0\u1EDDi \u0111\xE3 khu\u1EA5t.",
    specifications: [
      { key: "K\xEDch th\u01B0\u1EDBc ti\xEAu chu\u1EA9n", value: "30x40 cm, 40x60 cm" },
      { key: "\u0110\u1ED9 d\xE0y \u0111\xE1", value: "3 cm - 5 cm nguy\xEAn kh\u1ED1i" },
      { key: "M\xE0u s\u1EAFc", value: "Xanh r\xEAu t\u1EF1 nhi\xEAn (\u0111\u1EADm nh\u1EA1t theo v\xE2n \u0111\xE1)" },
      { key: "\u0110i\xEAu kh\u1EAFc", value: "Ch\u1EEF kh\u1EAFc ch\xECm, hoa sen ch\u1EA1m n\u1ED5i 3D s\xE2u 1.2 cm" },
      { key: "Phong th\u1EE7y", value: "\u0110\u1EB7c bi\u1EC7t v\u01B0\u1EE3ng c\xE1t cho gia ch\u1EE7 m\u1EC7nh M\u1ED9c v\xE0 m\u1EC7nh H\u1ECFa" }
    ],
    features: [
      "\u0110\xE1 t\u1EF1 nhi\xEAn nguy\xEAn kh\u1ED1i 100%, c\xE0ng \u0111\u1EC3 l\xE2u phong tr\u1EA7n c\xE0ng \u0111\u1EB9p c\u1ED5 k\xEDnh.",
      "Ngh\u1EC7 thu\u1EADt ch\u1EA1m kh\u1EAFc tinh x\u1EA3o t\u1EEB b\xE0n tay c\xE1c ngh\u1EC7 nh\xE2n k\u1EF3 c\u1EF1u.",
      "M\xE0u s\u1EAFc \u0111\xE1 trang nghi\xEAm, h\xF2a quy\u1EC7n v\u1EDBi c\u1EA3nh quan l\u0103ng m\u1ED9 thi\xEAn nhi\xEAn.",
      "\u0110\u1ED9 b\u1EC1n v\u0129nh c\u1EEDu, kh\xF4ng ch\u1ECBu \u1EA3nh h\u01B0\u1EDFng b\u1EDFi axit trong n\u01B0\u1EDBc m\u01B0a."
    ],
    isFeatured: true,
    rating: 4.9,
    inStock: true
  },
  {
    id: "p3",
    name: "M\u1ED9 \u0110\xE1 Tam C\u1EA5p Granite \u0110\u1ECF Ruby",
    slug: "mo-da-tam-cap-granite-do-ruby",
    categorySlug: "mo-da-my-nghe",
    categoryName: "M\u1ED9 \u0110\xE1 M\u1EF9 Ngh\u1EC7 Nguy\xEAn Kh\u1ED1i",
    price: 165e5,
    priceStr: "16.500.000 \u0111",
    imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop",
    shortDescription: "M\u1ED9 \u0111\xE1 thi\u1EBFt k\u1EBF t\u1ED1i gi\u1EA3n hi\u1EC7n \u0111\u1EA1i v\u1EDBi 3 c\u1EA5p \u0111\xE1 Granite \u0111\u1ECF Ruby B\xECnh \u0110\u1ECBnh c\u1EF1c k\u1EF3 v\u1EEFng ch\xE3i, uy nghi\xEAm, th\u1EC3 hi\u1EC7n l\xF2ng hi\u1EBFu k\xEDnh v\xF4 b\u1EDD.",
    description: "M\u1ED9 \u0111\xE1 tam c\u1EA5p l\xE0 l\u1EF1a ch\u1ECDn ho\xE0n h\u1EA3o k\u1EBFt h\u1EE3p gi\u1EEFa xu h\u01B0\u1EDBng thi\u1EBFt k\u1EBF t\u1ED1i gi\u1EA3n hi\u1EC7n \u0111\u1EA1i v\xE0 phong th\u1EE7y truy\u1EC1n th\u1ED1ng v\u1EEFng ch\xE3i. Ch\u1EA5t li\u1EC7u \u0111\xE1 Granite \u0111\u1ECF Ruby xu\u1EA5t x\u1EE9 B\xECnh \u0110\u1ECBnh mang s\u1EAFc \u0111\u1ECF \u0111\u1EA5t \u1EA5m \xE1p, t\u01B0\u1EE3ng tr\u01B0ng cho h\xE0o kh\xED, s\u1EF1 v\u01B0\u1EE3ng t\u1ED9c v\xE0 tr\u01B0\u1EDDng t\u1ED3n. C\xE1c kh\u1ED1i \u0111\xE1 \u0111\u01B0\u1EE3c c\u1EAFt CNC vu\xF4ng v\u1EE9c, m\xE0i b\xF3ng m\u1ECBn v\xE0 l\u1EAFp gh\xE9p kh\xEDt khao b\u1EB1ng keo epoxy chuy\xEAn d\u1EE5ng si\xEAu li\xEAn k\u1EBFt.",
    specifications: [
      { key: "K\xEDch th\u01B0\u1EDBc \u0111\u1EBF bia", value: "81x127 cm, 89x147 cm (Chu\u1EA9n s\u1ED1 \u0111\u1ECF th\u01B0\u1EDBc L\u1ED7 Ban)" },
      { key: "K\u1EBFt c\u1EA5u", value: "3 th\u1EDBt \u0111\xE1 d\xE0y 15cm gh\xE9p kh\xEDt ho\u1EB7c t\u1EA1c nguy\xEAn kh\u1ED1i" },
      { key: "M\xE0u s\u1EAFc", value: "\u0110\u1ECF Ruby \u0111\u1EA5t k\u1EBFt h\u1EE3p ch\u1EC9 \u0111en tuy\u1EC1n" },
      { key: "Thi\u1EBFt k\u1EBF", value: "T\u1ED1i gi\u1EA3n hi\u1EC7n \u0111\u1EA1i ph\u1EB3ng phiu, bo c\u1EA1nh tinh t\u1EBF" },
      { key: "V\u1EADn chuy\u1EC3n", value: "H\u1ED7 tr\u1EE3 v\u1EADn chuy\u1EC3n v\xE0 thi c\xF4ng l\u1EAFp \u0111\u1EB7t to\xE0n qu\u1ED1c" }
    ],
    features: [
      "M\xE0u \u0111\u1ECF ruby \u0111\u1EA5t mang t\xEDnh \u1EA5m, bi\u1EC3u th\u1ECB s\u1EF1 h\u01B0ng th\u1ECBnh cho con ch\xE1u d\xF2ng h\u1ECD.",
      "D\u1EC5 d\xE0ng ch\u0103m s\xF3c, lau ch\xF9i, kh\xF4ng b\xE1m r\xEAu m\u1ED1c m\u1ECDc hoang.",
      "B\u1EC1n b\u1EC9 tuy\u1EC7t \u0111\u1ED1i tr\u01B0\u1EDBc gi\xF3 b\xE3o, kh\xF4ng s\u1EE5t l\xFAn nh\u1EDD m\xF3ng b\xEA t\xF4ng \u0111\xFAc v\u1EEFng ch\xE3i.",
      "T\xEDch h\u1EE3p khay c\u1EAFm h\u01B0\u01A1ng v\xE0 l\u1ECD hoa \u0111\u1ED3ng b\u1ED9 b\u1EB1ng \u0111\xE1 \u0111\u1ECF sang tr\u1ECDng."
    ],
    isFeatured: true,
    rating: 5,
    inStock: true
  },
  {
    id: "p4",
    name: "Bia Ghi Danh Li\u1EC7t S\u0129 / Bia Quy C\xF4ng \u0110\u1EE9c \u0110\xE1 Tr\u1EAFng",
    slug: "bia-ghi-danh-liet-si-da-trang",
    categorySlug: "bia-di-tich-bia-ghi-danh",
    categoryName: "Bia Di T\xEDch & Bia Ghi Danh",
    price: 85e5,
    priceStr: "8.500.000 \u0111",
    imageUrl: "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?q=80&w=600&auto=format&fit=crop",
    shortDescription: "Bia \u0111\xE1 tr\u1EAFng m\u1EF9 ngh\u1EC7 Non N\u01B0\u1EDBc \u0111\u1EE5c \u0111\u1EBDo r\u1ED3ng ch\u1EA7u ng\u1EADm ng\u1ECDc \u1EDF tr\xE1n bia, ch\xE2n \u0111\u1EBF r\xF9a \u0111\xE1 v\u1EEFng v\xE0ng, kh\u1EAFc t\xEAn c\xF4ng \u0111\u1EE9c \u0111\u1EC1n ch\xF9a danh m\xF4n.",
    description: "Chuy\xEAn ph\u1EE5c v\u1EE5 c\xE1c c\xF4ng tr\xECnh t\xE2m linh c\xF4ng c\u1ED9ng, \u0111\u1EC1n ch\xF9a, t\u1EEB \u0111\u01B0\u1EDDng d\xF2ng h\u1ECD. T\xE1c ph\u1EA9m bia \u0111\xE1 tr\u1EAFng m\u1EF9 ngh\u1EC7 s\u1EED d\u1EE5ng ph\xF4i \u0111\xE1 c\u1EA9m th\u1EA1ch tr\u1EAFng Non N\u01B0\u1EDBc nguy\xEAn kh\u1ED1i thanh khi\u1EBFt, t\u1EA1c h\u1ECDa hoa v\u0103n r\u1ED3ng u\u1ED1n l\u01B0\u1EE3n r\u1EF1c r\u1EE1 v\xE0 \u0111\u1EB7t uy nghi\xEAm tr\xEAn l\u01B0ng r\xF9a \u0111\xE1. Tr\xE1n bia ch\u1EA1m tr\u1ED5 tinh vi, vi\u1EC1n l\xE1 \u0111\u1EC1 c\xE1ch \u0111i\u1EC7u giao h\xF2a c\u1ED5 k\xEDnh v\xE0 hi\u1EC7n \u0111\u1EA1i.",
    specifications: [
      { key: "Chi\u1EC1u cao bia", value: "120 cm - 180 cm" },
      { key: "Chi\u1EC1u ngang", value: "70 cm - 90 cm" },
      { key: "\u0110\u1EBF r\xF9a \u0111\xE1", value: "Ch\u1EA1m kh\u1EAFc r\xF9a sinh \u0111\u1ED9ng d\u1EA7y 30 cm nguy\xEAn kh\u1ED1i" },
      { key: "Ch\u1EEF vi\u1EBFt", value: "Kh\u1EAFc m\xE1y CNC \u0111\u1ED9 n\xE9t si\xEAu nh\u1ECF, s\u01A1n nh\u0169 v\xE0ng r\xF2ng ho\u1EB7c s\u01A1n \u0111en" },
      { key: "Xu\u1EA5t x\u1EE9", value: "L\xE0ng \u0111\xE1 m\u1EF9 ngh\u1EC7 Non N\u01B0\u1EDBc, \u0110\xE0 N\u1EB5ng" }
    ],
    features: [
      "Th\xEDch h\u1EE3p ghi danh c\xF4ng \u0111\u1EE9c d\xF2ng h\u1ECD, danh s\xE1ch li\u1EC7t s\u0129, l\u1ECBch s\u1EED \u0111\u1EC1n ch\xF9a c\u1ED5 t\xEDch.",
      "\u0110\xE1 tr\u1EAFng t\u1EF1 nhi\xEAn tuy\u1EC3n ch\u1ECDn kh\xF4ng b\u1ECB loang l\u1ED5 v\u1EBFt \u1ED1 v\xE0ng.",
      "S\u1EA3n ph\u1EA9m \u0111\u01B0\u1EE3c ngh\u1EC7 nh\xE2n \u0111i\xEAu kh\u1EAFc b\u1EB1ng k\u1EF9 ngh\u1EC7 truy\u1EC1n th\u1EEBa \u0111\u1ED9c b\u1EA3n."
    ],
    isFeatured: false,
    rating: 4.8,
    inStock: true
  },
  {
    id: "p5",
    name: "Bia M\u1ED9 C\xF4ng Gi\xE1o \u0110\xE1 Granite \u0110en \u1EA4n \u0110\u1ED9",
    slug: "bia-mo-cong-giao-granite-an-do",
    categorySlug: "bia-mo-da-granite",
    categoryName: "Bia M\u1ED9 \u0110\xE1 Granite (Hoa C\u01B0\u01A1ng)",
    price: 15e5,
    priceStr: "1.500.000 \u0111",
    imageUrl: "https://images.unsplash.com/photo-1595121406822-be1b8a53e41c?q=80&w=600&auto=format&fit=crop",
    shortDescription: "Thi\u1EBFt k\u1EBF d\xE0nh ri\xEAng cho \u0111\u1ED3ng b\xE0o C\xF4ng gi\xE1o v\u1EDBi c\xE2y Th\xE1nh Gi\xE1 kh\u1EAFc ch\xECm tinh t\u1EBF, h\xECnh \u1EA3nh \u0110\u1EE9c M\u1EB9 ho\u1EB7c Ch\xFAa Kit\xF4 s\u1EAFc n\xE9t, \u0111\xE1 \u0111en b\xF3ng b\u1EA9y.",
    description: "Bia m\u1ED9 c\xF4ng gi\xE1o \u0111\u01B0\u1EE3c thi\u1EBFt k\u1EBF trang nghi\xEAm v\u1EDBi bi\u1EC3u t\u01B0\u1EE3ng Th\xE1nh Gi\xE1 linh thi\xEAng, c\xE0nh \xF4 liu h\xF2a b\xECnh ho\u1EB7c kinh th\xE1nh. S\u1EED d\u1EE5ng \u0111\xE1 Granite nh\u1EADp kh\u1EA9u t\u1EEB \u1EA4n \u0110\u1ED9 c\xF3 m\xE0u \u0111en tuy\u1EC1n tuy\u1EC7t \u0111\u1ED1i, t\u1EA1o n\xEAn ph\xF4ng n\u1EC1n t\u01B0\u01A1ng ph\u1EA3n c\u1EF1c t\u1ED1t gi\xFAp ch\xE2n dung ng\u01B0\u1EDDi \u0111\xE3 khu\u1EA5t v\xE0 c\xE1c d\xF2ng ch\u1EEF kh\u1EAFc r\xF5 r\xE0ng, ch\xE2n th\u1EF1c nh\u1EA5t.",
    specifications: [
      { key: "K\xEDch th\u01B0\u1EDBc th\xF4ng d\u1EE5ng", value: "30x40 cm, 40x60 cm" },
      { key: "Bi\u1EC3u t\u01B0\u1EE3ng", value: "Th\xE1nh gi\xE1, cu\u1ED1n kinh th\xE1nh, d\xE2y nho, thi\xEAn th\u1EA7n ch\u1EA7u" },
      { key: "Ph\u01B0\u01A1ng th\u1EE9c", value: "Kh\u1EAFc laser ch\xE2n dung (n\u1EBFu c\xF3) + kh\u1EAFc \u0111\u1EE5c m\u1EA1 v\xE0ng ch\u1EEF" },
      { key: "\u0110\u1ED9 b\u1EC1n", value: "Kh\xE1ng axit, ch\u1ECBu nhi\u1EC7t \u0111\u1ED9 \u0111\xF3ng b\u0103ng v\xE0 n\u1EAFng n\xF3ng c\u1EF1c h\u1EA1n" }
    ],
    features: [
      "Thi\u1EBFt k\u1EBF thanh l\u1ECBch, th\u1EC3 hi\u1EC7n \u0111\u1EE9c tin thi\xEAng li\xEAng cao c\u1EA3.",
      "\u1EA2nh ch\xE2n dung \u0111\u01B0\u1EE3c kh\u1EAFc b\u1EB1ng m\xE1y b\u1EAFn laser th\u1EBF h\u1EC7 m\u1EDBi c\u1EF1c s\u1EAFc n\xE9t nh\u01B0 \u1EA3nh ch\u1EE5p.",
      "Ph\xF4i \u0111\xE1 tuy\u1EC3n ch\u1ECDn k\u1EF9 l\u01B0\u1EE1ng, kh\xF4ng n\u1EE9t r\u1EA1n ng\u1EA7m."
    ],
    isFeatured: false,
    rating: 4.9,
    inStock: true
  },
  {
    id: "p6",
    name: "Bia M\u1ED9 T\u1ED5 Kh\u1EA3o \u0110\xE1 Xanh \u0110en Ch\u1EA1m Ch\u1EC9 C\u1ED5",
    slug: "bia-mo-to-khao-da-xanh-den",
    categorySlug: "bia-mo-da-xanh-thanh-hoa",
    categoryName: "Bia M\u1ED9 \u0110\xE1 Xanh Thanh H\xF3a",
    price: 21e5,
    priceStr: "2.100.000 \u0111",
    imageUrl: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=600&auto=format&fit=crop",
    shortDescription: "Kh\u1EAFc ch\u1EEF H\xE1n - N\xF4m v\xE0 Qu\u1ED1c ng\u1EEF song h\xE0nh s\u1EAFc n\xE9t. Vi\u1EC1n m\xE2y t\xEDa c\u1ED5 ch\u1EA1m l\u01B0\u1EE3n tinh x\u1EA3o, ch\u1EA5t \u0111\xE1 xanh \u0111en nguy\xEAn th\u1EDB nguy\xEAn b\u1EA3n v\xF4 c\xF9ng uy nghi\xEAm.",
    description: "D\xE0nh ri\xEAng cho bia m\u1ED9 t\u1ED5 ph\u1EE5, t\u1ED5 m\u1EABu hay ti\xEAn t\u1ED5 trong d\xF2ng t\u1ED9c. T\xE1c ph\u1EA9m mang phong c\xE1ch truy\u1EC1n th\u1ED1ng tuy\u1EC7t \u0111\u1ED1i v\u1EDBi vi\u1EC1n m\xE2y u\u1ED1n quanh nh\u01B0 t\xEDa n\u1EAFng tri\u1EC1u d\xE2ng. Ch\u1EA5t li\u1EC7u \u0111\xE1 xanh \u0111en Thanh H\xF3a t\u1EA1o c\u1EA3m gi\xE1c t\xF4n k\xEDnh s\xE2u th\u1EB3m, tr\u1EA7m m\u1EB7c, g\u1EAFn k\u1EBFt linh kh\xED \u0111\u1EA5t tr\u1EDDi.",
    specifications: [
      { key: "K\xEDch th\u01B0\u1EDBc", value: "40x60 cm, 50x70 cm" },
      { key: "Ng\xF4n ng\u1EEF", value: "H\u1ED7 tr\u1EE3 thi\u1EBFt k\u1EBF c\xE2u \u0111\u1ED1i ch\u1EEF H\xE1n ph\u1ED3n th\u1EC3, qu\u1ED1c ng\u1EEF th\u01B0 ph\xE1p" },
      { key: "\u0110i\xEAu kh\u1EAFc", value: "Ch\u1EA1m kh\u1EAFc \xE2m b\u1EA3n th\u1EE7 c\xF4ng, s\u01A1n \u0111\u1ECF \u0111\u1EA5t t\xEDa ho\u1EB7c nh\u0169 v\xE0ng nh\u1EA1t" },
      { key: "H\u1ECDa ti\u1EBFt", value: "Ng\u0169 ph\xFAc l\xE2m m\xF4n, m\xE2y c\u1ED5 s\u01A1n th\u1EE7y, sen \u0111\u1EA7m phong th\u1EE7y" }
    ],
    features: [
      "Ph\xF9 h\u1EE3p l\u1EAFp \u0111\u1EB7t t\u1EA1i l\u0103ng m\u1ED9 chung, nh\xE0 th\u1EDD t\u1ED5, nh\xE0 t\u1EEB \u0111\u01B0\u1EDDng.",
      "\u0110\u01B0\u1EE3c t\u01B0 v\u1EA5n b\u1EDFi chuy\xEAn gia v\u0103n h\xF3a l\u1ECBch s\u1EED v\u1EC1 ch\u1EEF H\xE1n - N\xF4m th\u1EDD ph\u1EE5ng.",
      "B\u1EA3o h\xE0nh tr\u1ECDn \u0111\u1EDDi v\u1EBFt n\u1EE9t \u0111\xE1 t\u1EF1 nhi\xEAn."
    ],
    isFeatured: true,
    rating: 5,
    inStock: true
  }
];
var projects = [
  {
    id: "proj-1",
    name: "Ph\u1EE5c D\u1EF1ng Bia \u0110\xE1 Di T\xEDch \u0110\u1EC1n th\u1EDD Qu\u1ED1c M\u1EABu",
    slug: "phuc-dung-bia-da-di-tich-den-tho-quoc-mau",
    location: "Ch\xED Linh, H\u1EA3i D\u01B0\u01A1ng",
    year: "2025",
    material: "\u0110\xE1 xanh Thanh H\xF3a kh\u1ED1i c\u1ED5 d\u1EA7y 15cm",
    shortDescription: "D\u1EF1 \xE1n tr\xF9ng tu t\xF4n t\u1EA1o bia ghi danh l\u1ECBch s\u1EED \u0111\u1EC1n th\u1EDD Qu\u1ED1c M\u1EABu b\u1EB1ng \u0111\xE1 xanh Thanh H\xF3a nguy\xEAn kh\u1ED1i cao 2.2m.",
    description: "\u0110\u1ED9i ng\u0169 ngh\u1EC7 nh\xE2n c\u1EE7a ch\xFAng t\xF4i vinh d\u1EF1 \u0111\u01B0\u1EE3c l\u1EF1a ch\u1ECDn l\xE0 \u0111\u01A1n v\u1ECB ph\u1EE5c d\u1EF1ng t\u1EA5m bia \u0111\xE1 l\u1ECBch s\u1EED ghi danh c\xF4ng \u0111\u1EE9c t\u1EA1i di t\xEDch qu\u1ED1c gia. C\xF4ng tr\xECnh \u0111\xF2i h\u1ECFi s\u1EF1 ch\xEDnh x\xE1c t\u1ED1i \u0111a v\u1EC1 c\xE1c n\xE9t ch\u1EEF N\xF4m c\u1ED5, vi\u1EC1n m\xE2y t\xEDa l\u01B0\u1EE3n s\xF3ng th\u1EDDi L\xEA Trung H\u01B0ng. Ch\xFAng t\xF4i ti\u1EBFn h\xE0nh khai th\xE1c th\u1ECFi \u0111\xE1 xanh d\u1EBBo th\u1EDB m\u1ECBn nh\u1EA5t t\u1EEB m\u1ECF Y\xEAn \u0110\u1ECBnh, t\u1EA1c th\u1EE7 c\xF4ng ho\xE0n to\xE0n r\xF9a \u0111\xE1 ch\u1EA7u v\xE0 th\xE2n bia d\xE0y d\u1EB7n trong v\xF2ng 45 ng\xE0y li\xEAn t\u1EE5c.",
    imageUrl: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?q=80&w=800&auto=format&fit=crop",
    scope: [
      "Kh\u1EA3o s\xE1t, \u0111o \u0111\u1EA1c ph\xE1c th\u1EA3o b\u1EA3n v\u1EBD t\u1EF7 l\u1EC7 1:1 d\u1EF1a tr\xEAn s\u1EAFc phong c\u1ED5 c\xF2n l\u01B0u l\u1EA1i.",
      "Khai th\xE1c t\u1EA1c th\xF4 r\xF9a \u0111\xE1 b\u1EC7 \u0111\u1EE1 nguy\xEAn kh\u1ED1i n\u1EB7ng 2.5 t\u1EA5n.",
      "Ch\u1EA1m n\u1ED5i r\u1ED3ng ch\u1EA7u m\u1EB7t nguy\u1EC7t v\xE0 hoa v\u0103n m\xE2y t\xEDa quanh b\u1EDD vi\u1EC1n bia.",
      "\u0110i\xEAu kh\u1EAFc ch\u1EEF N\xF4m s\u1EAFc n\xE9t s\xE2u 8mm, ph\u1EE7 s\u01A1n b\u1EA3o \xF4n \u0111en m\u1ED9c m\u1EA1c c\u1ED5 k\xEDnh.",
      "V\u1EADn chuy\u1EC3n \u0111\u01B0\u1EDDng n\xFAi hi\u1EC3m tr\u1EDF, l\u1EAFp \u0111\u1EB7t an to\xE0n tuy\u1EC7t \u0111\u1ED1i t\u1EA1i h\u1EADu cung di t\xEDch."
    ]
  },
  {
    id: "proj-2",
    name: "Quy Ho\u1EA1ch L\u0103ng M\u1ED9 Gia T\u1ED9c Nguy\u1EC5n V\u0103n",
    slug: "quy-hoach-lang-mo-gia-toc-nguyen-van",
    location: "Y\xEAn Th\xE0nh, Ngh\u1EC7 An",
    year: "2026",
    material: "\u0110\xE1 Granite \u0110\u1ECF Ruby k\u1EBFt h\u1EE3p \u0110en Kim Sa",
    shortDescription: "Thi\u1EBFt k\u1EBF v\xE0 l\u1EAFp d\u1EF1ng \u0111\u1ED3ng b\u1ED9 l\u0103ng m\u1ED9 gia t\u1ED9c d\xF2ng h\u1ECD Nguy\u1EC5n V\u0103n r\u1ED9ng 120m2 chu\u1EA9n phong th\u1EE7y tam h\u1EE3p c\xE1t.",
    description: "C\xF4ng tr\xECnh l\u0103ng m\u1ED9 gia \u0111\xECnh quy m\xF4 l\u1EDBn k\u1EBFt h\u1EE3p h\xE0i h\xF2a gi\u1EEFa ch\u1EA5t li\u1EC7u truy\u1EC1n th\u1ED1ng v\xE0 phong c\xE1ch b\xE0i tr\xED hi\u1EC7n \u0111\u1EA1i t\u1ED1i gi\u1EA3n. Trung t\xE2m l\u0103ng l\xE0 l\u0103ng th\u1EDD c\xE1nh l\u1EDBn ch\u1EA1m r\u1ED3ng ch\u1EA7u, xung quanh x\u1EBFp \u0111\u1EB7t 8 ng\xF4i m\u1ED9 tam c\u1EA5p \u0111\xE1 \u0111\u1ECF ruby t\u1EA1o c\u1EA3m gi\xE1c \u1EA5m c\xFAng, \u0111\u1EA1i c\xE1t \u0111\u1EA1i l\u1EE3i cho gia t\u1ED9c. To\xE0n b\u1ED9 khu\xF4n vi\xEAn bao quanh b\u1EDFi lan can \u0111\xE1 xanh ki\xEAn c\u1ED1 ch\u1EA1m t\xEDch T\xF9ng C\xFAc Tr\xFAc Mai thanh tao.",
    imageUrl: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=800&auto=format&fit=crop",
    scope: [
      "T\u01B0 v\u1EA5n th\u1EF1c \u0111\u1ECBa, \u0111\u1ECBnh h\u01B0\u1EDBng h\u01B0\u1EDBng m\u1ED9 v\xE0 ph\xE2n khu theo ng\u0169 h\xE0nh sinh kh\u1EAFc.",
      "B\u1EA3n v\u1EBD 3D quy ho\u1EA1ch t\u1ED5ng th\u1EC3 chi ti\u1EBFt t\u1EEBng ph\xE2n khu m\u1ED9 ph\u1EA7n, c\u1ED5ng \u0111\xE1, cu\u1ED1n th\u01B0.",
      "Gia c\xF4ng ch\u1EBF t\xE1c 8 m\u1ED9 \u0111\xE1 tam c\u1EA5p \u0111\u1ECF Ruby nguy\xEAn kh\u1ED1i s\xE1ng b\xF3ng v\u0129nh c\u1EEDu.",
      "T\u1EA1c kh\u1EAFc \u0111\xF4i r\u1ED3ng \u0111\xE1 ch\u1EA7u c\u1ED5ng v\xE0 cu\u1ED1n th\u01B0 \u0111\xE1 xanh phong th\u1EE7y ch\u1EA5n tr\u1EA1ch.",
      "Ho\xE0n thi\u1EC7n l\u1EAFp \u0111\u1EB7t trong v\xF2ng 20 ng\xE0y tr\u01B0\u1EDBc ti\u1EBFt Thanh Minh."
    ]
  },
  {
    id: "proj-3",
    name: "Bia T\u01B0\u1EDFng Ni\u1EC7m Li\u1EC7t S\u0129 X\xE3 Qu\u1EA3ng X\u01B0\u01A1ng",
    slug: "bia-tuong-niem-liet-si-xa-quang-xuong",
    location: "Qu\u1EA3ng X\u01B0\u01A1ng, Thanh H\xF3a",
    year: "2025",
    material: "\u0110\xE1 Granite \u0110en T\xE2y Ban Nha nh\u1EADp kh\u1EA9u",
    shortDescription: "Bia t\u01B0\u1EDFng ni\u1EC7m anh h\xF9ng li\u1EC7t s\u0129 cao 3.5m kh\u1EAFc ch\xECm nh\u0169 v\xE0ng r\xF2ng s\u1EAFc s\u1EA3o danh s\xE1ch 480 anh h\xF9ng li\u1EC7t s\u0129.",
    description: "Nh\xE2n d\u1ECBp k\u1EF7 ni\u1EC7m ng\xE0y th\u01B0\u01A1ng binh li\u1EC7t s\u0129, \u1EE6y ban nh\xE2n d\xE2n x\xE3 \u0111\xE3 giao ph\xF3 tr\xE1ch nhi\u1EC7m thi c\xF4ng \u0111\xE0i bia t\u01B0\u1EDFng ni\u1EC7m m\u1EDBi t\u1EA1i ngh\u0129a trang li\u1EC7t s\u0129 qu\xEA nh\xE0. S\u1EED d\u1EE5ng ch\u1EA5t li\u1EC7u \u0111\xE1 Granite cao c\u1EA5p nh\u1EADp kh\u1EA9u T\xE2y Ban Nha c\xF3 c\u1EA5u tr\xFAc v\xF4 c\xF9ng b\u1EC1n v\u1EEFng, m\u1EB7t bia ph\u1EB3ng l\xEC nh\u01B0 g\u01B0\u01A1ng soi. C\xF4ng ngh\u1EC7 kh\u1EAFc laser m\xE0i s\xE2u gi\xFAp l\u01B0u gi\u1EEF tr\u1ECDn v\u1EB9n t\u1EEBng n\xE9t ch\u1EEF t\xEAn tu\u1ED5i li\u1EC7t s\u0129 kh\xF4ng lo phai nh\u1EA1t d\u01B0\u1EDBi n\u1EAFng m\u01B0a kh\u1EAFc nghi\u1EC7t mi\u1EC1n Trung.",
    imageUrl: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?q=80&w=800&auto=format&fit=crop",
    scope: [
      "L\u1EADp quy tr\xECnh r\xE0 so\xE1t \u0111\u1ED1i chi\u1EBFu danh s\xE1ch li\u1EC7t s\u0129 tr\xF9ng kh\u1EDBp tuy\u1EC7t \u0111\u1ED1i.",
      "Thi c\xF4ng ph\u1EA7n th\xF4 b\u1EC7 \u0111\xE0i t\u01B0\u1EDFng ni\u1EC7m b\xEA t\xF4ng c\u1ED1t th\xE9p \u1ED1p \u0111\xE1 granite.",
      "Gh\xE9p n\u1ED1i 3 t\u1EA5m bia \u0111\xE1 granite kh\u1ED5 l\u1EDBn m\xE0i b\xF3ng c\u1EA1nh tinh x\u1EA3o.",
      "\u0110i\xEAu kh\u1EAFc ch\u1EEF Qu\u1ED1c ng\u1EEF s\u1EAFc n\xE9t k\u1EBFt h\u1EE3p bi\u1EC3u t\u01B0\u1EE3ng Ng\xF4i Sao V\xE0ng T\u1ED5 Qu\u1ED1c thi\xEAng li\xEAng.",
      "S\u1EED d\u1EE5ng s\u01A1n nh\u0169 v\xE0ng 24K \u0111\u1EB7c ch\u1EE7ng c\u1EE7a Nh\u1EADt B\u1EA3n, ch\u1ED1ng ch\u1ECBu c\u1EF1c t\xEDm v\xE0 axit."
    ]
  }
];
var posts = [
  {
    id: "post-1",
    name: "Ch\u1ECDn K\xEDch Th\u01B0\u1EDBc Bia M\u1ED9 Chu\u1EA9n Phong Th\u1EE7y Th\u01B0\u1EDBc L\u1ED7 Ban",
    slug: "chon-kich-thuoc-bia-mo-chuan-phong-thuy",
    date: "25 Th\xE1ng 05, 2026",
    author: "Ngh\u1EC7 nh\xE2n Nguy\u1EC5n Ti\u1EBFn \u0110\u1EA1t",
    readTime: "6 ph\xFAt \u0111\u1ECDc",
    shortDescription: "K\xEDch th\u01B0\u1EDBc bia m\u1ED9 kh\xF4ng ch\u1EC9 quy\u1EBFt \u0111\u1ECBnh th\u1EA9m m\u1EF9 m\xE0 c\xF2n \u1EA3nh h\u01B0\u1EDFng s\xE2u s\u1EAFc t\u1EDBi phong th\u1EE7y \xE2m tr\u1EA1ch gia t\u1ED9c. Xem ngay c\xE1c s\u1ED1 \u0111o c\xE1t t\u01B0\u1EDDng mang l\u1EA1i b\xECnh an.",
    content: `Trong phong th\u1EE7y \xE2m tr\u1EA1ch, ng\xF4i m\u1ED9 ch\xEDnh l\xE0 ng\xF4i nh\xE0 v\u0129nh h\u1EB1ng c\u1EE7a ng\u01B0\u1EDDi \u0111\xE3 khu\u1EA5t. Vi\u1EC7c x\xE2y d\u1EF1ng bia m\u1ED9 v\u1EDBi k\xEDch th\u01B0\u1EDBc chu\u1EA9n phong th\u1EE7y gi\xFAp linh h\u1ED3n ng\u01B0\u1EDDi \u0111\xE3 khu\u1EA5t \u0111\u01B0\u1EE3c an ngh\u1EC9, \u0111\u1ED3ng th\u1EDDi che ch\u1EDF, ph\xF9 h\u1ED9 cho con ch\xE1u \u0111\u1EDDi sau \u0111\u01B0\u1EE3c hanh th\xF4ng t\xE0i l\u1ED9c, gia \u0111\u1EA1o h\xF2a thu\u1EADn.

\u0110\u1EC3 \u0111o k\xEDch th\u01B0\u1EDBc bia m\u1ED9 c\xE1t t\u01B0\u1EDDng, c\xE1c ngh\u1EC7 nh\xE2n \u0111\xE1 m\u1EF9 ngh\u1EC7 lu\xF4n s\u1EED d\u1EE5ng Th\u01B0\u1EDBc L\u1ED7 Ban 38.8 cm (c\xF2n g\u1ECDi l\xE0 th\u01B0\u1EDBc L\u1ED7 Ban \xE2m tr\u1EA1ch). D\u01B0\u1EDBi \u0111\xE2y l\xE0 c\xE1c cung s\u1ED1 \u0111\u1EB9p th\u01B0\u1EDDng d\xF9ng:

1. K\xEDch th\u01B0\u1EDBc bia m\u1ED9 ph\u1ED5 bi\u1EBFn:
- 30 x 40 cm (Cung Ti\u1EBFn B\u1EA3o, Th\xEAm \u0110inh): Th\xEDch h\u1EE3p cho c\xE1c bia m\u1ED9 \u0111\u01A1n, m\u1ED9 h\u1ECFa t\xE1ng, m\u1ED9 c\u1EA3i t\xE1ng nh\u1ECF g\u1ECDn.
- 35 x 50 cm (Cung \u0110\u1ED7 \u0110\u1EA1t, Qu\xFD T\u1EED): K\xEDch th\u01B0\u1EDBc c\xE2n \u0111\u1ED1i nh\u1EA5t cho m\u1ED9 x\xE2y xi m\u0103ng ho\u1EB7c m\u1ED9 \u0111\xE1 tam c\u1EA5p th\xF4ng d\u1EE5ng.
- 40 x 60 cm (Cung L\u1EE3i \xCDch, Ph\xFA Qu\xFD): Th\xEDch h\u1EE3p l\xE0m bia m\u1ED9 t\u1ED5, m\u1ED9 d\xF2ng h\u1ECD c\u1EA7n ghi nhi\u1EC1u th\xF4ng tin, c\xE2u \u0111\u1ED1i ch\u1EEF H\xE1n.

2. Nh\u1EEFng l\u01B0u \xFD khi s\u1EAFp x\u1EBFp th\xF4ng tin tr\xEAn bia m\u1ED9:
S\u1EF1 h\xE0i h\xF2a gi\u1EEFa ph\u1EA7n ch\u1EEF vi\u1EBFt v\xE0 c\xE1c hoa v\u0103n bao quanh (nh\u01B0 vi\u1EC1n sen, vi\u1EC1n m\xE2y ho\u1EB7c r\u1ED3ng ch\u1EA7u) l\xE0 c\u1EF1c k\u1EF3 quan tr\u1ECDng. Tr\xE1n bia n\xEAn c\xF3 bi\u1EC3u t\u01B0\u1EE3ng t\xF4n gi\xE1o ph\xF9 h\u1EE3p (nh\u01B0 b\xF4ng sen cho Ph\u1EADt t\u1EED, Th\xE1nh Gi\xE1 cho ng\u01B0\u1EDDi C\xF4ng gi\xE1o). Ch\u1EEF vi\u1EBFt ph\u1EA3i r\xF5 r\xE0ng, ng\u1EAFn g\u1ECDn nh\u01B0ng \u0111\u1EA7y \u0111\u1EE7 h\u1ECD t\xEAn, ng\xE0y th\xE1ng n\u0103m sinh/t\u1EED, h\u01B0\u1EDFng th\u1ECD, qu\xEA qu\xE1n v\xE0 t\xEAn c\xE1c con ch\xE1u l\u1EADp bia.

\u0110\u1ED9i ng\u0169 Bia M\u1ED9 \u0110\xE1 M\u1EF9 Ngh\u1EC7 c\u1EE7a ch\xFAng t\xF4i lu\xF4n h\u1ED7 tr\u1EE3 thi\u1EBFt k\u1EBF mi\u1EC5n ph\xED b\u1EA3n v\u1EBD 2D chu\u1EA9n phong th\u1EE7y cho gia ch\u1EE7 tr\u01B0\u1EDBc khi ti\u1EBFn h\xE0nh \u0111\u1EE5c kh\u1EAFc th\u1EF1c t\u1EBF \u0111\u1EC3 \u0111\u1EA3m b\u1EA3o tr\xE1nh t\u1ED1i \u0111a c\xE1c cung s\u1ED1 hung hi\u1EC3m.`,
    imageUrl: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "post-2",
    name: "N\xEAn Ch\u1ECDn \u0110\xE1 Granite Hay \u0110\xE1 Xanh L\xE0m Bia M\u1ED9 Gia \u0110\xECnh?",
    slug: "nen-chon-da-granite-hay-da-xanh-lam-bia-mo",
    date: "12 Th\xE1ng 06, 2026",
    author: "K\u1EF9 s\u01B0 v\u1EADt li\u1EC7u Tr\u1EA7n Thanh H\u1EA3i",
    readTime: "8 ph\xFAt \u0111\u1ECDc",
    shortDescription: "\u0110\xE1 Granite b\xF3ng b\u1EA9y ch\u1ECBu m\xF2n c\u1EF1c t\u1ED1t hay \u0111\xE1 xanh Thanh H\xF3a m\u1ED9c m\u1EA1c c\u1ED5 k\xEDnh b\u1EC1n b\u1EC9? C\xF9ng so s\xE1nh chi ti\u1EBFt \u01B0u nh\u01B0\u1EE3c \u0111i\u1EC3m c\u1EE7a hai lo\u1EA1i \u0111\xE1 qu\u1ED1c d\xE2n n\xE0y.",
    content: `Khi x\xE2y c\u1EA5t hay s\u1EEDa sang ph\u1EA7n m\u1ED9 cho \xF4ng b\xE0 t\u1ED5 ti\xEAn, c\xE2u h\u1ECFi khi\u1EBFn nhi\u1EC1u gia ch\u1EE7 b\u0103n kho\u0103n nh\u1EA5t ch\xEDnh l\xE0 ch\u1ECDn ch\u1EA5t li\u1EC7u \u0111\xE1 n\xE0o l\xE0m bia \u0111\u1EC3 v\u1EEBa b\u1EC1n v\u1EEFng v\u0129nh c\u1EEDu v\u1EEBa mang t\xEDnh th\u1EA9m m\u1EF9 t\xF4n nghi\xEAm. Hi\u1EC7n nay, hai ch\u1EA5t li\u1EC7u th\u1ED1ng tr\u1ECB th\u1ECB tr\u01B0\u1EDDng l\xE0 \u0110\xE1 Granite (hoa c\u01B0\u01A1ng) v\xE0 \u0110\xE1 Xanh t\u1EF1 nhi\xEAn (xanh r\xEAu, xanh \u0111en Thanh H\xF3a).

H\xE3y c\xF9ng ch\xFAng t\xF4i c\xE2n nh\u1EAFc chi ti\u1EBFt d\u1EF1a tr\xEAn 4 ti\xEAu ch\xED c\u1ED1t l\xF5i:

1. \u0110\u1ED9 b\u1EC1n v\u1EADt l\xFD v\xE0 h\xF3a h\u1ECDc:
- \u0110\xE1 Granite: C\xF3 \u0111\u1ED9 c\u1EE9ng tuy\u1EC7t \u0111\u1ED1i (ch\u1EC9 \u0111\u1EE9ng sau kim c\u01B0\u01A1ng). Kh\xE1ng axit c\u1EF1c t\u1ED1t, kh\xF4ng th\u1EA5m n\u01B0\u1EDBc, kh\xF4ng b\u1ECB r\xEAu m\u1ED1c b\xE1m d\xEDnh. Tu\u1ED5i th\u1ECD \u0111\xE1 granite g\u1EA7n nh\u01B0 l\xE0 v\u0129nh c\u1EEDu d\u01B0\u1EDBi m\u1ECDi ki\u1EC3u kh\xED h\u1EADu th\u1EDDi ti\u1EBFt.
- \u0110\xE1 Xanh Thanh H\xF3a: Th\u1EDB \u0111\xE1 d\u1EBBo dai h\u01A1n n\xEAn kh\xF4ng gi\xF2n n\u1EE9t. Tuy c\xF3 \u0111\u1ED9 h\xFAt n\u01B0\u1EDBc nh\u1EB9 h\u01A1n granite nh\u01B0ng kh\u1EA3 n\u0103ng ch\u1ECBu nhi\u1EC7t r\u1EA5t t\u1ED1t. Qua th\u1EDDi gian h\xE0ng ch\u1EE5c n\u0103m, \u0111\xE1 xanh s\u1EBD l\xEAn m\xE0u phong tr\u1EA7n r\u1EA5t c\u1ED5 k\xEDnh, tr\u1EA7m m\u1EB7c.

2. T\xEDnh ngh\u1EC7 thu\u1EADt v\xE0 \u0111i\xEAu kh\u1EAFc:
- \u0110\xE1 Granite: Do qu\xE1 c\u1EE9ng n\xEAn kh\xF4ng th\u1EC3 ch\u1EA1m n\u1ED5i hoa v\u0103n s\xE2u hay \u0111\u1EE5c \u0111\u1EBDo r\u1ED3ng bay ph\u01B0\u1EE3ng m\xFAa qu\xE1 u\u1ED1n l\u01B0\u1EE3n. \u0110\xE1 granite ch\u1EE7 y\u1EBFu \u1EE9ng d\u1EE5ng cho phong c\xE1ch t\u1ED1i gi\u1EA3n hi\u1EC7n \u0111\u1EA1i ph\u1EB3ng phiu sang tr\u1ECDng, kh\u1EAFc ch\xECm ch\u1EEF s\u1EAFc s\u1EA3o b\u1EB1ng m\xE1y CNC ho\u1EB7c tia laser.
- \u0110\xE1 Xanh: L\xE0 "vua \u0111i\xEAu kh\u1EAFc". Th\u1EDB \u0111\xE1 d\u1EBBo dai gi\xFAp ngh\u1EC7 nh\xE2n d\u1EC5 d\xE0ng \u0111\u1EE5c n\u1ED5i hoa v\u0103n s\xE2u 3D nh\u01B0 h\xECnh hoa sen, r\u1ED3ng ch\u1EA7u nguy\u1EC7t, m\xE2y bay t\xEDa, c\xE2u \u0111\u1ED1i c\u1ED5 l\u1ED3i n\u1ED5i s\u1EAFc n\xE9t. Th\xEDch h\u1EE3p cho gia \u0111\xECnh mu\u1ED1n bia m\u1ED9 mang v\u1EBB \u0111\u1EB9p ngh\u1EC7 thu\u1EADt truy\u1EC1n th\u1ED1ng x\u01B0a.

3. Gi\xE1 th\xE0nh s\u1EA3n xu\u1EA5t:
Th\xF4ng th\u01B0\u1EDDng, bia m\u1ED9 \u0111\xE1 Granite \u0111en kim sa hay \u0111en \u1EA4n \u0110\u1ED9 c\xF3 gi\xE1 m\u1EC1m h\u01A1n \u0111\xF4i ch\xFAt so v\u1EDBi \u0111\xE1 xanh Thanh H\xF3a \u0111\u1EE5c tay ph\u1EE9c t\u1EA1p do ti\u1EBFt ki\u1EC7m \u0111\u01B0\u1EE3c c\xF4ng lao \u0111\u1ED9ng th\u1EE7 c\xF4ng c\u1EE7a ngh\u1EC7 nh\xE2n l\xE0nh ngh\u1EC1.

K\u1EBFt lu\u1EADn: N\u1EBFu b\u1EA1n y\xEAu th\xEDch n\xE9t \u0111\u1EB9p hi\u1EC7n \u0111\u1EA1i, s\u1EA1ch s\u1EBD, l\xE1ng b\xF3ng nh\u01B0 g\u01B0\u01A1ng v\xE0 d\u1EC5 lau ch\xF9i, h\xE3y ch\u1ECDn \u0110\xE1 Granite. C\xF2n n\u1EBFu b\u1EA1n mong mu\u1ED1n l\u0103ng m\u1ED9 mang n\xE9t uy nghi\xEAm, c\u1ED5 k\xEDnh, m\u1ED9c m\u1EA1c th\u1EA5m \u0111\u1EABm v\u0103n h\xF3a ph\u01B0\u01A1ng \u0110\xF4ng truy\u1EC1n th\u1ED1ng, h\xE3y ch\u1ECDn \u0110\xE1 Xanh Thanh H\xF3a nguy\xEAn kh\u1ED1i.`,
    imageUrl: "https://images.unsplash.com/photo-1604147706283-d7119b5b822c?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "post-3",
    name: "\xDD Ngh\u0129a Hoa V\u0103n Ch\u1EA1m Kh\u1EAFc Tr\xEAn Bia M\u1ED9 \u0110\xE1 Ph\u01B0\u01A1ng \u0110\xF4ng",
    slug: "y-nghia-hoa-van-cham-khac-bia-mo-da",
    date: "03 Th\xE1ng 07, 2026",
    author: "Nghi\xEAn c\u1EE9u v\u0103n h\xF3a L\xEA V\u0103n S\u01A1n",
    readTime: "5 ph\xFAt \u0111\u1ECDc",
    shortDescription: "Hoa sen, r\u1ED3ng ch\u1EA7u m\u1EB7t nguy\u1EC7t, ch\u1EEF v\u1EA1n hay t\xF9ng c\xFAc tr\xFAc mai ch\u1EA1m tr\xEAn bia m\u1ED9 mang nh\u1EEFng th\xF4ng \u0111i\u1EC7p t\xE2m linh g\xEC? Kh\xE1m ph\xE1 \u1EA9n \xFD s\xE2u xa sau nh\u1EEFng n\xE9t \u0111\u1EE5c.",
    content: `Nh\u1EEFng hoa v\u0103n vi\u1EC1n quanh bia m\u1ED9 kh\xF4ng \u0111\u01A1n thu\u1EA7n l\xE0 chi ti\u1EBFt trang tr\xED th\u1EA9m m\u1EF9 m\xE0 m\u1ED7i n\xE9t ch\u1EA1m kh\u1EAFc \u0111\u1EC1u mang m\u1ED9t \xFD ngh\u0129a nh\xE2n v\u0103n, m\u1ED9t th\xF4ng \u0111i\u1EC7p t\xE2m linh v\xF4 c\xF9ng s\xE2u s\u1EAFc g\u1EEDi g\u1EAFm t\u1EDBi t\u1ED5 ti\xEAn \u0111\xE3 khu\u1EA5t v\xE0 r\u0103n d\u1EA1y con ch\xE1u \u0111\u1EDDi sau.

H\xE3y c\xF9ng gi\u1EA3i m\xE3 c\xE1c m\u1EABu h\u1ECDa ti\u1EBFt ph\u1ED5 bi\u1EBFn nh\u1EA5t trong m\u1EF9 ngh\u1EC7 \u0111\xE1:

1. Hoa sen \u0111\u1EA7m - S\u1EF1 thu\u1EA7n khi\u1EBFt v\xE0 gi\u1EA3i tho\xE1t:
Hoa sen l\xE0 bi\u1EC3u t\u01B0\u1EE3ng thi\xEAng li\xEAng nh\u1EA5t trong c\u1EA3 Ph\u1EADt gi\xE1o v\xE0 \u0111\u1EDDi s\u1ED1ng d\xE2n gian Vi\u1EC7t Nam. Kh\u1EAFc h\u1ECDa hoa sen n\u01A1i ch\xE2n bia t\u01B0\u1EE3ng tr\u01B0ng cho s\u1EF1 th\u1EE9c t\u1EC9nh, g\u1ED9t r\u1EEDa b\u1EE5i tr\u1EA7n, gi\xFAp linh h\u1ED3n ng\u01B0\u1EDDi \u0111\xE3 khu\u1EA5t \u0111\u01B0\u1EE3c nh\u1EB9 nh\xE0ng si\xEAu sinh v\u1EC1 mi\u1EC1n c\u1EF1c l\u1EA1c an y\xEAn. Hoa sen c\u0169ng mang l\u1EA1i c\u1EA3m gi\xE1c hi\u1EC1n h\xF2a, \u1EA5m \xE1p xoa d\u1ECBu n\u1ED7i \u0111au m\u1EA5t m\xE1t c\u1EE7a ng\u01B0\u1EDDi s\u1ED1ng.

2. R\u1ED3ng ch\u1EA7u m\u1EB7t nguy\u1EC7t - Uy nghi\xEAm v\xE0 th\u1ECBnh v\u01B0\u1EE3ng:
R\u1ED3ng l\xE0 linh v\u1EADt \u0111\u1EE9ng \u0111\u1EA7u T\u1EE9 Linh, \u0111\u1EA1i di\u1EC7n cho v\u01B0\u01A1ng quy\u1EC1n, s\u1EE9c m\u1EA1nh t\u1ED1i th\u01B0\u1EE3ng v\xE0 s\u1EF1 b\u1EA3o h\u1ED9 t\xE2m linh m\u1EA1nh m\u1EBD. H\xECnh \u1EA3nh \u0111\xF4i r\u1ED3ng u\u1ED1n m\xECnh ch\u1EA7u v\xE0o v\u1EA7ng m\u1EB7t tr\u0103ng bi\u1EC3u th\u1ECB s\u1EF1 giao h\xF2a c\u1EE7a \xE2m d\u01B0\u01A1ng \u0111\u1ED1i c\u1EF1c, mang l\u1EA1i linh kh\xED tr\u1EA5n gi\u1EEF ph\u1EA7n m\u1ED9 tr\xE1nh xa t\xE0 ma ngo\u1EA1i \u0111\u1EA1o, \u0111\u1ED3ng th\u1EDDi c\u1EA7u mong s\u1EF1 vinh hi\u1EC3n ph\xFA qu\xFD l\xE2u d\xE0i cho con ch\xE1u gia t\u1ED9c.

3. B\u1ED9 T\u1EE9 Qu\xFD (T\xF9ng - C\xFAc - Tr\xFAc - Mai):
T\u01B0\u1EE3ng tr\u01B0ng cho b\u1ED1n m\xF9a xu\xE2n h\u1EA1 thu \u0111\xF4ng lu\xE2n chuy\u1EC3n h\xF2a h\u1EE3p c\u1EE7a v\u0169 tr\u1EE5. \u0110\u1ED3ng th\u1EDDi, b\u1ED9 hoa v\u0103n n\xE0y ca ng\u1EE3i kh\xED ti\u1EBFt ki\xEAn c\u01B0\u1EDDng, t\u1EA5m l\xF2ng thanh cao c\u1ED1t c\xE1ch c\u1EE7a ng\u01B0\u1EDDi \u0111\xE3 khu\u1EA5t l\xFAc sinh th\u1EDDi, c\u0169ng nh\u01B0 l\u1EDDi ch\xFAc ph\xFAc con ch\xE1u h\u01B0ng v\u01B0\u1EE3ng quanh n\u0103m b\u1ED1n ti\u1EBFt.

H\xE3y li\xEAn h\u1EC7 v\u1EDBi ch\xFAng t\xF4i \u0111\u1EC3 nh\u1EADn tr\u1ECDn b\u1ED9 th\u01B0 vi\u1EC7n m\u1EABu hoa v\u0103n \u0111\u1ED9c b\u1EA3n \u0111\u01B0\u1EE3c s\u1ED1 h\xF3a s\u1EAFc n\xE9t, s\u1EB5n s\xE0ng ch\u1EBF t\xE1c cho ph\u1EA7n m\u1ED9 ng\u01B0\u1EDDi th\xE2n c\u1EE7a b\u1EA1n m\u1ED9t c\xE1ch trang nghi\xEAm nh\u1EA5t.`,
    imageUrl: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?q=80&w=600&auto=format&fit=crop"
  }
];
var contactMessages = [];
async function fetchBanners() {
  try {
    const querySnapshot = await (0, import_firestore.getDocs)((0, import_firestore.collection)(db, "banners"));
    if (querySnapshot.empty) return banners;
    const docs = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title || "",
        subtitle: data.subtitle || "",
        imageUrl: data.image || "",
        mobileImageUrl: data.mobile_image || "",
        badge: data.position === "home_hero" ? "Tinh Hoa L\xE0ng Ngh\u1EC1 \u0110\xE1 M\u1EF9 Ngh\u1EC7" : void 0,
        ctaText: data.button_text || "Kh\xE1m Ph\xE1 B\u1ED9 S\u01B0u T\u1EADp",
        ctaLink: data.link || "/san-pham",
        active: data.active !== false,
        sort_order: data.sort_order || 0
      };
    });
    const activeBanners = docs.filter((b) => b.active);
    activeBanners.sort((a, b) => a.sort_order - b.sort_order);
    return activeBanners.length > 0 ? activeBanners : banners;
  } catch (error) {
    console.error("Error fetching banners from Firestore:", error);
    return banners;
  }
}
async function fetchCategories() {
  try {
    const querySnapshot = await (0, import_firestore.getDocs)((0, import_firestore.collection)(db, "categories"));
    if (querySnapshot.empty) return categories;
    const docs = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      let iconName = "Layers";
      if (data.slug === "bia-mo-da-xanh-thanh-hoa") iconName = "Feather";
      if (data.slug === "mo-da-my-nghe") iconName = "Castle";
      if (data.slug === "bia-di-tich-bia-ghi-danh") iconName = "Award";
      return {
        id: doc.id,
        name: data.name || "",
        slug: data.slug || "",
        description: data.description || "",
        imageUrl: data.image || "",
        iconName,
        active: data.active !== false,
        sort_order: data.sort_order || 0
      };
    });
    const activeCategories = docs.filter((c) => c.active);
    activeCategories.sort((a, b) => a.sort_order - b.sort_order);
    return activeCategories.length > 0 ? activeCategories : categories;
  } catch (error) {
    console.error("Error fetching categories from Firestore:", error);
    return categories;
  }
}
async function fetchProducts(categoriesList) {
  try {
    const querySnapshot = await (0, import_firestore.getDocs)((0, import_firestore.collection)(db, "products"));
    if (querySnapshot.empty) return products;
    const docs = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      let catSlug = "bia-mo-da-granite";
      let catName = "Bia M\u1ED9 \u0110\xE1 Granite (Hoa C\u01B0\u01A1ng)";
      if (data.category && typeof data.category === "object") {
        const catId = data.category.id;
        const matchingCat = categoriesList.find((c) => c.id === catId || c.slug === catId);
        if (matchingCat) {
          catSlug = matchingCat.slug;
          catName = matchingCat.name;
        }
      }
      const price = data.reference_price || 0;
      const priceStr = price > 0 ? `${price.toLocaleString("vi-VN")} \u0111` : "Li\xEAn h\u1EC7 b\xE1o gi\xE1";
      const specs = [
        { key: "K\xEDch th\u01B0\u1EDBc ph\u1ED5 bi\u1EBFn", value: data.dimensions || "Theo k\xEDch th\u01B0\u1EDBc y\xEAu c\u1EA7u" },
        { key: "Ch\u1EA5t li\u1EC7u", value: data.material || "\u0110\xE1 t\u1EF1 nhi\xEAn nguy\xEAn kh\u1ED1i" },
        { key: "C\xF4ng ngh\u1EC7 kh\u1EAFc", value: "Kh\u1EAFc CNC ch\xECm s\xE2u k\u1EBFt h\u1EE3p \u0111\u1EE5c tay th\u1EE7 c\xF4ng chi ti\u1EBFt hoa v\u0103n" },
        { key: "Ch\u1EA5t li\u1EC7u ph\u1EE7 ch\u1EEF", value: "S\u01A1n v\xE0ng cao c\u1EA5p ch\u1ECBu nhi\u1EC7t ho\u1EB7c m\u1EA1 v\xE0ng l\xE1 24K (theo y\xEAu c\u1EA7u)" },
        { key: "Th\u1EDDi gian ho\xE0n th\xE0nh", value: "3 - 5 ng\xE0y" }
      ];
      return {
        id: doc.id,
        name: data.name || "",
        slug: data.slug || "",
        categorySlug: catSlug,
        categoryName: catName,
        price,
        priceStr,
        imageUrl: data.main_image || "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?q=80&w=600&auto=format&fit=crop",
        shortDescription: data.short_description || "",
        description: data.content || "",
        specifications: specs,
        features: [
          "B\u1EC1 m\u1EB7t ph\u1EB3ng tuy\u1EC7t \u0111\u1ED1i, \u0111\u1ED9 b\xF3ng g\u01B0\u01A1ng c\u1EF1c cao d\u1EC5 d\xE0ng lau ch\xF9i v\u1EC7 sinh.",
          "\u0110\u1ED9 c\u1EE9ng cao, ch\u1ECBu l\u1EF1c n\xE9n c\u1EF1c t\u1ED1t, kh\xF4ng n\u1EE9t n\u1EBB qua th\u1EDDi gian.",
          "Hoa v\u0103n vi\u1EC1n ch\u1EEF v\u1EA1n, r\u1ED3ng ch\u1EA7u nguy\u1EC7t ho\u1EB7c hoa sen t\xF9y ch\u1ECDn.",
          "Cam k\u1EBFt b\u1EA3o h\xE0nh ch\u1EEF kh\u1EAFc l\xEAn t\u1EDBi 15 n\u0103m kh\xF4ng phai m\xE0u s\u01A1n."
        ],
        isFeatured: data.featured === true,
        rating: 5,
        inStock: data.status === "published",
        sort_order: data.sort_order || 0
      };
    });
    const publishedProducts = docs.filter((p) => p.inStock);
    publishedProducts.sort((a, b) => a.sort_order - b.sort_order);
    return publishedProducts.length > 0 ? publishedProducts : products;
  } catch (error) {
    console.error("Error fetching products from Firestore:", error);
    return products;
  }
}
async function fetchProjects() {
  try {
    const querySnapshot = await (0, import_firestore.getDocs)((0, import_firestore.collection)(db, "projects"));
    if (querySnapshot.empty) return projects;
    const docs = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      const completedDate = data.completed_date;
      let year = "2026";
      if (completedDate) {
        if (completedDate.seconds) {
          year = new Date(completedDate.seconds * 1e3).getFullYear().toString();
        } else if (completedDate instanceof Date) {
          year = completedDate.getFullYear().toString();
        } else {
          year = new Date(completedDate).getFullYear().toString();
        }
      }
      return {
        id: doc.id,
        name: data.name || "",
        slug: data.slug || "",
        location: data.location || "To\xE0n qu\u1ED1c",
        year,
        material: data.material || "\u0110\xE1 t\u1EF1 nhi\xEAn",
        shortDescription: data.short_description || "",
        description: data.content || "",
        imageUrl: data.main_image || "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?q=80&w=800&auto=format&fit=crop",
        scope: [
          "Kh\u1EA3o s\xE1t, \u0111o \u0111\u1EA1c ph\xE1c th\u1EA3o b\u1EA3n v\u1EBD t\u1EF7 l\u1EC7 1:1 d\u1EF1a tr\xEAn y\xEAu c\u1EA7u.",
          "Gia c\xF4ng th\xF4 c\u1EAFt ph\xF4i \u0111\xE1 t\u1EA1c m\xF3ng v\u1EEFng ch\u1EAFc.",
          "Ch\u1EA1m kh\u1EAFc n\u1ED5i r\u1ED3ng ph\u01B0\u1EE3ng nguy\u1EC7t hoa sen r\u1EF1c r\u1EE1 ngh\u1EC7 thu\u1EADt.",
          "\u0110i\xEAu kh\u1EAFc ch\u1EEF m\u1EA1 v\xE0ng b\u1EA3o v\u1EC7 v\u0129nh c\u1EEDu ch\u1ED1ng r\xEAu phong th\u1EDDi ti\u1EBFt.",
          "V\u1EADn chuy\u1EC3n v\xE0 h\u1ED7 tr\u1EE3 ho\xE0n thi\u1EC7n l\u1EAFp \u0111\u1EB7t t\u1EADn n\u01A1i to\xE0n qu\u1ED1c."
        ],
        status: data.status || "draft",
        sort_order: data.sort_order || 0
      };
    });
    const publishedProjects = docs.filter((p) => p.status === "published");
    publishedProjects.sort((a, b) => a.sort_order - b.sort_order);
    return publishedProjects.length > 0 ? publishedProjects : projects;
  } catch (error) {
    console.error("Error fetching projects from Firestore:", error);
    return projects;
  }
}
async function fetchPosts() {
  try {
    const querySnapshot = await (0, import_firestore.getDocs)((0, import_firestore.collection)(db, "posts"));
    if (querySnapshot.empty) return posts;
    const docs = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      const content = data.content || "";
      const wordCount = content.split(/\s+/).length;
      const readTime = `${Math.max(1, Math.ceil(wordCount / 200))} ph\xFAt \u0111\u1ECDc`;
      const publishedDateVal = data.published_at;
      let publishedDate = "G\u1EA7n \u0111\xE2y";
      if (publishedDateVal) {
        let d;
        if (publishedDateVal.seconds) {
          d = new Date(publishedDateVal.seconds * 1e3);
        } else if (publishedDateVal instanceof Date) {
          d = publishedDateVal;
        } else {
          d = new Date(publishedDateVal);
        }
        publishedDate = d.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
      }
      return {
        id: doc.id,
        name: data.title || "",
        slug: data.slug || "",
        date: publishedDate,
        author: data.author || "Ngh\u1EC7 nh\xE2n \u0110\xE1 T\xE2m An",
        readTime,
        shortDescription: data.excerpt || "",
        content,
        imageUrl: data.cover_image || "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?q=80&w=600&auto=format&fit=crop",
        status: data.status || "draft"
      };
    });
    const publishedPosts = docs.filter((p) => p.status === "published");
    return publishedPosts.length > 0 ? publishedPosts : posts;
  } catch (error) {
    console.error("Error fetching posts from Firestore:", error);
    return posts;
  }
}
var app = (0, import_express.default)();
var PORT = 3e3;
app.use(import_express.default.json());
app.get("/api/homepage", async (req, res) => {
  try {
    const [bannersData, categoriesData, projectsData, postsData] = await Promise.all([
      fetchBanners(),
      fetchCategories(),
      fetchProjects(),
      fetchPosts()
    ]);
    const productsData = await fetchProducts(categoriesData);
    res.json({
      banners: bannersData,
      categories: categoriesData,
      products: productsData.filter((p) => p.isFeatured),
      projects: projectsData,
      posts: postsData.slice(0, 3)
    });
  } catch (err) {
    console.error("Error generating homepage data:", err);
    res.status(500).json({ error: "Kh\xF4ng th\u1EC3 l\u1EA5y d\u1EEF li\u1EC7u trang ch\u1EE7" });
  }
});
app.get("/api/products", async (req, res) => {
  try {
    const { category, search } = req.query;
    const categoriesData = await fetchCategories();
    const productsData = await fetchProducts(categoriesData);
    let filteredProducts = [...productsData];
    if (category) {
      filteredProducts = filteredProducts.filter((p) => p.categorySlug === category);
    }
    if (search) {
      const searchStr = search.toLowerCase();
      filteredProducts = filteredProducts.filter(
        (p) => p.name.toLowerCase().includes(searchStr) || p.shortDescription.toLowerCase().includes(searchStr) || p.categoryName.toLowerCase().includes(searchStr)
      );
    }
    res.json(filteredProducts);
  } catch (err) {
    res.status(500).json({ error: "Kh\xF4ng th\u1EC3 t\u1EA3i danh s\xE1ch s\u1EA3n ph\u1EA9m" });
  }
});
app.get("/api/products/:slug", async (req, res) => {
  try {
    const categoriesData = await fetchCategories();
    const productsData = await fetchProducts(categoriesData);
    const product = productsData.find((p) => p.slug === req.params.slug);
    if (!product) {
      return res.status(404).json({ error: "S\u1EA3n ph\u1EA9m kh\xF4ng t\u1ED3n t\u1EA1i" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Kh\xF4ng th\u1EC3 t\u1EA3i chi ti\u1EBFt s\u1EA3n ph\u1EA9m" });
  }
});
app.get("/api/categories", async (req, res) => {
  try {
    const categoriesData = await fetchCategories();
    res.json(categoriesData);
  } catch (err) {
    res.status(500).json({ error: "Kh\xF4ng th\u1EC3 t\u1EA3i danh m\u1EE5c" });
  }
});
app.get("/api/categories/:slug", async (req, res) => {
  try {
    const categoriesData = await fetchCategories();
    const category = categoriesData.find((c) => c.slug === req.params.slug);
    if (!category) {
      return res.status(404).json({ error: "Danh m\u1EE5c kh\xF4ng t\u1ED3n t\u1EA1i" });
    }
    const productsData = await fetchProducts(categoriesData);
    const categoryProducts = productsData.filter((p) => p.categorySlug === req.params.slug);
    res.json({
      category,
      products: categoryProducts
    });
  } catch (err) {
    res.status(500).json({ error: "Kh\xF4ng th\u1EC3 t\u1EA3i danh m\u1EE5c chi ti\u1EBFt" });
  }
});
app.get("/api/projects", async (req, res) => {
  try {
    const projectsData = await fetchProjects();
    res.json(projectsData);
  } catch (err) {
    res.status(500).json({ error: "Kh\xF4ng th\u1EC3 t\u1EA3i danh s\xE1ch d\u1EF1 \xE1n" });
  }
});
app.get("/api/projects/:slug", async (req, res) => {
  try {
    const projectsData = await fetchProjects();
    const project = projectsData.find((p) => p.slug === req.params.slug);
    if (!project) {
      return res.status(404).json({ error: "D\u1EF1 \xE1n kh\xF4ng t\u1ED3n t\u1EA1i" });
    }
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: "Kh\xF4ng th\u1EC3 t\u1EA3i chi ti\u1EBFt d\u1EF1 \xE1n" });
  }
});
app.get("/api/posts", async (req, res) => {
  try {
    const postsData = await fetchPosts();
    res.json(postsData);
  } catch (err) {
    res.status(500).json({ error: "Kh\xF4ng th\u1EC3 t\u1EA3i danh s\xE1ch b\xE0i vi\u1EBFt" });
  }
});
app.get("/api/posts/:slug", async (req, res) => {
  try {
    const postsData = await fetchPosts();
    const post = postsData.find((p) => p.slug === req.params.slug);
    if (!post) {
      return res.status(404).json({ error: "B\xE0i vi\u1EBFt kh\xF4ng t\u1ED3n t\u1EA1i" });
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: "Kh\xF4ng th\u1EC3 t\u1EA3i b\xE0i vi\u1EBFt" });
  }
});
app.post("/api/contact", async (req, res) => {
  const { name, phone, email, productSlug, message } = req.body;
  if (!name || !phone) {
    return res.status(400).json({ error: "Vui l\xF2ng \u0111i\u1EC1n h\u1ECD t\xEAn v\xE0 s\u1ED1 \u0111i\u1EC7n tho\u1EA1i." });
  }
  const newMessage = {
    id: `msg-${Date.now()}`,
    name,
    phone,
    email: email || "",
    productSlug: productSlug || "",
    message: message || "",
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  contactMessages.push(newMessage);
  console.log("New contact message received:", newMessage);
  try {
    await (0, import_firestore.addDoc)((0, import_firestore.collection)(db, "contact_messages"), {
      name,
      phone,
      email: email || "",
      product_slug: productSlug || "",
      message: message || "",
      created_at: /* @__PURE__ */ new Date()
    });
  } catch (fsErr) {
    console.error("Failed to back up contact message to Firestore:", fsErr);
  }
  res.json({
    success: true,
    message: "G\u1EEDi l\u1EDDi nh\u1EAFn th\xE0nh c\xF4ng! \u0110\u1ED9i ng\u0169 ngh\u1EC7 nh\xE2n Bia M\u1ED9 \u0110\xE1 M\u1EF9 Ngh\u1EC7 s\u1EBD li\xEAn h\u1EC7 v\u1EDBi qu\xFD kh\xE1ch trong v\xF2ng 1 gi\u1EDD l\xE0m vi\u1EC7c."
  });
});
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running at http://0.0.0.0:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
