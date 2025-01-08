import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      console.log("req.body", req.body);
      const response = await axios.post(
        "https://script.google.com/macros/s/AKfycbyagIbYSudHLK8U0fbS0BTldO8qIObVU2JZ6qV7hZg8lO8nqtORgN8uUs6C-N2DI3SF/exec",
        JSON.stringify(req.body),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      res.status(response.status).json(response.data);
    } catch (error) {
      console.error("Error:", error);
      res
        .status(error.response?.status || 500)
        .json({ message: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
