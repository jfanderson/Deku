//Require DB connection!
var db = require('../db/connection.js');
var bcrypt = require('bcrypt-nodejs');


module.exports = {

  getStatuses: function (username, callback) {
      db.query('select * from statuses s inner join users u on (u.id = s.user_id) where u.username = ?', [username], function (err, statuses) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, statuses);
        }
      })
    },

  addStatus: function (data, callback) {
    db.query('insert into statuses (user_id, status, timestamp) values (?, ?, now())', [data.userID, data.status],
      function (err, res) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, res);
        }
    });
  },

  getFriendsStatuses: function (id, callback) {
    db.query('select u.username, s.id, s.status, s.timestamp, s.vote_tally from users u \
      inner join followers f on (u.id = f.follower_id) \
      inner join statuses s on (f.follower_id = s.user_id) where u.id = ?', [id], function (err, statuses) {
      if (err) {
        callback(err);
      } else {
        callback(null, statuses);
      }
    })
  },

  deleteStatus: function (id, callback) {
    db.query('delete from statuses where id = ?', [id], function (err, res) {
      if (err) {
        callback(err);
      } else {
        callback(null, res);
      }
    })
  }
  
}