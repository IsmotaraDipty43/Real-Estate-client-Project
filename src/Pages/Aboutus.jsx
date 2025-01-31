import React from "react";

const teamMembers = [
  {
    name: "Abdul Karim",
    role: "CEO & Founder",
    img: "data:image/jpeg;base64,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",
    description: "With over 15 years of experience in real estate, Abdul leads the team with vision and expertise.",
    social: {
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    name: "Rakib Hossain",
    role: "CTO",
    img: "https://i.insider.com/5d2f876fb44ce746713e62ee?width=600&format=jpeg&auto=webp",
    description: "Rakib ensures our technology and platform are cutting-edge for seamless property transactions.",
    social: {
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    name: "Nusrat Jahan",
    role: "Marketing Head",
    img: "https://theglasshammer.com/wp-content/uploads/2016/09/Promoting-CEO-Ready-Women.jpeg",
    description: "Nusrat drives marketing strategies to connect buyers and sellers effortlessly.",
    social: {
      linkedin: "#",
      twitter: "#",
    },
  },
];

const Aboutus = () => {
  return (
    <div className="container min-h-screen mx-auto p-8">
      {/* Header Section */}
      <div className="text-center mb-12 mt-20">
        <h2 className="text-4xl font-bold text-gray-800">Meet Our Team</h2>
        <p className="text-gray-600 mt-4">
          Our dedicated team is committed to providing the best real estate services.
        </p>
      </div>

      {/* Team Members Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="text-center shadow-lg p-6 rounded-xl bg-white transition-transform transform hover:scale-105 hover:shadow-xl"
          >
            <img
              src={member.img}
              alt={member.role}
              className="w-32 h-32 mx-auto rounded-full border-4 border-gray-200 mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
            <p className="text-gray-500 mb-2">{member.role}</p>
            <p className="text-sm text-gray-600 mb-4">{member.description}</p>

            {/* Social Media Links */}
            <div className="flex justify-center gap-4">
              <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin text-blue-600 text-xl"></i>
              </a>
              <a href={member.social.twitter} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter text-blue-400 text-xl"></i>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Why Choose Us Section */}
      <div className="mt-16 text-center">
        <h3 className="text-3xl font-bold text-gray-800">Why Choose Us?</h3>
        <p className="text-gray-600 max-w-2xl mx-auto mt-4">
          We go beyond transactions; we build relationships and provide real estate solutions with trust, expertise, and transparency.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div className="bg-white shadow-lg p-6 rounded-lg">
            <h4 className="text-xl font-semibold text-gray-800">✅ Trusted by Thousands</h4>
            <p className="text-gray-600 mt-2">Our reputation is built on trust, transparency, and client satisfaction.</p>
          </div>
          <div className="bg-white shadow-lg p-6 rounded-lg">
            <h4 className="text-xl font-semibold text-gray-800">📍 Extensive Property Listings</h4>
            <p className="text-gray-600 mt-2">Find a wide range of properties suited to your needs and budget.</p>
          </div>
          <div className="bg-white shadow-lg p-6 rounded-lg">
            <h4 className="text-xl font-semibold text-gray-800">🛠 Expert Guidance</h4>
            <p className="text-gray-600 mt-2">Our experts guide you through every step of your property journey.</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Aboutus;
