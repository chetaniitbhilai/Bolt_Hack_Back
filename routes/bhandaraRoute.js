import express from "express";
import Bhandara from "../models/bhandara.model.js";
import cleanupMiddleware from "../middleware/cleanup.js";

const router = express.Router();

function getDistanceInKm(lat1, lon1, lat2, lon2) {
  const toRad = val => (val * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// POST /bhandara
router.post("/bhandara", cleanupMiddleware, async (req, res) => {
  try {
    const bhandara = await Bhandara.create(req.body);
    res.status(201).json(bhandara);
  } catch (err) {
    res.status(400).json({ error: "Failed to create Bhandara", details: err.message });
  }
});

// GET /bhandara?lat=...&lon=...
router.get("/bhandara", cleanupMiddleware, async (req, res) => {
  const lat = parseFloat(req.query.lat);
  const lon = parseFloat(req.query.lon);

  if (isNaN(lat) || isNaN(lon)) {
    return res.status(400).json({ error: "lat and lon are required as numbers" });
  }

  try {
    const bhandaras = await Bhandara.find();
    const nearby = bhandaras.filter(b =>
      getDistanceInKm(lat, lon, b.latitude, b.longitude) <= 5
    );
    res.json(nearby);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

export default router;
