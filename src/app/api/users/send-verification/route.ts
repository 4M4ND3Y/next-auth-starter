import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const userID = await getDataFromToken(request);
    const user = await User.findOne({ _id: userID });

    // check if user is already verified
    if (user.isVerified) {
      return NextResponse.json(
        { message: "User is already verified" },
        { status: 400 }
      );
    }

    // sending verification mail
    await sendEmail({
      email: user.email,
      username: user.username,
      emailType: "VERIFY",
      userID: user._id,
    });

    return NextResponse.json({
      message: "Email verification mail sent successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
