"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Job } from "@/lib/types";
import React, { useState } from "react";

interface JobFormProps {
  setJobData: React.Dispatch<React.SetStateAction<Job[]>>;
  jobData: Job[];
}

export function JobForm({ setJobData, jobData }: JobFormProps) {
  const [open, setOpen] = useState(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newJob: Job = {
      id: Date.now(),
      company: formData.get("company") as string,
      position: formData.get("position") as string,
      status: formData.get("status") as Job["status"],
      appliedDate: formData.get("appliedDate") as string,
      //   jobUrl: formData.get("jobUrl") as string,
      //   notes: formData.get("notes") as string,
    };
    setJobData((prev) => [...prev, newJob]);
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button>Add Job</Button>} />

      <DialogContent className="sm:max-w-lg">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Job Application</DialogTitle>
            <DialogDescription>
              Add the details of a job application you want to track.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup>
            {/* Company */}
            <Field>
              <Label htmlFor="company">Company</Label>
              <Input id="company" name="company" placeholder="e.g. Google" />
            </Field>

            {/* Position */}
            <Field>
              <Label htmlFor="position">Position</Label>
              <Input
                id="position"
                name="position"
                placeholder="e.g. Frontend Developer"
              />
            </Field>

            {/* Status */}
            <Field>
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                name="status"
                defaultValue="Applied"
                className="border-input bg-background ring-offset-background focus:ring-ring w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-offset-2 focus:outline-none"
              >
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Technical Round">Technical Round</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>
            </Field>

            {/* Application Date */}
            <Field>
              <Label htmlFor="appliedDate">Application Date</Label>
              <Input id="appliedDate" name="appliedDate" type="date" />
            </Field>

            {/* Job URL */}
            <Field>
              <Label htmlFor="jobUrl">Job URL</Label>
              <Input
                id="jobUrl"
                name="jobUrl"
                type="url"
                placeholder="https://..."
              />
            </Field>

            {/* Notes */}
            <Field>
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                name="notes"
                placeholder="Add interview details, recruiter information, etc."
              />
            </Field>
          </FieldGroup>

          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />

            <Button type="submit">Add Job</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
