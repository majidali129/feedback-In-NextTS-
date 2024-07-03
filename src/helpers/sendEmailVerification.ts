import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/apiResponse";

export const sendVerificationEmail = async (
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> => {
  try {
    await resend.emails.send({
      from: "you@example.com",
      to: email,
      subject: "Mystry message | Verification code",
      react: VerificationEmail({ username, otp: verifyCode })
    });
    return { success: true, message: "Verification email sent successfully " };
  } catch (emailEror) {
    console.log("Error while sending email verification", emailEror);
    return { success: false, message: "Failed to send verification email " };
  }
};
