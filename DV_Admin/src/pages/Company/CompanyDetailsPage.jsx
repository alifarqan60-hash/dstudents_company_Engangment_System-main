import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IMAGES } from "../../assets";
import {
  MdEmail,
  MdPhone,
  MdPeople,
  MdLanguage,
  MdDescription,
  MdCalendarToday,
  MdArrowBack,
  MdBusiness,
} from "react-icons/md";

export default function CompanyDetailsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const company = location?.state?.company;

  if (!company) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <MdBusiness size={64} className="text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">Company not found</p>
          <button
            onClick={() => navigate("/admin/companies")}
            className="mt-4 px-4 py-2 bg-customMaroon text-white rounded-lg text-sm"
          >
            Back to Companies
          </button>
        </div>
      </div>
    );
  }

  const details = [
    {
      icon: <MdEmail className="text-blue-500" size={20} />,
      label: "Email Address",
      value: company.email || "N/A",
    },
    {
      icon: <MdPhone className="text-green-500" size={20} />,
      label: "Phone Number",
      value: company.phoneNo || "N/A",
    },
    {
      icon: <MdPeople className="text-purple-500" size={20} />,
      label: "Number of Employees",
      value: company.noOfEmployees?.toString() || "0",
    },
    {
      icon: <MdCalendarToday className="text-orange-500" size={20} />,
      label: "Member Since",
      value: company.createdAt
        ? new Date(company.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
        : "N/A",
    },
  ];

  return (
    <div className="flex flex-row rounded-tl-3xl bg-gray-50 rounded-bl-3xl h-full">
      <div className="flex-[5] w-full overflow-y-auto">
        {/* Back Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-8 py-4 flex items-center gap-3 shadow-sm">
          <button
            onClick={() => navigate("/admin/companies")}
            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <MdArrowBack size={20} className="text-gray-600" />
          </button>
          <div>
            <p className="text-xs text-gray-400 font-medium">Companies</p>
            <h1 className="text-base font-bold text-gray-800 leading-tight">
              {company.name}
            </h1>
          </div>
        </div>

        <div className="px-8 py-8">
          {/* Hero Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
            {/* Banner */}
            <div className="h-32 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-800 relative">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_50%,white,transparent)]" />
            </div>

            {/* Profile */}
            <div className="px-8 pb-6">
              <div className="flex items-end gap-5 -mt-12 mb-4">
                <div className="w-24 h-24 rounded-2xl border-4 border-white shadow-xl overflow-hidden bg-white flex-shrink-0">
                  <img
                    src={company.profileUrl || IMAGES.teacher_avatar}
                    alt={company.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mb-2">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {company.name}
                  </h2>
                  {company.websiteUrl && (
                    <a
                      href={
                        company.websiteUrl.startsWith("http")
                          ? company.websiteUrl
                          : `https://${company.websiteUrl}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-blue-500 text-sm hover:underline mt-0.5"
                    >
                      <MdLanguage size={16} />
                      {company.websiteUrl}
                    </a>
                  )}
                </div>
              </div>

              {company.description && (
                <p className="text-gray-500 text-sm leading-relaxed border-t border-gray-100 pt-4">
                  {company.description}
                </p>
              )}
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {details.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium mb-0.5">
                    {item.label}
                  </p>
                  <p className="text-sm font-semibold text-gray-800">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Website Full Card */}
          {company.websiteUrl && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-3">
                <MdLanguage className="text-blue-500" size={20} />
                <h3 className="font-semibold text-gray-700 text-sm">
                  Company Website
                </h3>
              </div>
              <a
                href={
                  company.websiteUrl.startsWith("http")
                    ? company.websiteUrl
                    : `https://${company.websiteUrl}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
              >
                Visit Website →
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
