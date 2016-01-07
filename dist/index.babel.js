'use strict';

// Description:
//   Show open issues from a Github repository
//
// Dependencies:
//   "githubot": "0.4.x"
//
// Configuration:
//   HUBOT_GITHUB_TOKEN
//   HUBOT_GITHUB_USER
//   HUBOT_GITHUB_REPO
//   HUBOT_GITHUB_USER_(.*)
//   HUBOT_GITHUB_API
//
// Commands:
//   hubot show [me] [<limit> [of]] [<assignee>'s|my] [<label>] issues [for <user/repo>] [about <query>] -- Shows open GitHub issues for repo.
//   hubot show [me] issues for <repo> -- List all issues for given repo IFF HUBOT_GITHUB_USER configured
//   hubot show [me] issues for <user/repo> -- List all issues for given repo
//   hubot show [me] issues -- Lists all issues IFF HUBOT_GITHUB_REPO configured
//   hubot show <chat user's> issues -- Lists all issues for chat user IFF HUBOT_GITHUB_USER_(.*) configured
// Notes:
//   If, for example, HUBOT_GITHUB_USER_JOHN is set to GitHub user login
//   'johndoe1', you can ask `show john's issues` instead of `show johndoe1's
//   issues`. This is useful for mapping chat handles to GitHub logins.
//
//   HUBOT_GITHUB_API allows you to set a custom URL path (for Github enterprise users)
//
// Author:
//   Michael Coyne (@mikeycgto)