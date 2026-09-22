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
import { useRouter } from "next/navigation";

export function DataTable({ jobs }: { jobs: Job[] }) {
  const router = useRouter();

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

  return (
    <div>
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
