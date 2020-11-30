"use strict";

var _interopRequireDefault = require("D:/studyWeb/nextjs-blog/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("D:/studyWeb/nextjs-blog/node_modules/@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("D:/studyWeb/nextjs-blog/node_modules/@babel/runtime/helpers/asyncToGenerator"));

require("reflect-metadata");

var _typeorm = require("typeorm");

var _User = require("./entity/User");

(0, _typeorm.createConnection)().then( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(connection) {
    var manager, users, user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            manager = connection.manager;
            _context.next = 3;
            return manager.find(_User.User);

          case 3:
            users = _context.sent;

            if (!(users.length === 0)) {
              _context.next = 8;
              break;
            }

            user = new _User.User('Jacky', '123456');
            _context.next = 8;
            return manager.save([user]);

          case 8:
            _context.next = 10;
            return connection.close();

          case 10:
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