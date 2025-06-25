const AuditLog = require('../models/AuditLog');

const audit = (action) => async (req, res, next) => {
  const log = new AuditLog({
    action,
    userId: req.user?._id,
    entityId: req.params.id,
    metadata: { body: req.body, params: req.params },
    timestamp: new Date()
  });
  await log.save();
  next();
};

module.exports = audit;