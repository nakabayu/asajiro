// Description:
//   helps you to make curl command.

// Commands:
//   hubot teach curl - building curl command in coversation with bot.

import Conversation from 'hubot-conversation';
import request from 'request';

class CurlCommand {
    constructor() {
        var jobcode = '';
        var jobname = '';
        var term = '';
        var member = '';
        var workinglocation = '';
        var overview = '';
        var workingcontent = '';
        var schedule = '';
        var deadlinemanagement = '';
        var other = '';
    }

    confirmText() {
        var text = '';

        // ジョブコード
        text += '■ジョブコード\n';
        text += this.jobcode + '\n\n';

        // ジョブ名
        text += '■ジョブ名\n';
        text += this.jobname + '\n\n';

        // メンバー
        text += '■メンバー\n';
        text += this.term + '\n\n';

        // 契約期間
        text += '■契約期間\n';
        text += this.member + '\n\n';

        // 作業場所
        text += '■作業場所\n';
        text += this.workinglocation + '\n\n';

        // 概要
        text += '■概要\n';
        text += this.overview + '\n\n';

        // 作業内容
        text += '■作業内容\n';
        text += this.workingcontent + '\n\n';

        // 全体スケジュール
        text += '■全体スケジュール\n';
        text += this.schedule + '\n\n';

        // 期日管理
        text += '■期日管理\n';
        text += this.deadlinemanagement + '\n\n';

        // その他
        text += '■その他\n';
        text += this.other;

        return text;
    }

    generateJson() {
        var payload = {
            "action": "createJob",
            "data": {
                "jobcode": this.jobcode,
                "jobname": this.jobname,
                "member": this.member,
                "term": this.term,
                "workinglocation": this.workinglocation,
                "overview": this.overview,
                "workingcontent": this.workingcontent,
                "schedule": this.schedule,
                "deadlinemanagement": this.deadlinemanagement,
                "other": this.other,
                "active": true
            }
        }
        return payload;
    }
}

