const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConsentSchema = new Schema({
  principalId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  fiduciaryId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  purpose: { 
    type: String, 
    required: true,
    maxlength: 200 
  },
  dataTypes: [{ 
    type: String, 
    enum: ['PII', 'Health', 'Financial', 'Behavioral'],
    required: true 
  }],
  status: { 
    type: String, 
    enum: ['requested', 'granted', 'revoked', 'expired'], 
    default: 'requested' 
  },
  expiryDate: { 
    type: Date,
    validate: {
      validator: function(v) {
        return v > new Date();
      },
      message: 'Expiry date must be in the future'
    }
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date 
  }
});

// Auto-update updatedAt on save
ConsentSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('Consent', ConsentSchema);