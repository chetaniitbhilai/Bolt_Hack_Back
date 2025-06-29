import Bhandara from "../models/bhandara.model.js";

const cleanupMiddleware = async (req, res, next) => {
  try {
    const now = new Date();
    const today = new Date(now);
    today.setHours(0, 0, 0, 0); // Start of today

    await Bhandara.deleteMany({
      $or: [
        { date: { $lt: today } },      // date is before today
        { endTime: { $lt: now } }      // endTime is before now
      ]
    });

    next();
  } catch (err) {
    console.error("Cleanup error:", err);
    next(); // still let request go through even if cleanup fails
  }
};

export default cleanupMiddleware;
