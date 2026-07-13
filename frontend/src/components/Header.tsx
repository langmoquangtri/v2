import React, { useState } from "react";
import { Menu, X, Phone, Heart, MapPin, Sparkles } from "lucide-react";
import { ViewType } from "../types";

interface HeaderProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
}

export default function Header({ currentView, onNavigate }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "TRANG CHỦ", view: { type: "home" } as ViewType, path: "/" },
    { label: "SẢN PHẨM", view: { type: "products" } as ViewType, path: "/san-pham" },
    { label: "DỰ ÁN / CÔNG TRÌNH", view: { type: "projects" } as ViewType, path: "/du-an" },
    { label: "BÀI VIẾT", view: { type: "posts" } as ViewType, path: "/bai-viet" },
    { label: "LIÊN HỆ", view: { type: "contact" } as ViewType, path: "/lien-he" },
  ];

  const isActive = (itemView: ViewType) => {
    if (currentView.type === itemView.type) {
      if (currentView.type === "products" && itemView.type === "products") {
        return !currentView.categorySlug;
      }
      return true;
    }
    return false;
  };

  const handleNavClick = (view: ViewType, e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(view);
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-light-cream/95 backdrop-blur-md border-b border-deep-navy/15">
      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Brand Brandmark */}
          <div 
            onClick={(e) => handleNavClick({ type: "home" }, e)}
            className="flex items-center cursor-pointer group"
          >
            <img 
              src="https://pub-74197d4c4a464d7791ddee7a56de9461.r2.dev/logo/Layer%201.png" 
              alt="Đá Tâm An" 
              className="h-14 w-auto transition-transform group-hover:scale-105 object-contain"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item, idx) => (
              <a
                key={idx}
                href={item.path}
                onClick={(e) => handleNavClick(item.view, e)}
                className={`font-serif text-[15px] font-bold tracking-wider transition-all relative py-2 ${
                  isActive(item.view)
                    ? "text-deep-navy font-extrabold"
                    : "text-deep-navy/70 hover:text-deep-navy"
                }`}
              >
                {item.label}
                {isActive(item.view) && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-red-clay" />
                )}
              </a>
            ))}
          </nav>

          {/* CTA Desktop Button */}
          <div className="hidden lg:flex items-center">
            <a
              href="/lien-he"
              onClick={(e) => handleNavClick({ type: "contact" }, e)}
              className="px-6 py-3 bg-deep-navy text-cream text-[11px] font-bold uppercase tracking-widest hover:bg-dark-navy transition-all rounded-none border border-soft-blue/20 flex items-center gap-2"
            >
              <Heart className="w-4 h-4 text-muted-pink animate-pulse" />
              Đặt Chế Tác
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-deep-navy hover:text-red-clay focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="lg:hidden border-t border-deep-navy/10 bg-light-cream/95 backdrop-blur-md transition-all">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navItems.map((item, idx) => (
              <a
                key={idx}
                href={item.path}
                onClick={(e) => handleNavClick(item.view, e)}
                className={`block px-4 py-3 rounded-none font-serif text-[15px] font-bold tracking-wider ${
                  isActive(item.view)
                    ? "bg-cream text-deep-navy"
                    : "text-deep-navy hover:bg-cream hover:text-deep-navy"
                }`}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4 pb-2 border-t border-deep-navy/10 px-4">
              <a
                href="/lien-he"
                onClick={(e) => handleNavClick({ type: "contact" }, e)}
                className="w-full py-3 bg-deep-navy text-cream text-[11px] font-bold uppercase tracking-widest hover:bg-dark-navy transition-all rounded-none text-center block"
              >
                Yêu Cầu Gọi Lại Tư Vấn
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
