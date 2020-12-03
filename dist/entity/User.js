"use strict";

var _interopRequireDefault = require("D:/studyWeb/nextjs-blog/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = void 0;

var _initializerDefineProperty2 = _interopRequireDefault(require("D:/studyWeb/nextjs-blog/node_modules/@babel/runtime/helpers/initializerDefineProperty"));

var _regenerator = _interopRequireDefault(require("D:/studyWeb/nextjs-blog/node_modules/@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("D:/studyWeb/nextjs-blog/node_modules/@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("D:/studyWeb/nextjs-blog/node_modules/@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("D:/studyWeb/nextjs-blog/node_modules/@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("D:/studyWeb/nextjs-blog/node_modules/@babel/runtime/helpers/defineProperty"));

var _applyDecoratedDescriptor2 = _interopRequireDefault(require("D:/studyWeb/nextjs-blog/node_modules/@babel/runtime/helpers/applyDecoratedDescriptor"));

var _initializerWarningHelper2 = _interopRequireDefault(require("D:/studyWeb/nextjs-blog/node_modules/@babel/runtime/helpers/initializerWarningHelper"));

var _typeorm = require("typeorm");

var _Post = require("./Post");

var _Comment = require("./Comment");

var _lodash = _interopRequireDefault(require("lodash"));

var _md = _interopRequireDefault(require("md5"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _temp;

var User = (_dec = (0, _typeorm.Entity)('users'), _dec2 = (0, _typeorm.PrimaryGeneratedColumn)('increment'), _dec3 = (0, _typeorm.Column)('varchar'), _dec4 = (0, _typeorm.Column)('varchar'), _dec5 = (0, _typeorm.CreateDateColumn)(), _dec6 = (0, _typeorm.UpdateDateColumn)(), _dec7 = (0, _typeorm.OneToMany)(function () {
  return _Post.Post;
}, function (post) {
  return post.author;
}), _dec8 = (0, _typeorm.OneToMany)(function () {
  return _Comment.Comment;
}, function (comment) {
  return comment.user;
}), _dec9 = (0, _typeorm.BeforeInsert)(), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function () {
  (0, _createClass2["default"])(User, [{
    key: "validate",
    value: function () {
      var _validate = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var isDuplicateName;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this.username.trim()) this.errors.username.push('用户名不能为空');
                if (this.username.length >= 20) this.errors.username.push('用户名太长');
                if (this.username.length < 2) this.errors.username.push('用户名太短');
                _context.next = 5;
                return this.connection.manager.find(User, {
                  username: this.username
                });

              case 5:
                isDuplicateName = _context.sent;
                if (isDuplicateName.length > 0) this.errors.username.push('用户名已存在');
                if (!this.password) this.errors.passwordConfirmation.push('密码不能为空');
                if (this.password.length < 6) this.errors.password.push('密码最少为6个字符');
                if (!/[a-zA-Z][0-9]/g.test(this.password.trim())) this.errors.password.push('密码格式错误，需要由数组和字母组成');
                if (this.password !== this.passwordConfirmation) this.errors.passwordConfirmation.push('密码不匹配');
                return _context.abrupt("return", this.errors);

              case 12:
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
  }, {
    key: "toJSON",
    value: function toJSON() {
      console.log('11', this);
      return _lodash["default"].omit(this, ['password', 'passwordConfirmation', 'passwordDigest', 'connection', 'errors']);
    }
  }, {
    key: "generatePasswordDigest",
    value: function generatePasswordDigest() {
      this.passwordDigest = (0, _md["default"])(this.password);
    }
  }]);

  function User(username, passwordDigest) {
    (0, _classCallCheck2["default"])(this, User);
    (0, _initializerDefineProperty2["default"])(this, "id", _descriptor, this);
    (0, _initializerDefineProperty2["default"])(this, "username", _descriptor2, this);
    (0, _initializerDefineProperty2["default"])(this, "passwordDigest", _descriptor3, this);
    (0, _initializerDefineProperty2["default"])(this, "createdAt", _descriptor4, this);
    (0, _initializerDefineProperty2["default"])(this, "updatedAt", _descriptor5, this);
    (0, _initializerDefineProperty2["default"])(this, "posts", _descriptor6, this);
    (0, _initializerDefineProperty2["default"])(this, "comments", _descriptor7, this);
    (0, _defineProperty2["default"])(this, "errors", {
      username: [],
      password: [],
      passwordConfirmation: []
    });
    (0, _defineProperty2["default"])(this, "password", '');
    (0, _defineProperty2["default"])(this, "passwordConfirmation", '');
    (0, _defineProperty2["default"])(this, "connection", null);
    this.username = username;
    this.passwordDigest = passwordDigest;
  }

  return User;
}(), _temp), (_descriptor = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "id", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "username", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "passwordDigest", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "createdAt", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "updatedAt", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "posts", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "comments", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "generatePasswordDigest", [_dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "generatePasswordDigest"), _class2.prototype)), _class2)) || _class);
exports.User = User;