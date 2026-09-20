"use client";

import { DataTable } from "@/components/DataTable";
import { JobForm } from "@/components/JobForm";
import { useState } from "react";

const jobs = [
  {
    id: 1,
    company: "Google",
    position: "Frontend Developer",
    status: "Applied",
    appliedDate: "2026-09-15",
  },
  {
    id: 2,
    company: "Microsoft",
    position: "React Developer",
    status: "Interview",
    appliedDate: "2026-09-12",
  },
  {
    id: 3,
    company: "TCS",
    position: "Next.js Developer",
    status: "Technical Round",
    appliedDate: "2026-09-10",
  },
  {
    id: 4,
    company: "Infosys",
    position: "Frontend Developer",
    status: "Rejected",
    appliedDate: "2026-09-05",
  },
];

const JobsPage = () => {
  const [jobData, setJobData] = useState(jobs || []);
  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Job Applications</h1>

        <JobForm setJobData={setJobData} jobData={jobData} />
      </div>

      <DataTable jobs={jobData} />
    </div>
  );
};

export default JobsPage;
