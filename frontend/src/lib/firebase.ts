import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

// Firebase configuration matching the user's FireCMS project
export const firebaseConfig = {
  apiKey: "AIzaSyAT-B3qaiggBIURgQ2KZNxyoOZF3EfDhbw",
  authDomain: "lang-mo-cms.firebaseapp.com",
  projectId: "lang-mo-cms",
  storageBucket: "lang-mo-cms.firebasestorage.app",
  messagingSenderId: "809136893303",
  appId: "1:809136893303:web:fba4babcac9f18459fc572",
  measurementId: "G-TQ2HFMVPHD",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Fallback Mock Data in case Firestore is empty or fails
export const fallbackBanners = [
  {
    id: "banner-1",
    title: "Chế Tác Bia Mộ Đá Granite Cao Cấp",
    subtitle: "Tinh hoa khắc chữ sâu, sắc nét, trường tồn vĩnh cửu theo năm tháng",
    imageUrl: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?q=80&w=1200&auto=format&fit=crop",
    badge: "Tinh Hoa Làng Nghề Đá Mỹ Nghệ",
    ctaText: "Khám Phá Bộ Sưu Tập",
    ctaLink: "/san-pham"
  }
];

export const fallbackCategories = [
  {
    id: "bia-mo-da-granite",
    name: "Bia Mộ Đá Granite (Hoa Cương)",
    slug: "bia-mo-da-granite",
    description: "Chất liệu đá granite nhập khẩu cao cấp, độ bóng gương vĩnh cửu, không bị phai màu chữ hay rêu mốc trước thời tiết.",
    imageUrl: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?q=80&w=600&auto=format&fit=crop",
    iconName: "Feather"
  },
  {
    id: "bia-mo-da-xanh-thanh-hoa",
    name: "Bia Mộ Đá Xanh Thanh Hóa",
    slug: "bia-mo-da-xanh-thanh-hoa",
    description: "Đá xanh tự nhiên nguyên khối, thớ mịn, dẻo dai giúp các nét chạm trổ cổ kính rồng phượng vô cùng sắc nét tinh xảo.",
    imageUrl: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?q=80&w=600&auto=format&fit=crop",
    iconName: "Layers"
  },
  {
    id: "mo-da-my-nghe",
    name: "Mộ Đá Mỹ Nghệ Nguyên Khối",
    slug: "mo-da-my-nghe",
    description: "Các mẫu mộ bành, mộ tam sơn, mộ có mái bằng đá xanh tự nhiên được lắp đặt trọn gói chuẩn kích thước phong thủy thước Lỗ Ban.",
    imageUrl: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=600&auto=format&fit=crop",
    iconName: "Castle"
  },
  {
    id: "bia-di-tich-bia-ghi-danh",
    name: "Bia Di Tích & Bia Ghi Danh",
    slug: "bia-di-tich-bia-ghi-danh",
    description: "Sản phẩm phục vụ đền chùa, từ đường dòng họ, bia di tích lịch sử chạm nổi hoa văn tinh tế thể hiện sự tôn nghiêm.",
    imageUrl: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?q=80&w=600&auto=format&fit=crop",
    iconName: "Award"
  }
];

// Firestore Data Fetching Mappers
export async function getBanners() {
  try {
    const querySnapshot = await getDocs(collection(db, "banners"));
    if (querySnapshot.empty) return fallbackBanners;
    const docs = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title || "",
        subtitle: data.subtitle || "",
        imageUrl: data.image || "",
        mobileImageUrl: data.mobile_image || "",
        badge: data.position === "home_hero" ? "Tinh Hoa Làng Nghề Đá Mỹ Nghệ" : undefined,
        ctaText: data.button_text || "Khám Phá Bộ Sưu Tập",
        ctaLink: data.link || "/san-pham",
        active: data.active !== false,
        sort_order: data.sort_order || 0
      };
    });
    const activeBanners = docs.filter(b => b.active);
    activeBanners.sort((a, b) => a.sort_order - b.sort_order);
    return activeBanners.length > 0 ? activeBanners : fallbackBanners;
  } catch (error) {
    console.error("Error fetching banners client-side:", error);
    return fallbackBanners;
  }
}

