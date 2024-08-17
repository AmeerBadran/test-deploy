import SignUpForm from "../components/organism/SignUpForm";
import PageHeader from "../components/molecule/PageHeader";
export default function SignUp() {
  return (
    <div className="bg-white pb-20 ">
      <PageHeader
        title="Sign Up"
        breadcrumbText="Sign Up"
        bgClass="bg-login-bg"
        overlayColor="bg-[#0E384C]"
        titleColor="text-white"
        breadcrumbColor="text-white"
        arrowColor="text-white"
        customTitleClasses="text-7xl xmobile:text-8xl 2xmobile:text-9xl"
      />
      <SignUpForm />
    </div>
  );
}