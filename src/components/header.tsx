"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "#" },
    { label: "The Problem", href: "#" },
    { label: "The Solution", href: "#" },
    { label: "Services", href: "#" },
    { label: "Social Proof", href: "#" },
    { label: "Process", href: "#" },
  ];

  return (
    <header className="fixed left-0 w-full z-50">
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

          {/* Desktop Nav — only visible from md upward */}
          <nav className="hidden md:flex bg-[#FFFFFF1A] rounded-full md:px-4 lg:px-0 lg:w-[600px] xl:w-[740px] 2xl:w-[817px] h-[50px] 2xl:h-[59px] justify-center items-center gap-4 lg:gap-6 xl:gap-8 font-bricolage text-white text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px] font-normal tracking-[-0.07em] capitalize">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-white hover:underline transition"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden md:flex shrink-0">
            <button
              className="bg-[#003459] text-white w-[100px] lg:w-[130px] xl:w-[150px] 2xl:w-[165px] h-[50px] 2xl:h-[59px] rounded-[334px] flex lg:gap-2 gap-1.5 justify-center items-center font-bricolage font-bold text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px] tracking-[-0.07em] capitalize shadow-button"
            >
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
            onClick={() => setIsMenuOpen(!isMenuOpen)}
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
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 px-4 bg-[#001f33]/95 backdrop-blur-sm rounded-xl border border-[#37ACFF]/20">
            <div className="flex flex-col gap-2 font-bricolage text-white text-[18px] font-normal tracking-[-0.07em] capitalize">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="py-2.5 hover:text-[#37ACFF] transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <button
              className="shadow-button mt-5 w-full bg-[#003459] text-white h-[50px] rounded-[334px] font-bricolage font-bold text-[20px] tracking-[-0.07em] capitalize flex items-center justify-center gap-2"
              style={{ boxShadow: '0px -5px 18px 0px #2E90FA inset' }}
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