export async function getCategories() {
  try {
    const querySnapshot = await getDocs(collection(db, "categories"));
    if (querySnapshot.empty) return fallbackCategories;
    const docs = querySnapshot.docs.map(doc => {
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
    const activeCategories = docs.filter(c => c.active);
    activeCategories.sort((a, b) => a.sort_order - b.sort_order);
    return activeCategories.length > 0 ? activeCategories : fallbackCategories;
  } catch (error) {
    console.error("Error fetching categories client-side:", error);
    return fallbackCategories;
  }
}

export async function getProducts(categoriesList: any[]) {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    const docs = querySnapshot.docs.map(doc => {
      const data = doc.data();
      
      let catSlug = "bia-mo-da-granite";
      let catName = "Bia Mộ Đá Granite (Hoa Cương)";
      
      if (data.category && typeof data.category === "object") {
        const catId = data.category.id;
        const matchingCat = categoriesList.find(c => c.id === catId || c.slug === catId);
        if (matchingCat) {
          catSlug = matchingCat.slug;
          catName = matchingCat.name;
        }
      }

      const price = data.reference_price || 0;
      const priceStr = price > 0 ? `${price.toLocaleString("vi-VN")} đ` : "Liên hệ báo giá";

      const fallbackSpecs = [
        { key: "Kích thước phổ biến", value: data.dimensions || "Theo kích thước yêu cầu" },
        { key: "Chất liệu", value: data.material || "Đá tự nhiên nguyên khối" },
        { key: "Công nghệ khắc", value: "Khắc CNC chìm sâu kết hợp đục tay thủ công chi tiết hoa văn" },
        { key: "Chất liệu phủ chữ", value: "Sơn vàng cao cấp chịu nhiệt hoặc mạ vàng lá 24K (theo yêu cầu)" },
        { key: "Thời gian hoàn thành", value: "3 - 5 ngày" }
      ];

      const specs = Array.isArray(data.specifications) && data.specifications.length > 0
        ? data.specifications.map((spec: { label?: string; value?: string }) => ({
            key: spec.label || "",
            value: spec.value || ""
          }))
        : fallbackSpecs;

      return {
        id: doc.id,
        name: data.name || "",
        slug: data.slug || "",
        categorySlug: catSlug,
        categoryName: catName,
        price: price,
        priceStr: priceStr,
        imageUrl: data.main_image || "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?q=80&w=600&auto=format&fit=crop",
        images: Array.isArray(data.images) ? data.images : [],
        shortDescription: data.short_description || "",
        description: data.content || "",
        specifications: specs,
        videoUrl: data.video_url || undefined,
        features: [
          "Bề mặt phẳng tuyệt đối, độ bóng gương cực cao dễ dàng lau chùi vệ sinh.",
          "Độ cứng cao, chịu lực nén cực tốt, không nứt nẻ qua thời gian.",
          "Hoa văn viền chữ vạn, rồng chầu nguyệt hoặc hoa sen tùy chọn.",
          "Cam kết bảo hành chữ khắc lên tới 15 năm không phai màu sơn."
        ],
        isFeatured: data.featured === true,
        rating: 5,
        inStock: data.status === "published",
        sort_order: data.sort_order || 0
      };
    });
    
    const publishedProducts = docs.filter(p => p.inStock);
    publishedProducts.sort((a, b) => a.sort_order - b.sort_order);
    return publishedProducts;
  } catch (error) {
    console.error("Error fetching products client-side:", error);
    return [];
  }
}

export async function getProjects() {
  try {
    const querySnapshot = await getDocs(collection(db, "projects"));
    const docs = querySnapshot.docs.map(doc => {
      const data = doc.data();
      const completedDate = data.completed_date;
      let year = "2026";
      if (completedDate) {
        if (completedDate.seconds) {
          year = new Date(completedDate.seconds * 1000).getFullYear().toString();
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
        location: data.location || "Toàn quốc",
        year,
        material: data.material || "Đá tự nhiên",
        shortDescription: data.short_description || "",
        description: data.content || "",
        imageUrl: data.main_image || "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?q=80&w=800&auto=format&fit=crop",
        scope: [
          "Khảo sát, đo đạc phác thảo bản vẽ tỷ lệ 1:1 dựa trên yêu cầu.",
          "Gia công thô cắt phôi đá tạc móng vững chắc.",
          "Chạm khắc nổi rồng phượng nguyệt hoa sen rực rỡ nghệ thuật.",
          "Điêu khắc chữ mạ vàng bảo vệ vĩnh cửu chống rêu phong thời tiết.",
          "Vận chuyển và hỗ trợ hoàn thiện lắp đặt tận nơi toàn quốc."
        ],
        status: data.status || "draft",
        sort_order: data.sort_order || 0
      };
    });
    const publishedProjects = docs.filter(p => p.status === "published");
    publishedProjects.sort((a, b) => a.sort_order - b.sort_order);
    return publishedProjects;
  } catch (error) {
    console.error("Error fetching projects client-side:", error);
    return [];
  }
}

export async function getPosts() {
  try {
    const querySnapshot = await getDocs(collection(db, "posts"));
    const docs = querySnapshot.docs.map(doc => {
      const data = doc.data();
      const content = data.content || "";
      const wordCount = content.split(/\s+/).length;
      const readTime = `${Math.max(1, Math.ceil(wordCount / 200))} phút đọc`;
      
      const publishedDateVal = data.published_at;
      let publishedDate = "Gần đây";
      if (publishedDateVal) {
        let d: Date;
        if (publishedDateVal.seconds) {
          d = new Date(publishedDateVal.seconds * 1000);
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
        author: data.author || "Nghệ nhân Đá Tâm An",
        readTime: readTime,
        shortDescription: data.excerpt || "",
        content: content,
        imageUrl: data.cover_image || "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?q=80&w=600&auto=format&fit=crop",
        status: data.status || "draft"
      };
    });
    const publishedPosts = docs.filter(p => p.status === "published");
    return publishedPosts;
  } catch (error) {
    console.error("Error fetching posts client-side:", error);
    return [];
  }
}

export async function saveContactMessage(messageData: {
  name: string;
  phone: string;
  email?: string;
  productSlug?: string;
  message?: string;
}) {
  try {
    await addDoc(collection(db, "contact_messages"), {
      ...messageData,
      created_at: new Date()
    });
    return true;
  } catch (error) {
    console.error("Error saving contact message client-side:", error);
    throw error;
  }
}
