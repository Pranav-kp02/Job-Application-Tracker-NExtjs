import { connectDB } from "@/lib/mongodb";
import { Job } from "../../../lib/models/jobs";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectDB();

    const job = await Job.find();

    return NextResponse.json({
      success: true,
      data: job,
    });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({
      success: false,
      message: "Failed to fetch jobs",
    });
  }
};

export const POST = async (req) => {
  try {
    await connectDB();

    const body = await req.json();

    const job = await Job.create({
      company: body.company,
      position: body.position,
      status: body.status,
    });

    return NextResponse.json(
      {
        success: true,
        data: job,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Failed to add jobs",
      error: error.message,
    });
  }
};
