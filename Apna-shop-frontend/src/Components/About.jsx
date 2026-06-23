import React from "react";

export default function About(props) {
  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-10">
        
        {/* Heading */}
        <div className="text-center my-12">
          <h1 className="text-4xl font-bold text-red-600 pt-10">
            About Us
          </h1>
        </div>

        {/* Main Section */}
        <div className="flex flex-col md:flex-row items-center gap-10">
          
          {/* Left Column – Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src="images/about-us.jpg"
              alt="About Apna Shop"
              className="h-[350px] object-contain"
            />
          </div>

          {/* Right Column – Text */}
          <div className="w-full md:w-1/2 space-y-4 text-gray-700 text-lg leading-relaxed">
            <p>
              Welcome to <strong>Apna Shop</strong>, your one-stop destination for all your shopping needs.
              We are committed to offering quality products at affordable prices, making fashion and lifestyle
              accessible to everyone. Our collection includes stylish clothing for men, women, and kids, along
              with accessories to complete your look.
            </p>
            <p>
              With a vision to blend convenience and style, we provide a seamless shopping experience through
              a user-friendly platform, secure transactions, and reliable customer service. Whether you're
              searching for trendy outfits or timeless classics, Apna Shop has you covered.
            </p>
            <p>
              Thank you for choosing Apna Shop — where style meets convenience. We look forward to redefining
              your shopping experience and making every purchase delightful!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}