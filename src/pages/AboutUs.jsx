import React from "react";
import MainLayout from "../Components/MainLayout";
const TeamMember = ({ name, role, bio, imageUrl }) => {
  return (
    <div className="team-member bg-white p-4 rounded-lg shadow-md">
      <div>
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <p className="text-gray-600">{role}</p>
        <p className="text-gray-700 mt-2">{bio}</p>
      </div>
    </div>
  );
};

const AboutUsPage = () => {
  const teamMembers = [
    {
      name: "Sunitha",
      role: "Frontend Developer",
      bio: "Aspiring mern stack developer",
    },
    {
      name: "Pruthvi Raj",
      role: "Backend Developer",
      bio: "Aspiring python developer",
    },
    // Add more team members
  ];

  return (
    <MainLayout>
      <div className="about-us-page p-6 bg-white">
        <section className="introduction-section">
          <h1 className="text-4xl font-bold mb-4">Welcome to Our Project!</h1>
          <p className="text-lg">
            We're a diverse team of talented individuals...
          </p>
        </section>

        <section className="team-members-section mt-8">
          <h2 className="text-2xl font-bold mb-4">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <TeamMember key={index} {...member} />
            ))}
          </div>
        </section>

        <section className="contribution-highlights-section mt-8">
          <h2 className="text-2xl font-bold mb-4">Contribution Highlights</h2>
          
        </section>

        <section className="testimonials-section mt-8">
          <h2 className="text-2xl font-bold mb-4">What People Are Saying</h2>
          {/* Add testimonials */}
        </section>

        <section className="collaboration-section mt-8">
          <h2 className="text-2xl font-bold mb-4">Our Collaborations</h2>
          {/* Add collaborations and recognition */}
        </section>

        <section className="call-to-action-section mt-8">
          <h2 className="text-2xl font-bold mb-4">Get Involved</h2>
          {/* Add call to action and links */}
        </section>
      </div>
    </MainLayout>
  );
};

export default AboutUsPage;
