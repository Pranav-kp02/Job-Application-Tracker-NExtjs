import { DataTable } from "@/components/DataTable";
import { JobForm } from "@/components/JobForm";

interface searchParmsProps {
  search: string;
}
const JobsPage = async ({
  searchParams,
}: {
  searchParams: searchParmsProps;
}) => {
  const params = await searchParams;
  const search = params.search;

  let URL = search
    ? `http://localhost:3000/api/jobs?search=${params.search}`
    : `http://localhost:3000/api/jobs`;

  const res = await fetch(URL);
  const data = await res.json();

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Job Applications</h1>

        <JobForm />
      </div>

      <DataTable jobs={data.data} key={data.data._id} />
    </div>
  );
};

export default JobsPage;
