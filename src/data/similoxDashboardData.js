// Similox Labs Student Dashboard Data

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function generateHeatmapData() {
  const days = [];
  const now = new Date(2026, 8, 14); // Sep 14, 2026
  const totalDays = 52 * 7; // 364 days

  for (let i = totalDays - 1; i >= 0; i--) {
    const d = new Date(2026, 8, 14);
    d.setDate(d.getDate() - i);

    const dayOfWeek = d.getDay();
    const dayNum = d.getDate();
    const month = d.getMonth();
    
    // Seed pseudo-random realistic pattern
    const seed = (d.getFullYear() * 1000 + month * 31 + dayNum) % 17;
    let count = 0;

    if (seed === 0 || seed === 3 || seed === 7) {
      count = 0;
    } else if (seed < 6) {
      count = Math.floor(seed * 1.5) + 1; // 1 - 4
    } else if (seed < 12) {
      count = Math.floor(seed * 0.8) + 2; // 5 - 8
    } else {
      count = Math.min(14, seed - 3); // 9 - 14
    }

    let level = 0;
    if (count > 0 && count <= 2) level = 1;
    else if (count > 2 && count <= 5) level = 2;
    else if (count > 5 && count <= 9) level = 3;
    else if (count >= 10) level = 4;

    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const dateString = `${yyyy}-${mm}-${dd}`;

    days.push({
      date: dateString,
      count,
      level,
      dayOfWeek,
      month: MONTH_NAMES[month],
    });
  }

  return days;
}

export const similoxStudentData = {
  profile: {
    name: "Alex Rivera",
    rollNo: "21BCS10042",
    course: "B.Tech Computer Science",
    branch: "Computer Science & Engineering",
    section: "Section B",
    year: "4th Year",
    academicSession: "2022 - 2026",
    institute: "Similox Institute of Technology",
    email: "alex.rivera@similox.edu",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
    attendance: "94.6%",
    cgpa: "8.92",
    status: "Active Student",
  },

  ranking: {
    instituteRank: 7,
    totalStudents: 420,
    batchRank: 3,
    batchTotal: 140,
    percentile: 98.4,
    globalRating: 1845,
    rankBadge: "Grandmaster",
  },

  skills: [
    { name: "Dynamic Programming", level: 92, count: 54 },
    { name: "Trees & Binary Search Trees", level: 88, count: 48 },
    { name: "Graphs & BFS/DFS", level: 85, count: 42 },
    { name: "Two Pointers & Sl. Window", level: 95, count: 62 },
    { name: "System Design", level: 78, count: 28 },
    { name: "Greedy Algorithms", level: 82, count: 36 },
    { name: "Sorting & Searching", level: 96, count: 70 },
  ],

  languages: [
    { name: "C++", solved: 215, percentage: 56 },
    { name: "Python", solved: 94, percentage: 24 },
    { name: "Java", solved: 52, percentage: 14 },
    { name: "JavaScript", solved: 23, percentage: 6 },
  ],

  problemSolving: {
    totalSolved: 384,
    totalProblems: 540,
    attempting: 14,
    easy: {
      solved: 168,
      total: 200,
    },
    medium: {
      solved: 164,
      total: 240,
    },
    hard: {
      solved: 52,
      total: 100,
    },
  },

  heatmapStats: {
    totalSubmissionsYear: 842,
    activeDays: 246,
    maxStreak: 41,
    currentStreak: 18,
    submissions: generateHeatmapData(),
  },

  recentSubmissions: [
    {
      id: "sub-101",
      title: "Binary Tree Maximum Path Sum",
      slug: "binary-tree-maximum-path-sum",
      status: "Accepted",
      difficulty: "Hard",
      language: "C++",
      runtime: "8 ms",
      memory: "27.4 MB",
      submittedAt: "18 mins ago",
      timestamp: 1788802434,
    },
    {
      id: "sub-102",
      title: "Course Schedule II",
      slug: "course-schedule-ii",
      status: "Accepted",
      difficulty: "Medium",
      language: "Python",
      runtime: "42 ms",
      memory: "18.2 MB",
      submittedAt: "2 hours ago",
      timestamp: 1788795234,
    },
    {
      id: "sub-103",
      title: "Trapping Rain Water",
      slug: "trapping-rain-water",
      status: "Accepted",
      difficulty: "Hard",
      language: "C++",
      runtime: "4 ms",
      memory: "19.8 MB",
      submittedAt: "5 hours ago",
      timestamp: 1788784434,
    },
    {
      id: "sub-104",
      title: "Longest Palindromic Substring",
      slug: "longest-palindromic-substring",
      status: "Time Limit Exceeded",
      difficulty: "Medium",
      language: "Java",
      runtime: "—",
      memory: "42.1 MB",
      submittedAt: "Yesterday",
      timestamp: 1788716034,
    },
    {
      id: "sub-105",
      title: "Two Sum",
      slug: "two-sum",
      status: "Accepted",
      difficulty: "Easy",
      language: "C++",
      runtime: "2 ms",
      memory: "12.6 MB",
      submittedAt: "2 days ago",
      timestamp: 1788629634,
    },
    {
      id: "sub-106",
      title: "Merge k Sorted Lists",
      slug: "merge-k-sorted-lists",
      status: "Accepted",
      difficulty: "Hard",
      language: "C++",
      runtime: "12 ms",
      memory: "15.4 MB",
      submittedAt: "3 days ago",
      timestamp: 1788543234,
    },
    {
      id: "sub-107",
      title: "Valid Parentheses",
      slug: "valid-parentheses",
      status: "Accepted",
      difficulty: "Easy",
      language: "JavaScript",
      runtime: "52 ms",
      memory: "44.1 MB",
      submittedAt: "4 days ago",
      timestamp: 1788456834,
    },
    {
      id: "sub-108",
      title: "Coin Change",
      slug: "coin-change",
      status: "Wrong Answer",
      difficulty: "Medium",
      language: "Python",
      runtime: "38 ms",
      memory: "16.8 MB",
      submittedAt: "5 days ago",
      timestamp: 1788370434,
    },
  ],
};
