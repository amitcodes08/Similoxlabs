export const problems = [
  {
    "id": 1,
    "number": 1,
    "title": "Two Sum",
    "slug": "two-sum",
    "difficulty": "Easy",
    "category": "Algorithms",
    "acceptance": "52.4%",
    "isExempted": true,
    "likes": 54120,
    "dislikes": 1820,
    "topics": [
      "Array",
      "Hash Table"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Apple",
      "Meta",
      "Microsoft"
    ],
    "description": "\n<p class=\"mb-3\">Given an array of integers <code>nums</code> and an integer <code>target</code>, find <em>indices of the two numbers such that they add up to <code>target</code></em>.</p>\n<p class=\"mb-3\">You may assume that each input would have <strong>exactly one solution</strong>, and you may not use the same element twice.</p>\n<p class=\"mb-3\">You can print the answer in any order, space-separated on a single line.</p>\n",
    "inputFormat": "The first line contains two integers: <code>n</code> (the number of elements) and <code>target</code>.<br/>The second line contains <code>n</code> space-separated integers representing the array <code>nums</code>.",
    "outputFormat": "Print the two 0-based indices separated by a space on a single line.",
    "examples": [
      {
        "id": 1,
        "stdin": "4 9\n2 7 11 15",
        "stdout": "0 1",
        "explanation": "Because nums[0] + nums[1] == 2 + 7 == 9, we print 0 1."
      },
      {
        "id": 2,
        "stdin": "3 6\n3 2 4",
        "stdout": "1 2",
        "explanation": "Because nums[1] + nums[2] == 2 + 4 == 6, we print 1 2."
      },
      {
        "id": 3,
        "stdin": "2 6\n3 3",
        "stdout": "0 1",
        "explanation": "Because nums[0] + nums[1] == 3 + 3 == 6, we print 0 1."
      }
    ],
    "constraints": [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists."
    ],
    "hints": [
      "A really brute force way would be to search for all possible pairs of numbers but that would be too slow. Can we do better?",
      "Can we use a hash table to check if the complement (target - nums[i]) exists in O(1) time?"
    ],
    "starterCode": {
      "javascript": "const fs = require('fs');\n\nfunction main() {\n  const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\n  if (!input || input.length < 2) return;\n\n  const n = parseInt(input[0], 10);\n  const target = parseInt(input[1], 10);\n  const nums = [];\n  for (let i = 0; i < n; i++) {\n    nums.push(parseInt(input[2 + i], 10));\n  }\n\n  const map = new Map();\n  for (let i = 0; i < n; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) {\n      console.log(`${map.get(complement)} ${i}`);\n      return;\n    }\n    map.set(nums[i], i);\n  }\n}\n\nmain();",
      "typescript": "import * as fs from 'fs';\n\nfunction main(): void {\n  const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\n  if (!input || input.length < 2) return;\n\n  const n = parseInt(input[0], 10);\n  const target = parseInt(input[1], 10);\n  const nums: number[] = [];\n  for (let i = 0; i < n; i++) {\n    nums.push(parseInt(input[2 + i], 10));\n  }\n\n  const map = new Map<number, number>();\n  for (let i = 0; i < n; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) {\n      console.log(`${map.get(complement)} ${i}`);\n      return;\n    }\n    map.set(nums[i], i);\n  }\n}\n\nmain();",
      "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    target = int(input_data[1])\n    nums = [int(x) for x in input_data[2:2 + n]]\n\n    seen = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in seen:\n            print(f\"{seen[complement]} {i}\")\n            return\n        seen[num] = i\n\nif __name__ == '__main__':\n    main()",
      "cpp": "#include <iostream>\n#include <vector>\n#include <unordered_map>\n\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n\n    int n, target;\n    if (!(cin >> n >> target)) return 0;\n\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) {\n        cin >> nums[i];\n    }\n\n    unordered_map<int, int> seen;\n    for (int i = 0; i < n; i++) {\n        int complement = target - nums[i];\n        if (seen.find(complement) != seen.end()) {\n            cout << seen[complement] << \" \" << i << \"\\n\";\n            return 0;\n        }\n        seen[nums[i]] = i;\n    }\n\n    return 0;\n}",
      "java": "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int target = sc.nextInt();\n\n        int[] nums = new int[n];\n        for (int i = 0; i < n; i++) {\n            nums[i] = sc.nextInt();\n        }\n\n        Map<Integer, Integer> map = new HashMap<>();\n        for (int i = 0; i < n; i++) {\n            int complement = target - nums[i];\n            if (map.containsKey(complement)) {\n                System.out.println(map.get(complement) + \" \" + i);\n                return;\n            }\n            map.put(nums[i], i);\n        }\n    }\n}"
    },
    "testcases": [
      {
        "id": 1,
        "name": "Case 1",
        "stdin": "4 9\n2 7 11 15",
        "expectedStdout": "0 1"
      },
      {
        "id": 2,
        "name": "Case 2",
        "stdin": "3 6\n3 2 4",
        "expectedStdout": "1 2"
      },
      {
        "id": 3,
        "name": "Case 3",
        "stdin": "2 6\n3 3",
        "expectedStdout": "0 1"
      }
    ],
    "editorial": {
      "summary": "Two Sum is best solved using a Hash Table for one-pass linear time complexity.",
      "approaches": [
        {
          "title": "Approach 1: One-Pass Hash Table",
          "timeComplexity": "O(n)",
          "spaceComplexity": "O(n)",
          "description": "While iterating through the array, we check if target - nums[i] exists in our hash table. If it exists, we return its index and the current index. Otherwise, we insert nums[i] and its index into the hash map."
        },
        {
          "title": "Approach 2: Brute Force",
          "timeComplexity": "O(n^2)",
          "spaceComplexity": "O(1)",
          "description": "Loop through each element x and look for another element whose value equals target - x."
        }
      ]
    }
  },
  {
    "id": 20,
    "number": 20,
    "title": "Valid Parentheses",
    "slug": "valid-parentheses",
    "difficulty": "Easy",
    "category": "Algorithms",
    "acceptance": "40.8%",
    "isExempted": false,
    "likes": 24190,
    "dislikes": 1390,
    "topics": [
      "String",
      "Stack"
    ],
    "companies": [
      "Amazon",
      "Bloomberg",
      "Google",
      "Microsoft"
    ],
    "description": "\n<p class=\"mb-3\">Given a string <code>s</code> containing just the characters <code>'('</code>, <code>')'</code>, <code>'{'</code>, <code>'}'</code>, <code>'['</code> and <code>']'</code>, determine if the input string is valid.</p>\n<p class=\"mb-3\">An input string is valid if:</p>\n<ol class=\"list-decimal pl-5 mb-3 space-y-1\">\n  <li>Open brackets must be closed by the same type of brackets.</li>\n  <li>Open brackets must be closed in the correct order.</li>\n  <li>Every close bracket has a corresponding open bracket of the same type.</li>\n</ol>\n",
    "inputFormat": "A single line containing the bracket string <code>s</code>.",
    "outputFormat": "Print <code>true</code> if the string is valid, or <code>false</code> otherwise.",
    "examples": [
      {
        "id": 1,
        "stdin": "()",
        "stdout": "true",
        "explanation": "The parentheses match correctly."
      },
      {
        "id": 2,
        "stdin": "()[]{}",
        "stdout": "true",
        "explanation": "All types of brackets close in the correct order."
      },
      {
        "id": 3,
        "stdin": "(]",
        "stdout": "false",
        "explanation": "The round bracket is closed with a square bracket."
      }
    ],
    "constraints": [
      "1 <= s.length <= 10^4",
      "s consists of parentheses only '()[]{}'."
    ],
    "hints": [
      "An interesting property about a valid parenthesis string is that any sub-expression of valid parentheses must also be valid.",
      "What if you use a stack to push opening brackets and pop them when you encounter matching closing brackets?"
    ],
    "starterCode": {
      "javascript": "const fs = require('fs');\n\nfunction main() {\n  const s = fs.readFileSync(0, 'utf-8').trim();\n  const stack = [];\n  const map = { ')': '(', '}': '{', ']': '[' };\n\n  for (const char of s) {\n    if (char in map) {\n      if (stack.length === 0 || stack.pop() !== map[char]) {\n        console.log(\"false\");\n        return;\n      }\n    } else {\n      stack.push(char);\n    }\n  }\n\n  console.log(stack.length === 0 ? \"true\" : \"false\");\n}\n\nmain();",
      "typescript": "import * as fs from 'fs';\n\nfunction main(): void {\n  const s = fs.readFileSync(0, 'utf-8').trim();\n  const stack: string[] = [];\n  const map: Record<string, string> = { ')': '(', '}': '{', ']': '[' };\n\n  for (const char of s) {\n    if (char in map) {\n      if (stack.length === 0 || stack.pop() !== map[char]) {\n        console.log(\"false\");\n        return;\n      }\n    } else {\n      stack.push(char);\n    }\n  }\n\n  console.log(stack.length === 0 ? \"true\" : \"false\");\n}\n\nmain();",
      "python": "import sys\n\ndef main():\n    s = sys.stdin.read().strip()\n    stack = []\n    mapping = {')': '(', '}': '{', ']': '['}\n\n    for char in s:\n        if char in mapping:\n            top = stack.pop() if stack else '#'\n            if mapping[char] != top:\n                print(\"false\")\n                return\n        else:\n            stack.push(char) if hasattr(stack, 'push') else stack.append(char)\n\n    print(\"true\" if not stack else \"false\")\n\nif __name__ == '__main__':\n    main()",
      "cpp": "#include <iostream>\n#include <string>\n#include <stack>\n#include <unordered_map>\n\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n\n    string s;\n    if (!(cin >> s)) return 0;\n\n    stack<char> st;\n    unordered_map<char, char> map = {\n        {')', '('},\n        {'}', '{'},\n        {']', '['}\n    };\n\n    for (char c : s) {\n        if (map.count(c)) {\n            if (st.empty() || st.top() != map[c]) {\n                cout << \"false\\n\";\n                return 0;\n            }\n            st.pop();\n        } else {\n            st.push(c);\n        }\n    }\n\n    cout << (st.empty() ? \"true\" : \"false\") << \"\\n\";\n    return 0;\n}",
      "java": "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNext()) return;\n        String s = sc.next();\n\n        Stack<Character> stack = new Stack<>();\n        Map<Character, Character> map = new HashMap<>();\n        map.put(')', '(');\n        map.put('}', '{');\n        map.put(']', '[');\n\n        for (int i = 0; i < s.length(); i++) {\n            char c = s.charAt(i);\n            if (map.containsKey(c)) {\n                if (stack.isEmpty() || stack.pop() != map.get(c)) {\n                    System.out.println(\"false\");\n                    return;\n                }\n            } else {\n                stack.push(c);\n            }\n        }\n\n        System.out.println(stack.isEmpty() ? \"true\" : \"false\");\n    }\n}"
    },
    "testcases": [
      {
        "id": 1,
        "name": "Case 1",
        "stdin": "()",
        "expectedStdout": "true"
      },
      {
        "id": 2,
        "name": "Case 2",
        "stdin": "()[]{}",
        "expectedStdout": "true"
      },
      {
        "id": 3,
        "name": "Case 3",
        "stdin": "(]",
        "expectedStdout": "false"
      }
    ],
    "editorial": {
      "summary": "Valid Parentheses is solved with a classic LIFO Stack.",
      "approaches": [
        {
          "title": "Approach 1: Stack",
          "timeComplexity": "O(n)",
          "spaceComplexity": "O(n)",
          "description": "Traverse the string character by character. Push open brackets into a stack. On encountering a close bracket, pop from the stack and verify it matches the current opening bracket."
        }
      ]
    }
  },
  {
    "id": 3,
    "number": 3,
    "title": "Longest Substring Without Repeating Characters",
    "slug": "longest-substring-without-repeating-characters",
    "difficulty": "Medium",
    "category": "Algorithms",
    "acceptance": "34.5%",
    "isExempted": true,
    "likes": 38400,
    "dislikes": 1780,
    "topics": [
      "Hash Table",
      "String",
      "Sliding Window"
    ],
    "companies": [
      "Amazon",
      "Bloomberg",
      "Google",
      "Microsoft",
      "Apple"
    ],
    "description": "\n<p class=\"mb-3\">Given a string <code>s</code>, find the length of the <strong>longest substring</strong> without repeating characters.</p>\n",
    "inputFormat": "A single line containing the string <code>s</code>.",
    "outputFormat": "Print a single integer denoting the length of the longest substring without duplicate characters.",
    "examples": [
      {
        "id": 1,
        "stdin": "abcabcbb",
        "stdout": "3",
        "explanation": "The answer is 'abc', with the length of 3."
      },
      {
        "id": 2,
        "stdin": "bbbbb",
        "stdout": "1",
        "explanation": "The answer is 'b', with the length of 1."
      },
      {
        "id": 3,
        "stdin": "pwwkew",
        "stdout": "3",
        "explanation": "The answer is 'wke', with the length of 3."
      }
    ],
    "constraints": [
      "0 <= s.length <= 5 * 10^4",
      "s consists of English letters, digits, symbols and spaces."
    ],
    "hints": [
      "Use a sliding window [left, right] to maintain characters currently in the window.",
      "Store the last seen index of each character to skip left pointer directly past the previous occurrence."
    ],
    "starterCode": {
      "javascript": "const fs = require('fs');\n\nfunction main() {\n  const s = fs.readFileSync(0, 'utf-8').replace(/[\\r\\n]/g, '');\n  const charMap = new Map();\n  let maxLen = 0;\n  let left = 0;\n\n  for (let right = 0; right < s.length; right++) {\n    const char = s[right];\n    if (charMap.has(char) && charMap.get(char) >= left) {\n      left = charMap.get(char) + 1;\n    }\n    charMap.set(char, right);\n    maxLen = Math.max(maxLen, right - left + 1);\n  }\n\n  console.log(maxLen);\n}\n\nmain();",
      "typescript": "import * as fs from 'fs';\n\nfunction main(): void {\n  const s = fs.readFileSync(0, 'utf-8').replace(/[\\r\\n]/g, '');\n  const charMap = new Map<string, number>();\n  let maxLen = 0;\n  let left = 0;\n\n  for (let right = 0; right < s.length; right++) {\n    const char = s[right];\n    if (charMap.has(char) && charMap.get(char)! >= left) {\n      left = charMap.get(char)! + 1;\n    }\n    charMap.set(char, right);\n    maxLen = Math.max(maxLen, right - left + 1);\n  }\n\n  console.log(maxLen);\n}\n\nmain();",
      "python": "import sys\n\ndef main():\n    s = sys.stdin.read().rstrip('\\r\\n')\n    char_map = {}\n    max_len = 0\n    left = 0\n\n    for right, char in enumerate(s):\n        if char in char_map and char_map[char] >= left:\n            left = char_map[char] + 1\n        char_map[char] = right\n        max_len = max(max_len, right - left + 1)\n\n    print(max_len)\n\nif __name__ == '__main__':\n    main()",
      "cpp": "#include <iostream>\n#include <string>\n#include <vector>\n#include <algorithm>\n\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n\n    string s;\n    getline(cin, s);\n\n    vector<int> lastIndex(256, -1);\n    int maxLen = 0, left = 0;\n\n    for (int right = 0; right < (int)s.size(); right++) {\n        unsigned char c = s[right];\n        if (lastIndex[c] >= left) {\n            left = lastIndex[c] + 1;\n        }\n        lastIndex[c] = right;\n        maxLen = max(maxLen, right - left + 1);\n    }\n\n    cout << maxLen << \"\\n\";\n    return 0;\n}",
      "java": "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.hasNextLine() ? sc.nextLine() : \"\";\n\n        Map<Character, Integer> map = new HashMap<>();\n        int maxLen = 0, left = 0;\n\n        for (int right = 0; right < s.length(); right++) {\n            char c = s.charAt(right);\n            if (map.containsKey(c) && map.get(c) >= left) {\n                left = map.get(c) + 1;\n            }\n            map.put(c, right);\n            maxLen = Math.max(maxLen, right - left + 1);\n        }\n\n        System.out.println(maxLen);\n    }\n}"
    },
    "testcases": [
      {
        "id": 1,
        "name": "Case 1",
        "stdin": "abcabcbb",
        "expectedStdout": "3"
      },
      {
        "id": 2,
        "name": "Case 2",
        "stdin": "bbbbb",
        "expectedStdout": "1"
      },
      {
        "id": 3,
        "name": "Case 3",
        "stdin": "pwwkew",
        "expectedStdout": "3"
      }
    ],
    "editorial": {
      "summary": "Sliding Window approach reduces time complexity from O(n^2) to linear O(n).",
      "approaches": [
        {
          "title": "Approach: Sliding Window with Hash Map",
          "timeComplexity": "O(n)",
          "spaceComplexity": "O(min(m, n))",
          "description": "Maintain a sliding window [left, right] where every character is unique. When a repeat is found, jump the left pointer forward past the previous index."
        }
      ]
    }
  },
  {
    "id": 206,
    "number": 206,
    "title": "Reverse Linked List",
    "slug": "reverse-linked-list",
    "difficulty": "Easy",
    "category": "Algorithms",
    "acceptance": "75.1%",
    "isExempted": false,
    "likes": 20500,
    "dislikes": 390,
    "topics": [
      "Linked List",
      "Recursion"
    ],
    "companies": [
      "Amazon",
      "Microsoft",
      "Apple",
      "Google",
      "Meta"
    ],
    "description": "\n<p class=\"mb-3\">Given the head of a singly linked list, reverse the list, and print the reversed values.</p>\n",
    "inputFormat": "The first line contains <code>n</code> (number of nodes).<br/>The second line contains <code>n</code> space-separated integers representing the node values.",
    "outputFormat": "Print the space-separated values of the reversed linked list.",
    "examples": [
      {
        "id": 1,
        "stdin": "5\n1 2 3 4 5",
        "stdout": "5 4 3 2 1",
        "explanation": "1 -> 2 -> 3 -> 4 -> 5 becomes 5 -> 4 -> 3 -> 2 -> 1."
      },
      {
        "id": 2,
        "stdin": "2\n1 2",
        "stdout": "2 1",
        "explanation": "1 -> 2 becomes 2 -> 1."
      },
      {
        "id": 3,
        "stdin": "0\n",
        "stdout": "",
        "explanation": "An empty list reversed remains empty."
      }
    ],
    "constraints": [
      "The number of nodes in the list is the range [0, 5000].",
      "-5000 <= Node.val <= 5000"
    ],
    "hints": [
      "Think about iterating through the list while maintaining a `prev` pointer.",
      "At each step, save `curr.next`, redirect `curr.next = prev`, then advance `prev = curr` and `curr = next`."
    ],
    "starterCode": {
      "javascript": "const fs = require('fs');\n\nfunction main() {\n  const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\n  if (!input || input[0] === \"\") return;\n\n  const n = parseInt(input[0], 10);\n  if (n === 0) return;\n\n  const vals = [];\n  for (let i = 0; i < n; i++) {\n    vals.push(input[1 + i]);\n  }\n\n  vals.reverse();\n  console.log(vals.join(' '));\n}\n\nmain();",
      "typescript": "import * as fs from 'fs';\n\nfunction main(): void {\n  const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\n  if (!input || input[0] === \"\") return;\n\n  const n = parseInt(input[0], 10);\n  if (n === 0) return;\n\n  const vals: string[] = [];\n  for (let i = 0; i < n; i++) {\n    vals.push(input[1 + i]);\n  }\n\n  vals.reverse();\n  console.log(vals.join(' '));\n}\n\nmain();",
      "python": "import sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    if n == 0:\n        return\n    vals = data[1:1 + n]\n    print(*(reversed(vals)))\n\nif __name__ == '__main__':\n    main()",
      "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\n\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n\n    int n;\n    if (!(cin >> n) || n <= 0) return 0;\n\n    vector<int> a(n);\n    for (int i = 0; i < n; i++) {\n        cin >> a[i];\n    }\n\n    for (int i = n - 1; i >= 0; i--) {\n        cout << a[i] << (i == 0 ? \"\" : \" \");\n    }\n    cout << \"\\n\";\n    return 0;\n}",
      "java": "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        if (n <= 0) return;\n\n        int[] a = new int[n];\n        for (int i = 0; i < n; i++) {\n            a[i] = sc.nextInt();\n        }\n\n        StringBuilder sb = new StringBuilder();\n        for (int i = n - 1; i >= 0; i--) {\n            sb.append(a[i]);\n            if (i > 0) sb.append(\" \");\n        }\n        System.out.println(sb.toString());\n    }\n}"
    },
    "testcases": [
      {
        "id": 1,
        "name": "Case 1",
        "stdin": "5\n1 2 3 4 5",
        "expectedStdout": "5 4 3 2 1"
      },
      {
        "id": 2,
        "name": "Case 2",
        "stdin": "2\n1 2",
        "expectedStdout": "2 1"
      },
      {
        "id": 3,
        "name": "Case 3",
        "stdin": "0",
        "expectedStdout": ""
      }
    ],
    "editorial": {
      "summary": "Reversing a linked list can be done in O(n) time and O(1) space iteratively.",
      "approaches": [
        {
          "title": "Iterative Approach",
          "timeComplexity": "O(n)",
          "spaceComplexity": "O(1)",
          "description": "Initialize prev as null and curr as head. In a loop, store curr.next, update curr.next to prev, move prev to curr, and curr to next."
        }
      ]
    }
  },
  {
    "id": 121,
    "number": 121,
    "title": "Best Time to Buy and Sell Stock",
    "slug": "best-time-to-buy-and-sell-stock",
    "difficulty": "Easy",
    "category": "Algorithms",
    "acceptance": "54.2%",
    "isExempted": false,
    "likes": 31000,
    "dislikes": 1100,
    "topics": [
      "Array",
      "Dynamic Programming"
    ],
    "companies": [
      "Amazon",
      "Apple",
      "Google",
      "Microsoft",
      "Goldman Sachs"
    ],
    "description": "\n<p class=\"mb-3\">You are given an array <code>prices</code> where <code>prices[i]</code> is the price of a given stock on the <code>i<sup>th</sup></code> day.</p>\n<p class=\"mb-3\">You want to maximize your profit by choosing a <strong>single day</strong> to buy one stock and choosing a <strong>different day in the future</strong> to sell that stock.</p>\n<p class=\"mb-3\">Print the maximum profit you can achieve from this transaction. If you cannot achieve any profit, print <code>0</code>.</p>\n",
    "inputFormat": "The first line contains an integer <code>n</code> (the number of days).<br/>The second line contains <code>n</code> space-separated integers representing stock prices.",
    "outputFormat": "Print a single integer representing the maximum profit.",
    "examples": [
      {
        "id": 1,
        "stdin": "6\n7 1 5 3 6 4",
        "stdout": "5",
        "explanation": "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5."
      },
      {
        "id": 2,
        "stdin": "5\n7 6 4 3 1",
        "stdout": "0",
        "explanation": "In this case, no transactions are done and max profit = 0."
      }
    ],
    "constraints": [
      "1 <= prices.length <= 10^5",
      "0 <= prices[i] <= 10^4"
    ],
    "hints": [
      "Notice that we only care about the minimum price seen so far and the current price.",
      "Maintain a running minimum as you iterate and calculate (price - minPrice)."
    ],
    "starterCode": {
      "javascript": "const fs = require('fs');\n\nfunction main() {\n  const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\n  if (!input || input.length === 0) return;\n\n  const n = parseInt(input[0], 10);\n  let minPrice = Infinity;\n  let maxProfit = 0;\n\n  for (let i = 0; i < n; i++) {\n    const price = parseInt(input[1 + i], 10);\n    if (price < minPrice) {\n      minPrice = price;\n    } else if (price - minPrice > maxProfit) {\n      maxProfit = price - minPrice;\n    }\n  }\n\n  console.log(maxProfit);\n}\n\nmain();",
      "typescript": "import * as fs from 'fs';\n\nfunction main(): void {\n  const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\n  if (!input || input.length === 0) return;\n\n  const n = parseInt(input[0], 10);\n  let minPrice = Infinity;\n  let maxProfit = 0;\n\n  for (let i = 0; i < n; i++) {\n    const price = parseInt(input[1 + i], 10);\n    if (price < minPrice) {\n      minPrice = price;\n    } else if (price - minPrice > maxProfit) {\n      maxProfit = price - minPrice;\n    }\n  }\n\n  console.log(maxProfit);\n}\n\nmain();",
      "python": "import sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    prices = [int(x) for x in data[1:1 + n]]\n\n    min_price = float('inf')\n    max_profit = 0\n\n    for price in prices:\n        if price < min_price:\n            min_price = price\n        elif price - min_price > max_profit:\n            max_profit = price - min_price\n\n    print(max_profit)\n\nif __name__ == '__main__':\n    main()",
      "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\n\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n\n    int n;\n    if (!(cin >> n)) return 0;\n\n    int minPrice = 1e9, maxProfit = 0;\n    for (int i = 0; i < n; i++) {\n        int price;\n        cin >> price;\n        if (price < minPrice) {\n            minPrice = price;\n        } else if (price - minPrice > maxProfit) {\n            maxProfit = price - minPrice;\n        }\n    }\n\n    cout << maxProfit << \"\\n\";\n    return 0;\n}",
      "java": "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n\n        int minPrice = Integer.MAX_VALUE;\n        int maxProfit = 0;\n\n        for (int i = 0; i < n; i++) {\n            int price = sc.nextInt();\n            if (price < minPrice) {\n                minPrice = price;\n            } else if (price - minPrice > maxProfit) {\n                maxProfit = price - minPrice;\n            }\n        }\n\n        System.out.println(maxProfit);\n    }\n}"
    },
    "testcases": [
      {
        "id": 1,
        "name": "Case 1",
        "stdin": "6\n7 1 5 3 6 4",
        "expectedStdout": "5"
      },
      {
        "id": 2,
        "name": "Case 2",
        "stdin": "5\n7 6 4 3 1",
        "expectedStdout": "0"
      }
    ],
    "editorial": {
      "summary": "One pass greedy tracking of minimum price yields O(n) runtime with O(1) space.",
      "approaches": [
        {
          "title": "One Pass Greedy",
          "timeComplexity": "O(n)",
          "spaceComplexity": "O(1)",
          "description": "Keep track of the smallest price encountered so far. At each step, update potential profit if price - min_price > max_profit."
        }
      ]
    }
  },
  {
    "id": 15,
    "number": 15,
    "title": "3Sum",
    "slug": "3sum",
    "difficulty": "Medium",
    "category": "Algorithms",
    "acceptance": "33.8%",
    "isExempted": true,
    "likes": 31000,
    "dislikes": 2800,
    "topics": [
      "Array",
      "Two Pointers",
      "Sorting"
    ],
    "companies": [
      "Meta",
      "Amazon",
      "Apple",
      "Google",
      "Bloomberg"
    ],
    "description": "\n<p class=\"mb-3\">Given an integer array <code>nums</code>, print all the unique triplets <code>[nums[i], nums[j], nums[k]]</code> such that <code>i != j</code>, <code>i != k</code>, and <code>j != k</code>, and <code>nums[i] + nums[j] + nums[k] == 0</code>.</p>\n<p class=\"mb-3\">Notice that the solution set must not contain duplicate triplets. Print each triplet on a separate line with its sorted elements space-separated. If no triplets exist, print <code>NONE</code>.</p>\n",
    "inputFormat": "The first line contains an integer <code>n</code>.<br/>The second line contains <code>n</code> space-separated integers.",
    "outputFormat": "Print each unique triplet on a new line with elements sorted and space-separated. If none, print <code>NONE</code>.",
    "examples": [
      {
        "id": 1,
        "stdin": "6\n-1 0 1 2 -1 -4",
        "stdout": "-1 -1 2\n-1 0 1",
        "explanation": "The distinct triplets adding to 0 are [-1,-1,2] and [-1,0,1]."
      },
      {
        "id": 2,
        "stdin": "3\n0 1 1",
        "stdout": "NONE",
        "explanation": "The only possible triplet does not sum up to 0."
      },
      {
        "id": 3,
        "stdin": "3\n0 0 0",
        "stdout": "0 0 0",
        "explanation": "The only possible triplet sums up to 0."
      }
    ],
    "constraints": [
      "3 <= nums.length <= 3000",
      "-10^5 <= nums[i] <= 10^5"
    ],
    "hints": [
      "So, we can sort the array first. Sorting helps in avoiding duplicates easily.",
      "For each element nums[i], use two pointers (left and right) on the remainder of the array."
    ],
    "starterCode": {
      "javascript": "const fs = require('fs');\n\nfunction main() {\n  const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\n  if (!input || input.length < 2) return;\n\n  const n = parseInt(input[0], 10);\n  const nums = [];\n  for (let i = 0; i < n; i++) {\n    nums.push(parseInt(input[1 + i], 10));\n  }\n\n  nums.sort((a, b) => a - b);\n  const results = [];\n\n  for (let i = 0; i < nums.length - 2; i++) {\n    if (i > 0 && nums[i] === nums[i - 1]) continue;\n    if (nums[i] > 0) break;\n\n    let left = i + 1;\n    let right = nums.length - 1;\n\n    while (left < right) {\n      const sum = nums[i] + nums[left] + nums[right];\n      if (sum === 0) {\n        results.push(`${nums[i]} ${nums[left]} ${nums[right]}`);\n        while (left < right && nums[left] === nums[left + 1]) left++;\n        while (left < right && nums[right] === nums[right - 1]) right--;\n        left++;\n        right--;\n      } else if (sum < 0) {\n        left++;\n      } else {\n        right--;\n      }\n    }\n  }\n\n  if (results.length === 0) {\n    console.log(\"NONE\");\n  } else {\n    console.log(results.join('\\n'));\n  }\n}\n\nmain();",
      "typescript": "import * as fs from 'fs';\n\nfunction main(): void {\n  const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\n  if (!input || input.length < 2) return;\n\n  const n = parseInt(input[0], 10);\n  const nums: number[] = [];\n  for (let i = 0; i < n; i++) {\n    nums.push(parseInt(input[1 + i], 10));\n  }\n\n  nums.sort((a, b) => a - b);\n  const results: string[] = [];\n\n  for (let i = 0; i < nums.length - 2; i++) {\n    if (i > 0 && nums[i] === nums[i - 1]) continue;\n    if (nums[i] > 0) break;\n\n    let left = i + 1;\n    let right = nums.length - 1;\n\n    while (left < right) {\n      const sum = nums[i] + nums[left] + nums[right];\n      if (sum === 0) {\n        results.push(`${nums[i]} ${nums[left]} ${nums[right]}`);\n        while (left < right && nums[left] === nums[left + 1]) left++;\n        while (left < right && nums[right] === nums[right - 1]) right--;\n        left++;\n        right--;\n      } else if (sum < 0) {\n        left++;\n      } else {\n        right--;\n      }\n    }\n  }\n\n  if (results.length === 0) {\n    console.log(\"NONE\");\n  } else {\n    console.log(results.join('\\n'));\n  }\n}\n\nmain();",
      "python": "import sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    nums = sorted([int(x) for x in data[1:1 + n]])\n    results = []\n\n    for i in range(len(nums) - 2):\n        if i > 0 and nums[i] == nums[i - 1]:\n            continue\n        if nums[i] > 0:\n            break\n\n        left, right = i + 1, len(nums) - 1\n        while left < right:\n            total = nums[i] + nums[left] + nums[right]\n            if total == 0:\n                results.append(f\"{nums[i]} {nums[left]} {nums[right]}\")\n                while left < right and nums[left] == nums[left + 1]:\n                    left += 1\n                while left < right and nums[right] == nums[right - 1]:\n                    right -= 1\n                left += 1\n                right -= 1\n            elif total < 0:\n                left += 1\n            else:\n                right -= 1\n\n    if not results:\n        print(\"NONE\")\n    else:\n        print(\"\\n\".join(results))\n\nif __name__ == '__main__':\n    main()",
      "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\n\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n\n    int n;\n    if (!(cin >> n) || n < 3) {\n        cout << \"NONE\\n\";\n        return 0;\n    }\n\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n\n    sort(nums.begin(), nums.end());\n    vector<string> res;\n\n    for (int i = 0; i < n - 2; i++) {\n        if (i > 0 && nums[i] == nums[i - 1]) continue;\n        if (nums[i] > 0) break;\n\n        int left = i + 1, right = n - 1;\n        while (left < right) {\n            int sum = nums[i] + nums[left] + nums[right];\n            if (sum == 0) {\n                res.push_back(to_string(nums[i]) + \" \" + to_string(nums[left]) + \" \" + to_string(nums[right]));\n                while (left < right && nums[left] == nums[left + 1]) left++;\n                while (left < right && nums[right] == nums[right - 1]) right--;\n                left++;\n                right--;\n            } else if (sum < 0) {\n                left++;\n            } else {\n                right--;\n            }\n        }\n    }\n\n    if (res.empty()) {\n        cout << \"NONE\\n\";\n    } else {\n        for (const string& s : res) cout << s << \"\\n\";\n    }\n    return 0;\n}",
      "java": "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) {\n            System.out.println(\"NONE\");\n            return;\n        }\n        int n = sc.nextInt();\n        int[] nums = new int[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();\n\n        Arrays.sort(nums);\n        List<String> results = new ArrayList<>();\n\n        for (int i = 0; i < n - 2; i++) {\n            if (i > 0 && nums[i] == nums[i - 1]) continue;\n            if (nums[i] > 0) break;\n\n            int left = i + 1, right = n - 1;\n            while (left < right) {\n                int sum = nums[i] + nums[left] + nums[right];\n                if (sum == 0) {\n                    results.add(nums[i] + \" \" + nums[left] + \" \" + nums[right]);\n                    while (left < right && nums[left] == nums[left + 1]) left++;\n                    while (left < right && nums[right] == nums[right - 1]) right--;\n                    left++;\n                    right--;\n                } else if (sum < 0) {\n                    left++;\n                } else {\n                    right--;\n                }\n            }\n        }\n\n        if (results.isEmpty()) {\n            System.out.println(\"NONE\");\n        } else {\n            for (String s : results) System.out.println(s);\n        }\n    }\n}"
    },
    "testcases": [
      {
        "id": 1,
        "name": "Case 1",
        "stdin": "6\n-1 0 1 2 -1 -4",
        "expectedStdout": "-1 -1 2\n-1 0 1"
      },
      {
        "id": 2,
        "name": "Case 2",
        "stdin": "3\n0 1 1",
        "expectedStdout": "NONE"
      },
      {
        "id": 3,
        "name": "Case 3",
        "stdin": "3\n0 0 0",
        "expectedStdout": "0 0 0"
      }
    ],
    "editorial": {
      "summary": "Sort the array and use Two Pointers to find all non-duplicate triplets in O(n^2) time.",
      "approaches": [
        {
          "title": "Sort + Two Pointers",
          "timeComplexity": "O(n^2)",
          "spaceComplexity": "O(1) extra space",
          "description": "Sorting allows skipping duplicate values easily and checking targets using two pointers inward from left and right."
        }
      ]
    }
  },
  {
    "id": 11,
    "number": 11,
    "title": "Container With Most Water",
    "slug": "container-with-most-water",
    "difficulty": "Medium",
    "category": "Algorithms",
    "acceptance": "54.8%",
    "isExempted": false,
    "likes": 27500,
    "dislikes": 1500,
    "topics": [
      "Array",
      "Two Pointers",
      "Greedy"
    ],
    "companies": [
      "Google",
      "Amazon",
      "Adobe",
      "Apple"
    ],
    "description": "\n<p class=\"mb-3\">You are given an integer array <code>height</code> of length <code>n</code>. There are <code>n</code> vertical lines drawn such that the two endpoints of the <code>i<sup>th</sup></code> line are <code>(i, 0)</code> and <code>(i, height[i])</code>.</p>\n<p class=\"mb-3\">Find two lines that together with the x-axis form a container, such that the container contains the most water.</p>\n<p class=\"mb-3\">Print the maximum amount of water a container can store.</p>\n",
    "inputFormat": "The first line contains <code>n</code> (number of lines).<br/>The second line contains <code>n</code> space-separated integers denoting heights.",
    "outputFormat": "Print a single integer representing the maximum area of water.",
    "examples": [
      {
        "id": 1,
        "stdin": "9\n1 8 6 2 5 4 8 3 7",
        "stdout": "49",
        "explanation": "The lines at index 1 (height 8) and index 8 (height 7) hold water with area min(8, 7) * (8 - 1) = 49."
      },
      {
        "id": 2,
        "stdin": "2\n1 1",
        "stdout": "1",
        "explanation": "The two lines hold area min(1, 1) * (1 - 0) = 1."
      }
    ],
    "constraints": [
      "n == height.length",
      "2 <= n <= 10^5",
      "0 <= height[i] <= 10^4"
    ],
    "hints": [
      "The area is limited by the shorter line: min(height[i], height[j]) * (j - i).",
      "Start with maximum width (pointers at both ends) and greedily move the shorter line inward."
    ],
    "starterCode": {
      "javascript": "const fs = require('fs');\n\nfunction main() {\n  const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\n  if (!input || input.length < 2) return;\n\n  const n = parseInt(input[0], 10);\n  const height = [];\n  for (let i = 0; i < n; i++) {\n    height.push(parseInt(input[1 + i], 10));\n  }\n\n  let left = 0;\n  let right = n - 1;\n  let maxWater = 0;\n\n  while (left < right) {\n    const w = right - left;\n    const h = Math.min(height[left], height[right]);\n    const area = w * h;\n    if (area > maxWater) maxWater = area;\n\n    if (height[left] < height[right]) {\n      left++;\n    } else {\n      right--;\n    }\n  }\n\n  console.log(maxWater);\n}\n\nmain();",
      "typescript": "import * as fs from 'fs';\n\nfunction main(): void {\n  const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\n  if (!input || input.length < 2) return;\n\n  const n = parseInt(input[0], 10);\n  const height: number[] = [];\n  for (let i = 0; i < n; i++) {\n    height.push(parseInt(input[1 + i], 10));\n  }\n\n  let left = 0;\n  let right = n - 1;\n  let maxWater = 0;\n\n  while (left < right) {\n    const w = right - left;\n    const h = Math.min(height[left], height[right]);\n    const area = w * h;\n    if (area > maxWater) maxWater = area;\n\n    if (height[left] < height[right]) {\n      left++;\n    } else {\n      right--;\n    }\n  }\n\n  console.log(maxWater);\n}\n\nmain();",
      "python": "import sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    height = [int(x) for x in data[1:1 + n]]\n\n    left, right = 0, n - 1\n    max_water = 0\n\n    while left < right:\n        w = right - left\n        h = min(height[left], height[right])\n        area = w * h\n        if area > max_water:\n            max_water = area\n\n        if height[left] < height[right]:\n            left += 1\n        else:\n            right -= 1\n\n    print(max_water)\n\nif __name__ == '__main__':\n    main()",
      "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\n\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n\n    int n;\n    if (!(cin >> n)) return 0;\n\n    vector<int> height(n);\n    for (int i = 0; i < n; i++) cin >> height[i];\n\n    int left = 0, right = n - 1, maxWater = 0;\n    while (left < right) {\n        int area = (right - left) * min(height[left], height[right]);\n        maxWater = max(maxWater, area);\n\n        if (height[left] < height[right]) {\n            left++;\n        } else {\n            right--;\n        }\n    }\n\n    cout << maxWater << \"\\n\";\n    return 0;\n}",
      "java": "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n\n        int[] height = new int[n];\n        for (int i = 0; i < n; i++) height[i] = sc.nextInt();\n\n        int left = 0, right = n - 1, maxWater = 0;\n        while (left < right) {\n            int area = (right - left) * Math.min(height[left], height[right]);\n            maxWater = Math.max(maxWater, area);\n\n            if (height[left] < height[right]) {\n                left++;\n            } else {\n                right--;\n            }\n        }\n\n        System.out.println(maxWater);\n    }\n}"
    },
    "testcases": [
      {
        "id": 1,
        "name": "Case 1",
        "stdin": "9\n1 8 6 2 5 4 8 3 7",
        "expectedStdout": "49"
      },
      {
        "id": 2,
        "name": "Case 2",
        "stdin": "2\n1 1",
        "expectedStdout": "1"
      }
    ],
    "editorial": {
      "summary": "Two pointers inward approach guarantees O(n) runtime by eliminating suboptimal heights at each step.",
      "approaches": [
        {
          "title": "Two Pointers",
          "timeComplexity": "O(n)",
          "spaceComplexity": "O(1)",
          "description": "Initialize pointers at both boundaries. Compute the current area and move the pointer pointing to the shorter vertical bar inward."
        }
      ]
    }
  },
  {
    "id": 53,
    "number": 53,
    "title": "Maximum Subarray",
    "slug": "maximum-subarray",
    "difficulty": "Medium",
    "category": "Algorithms",
    "acceptance": "50.7%",
    "isExempted": false,
    "likes": 34000,
    "dislikes": 1400,
    "topics": [
      "Array",
      "Divide and Conquer",
      "Dynamic Programming"
    ],
    "companies": [
      "Amazon",
      "Microsoft",
      "Apple",
      "Google",
      "LinkedIn"
    ],
    "description": "\n<p class=\"mb-3\">Given an integer array <code>nums</code>, find the subarray with the largest sum, and print its sum.</p>\n",
    "inputFormat": "The first line contains an integer <code>n</code>.<br/>The second line contains <code>n</code> space-separated integers.",
    "outputFormat": "Print a single integer representing the maximum contiguous subarray sum.",
    "examples": [
      {
        "id": 1,
        "stdin": "9\n-2 1 -3 4 -1 2 1 -5 4",
        "stdout": "6",
        "explanation": "The subarray [4,-1,2,1] has the largest sum 6."
      },
      {
        "id": 2,
        "stdin": "1\n1",
        "stdout": "1",
        "explanation": "The subarray [1] has the largest sum 1."
      },
      {
        "id": 3,
        "stdin": "5\n5 4 -1 7 8",
        "stdout": "23",
        "explanation": "The subarray [5,4,-1,7,8] has the largest sum 23."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4"
    ],
    "hints": [
      "Try Kadane's algorithm: at each position, decide whether to add nums[i] to current sum or start fresh from nums[i].",
      "currSum = max(nums[i], currSum + nums[i])"
    ],
    "starterCode": {
      "javascript": "const fs = require('fs');\n\nfunction main() {\n  const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\n  if (!input || input.length < 2) return;\n\n  const n = parseInt(input[0], 10);\n  let maxSoFar = parseInt(input[1], 10);\n  let currentMax = maxSoFar;\n\n  for (let i = 1; i < n; i++) {\n    const num = parseInt(input[1 + i], 10);\n    currentMax = Math.max(num, currentMax + num);\n    maxSoFar = Math.max(maxSoFar, currentMax);\n  }\n\n  console.log(maxSoFar);\n}\n\nmain();",
      "typescript": "import * as fs from 'fs';\n\nfunction main(): void {\n  const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\n  if (!input || input.length < 2) return;\n\n  const n = parseInt(input[0], 10);\n  let maxSoFar = parseInt(input[1], 10);\n  let currentMax = maxSoFar;\n\n  for (let i = 1; i < n; i++) {\n    const num = parseInt(input[1 + i], 10);\n    currentMax = Math.max(num, currentMax + num);\n    maxSoFar = Math.max(maxSoFar, currentMax);\n  }\n\n  console.log(maxSoFar);\n}\n\nmain();",
      "python": "import sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    nums = [int(x) for x in data[1:1 + n]]\n\n    max_so_far = nums[0]\n    curr_max = nums[0]\n\n    for num in nums[1:]:\n        curr_max = max(num, curr_max + num)\n        max_so_far = max(max_so_far, curr_max)\n\n    print(max_so_far)\n\nif __name__ == '__main__':\n    main()",
      "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\n\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n\n    int n;\n    if (!(cin >> n)) return 0;\n\n    int first;\n    cin >> first;\n    long long maxSoFar = first, currentMax = first;\n\n    for (int i = 1; i < n; i++) {\n        int num;\n        cin >> num;\n        currentMax = max((long long)num, currentMax + num);\n        maxSoFar = max(maxSoFar, currentMax);\n    }\n\n    cout << maxSoFar << \"\\n\";\n    return 0;\n}",
      "java": "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n\n        int first = sc.nextInt();\n        long maxSoFar = first;\n        long currentMax = first;\n\n        for (int i = 1; i < n; i++) {\n            int num = sc.nextInt();\n            currentMax = Math.max(num, currentMax + num);\n            maxSoFar = Math.max(maxSoFar, currentMax);\n        }\n\n        System.out.println(maxSoFar);\n    }\n}"
    },
    "testcases": [
      {
        "id": 1,
        "name": "Case 1",
        "stdin": "9\n-2 1 -3 4 -1 2 1 -5 4",
        "expectedStdout": "6"
      },
      {
        "id": 2,
        "name": "Case 2",
        "stdin": "1\n1",
        "expectedStdout": "1"
      },
      {
        "id": 3,
        "name": "Case 3",
        "stdin": "5\n5 4 -1 7 8",
        "expectedStdout": "23"
      }
    ],
    "editorial": {
      "summary": "Kadane's algorithm solves maximum subarray in linear O(n) time.",
      "approaches": [
        {
          "title": "Kadane's Algorithm",
          "timeComplexity": "O(n)",
          "spaceComplexity": "O(1)",
          "description": "Iterate through the array while maintaining the maximum sum ending at the current position. Update the global maximum at each step."
        }
      ]
    }
  },
  {
    "id": 704,
    "number": 704,
    "title": "Binary Search",
    "slug": "binary-search",
    "difficulty": "Easy",
    "category": "Algorithms",
    "acceptance": "57.3%",
    "isExempted": false,
    "likes": 12000,
    "dislikes": 240,
    "topics": [
      "Array",
      "Binary Search"
    ],
    "companies": [
      "Apple",
      "Google",
      "Microsoft",
      "Amazon"
    ],
    "description": "\n<p class=\"mb-3\">Given an array of integers <code>nums</code> which is sorted in ascending order, and an integer <code>target</code>, write a program to search <code>target</code> in <code>nums</code>.</p>\n<p class=\"mb-3\">If <code>target</code> exists, then print its index. Otherwise, print <code>-1</code>.</p>\n<p class=\"mb-3\">You must write an algorithm with <code>O(log n)</code> runtime complexity.</p>\n",
    "inputFormat": "The first line contains two integers: <code>n</code> and <code>target</code>.<br/>The second line contains <code>n</code> sorted space-separated integers.",
    "outputFormat": "Print the 0-based index of target, or <code>-1</code> if not found.",
    "examples": [
      {
        "id": 1,
        "stdin": "6 9\n-1 0 3 5 9 12",
        "stdout": "4",
        "explanation": "9 exists in nums and its index is 4."
      },
      {
        "id": 2,
        "stdin": "6 2\n-1 0 3 5 9 12",
        "stdout": "-1",
        "explanation": "2 does not exist in nums so print -1."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^4",
      "-10^4 < nums[i], target < 10^4",
      "All the integers in nums are unique.",
      "nums is sorted in ascending order."
    ],
    "hints": [
      "Use two pointers: left = 0, right = n - 1.",
      "mid = left + Math.floor((right - left) / 2) avoids integer overflow."
    ],
    "starterCode": {
      "javascript": "const fs = require('fs');\n\nfunction main() {\n  const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\n  if (!input || input.length < 2) return;\n\n  const n = parseInt(input[0], 10);\n  const target = parseInt(input[1], 10);\n  const nums = [];\n  for (let i = 0; i < n; i++) {\n    nums.push(parseInt(input[2 + i], 10));\n  }\n\n  let left = 0;\n  let right = n - 1;\n  let ans = -1;\n\n  while (left <= right) {\n    const mid = Math.floor(left + (right - left) / 2);\n    if (nums[mid] === target) {\n      ans = mid;\n      break;\n    } else if (nums[mid] < target) {\n      left = mid + 1;\n    } else {\n      right = mid - 1;\n    }\n  }\n\n  console.log(ans);\n}\n\nmain();",
      "typescript": "import * as fs from 'fs';\n\nfunction main(): void {\n  const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\n  if (!input || input.length < 2) return;\n\n  const n = parseInt(input[0], 10);\n  const target = parseInt(input[1], 10);\n  const nums: number[] = [];\n  for (let i = 0; i < n; i++) {\n    nums.push(parseInt(input[2 + i], 10));\n  }\n\n  let left = 0;\n  let right = n - 1;\n  let ans = -1;\n\n  while (left <= right) {\n    const mid = Math.floor(left + (right - left) / 2);\n    if (nums[mid] === target) {\n      ans = mid;\n      break;\n    } else if (nums[mid] < target) {\n      left = mid + 1;\n    } else {\n      right = mid - 1;\n    }\n  }\n\n  console.log(ans);\n}\n\nmain();",
      "python": "import sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    target = int(data[1])\n    nums = [int(x) for x in data[2:2 + n]]\n\n    left, right = 0, n - 1\n    ans = -1\n\n    while left <= right:\n        mid = (left + right) // 2\n        if nums[mid] == target:\n            ans = mid\n            break\n        elif nums[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n\n    print(ans)\n\nif __name__ == '__main__':\n    main()",
      "cpp": "#include <iostream>\n#include <vector>\n\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n\n    int n, target;\n    if (!(cin >> n >> target)) return 0;\n\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n\n    int left = 0, right = n - 1, ans = -1;\n    while (left <= right) {\n        int mid = left + (right - left) / 2;\n        if (nums[mid] == target) {\n            ans = mid;\n            break;\n        } else if (nums[mid] < target) {\n            left = mid + 1;\n        } else {\n            right = mid - 1;\n        }\n    }\n\n    cout << ans << \"\\n\";\n    return 0;\n}",
      "java": "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int target = sc.nextInt();\n\n        int[] nums = new int[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();\n\n        int left = 0, right = n - 1, ans = -1;\n        while (left <= right) {\n            int mid = left + (right - left) / 2;\n            if (nums[mid] == target) {\n                ans = mid;\n                break;\n            } else if (nums[mid] < target) {\n                left = mid + 1;\n            } else {\n                right = mid - 1;\n            }\n        }\n\n        System.out.println(ans);\n    }\n}"
    },
    "testcases": [
      {
        "id": 1,
        "name": "Case 1",
        "stdin": "6 9\n-1 0 3 5 9 12",
        "expectedStdout": "4"
      },
      {
        "id": 2,
        "name": "Case 2",
        "stdin": "6 2\n-1 0 3 5 9 12",
        "expectedStdout": "-1"
      }
    ],
    "editorial": {
      "summary": "Divide and conquer logarithmic search halves the search space at each comparison.",
      "approaches": [
        {
          "title": "Iterative Binary Search",
          "timeComplexity": "O(log n)",
          "spaceComplexity": "O(1)",
          "description": "Compare target with middle element. If equal, target is found. If target is greater, discard left half; if smaller, discard right half."
        }
      ]
    }
  },
  {
    "id": 21,
    "number": 21,
    "title": "Merge Two Sorted Lists",
    "slug": "merge-two-sorted-lists",
    "difficulty": "Easy",
    "category": "Algorithms",
    "acceptance": "63.5%",
    "isExempted": false,
    "likes": 21000,
    "dislikes": 1950,
    "topics": [
      "Linked List",
      "Recursion"
    ],
    "companies": [
      "Amazon",
      "Microsoft",
      "Apple",
      "Google"
    ],
    "description": "\n<p class=\"mb-3\">You are given two sorted arrays representing two linked lists: <code>list1</code> and <code>list2</code>.</p>\n<p class=\"mb-3\">Merge the two lists into one <strong>sorted</strong> list and print the values space-separated.</p>\n",
    "inputFormat": "The first line contains two integers: <code>n</code> and <code>m</code> (sizes of list1 and list2).<br/>The second line contains <code>n</code> sorted integers (if n > 0).<br/>The third line contains <code>m</code> sorted integers (if m > 0).",
    "outputFormat": "Print the space-separated values of the merged sorted list.",
    "examples": [
      {
        "id": 1,
        "stdin": "3 3\n1 2 4\n1 3 4",
        "stdout": "1 1 2 3 4 4",
        "explanation": "The two sorted lists merged in order give 1 1 2 3 4 4."
      },
      {
        "id": 2,
        "stdin": "0 0",
        "stdout": "",
        "explanation": "Both lists are empty."
      },
      {
        "id": 3,
        "stdin": "0 1\n0",
        "stdout": "0",
        "explanation": "List 1 is empty, list 2 has 0."
      }
    ],
    "constraints": [
      "The number of nodes in both lists is in the range [0, 50].",
      "-100 <= Node.val <= 100",
      "Both list1 and list2 are sorted in non-decreasing order."
    ],
    "hints": [
      "Use two pointers to compare the front of both lists and append the smaller value.",
      "When one list finishes, append all remaining elements of the other list."
    ],
    "starterCode": {
      "javascript": "const fs = require('fs');\n\nfunction main() {\n  const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\n  if (!input || input[0] === \"\") return;\n\n  const n = parseInt(input[0], 10);\n  const m = parseInt(input[1], 10);\n  if (n + m === 0) return;\n\n  const a = [];\n  for (let i = 0; i < n; i++) {\n    a.push(parseInt(input[2 + i], 10));\n  }\n  const b = [];\n  for (let i = 0; i < m; i++) {\n    b.push(parseInt(input[2 + n + i], 10));\n  }\n\n  const merged = [];\n  let i = 0, j = 0;\n  while (i < n && j < m) {\n    if (a[i] <= b[j]) {\n      merged.push(a[i++]);\n    } else {\n      merged.push(b[j++]);\n    }\n  }\n  while (i < n) merged.push(a[i++]);\n  while (j < m) merged.push(b[j++]);\n\n  console.log(merged.join(' '));\n}\n\nmain();",
      "typescript": "import * as fs from 'fs';\n\nfunction main(): void {\n  const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\n  if (!input || input[0] === \"\") return;\n\n  const n = parseInt(input[0], 10);\n  const m = parseInt(input[1], 10);\n  if (n + m === 0) return;\n\n  const a: number[] = [];\n  for (let i = 0; i < n; i++) {\n    a.push(parseInt(input[2 + i], 10));\n  }\n  const b: number[] = [];\n  for (let i = 0; i < m; i++) {\n    b.push(parseInt(input[2 + n + i], 10));\n  }\n\n  const merged: number[] = [];\n  let i = 0, j = 0;\n  while (i < n && j < m) {\n    if (a[i] <= b[j]) {\n      merged.push(a[i++]);\n    } else {\n      merged.push(b[j++]);\n    }\n  }\n  while (i < n) merged.push(a[i++]);\n  while (j < m) merged.push(b[j++]);\n\n  console.log(merged.join(' '));\n}\n\nmain();",
      "python": "import sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    m = int(data[1])\n    if n + m == 0:\n        return\n\n    a = [int(x) for x in data[2:2 + n]]\n    b = [int(x) for x in data[2 + n:2 + n + m]]\n\n    merged = []\n    i = j = 0\n    while i < n and j < m:\n        if a[i] <= b[j]:\n            merged.append(a[i])\n            i += 1\n        else:\n            merged.append(b[j])\n            j += 1\n    merged.extend(a[i:])\n    merged.extend(b[j:])\n\n    print(*(merged))\n\nif __name__ == '__main__':\n    main()",
      "cpp": "#include <iostream>\n#include <vector>\n\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n\n    int n, m;\n    if (!(cin >> n >> m)) return 0;\n    if (n + m == 0) return 0;\n\n    vector<int> a(n), b(m);\n    for (int i = 0; i < n; i++) cin >> a[i];\n    for (int i = 0; i < m; i++) cin >> b[i];\n\n    vector<int> merged;\n    int i = 0, j = 0;\n    while (i < n && j < m) {\n        if (a[i] <= b[j]) merged.push_back(a[i++]);\n        else merged.push_back(b[j++]);\n    }\n    while (i < n) merged.push_back(a[i++]);\n    while (j < m) merged.push_back(b[j++]);\n\n    for (int k = 0; k < (int)merged.size(); k++) {\n        cout << merged[k] << (k == (int)merged.size() - 1 ? \"\" : \" \");\n    }\n    cout << \"\\n\";\n    return 0;\n}",
      "java": "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int m = sc.nextInt();\n        if (n + m == 0) return;\n\n        int[] a = new int[n];\n        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n        int[] b = new int[m];\n        for (int i = 0; i < m; i++) b[i] = sc.nextInt();\n\n        StringBuilder sb = new StringBuilder();\n        int i = 0, j = 0;\n        boolean first = true;\n        while (i < n && j < m) {\n            if (!first) sb.append(\" \");\n            first = false;\n            if (a[i] <= b[j]) sb.append(a[i++]);\n            else sb.append(b[j++]);\n        }\n        while (i < n) {\n            if (!first) sb.append(\" \");\n            first = false;\n            sb.append(a[i++]);\n        }\n        while (j < m) {\n            if (!first) sb.append(\" \");\n            first = false;\n            sb.append(b[j++]);\n        }\n        System.out.println(sb.toString());\n    }\n}"
    },
    "testcases": [
      {
        "id": 1,
        "name": "Case 1",
        "stdin": "3 3\n1 2 4\n1 3 4",
        "expectedStdout": "1 1 2 3 4 4"
      },
      {
        "id": 2,
        "name": "Case 2",
        "stdin": "0 0",
        "expectedStdout": ""
      },
      {
        "id": 3,
        "name": "Case 3",
        "stdin": "0 1\n0",
        "expectedStdout": "0"
      }
    ],
    "editorial": {
      "summary": "Merge step identical to merge sort running in O(n + m) time.",
      "approaches": [
        {
          "title": "Dummy Sentinel Pointer",
          "timeComplexity": "O(n + m)",
          "spaceComplexity": "O(1)",
          "description": "Use a sentinel node and advance a pointer pointing to whichever node value is smaller."
        }
      ]
    }
  },
  {
    "id": 42,
    "number": 42,
    "title": "Trapping Rain Water",
    "slug": "trapping-rain-water",
    "difficulty": "Hard",
    "category": "Algorithms",
    "acceptance": "61.0%",
    "isExempted": true,
    "likes": 30500,
    "dislikes": 450,
    "topics": [
      "Array",
      "Two Pointers",
      "Dynamic Programming",
      "Stack"
    ],
    "companies": [
      "Amazon",
      "Goldman Sachs",
      "Google",
      "Meta",
      "Bloomberg"
    ],
    "description": "\n<p class=\"mb-3\">Given <code>n</code> non-negative integers representing an elevation map where the width of each bar is <code>1</code>, compute how much water it can trap after raining.</p>\n",
    "inputFormat": "The first line contains an integer <code>n</code>.<br/>The second line contains <code>n</code> space-separated integers representing heights.",
    "outputFormat": "Print a single integer representing the total amount of water trapped.",
    "examples": [
      {
        "id": 1,
        "stdin": "12\n0 1 0 2 1 0 1 3 2 1 2 1",
        "stdout": "6",
        "explanation": "The elevation map traps 6 units of rain water."
      },
      {
        "id": 2,
        "stdin": "6\n4 2 0 3 2 5",
        "stdout": "9",
        "explanation": "The elevation map traps 9 units of rain water."
      }
    ],
    "constraints": [
      "n == height.length",
      "1 <= n <= 2 * 10^4",
      "0 <= height[i] <= 10^5"
    ],
    "hints": [
      "Water above bar i is determined by min(maxLeft, maxRight) - height[i].",
      "We can compute this in O(1) auxiliary space using two pointers from the left and right ends."
    ],
    "starterCode": {
      "javascript": "const fs = require('fs');\n\nfunction main() {\n  const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\n  if (!input || input.length < 2) return;\n\n  const n = parseInt(input[0], 10);\n  const height = [];\n  for (let i = 0; i < n; i++) {\n    height.push(parseInt(input[1 + i], 10));\n  }\n\n  let left = 0;\n  let right = n - 1;\n  let leftMax = 0;\n  let rightMax = 0;\n  let water = 0;\n\n  while (left < right) {\n    if (height[left] < height[right]) {\n      if (height[left] >= leftMax) {\n        leftMax = height[left];\n      } else {\n        water += leftMax - height[left];\n      }\n      left++;\n    } else {\n      if (height[right] >= rightMax) {\n        rightMax = height[right];\n      } else {\n        water += rightMax - height[right];\n      }\n      right--;\n    }\n  }\n\n  console.log(water);\n}\n\nmain();",
      "typescript": "import * as fs from 'fs';\n\nfunction main(): void {\n  const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\n  if (!input || input.length < 2) return;\n\n  const n = parseInt(input[0], 10);\n  const height: number[] = [];\n  for (let i = 0; i < n; i++) {\n    height.push(parseInt(input[1 + i], 10));\n  }\n\n  let left = 0;\n  let right = n - 1;\n  let leftMax = 0;\n  let rightMax = 0;\n  let water = 0;\n\n  while (left < right) {\n    if (height[left] < height[right]) {\n      if (height[left] >= leftMax) {\n        leftMax = height[left];\n      } else {\n        water += leftMax - height[left];\n      }\n      left++;\n    } else {\n      if (height[right] >= rightMax) {\n        rightMax = height[right];\n      } else {\n        water += rightMax - height[right];\n      }\n      right--;\n    }\n  }\n\n  console.log(water);\n}\n\nmain();",
      "python": "import sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    n = int(data[0])\n    height = [int(x) for x in data[1:1 + n]]\n\n    left, right = 0, n - 1\n    left_max, right_max = 0, 0\n    water = 0\n\n    while left < right:\n        if height[left] < height[right]:\n            if height[left] >= left_max:\n                left_max = height[left]\n            else:\n                water += left_max - height[left]\n            left += 1\n        else:\n            if height[right] >= right_max:\n                right_max = height[right]\n            else:\n                water += right_max - height[right]\n            right -= 1\n\n    print(water)\n\nif __name__ == '__main__':\n    main()",
      "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\n\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n\n    int n;\n    if (!(cin >> n)) return 0;\n\n    vector<int> height(n);\n    for (int i = 0; i < n; i++) cin >> height[i];\n\n    int left = 0, right = n - 1;\n    int leftMax = 0, rightMax = 0;\n    long long water = 0;\n\n    while (left < right) {\n        if (height[left] < height[right]) {\n            if (height[left] >= leftMax) leftMax = height[left];\n            else water += leftMax - height[left];\n            left++;\n        } else {\n            if (height[right] >= rightMax) rightMax = height[right];\n            else water += rightMax - height[right];\n            right--;\n        }\n    }\n\n    cout << water << \"\\n\";\n    return 0;\n}",
      "java": "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n\n        int[] height = new int[n];\n        for (int i = 0; i < n; i++) height[i] = sc.nextInt();\n\n        int left = 0, right = n - 1;\n        int leftMax = 0, rightMax = 0;\n        long water = 0;\n\n        while (left < right) {\n            if (height[left] < height[right]) {\n                if (height[left] >= leftMax) leftMax = height[left];\n                else water += leftMax - height[left];\n                left++;\n            } else {\n                if (height[right] >= rightMax) rightMax = height[right];\n                else water += rightMax - height[right];\n                right--;\n            }\n        }\n\n        System.out.println(water);\n    }\n}"
    },
    "testcases": [
      {
        "id": 1,
        "name": "Case 1",
        "stdin": "12\n0 1 0 2 1 0 1 3 2 1 2 1",
        "expectedStdout": "6"
      },
      {
        "id": 2,
        "name": "Case 2",
        "stdin": "6\n4 2 0 3 2 5",
        "expectedStdout": "9"
      }
    ],
    "editorial": {
      "summary": "Two pointers approach enables computing water in linear time without extra memory.",
      "approaches": [
        {
          "title": "Two Pointers",
          "timeComplexity": "O(n)",
          "spaceComplexity": "O(1)",
          "description": "Advance the pointer with smaller height because the trapped water at that bar is bounded by its current side's maximum."
        }
      ]
    }
  },
  {
    "id": 4,
    "number": 4,
    "title": "Median of Two Sorted Arrays",
    "slug": "median-of-two-sorted-arrays",
    "difficulty": "Hard",
    "category": "Algorithms",
    "acceptance": "39.1%",
    "isExempted": false,
    "likes": 27500,
    "dislikes": 3000,
    "topics": [
      "Array",
      "Binary Search",
      "Divide and Conquer"
    ],
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Apple",
      "Goldman Sachs"
    ],
    "description": "\n<p class=\"mb-3\">Given two sorted arrays <code>nums1</code> and <code>nums2</code> of size <code>m</code> and <code>n</code> respectively, print the median of the two sorted arrays.</p>\n<p class=\"mb-3\">The overall run time complexity should be <code>O(log (m+n))</code>.</p>\n",
    "inputFormat": "The first line contains two integers: <code>m</code> and <code>n</code>.<br/>The second line contains <code>m</code> space-separated integers (if m > 0).<br/>The third line contains <code>n</code> space-separated integers (if n > 0).",
    "outputFormat": "Print the median formatted to 5 decimal places (e.g. <code>2.00000</code>).",
    "examples": [
      {
        "id": 1,
        "stdin": "2 1\n1 3\n2",
        "stdout": "2.00000",
        "explanation": "merged array = [1,2,3] and median is 2.0."
      },
      {
        "id": 2,
        "stdin": "2 2\n1 2\n3 4",
        "stdout": "2.50000",
        "explanation": "merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5."
      }
    ],
    "constraints": [
      "nums1.length == m",
      "nums2.length == n",
      "0 <= m <= 1000",
      "0 <= n <= 1000",
      "1 <= m + n <= 2000",
      "-10^6 <= nums1[i], nums2[i] <= 10^6"
    ],
    "hints": [
      "Binary search on the partition of the smaller array so that left partition contains half of total elements.",
      "Check boundary elements: maxLeftA <= minRightB and maxLeftB <= minRightA."
    ],
    "starterCode": {
      "javascript": "const fs = require('fs');\n\nfunction main() {\n  const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\n  if (!input || input[0] === \"\") return;\n\n  const m = parseInt(input[0], 10);\n  const n = parseInt(input[1], 10);\n\n  const a = [];\n  for (let i = 0; i < m; i++) a.push(parseInt(input[2 + i], 10));\n  const b = [];\n  for (let i = 0; i < n; i++) b.push(parseInt(input[2 + m + i], 10));\n\n  // Merge and find median\n  const merged = [];\n  let i = 0, j = 0;\n  while (i < m && j < n) {\n    if (a[i] <= b[j]) merged.push(a[i++]);\n    else merged.push(b[j++]);\n  }\n  while (i < m) merged.push(a[i++]);\n  while (j < n) merged.push(b[j++]);\n\n  const total = m + n;\n  let median = 0;\n  if (total % 2 === 1) {\n    median = merged[Math.floor(total / 2)];\n  } else {\n    median = (merged[total / 2 - 1] + merged[total / 2]) / 2.0;\n  }\n\n  console.log(median.toFixed(5));\n}\n\nmain();",
      "typescript": "import * as fs from 'fs';\n\nfunction main(): void {\n  const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\n  if (!input || input[0] === \"\") return;\n\n  const m = parseInt(input[0], 10);\n  const n = parseInt(input[1], 10);\n\n  const a: number[] = [];\n  for (let i = 0; i < m; i++) a.push(parseInt(input[2 + i], 10));\n  const b: number[] = [];\n  for (let i = 0; i < n; i++) b.push(parseInt(input[2 + m + i], 10));\n\n  const merged: number[] = [];\n  let i = 0, j = 0;\n  while (i < m && j < n) {\n    if (a[i] <= b[j]) merged.push(a[i++]);\n    else merged.push(b[j++]);\n  }\n  while (i < m) merged.push(a[i++]);\n  while (j < n) merged.push(b[j++]);\n\n  const total = m + n;\n  let median = 0;\n  if (total % 2 === 1) {\n    median = merged[Math.floor(total / 2)];\n  } else {\n    median = (merged[total / 2 - 1] + merged[total / 2]) / 2.0;\n  }\n\n  console.log(median.toFixed(5));\n}\n\nmain();",
      "python": "import sys\n\ndef main():\n    data = sys.stdin.read().split()\n    if not data:\n        return\n    m = int(data[0])\n    n = int(data[1])\n\n    a = [int(x) for x in data[2:2 + m]]\n    b = [int(x) for x in data[2 + m:2 + m + n]]\n\n    merged = sorted(a + b)\n    total = m + n\n\n    if total % 2 == 1:\n        median = float(merged[total // 2])\n    else:\n        median = (merged[total // 2 - 1] + merged[total // 2]) / 2.0\n\n    print(f\"{median:.5f}\")\n\nif __name__ == '__main__':\n    main()",
      "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\n#include <iomanip>\n\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n\n    int m, n;\n    if (!(cin >> m >> n)) return 0;\n\n    vector<int> a(m), b(n);\n    for (int i = 0; i < m; i++) cin >> a[i];\n    for (int i = 0; i < n; i++) cin >> b[i];\n\n    vector<int> merged;\n    int i = 0, j = 0;\n    while (i < m && j < n) {\n        if (a[i] <= b[j]) merged.push_back(a[i++]);\n        else merged.push_back(b[j++]);\n    }\n    while (i < m) merged.push_back(a[i++]);\n    while (j < n) merged.push_back(b[j++]);\n\n    int total = m + n;\n    double median = 0.0;\n    if (total % 2 == 1) {\n        median = merged[total / 2];\n    } else {\n        median = (merged[total / 2 - 1] + merged[total / 2]) / 2.0;\n    }\n\n    cout << fixed << setprecision(5) << median << \"\\n\";\n    return 0;\n}",
      "java": "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int m = sc.nextInt();\n        int n = sc.nextInt();\n\n        int[] a = new int[m];\n        for (int i = 0; i < m; i++) a[i] = sc.nextInt();\n        int[] b = new int[n];\n        for (int i = 0; i < n; i++) b[i] = sc.nextInt();\n\n        int[] merged = new int[m + n];\n        int i = 0, j = 0, k = 0;\n        while (i < m && j < n) {\n            if (a[i] <= b[j]) merged[k++] = a[i++];\n            else merged[k++] = b[j++];\n        }\n        while (i < m) merged[k++] = a[i++];\n        while (j < n) merged[k++] = b[j++];\n\n        int total = m + n;\n        double median = 0.0;\n        if (total % 2 == 1) {\n            median = merged[total / 2];\n        } else {\n            median = (merged[total / 2 - 1] + merged[total / 2]) / 2.0;\n        }\n\n        System.out.printf(Locale.US, \"%.5f\\n\", median);\n    }\n}"
    },
    "testcases": [
      {
        "id": 1,
        "name": "Case 1",
        "stdin": "2 1\n1 3\n2",
        "expectedStdout": "2.00000"
      },
      {
        "id": 2,
        "name": "Case 2",
        "stdin": "2 2\n1 2\n3 4",
        "expectedStdout": "2.50000"
      }
    ],
    "editorial": {
      "summary": "Partition binary search achieves O(log(min(m, n))) runtime complexity.",
      "approaches": [
        {
          "title": "Binary Search Partition",
          "timeComplexity": "O(log(min(m, n)))",
          "spaceComplexity": "O(1)",
          "description": "Binary search for the partition index i in the smaller array such that j = (m+n+1)/2 - i partitions both arrays into equal halves."
        }
      ]
    }
  }
];

export const defaultSubmissions = [
  {
    "id": "sub_101",
    "problemId": 1,
    "status": "Accepted",
    "runtime": "48 ms",
    "memory": "42.8 MB",
    "language": "JavaScript",
    "timestamp": "12 mins ago"
  },
  {
    "id": "sub_102",
    "problemId": 20,
    "status": "Accepted",
    "runtime": "54 ms",
    "memory": "41.9 MB",
    "language": "JavaScript",
    "timestamp": "2 hours ago"
  },
  {
    "id": "sub_103",
    "problemId": 3,
    "status": "Accepted",
    "runtime": "68 ms",
    "memory": "45.1 MB",
    "language": "TypeScript",
    "timestamp": "Yesterday"
  },
  {
    "id": "sub_104",
    "problemId": 121,
    "status": "Accepted",
    "runtime": "62 ms",
    "memory": "51.4 MB",
    "language": "Python",
    "timestamp": "3 days ago"
  },
  {
    "id": "sub_105",
    "problemId": 206,
    "status": "Accepted",
    "runtime": "52 ms",
    "memory": "44.2 MB",
    "language": "JavaScript",
    "timestamp": "4 days ago"
  },
  {
    "id": "sub_106",
    "problemId": 53,
    "status": "Accepted",
    "runtime": "74 ms",
    "memory": "48.9 MB",
    "language": "C++",
    "timestamp": "5 days ago"
  },
  {
    "id": "sub_107",
    "problemId": 15,
    "status": "Wrong Answer",
    "runtime": "N/A",
    "memory": "N/A",
    "language": "JavaScript",
    "timestamp": "6 days ago"
  }
];
