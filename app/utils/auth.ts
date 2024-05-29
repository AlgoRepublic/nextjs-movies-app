import jwt from "jsonwebtoken";
import User from "@/app/models/user";
import dbConnect from "@/app/config/dbConnect";

export const authenticateToken = async (token: any) => {
  if (token) {
    try {
      let decoded: jwt.JwtPayload | undefined;

      try {
        decoded = (await jwt.verify(
          `${token}`,
          `${process.env.APP_JWT_KEY}`
        )) as jwt.JwtPayload;
      } catch (err) {
        return { error: "Invalid authorization token" };
      }

      if (!decoded?._id) {
        return { error: "Invalid authorization token" };
      }

      const query = { _id: decoded._id };

      await dbConnect();
      const user = await User.findOne(query).lean().exec();

      if (!user) {
        return { error: "Invalid authorization token" };
      }

      return { user };
    } catch (err) {
      return { error: "Invalid authorization token" };
    }
  } else {
    return { error: "Authorization token is missing" };
  }
};
