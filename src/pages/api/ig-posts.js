import axios from "axios";

export const IG_ACCESS_TOKEN = "IGAAQX2ERPPjZABZAE9zWEhlRmFQQWticXN2Q0hrT0tjaU9MS1p4b1VvYTQ4Mk5JN2JFSmYyNDU4azAtOFRBLTl4aGJ6alBOVTVfVUR2cjRFbDl5Q2NNNENXcHpDNUloN0I1ekdoejhnd0hqQnF1d0tDUXJuUmlyVEhodFk2dEtlWQZDZD";

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const { limit, media_type } = req.query;  // Get limit & media type from query params

            const response = await axios.get("https://graph.instagram.com/me/media", {
                params: {
                    fields: "id,caption,media_type,media_url,permalink",
                    access_token: IG_ACCESS_TOKEN,
                }
            });

            let posts = response.data.data;

            if (media_type) {
                posts = posts.filter(post => post.media_type === media_type.toUpperCase()).slice(0, 3);
            }

            return res.status(200).json({ data: posts });
        } catch (error) {
            return res.status(error.response?.status || 500).json({
                error: error.response?.data?.message || "Failed to get Instagram posts"
            });
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
