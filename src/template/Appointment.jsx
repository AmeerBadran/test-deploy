import PaginationRounded from "../components/molecule/PaginationRounded";
import Table from "../components/molecule/Table";

export default function Appointment() {
  const handlePageChange = (page) => {
    console.log('Selected Page:', page);
  };
  return (
    <div>
      <h1 className="text-2xl font-bold text-[#0E485E]">
        <span className="text-[#1E84B5]">Appointment</span> management
      </h1>
      <Table />
      <PaginationRounded count={8} onPageChange={handlePageChange} theme='light' />
    </div>
  )
}
