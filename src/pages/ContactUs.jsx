import ContactInfo from "../components/organism/ContactInfo";
import ContactForm from "../components/organism/ContactSection";
import PageHeader from "../components/molecule/PageHeader";

const ContactUs = () => {
  return (
    <div className="bg-white">
      <PageHeader
        title="Contact Us"
        breadcrumbText="Contact Us"
        bgClass=""
        overlayColor="bg-[#EFF8FF]"
        titleColor="text-[#1e84b5]"
        breadcrumbColor="text-[#0E384C]"
        arrowColor="text-[#1e84b5]"
        customTitleClasses="text-5xl 2xmobile:text-7xl"
      />
      <div className="max-w-[1400px] mx-auto pt-10 mb-24">
        <ContactInfo />
        <ContactForm />
      </div>
    </div>
  );
};

export default ContactUs;