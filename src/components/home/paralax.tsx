const Parallax = () => {
  return (
    <section
      className="relative h-[400px] bg-fixed bg-center bg-cover flex items-center justify-center mb-12"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/demnpqwx3/image/upload/v1740605637/contactpage_1_i51khw.jpg')",
      }}
    >
      <div className="bg-black bg-opacity-50 w-full h-full flex items-center justify-center">
        <h1 className="text-white text-2xl md:text-4xl font-bold text-center px-4">
          "A reader lives a thousand lives before he dies...
          <br />
          The man who never reads lives only one."
        </h1>
      </div>
    </section>
  );
};

export default Parallax;
