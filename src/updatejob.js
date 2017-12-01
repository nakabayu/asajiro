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
        var active;
    }

    // setval(prm){
    //     var jobcode = prm.jobcode;
    //     var jobname = prm.jobname;
    //     var term = prm.term;
    //     var member = prm.member;
    //     var workinglocation = prm.workinglocation;
    //     var overview = prm.overview;
    //     var workingcontent = prm.workingcontent;
    //     var schedule = prm.schedule;
    //     var deadlinemanagement = prm.deadlinemanagement;
    //     var other = prm.other;
    //     var active = prm.active;
    // }

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

        // アーカイブ
        text += '■状態\n';
        text += this.active;

        return text;
    }

    getJobJson() {
        var payload = {
            "action": "getJob",
            "data": {
                "jobcode": this.jobcode
            }
        }
        return payload;
    }

    updateJobJson() {
        var payload = {
            "action": "updateJob",
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
                "active": this.active
            }
        }
        return payload;
    }
}

module.exports = (robot) => {
    // GASのPost先のURL
    const url = 'https://script.google.com/macros/s/AKfycbwT0Zg1ZGvwQ99Fpr7vsecDE2wowN1NBTuZZgp3meNTBaNKTvY/exec';
    var conversation, trim_input, show_result, p, confirm_jobcode, input_confirm,
        update_jobcode, update_jobname, update_member, update_term, update_workinglocation, update_overview, 
        update_workingcontent, update_schedule, update_deadlinemanagement, update_other, update_confirm;
    conversation = new Conversation(robot)
    robot.respond(/(updatejob).*/, (res) => {
        var dialog;
        dialog = conversation.startDialog(res, 60000);
        dialog.timeout = function(res) {
            return res.emote('タイムアウトです');
        }
        // 対話形式スタート
        return confirm_jobcode(res, dialog);
    });

    // 以下、対話式ダイアログです

    p = new CurlCommand();
    // 入力値のトリムに使います
    trim_input = function(str) {
        return str.trim();
    };

    // ジョブコードの入力確認
    confirm_jobcode = function(res, dialog) {
        res.send('ジョブコードを教えてください');
        return dialog.addChoice(/(.+)/, function(res2) {
            p.jobcode = trim_input(res2.match[1]);
            var options = {
                uri: url,
                headers: {
                    "Content-Type" : "application/json"
                },
                json: true,
                followAllRedirects: true,
                body: p.getJobJson()
            };
            request.post(options, function(error, response, body){
                if (!error && response.statusCode == 200) {
                    if(body.sccess){
                        var dat = body.massage;
                        p.jobcode = dat.jobcode;
                        p.jobname = dat.jobname;
                        p.term = dat.term;
                        p.member = dat.member;
                        p.workinglocation = dat.workinglocation;
                        p.overview = dat.overview;
                        p.workingcontent = dat.workingcontent;
                        p.schedule = dat.schedule;
                        p.deadlinemanagement = dat.deadlinemanagement;
                        p.other = dat.other;
                        p.active = dat.active;
                        return input_confirm(res2, dialog);
                    }else{
                        return res.send(body.massage);
                    }
                } else {
                    return res.send('error: '+ response.statusCode);
                }
                
            });
            // p.jobcode = trim_input(res2.match[1]);
            // return update_jobname(res2, dialog);
        });
    };

    // 最終確認
    input_confirm = function(res, dialog) {
        var msg = p.confirmText() + '\n\n';
        msg += '現在の登録内容は上記の通りです。修正する項目を以下の番号から選択してください' + '\n';
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

    // ジョブコードの修正
    update_jobname = function(res, dialog) {
        res.send('ジョブ名を教えてください');
        return dialog.addChoice(/(.+)/, function(res2) {
            p.jobname = trim_input(res2.match[1]);
            return input_confirm(res2, dialog);
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

    // 契約期間の修正
    update_term = function(res, dialog) {
        res.send('契約期間を教えてください');
        return dialog.addChoice(/(.+)/, function(res2) {
            p.term = trim_input(res2.match[1]);
            return input_confirm(res2, dialog);
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

    // 概要の修正
    update_overview = function(res, dialog) {
        res.send('概要を教えてください');
        return dialog.addChoice(/(.+)/, function(res2) {
            p.overview = trim_input(res2.match[1]);
            return input_confirm(res2, dialog);
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

    // 全体スケジュールの修正
    update_schedule = function(res, dialog) {
        res.send('全体スケジュールを教えてください');
        return dialog.addChoice(/(.+)/, function(res2) {
            p.schedule = trim_input(res2.match[1]);
            return input_confirm(res2, dialog);
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

    // その他の修正
    update_other = function(res, dialog) {
        res.send('その他何かあれば教えてください');
        return dialog.addChoice(/(.+)/, function(res2) {
            p.other = trim_input(res2.match[1]);
            return input_confirm(res2, dialog);
        });
    };

    // 更新
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
            body: p.updateJobJson()
        };
        request.post(options, function(error, response, body){
            if (!error && response.statusCode == 200) {
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