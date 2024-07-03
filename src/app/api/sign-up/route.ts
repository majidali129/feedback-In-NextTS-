import connectDB from "@/lib/dbConnect";
import UserModel from "@/models/user.model";
import { sendVerificationEmail } from "@/helpers/sendEmailVerification";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  await connectDB();
  try {
    const { username, email, password } = await request.json();
    const existingVerifiedUserByUsername = await UserModel.findOne({
      username,
      isVerified: true
    });

    if (existingVerifiedUserByUsername) {
      return Response.json(
        {
          success: false,
          message: "Username is already taken"
        },
        {
          status: 400
        }
      );
    }

    const existingUserByEmail = await UserModel.findOne({ email });
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return Response.json(
          {
            success: false,
            message: "User already exists with this email"
          },
          { status: 400 }
        );
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        isVerified: false,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isAcceptionMessage: true,
        messages: []
      });

      await newUser.save();
    }

    const emailResponse = await sendVerificationEmail(
      email,
      username,
      verifyCode
    );

    if (!emailResponse.success) {
      return Response.json({
        success: false,
        message: emailResponse.message
      });
    }

    return Response.json(
      {
        success: true,
        message: "User registered successfully. Please verify your account."
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering user", error);
    return Response.json(
      {
        success: false,
        message: "Error registering user"
      },
      {
        status: 500
      }
    );
  }
}
