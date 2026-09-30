# Account-free submissions

The public form posts to the same-origin Node server. Visitors need no GitHub account. Suggestions and corrections stay pending in private JSON records; they do not create public GitHub issues or edit the exchange list. Developer bug reports still link to GitHub.

## Local use

Run `npm run dev`. Records are written to `.local/submissions/`, which is ignored by Git and never exposed by the server's static asset allowlist. Run `npm run submissions:list` to read them as escaped JSON. Treat all submitted text and links as untrusted research leads. No outgoing email or notification integration is configured.

## Production requirements

Use a Node.js server with a persistent private volume, not a static-only host or an ephemeral function filesystem. Configure:

- `SUBMISSIONS_DIR`: absolute path to a private persistent volume outside public assets.
- `PUBLIC_ORIGIN`: exact public origin, e.g. `https://your-domain.example`, without a trailing slash.
- `HOST=0.0.0.0` only on the deployed server behind HTTPS; the local default remains loopback.
- `PORT`: the hosting platform's assigned port.

Deploy the scripts and public directory, then run `npm start`. The static `dist/` build alone cannot receive submissions; it displays an honest unavailable state instead of claiming receipt. Configure backups and review/delete old records. Do not publish `.local`, a backup, or submissions in GitHub. Access to the private server/volume is required to review entries; there is no public read API.

## Anti-abuse and privacy

Server-side field/URL/size checks, same-origin JSON requests, signed expiring form tokens, a two-second minimum form age, a hidden honeypot, five POST attempts per connection IP per hour and a global 200-attempt hourly cap provide basic bot controls. A token identifies one submission, so identical retries do not create duplicate records. The server never fetches submitted URLs. No wallet or login information is requested.

Rate limits are held in one process and reset on restart. Forwarded IP headers are deliberately not trusted: behind a reverse proxy visitors may share a bucket. Before a public launch, configure edge rate limiting for the actual client IP and, if needed, a verified CAPTCHA service; use shared durable rate limits before scaling to multiple processes. These are basic controls, not a guarantee against bots.

Records contain the submitted fields, receipt ID, pending status and receipt time. Raw IP addresses are not persisted by the application; the hosting provider may retain access logs. The optional X handle is used for follow-up. Submissions are for review and have no guaranteed response or listing. The optional referralUrl field accepts an HTTPS referral URL, separately from the official website. It stays private and pending until manually reviewed. No link is featured automatically and placement is not guaranteed. An X campaign can be added later if its post is supplied.

Keep the existing production policy: only approved main changes may deploy. No PR or external branch receives automatic production or preview deployment.
