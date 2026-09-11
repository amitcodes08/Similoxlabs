export default async function handler(req, res) {
  const username = req.query.username || "dorimon08";

  const defaultSubmissions = [
    {
      id: "2134219857",
      title: "Distinct Subsequences II",
      titleSlug: "distinct-subsequences-ii",
      difficulty: "Hard",
      timestamp: "1788802434",
    },
    {
      id: "2133077133",
      title: "Distinct Subsequences",
      titleSlug: "distinct-subsequences",
      difficulty: "Hard",
      timestamp: "1788713338",
    },
    {
      id: "2131248868",
      title: "Number of Islands",
      titleSlug: "number-of-islands",
      difficulty: "Medium",
      timestamp: "1788578455",
    },
    {
      id: "2131242325",
      title: "Smallest Stable Index II",
      titleSlug: "smallest-stable-index-ii",
      difficulty: "Medium",
      timestamp: "1788577522",
    },
    {
      id: "2131051827",
      title: "Longest Palindromic Subsequence",
      titleSlug: "longest-palindromic-subsequence",
      difficulty: "Medium",
      timestamp: "1788547162",
    },
    {
      id: "2130504652",
      title: "Smallest Stable Index II",
      titleSlug: "smallest-stable-index-ii",
      difficulty: "Medium",
      timestamp: "1788512273",
    },
    {
      id: "2130500474",
      title: "Smallest Stable Index I",
      titleSlug: "smallest-stable-index-i",
      difficulty: "Easy",
      timestamp: "1788511973",
    },
    {
      id: "2129711316",
      title: "Maximal Square",
      titleSlug: "maximal-square",
      difficulty: "Medium",
      timestamp: "1788445881",
    },
    {
      id: "2129673614",
      title: "Construct Uniform Parity Array II",
      titleSlug: "construct-uniform-parity-array-ii",
      difficulty: "Medium",
      timestamp: "1788443715",
    },
    {
      id: "2128334335",
      title: "Construct Uniform Parity Array I",
      titleSlug: "construct-uniform-parity-array-i",
      difficulty: "Easy",
      timestamp: "1788346208",
    },
  ];

  const defaultData = {
    username: "dorimon08",
    realName: "Amit Gupta",
    userAvatar: "https://assets.leetcode.com/users/ycb5lAHqph/avatar_1731774786.png",
    ranking: 151072,
    reputation: 0,
    rating: 1932,
    contests: 16,
    globalRanking: 32501,
    topPercentage: 3.8,
    totalSolved: 583,
    easy: 154,
    medium: 315,
    hard: 114,
    recentSubmissions: defaultSubmissions,
  };

  try {
    const query = `
      query getFullProfile($username: String!) {
        matchedUser(username: $username) {
          username
          profile {
            realName
            userAvatar
            ranking
            reputation
            countryName
          }
          submitStatsGlobal {
            acSubmissionNum {
              difficulty
              count
            }
          }
        }
        userContestRanking(username: $username) {
          attendedContestsCount
          rating
          globalRanking
          topPercentage
        }
        recentAcSubmissionList(username: $username) {
          id
          title
          titleSlug
          timestamp
        }
      }
    `;

    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
    });

    if (!response.ok) {
      return res.status(200).json(defaultData);
    }

    const data = await response.json();
    const user = data?.data?.matchedUser;
    const contest = data?.data?.userContestRanking;
    const recentAcs = data?.data?.recentAcSubmissionList || [];

    if (!user) {
      return res.status(200).json(defaultData);
    }

    const solvedStats = user?.submitStatsGlobal?.acSubmissionNum || [];
    const getCount = (diff) =>
      solvedStats.find((s) => s.difficulty === diff)?.count ?? 0;

    const difficultyMap = {
      "distinct-subsequences-ii": "Hard",
      "distinct-subsequences": "Hard",
      "number-of-islands": "Medium",
      "smallest-stable-index-ii": "Medium",
      "longest-palindromic-subsequence": "Medium",
      "smallest-stable-index-i": "Easy",
      "maximal-square": "Medium",
      "construct-uniform-parity-array-ii": "Medium",
      "construct-uniform-parity-array-i": "Easy",
      "minimum-moves-to-clean-the-classroom": "Hard",
      "find-the-minimum-and-maximum-number-of-nodes-between-critical-points": "Medium",
      "removing-minimum-and-maximum-from-array": "Medium",
      "make-lexicographically-smallest-array-by-swapping-elements": "Medium",
      "stone-game-viii": "Hard",
      "sum-game": "Medium",
    };

    // Enrich top 15 recent submissions with questionId, difficulty, and topicTags
    let enrichedRecent = [];
    if (recentAcs.length > 0) {
      const topSubs = recentAcs.slice(0, 15);
      try {
        const questionAliases = topSubs
          .map(
            (s, idx) =>
              `q${idx}: question(titleSlug: "${s.titleSlug}") { questionId difficulty topicTags { name } }`
          )
          .join(" ");

        const qResponse = await fetch("https://leetcode.com/graphql", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: `query { ${questionAliases} }` }),
        });

        if (qResponse.ok) {
          const qData = await qResponse.json();
          enrichedRecent = topSubs.map((sub, idx) => {
            const qInfo = qData?.data?.[`q${idx}`];
            return {
              id: sub.id,
              questionNumber: qInfo?.questionId || null,
              title: sub.title,
              titleSlug: sub.titleSlug,
              difficulty: qInfo?.difficulty || difficultyMap[sub.titleSlug] || "Medium",
              timestamp: sub.timestamp,
              topicTags: qInfo?.topicTags?.map((t) => t.name) || [],
            };
          });
        }
      } catch (e) {
        // Fall back to mapping if batch query fails
      }

      if (enrichedRecent.length === 0) {
        enrichedRecent = topSubs.map((sub) => ({
          id: sub.id,
          questionNumber: null,
          title: sub.title,
          titleSlug: sub.titleSlug,
          difficulty: difficultyMap[sub.titleSlug] || "Medium",
          timestamp: sub.timestamp,
          topicTags: [],
        }));
      }
    } else {
      enrichedRecent = defaultSubmissions;
    }

    return res.status(200).json({
      username: user.username,
      realName: user.profile?.realName || "Amit Gupta",
      userAvatar:
        user.profile?.userAvatar ||
        "https://assets.leetcode.com/users/ycb5lAHqph/avatar_1731774786.png",
      ranking: user.profile?.ranking || 151072,
      reputation: user.profile?.reputation || 0,
      countryName: user.profile?.countryName || null,
      rating: Math.round(contest?.rating || 1932),
      contests: contest?.attendedContestsCount || 16,
      globalRanking: contest?.globalRanking || 32501,
      topPercentage: contest?.topPercentage
        ? Number(contest.topPercentage.toFixed(1))
        : 3.8,
      totalSolved: getCount("All") || 583,
      easy: getCount("Easy") || 154,
      medium: getCount("Medium") || 315,
      hard: getCount("Hard") || 114,
      recentSubmissions: enrichedRecent,
    });
  } catch (error) {
    return res.status(200).json(defaultData);
  }
}
