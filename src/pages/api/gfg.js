export default async function handler(req, res) {
  const username = req.query.username || "aryaampeu5";

  const defaultGfgData = {
    handle: "aryaampeu5",
    name: "Amit Gupta",
    headline: "Learning and Growing Every Day 🌎",
    institution: "Noida Institute of Engineering and Technology",
    codingScore: 27,
    monthlyScore: 0,
    totalProblemsSolved: 14,
    globalLongestStreak: 1852,
    currentStreak: 0,
    avatar: "https://media.geeksforgeeks.org/auth/profile/n4c9wl2whxepe9khi11c",
    profileUrl: `https://www.geeksforgeeks.org/user/${username}/`,
    difficultyBreakdown: {
      school: 3,
      basic: 5,
      easy: 4,
      medium: 2,
      hard: 0,
    },
    languages: {
      "C++": 8,
      Java: 4,
      Python: 2,
    },
    contestStats: {
      attended: 0,
      rating: null,
      stars: 1,
      starText: "Unrated",
      globalRank: null,
      nextContestTitle: "GFG Weekly Coding Contest",
      nextContestDate: "Every Sunday 7:00 PM",
      contestUrl: "https://practice.geeksforgeeks.org/events/rec/gfg-weekly-coding-contest/",
      ratingHistory: [],
    },
    topTopics: ["Arrays", "Strings", "Searching", "Mathematical"],
    submissionsTimeline: [
      { date: "10 Aug", count: 1 },
      { date: "11 Aug", count: 0 },
      { date: "12 Aug", count: 2 },
      { date: "13 Aug", count: 0 },
      { date: "14 Aug", count: 1 },
      { date: "15 Aug", count: 3 },
      { date: "16 Aug", count: 0 },
      { date: "17 Aug", count: 1 },
      { date: "18 Aug", count: 2 },
      { date: "19 Aug", count: 0 },
      { date: "20 Aug", count: 1 },
      { date: "21 Aug", count: 4 },
      { date: "22 Aug", count: 2 },
      { date: "23 Aug", count: 0 },
      { date: "24 Aug", count: 1 },
      { date: "25 Aug", count: 3 },
      { date: "26 Aug", count: 0 },
      { date: "27 Aug", count: 1 },
      { date: "28 Aug", count: 2 },
      { date: "29 Aug", count: 1 },
      { date: "30 Aug", count: 0 },
      { date: "31 Aug", count: 2 },
      { date: "1 Sep", count: 1 },
      { date: "2 Sep", count: 3 },
      { date: "3 Sep", count: 0 },
      { date: "4 Sep", count: 1 },
      { date: "5 Sep", count: 2 },
      { date: "6 Sep", count: 0 },
      { date: "7 Sep", count: 1 },
      { date: "8 Sep", count: 3 },
    ],
    recentQuestions: [
      {
        id: "gfg-1",
        title: "Subarray with Given Sum",
        titleSlug: "subarray-with-given-sum-1587115621",
        difficulty: "Medium",
        topic: "Arrays",
        timeAgo: "1d ago",
      },
      {
        id: "gfg-2",
        title: "Missing Number in Array",
        titleSlug: "missing-number-in-array1416",
        difficulty: "Easy",
        topic: "Arrays",
        timeAgo: "2d ago",
      },
      {
        id: "gfg-3",
        title: "Find Duplicates in an Array",
        titleSlug: "find-duplicates-in-an-array",
        difficulty: "Easy",
        topic: "Arrays",
        timeAgo: "3d ago",
      },
      {
        id: "gfg-4",
        title: "Second Largest",
        titleSlug: "second-largest3735",
        difficulty: "Easy",
        topic: "Arrays",
        timeAgo: "4d ago",
      },
      {
        id: "gfg-5",
        title: "Kadane's Algorithm",
        titleSlug: "kadanes-algorithm-1587115620",
        difficulty: "Medium",
        topic: "Dynamic Programming",
        timeAgo: "5d ago",
      },
      {
        id: "gfg-6",
        title: "Reverse a String",
        titleSlug: "reverse-a-string",
        difficulty: "Basic",
        topic: "Strings",
        timeAgo: "6d ago",
      },
      {
        id: "gfg-7",
        title: "Check for Binary",
        titleSlug: "check-for-binary",
        difficulty: "School",
        topic: "Strings",
        timeAgo: "1w ago",
      },
      {
        id: "gfg-8",
        title: "Sum of Array",
        titleSlug: "sum-of-array-elements2502",
        difficulty: "School",
        topic: "Arrays",
        timeAgo: "1w ago",
      },
    ],
  };

  try {
    const url = `https://www.geeksforgeeks.org/user/${username}/`;
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      redirect: "follow",
    });

    if (!response.ok) {
      return res.status(200).json(defaultGfgData);
    }

    const html = await response.text();

    const scoreMatch = html.match(/\\"score\\":(\d+)/);
    const solvedMatch = html.match(/\\"total_problems_solved\\":(\d+)/);
    const instMatch =
      html.match(/\\"institute_name\\":\\"([^\\"]+)\\"/) ||
      html.match(/\\"institution\\":\\"([^\\"]+)\\"/);
    const avatarMatch = html.match(/\\"profile_image_url\\":\\"([^\\"]+)\\"/);
    const streakMatch = html.match(
      /\\"pod_solved_global_longest_streak\\":(\d+)/
    );

    const codingScore = scoreMatch
      ? parseInt(scoreMatch[1], 10)
      : defaultGfgData.codingScore;
    const totalProblemsSolved = solvedMatch
      ? parseInt(solvedMatch[1], 10)
      : defaultGfgData.totalProblemsSolved;
    const institution = instMatch
      ? instMatch[1]
      : defaultGfgData.institution;
    const avatar = avatarMatch
      ? avatarMatch[1]
      : defaultGfgData.avatar;
    const globalLongestStreak = streakMatch
      ? parseInt(streakMatch[1], 10)
      : defaultGfgData.globalLongestStreak;

    const contestRatingMatch =
      html.match(/\\"contest_rating\\":(\d+)/) ||
      html.match(/\\"rating\\":(\d+)/);
    const starMatch = html.match(/\\"star_rating\\":(\d+)/);
    const attendedMatch = html.match(/\\"contests_participated\\":(\d+)/);

    const contestStats = {
      ...defaultGfgData.contestStats,
      rating: contestRatingMatch ? parseInt(contestRatingMatch[1], 10) : null,
      stars: starMatch ? parseInt(starMatch[1], 10) : 1,
      starText: starMatch ? `${starMatch[1]} Star` : "Unrated",
      attended: attendedMatch ? parseInt(attendedMatch[1], 10) : 0,
    };

    return res.status(200).json({
      ...defaultGfgData,
      handle: username,
      codingScore,
      totalProblemsSolved,
      institution,
      avatar,
      globalLongestStreak,
      contestStats,
    });
  } catch (error) {
    return res.status(200).json(defaultGfgData);
  }
}
