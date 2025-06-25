const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');
const Consent = require('../models/Consent');

router.get('/stats', 
  authenticate, 
  authorize('Admin'), 
  async (req, res) => {
    try {
      const stats = await Consent.aggregate([
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 }
          }
        }
      ]);
      res.json(stats);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

module.exports = router;