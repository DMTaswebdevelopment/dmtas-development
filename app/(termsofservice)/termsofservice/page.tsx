"use client";

import { useState } from "react";
import {
  Shield,
  FileText,
  AlertCircle,
  Lock,
  Scale,
  ChevronDown,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Info,
  Zap,
  Globe,
  CreditCard,
  Ban,
  ShieldCheck,
} from "lucide-react";

const TermsOfServicePage = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [readSections, setReadSections] = useState(new Set());

  interface Section {
    id: string;
    title: string;
    icon: React.ReactNode;
    color: string;
    lightBg: string;
    accentColor: string;
    borderAccent: string;
    summary: string;
    highlights: string[];
    content: string[];
  }

  const sections: Section[] = [
    {
      id: "accuracy",
      title: "Accuracy & Information",
      icon: <AlertCircle className="w-5 h-5" />,
      color: "from-amber-400 to-orange-500",
      lightBg: "from-amber-50 to-orange-50",
      accentColor: "text-amber-600",
      borderAccent: "border-l-amber-500",
      summary:
        "Information accuracy, completeness, and your responsibility to stay updated",
      highlights: [
        "No warranty on accuracy",
        "Your responsibility to verify",
        "Subject to changes",
      ],
      content: [
        "We are not responsible if information made available on this site is not accurate, complete or current. The material on this site is provided for general information only and should not be relied upon or used as the sole basis for making decisions without consulting primary, more accurate, more complete or more timely sources of information. Any reliance on the material on this site is at your own risk.",
        "This site may contain certain historical information. Historical information, necessarily, is not current and is provided for your reference only. We reserve the right to modify the contents of this site at any time, but we have no obligation to update any information on our site. You agree that it is your responsibility to monitor changes to our site.",
      ],
    },
    {
      id: "modifications",
      title: "Service Modifications",
      icon: <Zap className="w-5 h-5" />,
      color: "from-blue-400 to-cyan-500",
      lightBg: "from-blue-50 to-cyan-50",
      accentColor: "text-blue-600",
      borderAccent: "border-l-blue-500",
      summary: "Changes to pricing, services, and platform features",
      highlights: [
        "Prices may change",
        "Service modifications",
        "No liability for changes",
      ],
      content: [
        "Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time.",
        "We shall not be liable to you or to any third-party for any modification, price change, suspension or discontinuance of the Service.",
      ],
    },
    {
      id: "products",
      title: "Products & Services",
      icon: <Sparkles className="w-5 h-5" />,
      color: "from-emerald-400 to-green-500",
      lightBg: "from-emerald-50 to-green-50",
      accentColor: "text-emerald-600",
      borderAccent: "border-l-emerald-500",
      summary: "Product availability, quality, and purchase terms",
      highlights: [
        "Limited quantities",
        "Color accuracy disclaimer",
        "Geographic restrictions",
      ],
      content: [
        "Certain products or services may be available exclusively online through the website. These products or services may have limited quantities and are subject to return or exchange only according to our Return Policy.",
        "We have made every effort to display as accurately as possible the colors and images of our products that appear at the store. We cannot guarantee that your computer monitor's display of any color will be accurate.",
        "We reserve the right, but are not obligated, to limit the sales of our products or Services to any person, geographic region or jurisdiction. We may exercise this right on a case-by-case basis. We reserve the right to limit the quantities of any products or services that we offer. All descriptions of products or product pricing are subject to change at anytime without notice, at the sole discretion of us. We reserve the right to discontinue any product at any time. Any offer for any product or service made on this site is void where prohibited.",
        "We do not warrant that the quality of any products, services, information, or other material purchased or obtained by you will meet your expectations, or that any errors in the Service will be corrected.",
      ],
    },
    {
      id: "billing",
      title: "Billing & Accounts",
      icon: <CreditCard className="w-5 h-5" />,
      color: "from-purple-400 to-pink-500",
      lightBg: "from-purple-50 to-pink-50",
      accentColor: "text-purple-600",
      borderAccent: "border-l-purple-500",
      summary: "Payment processing and account management",
      highlights: [
        "Order restrictions",
        "Accurate information required",
        "Right to refuse orders",
      ],
      content: [
        "We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household or per order. These restrictions may include orders placed by or under the same customer account, the same credit card, and/or orders that use the same billing and/or shipping address. In the event that we make a change to or cancel an order, we may attempt to notify you by contacting the e-mail and/or billing address/phone number provided at the time the order was made. We reserve the right to limit or prohibit orders that, in our sole judgment, appear to be placed by dealers, resellers or distributors.",
        "You agree to provide current, complete and accurate purchase and account information for all purchases made at our store. You agree to promptly update your account and other information, including your email address and credit card numbers and expiration dates, so that we can complete your transactions and contact you as needed.",
      ],
    },
    {
      id: "third-party",
      title: "Third-Party Services",
      icon: <Globe className="w-5 h-5" />,
      color: "from-indigo-400 to-blue-500",
      lightBg: "from-indigo-50 to-blue-50",
      accentColor: "text-indigo-600",
      borderAccent: "border-l-indigo-500",
      summary: "External tools, links, and third-party content",
      highlights: [
        "No control over third-party tools",
        "External link disclaimer",
        "Use at your own risk",
      ],
      content: [
        "We may provide you with access to third-party tools over which we neither monitor nor have any control nor input.",
        'You acknowledge and agree that we provide access to such tools "as is" and "as available" without any warranties, representations or conditions of any kind and without any endorsement. We shall have no liability whatsoever arising from or relating to your use of optional third-party tools.',
        "Third-party links on this site may direct you to third-party websites that are not affiliated with us. We are not responsible for examining or evaluating the content or accuracy and we do not warrant and will not have any liability or responsibility for any third-party materials or websites.",
      ],
    },
    {
      id: "privacy",
      title: "Privacy & Data Protection",
      icon: <Lock className="w-5 h-5" />,
      color: "from-teal-400 to-cyan-500",
      lightBg: "from-teal-50 to-cyan-50",
      accentColor: "text-teal-600",
      borderAccent: "border-l-teal-500",
      summary: "How we handle your personal information",
      highlights: [
        "Governed by Privacy Policy",
        "Data protection measures",
        "Industry-standard security",
      ],
      content: [
        "Your submission of personal information through the store is governed by our Privacy Policy.",
        "We take data protection seriously and implement industry-standard security measures to protect your information.",
      ],
    },
    {
      id: "prohibited",
      title: "Prohibited Uses",
      icon: <Ban className="w-5 h-5" />,
      color: "from-red-400 to-rose-500",
      lightBg: "from-red-50 to-rose-50",
      accentColor: "text-red-600",
      borderAccent: "border-l-red-500",
      summary: "Activities not allowed on our platform",
      highlights: [
        "No unlawful activities",
        "No malicious code",
        "Right to terminate access",
      ],
      content: [
        "You are prohibited from using the site or its content for any unlawful purpose or to solicit others to perform or participate in any unlawful acts.",
        "Additional prohibitions include: violating any regulations, rules, laws, or ordinances; infringing upon intellectual property rights; harassment or discrimination; submitting false information; uploading malicious code; collecting personal information of others; spamming or phishing; or interfering with security features.",
        "We reserve the right to terminate your use of the Service for violating any of the prohibited uses.",
      ],
    },
    {
      id: "liability",
      title: "Liability & Warranties",
      icon: <ShieldCheck className="w-5 h-5" />,
      color: "from-slate-400 to-gray-500",
      lightBg: "from-slate-50 to-gray-50",
      accentColor: "text-slate-600",
      borderAccent: "border-l-slate-500",
      summary: "Limitations of liability and warranty disclaimers",
      highlights: [
        "Service provided 'as is'",
        "Limited liability",
        "Indemnification required",
      ],
      content: [
        'The service and all products and services are provided "as is" and "as available" for your use, without any representation, warranties or conditions of any kind.',
        "We shall not be liable for any injury, loss, claim, or any direct, indirect, incidental, punitive, special, or consequential damages of any kind.",
        "You agree to indemnify, defend and hold harmless Life Size Jigsaws and our affiliates from any claim or demand made by any third-party due to or arising out of your breach of these Terms.",
      ],
    },
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
    if (!readSections.has(sectionId)) {
      setReadSections(new Set([...readSections, sectionId]));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Animated Background Pattern */}
      <div className="fixed inset-0 opacity-[0.015] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Header Section */}
      <div className="relative bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400 opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-6xl">
          <div className="absolute inset-0 opacity-10">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  width: `${Math.random() * 300 + 100}px`,
                  height: `${Math.random() * 300 + 100}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  transform: "translate(-50%, -50%)",
                  filter: "blur(40px)",
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-24 sm:py-32">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-white/10 backdrop-blur-lg rounded-3xl mb-8 border border-white/20 shadow-2xl">
              <FileText className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 tracking-tight font-montserrat_bold">
              Terms of Service
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-8 font-sans">
              Everything you need to know about using our services
            </p>
          </div>
        </div>
      </div>

      {/* Reading Progress Bar */}
      {/* <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">
                Reading Progress
              </span>
            </div>
            <span className="text-sm font-bold text-blue-600">
              {Math.round(progressPercentage)}% Complete
            </span>
          </div>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div> */}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Intro Card */}
        <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 rounded-3xl p-8 mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 opacity-20 rounded-full blur-3xl"></div>
          <div className="relative flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <Info className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 font-montserrat_bold">
                Before You Begin
              </h3>
              <p className="text-gray-600 leading-relaxed font-sans">
                By using our services, you agree to these terms. Please review
                them carefully. These terms constitute a legally binding
                agreement between you and Life Size Jigsaws. Click on each
                section below to read the full details.
              </p>
            </div>
          </div>
        </div>

        {/* Terms Grid */}
        <div className="grid gap-4 md:gap-5">
          {sections.map((section, index) => (
            <div
              key={index}
              className={`group bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 ${
                expandedSection === section.id
                  ? "border-blue-200 shadow-2xl"
                  : "border-gray-100 hover:border-gray-200"
              }`}
            >
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full text-left"
              >
                <div className="p-6 lg:p-8">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      {/* Icon */}
                      <div
                        className={`flex-shrink-0 w-14 h-14 bg-gradient-to-br ${section.color} rounded-2xl flex items-center justify-center text-white shadow-lg transform transition-all duration-300 ${
                          expandedSection === section.id
                            ? "rotate-12 scale-110"
                            : "group-hover:rotate-6 group-hover:scale-105"
                        }`}
                      >
                        {section.icon}
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold font-montserrat_bold text-gray-900 mb-2 flex items-center gap-2">
                              {section.title}
                              {readSections.has(section.id) && (
                                <CheckCircle className="w-5 h-5 text-green-500" />
                              )}
                            </h3>
                            <p className="text-gray-600 mb-3 font-sans">
                              {section.summary}
                            </p>

                            {/* Highlights */}
                            <div className="flex flex-wrap gap-2">
                              {section.highlights.map((highlight, hIndex) => (
                                <span
                                  key={hIndex}
                                  className={`text-xs font-sans px-3 py-1 rounded-full bg-gradient-to-r ${section.lightBg} ${section.accentColor} font-medium border border-current border-opacity-20`}
                                >
                                  {highlight}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Chevron */}
                          <ChevronDown
                            className={`ml-4 w-6 h-6 text-gray-400 transition-transform duration-300 flex-shrink-0 ${
                              expandedSection === section.id
                                ? "rotate-180 text-blue-500"
                                : ""
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </button>

              {/* Expanded Content */}
              {expandedSection === section.id && (
                <div
                  className={`px-6 lg:px-8 pb-6 lg:pb-8 bg-gradient-to-br ${section.lightBg} border-t-2 border-gray-100`}
                >
                  <div className="pt-6 space-y-4">
                    {section.content.map((paragraph, pIndex) => (
                      <div
                        key={pIndex}
                        className={`pl-6 ${section.borderAccent} border-l-4 py-2`}
                      >
                        <p className="text-gray-700 leading-relaxed pl-4">
                          {paragraph}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex items-center gap-2 text-sm text-gray-500">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Section read and understood</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-xl opacity-20"></div>
          <div className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-10 lg:p-14 text-white overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl transform translate-x-48 -translate-y-48"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-400 opacity-5 rounded-full blur-3xl transform -translate-x-40 translate-y-40"></div>

            <div className="relative flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1 text-center lg:text-left">
                <h2 className="text-4xl font-bold mb-4">Need Clarification?</h2>
                <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                  Our legal team is ready to help you understand these terms
                  better
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <button className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-all shadow-2xl hover:shadow-3xl transform hover:-translate-y-0.5">
                    <Shield className="w-5 h-5" />
                    Contact Legal Team
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <button className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur text-white px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-all border border-white/20">
                    <FileText className="w-5 h-5" />
                    Download PDF
                  </button>
                </div>
              </div>
              <div className="flex-shrink-0">
                <div className="w-40 h-40 bg-white/10 backdrop-blur rounded-3xl flex items-center justify-center border border-white/20 shadow-2xl">
                  <Scale className="w-20 h-20 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Agreement Notice */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            By continuing to use our services, you acknowledge that you have
            read, understood, and agree to be bound by these Terms of Service.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
