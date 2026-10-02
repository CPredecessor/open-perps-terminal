'use strict';
const CHECKED='2026-10-02';
const programs=[
  {
    "id": "perpl-s1",
    "name": "Perpl",
    "mark": "P",
    "season": "Monad · Season One",
    "status": "active",
    "start": "2026-06-10",
    "end": null,
    "weekly": 50000,
    "weeklyLabel": "Announced pool · Wednesdays",
    "total": null,
    "totalLabel": "No verified season total",
    "note": "Season One launched on 10 June 2026. The official rules specify a weekly pool of 50,000 Perpl Points but no season end date. Individual weekly payouts and the cumulative distributed total have not been collected.",
    "rules": "Points recognize organic trading, referrals and bonus activities; PLP participation is listed as coming soon. Referrer and referee each receive a 5% bonus on the referee's trading points. Activity is captured on Wednesdays and points are credited within 48 hours. Criteria and weights may change. Perpl Points are separate from mPoints.",
    "refs": [
      [
        "Official Season One rules",
        "https://github.com/PerplFoundation/perpl-docs/blob/main/docs/exchange/points.md"
      ],
      [
        "Perpl on Monad",
        "https://docs.perpl.xyz/"
      ],
      [
        "Network · official documentation",
        "https://docs.perpl.xyz/"
      ]
    ],
    "history": [],
    "checkedAt": "2026-10-02",
    "dateNote": "Start verified · End not announced",
    "networks": [
      "Monad"
    ],
    "networkNote": "On-chain exchange and settlement on Monad.",
    "networkCheckedAt": "2026-09-30",
    "website": "https://perpl.xyz/"
  },
  {
    "id": "sodex-s2",
    "name": "SoDEX",
    "mark": "S",
    "season": "Season 2 · Layer 1 Season",
    "status": "active",
    "start": "2026-09-01",
    "startAt": "2026-09-01T12:00:00Z",
    "end": "2027-01-19",
    "endAt": "2027-01-19T12:00:00Z",
    "officialWeeks": 20,
    "weekly": 900000,
    "weeklyLabel": "Base pool · Fridays 12:00 UTC",
    "total": null,
    "totalLabel": "Actual total not collected",
    "note": "Officially named Layer 1 Season. Starts 1 September 2026 at 12:00 UTC and lasts 20 weeks. The 19 January 2027, 12:00 UTC end is calculated from that official duration, an official duration. Weekly actual payouts have not been collected.",
    "rules": "The base weekly pool is 900,000 SoPoints. An additional 2,000,000-point weekly pool is reserved for eligible traders active during August 2026. Snapshots are Tuesdays at 12:00 UTC; distributions are Fridays at 12:00 UTC. Trading, Wealth/SLP holdings and referrals contribute to points. Bonus pools are not included in the base figure. Early-bird enrollment closed on 29 September 2026 at 12:00 UTC; previously qualified users retain the 20% boost.",
    "refs": [
      [
        "Official Layer 1 Season rules",
        "https://sodex.com/documentation/sopoints/layer-1-season"
      ],
      [
        "Network · official documentation",
        "https://sodex.com/documentation/about-sodex/how-sodex-works"
      ]
    ],
    "history": [],
    "checkedAt": "2026-10-02",
    "dateNote": "Start verified · End calculated from the official 20-week duration",
    "networks": [
      "ValueChain"
    ],
    "networkNote": "SoDEX spot and perpetual appchains run within ValueChain. External deposit networks are separate.",
    "networkCheckedAt": "2026-09-30",
    "website": "https://sodex.com/"
  },
  {
    "id": "lighter-rh",
    "name": "Lighter",
    "mark": "L",
    "season": "Robinhood Chain",
    "status": "active",
    "start": null,
    "end": null,
    "timelineDate": "2026-08-21",
    "timelineLabel": "First weekly drop",
    "termsDate": "2026-08-10",
    "weekly": 90000,
    "weeklyLabel": "Latest recorded distribution",
    "total": 330000,
    "totalLabel": "4 records · partial total",
    "note": "Four official distribution announcements are recorded here. Their sum is a partial history, not the lifetime program total. The official terms took effect on 10 August 2026. The first weekly drop was 21 August 2026; the timeline measures time since that drop, not the program launch. No end date is announced.",
    "rules": "Robinhood Chain points are tracked separately from the former Lighter Core seasons. Weekly amounts can change.",
    "refs": [
      [
        "Robinhood Chain points: first drop and effective terms",
        "https://docs.lighter.xyz/points-program/lighter-on-robinhood-chain-points"
      ],
      [
        "Official announcements",
        "https://t.me/s/lighter_announcements"
      ],
      [
        "Network · official documentation",
        "https://docs.lighter.xyz/points-program/lighter-on-robinhood-chain-points"
      ],
      [
        "Official Robinhood Chain Lighter domains",
        "https://docs.robinhood.com/chain/lighter-domains/"
      ]
    ],
    "history": [
      {
        "label": "Post #423",
        "amount": 75000,
        "url": "https://t.me/lighter_announcements/423"
      },
      {
        "label": "Post #429",
        "amount": 80000,
        "url": "https://t.me/lighter_announcements/429"
      },
      {
        "label": "Post #435",
        "amount": 85000,
        "url": "https://t.me/lighter_announcements/435"
      },
      {
        "label": "Post #441",
        "amount": 90000,
        "url": "https://t.me/lighter_announcements/441"
      }
    ],
    "checkedAt": "2026-09-29",
    "dateNote": "First weekly drop verified · Not the program launch date",
    "networks": [
      "Robinhood Chain"
    ],
    "networkNote": "This entry covers the Robinhood Chain points program.",
    "networkCheckedAt": "2026-09-30",
    "website": "https://robinhoodchain.lighter.xyz/"
  },
  {
    "id": "extended",
    "name": "Extended",
    "mark": "E",
    "season": "Points program",
    "status": "active",
    "start": null,
    "end": null,
    "weekly": 600000,
    "weeklyLabel": "Weekly cap · not a payout",
    "total": 68734321,
    "totalLabel": "Reported as of 29 Sep 2026",
    "note": "The official Telegram archive records an allocation of 2,525,260 points on 26 February 2025, covering eligible activity from 5 August 2024 to 24 February 2025. This is the earliest allocation verified in this review, not proof of the first-ever payout or the current season launch. The week counter runs from that allocation. A later third-party campaign listing dated 30 April 2025 cannot establish the overall program start. The current weekly cap is 600,000, not a guaranteed payout; the cumulative total is reported as of 29 September 2026.",
    "rules": "The program recognizes eligible trading, liquidity, referrals and other contributions. Parameters and allocations may be revised.",
    "refs": [
      [
        "Points program and cumulative total",
        "https://docs.extended.exchange/extended-resources/points-program"
      ],
      [
        "Official historical points allocation · 26 February 2025",
        "https://t.me/extended_updates/120"
      ],
      [
        "Official 600K weekly-distribution update · 7 July 2026",
        "https://t.me/extended_updates/324"
      ],
      [
        "Network · official documentation",
        "https://extended.exchange/"
      ],
      [
        "Arc migration announcement",
        "https://t.me/extended_updates/360"
      ]
    ],
    "history": [],
    "checkedAt": "2026-10-02",
    "dateNote": "26 Feb 2025 allocation verified · Not a season launch",
    "weeklyQualifier": "≤",
    "timelineDate": "2025-02-26",
    "timelineLabel": "Earliest verified allocation",
    "weekSuffix": "since verified allocation",
    "networks": [
      "Starknet"
    ],
    "networkNote": "The website still describes Starknet settlement. Migration to Arc has been announced; completion and timing are not confirmed in the reviewed sources.",
    "networkCheckedAt": "2026-09-30",
    "website": "https://extended.exchange/"
  },
  {
    "id": "paradex-s3",
    "name": "Paradex",
    "mark": "P",
    "season": "Season 3 · XP",
    "status": "active",
    "start": "2026-02-01",
    "end": null,
    "weekly": 4000000,
    "weeklyLabel": "Announced pool · Wednesdays",
    "total": null,
    "totalLabel": "No verified season total",
    "note": "Season 3 began on 1 February 2026. The end date is TBD. The base weekly pool is 4 million XP; affiliate bonuses are additional. The displayed estimated total uses the current pool across elapsed full weeks; it is not a verified payout sum.",
    "rules": "XP rewards contributions to the exchange. The documentation says further Season 3 earning mechanics will be published.",
    "refs": [
      [
        "Season dates and XP pools",
        "https://docs.paradex.trade/docs/xp-referrals/xp"
      ],
      [
        "Network · official documentation",
        "https://docs.paradex.trade/home"
      ]
    ],
    "history": [],
    "checkedAt": "2026-10-02",
    "dateNote": "Start verified · Official end is TBD",
    "networks": [
      "Paradex Chain"
    ],
    "networkNote": "Dedicated appchain on Starknet.",
    "networkCheckedAt": "2026-09-30",
    "website": "https://paradex.trade/"
  },
  {
    "id": "pacifica",
    "name": "Pacifica",
    "mark": "≈",
    "season": "Points program",
    "status": "active",
    "start": "2025-09-04",
    "end": null,
    "weekly": 10000000,
    "weeklyLabel": "Announced weekly pool · Thursdays",
    "total": null,
    "totalLabel": "Not verified",
    "note": "Official rules specify Thursday, 4 September at 00:00 UTC. The year 2025 is corroborated by the dated CoinLaunch campaign record and the project history: Pacifica was founded in January 2025, and 4 September 2025 was a Thursday. The weekly count is elapsed calendar time, not an official epoch number. The exact end is unannounced.",
    "rules": "Snapshots occur Thursdays at 00:00 UTC and points arrive within 24 hours. Only eligible organic activity counts.",
    "refs": [
      [
        "Current official points rules",
        "https://docs.pacifica.fi/programs/points-program"
      ],
      [
        "Campaign record corroborating 4 September 2025",
        "https://coinlaunch.space/events-contests/pacifica-retrodrop/"
      ],
      [
        "Official company history",
        "https://docs.pacifica.fi/about-pacifica/team"
      ],
      [
        "Network · official documentation",
        "https://docs.pacifica.fi/pacifica/readme"
      ]
    ],
    "history": [],
    "dateNote": "Official day/time · 2025 corroborated by campaign records",
    "checkedAt": "2026-10-02",
    "startAt": "2025-09-04T00:00:00Z",
    "networks": [
      "Solana"
    ],
    "networkNote": "Perpetual exchange on Solana.",
    "networkCheckedAt": "2026-09-30",
    "website": "https://www.pacifica.fi/"
  },
  {
    "id": "paradex-s2",
    "name": "Paradex",
    "mark": "P",
    "season": "Season 2 · XP",
    "status": "ended",
    "start": "2025-01-03",
    "end": "2026-01-29",
    "weekly": null,
    "weeklyLabel": "Historical pool not recorded",
    "total": 236000000,
    "totalLabel": "Approximate official total",
    "approx": true,
    "note": "The official XP documentation lists Season 2 from 3 January 2025 through 29 January 2026, with approximately 236 million XP distributed. Individual weekly amounts are not in this dataset.",
    "rules": "An archived season. The completion bar represents elapsed program time, not token claims or reward eligibility.",
    "refs": [
      [
        "Previous seasons",
        "https://docs.paradex.trade/docs/xp-referrals/xp"
      ],
      [
        "Network · official documentation",
        "https://docs.paradex.trade/home"
      ]
    ],
    "history": [],
    "checkedAt": "2026-10-02",
    "dateNote": "Start and end explicitly verified",
    "networks": [
      "Paradex Chain"
    ],
    "networkNote": "Dedicated appchain on Starknet.",
    "networkCheckedAt": "2026-09-30",
    "website": "https://paradex.trade/"
  },
  {
    "start": "2025-12-17",
    "end": null,
    "weekly": null,
    "total": null,
    "totalLabel": "No verified season total",
    "history": [],
    "id": "variational",
    "name": "Variational",
    "mark": "V",
    "season": "Omni · Points",
    "status": "active",
    "endDeadline": "2026-12-31",
    "weeklyLabel": "Variable pool · Fridays 00:00 UTC",
    "note": "The current documentation sets an end no later than Q4 2026. This supersedes older Q3 references and is a latest-end window, not a confirmed closing day. The 3 million retroactive launch points are not a lifetime total.",
    "rules": "Weekly allocations use eligible platform activity. The launch distribution covered activity through 11 December 2025.",
    "dateNote": "Start verified · Latest end: Q4 2026; exact day unannounced",
    "refs": [
      [
        "Current launch date and end window",
        "https://docs.variational.io/omni/rewards/points"
      ],
      [
        "Network · official documentation",
        "https://docs.variational.io/omni/getting-started-with-omni"
      ]
    ],
    "checkedAt": "2026-10-02",
    "networks": [
      "Arbitrum One"
    ],
    "networkNote": "Omni settlement pools are deployed on Arbitrum One.",
    "networkCheckedAt": "2026-09-30",
    "website": "https://www.variational.io/"
  },
  {
    "start": null,
    "end": null,
    "weekly": null,
    "total": null,
    "totalLabel": "No verified season total",
    "history": [],
    "id": "ethereal",
    "name": "Ethereal",
    "mark": "E",
    "season": "Trading points",
    "status": "review",
    "weeklyLabel": "Markets closed · points status under review",
    "note": "The live Ethereal app states that its markets have closed and users should withdraw remaining funds and transition to Meridian. The older points documentation remains online. It is not evidence of an active program; an exact points-season end has not been verified.",
    "rules": "Historical documentation described trading rewards, Wednesday snapshots and Friday distributions. These rules are not treated as currently active after the market closure notice.",
    "dateNote": "Markets closed · Exact points end not verified",
    "refs": [
      [
        "Live market closure notice",
        "https://app.ethereal.trade/"
      ],
      [
        "Current rewards and points rules",
        "https://docs.ethereal.trade/points/rewards-and-points"
      ],
      [
        "Network · official documentation",
        "https://docs.ethereal.trade/"
      ]
    ],
    "checkedAt": "2026-09-29",
    "networks": [
      "Ethereal Chain"
    ],
    "networkNote": "Historical venue appchain with settlement via Arbitrum One. Markets are closed; see program status.",
    "networkCheckedAt": "2026-09-30",
    "website": "https://app.ethereal.trade/"
  },
  {
    "start": null,
    "end": null,
    "weekly": null,
    "total": null,
    "totalLabel": "No verified season total",
    "history": [],
    "id": "bulk-challenger",
    "name": "BULK",
    "mark": "B",
    "season": "Challenger Series · Ranked Aura",
    "status": "upcoming",
    "weeklyLabel": "Ranked Aura · no fixed pool published",
    "note": "The official Challenger Series FAQ says Season 1 will be announced soon. A 26 September 2026 announcement reproduced by PolyMart also describes Season 1 as upcoming, despite an earlier 22 September post advertising the Series for 26 September. The announcement date is therefore not used as a confirmed season start. Earlier AURA and pre-deposit balances are separate from the league ranking. This entry is moved to Upcoming until a season launch is confirmed.",
    "rules": "Trading earns Ranked Aura. Rankings change weekly through promotion and demotion; Challenger ranks participate in playoffs.",
    "dateNote": "Challenger Series announced · Season 1 start pending",
    "refs": [
      [
        "Challenger Series rules",
        "https://docs.bulk.trade/bulk-exchange/points"
      ],
      [
        "Announcement archive · distinguishes Series announcement from Season 1 launch",
        "https://polymart.app/airdrop/bulk-trade"
      ],
      [
        "Network · official documentation",
        "https://docs.bulk.trade/architecture/overview"
      ]
    ],
    "checkedAt": "2026-10-02",
    "pointsConfirmed": true,
    "startText": "Season launch not confirmed",
    "networks": [
      "BULK Net",
      "Solana"
    ],
    "networkNote": "BULK Net handles execution; Solana handles asset custody and deposit/withdrawal settlement.",
    "networkCheckedAt": "2026-09-30",
    "website": "https://www.bulk.trade/"
  },
  {
    "start": null,
    "end": null,
    "weekly": 1000000,
    "total": null,
    "totalLabel": "No verified season total",
    "history": [],
    "id": "hibachi",
    "name": "Hibachi",
    "mark": "H",
    "season": "Hibachi Points · overall program",
    "status": "active",
    "weeklyLabel": "Epoch pool · Mondays 03:00 UTC",
    "note": "Contemporaneous reporting published on 3 March 2025 announced the Hibachi Points launch for that day. The original official launch post was not independently retrieved, so the date is labeled Reported program launch. The week counter covers the overall program, not the current season or FX campaign. Current official rules confirm activity for the 28 September–5 October 2026 bonus window, which is not a season boundary. Exact current-season start and program end remain unverified.",
    "rules": "Seven-day epochs distribute one million points. Activity and referrals affect allocations; separate postseason vault mechanics should not be treated as the same season. For 28 September–5 October 2026, per-pair FX volume thresholds of $100K/$200K/$400K/$1M earn 1.05/1.10/1.20/1.30x on EURUSD, GBPUSD, AUDUSD and NZDUSD; CADUSD and JPYUSD use 1.05/1.10/1.25/1.50x. The highest qualifying multiplier applies to eligible weekly activity; thresholds reset weekly.",
    "dateNote": "3 Mar 2025 reported launch · Secondary source",
    "refs": [
      [
        "Current points rules and dated FX window",
        "https://docs.hibachi.xyz/hibachi-rewards/hibachi-points"
      ],
      [
        "Contemporaneous launch report · 3 March 2025 (secondary)",
        "https://www.odaily.news/post/5202064"
      ],
      [
        "Network · official documentation",
        "https://docs.hibachi.xyz/hibachi-docs/getting-started/signing-up"
      ]
    ],
    "checkedAt": "2026-10-02",
    "timelineDate": "2025-03-03",
    "timelineLabel": "Reported program launch",
    "weekSuffix": "since reported launch",
    "networks": [
      "Arbitrum",
      "Base",
      "Arc"
    ],
    "networkNote": "Supported collateral contract networks: USDT on Arbitrum, USDC on Base and Arc. Settlement movements use zk verification.",
    "networkCheckedAt": "2026-09-30",
    "website": "https://hibachi.xyz/"
  },
  {
    "start": "2026-05-21",
    "end": null,
    "weekly": 300000,
    "total": null,
    "totalLabel": "No verified season total",
    "history": [],
    "id": "nado-s2",
    "name": "Nado",
    "mark": "N",
    "season": "Ink · Season 2",
    "status": "active",
    "weeklyMax": 950000,
    "weeklyLabel": "Volume-linked floor–cap · not actual payout",
    "note": "Season 2 began on 21 May 2026. No exact end date is stated. The weekly pool varies with volume between 300,000 and 950,000 points.",
    "rules": "Season 2 replaced the fixed weekly pool with volume-linked emissions. Existing points and trader history carry forward.",
    "dateNote": "Start verified · End not announced",
    "refs": [
      [
        "Season 2 official launch and pool",
        "https://docs.nado.xyz/incentives-and-rewards/points/season-2-live"
      ],
      [
        "Network · official documentation",
        "https://docs.nado.xyz/"
      ]
    ],
    "checkedAt": "2026-09-29",
    "networks": [
      "Ink"
    ],
    "networkNote": "Order matching uses an off-chain sequencer; risk and settlement run on Ink L2.",
    "networkCheckedAt": "2026-09-30",
    "website": "https://www.nado.xyz/"
  },
  {
    "start": "2026-01-30",
    "end": "2026-05-21",
    "weekly": 950000,
    "total": null,
    "totalLabel": "No verified season total",
    "history": [],
    "id": "nado-s1",
    "name": "Nado",
    "mark": "N",
    "season": "Ink · Season 1",
    "status": "ended",
    "weeklyLabel": "Historical weekly pool · Fridays",
    "note": "Season 1 ended on 21 May; its last payout was on 22 May. The year is established by the Season 2 launch page. The reported 24,941,776 cumulative points also include Private Alpha and Off-Season, so they are not shown as a Season 1-only total.",
    "rules": "Weekly snapshots occurred on Thursdays with distributions on Fridays. Trading, NLP and referrals were eligible.",
    "dateNote": "Dates cross-checked · Final payout: 22 May 2026",
    "refs": [
      [
        "Season 1 start, end and final payout",
        "https://docs.nado.xyz/incentives-and-rewards/points/season-1"
      ],
      [
        "Season 2 launch confirms 2026",
        "https://docs.nado.xyz/incentives-and-rewards/points/season-2-live"
      ],
      [
        "Network · official documentation",
        "https://docs.nado.xyz/"
      ]
    ],
    "checkedAt": "2026-09-29",
    "networks": [
      "Ink"
    ],
    "networkNote": "Order matching uses an off-chain sequencer; risk and settlement run on Ink L2.",
    "networkCheckedAt": "2026-09-30",
    "website": "https://www.nado.xyz/"
  },
  {
    "start": "2025-03-31",
    "end": null,
    "weekly": 500000,
    "total": null,
    "totalLabel": "No verified season total",
    "history": [],
    "id": "ostium",
    "name": "Ostium",
    "mark": "O",
    "season": "Points program · across seasons",
    "status": "active",
    "startAt": "2025-03-31T14:00:00Z",
    "weeklyQualifier": "≥",
    "weeklyLabel": "Announced weekly minimum · not actual payout",
    "note": "This timeline begins at the overall points-program launch, not the start of Season 2. The official post was updated to describe Season 2 but does not specify its exact launch or the overall end. Ten million launch points were retroactive, not a current cumulative total.",
    "rules": "Trading, liquidity provision and referrals contribute to weekly points. The launch announcement specifies a minimum weekly allocation, subject to program changes.",
    "dateNote": "Overall launch verified · Season 2 start and program end unknown",
    "refs": [
      [
        "Program launch and Season 2 update",
        "https://www.ostium.com/blog/introducing-the-ostium-points-program"
      ],
      [
        "Network · official documentation",
        "https://www.ostium.com/"
      ]
    ],
    "checkedAt": "2026-09-29",
    "networks": [
      "Arbitrum"
    ],
    "networkNote": "Positions are collateralized and settled in USDC on Arbitrum.",
    "networkCheckedAt": "2026-09-30",
    "website": "https://www.ostium.com/"
  },
  {
    "start": "2025-11-24",
    "end": null,
    "weekly": null,
    "total": null,
    "totalLabel": "No verified season total",
    "history": [],
    "id": "standx-mainnet",
    "name": "StandX",
    "mark": "S",
    "season": "Mainnet points",
    "status": "active",
    "weeklyLabel": "Activity-based · no weekly pool verified",
    "note": "The official launch article body states 24 November 2025 and says Mainnet Holder Points began with that transition. Its publication header says 23 November; the event date in the body is used. No exact closing date is given.",
    "rules": "Holder, trader, maker and referral points have distinct mechanics. Historical launch rates are not assumed to remain current.",
    "dateNote": "Event date from article body · Publication date differs by one day",
    "refs": [
      [
        "Mainnet points launch",
        "https://docs.standx.com/blog/articles/standx-mainnet-now-live-trade-for-real"
      ],
      [
        "Current point categories",
        "https://docs.standx.com/docs/standx-perps-solutions/network-yield"
      ],
      [
        "Network · official documentation",
        "https://docs.standx.com/"
      ]
    ],
    "checkedAt": "2026-10-02",
    "networks": [
      "BNB Chain",
      "Solana"
    ],
    "networkNote": "Official documentation lists mainnet on BNB Chain and Solana.",
    "networkCheckedAt": "2026-09-30",
    "website": "https://standx.com/"
  },
  {
    "status": "active",
    "start": "2026-10-01",
    "end": null,
    "weekly": null,
    "total": null,
    "weeklyLabel": "Wednesdays 3 PM EST · Pool undisclosed",
    "totalLabel": "No verified Season 1 total",
    "history": [],
    "checkedAt": "2026-10-02",
    "dateNote": "Season 1 start verified · End not announced",
    "id": "arcus-upcoming",
    "name": "Arcus",
    "mark": "A",
    "season": "Season 1 · Invite-only access",
    "note": "Season 1 began on 1 October 2026. Season 0 covered private-beta activity from 1 July through 30 September; its allocation was distributed but point amounts will be revealed near the program end. No Season 1 end date or fixed weekly pool is published.",
    "rules": "Weekly distribution: Wednesdays at 3 PM EST, as stated by Arcus. Trading, market making, retained collateral and referrals contribute. RWA trading and activity outside regular US market hours receive boosts; eligible Robinhood Wallet spot swaps also receive a spot-specific boost. Multipliers can change. New traders need an invite code; existing users keep access. Each $1M of qualifying own and directly referred perp volume earns a code. Invite codes also establish referrals, subject to existing referral attribution.",
    "refs": [
      [
        "Season 1 launch · 1 October 2026",
        "https://arcus.xyz/blog/introducing-arcus-points"
      ],
      [
        "Invite access and referrals",
        "https://arcus.xyz/blog/arcus-invite-codes-are-live"
      ],
      [
        "Official Arcus site and beta FAQ",
        "https://arcus.xyz/"
      ],
      [
        "Official announcements",
        "https://arcus.xyz/blog"
      ],
      [
        "Official help center",
        "https://help.arcus.xyz/"
      ],
      [
        "Network · official documentation",
        "https://arcus.xyz/"
      ]
    ],
    "pointsConfirmed": true,
    "networks": [
      "Robinhood Chain"
    ],
    "networkNote": "Spot and perpetual exchange on Robinhood Chain.",
    "networkCheckedAt": "2026-10-02",
    "website": "https://app.arcus.xyz/"
  },
  {
    "status": "upcoming",
    "start": null,
    "end": null,
    "weekly": null,
    "total": null,
    "weeklyLabel": "No points rules verified",
    "totalLabel": "No points distributions verified",
    "history": [],
    "checkedAt": "2026-10-02",
    "startText": "Not announced / unverified",
    "dateNote": "Points dates unconfirmed · Exchange launch is not a points launch",
    "id": "noether-upcoming",
    "name": "Noether",
    "mark": "N",
    "season": "Stellar · Testnet",
    "note": "Official documentation describes a Stellar testnet perpetual exchange with mainnet planned but not live. No points program or points calendar was established from the reviewed introduction. Included for discovery while incentive details remain unconfirmed.",
    "rules": "Testnet uses test funds. Testnet participation is not evidence of points eligibility or a future reward. Mainnet timing and any points start or end remain unverified.",
    "refs": [
      [
        "Official introduction and network status",
        "https://docs.noether.exchange/"
      ],
      [
        "Network · official documentation",
        "https://docs.noether.exchange/"
      ]
    ],
    "pointsConfirmed": false,
    "networks": [
      "Stellar · Testnet"
    ],
    "networkNote": "Runs on Stellar testnet using Soroban. Mainnet is planned.",
    "networkCheckedAt": "2026-09-30",
    "website": "https://noether.exchange/"
  },
  {
    "status": "active",
    "start": null,
    "end": null,
    "weekly": null,
    "weeklyLabel": "Weekly pool not published",
    "total": null,
    "totalLabel": "No verified season total",
    "history": [],
    "checkedAt": "2026-10-02",
    "networkCheckedAt": "2026-09-30",
    "dateNote": "Mainnet points anchor · Season 1 start not independently verified · End unknown",
    "id": "decibel-s1",
    "name": "Decibel",
    "mark": "D",
    "season": "Season 1 · Launch Liquidity · AMP",
    "timelineDate": "2026-02-26",
    "timelineLabel": "Mainnet points launch",
    "weekSuffix": "since mainnet points launch",
    "networks": [
      "Aptos"
    ],
    "networkNote": "Fully on-chain exchange on Aptos.",
    "note": "The points dashboard lists Season 1 Launch Liquidity. The week counter is anchored to mainnet launch with points on 26 February 2026, not an independently verified Season 1 start.",
    "rules": "AMP includes trading, referral and DLP vault activity. A fixed weekly pool and exact current-season end were not verified.",
    "refs": [
      [
        "Official points dashboard",
        "https://app.decibel.trade/points"
      ],
      [
        "Official launch announcements",
        "https://app.decibel.trade/announcements"
      ],
      [
        "Decibel · Aptos",
        "https://decibel.trade/"
      ]
    ],
    "website": "https://decibel.trade/"
  },
  {
    "status": "review",
    "start": "2026-02-03",
    "end": null,
    "weekly": 500000,
    "weeklyLabel": "Previously announced pool · recheck",
    "total": null,
    "totalLabel": "Ongoing distributions not verified",
    "history": [],
    "checkedAt": "2026-09-30",
    "networkCheckedAt": "2026-09-30",
    "dateNote": "Official site announces sunset · Exact points end not verified",
    "id": "ventuals-trading",
    "name": "Ventuals",
    "mark": "V",
    "season": "Trading points",
    "networks": [
      "Hyperliquid"
    ],
    "networkNote": "HIP-3 markets on Hyperliquid; eligible trading also includes markets accessed through the Ventuals frontend.",
    "note": "The official website now displays “Ventuals is sunsetting”. The older points documentation still describes a trading pool; ongoing distributions and the exact points end require re-verification.",
    "rules": "Eligible activity includes vntl markets through any frontend and eligible Hyperliquid/HIP-3 trading through Ventuals. Estimated totals exclude launch bonuses and do not reconstruct historical distributions.",
    "refs": [
      [
        "Official trading points rules",
        "https://docs.ventuals.com/trading/points"
      ],
      [
        "Official website · sunset notice",
        "https://ventuals.com/"
      ]
    ],
    "website": "https://ventuals.com/"
  },
  {
    "status": "active",
    "start": null,
    "end": null,
    "weekly": null,
    "weeklyLabel": "Weekly pool not published",
    "total": null,
    "totalLabel": "No verified season total",
    "history": [],
    "checkedAt": "2026-10-02",
    "networkCheckedAt": "2026-09-30",
    "dateNote": "Stage 6 · Exact start and end not verified",
    "id": "aster-stage6",
    "name": "Aster",
    "mark": "A",
    "season": "Convergence · Stage 6",
    "networks": [
      "Aster Chain"
    ],
    "networkNote": "Aster documentation describes execution on its own L1, Aster Chain. Deposit networks are separate from execution.",
    "note": "Current Stage 6 only. Exact start and end were not verified in the reviewed official rules; earlier completed stages are not included.",
    "rules": "Weekly epochs run Monday 00:00 UTC through Sunday 23:59 UTC. Points depend on eligible trading, positions, assets, liquidation and PnL with team and referral factors. No fixed weekly pool was verified.",
    "refs": [
      [
        "Official Stage 6 rules",
        "https://docs.asterdex.com/program-and-rewards/points-and-campaigns/aster-convergence-stage-6"
      ],
      [
        "Aster execution network",
        "https://docs.asterdex.com/"
      ]
    ],
    "website": "https://www.asterdex.com/en"
  },
  {
    "status": "active",
    "start": null,
    "end": null,
    "weekly": null,
    "weeklyLabel": "Variable token rewards · not points",
    "total": null,
    "totalLabel": "Token rewards · not a points total",
    "history": [],
    "checkedAt": "2026-10-02",
    "networkCheckedAt": "2026-09-30",
    "dateNote": "End not announced",
    "id": "gmx-trading-rewards",
    "name": "GMX",
    "mark": "G",
    "season": "Trading rewards · esGMX + GT",
    "programType": "rewards",
    "startText": "Not applicable · weekly epochs",
    "endText": "No program end announced",
    "networks": [
      "Arbitrum"
    ],
    "networkNote": "This trading rewards program is scoped to Arbitrum. GMX also operates on other networks.",
    "note": "This is a trading rewards program, not a points season. Eligible Arbitrum trading can earn esGMX and GT.",
    "rules": "Weekly epochs begin Wednesday 00:00 UTC. Rewards depend on eligible position fees and reward multipliers. GT is pre-TGE; do not interpret it as a liquid token payout.",
    "refs": [
      [
        "Official GMX rewards program",
        "https://docs.gmx.io/docs/rewards-program/"
      ]
    ],
    "website": "https://gmx.io/"
  },
  {
    "status": "no-points",
    "start": null,
    "end": null,
    "weekly": null,
    "weeklyLabel": "No points program confirmed",
    "total": null,
    "totalLabel": "No points program confirmed",
    "history": [],
    "checkedAt": "2026-10-02",
    "networkCheckedAt": "2026-09-30",
    "dateNote": "End not announced",
    "id": "tradexyz-live",
    "name": "tradeXYZ",
    "mark": "X",
    "season": "Live venue · HIP-3 perps",
    "pointsConfirmed": false,
    "startText": "No points start confirmed",
    "endText": "No points end confirmed",
    "networks": [
      "Hyperliquid"
    ],
    "networkNote": "HIP-3 perpetual market deployer and trading frontend on Hyperliquid.",
    "note": "The venue is live. A points program was not confirmed in the reviewed public documentation; this does not promise future rewards.",
    "rules": "TradeXYZ provides access to perpetual markets on Hyperliquid. Venue availability is separate from points eligibility.",
    "refs": [
      [
        "Official tradeXYZ documentation",
        "https://docs.trade.xyz/"
      ]
    ],
    "website": "https://trade.xyz/"
  }
];
// Curated snapshots; capture date is not the provider observation timestamp.
const venueMetrics={
  "Perpl": {
    "slug": "perpl",
    "volume": 15280000,
    "oi": 1672928,
    "funding": 9250000,
    "fundingLabel": "Disclosed round",
    "fundingSource": "https://blockworks.com/news/perpl-perpetuals-raise-funding-dragonfly-testnet",
    "fundingNote": "Round announced 13 May 2025.",
    "checkedAt": "2026-10-02",
    "volumePageDate": "2026-10-02",
    "scope": "Exchange perpetuals",
    "marketSource": "https://defillama.com/protocol/perpl",
    "fundingCheckedAt": "2026-09-29"
  },
  "SoDEX": {
    "slug": "sodex-perps",
    "volume": 761090000,
    "oi": 116586287,
    "funding": null,
    "fundingLabel": "Not disclosed",
    "fundingSource": null,
    "fundingNote": "No standalone SoDEX raise verified; parent-company fundraising is not assigned to this exchange.",
    "checkedAt": "2026-10-02",
    "volumePageDate": "2026-10-02",
    "scope": "Exchange perpetuals",
    "marketSource": "https://defillama.com/protocol/sodex-perps",
    "fundingCheckedAt": "2026-09-29"
  },
  "Lighter": {
    "slug": "lighter-robinhood-perps",
    "volume": 587120000,
    "oi": 228731251,
    "funding": 68000000,
    "fundingLabel": "Series B only",
    "fundingSource": "https://www.wsgr.com/en/people/rob-broderick.html",
    "fundingNote": "Legal adviser lists a $68M Series B. This is one company round, not cumulative funding or funding specific to Robinhood Chain.",
    "checkedAt": "2026-10-02",
    "volumePageDate": "2026-10-02",
    "scope": "Robinhood Chain perps only",
    "marketSource": "https://defillama.com/protocol/lighter-robinhood-perps",
    "fundingCheckedAt": "2026-09-29"
  },
  "Extended": {
    "slug": "extended-perps",
    "volume": 258910000,
    "oi": 93659970,
    "funding": 12500000,
    "fundingLabel": "Latest verified round",
    "fundingSource": "https://www.theblock.co/news/deals/2026-07-02-etoro-leads-12-5-million-round-in-onchain-perps-exchange-extended-407093",
    "fundingNote": "Strategic round, 2 July 2026. Earlier rounds are not included.",
    "checkedAt": "2026-10-02",
    "volumePageDate": "2026-10-02",
    "scope": "Exchange perpetuals",
    "marketSource": "https://defillama.com/protocol/extended-perps",
    "fundingCheckedAt": "2026-09-29"
  },
  "Paradex": {
    "slug": "paradex-perps",
    "volume": 15930000,
    "oi": 9220010,
    "funding": null,
    "fundingLabel": "Incubated",
    "fundingSource": "https://paradex.trade/blog/introducing-dime-the-native-token-of-the-paradex-network",
    "fundingNote": "Incubated by Paradigm. No standalone external funding amount verified; parent funding is excluded.",
    "checkedAt": "2026-10-02",
    "volumePageDate": "2026-10-02",
    "scope": "Perpetuals only · options excluded",
    "marketSource": "https://defillama.com/protocol/paradex-perps",
    "fundingCheckedAt": "2026-09-29"
  },
  "Pacifica": {
    "slug": "pacifica-perps",
    "volume": 434650000,
    "oi": 63505377,
    "funding": null,
    "fundingLabel": "Self-funded",
    "fundingSource": "https://docs.pacifica.fi/about-pacifica/team",
    "fundingNote": "The team describes Pacifica as self-funded without external capital.",
    "checkedAt": "2026-10-02",
    "volumePageDate": "2026-10-02",
    "scope": "Exchange perpetuals",
    "marketSource": "https://defillama.com/protocol/pacifica-perps",
    "fundingCheckedAt": "2026-09-29"
  },
  "Variational": {
    "slug": "variational",
    "volume": 2881000000,
    "oi": 1068814441,
    "funding": 61800000,
    "fundingLabel": "Reported total",
    "fundingSource": "https://defillama.com/protocol/variational",
    "fundingNote": "DefiLlama records $10.3M in October 2024, $1.5M in June 2025 and $50M Series A in May 2026, totaling $61.8M.",
    "checkedAt": "2026-10-02",
    "volumePageDate": "2026-10-02",
    "scope": "Exchange perpetuals",
    "marketSource": "https://defillama.com/protocol/variational",
    "fundingCheckedAt": "2026-09-29"
  },
  "BULK": {
    "slug": "bulk",
    "volume": 33550000,
    "oi": 7900235,
    "funding": 8000000,
    "fundingLabel": "Seed round",
    "fundingSource": "https://www.linkedin.com/posts/bulk-trade_bulk-is-bringing-the-ultimate-trading-experience-activity-7386104328484392961-osgm",
    "fundingNote": "Company announcement of an $8M seed round.",
    "checkedAt": "2026-10-02",
    "volumePageDate": "2026-10-02",
    "scope": "Exchange perpetuals",
    "marketSource": "https://defillama.com/protocol/bulk",
    "fundingCheckedAt": "2026-09-29"
  },
  "Hibachi": {
    "slug": "hibachi",
    "volume": 26370000,
    "oi": 1301564,
    "funding": 8000000,
    "fundingLabel": "Reported total",
    "fundingSource": "https://defillama.com/protocol/hibachi",
    "fundingNote": "DefiLlama lists $5M in March 2025 and $3M in February 2026.",
    "checkedAt": "2026-10-02",
    "volumePageDate": "2026-10-02",
    "scope": "Exchange perpetuals",
    "marketSource": "https://defillama.com/protocol/hibachi",
    "fundingCheckedAt": "2026-09-29"
  },
  "Nado": {
    "slug": "nado-perps",
    "volume": 332050000,
    "oi": 43437328,
    "funding": null,
    "fundingLabel": "Not disclosed",
    "fundingSource": null,
    "fundingNote": "No standalone funding amount verified.",
    "checkedAt": "2026-10-02",
    "volumePageDate": "2026-10-02",
    "scope": "Exchange perpetuals",
    "marketSource": "https://defillama.com/protocol/nado-perps",
    "fundingCheckedAt": "2026-09-29"
  },
  "Ostium": {
    "slug": "ostium",
    "volume": 14790000,
    "oi": 10298257,
    "funding": 27800000,
    "fundingLabel": "Disclosed total",
    "fundingSource": "https://www.ostium.com/blog/ostium-labs-raises-24m-co-led-by-general-catalyst-and-jump-crypto",
    "fundingNote": "Official 3 December 2025 announcement gives $27.8M cumulative funding, including $24M of new funding.",
    "checkedAt": "2026-10-02",
    "volumePageDate": "2026-10-02",
    "scope": "Exchange perpetuals",
    "marketSource": "https://defillama.com/protocol/ostium",
    "fundingCheckedAt": "2026-09-29"
  },
  "StandX": {
    "slug": "standx-perps",
    "volume": 402960000,
    "oi": 22050243,
    "funding": null,
    "fundingLabel": "Self-funded",
    "fundingSource": "https://docs.standx.com/",
    "fundingNote": "Official documentation states the project is fully self-funded.",
    "checkedAt": "2026-10-02",
    "volumePageDate": "2026-10-02",
    "scope": "Exchange perpetuals",
    "marketSource": "https://defillama.com/protocol/standx-perps",
    "fundingCheckedAt": "2026-09-29"
  },
  "Decibel": {
    "slug": "decibel",
    "funding": null,
    "fundingLabel": "Not verified",
    "fundingSource": null,
    "fundingNote": "No standalone funding total verified in this refresh.",
    "scope": "Exchange perpetuals",
    "marketSource": "https://defillama.com/protocol/decibel",
    "fundingCheckedAt": "2026-10-02",
    "volume": 41550000,
    "oi": 4319527,
    "checkedAt": "2026-10-02",
    "volumePageDate": "2026-10-02"
  },
  "Aster": {
    "slug": "aster-perps",
    "funding": null,
    "fundingLabel": "Not verified",
    "fundingSource": null,
    "fundingNote": "No standalone funding total verified in this refresh.",
    "scope": "Exchange perpetuals",
    "marketSource": "https://defillama.com/protocol/aster-perps",
    "fundingCheckedAt": "2026-10-02",
    "volume": 2003000000,
    "oi": 1408768599,
    "checkedAt": "2026-10-02",
    "volumePageDate": "2026-10-02"
  },
  "tradeXYZ": {
    "slug": "tradexyz",
    "funding": null,
    "fundingLabel": "Not verified",
    "fundingSource": null,
    "fundingNote": "No standalone funding total verified in this refresh.",
    "scope": "XYZ perpetual markets on Hyperliquid (excludes other deployers)",
    "marketSource": "https://defillama.com/protocol/tradexyz",
    "fundingCheckedAt": "2026-10-02",
    "volume": 2055000000,
    "oi": 3857821555,
    "checkedAt": "2026-10-02",
    "volumePageDate": "2026-10-02"
  },
  "Arcus": {
    "slug": "arcus-perps",
    "funding": null,
    "fundingLabel": "Not verified",
    "fundingSource": null,
    "fundingNote": "No standalone funding total verified in this refresh.",
    "scope": "Robinhood Chain perpetuals (excludes spot)",
    "marketSource": "https://defillama.com/protocol/arcus-perps",
    "fundingCheckedAt": "2026-10-02",
    "volume": 487930000,
    "oi": 46281569,
    "checkedAt": "2026-10-02",
    "volumePageDate": "2026-10-02"
  }
};
const traderMetrics={
  "Nado": {
    "value": 1250,
    "approx": true,
    "period": "24h · reported",
    "checkedAt": "2026-09-30",
    "scope": "Exchange-wide · spot + perps",
    "source": "https://stats.nado.xyz/",
    "sourceLabel": "Nado · official stats",
    "note": "The official dashboard shows 1.25K under 24h Traders and describes the series as daily active traders. This is a rounded venue-wide count, not a verified perp-only count or a count of unique people. The API documents daily active users and subaccounts; cross-subaccount wallet deduplication and exact window boundaries are not specified. Historical counts update at 9 AM ET; current-day counts update hourly.",
    "definitionSource": "https://docs.nado.xyz/developer-resources/api/archive-indexer/market-snapshots"
  },
  "Ostium": {
    "value": 77,
    "approx": false,
    "period": "Daily · 29 Sep 2026",
    "checkedAt": "2026-09-30",
    "scope": "Ostium · daily traders",
    "source": "https://metadata-backend.prod.bedrock.ostium.io/api/metrics/daily-traders",
    "sourceLabel": "Ostium · daily-traders API",
    "note": "Latest completed date returned by the official daily-traders endpoint: 2026-09-29. users_daily = 77 (1 new + 76 recurring). The in-progress 30 September record is excluded. This is the provider’s daily trader count; unique-person deduplication and day timezone are not documented. The official Dune query reads this API directly.",
    "definitionSource": "https://dune.com/queries/7588500"
  },
  "Variational": {
    "value": null,
    "checkedAt": "2026-09-30",
    "source": "https://variational.entropyadvisors.com/",
    "sourceLabel": "Entropy Advisors · linked by Variational",
    "note": "The dashboard defines Active Accounts as accounts with any inflow or outflow. That is an account-activity proxy and does not establish that a trade occurred, so it is not used as active traders."
  },
  "Extended": {
    "value": null,
    "checkedAt": "2026-09-30",
    "source": "https://dune.com/extended/extended",
    "sourceLabel": "Extended · official Dune dashboard",
    "note": "The dashboard defines Active Users by equity changes, with versions including or excluding XVS. This does not establish a trade-based unique trader count, so the metric is not substituted here."
  },
  "Perpl": {
    "value": null,
    "checkedAt": "2026-09-30",
    "source": "https://dune.com/perpl/perpl-dex",
    "sourceLabel": "Perpl · official Dune dashboard",
    "note": "The reviewed dashboard reports total users and new/cumulative accounts. A current period-specific active trader count was not verified; lifetime users are not substituted."
  }
};
const OI_SOURCE="https://api.llama.fi/overview/open-interest?excludeTotalDataChart=true&excludeTotalDataChartBreakdown=true";
const DAY=86400000;const parseDate=s=>Date.parse(s+'T00:00:00Z');
const fmtDate=s=>s?new Intl.DateTimeFormat('en-GB',{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'}).format(new Date(parseDate(s))):'Not verified';
const num=n=>new Intl.NumberFormat('en-US').format(n);
const compact=n=>new Intl.NumberFormat('en-US',{notation:'compact',maximumFractionDigits:2}).format(n);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function endInfo(p){
 if(p.programType==='rewards')return null;
 if(p.pointsConfirmed===false)return null;
 return p.end?{date:p.end,ms:p.endAt?Date.parse(p.endAt):parseDate(p.end)+DAY,weeks:p.officialWeeks}:null;
}
function timeline(p,now=Date.now()){
 if(p.programType==='rewards')return{label:'Trading rewards',percent:null,end:null};
 if(p.pointsConfirmed===false)return{label:'No points program confirmed',percent:null,end:null};
 const anchor=p.start||p.timelineDate,end=endInfo(p);
 if(!end){
  const start=anchor?(p.startAt?Date.parse(p.startAt):parseDate(anchor)):null;
  const weekLabel=p.status==='active'&&Number.isFinite(start)?(now<start?'Not started':'Week '+(Math.floor((now-start)/DAY/7)+1)+(p.timelineDate&&!p.start?' '+(p.weekSuffix||'since first drop'):'')):null;
  return{label:p.endDeadline&&now>=parseDate(p.endDeadline)+DAY?'End window passed · recheck':'End date unknown',weekLabel,percent:50,placeholder:true,end:null};
 }
 if(anchor){const start=p.startAt?Date.parse(p.startAt):parseDate(anchor),elapsed=Math.max(0,now-start);return{label:now<start?'Not started':now>=end.ms?'Season completed':'Week '+(Math.floor(elapsed/DAY/7)+1),percent:Math.max(0,Math.min(100,elapsed/(end.ms-start)*100)),end,remaining:Math.max(0,Math.ceil((end.ms-now)/DAY))};}
 return{label:'Start date unknown',percent:null,end};
}
function timelineHTML(p){
 const t=timeline(p),e=t.end;
 if(p.programType==='rewards')return '<div class="timeline-box no-timeline"><div class="timeline-heading"><strong>Trading rewards</strong><span class="time-pill">esGMX + GT</span></div><div class="timeline-explainer">Weekly epochs · Wednesday 00:00 UTC. Variable token rewards; no points season or estimated points total.</div></div>';
 if(p.status==='no-points')return '<div class="timeline-box no-timeline"><div class="timeline-heading"><strong>No points program confirmed</strong><span class="time-pill">Live venue</span></div><div class="timeline-explainer">No verified points start, end or allocation. Live trading does not imply future rewards.</div></div>';
 if(p.pointsConfirmed===false)return '<div class="timeline-box no-timeline upcoming-box"><div class="timeline-heading"><strong>No points program confirmed</strong><span class="time-pill">Upcoming</span></div><div class="timeline-explainer">Points start and end unannounced / unverified. Exchange launch does not establish points eligibility.</div></div>';
 const dates='<div class="timeline-dates"><div><small>'+esc(p.start?'Started':p.timelineLabel||'Start date')+'</small><strong>'+startText(p)+'</strong></div><div><small>End date</small><strong>'+endText(p)+'</strong></div></div><div class="timeline-explainer">'+esc(p.dateNote||'')+'</div>';
 if(t.placeholder)return '<div class="timeline-box unknown-end"><div class="timeline-heading"><strong>'+esc(t.weekLabel||t.label)+'</strong><span class="time-pill">End unknown</span></div><div class="track clear-progress" aria-hidden="true"><span class="fill" style="width:50%"></span></div><div class="timeline-explainer">'+esc(t.label)+' · Fixed half-bar</div>'+dates+'</div>';
 const progress=t.percent===null?'':'<div class="track clear-progress" role="progressbar" aria-label="'+esc(p.name+' time elapsed')+'" aria-valuemin="0" aria-valuemax="100" aria-valuenow="'+Math.round(t.percent)+'"><span class="fill" style="width:'+t.percent+'%"></span></div><div class="projection-caption">'+(t.remaining?t.remaining+' days left':'Completed')+'</div>';
 return '<div class="timeline-box"><div class="timeline-heading"><strong>'+esc(t.label)+(e?.weeks?' / '+e.weeks:'')+'</strong><span class="time-pill">'+(t.percent===null?'Unknown':Math.round(t.percent)+'%')+'</span></div>'+progress+dates+'</div>';
}
function startText(p){return p.start||p.timelineDate?fmtDate(p.start||p.timelineDate):esc(p.startText||'Not verified');}
function endLabel(){return 'End date';}
function endText(p){return p.end?fmtDate(p.end):esc(p.endText||'End date unknown');}
function usd(value){return Number.isFinite(value)?'$'+compact(value):'Not available';}
function traderCell(p){const t=traderMetrics[p.name],available=Number.isFinite(t?.value);return '<div class="metric traders"><span class="number '+(available?'':'missing')+'">'+(available?(t.approx?'≈ ':'')+num(t.value):'Not available')+'</span><span class="sub">'+(available?esc(t.period)+'<br>'+esc(t.scope)+'<br>Checked '+fmtDate(t.checkedAt):'No verified trader count')+'</span></div>';}
function tradersHTML(p){const t=traderMetrics[p.name];return '<h3>Active traders</h3>'+traderCell(p)+'<p>'+(t?esc(t.note):'No current period-specific active trader count verified. Missing does not mean zero. Total users, point recipients, trades and active wallet proxies are not substituted.')+'</p>'+(t?'<p class="history-note">Captured '+fmtDate(t.checkedAt)+'. Saved snapshot, not live; historical seasons show current venue activity.</p><ul class="source-list"><li><a href="'+esc(t.source)+'" target="_blank" rel="noopener noreferrer">'+esc(t.sourceLabel)+'</a></li>'+(t.definitionSource?'<li><a href="'+esc(t.definitionSource)+'" target="_blank" rel="noopener noreferrer">Metric definition / query</a></li>':'')+'</ul>':'');}
function metricCells(p){const m=venueMetrics[p.name];return ['funding','volume','oi'].map(key=>{
 const value=m?.[key];const label=key==='funding'?(Number.isFinite(m?.funding)?m.fundingLabel:'See source notes'):key==='volume'?(m?'Page snapshot · '+fmtDate(m.volumePageDate):'No verified snapshot'):(m?'API snapshot · '+fmtDate(m.checkedAt):'No verified snapshot');
 return '<div class="metric '+key+'"><span class="number '+(Number.isFinite(value)?'':'missing')+'">'+(key==='funding'&&!Number.isFinite(value)?esc(m?.fundingLabel||'Not verified'):usd(value))+'</span><span class="sub">'+esc(label)+'</span></div>';
 }).join('');}
function metricsHTML(p){const m=venueMetrics[p.name];if(!m)return '<h3>Funding & market data</h3><p>No verified snapshot recorded for this exchange.</p>';
 return '<h3>Funding & market data</h3><div class="detail-grid"><div><small>Funding · '+esc(m.fundingLabel)+'</small><strong>'+usd(m.funding)+'</strong></div><div><small>Perp volume · 24h · USD</small><strong>'+usd(m.volume)+'</strong></div><div><small>Open interest · USD notional</small><strong>'+usd(m.oi)+'</strong></div><div><small>Market scope</small><strong>'+esc(m.scope)+'</strong></div></div><p>'+esc(m.fundingNote)+' Funding source last checked '+fmtDate(m.fundingCheckedAt||m.checkedAt)+'.</p><p>Market data is a saved snapshot, not live. Volume is the rounded reported 24h value on the provider page captured '+fmtDate(m.volumePageDate)+'. Open interest was retrieved from the provider API on '+fmtDate(m.checkedAt)+'. Provider observation times are not published in these snapshots; the two values are not synchronized. These are current venue metrics, not this season’s totals. Open interest is dollar exposure, not a count of positions.</p><ul class="source-list"><li><a href="'+m.marketSource+'" target="_blank" rel="noopener noreferrer">DefiLlama · reported perp volume</a></li><li><a href="'+OI_SOURCE+'" target="_blank" rel="noopener noreferrer">DefiLlama · open interest API</a></li>'+(m.fundingSource?'<li><a href="'+m.fundingSource+'" target="_blank" rel="noopener noreferrer">Funding source · '+esc(m.fundingLabel)+'</a></li>':'')+'</ul>';
}
function weeklyText(p,format=compact){if(p.programType==='rewards'||p.status==='no-points')return 'Not applicable';if(p.weekly===null)return 'Not available';if(p.weeklyMax)return format(p.weekly)+'–'+format(p.weeklyMax);return (p.weeklyQualifier?esc(p.weeklyQualifier)+' ':'')+format(p.weekly);}
function totalInfo(p,now=Date.now(),format=compact){
 if(p.programType==='rewards'||p.pointsConfirmed===false)return{text:'Not applicable',label:p.totalLabel,estimated:false};
 const partial=/partial/i.test(p.totalLabel||'');
 if(Number.isFinite(p.total)&&!partial)return{text:(p.approx?'≈ ':'')+format(p.total),label:p.totalLabel,estimated:false};
 const anchor=p.start||p.timelineDate;
 if(['active','ended'].includes(p.status)&&anchor&&Number.isFinite(p.weekly)){
  const start=p.startAt?Date.parse(p.startAt):parseDate(anchor);
  const until=Math.min(now,endInfo(p)?.ms??now);
  const weeks=Math.max(0,Math.floor((until-start)/(7*DAY)));
  const low=weeks*p.weekly,high=p.weeklyMax?weeks*p.weeklyMax:null;
  const value=high!==null?format(low)+'–'+format(high):format(low);
  const qualifier=p.weeklyQualifier?p.weeklyQualifier+' ':'';
  return{text:'≈ '+qualifier+value,label:'Estimated · '+weeks+' full weeks × '+weeklyText(p,format),estimated:true,weeks};
 }
 return{text:Number.isFinite(p.total)?format(p.total):'Not available',label:p.totalLabel,estimated:false};
}
function totalHTML(p,format=compact){const t=totalInfo(p,Date.now(),format);return '<span class="number '+(t.text==='Not available'?'missing':'')+'">'+esc(t.text)+'</span><span class="sub '+(t.estimated?'estimate-label':'')+'">'+esc(t.label)+'</span>';}
function networkHTML(p){return '<span class="networks"><span class="network-label">Network</span>'+p.networks.map(n=>'<span class="network-chip">'+esc(n)+'</span>').join('')+'</span>';}

function freshness(p,now=Date.now()){
 const date=p.checkedAt||CHECKED,age=Math.floor((now-parseDate(date))/DAY);
 return {date,stale:!Number.isFinite(age)||age>=14,label:!Number.isFinite(age)?'Check date unavailable':age>=14?'Update needed':'Recently checked'};
}
function freshnessHTML(p){const f=freshness(p);return '<small class="freshness '+(f.stale?'stale':'')+'">'+esc(f.label)+' · '+fmtDate(f.date)+'</small>';}
function selectPrograms(items,{status='all',query='',network='all',order='status',favoritesOnly=false,favorites=[]}={},now=Date.now()){
 const q=query.trim().toLowerCase();
 return items.filter(p=>{
 const e=endInfo(p),matches=status==='all'||p.status===status||(status==='ending'&&p.status==='active'&&e&&e.ms>now&&e.ms-now<=30*DAY);
 return matches&&(network==='all'||p.networks.includes(network))&&(!favoritesOnly||favorites.includes(p.id))&&[p.name,p.season,...p.networks].join(' ').toLowerCase().includes(q);
 }).sort((a,b)=>{
 if(['volume','oi','funding'].includes(order)){const av=venueMetrics[a.name]?.[order],bv=venueMetrics[b.name]?.[order];return (Number.isFinite(bv)?bv:-Infinity)-(Number.isFinite(av)?av:-Infinity)||a.name.localeCompare(b.name);}
 if(order==='name')return a.name.localeCompare(b.name);
 if(order==='start')return (b.start?parseDate(b.start):-Infinity)-(a.start?parseDate(a.start):-Infinity)||a.name.localeCompare(b.name);
 if(order==='end')return (endInfo(a)?.ms??Infinity)-(endInfo(b)?.ms??Infinity)||a.name.localeCompare(b.name);
 const ranks={active:0,upcoming:1,'no-points':2,review:3,ended:4};return ranks[a.status]-ranks[b.status];
 });
}
function programFromHash(hash){if(!hash.startsWith('#dex/'))return null;try{return programs.find(p=>p.id===decodeURIComponent(hash.slice(5)))||null;}catch{return null;}}
let filter='all';
let selectedNetwork='all',favoritesOnly=false,favorites=[];
const rows=document.getElementById('rows'),search=document.getElementById('search'),sort=document.getElementById('sort'),dialog=document.getElementById('detail');
const statusLabels={active:'Active',review:'Needs review',ended:'Completed',upcoming:'Upcoming','no-points':'No points confirmed'};
function filteredPrograms(){return selectPrograms(programs,{status:filter,query:search.value,network:selectedNetwork,order:sort.value,favoritesOnly,favorites});}
function render(){const list=filteredPrograms();document.getElementById('result-count').textContent=list.length;document.getElementById('showing').textContent=`Showing ${list.length} of ${programs.length} entries`;document.getElementById('venue-count').textContent=new Set(programs.map(p=>p.name)).size;document.getElementById('active-count').textContent=programs.filter(p=>p.status==='active').length;rows.innerHTML=list.length?list.map(p=>`<button class="program-row" data-program="${p.id}" aria-label="View ${esc(p.name+' '+p.season)} details"><div class="exchange"><span class="monogram" aria-hidden="true">${p.mark}</span><span><strong>${p.name}</strong><small>${p.season}</small>${networkHTML(p)}${freshnessHTML(p)}<span class="badge ${p.status}">${p.programType==='rewards'?'Trading rewards':statusLabels[p.status]}</span></span></div><div class="timeline">${timelineHTML(p)}</div><div class="weekly"><span class="number ${p.weekly===null?'missing':''}">${weeklyText(p)}</span><span class="sub">${p.weeklyLabel}</span></div><div class="total">${totalHTML(p)}</div>${metricCells(p)}<span class="chevron" aria-hidden="true">›</span></button>`).join(''):`<div class="empty"><h3>No matching entries.</h3><p>${filter==='ending'?'No active program has a confirmed exact end within 30 days.':filter==='upcoming'?'No upcoming entry matches this search.':'Try another exchange or change the status filter.'}</p><button id="reset">Show all programs</button></div>`;rows.querySelectorAll('[data-program]').forEach(b=>b.addEventListener('click',()=>openProgram(b.dataset.program)));document.getElementById('reset')?.addEventListener('click',()=>{search.value='';selectedNetwork='all';document.getElementById('network-filter').value='all';favoritesOnly=false;document.getElementById('favorites-only').checked=false;setFilter('all')});}
function setFilter(value){filter=value;document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('selected',b.dataset.filter===value);b.setAttribute('aria-pressed',String(b.dataset.filter===value))});render();}
function showDialog(){if(!dialog.open)dialog.showModal();}
function openProgram(id){const p=programs.find(x=>x.id===id);if(!p)throw new Error('Unknown program');if(location.hash!=='#dex/'+p.id)history.pushState(null,'','#dex/'+p.id);document.getElementById('dialog-content').innerHTML=`<div class="eyebrow">PROGRAM DETAILS · CHECKED ${fmtDate(p.checkedAt||CHECKED)}</div><div class="detail-head"><span class="monogram">${p.mark}</span><div><h2 id="dialog-title">${p.name}</h2><p>${p.season} <span class="badge ${p.status}">${p.programType==='rewards'?'Trading rewards':statusLabels[p.status]}</span></p></div></div><div class="detail-actions"><button id="favorite-toggle" aria-pressed="${favorites.includes(p.id)}">${favorites.includes(p.id)?'★ Saved':'☆ Save to favorites'}</button><a class="official-website" href="${esc(p.website)}" target="_blank" rel="noopener noreferrer">Visit ${esc(p.name)} ↗</a><button type="button" data-suggest="correction" data-exchange="${esc(p.name)}">Report data issue</button></div><p class="website-note">Official website · No referral code</p>${freshnessHTML(p)}<div class="network-detail">${networkHTML(p)}<p>${esc(p.networkNote)}</p><small>Network checked ${fmtDate(p.networkCheckedAt)} · Official sources below</small></div><div class="detail-timeline">${timelineHTML(p)}</div><div class="detail-grid"><div><small>${p.timelineDate?(p.timelineLabel||'First weekly drop'):'Start date'}</small><strong>${startText(p)}</strong></div><div><small>${endLabel(p)}</small><strong>${endText(p)}</strong></div><div><small>${p.weeklyLabel}</small><strong>${weeklyText(p,num)}</strong></div><div><small>Total distributed</small>${totalHTML(p,num)}</div></div><div class="note ${p.status==='review'?'review':''}">${p.note}</div><h3>Program notes</h3><p>${p.rules}</p>${metricsHTML(p)}${tradersHTML(p)}<h3>Distribution history</h3>${p.history.length?`<p class="history-note">${p.history.length} verified announcements · ${num(p.history.reduce((sum,r)=>sum+r.amount,0))} points recorded. Partial coverage; not the full program total. Exact distribution dates are not verified here, so records use their announcement IDs.</p>${p.history.map(r=>`<div class="history-row"><a href="${r.url}" target="_blank" rel="noopener noreferrer">${r.label}</a><div class="track"><span class="fill" style="width:${r.amount/Math.max(...p.history.map(x=>x.amount))*100}%"></span></div><strong>${num(r.amount)}</strong></div>`).join('')}`:'<p>No individual weekly distributions are recorded for this program. An announced weekly pool is not a substitute for actual distribution history.</p>'}<h3>Sources & verification</h3><ul class="source-list">${p.refs.map(([label,url])=>`<li><a href="${url}" target="_blank" rel="noopener noreferrer">${label}</a></li>`).join('')}</ul><p class="history-note">Research snapshot: ${fmtDate(p.checkedAt||CHECKED)}. Program facts do not refresh automatically. Elapsed time is calculated from known dates. Program points are not comparable monetary units.</p>`;showDialog();
 document.getElementById('favorite-toggle').addEventListener('click',()=>{favorites=favorites.includes(id)?favorites.filter(x=>x!==id):[...favorites,id];try{localStorage.setItem('openpers-favorites',JSON.stringify(favorites));}catch{}openProgram(id);render();});
}
function openMethod(){document.getElementById('dialog-content').innerHTML=`<div class="eyebrow">ABOUT THE DATA</div><h2 id="dialog-title">Clarity over false precision.</h2><p>Openpers is an independent directory of perpetual exchange points programs. The latest research refresh is dated ${fmtDate(CHECKED)}.</p><h3>What the labels mean</h3><ul><li><strong>Active:</strong> the reviewed documentation or recent official announcements describe an ongoing program.</li><li><strong>Upcoming:</strong> future programs and early exchanges to follow. Entries labeled No points program confirmed have no verified points launch and do not promise future rewards. Exchange beta and mainnet dates are separate from points dates.</li><li><strong>No points confirmed:</strong> a live venue without a verified points program. Trading rewards entries are token reward programs and do not imply points.</li><li><strong>Needs review:</strong> dates or current status cannot be reconciled, or the live source could not be retrieved.</li><li><strong>Completed:</strong> an official source explicitly records the season end.</li><li><strong>Weekly cap / announced pool:</strong> a program parameter, not a recorded payment.</li><li><strong>Partial total:</strong> the sum of only the distributions collected here.</li></ul><h3>How time is calculated</h3><p>Dates use UTC. Week 1 starts at the listed date; week numbers measure elapsed calendar time, not official reward epochs. When a season start is unavailable, a dated allocation or reported launch can anchor the counter; the label states that basis and source confidence. Exact official dates determine elapsed progress; date-only ends include the final day. An end derived from an explicitly published duration is retained. Without an exact end, the bar stays halfway and says End date unknown. That fixed indicator is decorative, not 50% elapsed. No estimated dates or rolling targets are generated. Official end windows remain notes and do not qualify for Ending soon. Unconfirmed Upcoming entries do not imply a points timeline.</p><h3>Estimated point totals</h3><p>When no complete reported total is available, Estimated totals multiply the current weekly amount by fully elapsed seven-day periods from the listed start or timeline anchor. This is a rough model, not a sum of recorded payouts. Weekly ranges, floors and caps retain their meaning; past rate changes, bonuses and deductions are not reconstructed. Completed seasons stop at their recorded end. Partial recorded totals remain in distribution history. Missing weekly amounts or anchors stay unavailable.</p><h3>Funding and market snapshots</h3><p>All financial figures are USD. Funding labels distinguish cumulative totals from individual rounds. Self-funded does not mean a disclosed zero-dollar budget. Parent-company raises and valuations are not exchange funding. Volume is the provider’s reported 24h notional volume, not spot volume or independently audited activity. Open interest is outstanding USD exposure, not the number of positions. Lighter metrics cover Robinhood Chain only; Paradex excludes options. Open program details for source links, scope and snapshot dates. Provider observation times are unavailable; snapshots are not synchronized or live. Historical seasons show current venue metrics.</p><h3>Active traders</h3><p>Counts retain the provider’s period, scope and rounding. Accounts or wallets are not necessarily unique people; the same person may trade through multiple accounts. Nado is venue-wide (spot and perps). Calendar-day counts are not rolling 24h counts. We do not sum daily counts to estimate weekly unique traders, and do not substitute lifetime users, deposits, equity changes or trade counts. Each available metric has its own capture date and source in program details. Missing means unverified, not zero.</p><h3>Freshness and saved entries</h3><p>Program entries are marked Update needed after 14 days without a recorded check. This is a reminder, not proof that a program ended. Market snapshots keep their own dates. Favorites are stored only in this browser and may be unavailable in private or restricted storage modes.</p><h3>What updates automatically?</h3><p>Elapsed weeks and estimated point totals update in the browser. Program facts, funding, distributions and market metrics are curated snapshots. Missing values remain unavailable.</p><h3>Coverage</h3><p>Programs known to have ended before 1 January 2026 are excluded. This is not an exhaustive market list. Upcoming exchanges do not promise a future points program. Point totals are not comparable monetary units.</p>`;showDialog();}
try{const saved=JSON.parse(localStorage.getItem('openpers-favorites')||'[]');favorites=Array.isArray(saved)?saved.filter(id=>programs.some(p=>p.id===id)):[];}catch{}
const networkFilter=document.getElementById('network-filter');
networkFilter.innerHTML='<option value="all">All networks</option>'+[...new Set(programs.flatMap(p=>p.networks))].sort().map(n=>'<option value="'+esc(n)+'">'+esc(n)+'</option>').join('');
networkFilter.addEventListener('change',()=>{selectedNetwork=networkFilter.value;render();});
document.getElementById('favorites-only').addEventListener('change',e=>{favoritesOnly=e.target.checked;render();});
dialog.addEventListener('close',()=>{if(location.hash.startsWith('#dex/'))history.replaceState(null,'','#programs');});
function restoreProgram(){const p=programFromHash(location.hash);if(p)openProgram(p.id);else if(dialog.open)dialog.close();}
window.addEventListener('hashchange',restoreProgram);
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>setFilter(b.dataset.filter)));search.addEventListener('input',render);sort.addEventListener('change',render);document.getElementById('method-btn').addEventListener('click',openMethod);document.getElementById('footer-method').addEventListener('click',openMethod);document.querySelector('.close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});render();restoreProgram();setInterval(render,60000);
if(document.modelContext?.registerTool){try{Promise.resolve(document.modelContext.registerTool({name:'filter_points_programs',title:'Filter points programs',description:'Filter the visible Openpers program list by exchange name and program status.',inputSchema:{type:'object',properties:{query:{type:'string'},status:{type:'string',enum:['all','active','upcoming','ending','ended','review','no-points']}},additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:false},execute(input){if(!input||typeof input!=='object'||Object.keys(input).some(k=>!['query','status'].includes(k))||(input.query!==undefined&&typeof input.query!=='string')||(input.status!==undefined&&!['all','active','upcoming','ending','ended','review','no-points'].includes(input.status)))throw new Error('Invalid filter');search.value=input.query??'';setFilter(input.status??'all');return{count:filteredPrograms().length,programs:filteredPrograms().map(p=>({id:p.id,name:p.name,season:p.season,status:p.status}))}}})).catch(()=>{});}catch{}}
