'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _githubot = require('githubot');

var _githubot2 = _interopRequireDefault(_githubot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TOKEN = process.env.HUBOT_GITHUB_TOKEN; // Description:
//   Show open issues from a Github repository
//
// Configuration:
//   HUBOT_GITHUB_REPO
//   HUBOT_GITHUB_TOKEN
//   HUBOT_GITHUB_ISSUE_LINK_IGNORE_USERS
//
// Commands:
//   #nnn - link to Github issue nn from HUBOT_GITHUB_REPO project
//
// Dependencies:
//   "githubot": "1.0.0"
//
// Notes:
//   The HUBOT_GITHUB_TOKEN and HUBOT_GITHUB_REPO env vars are required.
//
// Author:
//   Michael Coyne (@mikeycgto)

var REPO = process.env.HUBOT_GITHUB_REPO;

var IGNORED = (process.env.HUBOT_GITHUB_ISSUE_LINK_IGNORE_USERS || '').split(',');

exports.default = function (robot) {
    if (TOKEN == undefined || REPO == undefined) {
        console.warn("Missing HUBOT_GITHUB_TOKEN and/or HUBOT_GITHUB_REPO");
        return;
    }

    var github = (0, _githubot2.default)(robot);

    robot.hear(/((\S*|^)?#(\d+)).*/, function (msg) {
        var issue = +msg.match[3];

        if (issue == undefined || isNaN(issue)) return;

        if (IGNORED.indexOf(msg.message.user.name) !== -1) return;

        github.get('repos/' + REPO + '/issues/' + issue, function (issue_resp) {
            var state = issue_resp.state || 'UNKNOWN';

            msg.send('Issue ' + issue + ': ' + issue_resp.title + ' (' + state.toUpperCase() + ' - ' + issue_resp.html_url + ')');
        });
    });
};

module.exports = exports['default'];