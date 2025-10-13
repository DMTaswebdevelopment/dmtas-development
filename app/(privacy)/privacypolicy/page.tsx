import React from "react";
import { Shield, Lock, Users, Database, RefreshCw } from "lucide-react";

const PrivacyPage = () => {
  const sections = [
    {
      icon: Database,
      title: "Personal Information We Collect",
      content:
        'When you make a purchase or attempt to make a purchase through the Site, we collect certain information from you, including your name, billing address and shipping address, email address and phone number. We refer to this information as "Order Information."',
    },
    {
      icon: Lock,
      title: "How Do We Use Your Personal Information?",
      content:
        "We use the Order Information that we collect generally to fulfill any orders placed through the Site (including processing your payment information), arranging for shipping, and providing you with invoices and/or order confirmations. Additionally, we use this Order Information to communicate with you.",
    },
    {
      icon: Users,
      title: "Sharing Your Personal Information",
      content:
        "We may share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.",
    },
    {
      icon: Database,
      title: "Data Retention",
      content:
        "When you place an order through the Site, we will maintain your Order Information for our records unless and until you ask us to delete this information.",
    },
    {
      icon: RefreshCw,
      title: "Changes",
      content:
        "We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal or regulatory reasons.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        ></div>

        <div className="relative max-w-5xl mx-auto px-6 sm:px-10 py-20 sm:py-28">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
              <Shield className="w-12 h-12" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-center mb-4">
            Privacy Policy
          </h1>
          <p className="text-blue-100 text-center text-lg max-w-2xl mx-auto">
            Your privacy matters to us. Learn how we collect, use, and protect
            your personal information.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-7 sm:px-10 py-16">
        {/* Introduction Card */}
        <p className="text-gray-700 leading-relaxed text-lg text-center">
          This Privacy Policy describes how your personal information is
          collected, used, and shared when you visit or make a purchase from{" "}
          <span className="font-semibold text-blue-600">www.dmtas.com.au</span>{" "}
          (the &ldquo;Site&rdquo;).
        </p>

        {/* Policy Sections */}
        <div className="px-7 sm:px-10 2xl:p-28 ">
          <div className=" flex justify-center items-center place-items-center  w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full justify-items-center">
              {sections.map((section, index) => {
                const Icon = section.icon;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl hover:border-blue-200 transition-all duration-300 group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                          {section.title}
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                          {section.content}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
