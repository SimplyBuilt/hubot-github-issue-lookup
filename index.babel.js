// Description:
//   Show open issues from a Github repository
//
// Configuration:
//   HUBOT_GITHUB_REPO
//   HUBOT_GITHUB_TOKEN
//
// Commands:
//   #nnn - link to Github issue nn from HUBOT_GITHUB_REPO project
//
// Notes:
//   If, for example, HUBOT_GITHUB_USER_JOHN is set to GitHub user login
//   'johndoe1', you can ask `show john's issues` instead of `show johndoe1's
//   issues`. This is useful for mapping chat handles to GitHub logins.
//
//   HUBOT_GITHUB_API allows you to set a custom URL path (for Github enterprise users)
//
// Author:
//   Michael Coyne (@mikeycgto)

const TOKEN = process.env.HUBOT_GITHUB_TOKEN;
const REPO  = process.env.HUBOT_GITHUB_REPO;

module.exports = (robot) => {
    if (TOKEN == undefined || REPO == undefined){
        console.warn("Missing HUBOT_GITHUB_TOKEN and/or HUBOT_GITHUB_REPO");
        return;
    }

    const github = require("githubot")(robot);

    robot.hear(/((\S*|^)?#(\d+)).*/, (msg) => {
        var issue = +msg.match[3];

        if (issue == undefined || isNaN(issue))
            return;

        github.get(`repos/${REPO}/issues/${issue}`, (issue_resp) => {
            var state = issue_resp.state || 'UNKNOWN';

            msg.send(`Issue ${issue}: ${issue_resp.title} (${state.toUpperCase()} - ${issue_resp.html_url})`);
        });
    });
};
