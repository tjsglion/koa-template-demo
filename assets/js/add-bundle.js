"use strict";

System.register([], function (_export, _context) {
  "use strict";

  var Add;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [],
    execute: function () {
      Add =
      /*#__PURE__*/
      function () {
        function Add() {
          _classCallCheck(this, Add);
        }

        _createClass(Add, [{
          key: "actionAdd",
          value: function actionAdd() {
            console.log('actionadd method =====================');
          }
        }]);

        return Add;
      }();

      _export("default", Add);
    }
  };
});
