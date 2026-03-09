const Ready = () => {
  return (
    <section className="md:py-[13vh] py-[10vh] relative">
      <img
        src="/new-home/ready-vector1.webp"
        alt="vector"
        className="absolute right-0 top-0 2xl:w-auto xl:w-[400px] w-[300px]"
      />
      <img
        src="/new-home/ready-vector2.webp"
        alt="vector"
        className="absolute left-0 bottom-[10%] 2xl:w-auto xl:w-[400px] w-[300px]"
      />
      <div className="max-w-[1450px] mx-auto xl:px-10 px-4 relative">
        <div className="2xl:max-w-[957px] lg:max-w-[800px] max-w-[700px] mx-auto flex flex-col justify-center items-center relative">
          <h2 className="font-bricolage font-bold 2xl:text-[48px] xl:text-[42px] lg:text-[38px] text-[34px] leading-[123%] tracking-[-0.01em] text-center text-white capitalize">
            Ready to Position Your Law Firm{" "}
            <span className="font-tartuffo font-light tracking-0">
              as the Authority in Your Market?
            </span>
          </h2>
          <div className="lg:max-w-[690px] max-w-[600px] text-center">
            <p className="font-bricolage font-light xl:text-[18px] text-[16px] leading-[142%] tracking-[-0.01em] text-white capitalize mt-[2.3vh]">
              If you’re serious about increasing consultation inquiries and
              strengthening your online presence, let’s discuss your goals.
            </p>
            <div className="flex flex-col justify-center items-center mt-[2vh] gap-[2vh]">
              <button className="font-bricolage font-bold xl:text-[18px] md:text-[16px] text-[14px] leading-[100%] tracking-[-0.07em] capitalize underline bg-white xl:w-[378px] md:w-[320px] md:h-[44px] w-fit p-3 rounded-full flex justify-center items-center gap-2 text-[#0033FF] hover:opacity-80 transition-all duration-300">
                <svg
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="12"
                  viewBox="0 0 17 12"
                  fill="none"
                >
                  <path
                    d="M0.75 5.52297L-3.49691e-07 5.52297L-4.15258e-07 6.27297L0.75 6.27297L0.75 5.52297ZM16.2803 6.0533C16.5732 5.76041 16.5732 5.28554 16.2803 4.99264L11.5074 0.219671C11.2145 -0.073222 10.7396 -0.073222 10.4467 0.219671C10.1538 0.512564 10.1538 0.987438 10.4467 1.28033L14.6893 5.52297L10.4467 9.76561C10.1538 10.0585 10.1538 10.5334 10.4467 10.8263C10.7396 11.1192 11.2145 11.1192 11.5074 10.8263L16.2803 6.0533ZM0.75 5.52297L0.75 6.27297L15.75 6.27297L15.75 5.52297L15.75 4.77297L0.75 4.77297L0.75 5.52297ZM0.75 5.52297L1.5 5.52297L1.5 1.52297L0.75 1.52297L0 1.52297L-3.49691e-07 5.52297L0.75 5.52297Z"
                    fill="#0033FF"
                  ></path>
                </svg>
                Book Your Free Strategy Consultation
              </button>
              <p className="font-bricolage font-light text-[12px] leading-[142%] tracking-[-0.01em] capitalize text-white">
                I only accept a limited number of law firm projects each month
                to maintain quality and focus
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ready;
