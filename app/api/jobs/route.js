import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/mongodb";
import { Job } from "../../../lib/models/jobs";

export const GET = async (req) => {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const search = searchParams.get("search");
    console.log("search", search);

    let query;

    if (search && search.trim() !== "") {
      query = {
        $or: [
          {
            company: {
              $regex: search,
              $options: "i",
            },
          },
          {
            position: {
              $regex: search,
              $options: "i",
            },
          },
        ],
      };
    }

    const job = await Job.find(query).sort({
      createdAt: -1,
    });
    return NextResponse.json({
      success: true,
      data: job,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error,
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
      appliedDate: body.appliedDate,
    });
    return NextResponse.json({
      success: true,
      data: job,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error,
    });
  }
};

export const DELETE = async (req) => {
  try {
    await connectDB();
    const data = await req.json();

    console.log("id:", data.id);

    const job = await Job.findByIdAndDelete(data.id);

    console.log("deleted job:", job);
    return NextResponse.json({
      success: true,
      data: job,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error,
    });
  }
};
