export default function handler(req, res) {
  const serverTime = new Date();
  res.status(200).json({ serverTime: serverTime.toISOString() });
}
