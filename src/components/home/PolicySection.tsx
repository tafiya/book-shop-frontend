import { ShieldCheck, Headphones, Truck, Percent } from "lucide-react";

const features = [
  {
    icon: <Truck className="w-6 h-6 text-white" />,
    title: "Return & Refund",
    description: "Money back guarantee",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-white" />,
    title: "Secure Payment",
    description: "30% off by subscribing",
  },
  {
    icon: <Headphones className="w-6 h-6 text-white" />,
    title: "Quality Support",
    description: "Always online 24/7",
  },
  {
    icon: <Percent className="w-6 h-6 text-white" />,
    title: "Daily Offers",
    description: "20% off by subscribing",
  },
];

const PolicySection = () => {
  return (
    <div className="bg-[#00a76b]  py-6 px-4 md:px-10 mb-12">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center items-center gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex items-center justify-center  gap-4 bg-white shadow-lg p-4 rounded-lg w-full md:w-auto"
          >
            <div className="bg-[#00a76b] p-3 rounded-lg">{feature.icon}</div>
            <div>
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PolicySection;
