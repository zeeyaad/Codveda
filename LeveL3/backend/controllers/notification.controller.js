const Notification = require("../models/notification.model");

exports.getNotifications = async (req, res) => {
  try {
    const role = req.user.role;
    const notifications = await Notification.findAll({
      where: { recipientRole: role },
      order: [["createdAt", "DESC"]],
    });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const ids = req.body.ids;
    await Notification.update({ read: true }, { where: { id: ids } });
    res.json({ message: "Marked as read" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
