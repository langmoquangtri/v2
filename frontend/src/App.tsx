import React, { useState, useEffect } from "react";
import { 
  Phone, 
  MapPin, 
  Mail, 
  Clock, 
  ChevronRight, 
  ArrowLeft, 
  Star, 
  CheckCircle2, 
  Send, 
  Sliders, 
  Sparkles, 
  ShieldCheck, 
  Search, 
  Layers, 
  Feather, 
  Castle, 
  Award,
  BookOpen,
  Calendar,
  User,
  Heart,
  Tag
} from "lucide-react";
import Header from "./components/Header";
import { HeroParallax } from "./components/HeroParallax";
import CtaFaqSection from "./components/CtaFaqSection";
import { Banner, Category, Product, Project, Post, ViewType, FAQ, CtaSlide } from "./types";
import { getBanners, getCategories, getProducts, getProjects, getPosts, saveContactMessage, getFAQs, getCtaSlides } from "./lib/firebase";

function getYoutubeVideoId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/
  );
  return match ? match[1] : null;
}

function getYoutubeEmbedId(url?: string): string | null {
  if (!url) return null;
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/
  );
  return match ? match[1] : null;
}

function parseLocation(): ViewType {
  const path = window.location.pathname;
  const searchParams = new URLSearchParams(window.location.search);
  
  if (path === "/" || path === "/index.html" || path === "") {
    return { type: "home" };
  }
  if (path === "/san-pham" || path === "/san-pham/") {
    return { type: "products" };
  }
  if (path.startsWith("/san-pham/")) {
    const slug = path.slice(10).replace(/\/$/, "");
    return { type: "product-detail", slug };
  }
  if (path.startsWith("/danh-muc/")) {
    const slug = path.slice(10).replace(/\/$/, "");
    return { type: "products", categorySlug: slug };
  }
  if (path === "/du-an" || path === "/du-an/") {
    return { type: "projects" };
  }
  if (path.startsWith("/du-an/")) {
    const slug = path.slice(7).replace(/\/$/, "");
    return { type: "project-detail", slug };
  }
  if (path === "/bai-viet" || path === "/bai-viet/") {
    return { type: "posts" };
  }
  if (path.startsWith("/bai-viet/")) {
    const slug = path.slice(10).replace(/\/$/, "");
    return { type: "post-detail", slug };
  }
  if (path === "/lien-he" || path === "/lien-he/") {
    const productSlug = searchParams.get("product") || undefined;
    return { type: "contact", productSlug };
  }
  return { type: "home" };
}

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>({ type: "home" });
  
  // API Data States
  const [homepageData, setHomepageData] = useState<{
    banners: Banner[];
    categories: Category[];
    products: Product[];
    projects: Project[];
    posts: Post[];
  } | null>(null);
  
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [ctaSlides, setCtaSlides] = useState<CtaSlide[]>([]);
  
  // Detail views state
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  useEffect(() => {
    setSelectedImage(null);
  }, [activeProduct?.id]);

  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activePost, setActivePost] = useState<Post | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [priceFilter, setPriceFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("default");
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  // Contact Form State
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactProduct, setContactProduct] = useState("");
  const [formSuccessMsg, setFormSuccessMsg] = useState("");
  const [formErrorMsg, setFormErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Loading and Error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Sync routing state on mount and popstate
  useEffect(() => {
    const handlePopState = () => {
      setCurrentView(parseLocation());
    };
    
    // Set initial view
    setCurrentView(parseLocation());
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Fetch universal resources
  useEffect(() => {
    const fetchBaseData = async () => {
      try {
        setLoading(true);
        const bannersData = await getBanners();
        const categoriesData = await getCategories();
        const projectsData = await getProjects();
        const postsData = await getPosts();
        const productsData = await getProducts(categoriesData);
        const faqsData = await getFAQs();
        const ctaSlidesData = await getCtaSlides();
 
        setHomepageData({
          banners: bannersData,
          categories: categoriesData,
          products: productsData.filter(p => p.isFeatured),
          projects: projectsData,
          posts: postsData.slice(0, 3)
        });
 
        setCategories(categoriesData);
        setAllProducts(productsData);
        setProjects(projectsData);
        setPosts(postsData);
        setFaqs(faqsData);
        setCtaSlides(ctaSlidesData);

        setError(null);
      } catch (err: any) {
        console.error(err);
        setError("Hệ thống đang bảo trì, vui lòng tải lại trang hoặc liên hệ hotline để được hỗ trợ tức thì.");
      } finally {
        setLoading(false);
      }
    };

    fetchBaseData();
  }, []);

  // Handle routing navigation updates
  const navigate = (view: ViewType) => {
    let path = "/";
    if (view.type === "products") {
      path = view.categorySlug ? `/danh-muc/${view.categorySlug}` : "/san-pham";
    } else if (view.type === "product-detail") {
      path = `/san-pham/${view.slug}`;
    } else if (view.type === "projects") {
      path = "/du-an";
    } else if (view.type === "project-detail") {
      path = `/du-an/${view.slug}`;
    } else if (view.type === "posts") {
      path = "/bai-viet";
    } else if (view.type === "post-detail") {
      path = `/bai-viet/${view.slug}`;
    } else if (view.type === "contact") {
      path = view.productSlug ? `/lien-he?product=${view.productSlug}` : "/lien-he";
    }
    
    window.history.pushState(null, "", path);
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Listen to specific view changes to load detail content
  useEffect(() => {
    const fetchDetailData = async () => {
      if (currentView.type === "product-detail") {
        try {
          const product = allProducts.find(p => p.slug === currentView.slug);
          if (product) {
            setActiveProduct(product);
            setContactProduct(product.slug);
          } else {
            setActiveProduct(null);
          }
        } catch (e) {
          setActiveProduct(null);
        }
      } else if (currentView.type === "project-detail") {
        try {
          const project = projects.find(p => p.slug === currentView.slug);
          if (project) {
            setActiveProject(project);
          } else {
            setActiveProject(null);
          }
        } catch (e) {
          setActiveProject(null);
        }
      } else if (currentView.type === "post-detail") {
        try {
          const post = posts.find(p => p.slug === currentView.slug);
          if (post) {
            setActivePost(post);
          } else {
            setActivePost(null);
          }
        } catch (e) {
          setActivePost(null);
        }
      } else if (currentView.type === "products" && currentView.categorySlug) {
        try {
          const category = categories.find(c => c.slug === currentView.categorySlug);
          if (category) {
            setActiveCategory(category);
            setSelectedCategory(currentView.categorySlug);
          }
        } catch (e) {
          setActiveCategory(null);
        }
      } else if (currentView.type === "contact") {
        if (currentView.productSlug) {
          setContactProduct(currentView.productSlug);
          setContactMessage(`Tôi đang quan tâm và cần tư vấn báo giá chi tiết sản phẩm bia mộ: "${currentView.productSlug}"`);
        } else {
          setContactProduct("");
          setContactMessage("");
        }
      }
    };

    fetchDetailData();
  }, [currentView, allProducts, categories, projects, posts]);

  // Submit Contact Form
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactPhone) {
      setFormErrorMsg("Vui lòng nhập họ tên và số điện thoại liên hệ.");
      return;
    }

    try {
      setIsSubmitting(true);
      setFormSuccessMsg("");
      setFormErrorMsg("");

      await saveContactMessage({
        name: contactName,
        phone: contactPhone,
        email: contactEmail || "",
        productSlug: contactProduct || "",
        message: contactMessage || ""
      });

      setFormSuccessMsg("Gửi lời nhắn thành công! Đội ngũ nghệ nhân Bia Mộ Đá Mỹ Nghệ sẽ liên hệ với quý khách trong vòng 1 giờ làm việc.");
      // Clear form
      setContactName("");
      setContactPhone("");
      setContactEmail("");
      setContactMessage("");
      setContactProduct("");
    } catch (err) {
      setFormErrorMsg("Lỗi kết nối. Quý khách vui lòng gọi Hotline 0987.654.321 để được giải đáp ngay lập tức.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Layers": return <Layers className="w-6 h-6 text-deep-navy" />;
      case "Feather": return <Feather className="w-6 h-6 text-deep-navy" />;
      case "Castle": return <Castle className="w-6 h-6 text-deep-navy" />;
      case "Award": return <Award className="w-6 h-6 text-deep-navy" />;
      default: return <Sliders className="w-6 h-6 text-deep-navy" />;
    }
  };

  // Filter products by search and selection
  const getFilteredProducts = () => {
    let result = [...allProducts];
    if (selectedCategory !== "all") {
      result = result.filter(p => p.categorySlug === selectedCategory);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.shortDescription.toLowerCase().includes(q) || 
        p.categoryName.toLowerCase().includes(q)
      );
    }
    
    // Filter by price range
    if (priceFilter !== "all") {
      if (priceFilter === "under-10m") {
        result = result.filter(p => p.price > 0 && p.price < 10000000);
      } else if (priceFilter === "10m-20m") {
        result = result.filter(p => p.price >= 10000000 && p.price <= 20000000);
      } else if (priceFilter === "20m-50m") {
        result = result.filter(p => p.price > 20000000 && p.price <= 50000000);
      } else if (priceFilter === "over-50m") {
        result = result.filter(p => p.price > 50000000);
      } else if (priceFilter === "quote") {
        result = result.filter(p => !p.price || p.price === 0);
      }
    }

    // Sorting logic
    if (sortBy === "price-asc") {
      result.sort((a, b) => {
        const pA = a.price || 0;
        const pB = b.price || 0;
        if (pA === 0) return 1; // Put contact/no price products at the end
        if (pB === 0) return -1;
        return pA - pB;
      });
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => {
        const pA = a.price || 0;
        const pB = b.price || 0;
        if (pA === 0) return 1;
        if (pB === 0) return -1;
        return pB - pA;
      });
    } else if (sortBy === "name-asc") {
      result.sort((a, b) => a.name.localeCompare(b.name, "vi"));
    }

    return result;
  };

  // Slider controls for homepage hero banner
  const [activeBannerIdx, setActiveBannerIdx] = useState(0);
  useEffect(() => {
    if (homepageData && homepageData.banners.length > 1) {
      const interval = setInterval(() => {
        setActiveBannerIdx((prev) => (prev + 1) % homepageData.banners.length);
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [homepageData]);

  if (loading && !homepageData) {
    return (
      <div className="min-h-screen bg-beige flex flex-col justify-center items-center py-12 px-4">
        <div className="w-16 h-16 border-4 border-clay border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="font-serif italic text-stone-charcoal/70 text-lg">Đá Tâm An - Tinh Hoa Chạm Khắc Đang Khởi Tạo...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-beige text-stone-charcoal selection:bg-clay selection:text-white">
      {/* Universal Header */}
      <Header currentView={currentView} onNavigate={navigate} />

      {/* Main Content Area */}
      <main className="flex-grow">
        
        {/* Error Alert if any */}
        {error && (
          <div className="max-w-7xl mx-auto mt-6 px-4">
            <div className="bg-clay-light border-l-4 border-clay p-4 text-sm text-clay-dark rounded-sm">
              <p className="font-semibold">{error}</p>
            </div>
          </div>
        )}

        {/* ======================================= */}
        {/* VIEW: HOME                              */}
        {/* ======================================= */}
        {currentView.type === "home" && homepageData && (
          <div>
            {/* Elegant Scroll-controlled Video Hero */}
            <HeroParallax />

            {/* Core Values Section */}
            <section className="py-12 bg-deep-navy border-b border-dark-navy">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                  <div className="p-4 flex flex-col md:flex-row items-center md:items-start gap-4">
                    <div className="p-3 bg-white/10 text-white rounded-full">
                      <Award className="w-7 h-7" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-base text-white mb-1">Nghệ Nhân Làng Nghề Cổ</h4>
                      <p className="text-xs text-white/80 font-sans">
                        Chế tác trực tiếp từ phôi đá chuẩn bởi nghệ nhân điêu khắc gia tộc giàu kinh nghiệm Ninh Bình.
                      </p>
                    </div>
                  </div>
                  <div className="p-4 flex flex-col md:flex-row items-center md:items-start gap-4">
                    <div className="p-3 bg-white/10 text-white rounded-full">
                      <ShieldCheck className="w-7 h-7" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-base text-white mb-1">Đá Tự Nhiên Nguyên Khối 100%</h4>
                      <p className="text-xs text-white/80 font-sans">
                        Sử dụng phôi đá hoa cương nhập khẩu, đá xanh Thanh Hóa nguyên khối tốt nhất, bảo hành nứt vỡ trọn đời.
                      </p>
                    </div>
                  </div>
                  <div className="p-4 flex flex-col md:flex-row items-center md:items-start gap-4">
                    <div className="p-3 bg-white/10 text-white rounded-full">
                      <Clock className="w-7 h-7" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-base text-white mb-1">Thiết Kế Thước Lỗ Ban</h4>
                      <p className="text-xs text-white/80 font-sans">
                        Hỗ trợ phác thảo bản vẽ 2D hoàn chỉnh chuẩn cung cát Lỗ Ban âm phần, hoàn thiện chuẩn hẹn 3-5 ngày.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Custom CTA & FAQ Section */}
            <CtaFaqSection faqs={faqs} ctaSlides={ctaSlides} onContactClick={() => navigate({ type: "contact" })} />

            {/* Categories Division (Danh mục nổi bật) */}
            <section className="py-20 px-4 max-w-7xl mx-auto sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <span className="text-xs uppercase tracking-[0.2em] text-red-clay font-bold font-mono">Tác Phẩm Tâm Linh</span>
                <h3 className="text-3xl sm:text-4xl font-serif font-extrabold mt-2 text-deep-navy uppercase tracking-tight">Danh Mục Sản Phẩm</h3>
                <div className="w-16 h-[1.5px] bg-red-clay mx-auto mt-4" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {homepageData.categories.map((cat) => (
                  <div 
                    key={cat.id}
                    onClick={() => navigate({ type: "products", categorySlug: cat.slug })}
                    className="group cursor-pointer bg-light-cream border border-deep-navy/10 hover:border-red-clay/35 p-5 rounded-none transition-all duration-500 hover:shadow-xs flex flex-col justify-between text-left"
                  >
                    <div>
                      {/* Elegant Sharp Editorial Image Frame for CMS Uploaded Images */}
                      <div className="w-full aspect-[4/3] mb-5 overflow-hidden relative bg-cream border border-deep-navy/5">
                        {(cat.imageUrl || (cat as any).image) ? (
                          <img 
                            src={cat.imageUrl || (cat as any).image} 
                            alt={cat.name} 
                            className="w-full h-full object-cover filter brightness-[0.97] contrast-[1.01] group-hover:scale-105 transition-transform duration-[1200ms]"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-deep-navy/5">
                            {getCategoryIcon(cat.iconName)}
                          </div>
                        )}
                        <div className="absolute inset-0 bg-deep-navy/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>

                      <h4 className="font-serif font-bold text-base text-deep-navy mb-2 group-hover:text-red-clay transition-colors uppercase tracking-wide">
                        {cat.name}
                      </h4>
                      <p className="text-xs text-charcoal/75 font-sans line-clamp-3 leading-relaxed">
                        {cat.description}
                      </p>
                    </div>
                    
                    <div className="mt-5 pt-3 border-t border-deep-navy/5 flex items-center justify-between">
                      <span className="text-[10px] font-mono tracking-widest text-red-clay font-bold uppercase">
                        KHÁM PHÁ →
                      </span>
                      <ChevronRight className="w-4 h-4 text-red-clay transform translate-x-0 group-hover:translate-x-1.5 transition-transform duration-300" />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Featured Products List (Sản phẩm nổi bật) */}
            <section className="py-16 bg-beige-paper/35 border-t border-b border-beige-dark/30">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-10">
                  <div>
                    <span className="text-xs uppercase tracking-[0.2em] text-clay font-semibold">Tuyển Chọn Chế Tác</span>
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold mt-1 text-stone-charcoal">Mẫu Bia Mộ & Mộ Đá Nổi Bật</h3>
                  </div>
                  <button 
                    onClick={() => navigate({ type: "products" })}
                    className="text-xs font-bold uppercase tracking-wider text-clay hover:text-clay-dark underline underline-offset-4 flex items-center gap-1"
                  >
                    Xem tất cả <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {homepageData.products.map((prod) => (
                    <div 
                      key={prod.id}
                      className="bg-beige border border-beige-dark/40 rounded-sm overflow-hidden group hover:shadow-lg transition-all duration-300"
                    >
                      <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
                        <img 
                          src={prod.imageUrl} 
                          alt={prod.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 bg-clay text-beige text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded-xs">
                          {prod.categoryName.split(" (")[0]}
                        </div>
                      </div>
                      
                      <div className="p-5 flex flex-col h-[220px] justify-between">
                        <div>
                          <div className="flex items-center gap-1 text-bronze mb-1.5">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-current" />
                            ))}
                            <span className="text-xs text-stone-charcoal/60 ml-1">({prod.rating})</span>
                          </div>
                          
                          <h4 
                            onClick={() => navigate({ type: "product-detail", slug: prod.slug })}
                            className="font-serif font-bold text-base text-stone-charcoal hover:text-clay transition-colors cursor-pointer line-clamp-2 leading-tight"
                          >
                            {prod.name}
                          </h4>
                          
                          <p className="text-xs text-stone-charcoal/70 font-sans mt-2 line-clamp-2 leading-relaxed">
                            {prod.shortDescription}
                          </p>
                        </div>

                        <div className="border-t border-beige-dark/50 pt-3 flex justify-between items-center mt-3">
                          <div>
                            <span className="text-[10px] uppercase text-stone-charcoal/50 block font-mono">Giá chỉ từ</span>
                            <span className="text-sm font-semibold text-clay">{prod.priceStr}</span>
                          </div>
                          <button
                            onClick={() => navigate({ type: "product-detail", slug: prod.slug })}
                            className="px-3.5 py-1.5 bg-beige-paper text-stone-charcoal hover:bg-clay hover:text-beige border border-bronze/40 text-xs font-semibold transition-all rounded-xs"
                          >
                            Chi Tiết
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Featured Projects (Công trình tiêu biểu) */}
            <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <span className="text-xs uppercase tracking-[0.2em] text-clay font-semibold">Thực Tế Công Trình</span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold mt-1 text-stone-charcoal">Dự Án Điêu Khắc Tiêu Biểu</h3>
                <div className="w-16 h-0.5 bg-clay mx-auto mt-3" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {homepageData.projects.map((proj) => (
                  <div 
                    key={proj.id}
                    className="bg-beige-paper/50 border border-beige-dark/40 rounded-sm overflow-hidden flex flex-col"
                  >
                    <div className="relative h-48 overflow-hidden bg-stone-200">
                      <img 
                        src={proj.imageUrl} 
                        alt={proj.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute bottom-3 left-3 bg-stone-charcoal/90 text-white text-xs px-2.5 py-1 rounded-xs font-mono">
                        {proj.location}
                      </div>
                    </div>
                    <div className="p-5 flex-grow flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider font-semibold text-clay block mb-1">
                          Năm thực hiện: {proj.year}
                        </span>
                        <h4 
                          onClick={() => navigate({ type: "project-detail", slug: proj.slug })}
                          className="font-serif font-bold text-base text-stone-charcoal hover:text-clay transition-colors cursor-pointer line-clamp-1"
                        >
                          {proj.name}
                        </h4>
                        <p className="text-xs text-stone-charcoal/70 font-sans mt-2 line-clamp-3 leading-relaxed">
                          {proj.shortDescription}
                        </p>
                      </div>
                      <div className="border-t border-beige-dark/40 pt-4 mt-4 flex items-center justify-between">
                        <span className="text-[10px] italic text-stone-charcoal/60 line-clamp-1 max-w-[150px]">
                          Vật liệu: {proj.material.split(" ")[0]}
                        </span>
                        <button
                          onClick={() => navigate({ type: "project-detail", slug: proj.slug })}
                          className="text-xs font-bold text-clay hover:text-clay-dark flex items-center gap-1 uppercase tracking-wider"
                        >
                          Xem dự án <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Latest Posts (Bài viết mới) */}
            <section className="py-16 bg-beige-paper border-t border-beige-dark/50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-10">
                  <div>
                    <span className="text-xs uppercase tracking-[0.2em] text-clay font-semibold">Tư Vấn Phong Thủy & Tâm Linh</span>
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold mt-1 text-stone-charcoal">Tin Tức - Cẩm Nang</h3>
                  </div>
                  <button 
                    onClick={() => navigate({ type: "posts" })}
                    className="text-xs font-bold uppercase tracking-wider text-clay hover:text-clay-dark underline underline-offset-4 flex items-center gap-1"
                  >
                    Xem tất cả bài viết <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {homepageData.posts.map((post) => (
                    <div 
                      key={post.id}
                      className="bg-beige border border-beige-dark/30 rounded-sm overflow-hidden group cursor-pointer"
                      onClick={() => navigate({ type: "post-detail", slug: post.slug })}
                    >
                      <div className="relative aspect-video overflow-hidden bg-stone-100">
                        <img 
                          src={post.imageUrl} 
                          alt={post.name} 
                          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-5">
                        <div className="flex items-center gap-3 text-[10px] text-stone-charcoal/60 font-mono mb-2">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> {post.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {post.readTime}
                          </span>
                        </div>
                        <h4 className="font-serif font-bold text-base text-stone-charcoal group-hover:text-clay transition-colors line-clamp-2 leading-snug">
                          {post.name}
                        </h4>
                        <p className="text-xs text-stone-charcoal/70 font-sans mt-2 line-clamp-2 leading-relaxed">
                          {post.shortDescription}
                        </p>
                        <span className="text-xs font-bold text-clay mt-4 inline-block group-hover:underline">
                          Đọc tiếp →
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Quick Contact Hotline Section */}
            <section className="py-16 bg-clay text-beige">
              <div className="max-w-4xl mx-auto text-center px-4">
                <span className="text-xs uppercase tracking-[0.3em] text-bronze font-semibold font-mono block mb-2">
                  ĐÁ TÂM AN - TÂM HUYẾT TRƯỜNG TỒN
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold mb-4">
                  Quý Khách Cần Tư Vấn Thiết Kế Mẫu Bia Mộ Đá?
                </h3>
                <p className="text-sm max-w-2xl mx-auto mb-8 opacity-90 font-sans leading-relaxed">
                  Đội ngũ thiết kế hỗ trợ tư vấn phong thủy Lỗ Ban, chạm hoa sen, rồng chầu, mạ vàng 24K miễn phí. Cung cấp báo giá xưởng tối ưu nhất, vận chuyển toàn quốc.
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                  <a 
                    href="tel:0987654321"
                    className="px-8 py-4 bg-beige text-clay hover:bg-beige-paper text-sm font-bold uppercase tracking-widest rounded-sm transition-all shadow-md flex items-center gap-2.5"
                  >
                    <Phone className="w-4.5 h-4.5 text-clay animate-bounce" />
                    Gọi Ngay: 0987.654.321
                  </a>
                  <button 
                    onClick={() => navigate({ type: "contact" })}
                    className="px-8 py-4 bg-clay-dark hover:bg-clay-dark/80 text-beige text-sm font-bold uppercase tracking-widest rounded-sm border border-bronze/40 transition-all"
                  >
                    Để Lại Yêu Cầu Tư Vấn
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ======================================= */}
        {/* VIEW: PRODUCTS LIST & CATEGORY FILTER  */}
        {/* ======================================= */}
        {currentView.type === "products" && (
          <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="border-b border-beige-dark pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span 
                  onClick={() => navigate({ type: "home" })}
                  className="text-xs text-stone-charcoal/60 hover:text-clay cursor-pointer uppercase font-mono tracking-wider"
                >
                  Trang chủ
                </span>
                <span className="text-xs text-stone-charcoal/40 mx-2">/</span>
                <span className="text-xs text-clay font-bold uppercase font-mono tracking-wider">
                  {currentView.categorySlug ? "Danh mục sản phẩm" : "Tất cả sản phẩm"}
                </span>
                
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-charcoal mt-1">
                  {activeCategory ? activeCategory.name : "Sản Phẩm Chế Tác Đá Mỹ Nghệ"}
                </h2>
                {activeCategory && (
                  <p className="text-sm text-stone-charcoal/70 mt-1.5 max-w-2xl font-sans italic">
                    {activeCategory.description}
                  </p>
                )}
              </div>

              {/* Dynamic Live Search Bar */}
              <div className="relative max-w-xs w-full">
                <input
                  type="text"
                  placeholder="Tìm sản phẩm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-beige-paper border border-beige-dark/70 focus:border-clay/70 text-sm py-2 pl-9 pr-4 rounded-sm focus:outline-none"
                />
                <Search className="w-4 h-4 text-stone-charcoal/40 absolute left-3 top-2.5" />
              </div>
            </div>

            {/* Main Products Grid Structure */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Mobile Filter Toggle Button */}
              <div className="block lg:hidden col-span-1">
                <button
                  onClick={() => setShowFiltersMobile(!showFiltersMobile)}
                  className="w-full flex items-center justify-center gap-2 bg-clay text-beige py-3 px-4 rounded-sm font-semibold uppercase text-xs tracking-wider transition-colors hover:bg-clay-dark shadow-xs"
                >
                  <Sliders className="w-4 h-4" />
                  {showFiltersMobile ? "Thu gọn bộ lọc" : "Mở bộ lọc & Phân loại"}
                </button>
              </div>

              {/* Sidebar filter column */}
              <aside className={`${showFiltersMobile ? "block" : "hidden"} lg:block lg:col-span-3 space-y-6`}>
                <div className="bg-beige-paper/50 border border-beige-dark/50 p-5 rounded-sm">
                  <h4 className="font-serif font-bold text-base text-stone-charcoal border-b border-beige-dark pb-3 mb-4 flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-clay" /> Phân loại dòng đá
                  </h4>
                  <ul className="space-y-2">
                    <li>
                      <button
                        onClick={() => {
                          setSelectedCategory("all");
                          navigate({ type: "products" });
                          setActiveCategory(null);
                          if (window.innerWidth < 1024) setShowFiltersMobile(false);
                        }}
                        className={`w-full text-left text-sm py-1.5 px-2.5 rounded-xs transition-colors ${
                          selectedCategory === "all" 
                            ? "bg-clay text-beige font-semibold" 
                            : "text-stone-charcoal/80 hover:bg-beige-paper"
                        }`}
                      >
                        Tất Cả Sản Phẩm
                      </button>
                    </li>
                    {categories.map((cat) => (
                      <li key={cat.id}>
                        <button
                          onClick={() => {
                            setSelectedCategory(cat.slug);
                            navigate({ type: "products", categorySlug: cat.slug });
                            if (window.innerWidth < 1024) setShowFiltersMobile(false);
                          }}
                          className={`w-full text-left text-sm py-1.5 px-2.5 rounded-xs transition-colors ${
                            selectedCategory === cat.slug 
                              ? "bg-clay text-beige font-semibold" 
                              : "text-stone-charcoal/80 hover:bg-beige-paper"
                          }`}
                        >
                          {cat.name.split(" (")[0]}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bộ lọc theo mức giá */}
                <div className="bg-beige-paper/50 border border-beige-dark/50 p-5 rounded-sm">
                  <h4 className="font-serif font-bold text-base text-stone-charcoal border-b border-beige-dark pb-3 mb-4 flex items-center gap-2">
                    <Tag className="w-4 h-4 text-clay" /> Khoảng giá chế tác
                  </h4>
                  <ul className="space-y-2">
                    {[
                      { id: "all", label: "Tất cả mức giá" },
                      { id: "under-10m", label: "Dưới 10 triệu" },
                      { id: "10m-20m", label: "10 triệu - 20 triệu" },
                      { id: "20m-50m", label: "20 triệu - 50 triệu" },
                      { id: "over-50m", label: "Trên 50 triệu" },
                      { id: "quote", label: "Liên hệ báo giá" },
                    ].map((range) => (
                      <li key={range.id}>
                        <button
                          onClick={() => {
                            setPriceFilter(range.id);
                            if (window.innerWidth < 1024) setShowFiltersMobile(false);
                          }}
                          className={`w-full text-left text-xs py-1.5 px-2.5 rounded-xs transition-all flex items-center justify-between ${
                            priceFilter === range.id
                              ? "bg-clay text-beige font-semibold"
                              : "text-stone-charcoal/85 hover:bg-beige-paper"
                          }`}
                        >
                          <span>{range.label}</span>
                          {priceFilter === range.id && (
                            <span className="w-1.5 h-1.5 bg-beige rounded-full"></span>
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-clay-light/40 border border-clay/10 p-5 rounded-sm">
                  <h4 className="font-serif font-bold text-sm text-clay-dark mb-2">Hỗ Trợ Thiết Kế 2D</h4>
                  <p className="text-xs text-stone-charcoal/80 font-sans leading-relaxed">
                    Xưởng Đá Tâm An nhận đo đạc trực tiếp, thiết kế bản vẽ mô phỏng 2D/3D chuẩn cung số Lỗ Ban miễn phí hoàn toàn.
                  </p>
                  <button
                    onClick={() => navigate({ type: "contact" })}
                    className="mt-3.5 w-full py-2 bg-clay text-white text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-clay-dark transition-all text-center block"
                  >
                    Gửi yêu cầu tư vấn
                  </button>
                </div>
              </aside>

              {/* Products Display list */}
              <div className="lg:col-span-9">
                {/* Header bar with count and sorting */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-beige-paper/40 border border-beige-dark/30 px-4 py-3 rounded-sm mb-6 gap-3">
                  <div className="text-xs text-stone-charcoal/80 font-medium">
                    Hiển thị <span className="font-bold text-clay">{getFilteredProducts().length}</span> sản phẩm phù hợp
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-stone-charcoal/60">Sắp xếp:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="bg-white border border-beige-dark/70 text-xs py-1 px-2 focus:outline-none focus:border-clay rounded-xs text-stone-charcoal"
                    >
                      <option value="default">Mặc định</option>
                      <option value="price-asc">Giá: Thấp đến Cao</option>
                      <option value="price-desc">Giá: Cao đến Thấp</option>
                      <option value="name-asc">Tên sản phẩm: A - Z</option>
                    </select>
                  </div>
                </div>

                {getFilteredProducts().length === 0 ? (
                  <div className="text-center py-16 bg-beige-paper/30 border border-beige-dark/30 rounded-sm">
                    <Search className="w-12 h-12 text-stone-charcoal/30 mx-auto mb-3" />
                    <h4 className="font-serif font-bold text-lg text-stone-charcoal mb-1">Không tìm thấy sản phẩm phù hợp</h4>
                    <p className="text-xs text-stone-charcoal/60 font-sans">Quý khách vui lòng thử tìm kiếm với từ khóa khác hoặc xóa bộ lọc.</p>
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedCategory("all");
                        setPriceFilter("all");
                        setSortBy("default");
                        navigate({ type: "products" });
                        setActiveCategory(null);
                      }}
                      className="mt-4 px-4 py-2 bg-clay text-white text-xs uppercase tracking-wider font-semibold rounded-xs"
                    >
                      Xóa bộ lọc tìm kiếm
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4 sm:gap-6">
                    {getFilteredProducts().map((prod) => (
                      <div 
                        key={prod.id}
                        className="bg-beige border border-beige-dark/40 rounded-sm overflow-hidden group hover:shadow-lg transition-all duration-300 flex flex-col h-full"
                      >
                        <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
                          <img 
                            src={prod.imageUrl} 
                            alt={prod.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-2.5 left-2.5 bg-clay text-beige text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-xs">
                            {prod.categoryName.split(" (")[0]}
                          </div>
                        </div>
                        
                        <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-1 text-bronze mb-1">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 fill-current" />
                              ))}
                              <span className="text-[10px] text-stone-charcoal/50 ml-1">({prod.rating})</span>
                            </div>
                            
                            <h4 
                              onClick={() => navigate({ type: "product-detail", slug: prod.slug })}
                              className="font-serif font-bold text-xs sm:text-sm text-stone-charcoal hover:text-clay transition-colors cursor-pointer line-clamp-2 leading-tight"
                            >
                              {prod.name}
                            </h4>
                            
                            <p className="text-[11px] sm:text-xs text-stone-charcoal/70 font-sans mt-1 line-clamp-2 leading-relaxed">
                              {prod.shortDescription}
                            </p>
                          </div>

                          <div className="border-t border-beige-dark/40 pt-2 flex flex-col xs:flex-row justify-between items-start xs:items-center mt-auto gap-2">
                            <div>
                              <span className="text-[9px] uppercase text-stone-charcoal/50 block font-mono leading-none">Giá chỉ từ</span>
                              <span className="text-xs sm:text-sm font-semibold text-clay leading-tight">{prod.priceStr}</span>
                            </div>
                            <button
                              onClick={() => navigate({ type: "product-detail", slug: prod.slug })}
                              className="w-full xs:w-auto text-center px-2 py-1 bg-beige-paper text-stone-charcoal hover:bg-clay hover:text-white border border-bronze/30 text-[10px] sm:text-[11px] font-semibold transition-all rounded-xs"
                            >
                              Xem Mẫu
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ======================================= */}
        {/* VIEW: PRODUCT DETAIL                    */}
        {/* ======================================= */}
        {currentView.type === "product-detail" && (
          <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {activeProduct ? (
              <div>
                {/* Breadcrumb row */}
                <div className="flex items-center gap-2 mb-6 text-xs text-stone-charcoal/60">
                  <span onClick={() => navigate({ type: "home" })} className="hover:text-clay cursor-pointer">Trang chủ</span>
                  <span>/</span>
                  <span onClick={() => navigate({ type: "products" })} className="hover:text-clay cursor-pointer">Sản phẩm</span>
                  <span>/</span>
                  <span onClick={() => navigate({ type: "products", categorySlug: activeProduct.categorySlug })} className="hover:text-clay cursor-pointer">{activeProduct.categoryName}</span>
                  <span>/</span>
                  <span className="text-clay font-semibold line-clamp-1">{activeProduct.name}</span>
                </div>

                {/* Back button */}
                <button
                  onClick={() => navigate({ type: "products" })}
                  className="mb-6 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-stone-charcoal hover:text-clay"
                >
                  <ArrowLeft className="w-4 h-4" /> Quay lại danh sách sản phẩm
                </button>

                {/* Two Column Layout: Image & Ordering specs */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
                  
                  {/* Left Column: Image with traditional frame */}
                  <div className="lg:col-span-6">
                    <div className="border border-bronze p-2 rounded-xs bg-beige-paper/50">
                      <div className="aspect-[4/3] bg-stone-100 overflow-hidden relative">
                        <img 
                          src={selectedImage || activeProduct.imageUrl} 
                          alt={activeProduct.name} 
                          className="w-full h-full object-cover transition-all duration-300"
                        />
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-4 gap-2">
                      <button 
                        onClick={() => setSelectedImage(activeProduct.imageUrl)}
                        className={`aspect-[4/3] bg-stone-200 border cursor-pointer overflow-hidden transition-all duration-300 ${
                          (!selectedImage || selectedImage === activeProduct.imageUrl)
                            ? "border-red-clay scale-[1.02] opacity-100 shadow-sm"
                            : "border-bronze/20 opacity-70 hover:opacity-100"
                        }`}
                      >
                        <img src={activeProduct.imageUrl} alt="Detail" className="w-full h-full object-cover" />
                      </button>
                      {activeProduct.images && activeProduct.images.length > 0 ? (
                        activeProduct.images.map((imgUrl, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedImage(imgUrl)}
                            className={`aspect-[4/3] bg-stone-200 border cursor-pointer overflow-hidden transition-all duration-300 ${
                              selectedImage === imgUrl
                                ? "border-red-clay scale-[1.02] opacity-100 shadow-sm"
                                : "border-bronze/20 opacity-70 hover:opacity-100"
                            }`}
                          >
                            <img src={imgUrl} alt={`Detail ${index + 1}`} className="w-full h-full object-cover" />
                          </button>
                        ))
                      ) : (
                        <>
                          <div className="aspect-[4/3] bg-stone-100 border border-bronze/10 flex items-center justify-center text-[10px] text-stone-charcoal/50 font-serif p-1 text-center">
                            Phôi Đá Đẹp
                          </div>
                          <div className="aspect-[4/3] bg-stone-100 border border-bronze/10 flex items-center justify-center text-[10px] text-stone-charcoal/50 font-serif p-1 text-center">
                            Mạ Vàng 24K
                          </div>
                          <div className="aspect-[4/3] bg-stone-100 border border-bronze/10 flex items-center justify-center text-[10px] text-stone-charcoal/50 font-serif p-1 text-center">
                            Chuẩn Lỗ Ban
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Order Specs */}
                  <div className="lg:col-span-6 flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-widest text-clay font-semibold bg-clay-light px-2.5 py-1 rounded-xs inline-block mb-3">
                        {activeProduct.categoryName}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-charcoal leading-tight mb-2">
                        {activeProduct.name}
                      </h2>
                      
                      <div className="flex items-center gap-4 my-3 border-b border-beige-dark/60 pb-3">
                        <div className="flex items-center gap-0.5 text-bronze">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4.5 h-4.5 fill-current" />
                          ))}
                        </div>
                        <span className="text-xs text-stone-charcoal/60 font-sans">
                          Đánh giá tuyệt đối 5/5 dựa trên phản hồi khách hàng thực tế
                        </span>
                      </div>

                      <div className="bg-beige-paper p-4 rounded-xs border border-beige-dark/60 mb-5">
                        <span className="text-xs uppercase text-stone-charcoal/60 block font-mono mb-1">Giá xưởng chế tác dao động từ:</span>
                        <span className="text-2xl sm:text-3xl font-bold text-clay font-mono">{activeProduct.priceStr}</span>
                        <span className="text-xs text-stone-charcoal/50 block mt-1">(* Giá thay đổi phụ thuộc vào kích thước bia và yêu cầu mạ nhũ/vàng lá)</span>
                      </div>

                      <p className="text-sm text-stone-charcoal/85 font-sans leading-relaxed mb-6">
                        {activeProduct.shortDescription}
                      </p>

                      <div className="space-y-2 border-t border-beige-dark/60 pt-4 mb-6">
                        <div className="flex items-center gap-2 text-xs text-stone-charcoal/80">
                          <CheckCircle2 className="w-4.5 h-4.5 text-clay shrink-0" />
                          <span>Hỗ trợ khắc chân dung truyền thần kỹ nghệ Laser siêu nét</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-stone-charcoal/80">
                          <CheckCircle2 className="w-4.5 h-4.5 text-clay shrink-0" />
                          <span>Đá chất lượng cao, không rạn nứt ngầm, không bay màu sơn chữ</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-stone-charcoal/80">
                          <CheckCircle2 className="w-4.5 h-4.5 text-clay shrink-0" />
                          <span>Thi công đúng tiến độ cam kết trong hợp đồng</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <button
                        onClick={() => navigate({ type: "contact", productSlug: activeProduct.slug })}
                        className="flex-1 py-3 bg-clay text-beige hover:bg-clay-dark font-bold text-xs uppercase tracking-widest rounded-sm text-center shadow-md transition-all flex items-center justify-center gap-2"
                      >
                        <Heart className="w-4 h-4 text-bronze" /> Yêu Cầu Chế Tác Riêng
                      </button>
                      <a
                        href="tel:0987654321"
                        className="py-3 px-6 border border-clay text-clay hover:bg-clay-light font-bold text-xs uppercase tracking-widest rounded-sm text-center transition-all flex items-center justify-center gap-2"
                      >
                        <Phone className="w-4 h-4 text-clay" /> Gọi 0987.654.321
                      </a>
                    </div>
                  </div>
                </div>

                {/* Additional detailed descriptions & Specs Tabs */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-t border-beige-dark/60 pt-10">
                  
                  {/* Left Specs side */}
                  <div className="lg:col-span-7">
                    <h3 className="font-serif font-bold text-xl text-stone-charcoal border-b border-clay/30 pb-3 mb-4">
                      Thông Tin Chi Tiết Sản Phẩm
                    </h3>
                    <p className="text-sm text-stone-charcoal/80 font-sans leading-relaxed mb-6 whitespace-pre-line">
                      {activeProduct.description}
                    </p>

                    <h4 className="font-serif font-bold text-base text-stone-charcoal mb-3">Đặc điểm nổi trội từ Xưởng Tâm An:</h4>
                    <ul className="space-y-2 mb-6">
                      {activeProduct.features.map((feat, idx) => (
                        <li key={idx} className="text-xs text-stone-charcoal/80 font-sans flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-clay shrink-0 mt-1.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right specifications block */}
                  <div className="lg:col-span-5 bg-beige-paper p-6 rounded-sm border border-beige-dark/40">
                    <h3 className="font-serif font-bold text-base text-stone-charcoal border-b border-beige-dark pb-3 mb-4">
                      Thông số Kỹ thuật & Thiết kế
                    </h3>
                    <div className="space-y-3">
                      {activeProduct.specifications.map((spec, index) => (
                        <div key={index} className="flex justify-between border-b border-beige-dark/40 pb-2 text-xs">
                          <span className="font-medium text-stone-charcoal/60">{spec.key}</span>
                          <span className="font-semibold text-stone-charcoal text-right max-w-[200px]">{spec.value}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 bg-clay-light/50 p-4 border border-clay/20 text-xs text-clay-dark rounded-xs">
                      <h4 className="font-bold mb-1">Mách nhỏ phong thủy:</h4>
                      <p className="font-sans leading-relaxed">
                        Theo chuẩn thước lỗ ban âm phần, kích thước 30x40cm hay 40x60cm mang các cung đại cát phú quý, mang hưng thịnh cho con cháu dòng họ. Hãy kết hợp chạm nổi hoa văn sen đầm phong thủy để tối ưu may mắn, cát khí.
                      </p>
                    </div>

                    {getYoutubeEmbedId(activeProduct.videoUrl) && (
                      <div className="mt-6">
                        <h4 className="font-serif font-bold text-sm text-stone-charcoal mb-2">Video Giới Thiệu</h4>
                        <div className="aspect-video border border-bronze/30 rounded-xs overflow-hidden">
                          <iframe
                            src={`https://www.youtube-nocookie.com/embed/${getYoutubeEmbedId(activeProduct.videoUrl)}`}
                            title={`Video giới thiệu ${activeProduct.name}`}
                            className="w-full h-full"
                            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                            sandbox="allow-scripts allow-same-origin allow-presentation"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Related Products Section */}
                <div className="mt-16 border-t border-beige-dark/60 pt-12">
                  <h3 className="font-serif font-bold text-xl text-stone-charcoal mb-8 text-center sm:text-left">
                    Sản Phẩm Cùng Phân Khúc Đá Chế Tác
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allProducts
                      .filter(p => p.categorySlug === activeProduct.categorySlug && p.id !== activeProduct.id)
                      .slice(0, 3)
                      .map((prod) => (
                        <div 
                          key={prod.id}
                          className="bg-beige border border-beige-dark/30 rounded-sm overflow-hidden group hover:shadow-md transition-all duration-300"
                        >
                          <div className="aspect-[4/3] bg-stone-100 overflow-hidden relative">
                            <img src={prod.imageUrl} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          </div>
                          <div className="p-4 flex flex-col justify-between h-[180px]">
                            <div>
                              <h4 
                                onClick={() => navigate({ type: "product-detail", slug: prod.slug })}
                                className="font-serif font-bold text-sm text-stone-charcoal hover:text-clay cursor-pointer line-clamp-2"
                              >
                                {prod.name}
                              </h4>
                              <p className="text-xs text-stone-charcoal/60 font-sans mt-1 line-clamp-2">{prod.shortDescription}</p>
                            </div>
                            <div className="flex justify-between items-center mt-3 border-t border-beige-dark/30 pt-2">
                              <span className="text-xs font-semibold text-clay">{prod.priceStr}</span>
                              <button
                                onClick={() => navigate({ type: "product-detail", slug: prod.slug })}
                                className="text-xs font-bold text-clay hover:underline"
                              >
                                Xem Chi Tiết
                              </button>
                            </div>
                          </div>
                        </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="font-serif text-xl text-stone-charcoal">Rất tiếc! Mẫu bia mộ này không còn hoạt động hoặc đang cập nhật thông tin.</h3>
                <button onClick={() => navigate({ type: "products" })} className="mt-4 px-4 py-2 bg-clay text-beige text-xs uppercase font-semibold">
                  Quay lại danh sách sản phẩm
                </button>
              </div>
            )}
          </div>
        )}

        {/* ======================================= */}
        {/* VIEW: PROJECTS (DANH SÁCH CÔNG TRÌNH)   */}
        {/* ======================================= */}
        {currentView.type === "projects" && (
          <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="border-b border-beige-dark pb-6 mb-10 text-center sm:text-left">
              <span onClick={() => navigate({ type: "home" })} className="text-xs text-stone-charcoal/60 hover:text-clay cursor-pointer uppercase font-mono tracking-wider">Trang chủ</span>
              <span className="text-xs text-stone-charcoal/40 mx-2">/</span>
              <span className="text-xs text-clay font-bold uppercase font-mono tracking-wider">Công trình thực tế</span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-charcoal mt-1">Dự Án Điêu Khắc Đá Tiêu Biểu</h2>
              <p className="text-sm text-stone-charcoal/70 mt-1 max-w-2xl font-sans">
                Tổng hợp các công trình phục dựng bia di tích quốc gia, quy hoạch lăng mộ gia đình, và bia liệt sĩ tâm linh do Đá Tâm An trực tiếp gia công chế tác và lắp dựng hoàn chỉnh.
              </p>
            </div>

            <div className="space-y-12">
              {projects.map((proj, idx) => (
                <div 
                  key={proj.id}
                  className={`flex flex-col lg:flex-row gap-8 items-center border border-beige-dark/40 bg-beige-paper/30 p-6 rounded-sm hover:shadow-md transition-shadow ${
                    idx % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Visual Frame */}
                  <div className="w-full lg:w-1/2 aspect-video bg-stone-200 overflow-hidden rounded-xs border border-bronze/20">
                    <img 
                      src={proj.imageUrl} 
                      alt={proj.name} 
                      className="w-full h-full object-cover hover:scale-102 transition-transform duration-500"
                    />
                  </div>

                  {/* Descriptions block */}
                  <div className="w-full lg:w-1/2 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap gap-2.5 mb-3 text-xs font-mono">
                        <span className="bg-clay-light text-clay px-2.5 py-0.5 rounded-xs font-semibold">{proj.location}</span>
                        <span className="bg-beige-paper border border-beige-dark px-2.5 py-0.5 rounded-xs text-stone-charcoal/70">Năm: {proj.year}</span>
                      </div>
                      <h3 
                        onClick={() => navigate({ type: "project-detail", slug: proj.slug })}
                        className="font-serif font-bold text-xl sm:text-2xl text-stone-charcoal hover:text-clay transition-colors cursor-pointer"
                      >
                        {proj.name}
                      </h3>
                      <p className="text-sm text-stone-charcoal/80 font-sans mt-3.5 leading-relaxed">
                        {proj.shortDescription}
                      </p>
                      
                      <div className="mt-4 border-t border-beige-dark/50 pt-4">
                        <span className="text-xs font-semibold text-stone-charcoal block mb-1">Dòng vật liệu chính:</span>
                        <span className="text-xs text-clay italic font-mono">{proj.material}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => navigate({ type: "project-detail", slug: proj.slug })}
                      className="mt-6 self-start px-5 py-2.5 bg-clay hover:bg-clay-dark text-white text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors flex items-center gap-1.5"
                    >
                      Xem chi tiết dự án <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================= */}
        {/* VIEW: PROJECT DETAIL                    */}
        {/* ======================================= */}
        {currentView.type === "project-detail" && (
          <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {activeProject ? (
              <div>
                <div className="flex items-center gap-2 mb-6 text-xs text-stone-charcoal/60">
                  <span onClick={() => navigate({ type: "home" })} className="hover:text-clay cursor-pointer">Trang chủ</span>
                  <span>/</span>
                  <span onClick={() => navigate({ type: "projects" })} className="hover:text-clay cursor-pointer">Công trình</span>
                  <span>/</span>
                  <span className="text-clay font-semibold line-clamp-1">{activeProject.name}</span>
                </div>

                <button
                  onClick={() => navigate({ type: "projects" })}
                  className="mb-6 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-stone-charcoal hover:text-clay"
                >
                  <ArrowLeft className="w-4 h-4" /> Quay lại danh sách công trình
                </button>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-charcoal leading-tight mb-4">
                  {activeProject.name}
                </h2>

                <div className="flex flex-wrap gap-4 text-xs font-mono text-stone-charcoal/60 border-b border-beige-dark pb-4 mb-6">
                  <span>Địa điểm: <strong className="text-stone-charcoal font-semibold">{activeProject.location}</strong></span>
                  <span>|</span>
                  <span>Năm hoàn thành: <strong className="text-stone-charcoal font-semibold">{activeProject.year}</strong></span>
                  <span>|</span>
                  <span>Chất đá chính: <strong className="text-clay font-semibold">{activeProject.material}</strong></span>
                </div>

                <div className="border border-bronze p-2 rounded-xs bg-beige-paper/40 mb-8">
                  <div className="aspect-[16/9] overflow-hidden bg-stone-200">
                    <img src={activeProject.imageUrl} alt={activeProject.name} className="w-full h-full object-cover" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                  <div className="md:col-span-8">
                    <h3 className="font-serif font-bold text-lg text-stone-charcoal border-b border-clay/30 pb-2 mb-3">
                      Tổng quan về quá trình thi công
                    </h3>
                    <p className="text-sm text-stone-charcoal/80 font-sans leading-relaxed whitespace-pre-line">
                      {activeProject.description}
                    </p>
                  </div>

                  <div className="md:col-span-4 bg-beige-paper p-5 border border-beige-dark/50 rounded-sm">
                    <h3 className="font-serif font-bold text-base text-stone-charcoal border-b border-beige-dark pb-2 mb-3">
                      Hạng mục triển khai
                    </h3>
                    <ul className="space-y-3">
                      {activeProject.scope.map((step, index) => (
                        <li key={index} className="text-xs text-stone-charcoal/85 leading-relaxed flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full bg-clay text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                            {index + 1}
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Consultation prompt */}
                <div className="mt-12 bg-clay-light/60 p-6 border border-clay/15 rounded-sm flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <h4 className="font-serif font-bold text-base text-clay-dark mb-1">Quý khách mong muốn có một lăng mộ tương tự cho gia tộc?</h4>
                    <p className="text-xs text-stone-charcoal/70">Liên hệ trực tiếp để nghệ nhân của chúng tôi khảo sát và lên thiết kế độc bản miễn phí.</p>
                  </div>
                  <button
                    onClick={() => navigate({ type: "contact" })}
                    className="px-6 py-2.5 bg-clay hover:bg-clay-dark text-white text-xs font-semibold uppercase tracking-wider rounded-xs whitespace-nowrap"
                  >
                    Đăng Ký Tư Vấn Điêu Khắc
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="font-serif text-xl text-stone-charcoal">Đang tải thông tin chi tiết dự án công trình...</h3>
              </div>
            )}
          </div>
        )}

        {/* ======================================= */}
        {/* VIEW: POSTS (TIN TỨC - CẨM NANG)        */}
        {/* ======================================= */}
        {currentView.type === "posts" && (
          <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="border-b border-beige-dark pb-6 mb-10 text-center sm:text-left">
              <span onClick={() => navigate({ type: "home" })} className="text-xs text-stone-charcoal/60 hover:text-clay cursor-pointer uppercase font-mono tracking-wider">Trang chủ</span>
              <span className="text-xs text-stone-charcoal/40 mx-2">/</span>
              <span className="text-xs text-clay font-bold uppercase font-mono tracking-wider">Cẩm nang phong thủy</span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-charcoal mt-1">Tư Vấn Phong Thủy & Ý Nghĩa Tâm Linh</h2>
              <p className="text-sm text-stone-charcoal/70 mt-1 max-w-2xl font-sans">
                Kênh chia sẻ kiến thức hữu ích về cách chọn kích thước bia mộ chuẩn phong thủy Lỗ Ban, so sánh các dòng đá tạc mỹ nghệ và giải mã các mẫu họa tiết chạm khắc cổ điển.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <div 
                  key={post.id}
                  className="bg-beige-paper/30 border border-beige-dark/30 rounded-sm overflow-hidden group cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => navigate({ type: "post-detail", slug: post.slug })}
                >
                  <div className="aspect-video bg-stone-100 overflow-hidden relative">
                    <img src={post.imageUrl} alt={post.name} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3 text-[10px] text-stone-charcoal/50 font-mono mb-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {post.date}
                      </span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="font-serif font-bold text-base text-stone-charcoal group-hover:text-clay transition-colors line-clamp-2">
                      {post.name}
                    </h3>
                    <p className="text-xs text-stone-charcoal/70 font-sans mt-2 line-clamp-3 leading-relaxed">
                      {post.shortDescription}
                    </p>
                    <span className="text-xs font-bold text-clay mt-4 inline-block hover:underline">
                      Đọc toàn bộ bài viết →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================= */}
        {/* VIEW: POST DETAIL                       */}
        {/* ======================================= */}
        {currentView.type === "post-detail" && (
          <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {activePost ? (
              <article>
                <div className="flex items-center gap-2 mb-6 text-xs text-stone-charcoal/60">
                  <span onClick={() => navigate({ type: "home" })} className="hover:text-clay cursor-pointer">Trang chủ</span>
                  <span>/</span>
                  <span onClick={() => navigate({ type: "posts" })} className="hover:text-clay cursor-pointer">Bài viết</span>
                  <span>/</span>
                  <span className="text-clay font-semibold line-clamp-1">{activePost.name}</span>
                </div>

                <button
                  onClick={() => navigate({ type: "posts" })}
                  className="mb-6 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-stone-charcoal hover:text-clay"
                >
                  <ArrowLeft className="w-4 h-4" /> Quay lại danh sách bài viết
                </button>

                <h1 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-stone-charcoal leading-tight mb-4">
                  {activePost.name}
                </h1>

                <div className="flex items-center gap-4 text-xs font-mono text-stone-charcoal/60 border-b border-beige-dark pb-4 mb-6">
                  <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> Tác giả: {activePost.author}</span>
                  <span>|</span>
                  <span>Ngày đăng: {activePost.date}</span>
                  <span>|</span>
                  <span>Thời gian đọc: {activePost.readTime}</span>
                </div>

                <div className="border border-bronze p-2 rounded-xs bg-beige-paper/40 mb-8 max-h-[400px] overflow-hidden">
                  <img src={activePost.imageUrl} alt={activePost.name} className="w-full h-full object-cover rounded-xs" />
                </div>

                <div className="prose max-w-none text-stone-charcoal/90 font-sans text-sm leading-relaxed whitespace-pre-line space-y-4">
                  {activePost.content}
                </div>

                {/* Return Prompt */}
                <div className="mt-12 pt-8 border-t border-beige-dark/60 flex justify-between items-center">
                  <button 
                    onClick={() => navigate({ type: "posts" })}
                    className="text-xs font-bold text-stone-charcoal hover:text-clay uppercase tracking-wider flex items-center gap-1"
                  >
                    ← Quay lại cẩm nang
                  </button>
                  <button 
                    onClick={() => navigate({ type: "contact" })}
                    className="px-5 py-2.5 bg-clay hover:bg-clay-dark text-white text-xs uppercase tracking-wider font-semibold rounded-xs"
                  >
                    Đăng Ký Nhận Tư Vấn Phong Thủy
                  </button>
                </div>
              </article>
            ) : (
              <div className="text-center py-16">
                <h3 className="font-serif text-xl text-stone-charcoal">Đang tải nội dung bài viết cẩm nang...</h3>
              </div>
            )}
          </div>
        )}

        {/* ======================================= */}
        {/* VIEW: CONTACT (LIÊN HỆ)                 */}
        {/* ======================================= */}
        {currentView.type === "contact" && (
          <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="border-b border-beige-dark pb-6 mb-10 text-center sm:text-left">
              <span onClick={() => navigate({ type: "home" })} className="text-xs text-stone-charcoal/60 hover:text-clay cursor-pointer uppercase font-mono tracking-wider">Trang chủ</span>
              <span className="text-xs text-stone-charcoal/40 mx-2">/</span>
              <span className="text-xs text-clay font-bold uppercase font-mono tracking-wider">Liên hệ</span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-charcoal mt-1">Liên Hệ Thiết Kế & Báo Giá Xưởng</h2>
              <p className="text-sm text-stone-charcoal/70 mt-1 max-w-2xl font-sans">
                Điền đầy đủ thông tin vào mẫu khảo sát dưới đây, đội ngũ kiến trúc sư và nghệ nhân Đá Tâm An sẽ gọi điện tư vấn phác thảo bản vẽ Lỗ Ban miễn phí trong vòng 1h.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Form Input Block Column */}
              <div className="lg:col-span-7 bg-beige-paper p-6 sm:p-8 rounded-sm border border-beige-dark/55">
                <h3 className="font-serif font-bold text-lg text-stone-charcoal border-b border-beige-dark pb-3 mb-6 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-clay animate-pulse" /> Đăng ký nhận thông tin tư vấn
                </h3>

                <form onSubmit={handleContactSubmit} className="space-y-4">
                  {formSuccessMsg && (
                    <div className="p-4 bg-emerald-50 border-l-4 border-emerald-500 text-sm text-emerald-800 rounded-sm">
                      <p className="font-semibold">{formSuccessMsg}</p>
                    </div>
                  )}

                  {formErrorMsg && (
                    <div className="p-4 bg-clay-light border-l-4 border-clay text-sm text-clay-dark rounded-sm">
                      <p className="font-semibold">{formErrorMsg}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-stone-charcoal/70 block mb-1">Họ tên gia chủ <span className="text-clay">*</span></label>
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="Ví dụ: Nguyễn Văn A"
                        className="w-full bg-beige border border-beige-dark/75 focus:border-clay/80 text-sm p-2.5 rounded-xs focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-stone-charcoal/70 block mb-1">Số điện thoại liên hệ <span className="text-clay">*</span></label>
                      <input
                        type="tel"
                        required
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        placeholder="Ví dụ: 0912345678"
                        className="w-full bg-beige border border-beige-dark/75 focus:border-clay/80 text-sm p-2.5 rounded-xs focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-stone-charcoal/70 block mb-1">Địa chỉ Email (Nếu có)</label>
                      <input
                        type="email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="Vi dụ: giaochu@gmail.com"
                        className="w-full bg-beige border border-beige-dark/75 focus:border-clay/80 text-sm p-2.5 rounded-xs focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-stone-charcoal/70 block mb-1">Sản phẩm cần tư vấn</label>
                      <select
                        value={contactProduct}
                        onChange={(e) => setContactProduct(e.target.value)}
                        className="w-full bg-beige border border-beige-dark/75 focus:border-clay/80 text-sm p-2.5 rounded-xs focus:outline-none"
                      >
                        <option value="">-- Chọn Mẫu Bia / Mộ Đá --</option>
                        {allProducts.map((p) => (
                          <option key={p.id} value={p.slug}>{p.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-stone-charcoal/70 block mb-1">Nội dung chi tiết yêu cầu kích thước, chất đá, câu chữ</label>
                    <textarea
                      rows={4}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Nhập yêu cầu riêng về hoa văn khắc chữ, loại đá, kích thước chuẩn phong thủy..."
                      className="w-full bg-beige border border-beige-dark/75 focus:border-clay/80 text-sm p-2.5 rounded-xs focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-clay hover:bg-clay-dark disabled:bg-stone-charcoal/30 text-white font-bold text-xs uppercase tracking-widest transition-all rounded-sm flex items-center justify-center gap-2 shadow-sm"
                  >
                    {isSubmitting ? (
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    ) : (
                      <>
                        <Send className="w-4.5 h-4.5 text-bronze" /> Đăng Ký Tư Vấn Miễn Phí
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Sidebar Info Column */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Visual Direct hotline box */}
                <div className="bg-clay text-beige p-6 rounded-sm border border-bronze/40 shadow-md">
                  <h4 className="font-serif font-bold text-lg text-bronze mb-2">Đường Dây Nóng Hỗ Trợ Gấp</h4>
                  <p className="text-xs opacity-90 leading-relaxed font-sans mb-6">
                    Liên hệ ngay với quản lý xưởng tạc đá của chúng tôi để được giải đáp tức thì về giá cả, tư vấn phong thủy nhanh chóng.
                  </p>
                  
                  <div className="space-y-4">
                    <a href="tel:0987654321" className="flex items-center gap-3.5 hover:text-bronze transition-colors">
                      <div className="p-2.5 bg-clay-dark rounded-full">
                        <Phone className="w-5 h-5 text-bronze animate-bounce" />
                      </div>
                      <div>
                        <span className="text-[10px] block opacity-70 font-mono">Hotline tư vấn kỹ thuật</span>
                        <strong className="text-base font-serif">0987.654.321</strong>
                      </div>
                    </a>
                    
                    <div className="flex items-center gap-3.5">
                      <div className="p-2.5 bg-clay-dark rounded-full">
                        <MapPin className="w-5 h-5 text-bronze" />
                      </div>
                      <div>
                        <span className="text-[10px] block opacity-70 font-mono">Văn phòng & Xưởng sản xuất</span>
                        <strong className="text-xs leading-normal block">Làng nghề đá mỹ nghệ Ninh Vân, Hoa Lư, Ninh Bình</strong>
                      </div>
                    </div>

                    <div className="flex items-center gap-3.5">
                      <div className="p-2.5 bg-clay-dark rounded-full">
                        <Mail className="w-5 h-5 text-bronze" />
                      </div>
                      <div>
                        <span className="text-[10px] block opacity-70 font-mono">Email trao đổi báo giá</span>
                        <strong className="text-xs font-mono">lienhe@dataman.vn</strong>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Google map simulation */}
                <div className="border border-beige-dark/60 bg-beige-paper p-4 rounded-sm">
                  <h4 className="font-serif font-bold text-xs text-stone-charcoal mb-2">Bản Đồ Chỉ Đường Tới Xưởng Chế Tác</h4>
                  <div className="aspect-video bg-stone-200 overflow-hidden rounded-xs relative flex items-center justify-center border border-bronze/10">
                    {/* Simulated elegant map placeholder */}
                    <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=400&auto=format&fit=crop')" }} />
                    <div className="text-center z-10 px-4">
                      <MapPin className="w-8 h-8 text-clay mx-auto mb-1 animate-bounce" />
                      <strong className="text-xs text-stone-charcoal block">Đá Mỹ Nghệ Tâm An</strong>
                      <span className="text-[10px] text-stone-charcoal/60">Ninh Vân, Hoa Lư, Ninh Bình</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

      </main>

      {/* Universal footer bar */}
      <footer className="bg-stone-charcoal text-beige border-t border-bronze/20 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8 border-b border-white/10 pb-8">
            
            {/* Column 1: Brand Info */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-sm bg-clay flex items-center justify-center traditional-border">
                  <span className="font-serif font-bold text-lg text-bronze">TA</span>
                </div>
                <div>
                  <h4 className="font-serif font-bold text-lg tracking-wide text-white leading-none">ĐÁ TÂM AN</h4>
                  <span className="text-[10px] uppercase tracking-widest text-bronze font-mono">Giao hòa truyền thống & hiện đại</span>
                </div>
              </div>
              <p className="text-xs text-beige/70 leading-relaxed font-sans max-w-sm">
                Chúng tôi tự hào kế thừa nét tinh hoa chạm khắc đá độc bản hàng trăm năm từ Ninh Bình. Cam kết cung cấp các sản phẩm bia mộ đá Granite, bia đá xanh tự nhiên trường tồn vĩnh cửu.
              </p>
            </div>

            {/* Column 2: Navigation shortcuts */}
            <div className="md:col-span-3 space-y-3">
              <h5 className="font-serif font-bold text-sm text-bronze uppercase tracking-wider">Hỗ Trợ Nhanh</h5>
              <ul className="space-y-1.5 text-xs text-beige/80 font-sans">
                <li>
                  <button onClick={() => navigate({ type: "products" })} className="hover:text-bronze transition-colors text-left">
                    Danh Sách Sản Phẩm Đá
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate({ type: "projects" })} className="hover:text-bronze transition-colors text-left">
                    Các Công Trình Thực Tế
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate({ type: "posts" })} className="hover:text-bronze transition-colors text-left">
                    Cẩm Nang Phong Thủy Bia Mộ
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate({ type: "contact" })} className="hover:text-bronze transition-colors text-left">
                    Đăng Ký Tư Vấn Báo Giá
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Workshop location details */}
            <div className="md:col-span-4 space-y-3">
              <h5 className="font-serif font-bold text-sm text-bronze uppercase tracking-wider">Xưởng Chế Tác</h5>
              <p className="text-xs text-beige/80 leading-relaxed font-sans">
                Địa chỉ: Làng nghề đá mỹ nghệ xã Ninh Vân, huyện Hoa Lư, tỉnh Ninh Bình.<br />
                Hotline chăm sóc khách hàng: 0987.654.321<br />
                Email: lienhe@dataman.vn
              </p>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center text-[10px] text-beige/50 font-mono tracking-wider text-center gap-4">
            <div>
              &copy; {new Date().getFullYear()} Bia Mộ Đá Mỹ Nghệ Tâm An. Bảo lưu mọi quyền thương hiệu.
            </div>
            <div className="flex gap-4">
              <span>Ninh Vân, Ninh Bình, Việt Nam</span>
              <span>•</span>
              <span>Chạm khắc chữ sâu mạ vàng 24K</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
