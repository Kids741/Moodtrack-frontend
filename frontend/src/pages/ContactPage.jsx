import React, { useState } from "react";
import emailjs from "emailjs-com";
import toast, { Toaster } from "react-hot-toast";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  React.useEffect(() => {
    document.title = "Contact | MoodTrack";
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //  Your EmailJS credentials
    const serviceID = "service_qs18qp4";
    const adminTemplateID = "template_3lncctm"; // Template for admin notification
    const userTemplateID = "template_xv6krid"; // Template for auto-reply to sender
    const userID = "YcCXS07QM_O2pZ5B4";

    try {
      // 1 Send email to admin 
      await emailjs.send(serviceID, adminTemplateID, formData, userID);

      // 2 Send acknowledgment email to the user
      await emailjs.send(
        serviceID,
        adminTemplateID,
        {
          to_name: formData.name,
          to_email: formData.email,
        },
        userID
      );

      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Email error:", error);
      toast.error("Oops! Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-indigo-50 to-white px-4 py-10">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-6 sm:p-8 transition-all duration-300 hover:shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          Get in Touch
        </h2>

        <p className="text-center text-gray-600 mb-8">
          We'd love to hear from you! Whether you have a question, feedback
              drop us a message below.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="Enter your email address"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              name="message"
              required
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
              placeholder="Write your message here..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
          >
            Send Message
          </button>
        </form>

        <div className="mt-10 border-t pt-6 text-gray-700">
          <h3 className="text-lg font-semibold text-indigo-700 mb-3 text-center">
            Contact Info
          </h3>
          <div className="space-y-2 text-sm sm:text-base text-center">
            <p>
              <span className="font-medium">Email: </span>
              <a
                href="mailto:kidsdev001@gmail.com"
                className="text-indigo-600 hover:text-indigo-800"
              >
                kidsdev001@gmail.com
              </a>
            </p>
            <p>
              <span className="font-medium">Phone: </span>
              <a
                href="tel:+254112101677"
                className="text-indigo-600 hover:text-indigo-800"
              >
                +254 112 101 677
              </a>
            </p>
            <p>
              <span className="font-medium">Address: </span>20723-00202 KNH,
              Nairobi, Kenya
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
