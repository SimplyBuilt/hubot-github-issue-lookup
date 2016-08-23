// Description:
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

import {default as GitHubot} from 'githubot';

const TOKEN = process.env.HUBOT_GITHUB_TOKEN;
const REPO  = process.env.HUBOT_GITHUB_REPO;

const IGNORED = (process.env.HUBOT_GITHUB_ISSUE_LINK_IGNORE_USERS || '').split(',');

export default (robot) => {
    if (TOKEN == undefined || REPO == undefined){
        console.warn("Missing HUBOT_GITHUB_TOKEN and/or HUBOT_GITHUB_REPO");
        return;
    }

    const github = GitHubot(robot);

    robot.hear(/((\S*|^)?#(\d+)).*/, (msg) => {
        const issue = +msg.match[3];

        if (issue == undefined || isNaN(issue))
            return;

        if (IGNORED.indexOf(msg.message.user.name) !== -1)
            return;

        github.get(`repos/${REPO}/issues/${issue}`, (issue_resp) => {
            const state = issue_resp.state || 'UNKNOWN';

            msg.send(`Issue ${issue}: ${issue_resp.title} (${state.toUpperCase()} - ${issue_resp.html_url})`);
        });
    });
};
