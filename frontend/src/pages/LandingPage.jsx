import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaHandHoldingHeart,
  FaGamepad,
  FaNewspaper,
  FaCalendarAlt,
  FaHandsHelping,
  FaArrowRight,
  FaMedal,
  FaUsers,
  FaChartLine,
} from "react-icons/fa";

const creators = [
  {
    name: "Ujjwal Baranwal",
    image: "/src/assets/user3.jpg",
    role: "Full Stack Developer",
    description: "Passionate about creating technology that makes a difference",
  },
  {
    name: "Sarthak Porwal",
    image: "/src/assets/user1.jpg",
    role: "Frontend Developer",
    description:
      "Dedicated to crafting beautiful and intuitive user experiences",
  },
  {
    name: "Kalp Mehta",
    image: "/src/assets/user2.jpg",
    role: "Backend Developer",
    description: "Building robust systems that power meaningful connections",
  },
  {
    name: "Dhruv Maheshwari",
    image: "/src/assets/user4.jpg",
    role: "UI/UX Designer",
    description: "Creating designs that inspire and engage communities",
  },
];

const features = [
  {
    title: "Smart Donation Platform",
    icon: FaHandHoldingHeart,
    description:
      "Make secure and transparent donations to verified NGOs. Track your contributions in real-time and see the direct impact of your generosity through detailed impact reports and success stories.",
    color: "text-teal-500",
    benefits: [
      "Secure payment gateway",
      "Real-time donation tracking",
      "Impact visualization",
      "Tax deduction receipts",
    ],
  },
  {
    title: "Gamified Giving Experience",
    icon: FaGamepad,
    description:
      "Transform your charitable actions into an engaging journey. Earn Punya points for every contribution, unlock achievements, and redeem rewards while making a real difference in society.",
    color: "text-purple-500",
    benefits: [
      "Earn Punya points",
      "Achievement badges",
      "Exclusive rewards",
      "Monthly challenges",
    ],
  },
  {
    title: "NGO Content Hub",
    icon: FaNewspaper,
    description:
      "Stay connected with causes that matter. Access verified NGO updates, success stories, and ongoing projects. Understand the journey of your contributions and the lives they touch.",
    color: "text-blue-500",
    benefits: [
      "Verified NGO profiles",
      "Project updates",
      "Success stories",
      "Impact metrics",
    ],
  },
  {
    title: "Community Events Platform",
    icon: FaCalendarAlt,
    description:
      "Discover and participate in meaningful fundraising events. Connect with like-minded individuals, organize your own events, and amplify your social impact through collective action.",
    color: "text-orange-500",
    benefits: [
      "Event discovery",
      "Online & offline events",
      "Event organization tools",
      "Community networking",
    ],
  },
  {
    title: "Volunteer Management System",
    icon: FaHandsHelping,
    description:
      "Find volunteering opportunities that match your skills and interests. Connect with NGOs, track your volunteer hours, and build a portfolio of your social impact contributions.",
    color: "text-green-500",
    benefits: [
      "Skill matching",
      "Time tracking",
      "Impact portfolio",
      "Volunteer certification",
    ],
  },
];

const stats = [
  { icon: FaUsers, number: "10K+", label: "Active Users" },
  { icon: FaHandHoldingHeart, number: "₹50L+", label: "Donations Made" },
  { icon: FaMedal, number: "100+", label: "NGO Partners" },
  { icon: FaChartLine, number: "500+", label: "Success Stories" },
];

const LandingPage = () => {
  return (
    <div className="font-sans">
      {/* Sticky Header */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-500">
            KarmaKonnect
          </h1>
          <div className="flex gap-4">
            <Link
              to="/signup-user"
              className="text-teal-600 text-sm px-4 py-2 rounded hover:bg-teal-50"
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              className="bg-teal-500 text-white px-4 py-2 text-sm rounded hover:bg-teal-600"
            >
              Login
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-teal-500 text-white text-center relative">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl font-extrabold bg-gradient-to-r from-white to-teal-100 text-transparent bg-clip-text mb-4"
          >
            KarmaKonnect
          </motion.h2>
          <p className="text-xl">
            Empowering change through connection. Join our platform to make a
            meaningful impact in society while earning rewards for your
            contributions.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/signup/user"
              className="bg-white text-teal-700 font-semibold px-6 py-3 rounded-full hover:shadow-lg"
            >
              Join as User
            </Link>
            <Link
              to="/signup/ngo"
              className="bg-gray-800 text-white font-semibold px-6 py-3 rounded-full hover:shadow-lg"
            >
              Register NGO
            </Link>
            <Link
              to="/login"
              className="border border-white text-white px-6 py-3 rounded-full hover:bg-white hover:text-teal-700"
            >
              Sign In
            </Link>
          </div>
        </div>
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\\'20\\' height=\\'20\\' viewBox=\\'0 0 20 20\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'%239C92AC\\' fill-opacity=\\'0.05\\' fill-rule=\\'evenodd\\'%3E%3Ccircle cx=\\'3\\' cy=\\'3\\' r=\\'3\\'/%3E%3Ccircle cx=\\'13\\' cy=\\'13\\' r=\\'3\\'/%3E%3C/g%3E%3C/svg%3E')] opacity-10"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white p-6 rounded-xl border shadow hover:-translate-y-1 transition"
            >
              <stat.icon className="text-teal-500 text-3xl mb-2" />
              <div className="text-3xl font-bold">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center mb-12">
          <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
            Our Features
          </h3>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Discover how KarmaKonnect makes charitable giving more engaging,
            transparent, and impactful.
          </p>
        </div>

        <div className="space-y-16">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className={`flex flex-col lg:flex-row ${
                idx % 2 === 0 ? "" : "lg:flex-row-reverse"
              } items-center gap-12 px-4 max-w-6xl mx-auto`}
            >
              <div className="flex-1">
                <feature.icon className={`text-5xl mb-4 ${feature.color}`} />
                {/* <feature.icon /> */}
                <h4 className={`text-2xl font-semibold mb-2 ${feature.color}`}>
                  {feature.title}
                </h4>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <ul className="list-disc pl-5 text-gray-500 space-y-1">
                  {feature.benefits.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
              <div className="flex-1 hidden lg:block items-center justify-center">
                <feature.icon
                  className={`rounded-xl shadow-xl  text-9xl mb-4 ${feature.color}`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center mb-12">
          <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
            Meet Our Team
          </h3>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            The Passinate mind behind karmakonnect working to create positive
            change
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {creators.map((creator, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-xl border border-gray-200  p-6 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
            >
              <div className="w-36 h-36 mx-auto rounded-full overflow-hidden shadow-md">
                <img
                  src={creator.image}
                  alt={creator.name}
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="text-center mt-4 space-y-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {creator.name}
                </h3>
                <p className="text-teal-500 font-bold">{creator.role}</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {creator.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
