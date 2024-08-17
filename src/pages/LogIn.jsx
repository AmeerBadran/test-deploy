import LogInForm from "../components/organism/LogInForm";
import PageHeader from "../components/molecule/PageHeader";
export default function LogIn() {
  return (
    <div className="bg-white pb-20 ">
      <PageHeader
        title="Log In"
        breadcrumbText="Log In"
        bgClass="bg-login-bg"
        overlayColor="bg-[#0E384C]"
        titleColor="text-white"
        breadcrumbColor="text-white"
        arrowColor="text-white"
        customTitleClasses="text-7xl xmobile:text-8xl 2xmobile:text-9xl"
      />
      <LogInForm />
    </div>
  );
}