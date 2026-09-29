import { DataTable } from "@/components/DataTable";
import { JobForm } from "@/components/JobForm";

interface searchParmsProps {
  search: string;
  status: string;
}
const JobsPage = async ({
  searchParams,
}: {
  searchParams: searchParmsProps;
}) => {
  const params = await searchParams;
  const search = params.search;
  const status = params.status || "";

  const queryParams = new URLSearchParams();
  if (search) {
    queryParams.set("search", search);
  }

  if (status) {
    queryParams.set("status", status);
  }
  const queryString = queryParams.toString();
  let URL = queryString
    ? `http://localhost:3000/api/jobs?${queryString}`
    : `http://localhost:3000/api/jobs`;

  const res = await fetch(URL);
  const data = await res.json();

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Job Applications</h1>

        <JobForm />
      </div>

      <DataTable jobs={data.data} key={data?.data?._id} />
    </div>
  );
};

export default JobsPage;