module.exports = (robot) => {
    var conversation, trim_input, show_result, p, 
        input_jobcode, input_jobname, input_member, input_term, input_workinglocation, input_overview, 
        input_workingcontent, input_schedule, input_deadlinemanagement, input_other, input_confirm,
        update_jobcode, update_jobname, update_member, update_term, update_workinglocation, update_overview, 
        update_workingcontent, update_schedule, update_deadlinemanagement, update_other, update_confirm;
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
        res.send('ジョブコードを教えてください');
        return dialog.addChoice(/(.+)/, function(res2) {
            p.jobcode = trim_input(res2.match[1]);
            return input_jobname(res2, dialog);
        });
    };

    // ジョブコードの修正
    update_jobcode = function(res, dialog) {
        res.send('ジョブコードを教えてください');
        return dialog.addChoice(/(.+)/, function(res2) {
            p.jobcode = trim_input(res2.match[1]);
            return input_confirm(res2, dialog);
        });
    };

    // ジョブ名の入力
    input_jobname = function(res, dialog) {
        res.send('ジョブ名を教えてください');
        return dialog.addChoice(/(.+)/, function(res2) {
            p.jobname = trim_input(res2.match[1]);
            return input_member(res2, dialog);
        });
    };

    // ジョブコードの修正
    update_jobname = function(res, dialog) {
        res.send('ジョブ名を教えてください');
        return dialog.addChoice(/(.+)/, function(res2) {
            p.jobname = trim_input(res2.match[1]);
            return input_confirm(res2, dialog);
        });
    };

    // メンバーの入力
    input_member = function(res, dialog) {
        res.send('メンバーを教えてください');
        return dialog.addChoice(/(.+)/, function(res2) {
            p.member = trim_input(res2.match[1]);
            return input_term(res2, dialog);
        });
    };

    // メンバーの修正
    update_member = function(res, dialog) {
        res.send('メンバーを教えてください');
        return dialog.addChoice(/(.+)/, function(res2) {
            p.member = trim_input(res2.match[1]);
            return input_confirm(res2, dialog);
        });
    };

    // 契約期間の入力
    input_term = function(res, dialog) {
        res.send('契約期間を教えてください');
        return dialog.addChoice(/(.+)/, function(res2) {
            p.term = trim_input(res2.match[1]);
            return input_workinglocation(res2, dialog);
        });
    };

    // 契約期間の修正
    update_term = function(res, dialog) {
        res.send('契約期間を教えてください');
        return dialog.addChoice(/(.+)/, function(res2) {
            p.term = trim_input(res2.match[1]);
            return input_confirm(res2, dialog);
        });
    };

    // 作業場所の入力
    input_workinglocation = function(res, dialog) {
        res.send('作業場所を教えてください');
        return dialog.addChoice(/(.+)/, function(res2) {
            p.workinglocation = trim_input(res2.match[1]);
            return input_overview(res2, dialog);
        });
    };

    // 作業場所の修正
    update_workinglocation = function(res, dialog) {
        res.send('作業場所を教えてください');
        return dialog.addChoice(/(.+)/, function(res2) {
            p.workinglocation = trim_input(res2.match[1]);
            return input_confirm(res2, dialog);
        });
    };

    // 概要の入力
    input_overview = function(res, dialog) {
        res.send('概要を教えてください');
        return dialog.addChoice(/(.+)/, function(res2) {
            p.overview = trim_input(res2.match[1]);
            return input_workingcontent(res2, dialog);
        });
    };

    // 概要の修正
    update_overview = function(res, dialog) {
        res.send('概要を教えてください');
        return dialog.addChoice(/(.+)/, function(res2) {
            p.overview = trim_input(res2.match[1]);
            return input_confirm(res2, dialog);
        });
    };

    // 作業内容の入力
    input_workingcontent = function(res, dialog) {
        res.send('作業内容を教えてください');
        return dialog.addChoice(/(.+)/, function(res2) {
            p.workingcontent = trim_input(res2.match[1]);
            return input_schedule(res2, dialog);
        });
    };

    // 作業内容の修正
    update_workingcontent = function(res, dialog) {
        res.send('作業内容を教えてください');
        return dialog.addChoice(/(.+)/, function(res2) {
            p.workingcontent = trim_input(res2.match[1]);
            return input_confirm(res2, dialog);
        });
    };

    // 全体スケジュールの入力
    input_schedule = function(res, dialog) {
        res.send('全体スケジュールを教えてください');
        return dialog.addChoice(/(.+)/, function(res2) {
            p.schedule = trim_input(res2.match[1]);
            return input_deadlinemanagement(res2, dialog);
        });
    };

    // 全体スケジュールの修正
    update_schedule = function(res, dialog) {
        res.send('全体スケジュールを教えてください');
        return dialog.addChoice(/(.+)/, function(res2) {
            p.schedule = trim_input(res2.match[1]);
            return input_confirm(res2, dialog);
        });
    };

    // 期日管理の入力
    input_deadlinemanagement = function(res, dialog) {
        res.send('期日管理（業務指示書・売振・業務完了報告）の状況を教えてください');
        return dialog.addChoice(/(.+)/, function(res2) {
            p.deadlinemanagement = trim_input(res2.match[1]);
            return input_other(res2, dialog);
        });
    };

    // 期日管理の修正
    update_deadlinemanagement = function(res, dialog) {
        res.send('期日管理（業務指示書・売振・業務完了報告）の状況を教えてください');
        return dialog.addChoice(/(.+)/, function(res2) {
            p.deadlinemanagement = trim_input(res2.match[1]);
            return input_confirm(res2, dialog);
        });
    };

    // その他の入力
    input_other = function(res, dialog) {
        res.send('その他何かあれば教えてください');
        return dialog.addChoice(/(.+)/, function(res2) {
            p.other = trim_input(res2.match[1]);
            return input_confirm(res2, dialog);
        });
    };

    // その他の修正
    update_other = function(res, dialog) {
        res.send('その他何かあれば教えてください');
        return dialog.addChoice(/(.+)/, function(res2) {
            p.other = trim_input(res2.match[1]);
            return input_confirm(res2, dialog);
        });
    };

    // 最終確認
    input_confirm = function(res, dialog) {
        var msg = p.confirmText() + '\n\n';
        msg += '上記内容でよければ「0」、修正する場合は修正する項目を以下の番号から選択してください' + '\n';
        msg += '1:ジョブ名/2:ジョブ名/3:メンバー/4:契約期間/5:作業場所/6:概要/7:作業内容/8:全体スケジュール/9:期日管理/10:その他';
        res.send(msg);
        dialog.addChoice(/0/, function(res2) {
            return show_result(res2, dialog);
        });
        dialog.addChoice(/1/, function(res2) {
            return update_jobcode(res2, dialog);
        });
        dialog.addChoice(/2/, function(res2) {
            return update_jobname(res2, dialog);
        });
        dialog.addChoice(/3/, function(res2) {
            return update_member(res2, dialog);
        });
        dialog.addChoice(/4/, function(res2) {
            return update_term(res2, dialog);
        });
        dialog.addChoice(/5/, function(res2) {
            return update_workinglocation(res2, dialog);
        });
        dialog.addChoice(/6/, function(res2) {
            return update_overview(res2, dialog);
        });
        dialog.addChoice(/7/, function(res2) {
            return update_workingcontent(res2, dialog);
        });
        dialog.addChoice(/8/, function(res2) {
            return update_schedule(res2, dialog);
        });
        dialog.addChoice(/9/, function(res2) {
            return update_deadlinemanagement(res2, dialog);
        });
        dialog.addChoice(/10/, function(res2) {
            return update_other(res2, dialog);
        });
    };

    // 登録
    return show_result = function(res, dialog) {
        // GASのPost先のURL
        var url = 'https://script.google.com/macros/s/AKfycbwT0Zg1ZGvwQ99Fpr7vsecDE2wowN1NBTuZZgp3meNTBaNKTvY/exec';

        var options = {
            uri: url,
            headers: {
                "Content-Type" : "application/json"
            },
            json: true,
            followAllRedirects: true,
            body: p.generateJson()
        };
        request.post(options, function(error, response, body){
            if (!error && response.statusCode == 200) {
                console.log(body.massage);
                return res.send(body.massage);
            } else {
                return res.send('error: '+ response.statusCode);
            }
            
        });
    };

    // 最終確認
    // input_confirm = function(res, dialog) {
    //     var msg = p.confirmText() + '\n\n';
    //     msg += '上記内容でよければ「0」、修正する場合は修正する項目を以下の番号から選択してください' + '\n';
    //     msg += '1:ジョブ名/2:ジョブ名/3:メンバー/4:契約期間/5:作業場所/6:概要/7:作業内容/8:全体スケジュール/9:期日管理/10:その他';
    //     res.send(msg);
    //     dialog.addChoice(/1/, function(res2) {
    //         p.timezone = "Asia/Tokyo";
    //         return show_result(res2, dialog);
    //     });
    //     return dialog.addChoice(/2/, function(res2) {
    //         p.timezone = "America/Chicago";
    //         return show_result(res2, dialog);
    //     });
    // };
}