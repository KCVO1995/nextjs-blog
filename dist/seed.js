"use strict";

var _interopRequireDefault = require("D:/studyWeb/nextjs-blog/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("D:/studyWeb/nextjs-blog/node_modules/@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("D:/studyWeb/nextjs-blog/node_modules/@babel/runtime/helpers/asyncToGenerator"));

require("reflect-metadata");

var _typeorm = require("typeorm");

var _Post = require("./entity/Post");

(0, _typeorm.createConnection)().then( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(connection) {
    var manager, posts, data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            manager = connection.manager;
            _context.next = 3;
            return manager.find(_Post.Post);

          case 3:
            posts = _context.sent;

            if (!(posts.length === 0)) {
              _context.next = 9;
              break;
            }

            data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(function (n) {
              return new _Post.Post("\u6211\u90FD\u7B2C ".concat(n, " \u7BC7\u6587\u7AE0"), "\u8FD9\u662F\u6211\u5199\u5F97\u7B2C ".concat(n, " \u7BC7\u6587\u7AE0\uFF0C\u5199\u5F97\u5F88\u597D"));
            });
            _context.next = 8;
            return manager.save(data);

          case 8:
            console.log('数据填充成功');

          case 9:
            _context.next = 11;
            return connection.close();

          case 11:
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