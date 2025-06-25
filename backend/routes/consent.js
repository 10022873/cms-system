const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');
const Consent = require('../models/Consent');
const notificationService = require('../services/notification');
const audit = require('../middleware/audit');

// Create new consent request
router.post('/', 
  authenticate, 
  authorize('DataPrincipal'), 
  audit('CREATE_CONSENT'),
  async (req, res) => {
    try {
      const consent = new Consent({
        ...req.body,
        principalId: req.user._id
      });
      await consent.save();
      
      await notificationService.sendEmail(
        'admin@example.com',
        'New Consent Request',
        `User ${req.user.email} requested consent for ${consent.purpose}`
      );
      
      res.status(201).json(consent);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
});

// Get all consents for current user
router.get('/', 
  authenticate, 
  audit('LIST_CONSENTS'),
  async (req, res) => {
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
});

// Update consent status
router.patch('/:id', 
  authenticate, 
  authorize('DataFiduciary', 'Admin'), 
  audit('UPDATE_CONSENT'),
  async (req, res) => {
    try {
      const updates = Object.keys(req.body);
      const allowedUpdates = ['status', 'expiryDate'];
      
      const isValidOperation