import { useFormik } from "formik";
import contact from "../../assets/images/contact-us-img.jpg"
const ContactForm = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      subject: "",
      message: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className="flex flex-col lg:flex-row gap-16 mt-20 pb-24 px-4">
      <div data-aos="fade-right" data-aos-duration="1500" className="flex-1">
        <img
          src={contact}
          alt="Contact"
          className="w-full h-auto rounded-3xl"
        />
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <h2 data-aos="fade-down" data-aos-duration="1500" className="text-base font-medium text-blue-500">+ CONTACT US</h2>
        <h3 data-aos="fade-left" data-aos-duration="1500" className="text-5xl font-black text-gray-900 mb-10 mt-3">
          <span className="text-[#1e84b5]">Get</span> In Touch With Us
        </h3>
        <form data-aos="fade-up" data-aos-duration="1500" onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              className="p-4 border rounded-lg w-full"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              className="p-4 border rounded-lg w-full"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              className="p-4 border rounded-lg w-full"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              className="p-4 border rounded-lg w-full"
              value={formik.values.subject}
              onChange={formik.handleChange}
            />
          </div>
          <textarea
            name="message"
            placeholder="Your Message"
            className="p-4 border rounded-lg w-full h-32 mb-4"
            value={formik.values.message}
            onChange={formik.handleChange}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            Send Message
            <i className="fas fa-paper-plane"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
