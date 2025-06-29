import apiServer from "@/lib/apiServer";
import { destroySession } from "@/lib/session";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    await apiServer.post("/auth/signout");

    await destroySession();
    return NextResponse.json({
      success: true,
      message: "Logged out and session deleted",
    });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { success: false, message: "Logout failed" },
      { status: 500 }
    );
  }
}
