import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token, user } = reqBody;
    const user1 = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });

    // check whether user1 exists
    if (!user1) {
      return NextResponse.json({ error: "User Not Found!" }, { status: 400 });
    }

    // securing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);

    user1.password = hashedPassword;
    user1.forgotPasswordToken = undefined;
    user1.forgotPasswordTokenExpiry = undefined;

    await user1.save();

    return NextResponse.json({
      message: "Password updated successfully!",
      success: true,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
