"use strict";

var _interopRequireDefault = require("/home/lyh/app/nextjs-blog/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SignIn = void 0;

var _regenerator = _interopRequireDefault(require("/home/lyh/app/nextjs-blog/node_modules/@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("/home/lyh/app/nextjs-blog/node_modules/@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("/home/lyh/app/nextjs-blog/node_modules/@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("/home/lyh/app/nextjs-blog/node_modules/@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("/home/lyh/app/nextjs-blog/node_modules/@babel/runtime/helpers/defineProperty"));

var _User = require("../entity/User");

var _getDatabaseConnection = _interopRequireDefault(require("../../lib/getDatabaseConnection"));

var _md = _interopRequireDefault(require("md5"));

var SignIn = /*#__PURE__*/function () {
  (0, _createClass2["default"])(SignIn, [{
    key: "validate",
    value: function () {
      var _validate = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var connection;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this.username.trim()) this.errors.username.push('请输入用户名');
                if (!this.password) this.errors.password.push('请输入密码');
                _context.next = 4;
                return (0, _getDatabaseConnection["default"])();

              case 4:
                connection = _context.sent;
                _context.next = 7;
                return connection.manager.findOne(_User.User, {
                  username: this.username
                });

              case 7:
                this.user = _context.sent;

                if (this.user) {
                  if (this.user.passwordDigest !== (0, _md["default"])(this.password)) {
                    this.errors.password.push('密码和用户名不匹配');
                  }
                } else {
                  this.errors.username.push('用户名不存在');
                }

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function validate() {
        return _validate.apply(this, arguments);
      }

      return validate;
    }()
  }, {
    key: "hasError",
    value: function hasError() {
      var hasError = Object.values(this.errors).find(function (value) {
        return value.length > 0;
      });
      return hasError && hasError.length > 0;
    }
  }]);

  function SignIn(username, password) {
    (0, _classCallCheck2["default"])(this, SignIn);
    (0, _defineProperty2["default"])(this, "username", void 0);
    (0, _defineProperty2["default"])(this, "password", void 0);
    (0, _defineProperty2["default"])(this, "user", void 0);
    (0, _defineProperty2["default"])(this, "errors", {
      username: [],
      password: [],
      passwordConfirmation: []
    });
    this.username = username;
    this.password = password;
  }

  return SignIn;
}();

exports.SignIn = SignIn;