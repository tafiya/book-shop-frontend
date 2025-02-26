import { Card } from "@/components/ui/card";

const Contact = () => {
  return (
    <div
      className="bg-cover bg-blend-overlay bg-white/40 bg-no-repeat md:h-[788px]"
      // style={{
      //   backgroundImage: `url(https://res.cloudinary.com/demnpqwx3/image/upload/v1740605637/contactpage_1_i51khw.jpg)`,
      // }}
    >
      <div className="max-w-7xl  mx-auto lg:px-[300px] py-[120px]  text-black">
        <Card className=" flex items-center justify-center py-10 px-10 bg-gradient-to-r from-[#ecefec] via-[#f5f3ef] to-[#f6f4f0] ... ">
          <div>
            <div className=" lg:pl-0 pl-8 ">
              <h1 className=" lg:text-[50px] text-[40px] bebas-neue-regular ">
                Contact Us
              </h1>
              <p className="text-black text-base leading-relaxed roboto-regular mb-9 md:w-[545px]">
                Enim tempor eget pharetra facilisis sed maecenas adipiscing. Eu
                leo molestie vel, ornare non id blandit netus.
              </p>
            </div>
            <div className="  ">
              <form
                action=""
                className="flex items-center lg:items-start  gap-[30px] mb-8  flex-col"
              >
                <div className="flex gap-[30px] lg:flex-row flex-col">
                  <div>
                    <input
                      type="text"
                      className="lg:w-[302px] w-[330px] px-3 h-[46px] bg-transparent border border-[#00a76b]"
                      id="lname"
                      name="lname"
                      placeholder="Your Name*"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      className="lg:w-[302px] w-[330px] px-3 h-[46px] bg-transparent border text-black border-[#00a76b]"
                      id="lname"
                      name="lname"
                      placeholder="Your Email"
                    />
                  </div>
                </div>

                <div className="flex gap-[30px] lg:flex-row flex-col">
                  <input
                    type="textarea"
                    className="md:w-[635px] w-[330px] px-3 h-[140px] bg-transparent border text-black border-[#00a76b]"
                    id="lname"
                    name="lname"
                    placeholder="Message"
                  />
                </div>
              </form>
              <div className="lg:pl-0 pl-12">
                <button className="lg:w-[180px] w-[149px] lg:h-[56px] h-[48px] px-4 py-4 gap-2 bg-[#00a76b] text-white roboto-bold text-base lg:text-lg">
                  Contact
                </button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Contact;
