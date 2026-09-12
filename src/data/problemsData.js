export const problems = [
  {
    "id": "ff2cb2e0-e9b4-431a-bc16-7cafb30ba401",
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
    "description": "\n<p class=\"mb-3\">Given an array of integers <code>nums</code> and an integer <code>target</code>, find <em>indices of the two numbers such that they add up to <code>target</code></em>.</p>\n<p class=\"mb-3\">You may assume that each input would have <strong>exactly one solution</strong>, and you may not use the same element twice.</p>\n<p class=\"mb-3\">You can return or print the answer in any order, space-separated on a single line.</p>\n",
    "inputFormat": "The first line contains two integers: <code>n</code> and <code>target</code>.<br/>The second line contains <code>n</code> space-separated integers representing <code>nums</code>.",
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
      "A brute force approach searches for all pairs, taking O(n^2) time.",
      "Can we use a hash map to check if the complement (target - nums[i]) exists in O(1) time?"
    ],
    "starterCode": {
      "cpp": "#include <iostream>\n#include <vector>\n#include <unordered_map>\n\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    int n, target;\n    if (!(cin >> n >> target)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n    unordered_map<int, int> seen;\n    for (int i = 0; i < n; i++) {\n        int complement = target - nums[i];\n        if (seen.find(complement) != seen.end()) {\n            cout << seen[complement] << \" \" << i << \"\\n\";\n            return 0;\n        }\n        seen[nums[i]] = i;\n    }\n    return 0;\n}",
      "python": "import sys\n\ndef main():\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    n = int(input_data[0])\n    target = int(input_data[1])\n    nums = [int(x) for x in input_data[2:2 + n]]\n\n    seen = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in seen:\n            print(f\"{seen[complement]} {i}\")\n            return\n        seen[num] = i\n\nif __name__ == '__main__':\n    main()",
      "javascript": "const fs = require('fs');\n\nfunction main() {\n  const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\n  if (!input || input.length < 2) return;\n\n  const n = parseInt(input[0], 10);\n  const target = parseInt(input[1], 10);\n  const nums = [];\n  for (let i = 0; i < n; i++) {\n    nums.push(parseInt(input[2 + i], 10));\n  }\n\n  const map = new Map();\n  for (let i = 0; i < n; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) {\n      console.log(`${map.get(complement)} ${i}`);\n      return;\n    }\n    map.set(nums[i], i);\n  }\n}\n\nmain();"
    },
    "testcases": [
      {
        "id": "150fefd5-b43c-4987-afc8-564988aabf8c",
        "name": "Case 1",
        "stdin": "4 9\n2 7 11 15",
        "expectedStdout": "0 1",
        "isHidden": false,
        "explanation": null
      },
      {
        "id": "f96063cf-6b6e-41be-b4e3-4d292f673947",
        "name": "Case 2",
        "stdin": "3 6\n3 2 4",
        "expectedStdout": "1 2",
        "isHidden": false,
        "explanation": null
      },
      {
        "id": "ff8142df-7fe9-4594-8e75-04948cc8c876",
        "name": "Case 3",
        "stdin": "2 6\n3 3",
        "expectedStdout": "0 1",
        "isHidden": false,
        "explanation": null
      }
    ],
    "editorial": {
      "summary": "Two Sum is best solved using a Hash Table for one-pass linear time complexity."
    }
  },
  {
    "id": "5f8b05d1-16d1-4f79-a8d7-4d65a4ce6ef0",
    "number": 2,
    "title": "Add Two Numbers",
    "slug": "add-two-numbers",
    "difficulty": "Medium",
    "category": "Algorithms",
    "acceptance": "43.1%",
    "isExempted": false,
    "likes": 31200,
    "dislikes": 5800,
    "topics": [
      "Linked List",
      "Math",
      "Recursion"
    ],
    "companies": [
      "Amazon",
      "Microsoft",
      "Bloomberg",
      "Google"
    ],
    "description": "\n<p class=\"mb-3\">You are given two non-empty linked lists representing two non-negative integers. The digits are stored in <strong>reverse order</strong>, and each of their nodes contains a single digit.</p>\n<p class=\"mb-3\">Add the two numbers and print the sum as a linked list in reverse order.</p>\n<p class=\"mb-3\">You may assume the two numbers do not contain any leading zero, except the number 0 itself.</p>\n",
    "inputFormat": "The first line contains integer <code>n</code> followed by <code>n</code> digits of the first number.<br/>The second line contains integer <code>m</code> followed by <code>m</code> digits of the second number.",
    "outputFormat": "Print the space-separated digits of the result linked list.",
    "examples": [
      {
        "id": 1,
        "stdin": "3 2 4 3\n3 5 6 4",
        "stdout": "7 0 8",
        "explanation": "342 + 465 = 807."
      },
      {
        "id": 2,
        "stdin": "1 0\n1 0",
        "stdout": "0",
        "explanation": "0 + 0 = 0."
      },
      {
        "id": 3,
        "stdin": "7 9 9 9 9 9 9 9\n4 9 9 9 9",
        "stdout": "8 9 9 9 0 0 0 1",
        "explanation": "9999999 + 9999 = 10009998."
      }
    ],
    "constraints": [
      "The number of nodes in each linked list is in the range [1, 100].",
      "0 <= Node.val <= 9"
    ],
    "hints": [
      "Simulate elementary school addition column by column, keeping track of carry.",
      "Remember to handle a leftover carry at the very end."
    ],
    "starterCode": {
      "python": "import sys\n\ndef main():\n    lines = sys.stdin.read().strip().split('\\n')\n    if len(lines) < 2:\n        return\n    a = list(map(int, lines[0].strip().split()[1:]))\n    b = list(map(int, lines[1].strip().split()[1:]))\n\n    res = []\n    carry = 0\n    i, j = 0, 0\n    while i < len(a) or j < len(b) or carry:\n        val1 = a[i] if i < len(a) else 0\n        val2 = b[j] if j < len(b) else 0\n        total = val1 + val2 + carry\n        res.append(total % 10)\n        carry = total // 10\n        i += 1\n        j += 1\n\n    print(\" \".join(map(str, res)))\n\nif __name__ == '__main__':\n    main()",
      "javascript": "const fs = require('fs');\n\nfunction main() {\n  const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');\n  if (lines.length < 2) return;\n\n  const a = lines[0].trim().split(/\\s+/).slice(1).map(Number);\n  const b = lines[1].trim().split(/\\s+/).slice(1).map(Number);\n\n  const res = [];\n  let carry = 0;\n  let i = 0, j = 0;\n\n  while (i < a.length || j < b.length || carry) {\n    const sum = (i < a.length ? a[i++] : 0) + (j < b.length ? b[j++] : 0) + carry;\n    res.push(sum % 10);\n    carry = Math.floor(sum / 10);\n  }\n\n  console.log(res.join(' '));\n}\n\nmain();"
    },
    "testcases": [
      {
        "id": "41188802-76ec-4634-8100-2c7ee92db24b",
        "name": "Case 1",
        "stdin": "3 2 4 3\n3 5 6 4",
        "expectedStdout": "7 0 8",
        "isHidden": false,
        "explanation": null
      },
      {
        "id": "88569915-da55-42b3-bfce-93f3d97604c9",
        "name": "Case 2",
        "stdin": "1 0\n1 0",
        "expectedStdout": "0",
        "isHidden": false,
        "explanation": null
      },
      {
        "id": "abac7368-8007-4812-9b4a-678c6e5743ac",
        "name": "Case 3",
        "stdin": "7 9 9 9 9 9 9 9\n4 9 9 9 9",
        "expectedStdout": "8 9 9 9 0 0 0 1",
        "isHidden": false,
        "explanation": null
      }
    ],
    "editorial": {
      "summary": "Add Two Numbers is solved by traversing both digit lists and maintaining a carry."
    }
  },
  {
    "id": "197de366-60a7-433d-a3e7-d92a894ca51d",
    "number": 3,
    "title": "Longest Substring Without Repeating Characters",
    "slug": "longest-substring-without-repeating-characters",
    "difficulty": "Medium",
    "category": "Algorithms",
    "acceptance": "34.7%",
    "isExempted": false,
    "likes": 38290,
    "dislikes": 1740,
    "topics": [
      "Hash Table",
      "String",
      "Sliding Window"
    ],
    "companies": [
      "Amazon",
      "Bloomberg",
      "Microsoft",
      "Meta",
      "Google"
    ],
    "description": "\n<p class=\"mb-3\">Given a string <code>s</code>, find the length of the <strong>longest substring</strong> without repeating characters.</p>\n<p class=\"mb-3\">A substring is a contiguous non-empty sequence of characters within a string.</p>\n",
    "inputFormat": "A single line containing the string <code>s</code>.",
    "outputFormat": "Print a single integer denoting the length of the longest substring without repeating characters.",
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
      "Use a sliding window with two pointers [left, right].",
      "Keep track of the last index where each character appeared using a hash map."
    ],
    "starterCode": {
      "python": "import sys\n\ndef main():\n    s = sys.stdin.read().rstrip('\\r\\n')\n    last_idx = {}\n    left = 0\n    max_len = 0\n\n    for right, ch in enumerate(s):\n        if ch in last_idx and last_idx[ch] >= left:\n            left = last_idx[ch] + 1\n        last_idx[ch] = right\n        max_len = max(max_len, right - left + 1)\n\n    print(max_len)\n\nif __name__ == '__main__':\n    main()",
      "javascript": "const fs = require('fs');\n\nfunction main() {\n  const input = fs.readFileSync(0, 'utf-8').replace(/\\r?\\n$/, '');\n  const s = input;\n\n  const map = new Map();\n  let maxLen = 0;\n  let left = 0;\n\n  for (let right = 0; right < s.length; right++) {\n    const char = s[right];\n    if (map.has(char) && map.get(char) >= left) {\n      left = map.get(char) + 1;\n    }\n    map.set(char, right);\n    maxLen = Math.max(maxLen, right - left + 1);\n  }\n\n  console.log(maxLen);\n}\n\nmain();"
    },
    "testcases": [
      {
        "id": "0b800702-f0db-4c54-8293-23e69d2407fe",
        "name": "Case 1",
        "stdin": "abcabcbb",
        "expectedStdout": "3",
        "isHidden": false,
        "explanation": null
      },
      {
        "id": "9e83f1de-bb8b-4121-b4b0-b2d9b4f0dc6a",
        "name": "Case 2",
        "stdin": "bbbbb",
        "expectedStdout": "1",
        "isHidden": false,
        "explanation": null
      },
      {
        "id": "98874739-86b7-498d-a5d8-f04089a45c6a",
        "name": "Case 3",
        "stdin": "pwwkew",
        "expectedStdout": "3",
        "isHidden": false,
        "explanation": null
      }
    ],
    "editorial": {
      "summary": "Solved in O(n) time using the sliding window technique and a hash map for character positions."
    }
  },
  {
    "id": "c7b2244e-b196-43be-ae4f-6bda64b00b96",
    "number": 4,
    "title": "Median of Two Sorted Arrays",
    "slug": "median-of-two-sorted-arrays",
    "difficulty": "Hard",
    "category": "Algorithms",
    "acceptance": "39.6%",
    "isExempted": false,
    "likes": 27950,
    "dislikes": 3050,
    "topics": [
      "Array",
      "Binary Search",
      "Divide and Conquer"
    ],
    "companies": [
      "Google",
      "Amazon",
      "Apple",
      "Microsoft",
      "Goldman Sachs"
    ],
    "description": "\n<p class=\"mb-3\">Given two sorted arrays <code>nums1</code> and <code>nums2</code> of size <code>m</code> and <code>n</code> respectively, return the <strong>median</strong> of the two sorted arrays.</p>\n<p class=\"mb-3\">The overall run time complexity should be <code>O(log (m+n))</code>.</p>\n",
    "inputFormat": "First line: <code>m</code> followed by <code>m</code> space-separated integers.<br/>Second line: <code>n</code> followed by <code>n</code> space-separated integers.",
    "outputFormat": "Print the median formatted to 5 decimal places if not an integer, or as a float.",
    "examples": [
      {
        "id": 1,
        "stdin": "2 1 3\n1 2",
        "stdout": "2.00000",
        "explanation": "Merged array = [1,2,3] and median is 2."
      },
      {
        "id": 2,
        "stdin": "2 1 2\n2 3 4",
        "stdout": "2.50000",
        "explanation": "Merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5."
      }
    ],
    "constraints": [
      "nums1.length == m",
      "nums2.length == n",
      "0 <= m, n <= 1000",
      "1 <= m + n <= 2000",
      "-10^6 <= nums1[i], nums2[i] <= 10^6"
    ],
    "hints": [
      "The condition O(log(m+n)) strongly hints at binary search.",
      "Partition both arrays such that elements on the left are smaller than elements on the right."
    ],
    "starterCode": {
      "python": "import sys\n\ndef main():\n    lines = sys.stdin.read().strip().split('\\n')\n    if len(lines) < 2:\n        return\n    a = list(map(int, lines[0].split()[1:]))\n    b = list(map(int, lines[1].split()[1:]))\n    merged = sorted(a + b)\n    n = len(merged)\n    if n % 2 == 0:\n        med = (merged[n // 2 - 1] + merged[n // 2]) / 2.0\n    else:\n        med = float(merged[n // 2])\n    print(f\"{med:.5f}\")\n\nif __name__ == '__main__':\n    main()",
      "javascript": "const fs = require('fs');\n\nfunction main() {\n  const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');\n  if (lines.length < 2) return;\n\n  const a = lines[0].trim().split(/\\s+/).slice(1).map(Number);\n  const b = lines[1].trim().split(/\\s+/).slice(1).map(Number);\n\n  const merged = [...a, ...b].sort((x, y) => x - y);\n  const mid = Math.floor(merged.length / 2);\n  const median = merged.length % 2 === 0 ? (merged[mid - 1] + merged[mid]) / 2 : merged[mid];\n  console.log(median.toFixed(5));\n}\n\nmain();"
    },
    "testcases": [
      {
        "id": "27fe7206-2dab-44fd-a64f-17cc7a9afa63",
        "name": "Case 1",
        "stdin": "2 1 3\n1 2",
        "expectedStdout": "2.00000",
        "isHidden": false,
        "explanation": null
      },
      {
        "id": "03adedfe-1f21-45bb-a7d1-fc8561da24c2",
        "name": "Case 2",
        "stdin": "2 1 2\n2 3 4",
        "expectedStdout": "2.50000",
        "isHidden": false,
        "explanation": null
      }
    ],
    "editorial": {
      "summary": "Perform binary search on the shorter array to partition both arrays into two equal halves."
    }
  },
  {
    "id": "79582778-924a-4d58-b8ae-12b0a8718133",
    "number": 5,
    "title": "Longest Palindromic Substring",
    "slug": "longest-palindromic-substring",
    "difficulty": "Medium",
    "category": "Algorithms",
    "acceptance": "33.9%",
    "isExempted": false,
    "likes": 29400,
    "dislikes": 1720,
    "topics": [
      "Two Pointers",
      "String",
      "Dynamic Programming"
    ],
    "companies": [
      "Amazon",
      "Microsoft",
      "Google",
      "Adobe",
      "Meta"
    ],
    "description": "\n<p class=\"mb-3\">Given a string <code>s</code>, return <em>the longest palindromic substring</em> in <code>s</code>.</p>\n<p class=\"mb-3\">A string is palindromic if it reads the same forward and backward.</p>\n",
    "inputFormat": "A single line containing string <code>s</code>.",
    "outputFormat": "Print the longest palindromic substring.",
    "examples": [
      {
        "id": 1,
        "stdin": "babad",
        "stdout": "bab",
        "explanation": "'aba' is also a valid answer."
      },
      {
        "id": 2,
        "stdin": "cbbd",
        "stdout": "bb",
        "explanation": "'bb' is the longest palindrome."
      }
    ],
    "constraints": [
      "1 <= s.length <= 1000",
      "s consists of only digits and English letters."
    ],
    "hints": [
      "How can we reuse a previously calculated palindrome?",
      "Can we expand around centers? There are 2n - 1 centers."
    ],
    "starterCode": {
      "python": "import sys\n\ndef main():\n    s = sys.stdin.read().strip()\n    if not s:\n        return\n\n    start, max_len = 0, 0\n\n    def expand(left, right):\n        nonlocal start, max_len\n        while left >= 0 and right < len(s) and s[left] == s[right]:\n            left -= 1\n            right += 1\n        length = right - left - 1\n        if length > max_len:\n            max_len = length\n            start = left + 1\n\n    for i in range(len(s)):\n        expand(i, i)\n        expand(i, i + 1)\n\n    print(s[start:start + max_len])\n\nif __name__ == '__main__':\n    main()",
      "javascript": "const fs = require('fs');\n\nfunction main() {\n  const s = fs.readFileSync(0, 'utf-8').trim();\n  if (!s) return;\n\n  let start = 0, maxLen = 0;\n\n  function expand(left, right) {\n    while (left >= 0 && right < s.length && s[left] === s[right]) {\n      left--;\n      right++;\n    }\n    const len = right - left - 1;\n    if (len > maxLen) {\n      maxLen = len;\n      start = left + 1;\n    }\n  }\n\n  for (let i = 0; i < s.length; i++) {\n    expand(i, i);\n    expand(i, i + 1);\n  }\n\n  console.log(s.substring(start, start + maxLen));\n}\n\nmain();"
    },
    "testcases": [
      {
        "id": "d39758ba-c3ae-464b-8147-5f4b2631ed7c",
        "name": "Case 1",
        "stdin": "babad",
        "expectedStdout": "bab",
        "isHidden": false,
        "explanation": null
      },
      {
        "id": "22720d4e-96e3-4039-b250-289d21445380",
        "name": "Case 2",
        "stdin": "cbbd",
        "expectedStdout": "bb",
        "isHidden": false,
        "explanation": null
      }
    ],
    "editorial": {
      "summary": "Expand around each center in O(n^2) time and O(1) space."
    }
  },
  {
    "id": "0d3b1a53-3818-4eac-9667-88b3e58e03dc",
    "number": 6,
    "title": "Reverse Linked List",
    "slug": "reverse-linked-list",
    "difficulty": "Easy",
    "category": "Data Structures",
    "acceptance": "75.8%",
    "isExempted": false,
    "likes": 21540,
    "dislikes": 420,
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
    "description": "\n<p class=\"mb-3\">Given the <code>head</code> of a singly linked list, reverse the list, and return <em>the reversed list</em>.</p>\n",
    "inputFormat": "First line: <code>n</code> (number of nodes).<br/>Second line: <code>n</code> space-separated integers.",
    "outputFormat": "Print the reversed values separated by space.",
    "examples": [
      {
        "id": 1,
        "stdin": "5\n1 2 3 4 5",
        "stdout": "5 4 3 2 1",
        "explanation": "The reversed linked list is [5,4,3,2,1]."
      },
      {
        "id": 2,
        "stdin": "2\n1 2",
        "stdout": "2 1",
        "explanation": "The reversed linked list is [2,1]."
      }
    ],
    "constraints": [
      "The number of nodes in the list is the range [0, 5000].",
      "-5000 <= Node.val <= 5000"
    ],
    "hints": [
      "Iterate through the list while maintaining prev, curr, and next pointers."
    ],
    "starterCode": {
      "python": "import sys\n\ndef main():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    n = int(tokens[0])\n    nums = tokens[1:1 + n]\n    print(\" \".join(reversed(nums)))\n\nif __name__ == '__main__':\n    main()",
      "javascript": "const fs = require('fs');\n\nfunction main() {\n  const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\n  if (!input || input.length < 2) return;\n  const n = parseInt(input[0], 10);\n  const nums = input.slice(1, 1 + n);\n  console.log(nums.reverse().join(' '));\n}\n\nmain();"
    },
    "testcases": [
      {
        "id": "8adc5919-63f6-4d58-9207-4bf2fd4e2c05",
        "name": "Case 1",
        "stdin": "5\n1 2 3 4 5",
        "expectedStdout": "5 4 3 2 1",
        "isHidden": false,
        "explanation": null
      },
      {
        "id": "df4064b4-fad9-4a06-87ad-82820a5ff3bb",
        "name": "Case 2",
        "stdin": "2\n1 2",
        "expectedStdout": "2 1",
        "isHidden": false,
        "explanation": null
      }
    ],
    "editorial": {
      "summary": "Invert links iteratively using a previous pointer in O(n) time and O(1) space."
    }
  },
  {
    "id": "2ec7bfdf-422f-4de9-b73f-5039b1412cf5",
    "number": 7,
    "title": "Reverse Integer",
    "slug": "reverse-integer",
    "difficulty": "Medium",
    "category": "Algorithms",
    "acceptance": "28.5%",
    "isExempted": false,
    "likes": 12890,
    "dislikes": 13200,
    "topics": [
      "Math"
    ],
    "companies": [
      "Amazon",
      "Bloomberg",
      "Apple",
      "Microsoft"
    ],
    "description": "\n<p class=\"mb-3\">Given a signed 32-bit integer <code>x</code>, return <code>x</code> <em>with its digits reversed</em>. If reversing <code>x</code> causes the value to go outside the signed 32-bit integer range <code>[-2^31, 2^31 - 1]</code>, then return <code>0</code>.</p>\n",
    "inputFormat": "A single line containing the signed 32-bit integer <code>x</code>.",
    "outputFormat": "Print the reversed integer or 0 if it overflows.",
    "examples": [
      {
        "id": 1,
        "stdin": "123",
        "stdout": "321",
        "explanation": "123 reversed is 321."
      },
      {
        "id": 2,
        "stdin": "-123",
        "stdout": "-321",
        "explanation": "-123 reversed is -321."
      },
      {
        "id": 3,
        "stdin": "120",
        "stdout": "21",
        "explanation": "120 reversed is 21."
      }
    ],
    "constraints": [
      "-2^31 <= x <= 2^31 - 1"
    ],
    "hints": [
      "Check overflow before multiplying the accumulated value by 10."
    ],
    "starterCode": {
      "python": "import sys\n\ndef main():\n    val_str = sys.stdin.read().strip()\n    if not val_str:\n        return\n    x = int(val_str)\n    sign = -1 if x < 0 else 1\n    rev = int(str(abs(x))[::-1]) * sign\n    if rev < -2**31 or rev > 2**31 - 1:\n        print(0)\n    else:\n        print(rev)\n\nif __name__ == '__main__':\n    main()",
      "javascript": "const fs = require('fs');\n\nfunction main() {\n  const x = parseInt(fs.readFileSync(0, 'utf-8').trim(), 10);\n  if (isNaN(x)) return;\n\n  const sign = x < 0 ? -1 : 1;\n  const rev = parseInt(Math.abs(x).toString().split('').reverse().join(''), 10) * sign;\n\n  if (rev < -Math.pow(2, 31) || rev > Math.pow(2, 31) - 1) {\n    console.log(0);\n  } else {\n    console.log(rev);\n  }\n}\n\nmain();"
    },
    "testcases": [
      {
        "id": "0a6adab5-6627-42ed-a2db-f1bbe76f9ff0",
        "name": "Case 1",
        "stdin": "123",
        "expectedStdout": "321",
        "isHidden": false,
        "explanation": null
      },
      {
        "id": "07043477-a2ee-4733-9dfd-a268271e627c",
        "name": "Case 2",
        "stdin": "-123",
        "expectedStdout": "-321",
        "isHidden": false,
        "explanation": null
      },
      {
        "id": "b767a4f0-0c92-4191-b50b-dfcb1d980bd6",
        "name": "Case 3",
        "stdin": "120",
        "expectedStdout": "21",
        "isHidden": false,
        "explanation": null
      }
    ],
    "editorial": {
      "summary": "Extract digits using modulo 10 and check for 32-bit signed integer limits."
    }
  },
  {
    "id": "5fd851b6-c927-4b00-b377-074bdd41cd2f",
    "number": 8,
    "title": "String to Integer (atoi)",
    "slug": "string-to-integer-atoi",
    "difficulty": "Medium",
    "category": "Algorithms",
    "acceptance": "17.2%",
    "isExempted": false,
    "likes": 4200,
    "dislikes": 13500,
    "topics": [
      "String"
    ],
    "companies": [
      "Amazon",
      "Microsoft",
      "Meta",
      "Bloomberg"
    ],
    "description": "\n<p class=\"mb-3\">Implement the <code>myAtoi(string s)</code> function, which converts a string to a 32-bit signed integer.</p>\n<p class=\"mb-3\">The algorithm: ignore leading whitespace, read optional sign ('+' or '-'), read digits until non-digit, and clamp to <code>[-2^31, 2^31 - 1]</code>.</p>\n",
    "inputFormat": "A single line containing string <code>s</code>.",
    "outputFormat": "Print the clamped 32-bit signed integer.",
    "examples": [
      {
        "id": 1,
        "stdin": "42",
        "stdout": "42",
        "explanation": "Parsed integer is 42."
      },
      {
        "id": 2,
        "stdin": "   -042",
        "stdout": "-42",
        "explanation": "Leading whitespace and zero ignored."
      },
      {
        "id": 3,
        "stdin": "1337c0d3",
        "stdout": "1337",
        "explanation": "Parsing stops at 'c'."
      }
    ],
    "constraints": [
      "0 <= s.length <= 200",
      "s consists of English letters, digits, ' ', '+', '-', and '.'."
    ],
    "hints": [
      "Carefully handle whitespaces, sign character, numeric digits, and 32-bit overflow."
    ],
    "starterCode": {
      "python": "import sys\n\ndef main():\n    s = sys.stdin.read()\n    s = s.lstrip()\n    if not s:\n        print(0)\n        return\n    sign = 1\n    i = 0\n    if s[0] == '+':\n        i = 1\n    elif s[0] == '-':\n        sign = -1\n        i = 1\n    res = 0\n    while i < len(s) and s[i].isdigit():\n        res = res * 10 + int(s[i])\n        i += 1\n    res *= sign\n    INT_MAX = 2**31 - 1\n    INT_MIN = -2**31\n    if res > INT_MAX:\n        print(INT_MAX)\n    elif res < INT_MIN:\n        print(INT_MIN)\n    else:\n        print(res)\n\nif __name__ == '__main__':\n    main()",
      "javascript": "const fs = require('fs');\n\nfunction main() {\n  const s = fs.readFileSync(0, 'utf-8');\n  let i = 0;\n  while (i < s.length && s[i] === ' ') i++;\n\n  let sign = 1;\n  if (s[i] === '+') { i++; }\n  else if (s[i] === '-') { sign = -1; i++; }\n\n  let res = 0;\n  const INT_MAX = 2147483647;\n  const INT_MIN = -2147483648;\n\n  while (i < s.length && s[i] >= '0' && s[i] <= '9') {\n    const digit = s.charCodeAt(i) - 48;\n    res = res * 10 + digit;\n    if (sign * res > INT_MAX) { console.log(INT_MAX); return; }\n    if (sign * res < INT_MIN) { console.log(INT_MIN); return; }\n    i++;\n  }\n\n  console.log(sign * res);\n}\n\nmain();"
    },
    "testcases": [
      {
        "id": "09558e74-0e08-48a7-914c-3f069f4ea2f7",
        "name": "Case 1",
        "stdin": "42",
        "expectedStdout": "42",
        "isHidden": false,
        "explanation": null
      },
      {
        "id": "98df5622-e8a6-4158-9c0a-2ecdd15269f2",
        "name": "Case 2",
        "stdin": "   -042",
        "expectedStdout": "-42",
        "isHidden": false,
        "explanation": null
      },
      {
        "id": "f721ef57-5c4d-43f3-96cc-baeeabb639a4",
        "name": "Case 3",
        "stdin": "1337c0d3",
        "expectedStdout": "1337",
        "isHidden": false,
        "explanation": null
      }
    ],
    "editorial": {
      "summary": "Scan characters sequentially with clamping to 32-bit limits."
    }
  },
  {
    "id": "0b48ee09-2b9a-416f-af34-6d604bedf538",
    "number": 9,
    "title": "Palindrome Number",
    "slug": "palindrome-number",
    "difficulty": "Easy",
    "category": "Algorithms",
    "acceptance": "55.2%",
    "isExempted": false,
    "likes": 12500,
    "dislikes": 2400,
    "topics": [
      "Math"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Microsoft",
      "Bloomberg"
    ],
    "description": "\n<p class=\"mb-3\">Given an integer <code>x</code>, return <code>true</code> <em>if <code>x</code> is a <strong>palindrome</strong>, and <code>false</code> otherwise</em>.</p>\n<p class=\"mb-3\">An integer is a palindrome when it reads the same forward and backward.</p>\n",
    "inputFormat": "A single line containing the integer <code>x</code>.",
    "outputFormat": "Print <code>true</code> if palindrome, or <code>false</code> otherwise.",
    "examples": [
      {
        "id": 1,
        "stdin": "121",
        "stdout": "true",
        "explanation": "121 reads as 121 from left to right and right to left."
      },
      {
        "id": 2,
        "stdin": "-121",
        "stdout": "false",
        "explanation": "From left to right it is -121. From right to left it is 121-."
      },
      {
        "id": 3,
        "stdin": "10",
        "stdout": "false",
        "explanation": "Reads 01 from right to left."
      }
    ],
    "constraints": [
      "-2^31 <= x <= 2^31 - 1"
    ],
    "hints": [
      "Negative numbers are never palindromes due to the minus sign.",
      "Could you solve it without converting the integer to a string?"
    ],
    "starterCode": {
      "python": "import sys\n\ndef main():\n    s = sys.stdin.read().strip()\n    print(\"true\" if s == s[::-1] else \"false\")\n\nif __name__ == '__main__':\n    main()",
      "javascript": "const fs = require('fs');\n\nfunction main() {\n  const str = fs.readFileSync(0, 'utf-8').trim();\n  if (!str) return;\n  const rev = str.split('').reverse().join('');\n  console.log(str === rev ? 'true' : 'false');\n}\n\nmain();"
    },
    "testcases": [
      {
        "id": "05031137-a6a9-460a-af32-6aa94eee2923",
        "name": "Case 1",
        "stdin": "121",
        "expectedStdout": "true",
        "isHidden": false,
        "explanation": null
      },
      {
        "id": "a34341ef-207c-4dc8-83f4-55ff2853326c",
        "name": "Case 2",
        "stdin": "-121",
        "expectedStdout": "false",
        "isHidden": false,
        "explanation": null
      },
      {
        "id": "255aa76b-01fa-494e-9e8a-adb8adcd1c51",
        "name": "Case 3",
        "stdin": "10",
        "expectedStdout": "false",
        "isHidden": false,
        "explanation": null
      }
    ],
    "editorial": {
      "summary": "Revert the half of the number or compare string representations."
    }
  },
  {
    "id": "c026b3ce-d7b1-4efc-b077-5faf97785658",
    "number": 10,
    "title": "Regular Expression Matching",
    "slug": "regular-expression-matching",
    "difficulty": "Hard",
    "category": "Algorithms",
    "acceptance": "28.3%",
    "isExempted": false,
    "likes": 11900,
    "dislikes": 2100,
    "topics": [
      "String",
      "Dynamic Programming",
      "Recursion"
    ],
    "companies": [
      "Google",
      "Meta",
      "Amazon",
      "Microsoft"
    ],
    "description": "\n<p class=\"mb-3\">Given an input string <code>s</code> and a pattern <code>p</code>, implement regular expression matching with support for <code>'.'</code> and <code>'*'</code> where:</p>\n<ul class=\"list-disc pl-5 mb-3 space-y-1\">\n  <li><code>'.'</code> Matches any single character.</li>\n  <li><code>'*'</code> Matches zero or more of the preceding element.</li>\n</ul>\n<p class=\"mb-3\">The matching should cover the <strong>entire</strong> input string (not partial).</p>\n",
    "inputFormat": "First line: string <code>s</code>.<br/>Second line: pattern <code>p</code>.",
    "outputFormat": "Print <code>true</code> if pattern matches s, otherwise <code>false</code>.",
    "examples": [
      {
        "id": 1,
        "stdin": "aa\na",
        "stdout": "false",
        "explanation": "'a' does not match the entire string 'aa'."
      },
      {
        "id": 2,
        "stdin": "aa\na*",
        "stdout": "true",
        "explanation": "'*' means zero or more of 'a'."
      },
      {
        "id": 3,
        "stdin": "ab\n.*",
        "stdout": "true",
        "explanation": "'.*' means zero or more of any character."
      }
    ],
    "constraints": [
      "1 <= s.length <= 20",
      "1 <= p.length <= 20",
      "s contains only lowercase English letters.",
      "p contains only lowercase English letters, '.', and '*'."
    ],
    "hints": [
      "Use 2D dynamic programming dp[i][j] representing if s[i:] matches p[j:]."
    ],
    "starterCode": {
      "python": "import sys\n\ndef main():\n    lines = sys.stdin.read().strip().split('\\n')\n    if len(lines) < 2:\n        return\n    s, p = lines[0].strip(), lines[1].strip()\n    memo = {}\n\n    def dp(i, j):\n        if (i, j) in memo:\n            return memo[(i, j)]\n        if j == len(p):\n            return i == len(s)\n        first_match = i < len(s) and (p[j] == s[i] or p[j] == '.')\n        if j + 1 < len(p) and p[j + 1] == '*':\n            ans = dp(i, j + 2) or (first_match and dp(i + 1, j))\n        else:\n            ans = first_match and dp(i + 1, j + 1)\n        memo[(i, j)] = ans\n        return ans\n\n    print(\"true\" if dp(0, 0) else \"false\")\n\nif __name__ == '__main__':\n    main()",
      "javascript": "const fs = require('fs');\n\nfunction main() {\n  const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');\n  if (lines.length < 2) return;\n  const s = lines[0].trim();\n  const p = lines[1].trim();\n\n  const memo = new Map();\n  function dp(i, j) {\n    const key = `${i},${j}`;\n    if (memo.has(key)) return memo.get(key);\n    if (j === p.length) return i === s.length;\n\n    const firstMatch = i < s.length && (p[j] === s[i] || p[j] === '.');\n    let ans = false;\n\n    if (j + 1 < p.length && p[j + 1] === '*') {\n      ans = dp(i, j + 2) || (firstMatch && dp(i + 1, j));\n    } else {\n      ans = firstMatch && dp(i + 1, j + 1);\n    }\n\n    memo.set(key, ans);\n    return ans;\n  }\n\n  console.log(dp(0, 0) ? 'true' : 'false');\n}\n\nmain();"
    },
    "testcases": [
      {
        "id": "55d20de5-bc69-4362-81ab-4f26cbe09ab8",
        "name": "Case 1",
        "stdin": "aa\na",
        "expectedStdout": "false",
        "isHidden": false,
        "explanation": null
      },
      {
        "id": "9c31ce70-7ad8-49f7-b9fc-6c2bc9864b34",
        "name": "Case 2",
        "stdin": "aa\na*",
        "expectedStdout": "true",
        "isHidden": false,
        "explanation": null
      },
      {
        "id": "60dfca88-c43b-46de-aa38-9fde5ef1dff9",
        "name": "Case 3",
        "stdin": "ab\n.*",
        "expectedStdout": "true",
        "isHidden": false,
        "explanation": null
      }
    ],
    "editorial": {
      "summary": "2D Dynamic Programming over string indices i and pattern indices j."
    }
  },
  {
    "id": "bee32ee1-b0de-4a30-9d56-02a3348a1c1c",
    "number": 11,
    "title": "Container With Most Water",
    "slug": "container-with-most-water",
    "difficulty": "Medium",
    "category": "Algorithms",
    "acceptance": "54.8%",
    "isExempted": false,
    "likes": 27800,
    "dislikes": 1580,
    "topics": [
      "Array",
      "Two Pointers",
      "Greedy"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Apple",
      "Adobe",
      "Meta"
    ],
    "description": "\n<p class=\"mb-3\">You are given an integer array <code>height</code> of length <code>n</code>. There are <code>n</code> vertical lines drawn such that the two endpoints of the <code>i<sup>th</sup></code> line are <code>(i, 0)</code> and <code>(i, height[i])</code>.</p>\n<p class=\"mb-3\">Find two lines that together with the x-axis form a container, such that the container contains the most water.</p>\n<p class=\"mb-3\">Return <em>the maximum amount of water a container can store</em>.</p>\n",
    "inputFormat": "First line: integer <code>n</code>.<br/>Second line: <code>n</code> space-separated integers representing heights.",
    "outputFormat": "Print the maximum area as an integer.",
    "examples": [
      {
        "id": 1,
        "stdin": "9\n1 8 6 2 5 4 8 3 7",
        "stdout": "49",
        "explanation": "The max area is between index 1 (height 8) and index 8 (height 7): min(8, 7) * (8 - 1) = 49."
      },
      {
        "id": 2,
        "stdin": "2\n1 1",
        "stdout": "1",
        "explanation": "1 * (1 - 0) = 1."
      }
    ],
    "constraints": [
      "n == height.length",
      "2 <= n <= 10^5",
      "0 <= height[i] <= 10^4"
    ],
    "hints": [
      "Use two pointers starting at both ends.",
      "Always move the pointer with the smaller height inward."
    ],
    "starterCode": {
      "python": "import sys\n\ndef main():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    n = int(tokens[0])\n    height = list(map(int, tokens[1:1 + n]))\n    left, right = 0, n - 1\n    max_area = 0\n    while left < right:\n        max_area = max(max_area, (right - left) * min(height[left], height[right]))\n        if height[left] < height[right]:\n            left += 1\n        else:\n            right -= 1\n    print(max_area)\n\nif __name__ == '__main__':\n    main()",
      "javascript": "const fs = require('fs');\n\nfunction main() {\n  const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\n  if (!input || input.length < 2) return;\n  const n = parseInt(input[0], 10);\n  const height = input.slice(1, 1 + n).map(Number);\n\n  let left = 0, right = n - 1;\n  let maxArea = 0;\n\n  while (left < right) {\n    const width = right - left;\n    const h = Math.min(height[left], height[right]);\n    maxArea = Math.max(maxArea, width * h);\n\n    if (height[left] < height[right]) {\n      left++;\n    } else {\n      right--;\n    }\n  }\n\n  console.log(maxArea);\n}\n\nmain();"
    },
    "testcases": [
      {
        "id": "95f965db-8861-47fb-9fbe-1a78dbe39db6",
        "name": "Case 1",
        "stdin": "9\n1 8 6 2 5 4 8 3 7",
        "expectedStdout": "49",
        "isHidden": false,
        "explanation": null
      },
      {
        "id": "96405f59-0245-43db-a19c-c71bf673197f",
        "name": "Case 2",
        "stdin": "2\n1 1",
        "expectedStdout": "1",
        "isHidden": false,
        "explanation": null
      }
    ],
    "editorial": {
      "summary": "Two-pointer greedy strategy achieves optimal O(n) time and O(1) space."
    }
  },
  {
    "id": "7f64eb5f-35b4-434e-95e1-4c4b254fc53c",
    "number": 12,
    "title": "Integer to Roman",
    "slug": "integer-to-roman",
    "difficulty": "Medium",
    "category": "Algorithms",
    "acceptance": "64.1%",
    "isExempted": false,
    "likes": 6700,
    "dislikes": 5400,
    "topics": [
      "Hash Table",
      "Math",
      "String"
    ],
    "companies": [
      "Amazon",
      "Microsoft",
      "Bloomberg",
      "Google"
    ],
    "description": "\n<p class=\"mb-3\">Given an integer <code>num</code>, convert it to a <strong>Roman numeral</strong>.</p>\n<p class=\"mb-3\">Roman numerals are represented by seven different symbols: I (1), V (5), X (10), L (50), C (100), D (500) and M (1000).</p>\n",
    "inputFormat": "A single line containing the integer <code>num</code>.",
    "outputFormat": "Print the converted Roman numeral string.",
    "examples": [
      {
        "id": 1,
        "stdin": "3749",
        "stdout": "MMMDCCXLIX",
        "explanation": "3000 = MMM, 700 = DCC, 40 = XL, 9 = IX."
      },
      {
        "id": 2,
        "stdin": "58",
        "stdout": "LVIII",
        "explanation": "L = 50, V = 5, III = 3."
      },
      {
        "id": 3,
        "stdin": "1994",
        "stdout": "MCMXCIV",
        "explanation": "M = 1000, CM = 900, XC = 90 and IV = 4."
      }
    ],
    "constraints": [
      "1 <= num <= 3999"
    ],
    "hints": [
      "Subtract largest values greedily from the top."
    ],
    "starterCode": {
      "python": "import sys\n\ndef main():\n    s = sys.stdin.read().strip()\n    if not s:\n        return\n    num = int(s)\n    val = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]\n    syms = [\"M\", \"CM\", \"D\", \"CD\", \"C\", \"XC\", \"L\", \"XL\", \"X\", \"IX\", \"V\", \"IV\", \"I\"]\n    res = []\n    for v, sym in zip(val, syms):\n        while num >= v:\n            res.append(sym)\n            num -= v\n    print(\"\".join(res))\n\nif __name__ == '__main__':\n    main()",
      "javascript": "const fs = require('fs');\n\nfunction main() {\n  let num = parseInt(fs.readFileSync(0, 'utf-8').trim(), 10);\n  if (isNaN(num)) return;\n\n  const val = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];\n  const syms = [\"M\", \"CM\", \"D\", \"CD\", \"C\", \"XC\", \"L\", \"XL\", \"X\", \"IX\", \"V\", \"IV\", \"I\"];\n\n  let res = \"\";\n  for (let i = 0; i < val.length && num > 0; i++) {\n    while (num >= val[i]) {\n      num -= val[i];\n      res += syms[i];\n    }\n  }\n\n  console.log(res);\n}\n\nmain();"
    },
    "testcases": [
      {
        "id": "415e1e67-b3f2-479f-9d76-e28a7010d227",
        "name": "Case 1",
        "stdin": "3749",
        "expectedStdout": "MMMDCCXLIX",
        "isHidden": false,
        "explanation": null
      },
      {
        "id": "c98e6744-f022-46d9-9c21-353f5a6458ad",
        "name": "Case 2",
        "stdin": "58",
        "expectedStdout": "LVIII",
        "isHidden": false,
        "explanation": null
      },
      {
        "id": "a85c60ac-92cf-4aea-a932-5b72fcee3cb1",
        "name": "Case 3",
        "stdin": "1994",
        "expectedStdout": "MCMXCIV",
        "isHidden": false,
        "explanation": null
      }
    ],
    "editorial": {
      "summary": "Greedy value subtraction using predefined symbol mappings."
    }
  },
  {
    "id": "22cf2dc2-250e-4281-88e1-57ca9638db07",
    "number": 13,
    "title": "Roman to Integer",
    "slug": "roman-to-integer",
    "difficulty": "Easy",
    "category": "Algorithms",
    "acceptance": "61.3%",
    "isExempted": false,
    "likes": 14200,
    "dislikes": 950,
    "topics": [
      "Hash Table",
      "Math",
      "String"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Microsoft",
      "Apple"
    ],
    "description": "\n<p class=\"mb-3\">Given a roman numeral <code>s</code>, convert it to an integer.</p>\n",
    "inputFormat": "A single line containing the roman numeral string <code>s</code>.",
    "outputFormat": "Print the converted integer value.",
    "examples": [
      {
        "id": 1,
        "stdin": "III",
        "stdout": "3",
        "explanation": "III = 3."
      },
      {
        "id": 2,
        "stdin": "LVIII",
        "stdout": "58",
        "explanation": "L = 50, V= 5, III = 3."
      },
      {
        "id": 3,
        "stdin": "MCMXCIV",
        "stdout": "1994",
        "explanation": "M = 1000, CM = 900, XC = 90 and IV = 4."
      }
    ],
    "constraints": [
      "1 <= s.length <= 15",
      "s contains only the characters ('I', 'V', 'X', 'L', 'C', 'D', 'M')."
    ],
    "hints": [
      "If a smaller value appears before a larger value, subtract it; otherwise add it."
    ],
    "starterCode": {
      "python": "import sys\n\ndef main():\n    s = sys.stdin.read().strip()\n    roman = {'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000}\n    total = 0\n    for i in range(len(s)):\n        val = roman.get(s[i], 0)\n        if i + 1 < len(s) and val < roman.get(s[i + 1], 0):\n            total -= val\n        else:\n            total += val\n    print(total)\n\nif __name__ == '__main__':\n    main()",
      "javascript": "const fs = require('fs');\n\nfunction main() {\n  const s = fs.readFileSync(0, 'utf-8').trim();\n  const map = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };\n  let total = 0;\n\n  for (let i = 0; i < s.length; i++) {\n    const cur = map[s[i]];\n    const next = map[s[i + 1]];\n    if (next && cur < next) {\n      total -= cur;\n    } else {\n      total += cur;\n    }\n  }\n\n  console.log(total);\n}\n\nmain();"
    },
    "testcases": [
      {
        "id": "8abf21d0-d778-4e52-8395-b1142fc45a6f",
        "name": "Case 1",
        "stdin": "III",
        "expectedStdout": "3",
        "isHidden": false,
        "explanation": null
      },
      {
        "id": "3f0a17b1-fc9e-4522-a883-6b43d3ad5e10",
        "name": "Case 2",
        "stdin": "LVIII",
        "expectedStdout": "58",
        "isHidden": false,
        "explanation": null
      },
      {
        "id": "fbd44cfd-fb0a-4677-a83c-389450f54dd6",
        "name": "Case 3",
        "stdin": "MCMXCIV",
        "expectedStdout": "1994",
        "isHidden": false,
        "explanation": null
      }
    ],
    "editorial": {
      "summary": "Scan left to right, subtracting values when smaller than the next symbol."
    }
  },
  {
    "id": "f847ffe3-9cce-433c-92f0-c76b8ddcfa8e",
    "number": 14,
    "title": "Longest Common Prefix",
    "slug": "longest-common-prefix",
    "difficulty": "Easy",
    "category": "Algorithms",
    "acceptance": "42.5%",
    "isExempted": false,
    "likes": 17800,
    "dislikes": 4400,
    "topics": [
      "String",
      "Trie"
    ],
    "companies": [
      "Amazon",
      "Google",
      "Microsoft",
      "Meta"
    ],
    "description": "\n<p class=\"mb-3\">Write a function to find the longest common prefix string amongst an array of strings.</p>\n<p class=\"mb-3\">If there is no common prefix, return an empty string <code>\"\"</code>.</p>\n",
    "inputFormat": "First line: integer <code>n</code>.<br/>Second line: <code>n</code> space-separated strings.",
    "outputFormat": "Print the longest common prefix (or empty line if none).",
    "examples": [
      {
        "id": 1,
        "stdin": "3\nflower flow flight",
        "stdout": "fl",
        "explanation": "'fl' is common to all three words."
      },
      {
        "id": 2,
        "stdin": "3\ndog racecar car",
        "stdout": "",
        "explanation": "There is no common prefix among the input strings."
      }
    ],
    "constraints": [
      "1 <= strs.length <= 200",
      "0 <= strs[i].length <= 200",
      "strs[i] consists of only lowercase English letters."
    ],
    "hints": [
      "Compare characters column by column across all strings."
    ],
    "starterCode": {
      "python": "import sys\n\ndef main():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    n = int(tokens[0])\n    strs = tokens[1:1 + n]\n    if not strs:\n        print(\"\")\n        return\n    prefix = strs[0]\n    for s in strs[1:]:\n        while not s.startswith(prefix):\n            prefix = prefix[:-1]\n            if not prefix:\n                break\n    print(prefix)\n\nif __name__ == '__main__':\n    main()",
      "javascript": "const fs = require('fs');\n\nfunction main() {\n  const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\n  if (!input || input.length < 2) return;\n  const n = parseInt(input[0], 10);\n  const strs = input.slice(1, 1 + n);\n\n  if (!strs.length) { console.log(''); return; }\n\n  let prefix = strs[0];\n  for (let i = 1; i < strs.length; i++) {\n    while (strs[i].indexOf(prefix) !== 0) {\n      prefix = prefix.substring(0, prefix.length - 1);\n      if (!prefix) break;\n    }\n  }\n\n  console.log(prefix);\n}\n\nmain();"
    },
    "testcases": [
      {
        "id": "76b5c2f6-e52f-463f-a60c-cdb6e5c3a771",
        "name": "Case 1",
        "stdin": "3\nflower flow flight",
        "expectedStdout": "fl",
        "isHidden": false,
        "explanation": null
      },
      {
        "id": "4f317969-6304-4668-8c91-724d23dc0399",
        "name": "Case 2",
        "stdin": "3\ndog racecar car",
        "expectedStdout": "",
        "isHidden": false,
        "explanation": null
      }
    ],
    "editorial": {
      "summary": "Horizontal or vertical scanning to determine the common prefix."
    }
  },
  {
    "id": "b0c3a5c3-514b-4d06-aae0-5835bb8b3dcf",
    "number": 15,
    "title": "3Sum",
    "slug": "3sum",
    "difficulty": "Medium",
    "category": "Algorithms",
    "acceptance": "34.2%",
    "isExempted": false,
    "likes": 29800,
    "dislikes": 2700,
    "topics": [
      "Array",
      "Two Pointers",
      "Sorting"
    ],
    "companies": [
      "Amazon",
      "Meta",
      "Google",
      "Microsoft",
      "Apple"
    ],
    "description": "\n<p class=\"mb-3\">Given an integer array <code>nums</code>, return all the triplets <code>[nums[i], nums[j], nums[k]]</code> such that <code>i != j</code>, <code>i != k</code>, and <code>j != k</code>, and <code>nums[i] + nums[j] + nums[k] == 0</code>.</p>\n<p class=\"mb-3\">Notice that the solution set must not contain duplicate triplets.</p>\n",
    "inputFormat": "First line: integer <code>n</code>.<br/>Second line: <code>n</code> space-separated integers.",
    "outputFormat": "Print the count of unique triplets, followed by each triplet on a new line.",
    "examples": [
      {
        "id": 1,
        "stdin": "6\n-1 0 1 2 -1 -4",
        "stdout": "2\n-1 -1 2\n-1 0 1",
        "explanation": "Distinct triplets are [-1, -1, 2] and [-1, 0, 1]."
      },
      {
        "id": 2,
        "stdin": "3\n0 1 1",
        "stdout": "0",
        "explanation": "No triplet sums up to 0."
      }
    ],
    "constraints": [
      "3 <= nums.length <= 3000",
      "-10^5 <= nums[i] <= 10^5"
    ],
    "hints": [
      "Sort the array first to easily avoid duplicate elements and use two pointers."
    ],
    "starterCode": {
      "python": "import sys\n\ndef main():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    n = int(tokens[0])\n    nums = sorted(list(map(int, tokens[1:1 + n])))\n    res = []\n    for i in range(len(nums) - 2):\n        if i > 0 and nums[i] == nums[i - 1]:\n            continue\n        l, r = i + 1, len(nums) - 1\n        while l < r:\n            s = nums[i] + nums[l] + nums[r]\n            if s == 0:\n                res.append(f\"{nums[i]} {nums[l]} {nums[r]}\")\n                while l < r and nums[l] == nums[l + 1]:\n                    l += 1\n                while l < r and nums[r] == nums[r - 1]:\n                    r -= 1\n                l += 1\n                r -= 1\n            elif s < 0:\n                l += 1\n            else:\n                r -= 1\n    print(len(res))\n    for t in res:\n        print(t)\n\nif __name__ == '__main__':\n    main()",
      "javascript": "const fs = require('fs');\n\nfunction main() {\n  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\n  if (!tokens || tokens.length < 2) return;\n  const n = parseInt(tokens[0], 10);\n  const nums = tokens.slice(1, 1 + n).map(Number).sort((a, b) => a - b);\n\n  const res = [];\n  for (let i = 0; i < nums.length - 2; i++) {\n    if (i > 0 && nums[i] === nums[i - 1]) continue;\n    let l = i + 1, r = nums.length - 1;\n    while (l < r) {\n      const sum = nums[i] + nums[l] + nums[r];\n      if (sum === 0) {\n        res.push(`${nums[i]} ${nums[l]} ${nums[r]}`);\n        while (l < r && nums[l] === nums[l + 1]) l++;\n        while (l < r && nums[r] === nums[r - 1]) r--;\n        l++;\n        r--;\n      } else if (sum < 0) {\n        l++;\n      } else {\n        r--;\n      }\n    }\n  }\n\n  console.log(res.length + (res.length ? '\\n' + res.join('\\n') : ''));\n}\n\nmain();"
    },
    "testcases": [
      {
        "id": "6616eee4-d29b-4e11-bd38-1d1167a2e96b",
        "name": "Case 1",
        "stdin": "6\n-1 0 1 2 -1 -4",
        "expectedStdout": "2\n-1 -1 2\n-1 0 1",
        "isHidden": false,
        "explanation": null
      },
      {
        "id": "5a0fdc77-b830-4a3c-9422-4c61e9a954d6",
        "name": "Case 2",
        "stdin": "3\n0 1 1",
        "expectedStdout": "0",
        "isHidden": false,
        "explanation": null
      }
    ],
    "editorial": {
      "summary": "Sort the array and run Two Pointers for each index in O(n^2) time."
    }
  },
  {
    "id": "8d359254-d0c5-4bc3-a8c4-1ca1f6440b37",
    "number": 16,
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
    "description": "\n<p class=\"mb-3\">Given a string <code>s</code> containing just the characters <code>'('</code>, <code>')'</code>, <code>'{'</code>, <code>'}'</code>, <code>'['</code> and <code>']'</code>, determine if the input string is valid.</p>\n<p class=\"mb-3\">An input string is valid if brackets close in the correct order with matching types.</p>\n",
    "inputFormat": "A single line containing the bracket string <code>s</code>.",
    "outputFormat": "Print <code>true</code> if valid, or <code>false</code> otherwise.",
    "examples": [
      {
        "id": 1,
        "stdin": "()",
        "stdout": "true",
        "explanation": "Parentheses match."
      },
      {
        "id": 2,
        "stdin": "()[]{}",
        "stdout": "true",
        "explanation": "All match."
      },
      {
        "id": 3,
        "stdin": "(]",
        "stdout": "false",
        "explanation": "Mismatched type."
      }
    ],
    "constraints": [
      "1 <= s.length <= 10^4",
      "s consists of parentheses only '()[]{}'."
    ],
    "hints": [
      "Use a Stack data structure. Push opening brackets and pop matching closing brackets."
    ],
    "starterCode": {
      "python": "import sys\n\ndef main():\n    s = sys.stdin.read().strip()\n    stack = []\n    mapping = {')': '(', '}': '{', ']': '['}\n    for ch in s:\n        if ch in mapping.values():\n            stack.append(ch)\n        elif ch in mapping:\n            if not stack or stack.pop() != mapping[ch]:\n                print(\"false\")\n                return\n        else:\n            print(\"false\")\n            return\n    print(\"true\" if not stack else \"false\")\n\nif __name__ == '__main__':\n    main()",
      "javascript": "const fs = require('fs');\n\nfunction main() {\n  const s = fs.readFileSync(0, 'utf-8').trim();\n  const stack = [];\n  const map = { ')': '(', '}': '{', ']': '[' };\n\n  for (let i = 0; i < s.length; i++) {\n    const ch = s[i];\n    if (ch === '(' || ch === '{' || ch === '[') {\n      stack.push(ch);\n    } else {\n      if (stack.pop() !== map[ch]) {\n        console.log('false');\n        return;\n      }\n    }\n  }\n\n  console.log(stack.length === 0 ? 'true' : 'false');\n}\n\nmain();"
    },
    "testcases": [
      {
        "id": "1ec83796-9572-4d74-b5f3-482801204292",
        "name": "Case 1",
        "stdin": "()",
        "expectedStdout": "true",
        "isHidden": false,
        "explanation": null
      },
      {
        "id": "5e8fe46c-c795-4dd7-9080-f2c4c4516cb6",
        "name": "Case 2",
        "stdin": "()[]{}",
        "expectedStdout": "true",
        "isHidden": false,
        "explanation": null
      },
      {
        "id": "c5a76e59-9a6f-4c14-9262-2ce167a29d0f",
        "name": "Case 3",
        "stdin": "(]",
        "expectedStdout": "false",
        "isHidden": false,
        "explanation": null
      }
    ],
    "editorial": {
      "summary": "Linear scan using a stack to verify nested bracket order in O(n) time."
    }
  },
  {
    "id": "8ec922f4-e62e-4e10-89fa-b4d558e27594",
    "number": 17,
    "title": "Merge Two Sorted Lists",
    "slug": "merge-two-sorted-lists",
    "difficulty": "Easy",
    "category": "Data Structures",
    "acceptance": "63.2%",
    "isExempted": false,
    "likes": 21300,
    "dislikes": 1900,
    "topics": [
      "Linked List",
      "Recursion"
    ],
    "companies": [
      "Amazon",
      "Apple",
      "Microsoft",
      "Google"
    ],
    "description": "\n<p class=\"mb-3\">You are given the heads of two sorted linked lists <code>list1</code> and <code>list2</code>.</p>\n<p class=\"mb-3\">Merge the two lists into one <strong>sorted</strong> list. The list should be made by splicing together the nodes of the first two lists.</p>\n",
    "inputFormat": "First line: <code>n</code> followed by <code>n</code> integers.<br/>Second line: <code>m</code> followed by <code>m</code> integers.",
    "outputFormat": "Print the merged sorted integers separated by space.",
    "examples": [
      {
        "id": 1,
        "stdin": "3 1 2 4\n3 1 3 4",
        "stdout": "1 1 2 3 4 4",
        "explanation": "Merged sorted list."
      },
      {
        "id": 2,
        "stdin": "0\n0",
        "stdout": "",
        "explanation": "Both lists empty."
      }
    ],
    "constraints": [
      "The number of nodes in both lists is in the range [0, 50].",
      "-100 <= Node.val <= 100",
      "Both list1 and list2 are sorted in non-decreasing order."
    ],
    "hints": [
      "Compare the heads of both lists and advance the smaller one."
    ],
    "starterCode": {
      "python": "import sys\n\ndef main():\n    lines = sys.stdin.read().strip().split('\\n')\n    a = list(map(int, lines[0].split()[1:])) if len(lines) > 0 and lines[0].strip() else []\n    b = list(map(int, lines[1].split()[1:])) if len(lines) > 1 and lines[1].strip() else []\n    res = []\n    i, j = 0, 0\n    while i < len(a) and j < len(b):\n        if a[i] <= b[j]:\n            res.append(a[i])\n            i += 1\n        else:\n            res.append(b[j])\n            j += 1\n    res.extend(a[i:])\n    res.extend(b[j:])\n    print(\" \".join(map(str, res)))\n\nif __name__ == '__main__':\n    main()",
      "javascript": "const fs = require('fs');\n\nfunction main() {\n  const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');\n  if (!lines.length) return;\n  const a = (lines[0] || '').trim().split(/\\s+/).slice(1).filter(Boolean).map(Number);\n  const b = (lines[1] || '').trim().split(/\\s+/).slice(1).filter(Boolean).map(Number);\n\n  const res = [];\n  let i = 0, j = 0;\n  while (i < a.length && j < b.length) {\n    if (a[i] <= b[j]) res.push(a[i++]);\n    else res.push(b[j++]);\n  }\n  while (i < a.length) res.push(a[i++]);\n  while (j < b.length) res.push(b[j++]);\n\n  console.log(res.join(' '));\n}\n\nmain();"
    },
    "testcases": [
      {
        "id": "dd85afda-5339-4df3-afd2-b3c4cd545a8a",
        "name": "Case 1",
        "stdin": "3 1 2 4\n3 1 3 4",
        "expectedStdout": "1 1 2 3 4 4",
        "isHidden": false,
        "explanation": null
      },
      {
        "id": "bbeea5a6-2739-4ed1-8565-0ac46d954b12",
        "name": "Case 2",
        "stdin": "0\n0",
        "expectedStdout": "",
        "isHidden": false,
        "explanation": null
      }
    ],
    "editorial": {
      "summary": "Merge step identical to merge sort in O(n + m) time."
    }
  },
  {
    "id": "08e98a5a-a9b7-4f19-9b68-1c9d396d186c",
    "number": 18,
    "title": "Best Time to Buy and Sell Stock",
    "slug": "best-time-to-buy-and-sell-stock",
    "difficulty": "Easy",
    "category": "Algorithms",
    "acceptance": "53.6%",
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
      "Microsoft",
      "Google",
      "Meta"
    ],
    "description": "\n<p class=\"mb-3\">You are given an array <code>prices</code> where <code>prices[i]</code> is the price of a given stock on the <code>i<sup>th</sup></code> day.</p>\n<p class=\"mb-3\">You want to maximize your profit by choosing a <strong>single day</strong> to buy one stock and choosing a <strong>different day in the future</strong> to sell that stock.</p>\n<p class=\"mb-3\">Return <em>the maximum profit you can achieve from this transaction</em>. If you cannot achieve any profit, return <code>0</code>.</p>\n",
    "inputFormat": "First line: <code>n</code>.<br/>Second line: <code>n</code> space-separated prices.",
    "outputFormat": "Print the maximum possible profit as an integer.",
    "examples": [
      {
        "id": 1,
        "stdin": "6\n7 1 5 3 6 4",
        "stdout": "5",
        "explanation": "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6 - 1 = 5."
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
      "Keep track of the minimum buying price seen so far as you iterate through the days."
    ],
    "starterCode": {
      "python": "import sys\n\ndef main():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    n = int(tokens[0])\n    prices = list(map(int, tokens[1:1 + n]))\n    min_price = float('inf')\n    max_profit = 0\n    for p in prices:\n        if p < min_price:\n            min_price = p\n        elif p - min_price > max_profit:\n            max_profit = p - min_price\n    print(max_profit)\n\nif __name__ == '__main__':\n    main()",
      "javascript": "const fs = require('fs');\n\nfunction main() {\n  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\n  if (!tokens || tokens.length < 2) return;\n  const n = parseInt(tokens[0], 10);\n  const prices = tokens.slice(1, 1 + n).map(Number);\n\n  let minPrice = Infinity;\n  let maxProfit = 0;\n\n  for (let i = 0; i < prices.length; i++) {\n    if (prices[i] < minPrice) {\n      minPrice = prices[i];\n    } else if (prices[i] - minPrice > maxProfit) {\n      maxProfit = prices[i] - minPrice;\n    }\n  }\n\n  console.log(maxProfit);\n}\n\nmain();"
    },
    "testcases": [
      {
        "id": "05b290cb-50a1-431d-b24a-6ada80d67f03",
        "name": "Case 1",
        "stdin": "6\n7 1 5 3 6 4",
        "expectedStdout": "5",
        "isHidden": false,
        "explanation": null
      },
      {
        "id": "34fa55d3-8de5-48e5-a261-0aa52873e929",
        "name": "Case 2",
        "stdin": "5\n7 6 4 3 1",
        "expectedStdout": "0",
        "isHidden": false,
        "explanation": null
      }
    ],
    "editorial": {
      "summary": "One-pass algorithm tracking minimum price so far in O(n) time."
    }
  },
  {
    "id": "a9b94cee-3ea7-4bd3-82ea-56b95b2306a2",
    "number": 19,
    "title": "Maximum Subarray",
    "slug": "maximum-subarray",
    "difficulty": "Medium",
    "category": "Algorithms",
    "acceptance": "50.4%",
    "isExempted": false,
    "likes": 33400,
    "dislikes": 1390,
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
    "description": "\n<p class=\"mb-3\">Given an integer array <code>nums</code>, find the subarray with the largest sum, and return <em>its sum</em>.</p>\n",
    "inputFormat": "First line: <code>n</code>.<br/>Second line: <code>n</code> space-separated integers.",
    "outputFormat": "Print the maximum subarray sum.",
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
        "explanation": "Subarray [1] has sum 1."
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
      "Kadane's Algorithm: at each position, decide whether to add to current sum or start fresh."
    ],
    "starterCode": {
      "python": "import sys\n\ndef main():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    n = int(tokens[0])\n    nums = list(map(int, tokens[1:1 + n]))\n    cur_sum = max_sum = nums[0]\n    for x in nums[1:]:\n        cur_sum = max(x, cur_sum + x)\n        max_sum = max(max_sum, cur_sum)\n    print(max_sum)\n\nif __name__ == '__main__':\n    main()",
      "javascript": "const fs = require('fs');\n\nfunction main() {\n  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\n  if (!tokens || tokens.length < 2) return;\n  const n = parseInt(tokens[0], 10);\n  const nums = tokens.slice(1, 1 + n).map(Number);\n\n  let currentSum = nums[0];\n  let maxSum = nums[0];\n\n  for (let i = 1; i < nums.length; i++) {\n    currentSum = Math.max(nums[i], currentSum + nums[i]);\n    maxSum = Math.max(maxSum, currentSum);\n  }\n\n  console.log(maxSum);\n}\n\nmain();"
    },
    "testcases": [
      {
        "id": "85e178d6-8ae0-43ca-b054-256288ea860b",
        "name": "Case 1",
        "stdin": "9\n-2 1 -3 4 -1 2 1 -5 4",
        "expectedStdout": "6",
        "isHidden": false,
        "explanation": null
      },
      {
        "id": "5135ac07-6593-43d9-bfd7-42359141fd0f",
        "name": "Case 2",
        "stdin": "1\n1",
        "expectedStdout": "1",
        "isHidden": false,
        "explanation": null
      },
      {
        "id": "998fbe1f-36be-4f6f-8894-0166cfcc7863",
        "name": "Case 3",
        "stdin": "5\n5 4 -1 7 8",
        "expectedStdout": "23",
        "isHidden": false,
        "explanation": null
      }
    ],
    "editorial": {
      "summary": "Kadane's Algorithm computes the maximum subarray sum in O(n) time."
    }
  },
  {
    "id": "f10ffb51-a912-4b10-bccb-61073e380329",
    "number": 20,
    "title": "Trapping Rain Water",
    "slug": "trapping-rain-water",
    "difficulty": "Hard",
    "category": "Algorithms",
    "acceptance": "61.2%",
    "isExempted": false,
    "likes": 31200,
    "dislikes": 470,
    "topics": [
      "Array",
      "Two Pointers",
      "Dynamic Programming",
      "Stack"
    ],
    "companies": [
      "Goldman Sachs",
      "Amazon",
      "Google",
      "Meta",
      "Bloomberg"
    ],
    "description": "\n<p class=\"mb-3\">Given <code>n</code> non-negative integers representing an elevation map where the width of each bar is <code>1</code>, compute how much water it can trap after raining.</p>\n",
    "inputFormat": "First line: <code>n</code>.<br/>Second line: <code>n</code> space-separated integers representing elevation heights.",
    "outputFormat": "Print the total trapped water as an integer.",
    "examples": [
      {
        "id": 1,
        "stdin": "12\n0 1 0 2 1 0 1 3 2 1 2 1",
        "stdout": "6",
        "explanation": "6 units of rain water are being trapped."
      },
      {
        "id": 2,
        "stdin": "6\n4 2 0 3 2 5",
        "stdout": "9",
        "explanation": "9 units of rain water are trapped."
      }
    ],
    "constraints": [
      "n == height.length",
      "1 <= n <= 2 * 10^4",
      "0 <= height[i] <= 10^5"
    ],
    "hints": [
      "Water above bar i is determined by min(max_left, max_right) - height[i]."
    ],
    "starterCode": {
      "python": "import sys\n\ndef main():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    n = int(tokens[0])\n    height = list(map(int, tokens[1:1 + n]))\n    left, right = 0, n - 1\n    left_max, right_max = 0, 0\n    water = 0\n    while left < right:\n        if height[left] < height[right]:\n            if height[left] >= left_max:\n                left_max = height[left]\n            else:\n                water += left_max - height[left]\n            left += 1\n        else:\n            if height[right] >= right_max:\n                right_max = height[right]\n            else:\n                water += right_max - height[right]\n            right -= 1\n    print(water)\n\nif __name__ == '__main__':\n    main()",
      "javascript": "const fs = require('fs');\n\nfunction main() {\n  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);\n  if (!tokens || tokens.length < 2) return;\n  const n = parseInt(tokens[0], 10);\n  const height = tokens.slice(1, 1 + n).map(Number);\n\n  let left = 0, right = n - 1;\n  let leftMax = 0, rightMax = 0;\n  let water = 0;\n\n  while (left < right) {\n    if (height[left] < height[right]) {\n      if (height[left] >= leftMax) {\n        leftMax = height[left];\n      } else {\n        water += leftMax - height[left];\n      }\n      left++;\n    } else {\n      if (height[right] >= rightMax) {\n        rightMax = height[right];\n      } else {\n        water += rightMax - height[right];\n      }\n      right--;\n    }\n  }\n\n  console.log(water);\n}\n\nmain();"
    },
    "testcases": [
      {
        "id": "0a448e9a-84bf-47d9-a857-c3115337c483",
        "name": "Case 1",
        "stdin": "12\n0 1 0 2 1 0 1 3 2 1 2 1",
        "expectedStdout": "6",
        "isHidden": false,
        "explanation": null
      },
      {
        "id": "a513b0cd-82ea-454a-8d00-8da0e49c044e",
        "name": "Case 2",
        "stdin": "6\n4 2 0 3 2 5",
        "expectedStdout": "9",
        "isHidden": false,
        "explanation": null
      }
    ],
    "editorial": {
      "summary": "Two-pointer approach traps water inward in O(n) time and O(1) auxiliary space."
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
    "problemId": 16,
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
    "problemId": 18,
    "status": "Accepted",
    "runtime": "62 ms",
    "memory": "51.4 MB",
    "language": "Python",
    "timestamp": "3 days ago"
  },
  {
    "id": "sub_105",
    "problemId": 6,
    "status": "Accepted",
    "runtime": "52 ms",
    "memory": "44.2 MB",
    "language": "JavaScript",
    "timestamp": "4 days ago"
  },
  {
    "id": "sub_106",
    "problemId": 19,
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
