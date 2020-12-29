"use strict";

var _interopRequireDefault = require("/home/lyh/app/nextjs-blog/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("/home/lyh/app/nextjs-blog/node_modules/@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("/home/lyh/app/nextjs-blog/node_modules/@babel/runtime/helpers/asyncToGenerator"));

require("reflect-metadata");

var _typeorm = require("typeorm");

var _User = require("./entity/User");

var _Post = require("./entity/Post");

var _Comment = require("./entity/Comment");

(0, _typeorm.createConnection)().then( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(connection) {
    var manager, users, posts, comments, user, post, comment;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            manager = connection.manager;
            _context.next = 3;
            return manager.find(_User.User);

          case 3:
            users = _context.sent;
            _context.next = 6;
            return manager.find(_Post.Post);

          case 6:
            posts = _context.sent;
            _context.next = 9;
            return manager.find(_Comment.Comment);

          case 9:
            comments = _context.sent;

            if (!(users.length === 0 && posts.length === 0 && comments.length === 0)) {
              _context.next = 20;
              break;
            }

            user = new _User.User('Jacky', '123456');
            _context.next = 14;
            return manager.save([user]);

          case 14:
            post = new _Post.Post('第一篇文章', '这是写得最好的文章', user);
            _context.next = 17;
            return manager.save([post]);

          case 17:
            comment = new _Comment.Comment('第一个评论', user, post);
            _context.next = 20;
            return manager.save([comment]);

          case 20:
            _context.next = 22;
            return connection.close();

          case 22:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}())["catch"](function (error) {
  return console.log(error);
});