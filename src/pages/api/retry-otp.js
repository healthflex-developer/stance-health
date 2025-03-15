import axios from "axios";
import { MSG91_TEMPLATE_ID, MSG_91_AUTH_KEY } from "@/pages/api/send-otp";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { mobile } = req.body;
      const response = await axios.get(
        `https://control.msg91.com/api/v5/otp/retry?authkey=${MSG_91_AUTH_KEY}&retrytype=text&mobile=+91${mobile}`
      );
      return res.status(response.status).json(response.data);
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to send OTP");
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
