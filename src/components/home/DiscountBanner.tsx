import React from "react";

const DiscountBanner: React.FC = () => {
  return (
    <section
      className="relative w-full mb-24 h-[400px] md:h-[500px] flex items-center justify-center text-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/demnpqwx3/image/upload/v1743081968/discount_ltdivt.jpg')",
      }}
    >
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl"></div>

      {/* Content */}
      <div className="relative z-10 text-white px-6 max-w-2xl">
        <h2 className="text-3xl md:text-5xl font-bold">
          Get 25% Discount on All Super Selling Books!
        </h2>
        <p className="mt-4 text-lg md:text-xl">
          Limited time offer! Grab your favorite books now.
        </p>
        {/* <a
          href="/shop"
          className="mt-6 inline-block bg-blue-600 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-blue-700 transition"
        >
          Shop Now →
        </a> */}
      </div>
    </section>
  );
};

export default DiscountBanner;
