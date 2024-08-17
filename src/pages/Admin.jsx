import DoctorForm from "../components/molecule/AddDoctor";
import PageHeader from "../components/molecule/PageHeader";

export default function Admin() {
  return (
    <div>
      <PageHeader
        title="Add Doctor"
        breadcrumbText="Admin"
        bgClass=""
        overlayColor="bg-[#EFF8FF]"
        titleColor="text-[#1e84b5]"
        breadcrumbColor="text-[#0E384C]"
        arrowColor="text-[#1e84b5]"
        customTitleClasses="text-5xl 2xmobile:text-7xl"
      />
      <div className="max-w-[1300px] mx-auto mb-24">
        <DoctorForm />
      </div>
    </div>
  );
}