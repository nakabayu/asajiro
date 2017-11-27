"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _hubotConversation = require("hubot-conversation");

var _hubotConversation2 = _interopRequireDefault(_hubotConversation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CurlCommand = function () {
    function CurlCommand() {
        _classCallCheck(this, CurlCommand);

        this.url = "";
        this.width = 0;
        this.height = 0;
        this.device = "";
        this.timezone = "";
    }

    _createClass(CurlCommand, [{
        key: "generate",
        value: function generate() {
            return "結果です" + this.url + this.width + this.timezone;
        }
    }]);

    return CurlCommand;
}();

module.exports = function (robot) {
    var conversation, input_device, input_height, input_timezone, input_url, input_width, p, show_result, trim_input;
    conversation = new _hubotConversation2.default(robot);
    robot.respond(/すし/, function (res) {
        var dialog;
        dialog = conversation.startDialog(res, 60000);
        dialog.timeout = function (res) {
            return res.emote('タイムアウトです');
        };
        // 対話形式スタート
        return input_url(res, dialog);
    });

    // 以下、対話式ダイアログです

    p = new CurlCommand();
    // 入力値のトリムに使います
    trim_input = function trim_input(str) {
        return str.trim();
    };
    // URLの入力
    input_url = function input_url(res, dialog) {
        res.send('URLを教えて下さい [ 例) http://sample.com/api/sample ]');
        return dialog.addChoice(/(.+)/, function (res2) {
            p.url = trim_input(res2.match[1]);
            return input_width(res2, dialog);
        });
    };

    // 幅パラメータの入力
    input_width = function input_width(res, dialog) {
        res.send('横幅を教えて下さい [ 数字を入力 ]');
        return dialog.addChoice(/(.+)/, function (res2) {
            p.width = trim_input(res2.match[1]);
            return input_timezone(res2, dialog);
        });
    };
    input_timezone = function input_timezone(res, dialog) {
        // 数字で入力させることで、些細なスペルミスを予防しています
        res.send('タイムゾーンを教えて下さい [ 1=Asia/Tokyo, 2=America/Chicago 数字を入力]');
        dialog.addChoice(/1/, function (res2) {
            p.timezone = "Asia/Tokyo";
            return show_result(res2, dialog);
        });
        return dialog.addChoice(/2/, function (res2) {
            p.timezone = "America/Chicago";
            return show_result(res2, dialog);
        });
    };
    // 結果表示
    return show_result = function show_result(res, dialog) {
        return res.send(p.generate());
    };
};