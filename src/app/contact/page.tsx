// src/app/contact/page.tsx
"use client";

import { useState, FormEvent, useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState<{
    type: "idle" | "loading" | "success" | "error";
    message: string;
  }>({
    type: "idle",
    message: "",
  });

  const submitBgLayersRef = useRef<(HTMLDivElement | null)[]>([]);
  const socialBgLayersRef = useRef<(HTMLDivElement | null)[]>([]);
  const formRef = useRef<HTMLDivElement | null>(null);
  const rightRef = useRef<HTMLDivElement | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus({ type: "loading", message: "Sending your message..." });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setFormStatus({
        type: "success",
        message: "Message sent successfully! I'll get back to you soon. 🚀",
      });

      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          address: "",
          phone: "",
          message: "",
        });
        setFormStatus({ type: "idle", message: "" });
      }, 3000);
    } catch (error) {
      setFormStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      });

      // Clear error after 5 seconds
      setTimeout(() => {
        setFormStatus({ type: "idle", message: "" });
      }, 5000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    // Detect screen size for submit button images
    const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;

    const submitImages = isMobile
      ? Array.from({ length: 5 }, (_, i) => `/mob-submit-${i + 1}.png`)
      : Array.from({ length: 5 }, (_, i) => `/submit-${i + 1}.png`);

    const socialImages = [
      "/icon-1.png",
      "/icon-2.png",
      "/icon-3.png",
      "/icon-4.png",
      "/icon-5.png",
    ];

    // Preload images
    [...submitImages, ...socialImages].forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });

    const animateBgLayers = (
      layers: (HTMLDivElement | null)[],
      imageCount: number,
      images: string[],
    ) => {
      if (layers.length !== imageCount) return null;

      // Set background images dynamically
      layers.forEach((layer, i) => {
        if (layer) {
          layer.style.backgroundImage = `url(${images[i]})`;
        }
      });

      gsap.set(layers, { autoAlpha: 0 });
      gsap.set(layers[0], { autoAlpha: 1 });

      const tl = gsap.timeline({ repeat: -1 });
      const duration = 0.8;
      const hold = 0.5;

      layers.forEach((_, i) => {
        const next = (i + 1) % layers.length;
        tl.to(layers[i], { autoAlpha: 0, duration }, `+=${hold}`).to(
          layers[next],
          { autoAlpha: 1, duration },
          `-=${duration}`,
        );
      });

      return tl;
    };

    let submitTl: gsap.core.Timeline | null = null;
    let socialTl: gsap.core.Timeline | null = null;

    const timer = setTimeout(() => {
      submitTl = animateBgLayers(
        submitBgLayersRef.current,
        submitImages.length,
        submitImages,
      );

      socialTl = animateBgLayers(
        socialBgLayersRef.current,
        socialImages.length,
        socialImages,
      );
    }, 100);

    return () => {
      clearTimeout(timer);
      submitTl?.kill();
      socialTl?.kill();
      gsap.killTweensOf([
        ...submitBgLayersRef.current,
        ...socialBgLayersRef.current,
      ]);
    };
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Left form
      tl.from(formRef.current, {
        x: -180,
        opacity: 0,
        duration: 1.4,
      })

        // Form inputs stagger
        .from(
          "#form input, #form textarea, #form button",
          {
            y: 50,
            opacity: 0,
            stagger: 0.08,
            duration: 0.5,
          },
          "-=0.4",
        )

        // Right content
        .from(
          rightRef.current,
          {
            x: 180,
            opacity: 0,
            duration: 1.4,
          },
          "-=0.6",
        )

        // Social icons
        .from(
          ".social-icon",
          {
            scale: 0,
            opacity: 0,
            stagger: 0.1,
            ease: "back.out(1.7)",
          },
          "-=0.4",
        );
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center pt-[15vh] md:py-[18vh] relative contact-bg">
      {/* Background overlay effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(59,130,246,0.15)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(99,102,241,0.15)_0%,transparent_50%)]" />
      </div>

      <div className="max-w-[1525px] px-4 xl:px-10 w-full grid md:grid-cols-2 md:gap-8 xl:gap-16 items-center relative z-10">
        {/* Left Side - Contact Form */}
        <div
          ref={rightRef}
          className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-[32px] lg:p-8 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.3)] order-2 my-[5vh] md:my-0"
        >
          <h2 className="font-bricolage font-bold 2xl:text-[48px] xl:text-[42px] lg:text-[38px] md:text-[32px] text-[30px] tracking-[-0.03em] leading-[123%] capitalize text-white mb-3">
            Contact Us
          </h2>
          <p className="text-white/60 mb-4 xl:mb-10 font-bricolage font-normal xl:text-[18px] text-[16px] tracking-[-0.01em] capitalize leading-[142%]">
            Let&apos;s connect! Send me a message and I&apos;ll get back to you
            as soon as possible.
          </p>

          <form onSubmit={handleSubmit}>
            {/* Name and Email Row */}
            <div className="grid lg:grid-cols-2 gap-5 mb-5">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={formStatus.type === "loading"}
                  className="w-full px-3 lg:px-5 py-2 lg:py-3 font-bricolage font-normal xl:text-[18px] text-[16px] tracking-[-0.01em] capitalize leading-[142%] bg-white/8 border border-white/15 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500 focus:bg-white/10 focus:ring-4 focus:ring-blue-500/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={formStatus.type === "loading"}
                  className="w-full px-3 lg:px-5 py-2 lg:py-3 font-bricolage font-normal xl:text-[18px] text-[16px] tracking-[-0.01em] leading-[142%] bg-white/8 border border-white/15 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500 focus:bg-white/10 focus:ring-4 focus:ring-blue-500/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {/* Address */}
            <div className="mb-5">
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                disabled={formStatus.type === "loading"}
                className="w-full px-3 lg:px-5 py-2 lg:py-3 font-bricolage font-normal xl:text-[18px] text-[16px] tracking-[-0.01em] capitalize leading-[142%] bg-white/8 border border-white/15 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500 focus:bg-white/10 focus:ring-4 focus:ring-blue-500/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            {/* Phone */}
            <div className="mb-5">
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                disabled={formStatus.type === "loading"}
                className="w-full px-3 lg:px-5 py-2 lg:py-3 font-bricolage font-normal xl:text-[18px] text-[16px] tracking-[-0.01em] capitalize leading-[142%] bg-white/8 border border-white/15 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500 focus:bg-white/10 focus:ring-4 focus:ring-blue-500/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            {/* Message */}
            <div className="mb-5">
              <textarea
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                required
                disabled={formStatus.type === "loading"}
                rows={5}
                className="w-full px-3 lg:px-5 py-2 lg:py-3 font-bricolage font-normal xl:text-[18px] text-[16px] tracking-[-0.01em] capitalize leading-[142%] bg-white/8 border border-white/15 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500 focus:bg-white/10 focus:ring-4 focus:ring-blue-500/10 transition-all resize-y min-h-[140px] disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            {/* Submit Button with Animated Background */}
            <div className="relative w-full">
              {/* Background layers for submit button */}
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={`submit-${i}`}
                  ref={(el) => {
                    submitBgLayersRef.current[i] = el;
                  }}
                  className="absolute inset-0 rounded-[32px] bg-contain bg-no-repeat bg-center z-0 will-change-opacity"
                  style={{ backgroundImage: `url(/submit-${i + 1}.png)` }}
                />
              ))}
              <button
                type="submit"
                disabled={formStatus.type === "loading"}
                className="relative w-full xl:py-3 lg:py-2 py-2 block font-bold font-bricolage text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px] tracking-[-0.07em] capitalize underline bg-transparent text-white rounded-[32px] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 z-10 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {formStatus.type === "loading" ? "Sending..." : "Submit"}
              </button>
            </div>

            {/* Status Message */}
            {formStatus.type !== "idle" && (
              <div
                className={`mt-5 p-4 rounded-xl border font-bricolage text-[14px] lg:text-[16px] transition-all duration-300 ${
                  formStatus.type === "success"
                    ? "bg-green-500/10 border-green-500/30 text-green-400"
                    : formStatus.type === "error"
                      ? "bg-red-500/10 border-red-500/30 text-red-400"
                      : "bg-blue-500/10 border-blue-500/30 text-blue-400"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-xl flex-shrink-0 mt-0.5">
                    {formStatus.type === "success"
                      ? "✓"
                      : formStatus.type === "error"
                        ? "✕"
                        : "⟳"}
                  </span>
                  <p className="flex-1">{formStatus.message}</p>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Right Side - Contact Info */}
        <div ref={formRef} className="md:py-10 order-1">
          <h1 className="font-bricolage font-bold 2xl:text-[48px] xl:text-[42px] lg:text-[38px] md:text-[32px] text-[30px] tracking-[-0.03em] leading-[123%] mb-3 lg:mb-5 text-white">
            Let&apos;s Work{" "}
            <span className="font-[100] font-tartuffo tracking-normal capitalize">
              Together
            </span>
          </h1>
          <p className="text-white/70 font-bricolage font-normal xl:text-[18px] text-[16px] tracking-[-0.01em] capitalize leading-[142%] mb-6 lg:mb-10">
            Have a project in mind or need a modern, HIPAA-conscious website for
            your healthcare practice? Send me a message and I&apos;ll get back
            to you as soon as possible.
          </p>

          {/* Contact Details Card */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-[32px] p-5 lg:p-8 xl:p-10 mb-8">
            <h3 className="font-bricolage font-bold 2xl:text-[32px] xl:text-[30px] lg:text-[28px] md:text-[26px] text-[22px] tracking-[-0.03em] mb-5 lg:mb-8 text-white">
              Speak with Khalid Mahmood
            </h3>

            {/* Phone */}
            <Link
              href="tel:+92 336 3216666"
              className="flex items-center gap-4 mb-6 group"
            >
              <div className="w-11 h-11 bg-[url(/contact-cube.png)] bg-contain bg-center bg-no-repeat rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-white"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <span className="text-white text-base lg:text-lg font-bricolage group-hover:text-blue-400 transition-colors">
                +92 336 3216666
              </span>
            </Link>

            {/* Email */}
            <Link
              href="mailto:info@bestkhalid.com"
              className="flex items-center gap-4 group"
            >
              <div className="w-11 h-11 bg-[url(/contact-cube.png)] bg-contain bg-center bg-no-repeat rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-white"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <span className="text-white text-base lg:text-lg font-bricolage group-hover:text-blue-400 transition-colors">
                info@bestkhalid.com
              </span>
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex items-center relative md:mt-[-2vh] lg:mt-0">
            <div className="relative 2xl:w-[201px] lg:w-[160px] w-[140px] h-[51px] rounded-full">
              {/* Background layers for social pill */}
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={`icon-${i}`}
                  ref={(el) => {
                    socialBgLayersRef.current[i] = el;
                  }}
                  className="absolute inset-0 rounded-full 2xl:bg-cover bg-contain bg-no-repeat bg-center z-0"
                  style={{ backgroundImage: `url(/icon-${i + 1}.png)` }}
                />
              ))}
              <div className="relative z-10 flex items-center justify-center gap-4 2xl:mt-[1.6vh] mt-[2vh]">
                <Link
                  className="hover:scale-125 hover:-translate-y-1 transition-all duration-300"
                  href="https://www.linkedin.com/in/bestkhalid/"
                  target="_blank"
                >
                  <Image
                    src="/linkedin.svg"
                    width={100}
                    height={100}
                    alt="linkedin"
                    className="2xl:w-[19.77px] lg:w-[16px] w-[14px]"
                  />
                </Link>
                <Link
                  className="hover:scale-125 hover:-translate-y-1 transition-all duration-300"
                  href="https://www.facebook.com/bestkhalid"
                  target="_blank"
                >
                  <Image
                    src="/facebook.svg"
                    width={100}
                    height={100}
                    alt="facebook"
                    className="2xl:w-[19.77px] lg:w-[16px] w-[14px]"
                  />
                </Link>
                <Link
                  className="hover:scale-125 hover:-translate-y-1 transition-all duration-300"
                  href="https://www.instagram.com/bestkhalidm/"
                  target="_blank"
                >
                  <Image
                    src="/inst.svg"
                    width={100}
                    height={100}
                    alt="instagram"
                    className="2xl:w-[19.77px] lg:w-[16px] w-[14px]"
                  />
                </Link>
                <Link
                  className="hover:scale-125 hover:-translate-y-1 transition-all duration-300"
                  href="https://twitter.com/besttkhalid"
                  target="_blank"
                >
                  <Image
                    src="/twitter.svg"
                    width={100}
                    height={100}
                    alt="twitter"
                    className="2xl:w-[19.77px] lg:w-[16px] w-[14px]"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
