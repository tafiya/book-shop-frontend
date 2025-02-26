import { useState } from "react";

const testimonials = [
  {
    name: "John Doe",
    message:
      "This bookstore has the best collection of books! Highly recommended.",
    img: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    name: "Jane Smith",
    message:
      "Amazing service and great variety. I found exactly what I needed!",
    img: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    name: "Michael Johnson",
    message:
      "A paradise for book lovers. The quality and service are top-notch.",
    img: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    name: "Emily Brown",
    message:
      "I love the collection here! Such a cozy and welcoming atmosphere.",
    img: "https://randomuser.me/api/portraits/women/4.jpg",
  },
];
const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };
  return (
    <div>
      <h1 className="text-3xl sm:text-3xl md:text-4xl xl:text-5xl text-center font-semibold py-10 ">
        {" "}
        Customers <span className=" text-[#00a76b]">Review</span>
      </h1>
      <div className="relative mb-24 w-full max-w-4xl mx-auto overflow-hidden rounded-lg bg-white shadow-lg p-6">
        <div
          className="flex transition-transform duration-700"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="min-w-full p-6 flex flex-col items-center text-center bg-gradient-to-r from-[#ecefec] via-[#f5f3ef] to-[#f6f4f0]"
            >
              <img
                src={testimonial.img}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full mb-4 border border-gray-300"
              />
              <p className="text-gray-800 text-lg font-semibold">
                "{testimonial.message}"
              </p>
              <span className="text-gray-600 mt-2">- {testimonial.name}</span>
            </div>
          ))}
        </div>
        <button
          onClick={prevSlide}
          className="absolute inset-y-0 left-0 flex items-center justify-center w-12 h-full text-[#00a76b] text-4xl  focus:outline-none"
        >
          &#10094;
        </button>
        <button
          onClick={nextSlide}
          className="absolute inset-y-0 right-0 flex items-center justify-center w-12 h-full text-[#00a76b] text-4xl focus:outline-none"
        >
          &#10095;
        </button>
        <div className="absolute bottom-3 left-0 right-0 flex justify-center space-x-2">
          {testimonials.map((_, index) => (
            <span
              key={index}
              className={`size-3 border border-gray-400 rounded-full cursor-pointer ${
                currentIndex === index ? "bg-[#00a76b] border-[#00a76b]" : ""
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
