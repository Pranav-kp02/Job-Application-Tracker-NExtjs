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

export function DataTable({ jobs }: { jobs: Job[] }) {
  console.log("jobs", jobs);
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
            </TableRow>
          </TableHeader>

          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell className="font-medium">{job.company}</TableCell>

                <TableCell>{job.position}</TableCell>

                <TableCell>{job.status}</TableCell>

                <TableCell>{job.appliedDate}</TableCell>
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
