'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      setStatus('error');
      return;
    }

    setStatus('submitting');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
        // Optional: auto-hide success after 3s
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <footer className="">
      <div className="bg-[#37ACFF] h-auto py-8 md:py-0 md:h-[436px] relative">
        <Image
          src="/footer-name.svg"
          alt="footername"
          height={100}
          width={100}
          className="absolute -bottom-8 left-1/2 -translate-x-[50%] xl:w-[843px] lg:w-[600px] md:w-[500px] w-[90vw]"
        />
        <div className="max-w-[1525px] mx-auto px-4 xl:px-10 flex flex-col md:flex-row justify-between items-start md:pt-35 gap-8 md:gap-0">
          {/* Section 1: CTA — stays first */}
          <div className="flex flex-col max-w-full md:max-w-[250px] lg:max-w-[350px] xl:max-w-[416px] order-1">
            <h4 className="font-bricolage text-[24px] lg:text-[28px] xl:text-[32px] 2xl:text-[34px] font-bold leading-[123%] tracking-[-0.07em] capitalize text-white">
              Ready to Grow Your Practice With{" "}
              <span className="font-[100] font-tartuffo tracking-[-0.01em]">
                a Website Patients Trust?
              </span>
            </h4>
            <p className="mt-2.5 font-bricolage font-normal text-[16px] xl:text-[18px] tracking-[-0.01em] capitalize">
              Let`s build something that sets your clinic apart.
            </p>
            <button className="mt-5.5 flex justify-center items-center gap-2 text-[16px] xl:text-[18px] font-bricolage capitalize tracking-[-0.07em] font-bold text-[#37ACFF] bg-white hover:opacity-90 rounded-full lg:w-[256px] max-w-fit px-4 h-[44px]">
              <svg xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" width="17" height="12" viewBox="0 0 17 12" fill="none">
                <path d="M0.75 5.52297L-3.49691e-07 5.52297L-4.15258e-07 6.27297L0.75 6.27297L0.75 5.52297ZM16.2803 6.0533C16.5732 5.76041 16.5732 5.28554 16.2803 4.99264L11.5074 0.219671C11.2145 -0.073222 10.7396 -0.073222 10.4467 0.219671C10.1538 0.512564 10.1538 0.987438 10.4467 1.28033L14.6893 5.52297L10.4467 9.76561C10.1538 10.0585 10.1538 10.5334 10.4467 10.8263C10.7396 11.1192 11.2145 11.1192 11.5074 10.8263L16.2803 6.0533ZM0.75 5.52297L0.75 6.27297L15.75 6.27297L15.75 5.52297L15.75 4.77297L0.75 4.77297L0.75 5.52297ZM0.75 5.52297L1.5 5.52297L1.5 1.52297L0.75 1.52297L0 1.52297L-3.49691e-07 5.52297L0.75 5.52297Z" fill="#37ACFF"></path>
              </svg>
              Download Free Guide
            </button>
          </div>

          {/* Section 2: Contact — appears LAST on mobile */}
          <div className="md:self-start order-3 md:order-2">
            <h4 className="font-bricolage text-[24px] lg:text-[28px] xl:text-[32px] 2xl:text-[34px] font-bold leading-[123%] tracking-[-0.07em] capitalize text-white">
              Contact
            </h4>
            <Link href="mailto:hello@bestkhalid.com" className="flex items-center gap-4 mt-3 hover:underline">
              <Image
                src="/envelope.svg"
                height={100}
                width={100}
                alt="phone"
                className="w-[16.76px]"
              />
              <h5 className="font-bricolage text-[16px] xl:text-[18px] font-normal leading-[142%] tracking-[-0.01em] text-white">
                hello@bestkhalid.com
              </h5>
            </Link>
            <Link href="tel:+92 336 3216666" className="flex items-center gap-4 mt-2.5 hover:underline">
              <Image
                src="/phone.svg"
                height={100}
                width={100}
                alt="email"
                className="w-[17.44px]"
              />
              <h5 className="font-bricolage text-[16px] xl:text-[18px] font-normal leading-[142%] tracking-[-0.01em] capitalize text-white">
                +92 336 3216666
              </h5>
            </Link>
          </div>

          {/* Section 3: Social + Form — appears SECOND on mobile */}
          <div className="flex flex-col items-center w-full md:max-w-fit md:items-end gap-3 order-2 md:order-3">
            <div className="flex items-center gap-5">
              {/* Instagram */}
              <Link href="https://www.linkedin.com/in/bestkhalid/" target="blank" className="border border-[#FFFFFF2B] h-10 w-10 rounded-full flex justify-center items-center group hover:bg-white transition-all duration-200">
                <svg className="w-6 h-6 fill-white group-hover:fill-[#37ACFF]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M196.3 512L103.4 512L103.4 212.9L196.3 212.9L196.3 512zM149.8 172.1C120.1 172.1 96 147.5 96 117.8C96 103.5 101.7 89.9 111.8 79.8C121.9 69.7 135.6 64 149.8 64C164 64 177.7 69.7 187.8 79.8C197.9 89.9 203.6 103.6 203.6 117.8C203.6 147.5 179.5 172.1 149.8 172.1zM543.9 512L451.2 512L451.2 366.4C451.2 331.7 450.5 287.2 402.9 287.2C354.6 287.2 347.2 324.9 347.2 363.9L347.2 512L254.4 512L254.4 212.9L343.5 212.9L343.5 253.7L344.8 253.7C357.2 230.2 387.5 205.4 432.7 205.4C526.7 205.4 544 267.3 544 347.7L544 512L543.9 512z" /></svg>
              </Link>
              {/* Facebook */}
              <Link href="https://www.facebook.com/bestkhalid" target="blank" className="border border-[#FFFFFF2B] h-10 w-10 rounded-full flex justify-center items-center group hover:bg-white transition-all duration-200">
                <svg className="w-6 h-6 fill-white group-hover:fill-[#37ACFF]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M240 363.3L240 576L356 576L356 363.3L442.5 363.3L460.5 265.5L356 265.5L356 230.9C356 179.2 376.3 159.4 428.7 159.4C445 159.4 458.1 159.8 465.7 160.6L465.7 71.9C451.4 68 416.4 64 396.2 64C289.3 64 240 114.5 240 223.4L240 265.5L174 265.5L174 363.3L240 363.3z" /></svg>
              </Link>
              {/* Instagram */}
              <Link
                href="https://www.instagram.com/bestkhalidm/"
                target="blank"
                className="border border-[#FFFFFF2B] h-10 w-10 rounded-full flex justify-center items-center group hover:bg-white transition-all duration-200"
              >
                <svg
                  className="w-6 h-6 fill-white group-hover:fill-[#37ACFF]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                >
                  <path d="M320.3 205C256.8 204.8 205.2 256.2 205 319.7C204.8 383.2 256.2 434.8 319.7 435C383.2 435.2 434.8 383.8 435 320.3C435.2 256.8 383.8 205.2 320.3 205zM319.7 245.4C360.9 245.2 394.4 278.5 394.6 319.7C394.8 360.9 361.5 394.4 320.3 394.6C279.1 394.8 245.6 361.5 245.4 320.3C245.2 279.1 278.5 245.6 319.7 245.4zM413.1 200.3C413.1 185.5 425.1 173.5 439.9 173.5C454.7 173.5 466.7 185.5 466.7 200.3C466.7 215.1 454.7 227.1 439.9 227.1C425.1 227.1 413.1 215.1 413.1 200.3zM542.8 227.5C541.1 191.6 532.9 159.8 506.6 133.6C480.4 107.4 448.6 99.2 412.7 97.4C375.7 95.3 264.8 95.3 227.8 97.4C192 99.1 160.2 107.3 133.9 133.5C107.6 159.7 99.5 191.5 97.7 227.4C95.6 264.4 95.6 375.3 97.7 412.3C99.4 448.2 107.6 480 133.9 506.2C160.2 532.4 191.9 540.6 227.8 542.4C264.8 544.5 375.7 544.5 412.7 542.4C448.6 540.7 480.4 532.5 506.6 506.2C532.8 480 541 448.2 542.8 412.3C544.9 375.3 544.9 264.5 542.8 227.5zM495 452C487.2 471.6 472.1 486.7 452.4 494.6C422.9 506.3 352.9 503.6 320.3 503.6C287.7 503.6 217.6 506.2 188.2 494.6C168.6 486.8 153.5 471.7 145.6 452C133.9 422.5 136.6 352.5 136.6 319.9C136.6 287.3 134 217.2 145.6 187.8C153.4 168.2 168.5 153.1 188.2 145.2C217.7 133.5 287.7 136.2 320.3 136.2C352.9 136.2 423 133.6 452.4 145.2C472 153 487.1 168.1 495 187.8C506.7 217.3 504 287.3 504 319.9C504 352.5 506.7 422.6 495 452z" />
                </svg>
              </Link>
              {/* Twitter */}
              <Link href="https://twitter.com/bestkhalid" target="blank" className="border border-[#FFFFFF2B] h-10 w-10 rounded-full flex justify-center items-center group hover:bg-white transition-all duration-200">
                <svg className="w-6 h-6 fill-white group-hover:fill-[#37ACFF]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M453.2 112L523.8 112L369.6 288.2L551 528L409 528L297.7 382.6L170.5 528L99.8 528L264.7 339.5L90.8 112L236.4 112L336.9 244.9L453.2 112zM428.4 485.8L467.5 485.8L215.1 152L173.1 152L428.4 485.8z" /></svg>
              </Link>
            </div>

            {/* Email Subscribe Form */}
            <form
              onSubmit={handleSubmit}
              className="mt-4 border-b border-white flex justify-between lg:w-[300px] xl:w-[385px] w-full max-w-[385px] h-[40px]"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="font-bricolage text-[18px] font-normal leading-[142%] tracking-[-0.01em] text-white placeholder:text-white placeholder:font-bricolage placeholder:text-[18px] placeholder:font-normal placeholder:leading-[142%] placeholder:tracking-[-0.01em] bg-transparent focus:outline-none w-[90%]"
                disabled={status === 'submitting'}
              />
              <button type="submit" disabled={status === 'submitting'}>
                {status === 'submitting' ? (
                  <span className="w-[14px] h-[14px] border-t-2 border-white rounded-full animate-spin"></span>
                ) : (
                  <Image
                    src="/email-arrow.svg"
                    height={14}
                    width={14}
                    alt="submit"
                    className="w-[14px]"
                  />
                )}
              </button>
            </form>

            {/* Feedback Messages */}
            {status === 'success' && (
              <p className="text-green-400 text-sm mt-1">Thank you! Check your inbox.</p>
            )}
            {status === 'error' && (
              <p className="text-red-400 text-sm mt-1">Please enter a valid email.</p>
            )}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-[#171717] flex justify-center items-center h-[65px] text-center overflow-hidden relative">
        <h6
          id="footer-h6"
          className="font-bricolage md:text-[16px] text-[15px] xl:text-[18px] font-normal leading-[142%] tracking-[-0.01em] capitalize text-white px-4"
        >
          2026 © Copyrights BestKhalid. All Rights Reserved.
        </h6>
      </div>
    </footer>
  );
};

export default Footer;