import dbConnect from "@/app/config/dbConnect";
import User from "@/app/models/user";
import { successResponse, errorResponse } from "@/app/utils/response";
import { encryptPassword } from "@/app/utils/password";

export async function POST(request: any) {
  await dbConnect();

  const formData = await request.formData();
  const email = formData.get("email");
  const password = await encryptPassword(formData.get("password"));

  const user = new User({
    email,
    password,
  });

  try {
    const token = user.generateAuthToken();
    await user.save();

    return successResponse("User registered successfully", {
      user: {
        email: user.email,
        token,
      },
    });
  } catch (error: any) {
    return errorResponse("Failed to register user", error.errors);
  }
}
