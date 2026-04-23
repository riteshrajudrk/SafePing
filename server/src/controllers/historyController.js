const ArrivalLog = require('../models/ArrivalLog');
const asyncHandler = require('../utils/asyncHandler');

const listHistory = asyncHandler(async (req, res) => {
  const logs = await ArrivalLog.find({ user: req.user._id })
    .populate('location')
    .sort({ sentAt: -1 });

  res.json({ logs });
});

module.exports = { listHistory };
