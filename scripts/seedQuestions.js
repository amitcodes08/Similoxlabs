import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { drizzle } from 'drizzle-orm/neon-http';
import { questions, testCases } from '../src/db/schema.js';
import { eq } from 'drizzle-orm';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error('DATABASE_URL is not set in environment variables');
  process.exit(1);
}

const db = drizzle(connectionString);

export const seedQuestions = [
  {
    number: 1,
    title: "Two Sum",
    slug: "two-sum",
    difficulty: "EASY",
    category: "Algorithms",
    acceptance: "52.4%",
    isExempted: true,
    likes: 54120,
    dislikes: 1820,
    topics: ["Array", "Hash Table"],
    companies: ["Amazon", "Google", "Apple", "Meta", "Microsoft"],
    description: `
<p class="mb-3">Given an array of integers <code>nums</code> and an integer <code>target</code>, find <em>indices of the two numbers such that they add up to <code>target</code></em>.</p>
<p class="mb-3">You may assume that each input would have <strong>exactly one solution</strong>, and you may not use the same element twice.</p>
<p class="mb-3">You can return or print the answer in any order, space-separated on a single line.</p>
`,
    inputFormat: "The first line contains two integers: <code>n</code> and <code>target</code>.<br/>The second line contains <code>n</code> space-separated integers representing <code>nums</code>.",
    outputFormat: "Print the two 0-based indices separated by a space on a single line.",
    examples: [
      { id: 1, stdin: "4 9\n2 7 11 15", stdout: "0 1", explanation: "Because nums[0] + nums[1] == 2 + 7 == 9, we print 0 1." },
      { id: 2, stdin: "3 6\n3 2 4", stdout: "1 2", explanation: "Because nums[1] + nums[2] == 2 + 4 == 6, we print 1 2." },
      { id: 3, stdin: "2 6\n3 3", stdout: "0 1", explanation: "Because nums[0] + nums[1] == 3 + 3 == 6, we print 0 1." }
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists."
    ],
    hints: [
      "A brute force approach searches for all pairs, taking O(n^2) time.",
      "Can we use a hash map to check if the complement (target - nums[i]) exists in O(1) time?"
    ],
    starterCode: {
      javascript: `const fs = require('fs');

function main() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
  if (!input || input.length < 2) return;

  const n = parseInt(input[0], 10);
  const target = parseInt(input[1], 10);
  const nums = [];
  for (let i = 0; i < n; i++) {
    nums.push(parseInt(input[2 + i], 10));
  }

  const map = new Map();
  for (let i = 0; i < n; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      console.log(\`\${map.get(complement)} \${i}\`);
      return;
    }
    map.set(nums[i], i);
  }
}

main();`,
      python: `import sys

def main():
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    n = int(input_data[0])
    target = int(input_data[1])
    nums = [int(x) for x in input_data[2:2 + n]]

    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            print(f"{seen[complement]} {i}")
            return
        seen[num] = i

if __name__ == '__main__':
    main()`,
      cpp: `#include <iostream>
#include <vector>
#include <unordered_map>

using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n, target;
    if (!(cin >> n >> target)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    unordered_map<int, int> seen;
    for (int i = 0; i < n; i++) {
        int complement = target - nums[i];
        if (seen.find(complement) != seen.end()) {
            cout << seen[complement] << " " << i << "\\n";
            return 0;
        }
        seen[nums[i]] = i;
    }
    return 0;
}`
    },
    testcases: [
      { name: "Case 1", stdin: "4 9\n2 7 11 15", expectedStdout: "0 1" },
      { name: "Case 2", stdin: "3 6\n3 2 4", expectedStdout: "1 2" },
      { name: "Case 3", stdin: "2 6\n3 3", expectedStdout: "0 1" }
    ],
    editorial: {
      summary: "Two Sum is best solved using a Hash Table for one-pass linear time complexity."
    },
    tags: ["array", "hash-table", "easy"]
  },
  {
    number: 2,
    title: "Add Two Numbers",
    slug: "add-two-numbers",
    difficulty: "MEDIUM",
    category: "Algorithms",
    acceptance: "43.1%",
    isExempted: false,
    likes: 31200,
    dislikes: 5800,
    topics: ["Linked List", "Math", "Recursion"],
    companies: ["Amazon", "Microsoft", "Bloomberg", "Google"],
    description: `
<p class="mb-3">You are given two non-empty linked lists representing two non-negative integers. The digits are stored in <strong>reverse order</strong>, and each of their nodes contains a single digit.</p>
<p class="mb-3">Add the two numbers and print the sum as a linked list in reverse order.</p>
<p class="mb-3">You may assume the two numbers do not contain any leading zero, except the number 0 itself.</p>
`,
    inputFormat: "The first line contains integer <code>n</code> followed by <code>n</code> digits of the first number.<br/>The second line contains integer <code>m</code> followed by <code>m</code> digits of the second number.",
    outputFormat: "Print the space-separated digits of the result linked list.",
    examples: [
      { id: 1, stdin: "3 2 4 3\n3 5 6 4", stdout: "7 0 8", explanation: "342 + 465 = 807." },
      { id: 2, stdin: "1 0\n1 0", stdout: "0", explanation: "0 + 0 = 0." },
      { id: 3, stdin: "7 9 9 9 9 9 9 9\n4 9 9 9 9", stdout: "8 9 9 9 0 0 0 1", explanation: "9999999 + 9999 = 10009998." }
    ],
    constraints: [
      "The number of nodes in each linked list is in the range [1, 100].",
      "0 <= Node.val <= 9"
    ],
    hints: [
      "Simulate elementary school addition column by column, keeping track of carry.",
      "Remember to handle a leftover carry at the very end."
    ],
    starterCode: {
      javascript: `const fs = require('fs');

function main() {
  const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
  if (lines.length < 2) return;

  const a = lines[0].trim().split(/\\s+/).slice(1).map(Number);
  const b = lines[1].trim().split(/\\s+/).slice(1).map(Number);

  const res = [];
  let carry = 0;
  let i = 0, j = 0;

  while (i < a.length || j < b.length || carry) {
    const sum = (i < a.length ? a[i++] : 0) + (j < b.length ? b[j++] : 0) + carry;
    res.push(sum % 10);
    carry = Math.floor(sum / 10);
  }

  console.log(res.join(' '));
}

main();`,
      python: `import sys

def main():
    lines = sys.stdin.read().strip().split('\\n')
    if len(lines) < 2:
        return
    a = list(map(int, lines[0].strip().split()[1:]))
    b = list(map(int, lines[1].strip().split()[1:]))

    res = []
    carry = 0
    i, j = 0, 0
    while i < len(a) or j < len(b) or carry:
        val1 = a[i] if i < len(a) else 0
        val2 = b[j] if j < len(b) else 0
        total = val1 + val2 + carry
        res.append(total % 10)
        carry = total // 10
        i += 1
        j += 1

    print(" ".join(map(str, res)))

if __name__ == '__main__':
    main()`
    },
    testcases: [
      { name: "Case 1", stdin: "3 2 4 3\n3 5 6 4", expectedStdout: "7 0 8" },
      { name: "Case 2", stdin: "1 0\n1 0", expectedStdout: "0" },
      { name: "Case 3", stdin: "7 9 9 9 9 9 9 9\n4 9 9 9 9", expectedStdout: "8 9 9 9 0 0 0 1" }
    ],
    editorial: {
      summary: "Add Two Numbers is solved by traversing both digit lists and maintaining a carry."
    },
    tags: ["linked-list", "math", "medium"]
  },
  {
    number: 3,
    title: "Longest Substring Without Repeating Characters",
    slug: "longest-substring-without-repeating-characters",
    difficulty: "MEDIUM",
    category: "Algorithms",
    acceptance: "34.7%",
    isExempted: false,
    likes: 38290,
    dislikes: 1740,
    topics: ["Hash Table", "String", "Sliding Window"],
    companies: ["Amazon", "Bloomberg", "Microsoft", "Meta", "Google"],
    description: `
<p class="mb-3">Given a string <code>s</code>, find the length of the <strong>longest substring</strong> without repeating characters.</p>
<p class="mb-3">A substring is a contiguous non-empty sequence of characters within a string.</p>
`,
    inputFormat: "A single line containing the string <code>s</code>.",
    outputFormat: "Print a single integer denoting the length of the longest substring without repeating characters.",
    examples: [
      { id: 1, stdin: "abcabcbb", stdout: "3", explanation: "The answer is 'abc', with the length of 3." },
      { id: 2, stdin: "bbbbb", stdout: "1", explanation: "The answer is 'b', with the length of 1." },
      { id: 3, stdin: "pwwkew", stdout: "3", explanation: "The answer is 'wke', with the length of 3." }
    ],
    constraints: [
      "0 <= s.length <= 5 * 10^4",
      "s consists of English letters, digits, symbols and spaces."
    ],
    hints: [
      "Use a sliding window with two pointers [left, right].",
      "Keep track of the last index where each character appeared using a hash map."
    ],
    starterCode: {
      javascript: `const fs = require('fs');

function main() {
  const input = fs.readFileSync(0, 'utf-8').replace(/\\r?\\n$/, '');
  const s = input;

  const map = new Map();
  let maxLen = 0;
  let left = 0;

  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    if (map.has(char) && map.get(char) >= left) {
      left = map.get(char) + 1;
    }
    map.set(char, right);
    maxLen = Math.max(maxLen, right - left + 1);
  }

  console.log(maxLen);
}

main();`,
      python: `import sys

def main():
    s = sys.stdin.read().rstrip('\\r\\n')
    last_idx = {}
    left = 0
    max_len = 0

    for right, ch in enumerate(s):
        if ch in last_idx and last_idx[ch] >= left:
            left = last_idx[ch] + 1
        last_idx[ch] = right
        max_len = max(max_len, right - left + 1)

    print(max_len)

if __name__ == '__main__':
    main()`
    },
    testcases: [
      { name: "Case 1", stdin: "abcabcbb", expectedStdout: "3" },
      { name: "Case 2", stdin: "bbbbb", expectedStdout: "1" },
      { name: "Case 3", stdin: "pwwkew", expectedStdout: "3" }
    ],
    editorial: {
      summary: "Solved in O(n) time using the sliding window technique and a hash map for character positions."
    },
    tags: ["sliding-window", "string", "medium"]
  },
  {
    number: 4,
    title: "Median of Two Sorted Arrays",
    slug: "median-of-two-sorted-arrays",
    difficulty: "HARD",
    category: "Algorithms",
    acceptance: "39.6%",
    isExempted: false,
    likes: 27950,
    dislikes: 3050,
    topics: ["Array", "Binary Search", "Divide and Conquer"],
    companies: ["Google", "Amazon", "Apple", "Microsoft", "Goldman Sachs"],
    description: `
<p class="mb-3">Given two sorted arrays <code>nums1</code> and <code>nums2</code> of size <code>m</code> and <code>n</code> respectively, return the <strong>median</strong> of the two sorted arrays.</p>
<p class="mb-3">The overall run time complexity should be <code>O(log (m+n))</code>.</p>
`,
    inputFormat: "First line: <code>m</code> followed by <code>m</code> space-separated integers.<br/>Second line: <code>n</code> followed by <code>n</code> space-separated integers.",
    outputFormat: "Print the median formatted to 5 decimal places if not an integer, or as a float.",
    examples: [
      { id: 1, stdin: "2 1 3\n1 2", stdout: "2.00000", explanation: "Merged array = [1,2,3] and median is 2." },
      { id: 2, stdin: "2 1 2\n2 3 4", stdout: "2.50000", explanation: "Merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5." }
    ],
    constraints: [
      "nums1.length == m",
      "nums2.length == n",
      "0 <= m, n <= 1000",
      "1 <= m + n <= 2000",
      "-10^6 <= nums1[i], nums2[i] <= 10^6"
    ],
    hints: [
      "The condition O(log(m+n)) strongly hints at binary search.",
      "Partition both arrays such that elements on the left are smaller than elements on the right."
    ],
    starterCode: {
      javascript: `const fs = require('fs');

function main() {
  const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
  if (lines.length < 2) return;

  const a = lines[0].trim().split(/\\s+/).slice(1).map(Number);
  const b = lines[1].trim().split(/\\s+/).slice(1).map(Number);

  const merged = [...a, ...b].sort((x, y) => x - y);
  const mid = Math.floor(merged.length / 2);
  const median = merged.length % 2 === 0 ? (merged[mid - 1] + merged[mid]) / 2 : merged[mid];
  console.log(median.toFixed(5));
}

main();`,
      python: `import sys

def main():
    lines = sys.stdin.read().strip().split('\\n')
    if len(lines) < 2:
        return
    a = list(map(int, lines[0].split()[1:]))
    b = list(map(int, lines[1].split()[1:]))
    merged = sorted(a + b)
    n = len(merged)
    if n % 2 == 0:
        med = (merged[n // 2 - 1] + merged[n // 2]) / 2.0
    else:
        med = float(merged[n // 2])
    print(f"{med:.5f}")

if __name__ == '__main__':
    main()`
    },
    testcases: [
      { name: "Case 1", stdin: "2 1 3\n1 2", expectedStdout: "2.00000" },
      { name: "Case 2", stdin: "2 1 2\n2 3 4", expectedStdout: "2.50000" }
    ],
    editorial: {
      summary: "Perform binary search on the shorter array to partition both arrays into two equal halves."
    },
    tags: ["binary-search", "array", "hard"]
  },
  {
    number: 5,
    title: "Longest Palindromic Substring",
    slug: "longest-palindromic-substring",
    difficulty: "MEDIUM",
    category: "Algorithms",
    acceptance: "33.9%",
    isExempted: false,
    likes: 29400,
    dislikes: 1720,
    topics: ["Two Pointers", "String", "Dynamic Programming"],
    companies: ["Amazon", "Microsoft", "Google", "Adobe", "Meta"],
    description: `
<p class="mb-3">Given a string <code>s</code>, return <em>the longest palindromic substring</em> in <code>s</code>.</p>
<p class="mb-3">A string is palindromic if it reads the same forward and backward.</p>
`,
    inputFormat: "A single line containing string <code>s</code>.",
    outputFormat: "Print the longest palindromic substring.",
    examples: [
      { id: 1, stdin: "babad", stdout: "bab", explanation: "'aba' is also a valid answer." },
      { id: 2, stdin: "cbbd", stdout: "bb", explanation: "'bb' is the longest palindrome." }
    ],
    constraints: [
      "1 <= s.length <= 1000",
      "s consists of only digits and English letters."
    ],
    hints: [
      "How can we reuse a previously calculated palindrome?",
      "Can we expand around centers? There are 2n - 1 centers."
    ],
    starterCode: {
      javascript: `const fs = require('fs');

function main() {
  const s = fs.readFileSync(0, 'utf-8').trim();
  if (!s) return;

  let start = 0, maxLen = 0;

  function expand(left, right) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      left--;
      right++;
    }
    const len = right - left - 1;
    if (len > maxLen) {
      maxLen = len;
      start = left + 1;
    }
  }

  for (let i = 0; i < s.length; i++) {
    expand(i, i);
    expand(i, i + 1);
  }

  console.log(s.substring(start, start + maxLen));
}

main();`,
      python: `import sys

def main():
    s = sys.stdin.read().strip()
    if not s:
        return

    start, max_len = 0, 0

    def expand(left, right):
        nonlocal start, max_len
        while left >= 0 and right < len(s) and s[left] == s[right]:
            left -= 1
            right += 1
        length = right - left - 1
        if length > max_len:
            max_len = length
            start = left + 1

    for i in range(len(s)):
        expand(i, i)
        expand(i, i + 1)

    print(s[start:start + max_len])

if __name__ == '__main__':
    main()`
    },
    testcases: [
      { name: "Case 1", stdin: "babad", expectedStdout: "bab" },
      { name: "Case 2", stdin: "cbbd", expectedStdout: "bb" }
    ],
    editorial: {
      summary: "Expand around each center in O(n^2) time and O(1) space."
    },
    tags: ["string", "dynamic-programming", "medium"]
  },
  {
    number: 6,
    title: "Reverse Linked List",
    slug: "reverse-linked-list",
    difficulty: "EASY",
    category: "Data Structures",
    acceptance: "75.8%",
    isExempted: false,
    likes: 21540,
    dislikes: 420,
    topics: ["Linked List", "Recursion"],
    companies: ["Amazon", "Microsoft", "Apple", "Google", "Meta"],
    description: `
<p class="mb-3">Given the <code>head</code> of a singly linked list, reverse the list, and return <em>the reversed list</em>.</p>
`,
    inputFormat: "First line: <code>n</code> (number of nodes).<br/>Second line: <code>n</code> space-separated integers.",
    outputFormat: "Print the reversed values separated by space.",
    examples: [
      { id: 1, stdin: "5\n1 2 3 4 5", stdout: "5 4 3 2 1", explanation: "The reversed linked list is [5,4,3,2,1]." },
      { id: 2, stdin: "2\n1 2", stdout: "2 1", explanation: "The reversed linked list is [2,1]." }
    ],
    constraints: [
      "The number of nodes in the list is the range [0, 5000].",
      "-5000 <= Node.val <= 5000"
    ],
    hints: [
      "Iterate through the list while maintaining prev, curr, and next pointers."
    ],
    starterCode: {
      javascript: `const fs = require('fs');

function main() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
  if (!input || input.length < 2) return;
  const n = parseInt(input[0], 10);
  const nums = input.slice(1, 1 + n);
  console.log(nums.reverse().join(' '));
}

main();`,
      python: `import sys

def main():
    tokens = sys.stdin.read().split()
    if not tokens:
        return
    n = int(tokens[0])
    nums = tokens[1:1 + n]
    print(" ".join(reversed(nums)))

if __name__ == '__main__':
    main()`
    },
    testcases: [
      { name: "Case 1", stdin: "5\n1 2 3 4 5", expectedStdout: "5 4 3 2 1" },
      { name: "Case 2", stdin: "2\n1 2", expectedStdout: "2 1" }
    ],
    editorial: {
      summary: "Invert links iteratively using a previous pointer in O(n) time and O(1) space."
    },
    tags: ["linked-list", "easy"]
  },
  {
    number: 7,
    title: "Reverse Integer",
    slug: "reverse-integer",
    difficulty: "MEDIUM",
    category: "Algorithms",
    acceptance: "28.5%",
    isExempted: false,
    likes: 12890,
    dislikes: 13200,
    topics: ["Math"],
    companies: ["Amazon", "Bloomberg", "Apple", "Microsoft"],
    description: `
<p class="mb-3">Given a signed 32-bit integer <code>x</code>, return <code>x</code> <em>with its digits reversed</em>. If reversing <code>x</code> causes the value to go outside the signed 32-bit integer range <code>[-2^31, 2^31 - 1]</code>, then return <code>0</code>.</p>
`,
    inputFormat: "A single line containing the signed 32-bit integer <code>x</code>.",
    outputFormat: "Print the reversed integer or 0 if it overflows.",
    examples: [
      { id: 1, stdin: "123", stdout: "321", explanation: "123 reversed is 321." },
      { id: 2, stdin: "-123", stdout: "-321", explanation: "-123 reversed is -321." },
      { id: 3, stdin: "120", stdout: "21", explanation: "120 reversed is 21." }
    ],
    constraints: [
      "-2^31 <= x <= 2^31 - 1"
    ],
    hints: [
      "Check overflow before multiplying the accumulated value by 10."
    ],
    starterCode: {
      javascript: `const fs = require('fs');

function main() {
  const x = parseInt(fs.readFileSync(0, 'utf-8').trim(), 10);
  if (isNaN(x)) return;

  const sign = x < 0 ? -1 : 1;
  const rev = parseInt(Math.abs(x).toString().split('').reverse().join(''), 10) * sign;

  if (rev < -Math.pow(2, 31) || rev > Math.pow(2, 31) - 1) {
    console.log(0);
  } else {
    console.log(rev);
  }
}

main();`,
      python: `import sys

def main():
    val_str = sys.stdin.read().strip()
    if not val_str:
        return
    x = int(val_str)
    sign = -1 if x < 0 else 1
    rev = int(str(abs(x))[::-1]) * sign
    if rev < -2**31 or rev > 2**31 - 1:
        print(0)
    else:
        print(rev)

if __name__ == '__main__':
    main()`
    },
    testcases: [
      { name: "Case 1", stdin: "123", expectedStdout: "321" },
      { name: "Case 2", stdin: "-123", expectedStdout: "-321" },
      { name: "Case 3", stdin: "120", expectedStdout: "21" }
    ],
    editorial: {
      summary: "Extract digits using modulo 10 and check for 32-bit signed integer limits."
    },
    tags: ["math", "medium"]
  },
  {
    number: 8,
    title: "String to Integer (atoi)",
    slug: "string-to-integer-atoi",
    difficulty: "MEDIUM",
    category: "Algorithms",
    acceptance: "17.2%",
    isExempted: false,
    likes: 4200,
    dislikes: 13500,
    topics: ["String"],
    companies: ["Amazon", "Microsoft", "Meta", "Bloomberg"],
    description: `
<p class="mb-3">Implement the <code>myAtoi(string s)</code> function, which converts a string to a 32-bit signed integer.</p>
<p class="mb-3">The algorithm: ignore leading whitespace, read optional sign ('+' or '-'), read digits until non-digit, and clamp to <code>[-2^31, 2^31 - 1]</code>.</p>
`,
    inputFormat: "A single line containing string <code>s</code>.",
    outputFormat: "Print the clamped 32-bit signed integer.",
    examples: [
      { id: 1, stdin: "42", stdout: "42", explanation: "Parsed integer is 42." },
      { id: 2, stdin: "   -042", stdout: "-42", explanation: "Leading whitespace and zero ignored." },
      { id: 3, stdin: "1337c0d3", stdout: "1337", explanation: "Parsing stops at 'c'." }
    ],
    constraints: [
      "0 <= s.length <= 200",
      "s consists of English letters, digits, ' ', '+', '-', and '.'."
    ],
    hints: [
      "Carefully handle whitespaces, sign character, numeric digits, and 32-bit overflow."
    ],
    starterCode: {
      javascript: `const fs = require('fs');

function main() {
  const s = fs.readFileSync(0, 'utf-8');
  let i = 0;
  while (i < s.length && s[i] === ' ') i++;

  let sign = 1;
  if (s[i] === '+') { i++; }
  else if (s[i] === '-') { sign = -1; i++; }

  let res = 0;
  const INT_MAX = 2147483647;
  const INT_MIN = -2147483648;

  while (i < s.length && s[i] >= '0' && s[i] <= '9') {
    const digit = s.charCodeAt(i) - 48;
    res = res * 10 + digit;
    if (sign * res > INT_MAX) { console.log(INT_MAX); return; }
    if (sign * res < INT_MIN) { console.log(INT_MIN); return; }
    i++;
  }

  console.log(sign * res);
}

main();`,
      python: `import sys

def main():
    s = sys.stdin.read()
    s = s.lstrip()
    if not s:
        print(0)
        return
    sign = 1
    i = 0
    if s[0] == '+':
        i = 1
    elif s[0] == '-':
        sign = -1
        i = 1
    res = 0
    while i < len(s) and s[i].isdigit():
        res = res * 10 + int(s[i])
        i += 1
    res *= sign
    INT_MAX = 2**31 - 1
    INT_MIN = -2**31
    if res > INT_MAX:
        print(INT_MAX)
    elif res < INT_MIN:
        print(INT_MIN)
    else:
        print(res)

if __name__ == '__main__':
    main()`
    },
    testcases: [
      { name: "Case 1", stdin: "42", expectedStdout: "42" },
      { name: "Case 2", stdin: "   -042", expectedStdout: "-42" },
      { name: "Case 3", stdin: "1337c0d3", expectedStdout: "1337" }
    ],
    editorial: {
      summary: "Scan characters sequentially with clamping to 32-bit limits."
    },
    tags: ["string", "math", "medium"]
  },
  {
    number: 9,
    title: "Palindrome Number",
    slug: "palindrome-number",
    difficulty: "EASY",
    category: "Algorithms",
    acceptance: "55.2%",
    isExempted: false,
    likes: 12500,
    dislikes: 2400,
    topics: ["Math"],
    companies: ["Amazon", "Google", "Microsoft", "Bloomberg"],
    description: `
<p class="mb-3">Given an integer <code>x</code>, return <code>true</code> <em>if <code>x</code> is a <strong>palindrome</strong>, and <code>false</code> otherwise</em>.</p>
<p class="mb-3">An integer is a palindrome when it reads the same forward and backward.</p>
`,
    inputFormat: "A single line containing the integer <code>x</code>.",
    outputFormat: "Print <code>true</code> if palindrome, or <code>false</code> otherwise.",
    examples: [
      { id: 1, stdin: "121", stdout: "true", explanation: "121 reads as 121 from left to right and right to left." },
      { id: 2, stdin: "-121", stdout: "false", explanation: "From left to right it is -121. From right to left it is 121-." },
      { id: 3, stdin: "10", stdout: "false", explanation: "Reads 01 from right to left." }
    ],
    constraints: [
      "-2^31 <= x <= 2^31 - 1"
    ],
    hints: [
      "Negative numbers are never palindromes due to the minus sign.",
      "Could you solve it without converting the integer to a string?"
    ],
    starterCode: {
      javascript: `const fs = require('fs');

function main() {
  const str = fs.readFileSync(0, 'utf-8').trim();
  if (!str) return;
  const rev = str.split('').reverse().join('');
  console.log(str === rev ? 'true' : 'false');
}

main();`,
      python: `import sys

def main():
    s = sys.stdin.read().strip()
    print("true" if s == s[::-1] else "false")

if __name__ == '__main__':
    main()`
    },
    testcases: [
      { name: "Case 1", stdin: "121", expectedStdout: "true" },
      { name: "Case 2", stdin: "-121", expectedStdout: "false" },
      { name: "Case 3", stdin: "10", expectedStdout: "false" }
    ],
    editorial: {
      summary: "Revert the half of the number or compare string representations."
    },
    tags: ["math", "easy"]
  },
  {
    number: 10,
    title: "Regular Expression Matching",
    slug: "regular-expression-matching",
    difficulty: "HARD",
    category: "Algorithms",
    acceptance: "28.3%",
    isExempted: false,
    likes: 11900,
    dislikes: 2100,
    topics: ["String", "Dynamic Programming", "Recursion"],
    companies: ["Google", "Meta", "Amazon", "Microsoft"],
    description: `
<p class="mb-3">Given an input string <code>s</code> and a pattern <code>p</code>, implement regular expression matching with support for <code>'.'</code> and <code>'*'</code> where:</p>
<ul class="list-disc pl-5 mb-3 space-y-1">
  <li><code>'.'</code> Matches any single character.</li>
  <li><code>'*'</code> Matches zero or more of the preceding element.</li>
</ul>
<p class="mb-3">The matching should cover the <strong>entire</strong> input string (not partial).</p>
`,
    inputFormat: "First line: string <code>s</code>.<br/>Second line: pattern <code>p</code>.",
    outputFormat: "Print <code>true</code> if pattern matches s, otherwise <code>false</code>.",
    examples: [
      { id: 1, stdin: "aa\na", stdout: "false", explanation: "'a' does not match the entire string 'aa'." },
      { id: 2, stdin: "aa\na*", stdout: "true", explanation: "'*' means zero or more of 'a'." },
      { id: 3, stdin: "ab\n.*", stdout: "true", explanation: "'.*' means zero or more of any character." }
    ],
    constraints: [
      "1 <= s.length <= 20",
      "1 <= p.length <= 20",
      "s contains only lowercase English letters.",
      "p contains only lowercase English letters, '.', and '*'."
    ],
    hints: [
      "Use 2D dynamic programming dp[i][j] representing if s[i:] matches p[j:]."
    ],
    starterCode: {
      javascript: `const fs = require('fs');

function main() {
  const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
  if (lines.length < 2) return;
  const s = lines[0].trim();
  const p = lines[1].trim();

  const memo = new Map();
  function dp(i, j) {
    const key = \`\${i},\${j}\`;
    if (memo.has(key)) return memo.get(key);
    if (j === p.length) return i === s.length;

    const firstMatch = i < s.length && (p[j] === s[i] || p[j] === '.');
    let ans = false;

    if (j + 1 < p.length && p[j + 1] === '*') {
      ans = dp(i, j + 2) || (firstMatch && dp(i + 1, j));
    } else {
      ans = firstMatch && dp(i + 1, j + 1);
    }

    memo.set(key, ans);
    return ans;
  }

  console.log(dp(0, 0) ? 'true' : 'false');
}

main();`,
      python: `import sys

def main():
    lines = sys.stdin.read().strip().split('\\n')
    if len(lines) < 2:
        return
    s, p = lines[0].strip(), lines[1].strip()
    memo = {}

    def dp(i, j):
        if (i, j) in memo:
            return memo[(i, j)]
        if j == len(p):
            return i == len(s)
        first_match = i < len(s) and (p[j] == s[i] or p[j] == '.')
        if j + 1 < len(p) and p[j + 1] == '*':
            ans = dp(i, j + 2) or (first_match and dp(i + 1, j))
        else:
            ans = first_match and dp(i + 1, j + 1)
        memo[(i, j)] = ans
        return ans

    print("true" if dp(0, 0) else "false")

if __name__ == '__main__':
    main()`
    },
    testcases: [
      { name: "Case 1", stdin: "aa\na", expectedStdout: "false" },
      { name: "Case 2", stdin: "aa\na*", expectedStdout: "true" },
      { name: "Case 3", stdin: "ab\n.*", expectedStdout: "true" }
    ],
    editorial: {
      summary: "2D Dynamic Programming over string indices i and pattern indices j."
    },
    tags: ["dynamic-programming", "string", "hard"]
  },
  {
    number: 11,
    title: "Container With Most Water",
    slug: "container-with-most-water",
    difficulty: "MEDIUM",
    category: "Algorithms",
    acceptance: "54.8%",
    isExempted: false,
    likes: 27800,
    dislikes: 1580,
    topics: ["Array", "Two Pointers", "Greedy"],
    companies: ["Amazon", "Google", "Apple", "Adobe", "Meta"],
    description: `
<p class="mb-3">You are given an integer array <code>height</code> of length <code>n</code>. There are <code>n</code> vertical lines drawn such that the two endpoints of the <code>i<sup>th</sup></code> line are <code>(i, 0)</code> and <code>(i, height[i])</code>.</p>
<p class="mb-3">Find two lines that together with the x-axis form a container, such that the container contains the most water.</p>
<p class="mb-3">Return <em>the maximum amount of water a container can store</em>.</p>
`,
    inputFormat: "First line: integer <code>n</code>.<br/>Second line: <code>n</code> space-separated integers representing heights.",
    outputFormat: "Print the maximum area as an integer.",
    examples: [
      { id: 1, stdin: "9\n1 8 6 2 5 4 8 3 7", stdout: "49", explanation: "The max area is between index 1 (height 8) and index 8 (height 7): min(8, 7) * (8 - 1) = 49." },
      { id: 2, stdin: "2\n1 1", stdout: "1", explanation: "1 * (1 - 0) = 1." }
    ],
    constraints: [
      "n == height.length",
      "2 <= n <= 10^5",
      "0 <= height[i] <= 10^4"
    ],
    hints: [
      "Use two pointers starting at both ends.",
      "Always move the pointer with the smaller height inward."
    ],
    starterCode: {
      javascript: `const fs = require('fs');

function main() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
  if (!input || input.length < 2) return;
  const n = parseInt(input[0], 10);
  const height = input.slice(1, 1 + n).map(Number);

  let left = 0, right = n - 1;
  let maxArea = 0;

  while (left < right) {
    const width = right - left;
    const h = Math.min(height[left], height[right]);
    maxArea = Math.max(maxArea, width * h);

    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }

  console.log(maxArea);
}

main();`,
      python: `import sys

def main():
    tokens = sys.stdin.read().split()
    if not tokens:
        return
    n = int(tokens[0])
    height = list(map(int, tokens[1:1 + n]))
    left, right = 0, n - 1
    max_area = 0
    while left < right:
        max_area = max(max_area, (right - left) * min(height[left], height[right]))
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1
    print(max_area)

if __name__ == '__main__':
    main()`
    },
    testcases: [
      { name: "Case 1", stdin: "9\n1 8 6 2 5 4 8 3 7", expectedStdout: "49" },
      { name: "Case 2", stdin: "2\n1 1", expectedStdout: "1" }
    ],
    editorial: {
      summary: "Two-pointer greedy strategy achieves optimal O(n) time and O(1) space."
    },
    tags: ["two-pointers", "greedy", "medium"]
  },
  {
    number: 12,
    title: "Integer to Roman",
    slug: "integer-to-roman",
    difficulty: "MEDIUM",
    category: "Algorithms",
    acceptance: "64.1%",
    isExempted: false,
    likes: 6700,
    dislikes: 5400,
    topics: ["Hash Table", "Math", "String"],
    companies: ["Amazon", "Microsoft", "Bloomberg", "Google"],
    description: `
<p class="mb-3">Given an integer <code>num</code>, convert it to a <strong>Roman numeral</strong>.</p>
<p class="mb-3">Roman numerals are represented by seven different symbols: I (1), V (5), X (10), L (50), C (100), D (500) and M (1000).</p>
`,
    inputFormat: "A single line containing the integer <code>num</code>.",
    outputFormat: "Print the converted Roman numeral string.",
    examples: [
      { id: 1, stdin: "3749", stdout: "MMMDCCXLIX", explanation: "3000 = MMM, 700 = DCC, 40 = XL, 9 = IX." },
      { id: 2, stdin: "58", stdout: "LVIII", explanation: "L = 50, V = 5, III = 3." },
      { id: 3, stdin: "1994", stdout: "MCMXCIV", explanation: "M = 1000, CM = 900, XC = 90 and IV = 4." }
    ],
    constraints: [
      "1 <= num <= 3999"
    ],
    hints: [
      "Subtract largest values greedily from the top."
    ],
    starterCode: {
      javascript: `const fs = require('fs');

function main() {
  let num = parseInt(fs.readFileSync(0, 'utf-8').trim(), 10);
  if (isNaN(num)) return;

  const val = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  const syms = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];

  let res = "";
  for (let i = 0; i < val.length && num > 0; i++) {
    while (num >= val[i]) {
      num -= val[i];
      res += syms[i];
    }
  }

  console.log(res);
}

main();`,
      python: `import sys

def main():
    s = sys.stdin.read().strip()
    if not s:
        return
    num = int(s)
    val = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
    syms = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"]
    res = []
    for v, sym in zip(val, syms):
        while num >= v:
            res.append(sym)
            num -= v
    print("".join(res))

if __name__ == '__main__':
    main()`
    },
    testcases: [
      { name: "Case 1", stdin: "3749", expectedStdout: "MMMDCCXLIX" },
      { name: "Case 2", stdin: "58", expectedStdout: "LVIII" },
      { name: "Case 3", stdin: "1994", expectedStdout: "MCMXCIV" }
    ],
    editorial: {
      summary: "Greedy value subtraction using predefined symbol mappings."
    },
    tags: ["math", "string", "medium"]
  },
  {
    number: 13,
    title: "Roman to Integer",
    slug: "roman-to-integer",
    difficulty: "EASY",
    category: "Algorithms",
    acceptance: "61.3%",
    isExempted: false,
    likes: 14200,
    dislikes: 950,
    topics: ["Hash Table", "Math", "String"],
    companies: ["Amazon", "Google", "Microsoft", "Apple"],
    description: `
<p class="mb-3">Given a roman numeral <code>s</code>, convert it to an integer.</p>
`,
    inputFormat: "A single line containing the roman numeral string <code>s</code>.",
    outputFormat: "Print the converted integer value.",
    examples: [
      { id: 1, stdin: "III", stdout: "3", explanation: "III = 3." },
      { id: 2, stdin: "LVIII", stdout: "58", explanation: "L = 50, V= 5, III = 3." },
      { id: 3, stdin: "MCMXCIV", stdout: "1994", explanation: "M = 1000, CM = 900, XC = 90 and IV = 4." }
    ],
    constraints: [
      "1 <= s.length <= 15",
      "s contains only the characters ('I', 'V', 'X', 'L', 'C', 'D', 'M')."
    ],
    hints: [
      "If a smaller value appears before a larger value, subtract it; otherwise add it."
    ],
    starterCode: {
      javascript: `const fs = require('fs');

function main() {
  const s = fs.readFileSync(0, 'utf-8').trim();
  const map = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  let total = 0;

  for (let i = 0; i < s.length; i++) {
    const cur = map[s[i]];
    const next = map[s[i + 1]];
    if (next && cur < next) {
      total -= cur;
    } else {
      total += cur;
    }
  }

  console.log(total);
}

main();`,
      python: `import sys

def main():
    s = sys.stdin.read().strip()
    roman = {'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000}
    total = 0
    for i in range(len(s)):
        val = roman.get(s[i], 0)
        if i + 1 < len(s) and val < roman.get(s[i + 1], 0):
            total -= val
        else:
            total += val
    print(total)

if __name__ == '__main__':
    main()`
    },
    testcases: [
      { name: "Case 1", stdin: "III", expectedStdout: "3" },
      { name: "Case 2", stdin: "LVIII", expectedStdout: "58" },
      { name: "Case 3", stdin: "MCMXCIV", expectedStdout: "1994" }
    ],
    editorial: {
      summary: "Scan left to right, subtracting values when smaller than the next symbol."
    },
    tags: ["math", "string", "easy"]
  },
  {
    number: 14,
    title: "Longest Common Prefix",
    slug: "longest-common-prefix",
    difficulty: "EASY",
    category: "Algorithms",
    acceptance: "42.5%",
    isExempted: false,
    likes: 17800,
    dislikes: 4400,
    topics: ["String", "Trie"],
    companies: ["Amazon", "Google", "Microsoft", "Meta"],
    description: `
<p class="mb-3">Write a function to find the longest common prefix string amongst an array of strings.</p>
<p class="mb-3">If there is no common prefix, return an empty string <code>""</code>.</p>
`,
    inputFormat: "First line: integer <code>n</code>.<br/>Second line: <code>n</code> space-separated strings.",
    outputFormat: "Print the longest common prefix (or empty line if none).",
    examples: [
      { id: 1, stdin: "3\nflower flow flight", stdout: "fl", explanation: "'fl' is common to all three words." },
      { id: 2, stdin: "3\ndog racecar car", stdout: "", explanation: "There is no common prefix among the input strings." }
    ],
    constraints: [
      "1 <= strs.length <= 200",
      "0 <= strs[i].length <= 200",
      "strs[i] consists of only lowercase English letters."
    ],
    hints: [
      "Compare characters column by column across all strings."
    ],
    starterCode: {
      javascript: `const fs = require('fs');

function main() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
  if (!input || input.length < 2) return;
  const n = parseInt(input[0], 10);
  const strs = input.slice(1, 1 + n);

  if (!strs.length) { console.log(''); return; }

  let prefix = strs[0];
  for (let i = 1; i < strs.length; i++) {
    while (strs[i].indexOf(prefix) !== 0) {
      prefix = prefix.substring(0, prefix.length - 1);
      if (!prefix) break;
    }
  }

  console.log(prefix);
}

main();`,
      python: `import sys

def main():
    tokens = sys.stdin.read().split()
    if not tokens:
        return
    n = int(tokens[0])
    strs = tokens[1:1 + n]
    if not strs:
        print("")
        return
    prefix = strs[0]
    for s in strs[1:]:
        while not s.startswith(prefix):
            prefix = prefix[:-1]
            if not prefix:
                break
    print(prefix)

if __name__ == '__main__':
    main()`
    },
    testcases: [
      { name: "Case 1", stdin: "3\nflower flow flight", expectedStdout: "fl" },
      { name: "Case 2", stdin: "3\ndog racecar car", expectedStdout: "" }
    ],
    editorial: {
      summary: "Horizontal or vertical scanning to determine the common prefix."
    },
    tags: ["string", "easy"]
  },
  {
    number: 15,
    title: "3Sum",
    slug: "3sum",
    difficulty: "MEDIUM",
    category: "Algorithms",
    acceptance: "34.2%",
    isExempted: false,
    likes: 29800,
    dislikes: 2700,
    topics: ["Array", "Two Pointers", "Sorting"],
    companies: ["Amazon", "Meta", "Google", "Microsoft", "Apple"],
    description: `
<p class="mb-3">Given an integer array <code>nums</code>, return all the triplets <code>[nums[i], nums[j], nums[k]]</code> such that <code>i != j</code>, <code>i != k</code>, and <code>j != k</code>, and <code>nums[i] + nums[j] + nums[k] == 0</code>.</p>
<p class="mb-3">Notice that the solution set must not contain duplicate triplets.</p>
`,
    inputFormat: "First line: integer <code>n</code>.<br/>Second line: <code>n</code> space-separated integers.",
    outputFormat: "Print the count of unique triplets, followed by each triplet on a new line.",
    examples: [
      { id: 1, stdin: "6\n-1 0 1 2 -1 -4", stdout: "2\n-1 -1 2\n-1 0 1", explanation: "Distinct triplets are [-1, -1, 2] and [-1, 0, 1]." },
      { id: 2, stdin: "3\n0 1 1", stdout: "0", explanation: "No triplet sums up to 0." }
    ],
    constraints: [
      "3 <= nums.length <= 3000",
      "-10^5 <= nums[i] <= 10^5"
    ],
    hints: [
      "Sort the array first to easily avoid duplicate elements and use two pointers."
    ],
    starterCode: {
      javascript: `const fs = require('fs');

function main() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
  if (!tokens || tokens.length < 2) return;
  const n = parseInt(tokens[0], 10);
  const nums = tokens.slice(1, 1 + n).map(Number).sort((a, b) => a - b);

  const res = [];
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let l = i + 1, r = nums.length - 1;
    while (l < r) {
      const sum = nums[i] + nums[l] + nums[r];
      if (sum === 0) {
        res.push(\`\${nums[i]} \${nums[l]} \${nums[r]}\`);
        while (l < r && nums[l] === nums[l + 1]) l++;
        while (l < r && nums[r] === nums[r - 1]) r--;
        l++;
        r--;
      } else if (sum < 0) {
        l++;
      } else {
        r--;
      }
    }
  }

  console.log(res.length + (res.length ? '\\n' + res.join('\\n') : ''));
}

main();`,
      python: `import sys

def main():
    tokens = sys.stdin.read().split()
    if not tokens:
        return
    n = int(tokens[0])
    nums = sorted(list(map(int, tokens[1:1 + n])))
    res = []
    for i in range(len(nums) - 2):
        if i > 0 and nums[i] == nums[i - 1]:
            continue
        l, r = i + 1, len(nums) - 1
        while l < r:
            s = nums[i] + nums[l] + nums[r]
            if s == 0:
                res.append(f"{nums[i]} {nums[l]} {nums[r]}")
                while l < r and nums[l] == nums[l + 1]:
                    l += 1
                while l < r and nums[r] == nums[r - 1]:
                    r -= 1
                l += 1
                r -= 1
            elif s < 0:
                l += 1
            else:
                r -= 1
    print(len(res))
    for t in res:
        print(t)

if __name__ == '__main__':
    main()`
    },
    testcases: [
      { name: "Case 1", stdin: "6\n-1 0 1 2 -1 -4", expectedStdout: "2\n-1 -1 2\n-1 0 1" },
      { name: "Case 2", stdin: "3\n0 1 1", expectedStdout: "0" }
    ],
    editorial: {
      summary: "Sort the array and run Two Pointers for each index in O(n^2) time."
    },
    tags: ["two-pointers", "sorting", "medium"]
  },
  {
    number: 16,
    title: "Valid Parentheses",
    slug: "valid-parentheses",
    difficulty: "EASY",
    category: "Algorithms",
    acceptance: "40.8%",
    isExempted: false,
    likes: 24190,
    dislikes: 1390,
    topics: ["String", "Stack"],
    companies: ["Amazon", "Bloomberg", "Google", "Microsoft"],
    description: `
<p class="mb-3">Given a string <code>s</code> containing just the characters <code>'('</code>, <code>')'</code>, <code>'{'</code>, <code>'}'</code>, <code>'['</code> and <code>']'</code>, determine if the input string is valid.</p>
<p class="mb-3">An input string is valid if brackets close in the correct order with matching types.</p>
`,
    inputFormat: "A single line containing the bracket string <code>s</code>.",
    outputFormat: "Print <code>true</code> if valid, or <code>false</code> otherwise.",
    examples: [
      { id: 1, stdin: "()", stdout: "true", explanation: "Parentheses match." },
      { id: 2, stdin: "()[]{}", stdout: "true", explanation: "All match." },
      { id: 3, stdin: "(]", stdout: "false", explanation: "Mismatched type." }
    ],
    constraints: [
      "1 <= s.length <= 10^4",
      "s consists of parentheses only '()[]{}'."
    ],
    hints: [
      "Use a Stack data structure. Push opening brackets and pop matching closing brackets."
    ],
    starterCode: {
      javascript: `const fs = require('fs');

function main() {
  const s = fs.readFileSync(0, 'utf-8').trim();
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };

  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === '(' || ch === '{' || ch === '[') {
      stack.push(ch);
    } else {
      if (stack.pop() !== map[ch]) {
        console.log('false');
        return;
      }
    }
  }

  console.log(stack.length === 0 ? 'true' : 'false');
}

main();`,
      python: `import sys

def main():
    s = sys.stdin.read().strip()
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}
    for ch in s:
        if ch in mapping.values():
            stack.append(ch)
        elif ch in mapping:
            if not stack or stack.pop() != mapping[ch]:
                print("false")
                return
        else:
            print("false")
            return
    print("true" if not stack else "false")

if __name__ == '__main__':
    main()`
    },
    testcases: [
      { name: "Case 1", stdin: "()", expectedStdout: "true" },
      { name: "Case 2", stdin: "()[]{}", expectedStdout: "true" },
      { name: "Case 3", stdin: "(]", expectedStdout: "false" }
    ],
    editorial: {
      summary: "Linear scan using a stack to verify nested bracket order in O(n) time."
    },
    tags: ["stack", "string", "easy"]
  },
  {
    number: 17,
    title: "Merge Two Sorted Lists",
    slug: "merge-two-sorted-lists",
    difficulty: "EASY",
    category: "Data Structures",
    acceptance: "63.2%",
    isExempted: false,
    likes: 21300,
    dislikes: 1900,
    topics: ["Linked List", "Recursion"],
    companies: ["Amazon", "Apple", "Microsoft", "Google"],
    description: `
<p class="mb-3">You are given the heads of two sorted linked lists <code>list1</code> and <code>list2</code>.</p>
<p class="mb-3">Merge the two lists into one <strong>sorted</strong> list. The list should be made by splicing together the nodes of the first two lists.</p>
`,
    inputFormat: "First line: <code>n</code> followed by <code>n</code> integers.<br/>Second line: <code>m</code> followed by <code>m</code> integers.",
    outputFormat: "Print the merged sorted integers separated by space.",
    examples: [
      { id: 1, stdin: "3 1 2 4\n3 1 3 4", stdout: "1 1 2 3 4 4", explanation: "Merged sorted list." },
      { id: 2, stdin: "0\n0", stdout: "", explanation: "Both lists empty." }
    ],
    constraints: [
      "The number of nodes in both lists is in the range [0, 50].",
      "-100 <= Node.val <= 100",
      "Both list1 and list2 are sorted in non-decreasing order."
    ],
    hints: [
      "Compare the heads of both lists and advance the smaller one."
    ],
    starterCode: {
      javascript: `const fs = require('fs');

function main() {
  const lines = fs.readFileSync(0, 'utf-8').trim().split('\\n');
  if (!lines.length) return;
  const a = (lines[0] || '').trim().split(/\\s+/).slice(1).filter(Boolean).map(Number);
  const b = (lines[1] || '').trim().split(/\\s+/).slice(1).filter(Boolean).map(Number);

  const res = [];
  let i = 0, j = 0;
  while (i < a.length && j < b.length) {
    if (a[i] <= b[j]) res.push(a[i++]);
    else res.push(b[j++]);
  }
  while (i < a.length) res.push(a[i++]);
  while (j < b.length) res.push(b[j++]);

  console.log(res.join(' '));
}

main();`,
      python: `import sys

def main():
    lines = sys.stdin.read().strip().split('\\n')
    a = list(map(int, lines[0].split()[1:])) if len(lines) > 0 and lines[0].strip() else []
    b = list(map(int, lines[1].split()[1:])) if len(lines) > 1 and lines[1].strip() else []
    res = []
    i, j = 0, 0
    while i < len(a) and j < len(b):
        if a[i] <= b[j]:
            res.append(a[i])
            i += 1
        else:
            res.append(b[j])
            j += 1
    res.extend(a[i:])
    res.extend(b[j:])
    print(" ".join(map(str, res)))

if __name__ == '__main__':
    main()`
    },
    testcases: [
      { name: "Case 1", stdin: "3 1 2 4\n3 1 3 4", expectedStdout: "1 1 2 3 4 4" },
      { name: "Case 2", stdin: "0\n0", expectedStdout: "" }
    ],
    editorial: {
      summary: "Merge step identical to merge sort in O(n + m) time."
    },
    tags: ["linked-list", "easy"]
  },
  {
    number: 18,
    title: "Best Time to Buy and Sell Stock",
    slug: "best-time-to-buy-and-sell-stock",
    difficulty: "EASY",
    category: "Algorithms",
    acceptance: "53.6%",
    isExempted: false,
    likes: 31000,
    dislikes: 1100,
    topics: ["Array", "Dynamic Programming"],
    companies: ["Amazon", "Apple", "Microsoft", "Google", "Meta"],
    description: `
<p class="mb-3">You are given an array <code>prices</code> where <code>prices[i]</code> is the price of a given stock on the <code>i<sup>th</sup></code> day.</p>
<p class="mb-3">You want to maximize your profit by choosing a <strong>single day</strong> to buy one stock and choosing a <strong>different day in the future</strong> to sell that stock.</p>
<p class="mb-3">Return <em>the maximum profit you can achieve from this transaction</em>. If you cannot achieve any profit, return <code>0</code>.</p>
`,
    inputFormat: "First line: <code>n</code>.<br/>Second line: <code>n</code> space-separated prices.",
    outputFormat: "Print the maximum possible profit as an integer.",
    examples: [
      { id: 1, stdin: "6\n7 1 5 3 6 4", stdout: "5", explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6 - 1 = 5." },
      { id: 2, stdin: "5\n7 6 4 3 1", stdout: "0", explanation: "In this case, no transactions are done and max profit = 0." }
    ],
    constraints: [
      "1 <= prices.length <= 10^5",
      "0 <= prices[i] <= 10^4"
    ],
    hints: [
      "Keep track of the minimum buying price seen so far as you iterate through the days."
    ],
    starterCode: {
      javascript: `const fs = require('fs');

function main() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
  if (!tokens || tokens.length < 2) return;
  const n = parseInt(tokens[0], 10);
  const prices = tokens.slice(1, 1 + n).map(Number);

  let minPrice = Infinity;
  let maxProfit = 0;

  for (let i = 0; i < prices.length; i++) {
    if (prices[i] < minPrice) {
      minPrice = prices[i];
    } else if (prices[i] - minPrice > maxProfit) {
      maxProfit = prices[i] - minPrice;
    }
  }

  console.log(maxProfit);
}

main();`,
      python: `import sys

def main():
    tokens = sys.stdin.read().split()
    if not tokens:
        return
    n = int(tokens[0])
    prices = list(map(int, tokens[1:1 + n]))
    min_price = float('inf')
    max_profit = 0
    for p in prices:
        if p < min_price:
            min_price = p
        elif p - min_price > max_profit:
            max_profit = p - min_price
    print(max_profit)

if __name__ == '__main__':
    main()`
    },
    testcases: [
      { name: "Case 1", stdin: "6\n7 1 5 3 6 4", expectedStdout: "5" },
      { name: "Case 2", stdin: "5\n7 6 4 3 1", expectedStdout: "0" }
    ],
    editorial: {
      summary: "One-pass algorithm tracking minimum price so far in O(n) time."
    },
    tags: ["array", "dynamic-programming", "easy"]
  },
  {
    number: 19,
    title: "Maximum Subarray",
    slug: "maximum-subarray",
    difficulty: "MEDIUM",
    category: "Algorithms",
    acceptance: "50.4%",
    isExempted: false,
    likes: 33400,
    dislikes: 1390,
    topics: ["Array", "Divide and Conquer", "Dynamic Programming"],
    companies: ["Amazon", "Microsoft", "Apple", "Google", "LinkedIn"],
    description: `
<p class="mb-3">Given an integer array <code>nums</code>, find the subarray with the largest sum, and return <em>its sum</em>.</p>
`,
    inputFormat: "First line: <code>n</code>.<br/>Second line: <code>n</code> space-separated integers.",
    outputFormat: "Print the maximum subarray sum.",
    examples: [
      { id: 1, stdin: "9\n-2 1 -3 4 -1 2 1 -5 4", stdout: "6", explanation: "The subarray [4,-1,2,1] has the largest sum 6." },
      { id: 2, stdin: "1\n1", stdout: "1", explanation: "Subarray [1] has sum 1." },
      { id: 3, stdin: "5\n5 4 -1 7 8", stdout: "23", explanation: "The subarray [5,4,-1,7,8] has the largest sum 23." }
    ],
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4"
    ],
    hints: [
      "Kadane's Algorithm: at each position, decide whether to add to current sum or start fresh."
    ],
    starterCode: {
      javascript: `const fs = require('fs');

function main() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
  if (!tokens || tokens.length < 2) return;
  const n = parseInt(tokens[0], 10);
  const nums = tokens.slice(1, 1 + n).map(Number);

  let currentSum = nums[0];
  let maxSum = nums[0];

  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }

  console.log(maxSum);
}

main();`,
      python: `import sys

def main():
    tokens = sys.stdin.read().split()
    if not tokens:
        return
    n = int(tokens[0])
    nums = list(map(int, tokens[1:1 + n]))
    cur_sum = max_sum = nums[0]
    for x in nums[1:]:
        cur_sum = max(x, cur_sum + x)
        max_sum = max(max_sum, cur_sum)
    print(max_sum)

if __name__ == '__main__':
    main()`
    },
    testcases: [
      { name: "Case 1", stdin: "9\n-2 1 -3 4 -1 2 1 -5 4", expectedStdout: "6" },
      { name: "Case 2", stdin: "1\n1", expectedStdout: "1" },
      { name: "Case 3", stdin: "5\n5 4 -1 7 8", expectedStdout: "23" }
    ],
    editorial: {
      summary: "Kadane's Algorithm computes the maximum subarray sum in O(n) time."
    },
    tags: ["array", "dynamic-programming", "medium"]
  },
  {
    number: 20,
    title: "Trapping Rain Water",
    slug: "trapping-rain-water",
    difficulty: "HARD",
    category: "Algorithms",
    acceptance: "61.2%",
    isExempted: false,
    likes: 31200,
    dislikes: 470,
    topics: ["Array", "Two Pointers", "Dynamic Programming", "Stack"],
    companies: ["Goldman Sachs", "Amazon", "Google", "Meta", "Bloomberg"],
    description: `
<p class="mb-3">Given <code>n</code> non-negative integers representing an elevation map where the width of each bar is <code>1</code>, compute how much water it can trap after raining.</p>
`,
    inputFormat: "First line: <code>n</code>.<br/>Second line: <code>n</code> space-separated integers representing elevation heights.",
    outputFormat: "Print the total trapped water as an integer.",
    examples: [
      { id: 1, stdin: "12\n0 1 0 2 1 0 1 3 2 1 2 1", stdout: "6", explanation: "6 units of rain water are being trapped." },
      { id: 2, stdin: "6\n4 2 0 3 2 5", stdout: "9", explanation: "9 units of rain water are trapped." }
    ],
    constraints: [
      "n == height.length",
      "1 <= n <= 2 * 10^4",
      "0 <= height[i] <= 10^5"
    ],
    hints: [
      "Water above bar i is determined by min(max_left, max_right) - height[i]."
    ],
    starterCode: {
      javascript: `const fs = require('fs');

function main() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
  if (!tokens || tokens.length < 2) return;
  const n = parseInt(tokens[0], 10);
  const height = tokens.slice(1, 1 + n).map(Number);

  let left = 0, right = n - 1;
  let leftMax = 0, rightMax = 0;
  let water = 0;

  while (left < right) {
    if (height[left] < height[right]) {
      if (height[left] >= leftMax) {
        leftMax = height[left];
      } else {
        water += leftMax - height[left];
      }
      left++;
    } else {
      if (height[right] >= rightMax) {
        rightMax = height[right];
      } else {
        water += rightMax - height[right];
      }
      right--;
    }
  }

  console.log(water);
}

main();`,
      python: `import sys

def main():
    tokens = sys.stdin.read().split()
    if not tokens:
        return
    n = int(tokens[0])
    height = list(map(int, tokens[1:1 + n]))
    left, right = 0, n - 1
    left_max, right_max = 0, 0
    water = 0
    while left < right:
        if height[left] < height[right]:
            if height[left] >= left_max:
                left_max = height[left]
            else:
                water += left_max - height[left]
            left += 1
        else:
            if height[right] >= right_max:
                right_max = height[right]
            else:
                water += right_max - height[right]
            right -= 1
    print(water)

if __name__ == '__main__':
    main()`
    },
    testcases: [
      { name: "Case 1", stdin: "12\n0 1 0 2 1 0 1 3 2 1 2 1", expectedStdout: "6" },
      { name: "Case 2", stdin: "6\n4 2 0 3 2 5", expectedStdout: "9" }
    ],
    editorial: {
      summary: "Two-pointer approach traps water inward in O(n) time and O(1) auxiliary space."
    },
    tags: ["two-pointers", "dynamic-programming", "hard"]
  }
];

