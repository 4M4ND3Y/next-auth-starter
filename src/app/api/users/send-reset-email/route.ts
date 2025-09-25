import { connect } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;
    const user = await User.findOne({ email });

    // check if user exists
    if (!user) {
      return NextResponse.json({ error: "User Not Found!" }, { status: 400 });
    }
    // send reset mail
    await sendEmail({
      email,
      username: user.username,
      emailType: "RESET",
      userID: user._id,
    });

    return NextResponse.json({
      message: "Reset password mail sent successfully!",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
