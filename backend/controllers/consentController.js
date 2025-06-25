const Consent = require('../models/Consent');
const notificationService = require('../services/notification');

const createConsent = async (req, res) => {
  try {
    const consent = new Consent({
      ...req.body,
      principalId: req.user._id
    });
    await consent.save();
    
    // Notify admin
    await notificationService.sendEmail(
      'admin@example.com',
      'New Consent Request',
      `User ${req.user.email} requested consent for ${consent.purpose}`
    );
    
    res.status(201).json(consent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getConsents = async (req, res) => {
  try {
    const filter = req.user.role === 'DataPrincipal' 
      ? { principalId: req.user._id } 
      : { fiduciaryId: req.user._id };
    
    const consents = await Consent.find(filter)
      .populate('principalId', 'email')
      .populate('fiduciaryId', 'email');
    
    res.json(consents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createConsent, getConsents };