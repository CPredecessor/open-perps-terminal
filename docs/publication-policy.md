# Publication and community submissions

Only maintainer-approved changes may reach the live site. Public forks and pull requests must never trigger production deployments or automatic preview deployments.

## Repository controls

- Protect main: require a pull request, passing CI (validate), and code owner approval from CPredecessor for external contributions.
- Dismiss stale approvals after new commits. Disable force pushes and deletion.
- CODEOWNERS alone does not enforce approval; the repository setting must be enabled and verified.
- A sole maintainer cannot approve their own PR. Keep any necessary owner exception narrowly scoped; do not grant external contributors a bypass.
- CI for pull requests only validates. Keep contents permissions read-only and do not expose deployment credentials to pull requests.

## Hosting controls

The hosting provider and domain have not yet been selected. This repository contains no deployment workflow. Before connecting a provider, configure production to accept only main, disable automatic deployments for every other branch and fork, and verify the settings with an unapproved test PR. If an additional release gate is desired, require manual approval for the production environment.

On 30 September 2026, the main branch protection rule was enabled: one approval, required code owner review, dismissal of stale approvals, required validate check from GitHub Actions, up-to-date branches and resolved conversations. Force pushes and deletion remain disabled. The existing administrator exception is retained for the sole maintainer; do not give outside contributors administrator access. Hosting is not configured by this rule.

## Referral submissions

Official source links remain non-referral. The account-free form accepts an optional referral link alongside the official website. Submissions are private, reviewed manually and have no guaranteed placement. An X campaign is optional and requires a maintainer-supplied post URL.

Review the destination domain and referral code before listing. Clearly label any accepted link as a community referral and disclose that its owner may benefit. Keep the official non-referral alternative available. Referral submissions do not automatically enter the site, promise placement, or affect data, ranking or exchange inclusion. Decide selection and expiry rules before featuring any accepted referral links. Do not fetch or render arbitrary submitted URLs automatically.
