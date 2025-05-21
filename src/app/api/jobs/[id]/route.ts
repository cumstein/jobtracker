import { NextRequest, NextResponse } from "next/server";
import  prisma  from "@/lib/prisma";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();

    const updated = await prisma.job.update({
      where: { id: params.id },
      data: {
        ...body,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PATCH job error:", error);
    return new NextResponse("Server error", { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();

    if (!id) {
      return new NextResponse("Missing job ID", { status: 400 });
    }

    const job = await prisma.job.delete({
      where: { id },
    });

    return NextResponse.json(job);
  } catch (error) {
    console.error("DELETE job error:", error);
    return new NextResponse("Failed to delete job", { status: 500 });
  }
}