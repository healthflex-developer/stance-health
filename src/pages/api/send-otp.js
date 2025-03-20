import axios from "axios";
export const MSG_91_AUTH_KEY = "394826AgFnjL0N650ade13P1";
export const MSG91_TEMPLATE_ID = "6513fc2cd6fc05550671fb42";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { mobile } = req.body;
      console.log("mobile", mobile);
      const response = await axios.post(
        "https://control.msg91.com/api/v5/otp",
        {
          template_id: "6513fc2cd6fc05550671fb42",
          mobile: "+91" + mobile,
          authkey: MSG_91_AUTH_KEY,
        },
        { headers: { "Content-Type": "application/json" } }
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
