import axios from "axios";
export const PLACES_API_KEY = "AIzaSyAjRfQVksZFiuBNN8S-aZQwx84xO0w99J0";
export const PLACE_ID = "ChIJE_IhO7kVrjsRQvIz2Ro5vVA";

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const response = await axios.get(
                `https://maps.googleapis.com/maps/api/place/details/json`,{
                    params:{
                        place_id:PLACE_ID,
                        key:PLACES_API_KEY,
                        fields:"user_ratings_total,rating,reviews",
                    }
                }
            );
            return res.status(response.status).json(response.data);
        } catch (error) {
            throw new Error(error.response?.data?.message || "Failed to get reviews");
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