async function runSeed() {
  console.log(`Starting to seed ${seedQuestions.length} questions into the database...`);

  // Clear existing test cases and questions for clean sync
  console.log('Clearing existing test cases and questions...');
  await db.delete(testCases);
  await db.delete(questions);

  for (const q of seedQuestions) {
    const { testcases, ...questionFields } = q;
    console.log(`Inserting question #${q.number}: ${q.title} (${q.difficulty})...`);

    const [inserted] = await db
      .insert(questions)
      .values({
        ...questionFields,
        likes: q.likes || 0,
        dislikes: q.dislikes || 0,
        timeLimit: 1000,
        memoryLimit: 256,
        isPublished: true,
        testcases: testcases || []
      })
      .returning();

    if (testcases && testcases.length > 0 && inserted?.id) {
      const tcRecords = testcases.map((tc, idx) => ({
        questionId: inserted.id,
        name: tc.name || `Case ${idx + 1}`,
        stdin: tc.stdin || '',
        expectedStdout: tc.expectedStdout || '',
        isHidden: Boolean(tc.isHidden),
        explanation: tc.explanation || null,
        orderIndex: idx
      }));

      await db.insert(testCases).values(tcRecords);
    }
  }

  console.log('✅ Successfully seeded all 20 questions and test cases!');
  process.exit(0);
}

runSeed().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
