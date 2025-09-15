import axios from 'axios'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { name, mobile, email, prize } = req.body

    const response = await axios.post(
      process.env.GOOGLE_SHEETS_URL,
      { name, mobile, email, prize },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    res.status(200).json({ message: 'Data saved successfully' })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ message: 'Failed to save data' })
  }
}