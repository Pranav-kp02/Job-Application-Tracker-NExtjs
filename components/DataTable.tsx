"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import { Job } from "@/lib/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function DataTable({ jobs }: { jobs: Job[] }) {
  const router = useRouter();
  const [text, setText] = useState("");
  const searchParams = useSearchParams();
  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:3000/api/jobs`, {
        method: "DELETE",
        body: JSON.stringify({ id }),
      });
      const data = await res.json();

      if (data.success) {
        router.refresh();
      }
    } catch (error) {}
  };

  const handleSearch = (textData: string) => {
    const params = new URLSearchParams(searchParams);

    if (textData) {
      params.set("search", textData);
    } else {
      params.delete("search");
    }

    router.push(`/jobs?${params.toString()}`);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch(text);
    }, 500);

    return () => clearTimeout(timer);
  }, [text]);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-4">
        {/* Search */}
        <div className="w-full max-w-sm">
          <input
            type="text"
            onChange={(e) => setText(e.target.value)}
            placeholder="Search jobs..."
            className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2"
          />
        </div>
        {/* Filter */}
        <div className="flex items-center gap-2">
          <select className="rounded-md border px-3 py-2 text-sm">
            <option value="">Filter by status</option>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Technical Round">Technical Round</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Applied Date</TableHead>
              <TableCell>options</TableCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job._id}>
                <TableCell className="font-medium">{job.company}</TableCell>

                <TableCell>{job.position}</TableCell>

                <TableCell>{job.status}</TableCell>

                <TableCell>
                  {new Date(job.appliedDate).toLocaleDateString()}
                </TableCell>

                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      // onClick={() => handleEdit(job)}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(job._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          //   onClick={() => table.previousPage()}
          //   disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          //   onClick={() => table.nextPage()}
          //   disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
