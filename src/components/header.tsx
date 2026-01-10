"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

const Header = () => {
  const [isMenu_open, setIsMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { label: "Home", href: "#" },
    { label: "The Problem", href: "#the-problem" },
    { label: "The Solution", href: "#the-solution" },
    { label: "Services", href: "#services" },
    { label: "Social Proof", href: "#social-proof" },
    { label: "Process", href: "#process" },
  ];

  // ✅ CTA background images
  const ctaBgImages = [
    "/hire-1.png",
    "/hire-2.png",
    "/hire-3.png",
    "/hire-4.png",
    "/hire-5.png",
  ];

  const ctaBgLayersRef = useRef<(HTMLDivElement | null)[]>([]);

  // Preload & animate CTA backgrounds
  useEffect(() => {
    // Preload
    ctaBgImages.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });

    // Animate on mount
    const animateCtaBg = () => {
      if (ctaBgLayersRef.current.length !== ctaBgImages.length) return;

      gsap.set(ctaBgLayersRef.current, { autoAlpha: 0 });
      gsap.set(ctaBgLayersRef.current[0], { autoAlpha: 1 });  

      const tl = gsap.timeline({ repeat: -1 });
      const duration = 0.8;
      const hold = .5;

      ctaBgLayersRef.current.forEach((_, i) => {
        const next = (i + 1) % ctaBgLayersRef.current.length;
        tl
          .to(ctaBgLayersRef.current[i], { autoAlpha: 0, duration }, `+=${hold}`)
          .to(ctaBgLayersRef.current[next], { autoAlpha: 1, duration }, `-=${duration}`);
      });

      return () => {
        tl.kill();
        gsap.killTweensOf(ctaBgLayersRef.current);
      };
    };

    // Slight delay to ensure DOM is ready
    const timer = setTimeout(animateCtaBg, 100);
    return () => clearTimeout(timer);
  }, []);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active hash tracking
  useEffect(() => {
    const handleHashChange = () => setActiveHash(window.location.hash);
    setActiveHash(window.location.hash);
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const isActive = (href: string) => {
    if (!href.startsWith("#")) return pathname === href;
    return activeHash === href;
  };

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const targetId = href.substring(1);

    if (!targetId) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.history.pushState(null, "", " ");
      setActiveHash("");
      return;
    }

    const element = document.getElementById(targetId);
    if (element) {
      const offset = window.innerHeight * 0.1;
      const scrollPosition = element.offsetTop - offset;
      window.scrollTo({ top: scrollPosition, behavior: "smooth" });
      window.history.pushState(null, "", href);
      setActiveHash(href);
    }
    setIsMenuOpen(false);
  };

  // Mobile menu animation
  useEffect(() => {
    if (!isMenu_open) return;
    const timer = setTimeout(() => {
      const items = document.querySelectorAll(".gsap-mobile-item");
      if (items.length === 0) return;
      gsap.set(items, { opacity: 0, y: -15 });
      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
        stagger: 0.07,
      });
    }, 10);
    return () => clearTimeout(timer);
  }, [isMenu_open]);

  return (
    <header
      className={`fixed left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#001f33]/80 backdrop-blur-md border-b border-[#37ACFF]/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1525px] mx-auto px-4 xl:px-10 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex shrink-0">
            <h1 className="font-extrabold text-[28px] lg:text-[32px] xl:text-[36px] 2xl:text-[38px] leading-[95%] text-[#37ACFF] flex flex-col font-bricolage tracking-[-0.07em]">
              KHALID
              <span className="text-white text-[24px] lg:text-[26px] xl:text-[28px] 2xl:text-[30px] font-extralight mt-[-0.25vw]">
                Mahmood <span>.</span>
              </span>
            </h1>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex bg-[url(/nav.png)] bg-cover bg-center rounded-full md:px-8 lg:px-0 lg:w-[650px] xl:w-[740px] 2xl:w-[817px] h-[50px] 2xl:h-[59px] justify-center items-center gap-4 lg:gap-6 xl:gap-8 font-bricolage text-white text-[16px] md:text-[15px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px] font-normal tracking-[-0.07em] capitalize relative">
            {navItems.map((item) => (
              <div key={item.label} className="relative group">
                <a
                  href={item.href}
                  onClick={(e) => handleAnchorClick(e, item.href)}
                  className={`relative z-10 py-3 transition-colors cursor-pointer hover:underline ${
                    isActive(item.href)
                      ? "text-white underline"
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute -left-5 top-1/2 -translate-y-1/2 transition-opacity duration-200 ${
                      isActive(item.href)
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    <Image
                      src="/button-arrow.svg"
                      width={12}
                      height={12}
                      alt=""
                      className="lg:w-[15px] w-[12px] h-auto"
                    />
                  </span>
                </a>
              </div>
            ))}
          </nav>

          {/* ✅ Desktop CTA Button with Animated Background */}
          <div className="hidden md:flex shrink-0 relative">
            {/* Background layers */}
            {ctaBgImages.map((src, i) => (
              <div
                key={i}
                ref={(el) => {ctaBgLayersRef.current[i] = el}}
                className="absolute inset-0 rounded-[334px] lg:bg-cover bg-contain bg-no-repeat bg-center z-0"
                style={{ backgroundImage: `url(${src})` }}
              />
            ))}

            {/* Button content on top */}
            <button className="relative bg-transparent text-white w-[100px] lg:w-[130px] xl:w-[150px] 2xl:w-[165px] h-[50px] 2xl:h-[59px] rounded-[334px] flex lg:gap-2 gap-1.5 justify-center items-center font-bricolage font-bold text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px] tracking-[-0.07em] capitalize underline z-10">
              <Image
                src="/button-arrow.svg"
                width={1000}
                height={100}
                alt="button-arrow"
                className="w-[12px] md:w-[14px] lg:w-[15px] h-auto"
              />
              Hire Me
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white p-1"
            onClick={() => setIsMenuOpen(!isMenu_open)}
            aria-label="Toggle navigation"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMenu_open
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenu_open && (
          <div className="md:hidden mt-4 pb-4 px-6 bg-[#001f33]/95 backdrop-blur-sm rounded-xl border border-[#37ACFF]/20">
            <div className="flex flex-col gap-2 font-bricolage text-white text-[18px] font-normal tracking-[-0.07em] capitalize">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative py-2.5 gsap-mobile-item"
                >
                  <a
                    href={item.href}
                    onClick={(e) => handleAnchorClick(e, item.href)}
                    className={`block py-1 transition cursor-pointer ${
                      isActive(item.href)
                        ? "text-[#37ACFF]"
                        : "text-white hover:text-[#37ACFF]"
                    }`}
                  >
                    {item.label}
                    {isActive(item.href) && (
                      <span className="absolute -left-5 top-1/2 -translate-y-1/2">
                        <Image
                          src="/button-arrow.svg"
                          width={12}
                          height={12}
                          alt="Active"
                          className="w-[15px] h-auto"
                        />
                      </span>
                    )}
                  </a>
                </div>
              ))}
            </div>
            <button
              className="shadow-button mt-5 w-full bg-[#003459] text-white h-[50px] rounded-[334px] font-bricolage font-bold text-[20px] tracking-[-0.07em] capitalize flex items-center justify-center gap-2"
              style={{ boxShadow: "0px -5px 18px 0px #2E90FA inset" }}
            >
              <Image
                src="/button-arrow.svg"
                width={1000}
                height={100}
                alt="button-arrow"
                className="w-[13px] h-auto"
              />
              Hire Me
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;