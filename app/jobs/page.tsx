import { DataTable } from "@/components/DataTable";
import { JobForm } from "@/components/JobForm";

const JobsPage = async () => {
  const res = await fetch("http://localhost:3000/api/jobs");
  const data = await res.json();

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Job Applications</h1>

        <JobForm />
      </div>

      <DataTable jobs={data.data} key={data.data.id} />
    </div>
  );
};

export default JobsPage;
