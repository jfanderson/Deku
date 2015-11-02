var Notification = require('../models/notificationModel.js');

module.exports = {
  getNotifications: function (req, res) {
    Notification.getNotifications(req.params.id, function (err, notifications) {
      if (err) {
        console.error(err);
        res.status(500).end();
      } else {
        res.status(200).json(notifications);
      }
    })
  },

  addNotification: function (req, res) {
    Notification.addNotification(req.params.id, req.body.content, function (err, result) {
      if (err) {
        console.error(err);
        res.status(500).end();
      } else {
        res.status(201).end();
      }
    })
  },
  
  deleteNotifications: function (req, res) {
    Notification.deleteNotifications(req.params.userID, function (err, result) {
      if (err) {
        console.error(err);
        res.status(500).end();
      } else {
        res.status(204).end();
      }
    })
  }
}
