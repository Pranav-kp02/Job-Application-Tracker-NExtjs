import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/mongodb";
import { Job } from "../../../lib/models/jobs";

export const GET = async () => {
  try {
    await connectDB();

    const job = await Job.find().sort({
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

// export const DELETE = async (req: Request) => {
//   try {
//     await connectDB();

//     const data = await req.json();

//     console.log("data:", data);
//     console.log("id:", data.id);

//     const job = await Job.findByIdAndDelete(data.id);

//     if (!job) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Job not found",
//         },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({
//       success: true,
//       data: job,
//     });
//   } catch (error) {
//     console.error("DELETE ERROR:", error);

//     return NextResponse.json(
//       {
//         success: false,
//         error: error instanceof Error ? error.message : "Something went wrong",
//       },
//       { status: 500 }
//     );
//   }
// };
