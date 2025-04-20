import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";

// EmailJS Configuration
const EMAILJS_CONFIG = {
  serviceId: "service_z8azylv", // Updated service ID
  templateId: "template_skgjomm", // Your template ID
  publicKey: "JqanIIFXVFY5ZZYpT", // Your public key
};

const App = () => {
  const form = useRef<HTMLFormElement>(null);
  const [currentProject, setCurrentProject] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoSliding, setIsAutoSliding] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  const projects = [
    {
      id: 1,
      title: "Ready to use modern Web App",
      description:
        "Work under InQuantum AI company during internship period as an assessment task using Next Js, PWA configuration, Internationalization (i18n) Routing, Skeleton Loader and SEO (Search Engine Optimization).",
      image: "/images/projects/Project_1.png",
      demo: "https://nextjs-assessment-bh2.vercel.app/",
      code: "https://github.com/PyaePhoneNaing/Ready_To_Use_WebApp",
    },
    {
      id: 2,
      title: "Booking Appointment System",
      description:
        "Work under Mingalar Sky Company Limited during working as an odoo developer. Collaborating with my teams and developing the system using Odoo framework. Email notification system, Bar Chart, and Calendar view, Login and Registration system.",
      image: "/images/projects/Project_2.png",
      demo: "https://awpm.app/web/login",
      code: "https://github.com/PyaePhoneNaing/Odoo-Port-Appointment-Manage-System",
    },
    {
      id: 3,
      title: "Project Coming Soon",
      description: "More exciting projects are on the way. Stay tuned!",
      image: "https://picsum.photos/800/600?random=1",
      demo: "#",
      code: "#",
    },
  ];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  useEffect(() => {
    if (!isAutoSliding) return;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentProject((prev) => (prev + 1) % projects.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [isAutoSliding, projects.length]);

  useEffect(() => {
    // Initialize EmailJS with your public key
    emailjs.init(EMAILJS_CONFIG.publicKey);
  }, []);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentProject((prev) => {
      const nextProject = prev + newDirection;
      if (nextProject < 0) return projects.length - 1;
      if (nextProject >= projects.length) return 0;
      return nextProject;
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name === "from_name" ? "name" : name === "from_email" ? "email" : name]:
        value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address format.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      // Log the form data for debugging
      console.log("Sending email with:", {
        serviceId: EMAILJS_CONFIG.serviceId,
        templateId: EMAILJS_CONFIG.templateId,
        publicKey: EMAILJS_CONFIG.publicKey,
        formData: formData,
      });

      const result = await emailjs.sendForm(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        form.current,
        EMAILJS_CONFIG.publicKey
      );

      console.log("Email sent successfully:", result);
      setShowSuccess(true);
      setFormData({ name: "", email: "", message: "" });

      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (err) {
      console.error("Failed to send email:", err);
      if (err instanceof Error) {
        setError(`Failed to send message: ${err.message}`);
      } else {
        setError(
          "Failed to send message. Please check your EmailJS configuration."
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <a href="#" className="text-2xl font-bold text-dark">
              Pyae Phone Naing
            </a>
            <div className="hidden md:flex space-x-8">
              <a
                href="#home"
                className="text-dark hover:text-accent transition-colors"
              >
                About
              </a>
              <a
                href="#skills"
                className="text-dark hover:text-accent transition-colors"
              >
                Skills
              </a>
              <a
                href="#projects"
                className="text-dark hover:text-accent transition-colors"
              >
                Projects
              </a>
              <a
                href="#education"
                className="text-dark hover:text-accent transition-colors"
              >
                Education
              </a>
              <a
                href="#contact"
                className="text-dark hover:text-accent transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 bg-white"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Photo - Now first on mobile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative order-1 md:order-2"
          >
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 mx-auto">
              <div className="absolute inset-0 bg-blue-600 rounded-full transform rotate-3"></div>
              <img
                src="/images/profile.png"
                alt="Paolo Pyaephone Naing"
                className="relative rounded-full w-full h-full object-cover object-center border-4 border-white shadow-xl"
              />
            </div>
          </motion.div>

          {/* Text Content - Now second on mobile */}
          <div className="space-y-6 order-2 md:order-1">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 text-center md:text-left"
            >
              Hi, I'm <span className="text-blue-600">Paolo</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg sm:text-xl text-gray-600 text-center md:text-left"
            >
              A passionate Full Stack Developer with expertise in building
              modern web applications.
            </motion.p>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex justify-center md:justify-start space-x-6"
            >
              <a
                href="https://github.com/PyaePhoneNaing"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl text-gray-600 hover:text-blue-600 transition-colors"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/pyae-phone-naing/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl text-gray-600 hover:text-blue-600 transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61552157889511"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl text-gray-600 hover:text-blue-600 transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook />
              </a>
              <a
                href="https://www.instagram.com/pyae_phonenaing/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl text-gray-600 hover:text-blue-600 transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-4 justify-center md:justify-start"
            >
              <a
                href="#contact"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Contact Me
              </a>
              <a
                href="/Pyae Phone Naing_CV.pdf"
                download
                className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2"
              >
                <span>Download CV</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="heading text-dark text-center mb-12">Skills</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4">
            {[
              { name: "React", icon: "⚛️", level: 90 },
              { name: "NextJs", icon: "🐳", level: 70 },
              { name: "JavaScript", icon: "📜", level: 85 },
              { name: "Tailwind CSS", icon: "☁️", level: 80 },
              { name: "Bootstrap", icon: "📘", level: 85 },
              { name: "Python", icon: "🐍", level: 90 },
              { name: "Node.js", icon: "🟢", level: 80 },
              { name: "Git", icon: "📦", level: 90 },
              { name: "MongoDB", icon: "🍃", level: 80 },
              { name: "Odoo", icon: "📄", level: 80 },
              { name: "Three JS", icon: "🎨", level: 65 },
              { name: "Tailwind CSS", icon: "💨", level: 80 },
            ].map((skill) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-blue-50 to-gray-50 p-3 sm:p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100"
              >
                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                  <span className="text-xl sm:text-2xl flex-shrink-0">
                    {skill.icon}
                  </span>
                  <span className="text-sm sm:text-base font-bold text-gray-800">
                    {skill.name}
                  </span>
                </div>
                <div className="w-full bg-white rounded-full h-1.5 sm:h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="h-full bg-blue-600 rounded-full"
                  />
                </div>
                <div className="mt-1 sm:mt-2 text-right text-xs sm:text-sm text-gray-600">
                  {skill.level}%
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-white">
        <div className="container">
          <h2 className="heading text-dark text-center">Projects</h2>
          <div className="relative max-w-3xl mx-auto">
            <div
              className="relative h-auto min-h-[500px] overflow-hidden rounded-xl"
              onMouseEnter={() => setIsAutoSliding(false)}
              onMouseLeave={() => setIsAutoSliding(true)}
            >
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentProject}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <div className="bg-gradient-to-br from-blue-50 to-gray-50 p-4 md:p-6 rounded-lg h-full flex flex-col shadow-md hover:shadow-lg transition-all duration-300">
                    <div className="relative h-48 md:h-64 mb-4 md:mb-6 rounded-lg overflow-hidden">
                      <motion.img
                        src={projects[currentProject].image}
                        alt={projects[currentProject].title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-4 text-gray-800">
                        {projects[currentProject].title}
                      </h3>
                      <p className="text-base md:text-lg mb-4 md:mb-6 text-gray-600">
                        {projects[currentProject].description}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                      <a
                        href={projects[currentProject].demo}
                        className="bg-blue-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg hover:bg-blue-700 transition-colors text-center"
                      >
                        View Demo
                      </a>
                      <a
                        href={projects[currentProject].code}
                        className="bg-gray-200 text-gray-800 px-4 md:px-6 py-2 md:py-3 rounded-lg hover:bg-gray-300 transition-colors text-center"
                      >
                        Source Code
                      </a>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Project Indicators */}
            <div className="flex justify-center space-x-2 mt-6">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentProject ? 1 : -1);
                    setCurrentProject(index);
                  }}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentProject ? "bg-accent" : "bg-dark/20"
                  }`}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 bg-gray-50">
        <div className="container">
          <h2 className="heading text-dark text-center">Education</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <h3 className="text-2xl font-bold text-dark">
                  Bachelor of Science (Hons) in Network Technology and
                  Cybersecurity
                </h3>
                <span className="text-accent font-semibold">2025</span>
              </div>
              <p className="text-lg mb-2 text-dark">
                Lincoln University College, Malaysia
              </p>
              <ul className="list-disc list-inside space-y-2 text-dark/80">
                <li>GPA: 3.8/4.0</li>
                <li>Specialized in Networking and Web Development</li>
                <li>Completed capstone project on E-Commerce website</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <h3 className="text-2xl font-bold text-dark">
                  Higher National Diploma in Computing (HND)
                </h3>
                <span className="text-accent font-semibold">2022</span>
              </div>
              <p className="text-lg mb-2 text-dark">
                Scottish Qualifications Authority (SQA), Uk
              </p>
              <ul className="list-disc list-inside space-y-2 text-dark/80">
                <li>2 years learning journey about what is computing</li>
                <li>Collaborated with peers on real-world projects</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <h3 className="text-2xl font-bold text-dark">
                  Diploma In English
                </h3>
                <span className="text-accent font-semibold">2024</span>
              </div>
              <p className="text-lg mb-2 text-dark">Wall Street English</p>
              <ul className="list-disc list-inside space-y-2 text-dark/80">
                <li>Diploma which is equal IELTS 7.5</li>
                <li>Social networking with Native teachers around the world</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <h3 className="text-2xl font-bold text-dark">
                  Diploma in Professional Web Development
                </h3>
                <span className="text-accent font-semibold">2024</span>
              </div>
              <p className="text-lg mb-2 text-dark">NCFE, UK</p>
              <ul className="list-disc list-inside space-y-2 text-dark/80">
                <li>Advanced Web Development and Deep Learning</li>
                <li>Big Data Processing and Analysis</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="container">
          <h2 className="heading text-dark text-center mb-12">Get in Touch</h2>
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg relative overflow-hidden"
            >
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/10 rounded-full translate-y-12 -translate-x-12"></div>

              <form
                ref={form}
                onSubmit={handleSubmit}
                className="space-y-6 relative z-10"
              >
                <motion.div>
                  <label
                    htmlFor="from_name"
                    className="block mb-2 text-dark font-medium"
                  >
                    Your Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="from_name"
                      name="from_name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full p-4 rounded-xl bg-white border-2 border-dark/10 focus:border-accent focus:outline-none transition-all duration-300 text-dark placeholder:text-dark/50"
                      placeholder="Enter your name"
                    />
                  </div>
                </motion.div>

                <motion.div>
                  <label
                    htmlFor="from_email"
                    className="block mb-2 text-dark font-medium"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="from_email"
                      name="from_email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full p-4 rounded-xl bg-white border-2 border-dark/10 focus:border-accent focus:outline-none transition-all duration-300 text-dark placeholder:text-dark/50"
                      placeholder="Enter your email"
                    />
                  </div>
                  <p className="text-dark/60 text-sm mt-1">
                    Please provide a valid email if you'd like to receive a
                    response.
                  </p>
                </motion.div>

                <motion.div>
                  <label
                    htmlFor="message"
                    className="block mb-2 text-dark font-medium"
                  >
                    Your Message
                  </label>
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full p-4 rounded-xl bg-white border-2 border-dark/10 focus:border-accent focus:outline-none transition-all duration-300 resize-none text-dark placeholder:text-dark/50"
                      placeholder="Type your message here..."
                    ></textarea>
                  </div>
                </motion.div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm"
                  >
                    {error}
                  </motion.div>
                )}

                <motion.div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-accent text-white py-4 px-6 rounded-xl hover:bg-accent/90 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="relative z-10 font-semibold text-lg">
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.5 }}
                    />
                  </button>
                </motion.div>
              </form>

              {/* Success Message Animation */}
              <AnimatePresence>
                {showSuccess && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute top-0 left-0 w-full h-full bg-white flex items-center justify-center"
                  >
                    <div className="text-center">
                      <motion.div
                        className="w-16 h-16 bg-accent rounded-full mx-auto mb-4 flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <svg
                          className="w-8 h-8 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <motion.path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.5 }}
                          />
                        </svg>
                      </motion.div>
                      <motion.p
                        className="text-dark text-xl font-semibold"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      >
                        Message Sent!
                      </motion.p>
                      <motion.p
                        className="text-dark/70 mt-2"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.4 }}
                      >
                        I'll get back to you shortly!
                      </motion.p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container text-center">
          <p className="text-white">
            &copy; {new Date().getFullYear()} Paolo. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
