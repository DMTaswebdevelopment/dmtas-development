"use client";

import React, { useState, useEffect, ReactElement } from "react";
import {
  Heart,
  Users,
  Lightbulb,
  TrendingUp,
  MapPin,
  Handshake,
} from "lucide-react";

interface CultureValue {
  icon: ReactElement;
  title: string;
  description: string;
  color: string;
}

interface VisibilityState {
  [key: string]: boolean;
}

const OurCultureComponent: React.FC = () => {
  const [isVisible, setIsVisible] = useState<VisibilityState>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev: VisibilityState) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll("[data-animate]");
    elements.forEach((el: Element) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const cultureValues: CultureValue[] = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Attitude Over Achievement",
      description:
        "We care more about the attitude behind the win than the win itself.",
      color: "from-red-500 to-pink-600",
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Tasmanian Roots",
      description:
        "Understanding local challenges and sharing the drive to see our community thrive.",
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Innovation & Curiosity",
      description:
        "Blending experience with fresh perspectives, always asking 'why', 'what if', and 'how else'.",
      color: "from-yellow-500 to-orange-600",
    },
    {
      icon: <Handshake className="w-8 h-8" />,
      title: "Trust & Respect",
      description:
        "Supporting each other, celebrating diversity, and taking collective pride in our outcomes.",
      color: "from-blue-500 to-indigo-600",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Continuous Growth",
      description:
        "Growth for businesses, people, and Tasmania as we strengthen the local economy.",
      color: "from-purple-500 to-violet-600",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Our Team Philosophy",
      description: `What makes us different is the way we bring people and innovation together. Our team is a blend of deep industry experience and fresh perspectives. We value curiosity as much as expertise, encouraging our people to keep asking "why", "what if" and "how else.". That mindset allows us to adapt quickly, explore new
                technologies, and create smarter ways for ourselves and our
                clients to work.`,
      color: "from-purple-500 to-violet-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="relative overflow-hidde">
        <div className="relative max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-center flex flex-col items-center relative mb-10">
              <h2 className="text-4xl md:text-5xl text-gray-800 mb-4 font-monserrat_bold font-bold">
                Our Culture
              </h2>

              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </div>

            <p className="text-xl md:text-2xl text-gray-600 max-w-7xl mx-auto leading-relaxed font-sans">
              Culture isn't something written on a wall - it's the way we work,
              treat people, and hold ourselves accountable every single day. Our
              roots are Tasmanian, and that matters. It means we understand the
              challenges local businesses face, and we share the same drive to
              see our community thrive. We're proud to stand beside Tasmanian
              organisations, not only as a supplier, but as a long-term partner
              invested in their success.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-7  sm:px-10 2xl:px-28">
        {/* Culture Values Grid */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center text-slate-900 mb-12 font-monserrat_bold">
            What Sets Us Apart
          </h3>
          <div className="flex justify-center flex-wrap w-full">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 ">
              {cultureValues.map((value: CultureValue, index: number) => (
                <div
                  key={index}
                  id={`value-${index}`}
                  data-animate
                  className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden ${
                    isVisible[`value-${index}`]
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${value.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  ></div>
                  <div className="relative p-8">
                    <div
                      className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${value.color} text-white mb-6 shadow-lg`}
                    >
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">
                      {value.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Philosophy Section */}
        <div
          id="philosophy"
          data-animate
          className={`mb-20 transition-all duration-1000 ${
            isVisible.philosophy
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        ></div>

        {/* Partnership Approach */}
        <div
          id="partnership"
          data-animate
          className={`mb-20 transition-all duration-1000 ${
            isVisible.partnership
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-slate-900 mb-6 font-monserrat_bold">
                Trust & Respect Are Non-Negotiable
              </h3>
              <div className="space-y-4">
                <p className="text-lg text-slate-700 leading-relaxed font-sans">
                  We support each other, celebrate diverse skills and ideas, and
                  take collective pride in the outcomes we deliver.
                </p>
                <p className="text-lg text-slate-700 leading-relaxed font-sans">
                  When our clients face challenges, we rally together as quickly
                  as possible – because every second counts. And when our
                  clients succeed, we see it as a shared achievement, because
                  their wins are our wins too.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-green-400 to-blue-500 rounded-3xl p-8 shadow-2xl">
                <div className="bg-white/20 backdrop-blur rounded-2xl p-6 text-white">
                  <Handshake className="w-16 h-16 mb-4" />
                  <h4 className="text-2xl font-bold mb-2 font-monserrat_bold">
                    Shared Success
                  </h4>
                  <p className="text-green-100 font-sans">
                    Your wins are our wins
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Growth Mission */}
        <div
          id="growth"
          data-animate
          className={`transition-all duration-1000 ${
            isVisible.growth
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          } pb-20`}
        >
          <div className="bg-slate-900 rounded-3xl shadow-2xl p-8 md:p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
            <div className="relative text-center">
              <TrendingUp className="w-16 h-16 mx-auto mb-6 text-blue-400" />
              <h2 className="text-3xl md:text-4xl font-bold mb-8 font-monserrat_bold">
                Our Culture is About Growth
              </h2>

              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-3 text-blue-300 font-monserrat_bold">
                    Business Growth
                  </h3>
                  <p className="text-slate-300 font-sans">
                    Growth for businesses that rely on us
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-3 text-green-300 font-monserrat_bold">
                    Career Growth
                  </h3>
                  <p className="text-slate-300 font-sans">
                    Growth for people who choose to build their careers with us
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-3 text-purple-300 font-monserrat_bold">
                    Community Growth
                  </h3>
                  <p className="text-slate-300 font-sans">
                    Growth for Tasmania as we strengthen the local economy
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-4 font-monserrat_bold">
                  This is What Drives Us Forward
                </h3>
                <p className="text-lg text-blue-100 mb-4 font-sans">
                  Not just being the largest provider, but the most trusted
                  partner.
                </p>
                <p className="text-lg text-blue-100 font-sans">
                  Not just keeping up with change but leading it. That's the
                  culture that sets DMTas apart.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurCultureComponent;
