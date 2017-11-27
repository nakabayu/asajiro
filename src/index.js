// Description:
//   helps you to make curl command.

// Commands:
//   hubot teach curl - building curl command in coversation with bot.

import Conversation from 'hubot-conversation';

class CurlCommand {
    constructor() {
    }

    generate() {
        return "結果です" + this.url + this.width + this.timezone;
    }
}

module.exports = (robot) => {
    var conversation, input_device, input_height, input_timezone, input_url, input_width, p, show_result, trim_input;
    conversation = new Conversation(robot)
    robot.respond(/createjob/, (res) => {
        var dialog;
        dialog = conversation.startDialog(res, 60000);
        dialog.timeout = function(res) {
            return res.emote('タイムアウトです');
        }
        // 対話形式スタート
        return input_jobcode(res, dialog);
    });

    // 以下、対話式ダイアログです

    p = new CurlCommand();
    // 入力値のトリムに使います
    trim_input = function(str) {
        return str.trim();
    };
    // ジョブコードの入力
    input_jobcode = function(res, dialog) {
        res.send('URLを教えて下さい [ 例) http://sample.com/api/sample ]');
        return dialog.addChoice(/(.+)/, function(res2) {
            p.url = trim_input(res2.match[1]);
            return input_width(res2, dialog);
        });
    };
  
    // 幅パラメータの入力
    input_width = function(res, dialog) {
        res.send('横幅を教えて下さい [ 数字を入力 ]');
        return dialog.addChoice(/(.+)/, function(res2) {
        p.width = trim_input(res2.match[1]);
        return input_timezone(res2, dialog);
        });
    };
    input_timezone = function(res, dialog) {
        // 数字で入力させることで、些細なスペルミスを予防しています
        res.send('タイムゾーンを教えて下さい [ 1=Asia/Tokyo, 2=America/Chicago 数字を入力]');
        dialog.addChoice(/1/, function(res2) {
            p.timezone = "Asia/Tokyo";
            return show_result(res2, dialog);
        });
        return dialog.addChoice(/2/, function(res2) {
            p.timezone = "America/Chicago";
            return show_result(res2, dialog);
        });
    };
    // 結果表示
    return show_result = function(res, dialog) {
        return res.send(p.generate());
    };
}