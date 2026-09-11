export const problems = [
  {
    id: 1,
    number: 1,
    title: "Two Sum",
    slug: "two-sum",
    difficulty: "Easy",
    category: "Algorithms",
    acceptance: "52.4%",
    likes: 54120,
    dislikes: 1820,
    topics: ["Array", "Hash Table"],
    companies: ["Amazon", "Google", "Apple", "Meta", "Microsoft"],
    description: `
<p class="mb-3">Given an array of integers <code>nums</code> and an integer <code>target</code>, return <em>indices of the two numbers such that they add up to <code>target</code></em>.</p>
<p class="mb-3">You may assume that each input would have <strong>exactly one solution</strong>, and you may not use the same element twice.</p>
<p class="mb-3">You can return the answer in any order.</p>
`,
    examples: [
      {
        id: 1,
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        id: 2,
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        explanation: "Because nums[1] + nums[2] == 6, we return [1, 2]."
      },
      {
        id: 3,
        input: "nums = [3,3], target = 6",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 6, we return [0, 1]."
      }
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists."
    ],
    hints: [
      "A really brute force way would be to search for all possible pairs of numbers but that would be too slow. Can we do better?",
      "Can we use a hash table to check if the complement (target - nums[i]) exists in O(1) time?"
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
};`,
      typescript: `function twoSum(nums: number[], target: number): number[] {
  const map = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement)!, i];
    }
    map.set(nums[i], i);
  }
  return [];
};`,
      python: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        seen = {}
        for i, num in enumerate(nums):
            complement = target - num
            if complement in seen:
                return [seen[complement], i]
            seen[num] = i
        return []`,
      cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> seen;
        for (int i = 0; i < nums.size(); i++) {
            int complement = target - nums[i];
            if (seen.find(complement) != seen.end()) {
                return {seen[complement], i};
            }
            seen[nums[i]] = i;
        }
        return {};
    }
};`,
      java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return new int[] {};
    }
}`
    },
    testcases: [
      {
        id: 1,
        name: "Case 1",
        input: { nums: [2, 7, 11, 15], target: 9 },
        displayInput: "nums = [2,7,11,15]\ntarget = 9",
        expected: "[0,1]"
      },
      {
        id: 2,
        name: "Case 2",
        input: { nums: [3, 2, 4], target: 6 },
        displayInput: "nums = [3,2,4]\ntarget = 6",
        expected: "[1,2]"
      },
      {
        id: 3,
        name: "Case 3",
        input: { nums: [3, 3], target: 6 },
        displayInput: "nums = [3,3]\ntarget = 6",
        expected: "[0,1]"
      }
    ],
    editorial: {
      summary: "Two Sum is best solved using a Hash Table for one-pass linear time complexity.",
      approaches: [
        {
          title: "Approach 1: One-Pass Hash Table",
          timeComplexity: "O(n)",
          spaceComplexity: "O(n)",
          description: "While iterating through the array, we check if `target - nums[i]` exists in our hash table. If it exists, we return its index and the current index. Otherwise, we insert `nums[i]` and its index into the hash map."
        },
        {
          title: "Approach 2: Brute Force",
          timeComplexity: "O(n^2)",
          spaceComplexity: "O(1)",
          description: "Loop through each element `x` and look for another element whose value equals `target - x`."
        }
      ]
    }
  },
  {
    id: 20,
    number: 20,
    title: "Valid Parentheses",
    slug: "valid-parentheses",
    difficulty: "Easy",
    category: "Algorithms",
    acceptance: "40.8%",
    likes: 24190,
    dislikes: 1390,
    topics: ["String", "Stack"],
    companies: ["Amazon", "Bloomberg", "Google", "Microsoft"],
    description: `
<p class="mb-3">Given a string <code>s</code> containing just the characters <code>'('</code>, <code>')'</code>, <code>'{'</code>, <code>'}'</code>, <code>'['</code> and <code>']'</code>, determine if the input string is valid.</p>
<p class="mb-3">An input string is valid if:</p>
<ol class="list-decimal pl-5 mb-3 space-y-1">
  <li>Open brackets must be closed by the same type of brackets.</li>
  <li>Open brackets must be closed in the correct order.</li>
  <li>Every close bracket has a corresponding open bracket of the same type.</li>
</ol>
`,
    examples: [
      {
        id: 1,
        input: 's = "()"',
        output: "true",
        explanation: "The parentheses match correctly."
      },
      {
        id: 2,
        input: 's = "()[]{}"',
        output: "true",
        explanation: "All types of brackets close in the correct order."
      },
      {
        id: 3,
        input: 's = "(]"',
        output: "false",
        explanation: "The round bracket is closed with a square bracket."
      }
    ],
    constraints: [
      "1 <= s.length <= 10^4",
      "s consists of parentheses only '()[]{}'."
    ],
    hints: [
      "An interesting property about a valid parenthesis string is that any sub-expression of valid parentheses must also be valid.",
      "What if you use a stack to push opening brackets and pop them when you encounter matching closing brackets?"
    ],
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };

  for (const char of s) {
    if (char in map) {
      if (stack.length === 0 || stack.pop() !== map[char]) {
        return false;
      }
    } else {
      stack.push(char);
    }
  }

  return stack.length === 0;
};`,
      typescript: `function isValid(s: string): boolean {
  const stack: string[] = [];
  const map: Record<string, string> = { ')': '(', '}': '{', ']': '[' };

  for (const char of s) {
    if (char in map) {
      if (stack.length === 0 || stack.pop() !== map[char]) {
        return false;
      }
    } else {
      stack.push(char);
    }
  }

  return stack.length === 0;
};`,
      python: `class Solution:
    def isValid(self, s: str) -> bool:
        stack = []
        mapping = {')': '(', '}': '{', ']': '['}
        for char in s:
            if char in mapping:
                top = stack.pop() if stack else '#'
                if mapping[char] != top:
                    return False
            else:
                stack.append(char)
        return not stack`,
      cpp: `class Solution {
public:
    bool isValid(string s) {
        stack<char> st;
        unordered_map<char, char> map = {{')', '('}, {'}', '{'}, {']', '['}};
        for (char c : s) {
            if (map.count(c)) {
                if (st.empty() || st.top() != map[c]) return false;
                st.pop();
            } else {
                st.push(c);
            }
        }
        return st.empty();
    }
};`,
      java: `class Solution {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        for (char c : s.toCharArray()) {
            if (c == '(') stack.push(')');
            else if (c == '{') stack.push('}');
            else if (c == '[') stack.push(']');
            else if (stack.isEmpty() || stack.pop() != c) return false;
        }
        return stack.isEmpty();
    }
}`
    },
    testcases: [
      {
        id: 1,
        name: "Case 1",
        input: { s: "()" },
        displayInput: 's = "()"',
        expected: "true"
      },
      {
        id: 2,
        name: "Case 2",
        input: { s: "()[]{}" },
        displayInput: 's = "()[]{}"',
        expected: "true"
      },
      {
        id: 3,
        name: "Case 3",
        input: { s: "(]" },
        displayInput: 's = "(]"',
        expected: "false"
      }
    ],
    editorial: {
      summary: "Use a LIFO Stack data structure to match open and closed parentheses.",
      approaches: [
        {
          title: "Approach 1: Stack",
          timeComplexity: "O(n)",
          spaceComplexity: "O(n)",
          description: "Traverse the string character by character. Push opening brackets to the stack, and pop when matching closing brackets occur."
        }
      ]
    }
  },
  {
    id: 3,
    number: 3,
    title: "Longest Substring Without Repeating Characters",
    slug: "longest-substring-without-repeating-characters",
    difficulty: "Medium",
    category: "Algorithms",
    acceptance: "34.5%",
    likes: 38240,
    dislikes: 1720,
    topics: ["Hash Table", "String", "Sliding Window"],
    companies: ["Amazon", "Microsoft", "Facebook", "Apple", "Google"],
    description: `
<p class="mb-3">Given a string <code>s</code>, find the length of the <strong>longest substring</strong> without repeating characters.</p>
`,
    examples: [
      {
        id: 1,
        input: 's = "abcabcbb"',
        output: "3",
        explanation: 'The answer is "abc", with the length of 3.'
      },
      {
        id: 2,
        input: 's = "bbbbb"',
        output: "1",
        explanation: 'The answer is "b", with the length of 1.'
      },
      {
        id: 3,
        input: 's = "pwwkew"',
        output: "3",
        explanation: 'The answer is "wke", with the length of 3. Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.'
      }
    ],
    constraints: [
      "0 <= s.length <= 5 * 10^4",
      "s consists of English letters, digits, symbols and spaces."
    ],
    hints: [
      "Check every substring one by one with a sliding window approach.",
      "Use a hash map to keep track of the most recent index of each character to skip duplicates immediately."
    ],
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  let maxLength = 0;
  let left = 0;
  const map = new Map();

  for (let right = 0; right < s.length; right++) {
    if (map.has(s[right])) {
      left = Math.max(left, map.get(s[right]) + 1);
    }
    map.set(s[right], right);
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
};`,
      typescript: `function lengthOfLongestSubstring(s: string): number {
  let maxLength = 0;
  let left = 0;
  const map = new Map<string, number>();

  for (let right = 0; right < s.length; right++) {
    if (map.has(s[right])) {
      left = Math.max(left, map.get(s[right])! + 1);
    }
    map.set(s[right], right);
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
};`,
      python: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        char_map = {}
        left = 0
        max_len = 0
        for right, char in enumerate(s):
            if char in char_map:
                left = max(left, char_map[char] + 1)
            char_map[char] = right
            max_len = max(max_len, right - left + 1)
        return max_len`,
      cpp: `class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        unordered_map<char, int> map;
        int left = 0, maxLen = 0;
        for (int right = 0; right < s.size(); right++) {
            if (map.count(s[right])) {
                left = max(left, map[s[right]] + 1);
            }
            map[s[right]] = right;
            maxLen = max(maxLen, right - left + 1);
        }
        return maxLen;
    }
};`,
      java: `class Solution {
    public int lengthOfLongestSubstring(String s) {
        Map<Character, Integer> map = new HashMap<>();
        int left = 0, maxLen = 0;
        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            if (map.containsKey(c)) {
                left = Math.max(left, map.get(c) + 1);
            }
            map.put(c, right);
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }
}`
    },
    testcases: [
      {
        id: 1,
        name: "Case 1",
        input: { s: "abcabcbb" },
        displayInput: 's = "abcabcbb"',
        expected: "3"
      },
      {
        id: 2,
        name: "Case 2",
        input: { s: "bbbbb" },
        displayInput: 's = "bbbbb"',
        expected: "1"
      },
      {
        id: 3,
        name: "Case 3",
        input: { s: "pwwkew" },
        displayInput: 's = "pwwkew"',
        expected: "3"
      }
    ],
    editorial: {
      summary: "Sliding Window approach maintains a dynamic substring with unique characters.",
      approaches: [
        {
          title: "Approach: Sliding Window with Hash Map",
          timeComplexity: "O(n)",
          spaceComplexity: "O(min(m, n))",
          description: "Use two pointers `left` and `right`. Maintain the most recent occurrence index for each character."
        }
      ]
    }
  },
  {
    id: 206,
    number: 206,
    title: "Reverse Linked List",
    slug: "reverse-linked-list",
    difficulty: "Easy",
    category: "Algorithms",
    acceptance: "75.1%",
    likes: 21540,
    dislikes: 410,
    topics: ["Linked List", "Recursion"],
    companies: ["Amazon", "Apple", "Microsoft", "Bloomberg"],
    description: `
<p class="mb-3">Given the <code>head</code> of a singly linked list, reverse the list, and return <em>the reversed list</em>.</p>
`,
    examples: [
      {
        id: 1,
        input: "head = [1,2,3,4,5]",
        output: "[5,4,3,2,1]",
        explanation: "The list is completely reversed."
      },
      {
        id: 2,
        input: "head = [1,2]",
        output: "[2,1]",
        explanation: "Reversing a 2-node list."
      },
      {
        id: 3,
        input: "head = []",
        output: "[]",
        explanation: "Empty list remains empty."
      }
    ],
    constraints: [
      "The number of nodes in the list is the range [0, 5000].",
      "-5000 <= Node.val <= 5000"
    ],
    hints: [
      "A linked list can be reversed either iteratively or recursively. Could you implement both?",
      "Keep track of previous, current, and next pointers during the iteration."
    ],
    starterCode: {
      javascript: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
  let prev = null;
  let curr = head;

  while (curr !== null) {
    const nextTemp = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nextTemp;
  }

  return prev;
};`,
      typescript: `class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val===undefined ? 0 : val);
    this.next = (next===undefined ? null : next);
  }
}

function reverseList(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null;
  let curr: ListNode | null = head;

  while (curr !== null) {
    const nextTemp: ListNode | null = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nextTemp;
  }

  return prev;
};`,
      python: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        prev = None
        curr = head
        while curr:
            next_node = curr.next
            curr.next = prev
            prev = curr
            curr = next_node
        return prev`,
      cpp: `class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        ListNode* prev = nullptr;
        ListNode* curr = head;
        while (curr != nullptr) {
            ListNode* nextTemp = curr->next;
            curr->next = prev;
            prev = curr;
            curr = nextTemp;
        }
        return prev;
    }
};`,
      java: `class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;
        while (curr != null) {
            ListNode nextTemp = curr.next;
            curr.next = prev;
            prev = curr;
            curr = nextTemp;
        }
        return prev;
    }
}`
    },
    testcases: [
      {
        id: 1,
        name: "Case 1",
        input: { head: [1, 2, 3, 4, 5] },
        displayInput: "head = [1,2,3,4,5]",
        expected: "[5,4,3,2,1]"
      },
      {
        id: 2,
        name: "Case 2",
        input: { head: [1, 2] },
        displayInput: "head = [1,2]",
        expected: "[2,1]"
      },
      {
        id: 3,
        name: "Case 3",
        input: { head: [] },
        displayInput: "head = []",
        expected: "[]"
      }
    ],
    editorial: {
      summary: "Iterative pointer reversal in O(n) time and O(1) space.",
      approaches: [
        {
          title: "Iterative Approach",
          timeComplexity: "O(n)",
          spaceComplexity: "O(1)",
          description: "Initialize prev to null. Loop through each node, pointing curr.next to prev, then moving pointers ahead."
        }
      ]
    }
  },
  {
    id: 121,
    number: 121,
    title: "Best Time to Buy and Sell Stock",
    slug: "best-time-to-buy-and-sell-stock",
    difficulty: "Easy",
    category: "Algorithms",
    acceptance: "53.8%",
    likes: 31200,
    dislikes: 1150,
    topics: ["Array", "Dynamic Programming"],
    companies: ["Amazon", "Microsoft", "Apple", "Google", "Meta"],
    description: `
<p class="mb-3">You are given an array <code>prices</code> where <code>prices[i]</code> is the price of a given stock on the <code>i<sup>th</sup></code> day.</p>
<p class="mb-3">You want to maximize your profit by choosing a <strong>single day</strong> to buy one stock and choosing a <strong>different day in the future</strong> to sell that stock.</p>
<p class="mb-3">Return <em>the maximum profit you can achieve from this transaction</em>. If you cannot achieve any profit, return <code>0</code>.</p>
`,
    examples: [
      {
        id: 1,
        input: "prices = [7,1,5,3,6,4]",
        output: "5",
        explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5. Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell."
      },
      {
        id: 2,
        input: "prices = [7,6,4,3,1]",
        output: "0",
        explanation: "In this case, no transactions are done and the max profit = 0."
      }
    ],
    constraints: [
      "1 <= prices.length <= 10^5",
      "0 <= prices[i] <= 10^4"
    ],
    hints: [
      "Track the minimum buying price seen so far and the maximum profit obtainable if sold today.",
      "A single pass can keep updating minPrice and maxProfit in O(n) time."
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  let minPrice = Infinity;
  let maxProfit = 0;
  for (let i = 0; i < prices.length; i++) {
    if (prices[i] < minPrice) {
      minPrice = prices[i];
    } else if (prices[i] - minPrice > maxProfit) {
      maxProfit = prices[i] - minPrice;
    }
  }
  return maxProfit;
};`,
      typescript: `function maxProfit(prices: number[]): number {
  let minPrice = Infinity;
  let maxProfit = 0;
  for (const price of prices) {
    minPrice = Math.min(minPrice, price);
    maxProfit = Math.max(maxProfit, price - minPrice);
  }
  return maxProfit;
};`,
      python: `class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        min_price = float('inf')
        max_profit = 0
        for price in prices:
            min_price = min(min_price, price)
            max_profit = max(max_profit, price - min_price)
        return max_profit`,
      cpp: `class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int minPrice = INT_MAX;
        int maxProfit = 0;
        for (int p : prices) {
            minPrice = min(minPrice, p);
            maxProfit = max(maxProfit, p - minPrice);
        }
        return maxProfit;
    }
};`,
      java: `class Solution {
    public int maxProfit(int[] prices) {
        int minPrice = Integer.MAX_VALUE;
        int maxProfit = 0;
        for (int price : prices) {
            if (price < minPrice) minPrice = price;
            else if (price - minPrice > maxProfit) maxProfit = price - minPrice;
        }
        return maxProfit;
    }
}`
    },
    testcases: [
      {
        id: 1,
        name: "Case 1",
        input: { prices: [7, 1, 5, 3, 6, 4] },
        displayInput: "prices = [7,1,5,3,6,4]",
        expected: "5"
      },
      {
        id: 2,
        name: "Case 2",
        input: { prices: [7, 6, 4, 3, 1] },
        displayInput: "prices = [7,6,4,3,1]",
        expected: "0"
      }
    ],
    editorial: {
      summary: "One-pass greedy approach tracking minimum purchase price.",
      approaches: [
        {
          title: "One Pass Greedy",
          timeComplexity: "O(n)",
          spaceComplexity: "O(1)",
          description: "Iterate through prices keeping track of the minimum price encountered so far. At each step, compute current profit and maximize."
        }
      ]
    }
  },
  {
    id: 15,
    number: 15,
    title: "3Sum",
    slug: "3sum",
    difficulty: "Medium",
    category: "Algorithms",
    acceptance: "34.5%",
    likes: 29500,
    dislikes: 2710,
    topics: ["Array", "Two Pointers", "Sorting"],
    companies: ["Amazon", "Meta", "Google", "Microsoft", "Apple"],
    description: `
<p class="mb-3">Given an integer array <code>nums</code>, return all the triplets <code>[nums[i], nums[j], nums[k]]</code> such that <code>i != j</code>, <code>i != k</code>, and <code>j != k</code>, and <code>nums[i] + nums[j] + nums[k] == 0</code>.</p>
<p class="mb-3">Notice that the solution set must not contain duplicate triplets.</p>
`,
    examples: [
      {
        id: 1,
        input: "nums = [-1,0,1,2,-1,-4]",
        output: "[[-1,-1,2],[-1,0,1]]",
        explanation: "nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0. nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0. Distinct triplets are [-1,0,1] and [-1,-1,2]."
      },
      {
        id: 2,
        input: "nums = [0,1,1]",
        output: "[]",
        explanation: "The only possible triplet does not sum up to 0."
      },
      {
        id: 3,
        input: "nums = [0,0,0]",
        output: "[[0,0,0]]",
        explanation: "The only possible triplet sums up to 0."
      }
    ],
    constraints: [
      "3 <= nums.length <= 3000",
      "-10^5 <= nums[i] <= 10^5"
    ],
    hints: [
      "So, we need nums[i] + nums[j] + nums[k] == 0. If we sort the array, can we fix nums[i] and use two pointers for j and k?",
      "To avoid duplicates, skip identical values when moving i, j, and k."
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
  nums.sort((a, b) => a - b);
  const result = [];
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let left = i + 1;
    let right = nums.length - 1;
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);
        while (left < right && nums[left] === nums[left + 1]) left++;
        while (left < right && nums[right] === nums[right - 1]) right--;
        left++;
        right--;
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }
  return result;
};`,
      typescript: `function threeSum(nums: number[]): number[][] {
  nums.sort((a, b) => a - b);
  const res: number[][] = [];
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let l = i + 1, r = nums.length - 1;
    while (l < r) {
      const sum = nums[i] + nums[l] + nums[r];
      if (sum === 0) {
        res.push([nums[i], nums[l], nums[r]]);
        while (l < r && nums[l] === nums[l + 1]) l++;
        while (l < r && nums[r] === nums[r - 1]) r--;
        l++; r--;
      } else if (sum < 0) l++;
      else r--;
    }
  }
  return res;
};`,
      python: `class Solution:
    def threeSum(self, nums: List[int]) -> List[List[int]]:
        nums.sort()
        res = []
        for i in range(len(nums) - 2):
            if i > 0 and nums[i] == nums[i - 1]:
                continue
            l, r = i + 1, len(nums) - 1
            while l < r:
                s = nums[i] + nums[l] + nums[r]
                if s == 0:
                    res.append([nums[i], nums[l], nums[r]])
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
        return res`,
      cpp: `class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        vector<vector<int>> res;
        for (int i = 0; i < (int)nums.size() - 2; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            int l = i + 1, r = nums.size() - 1;
            while (l < r) {
                int sum = nums[i] + nums[l] + nums[r];
                if (sum == 0) {
                    res.push_back({nums[i], nums[l], nums[r]});
                    while (l < r && nums[l] == nums[l + 1]) l++;
                    while (l < r && nums[r] == nums[r - 1]) r--;
                    l++; r--;
                } else if (sum < 0) l++;
                else r--;
            }
        }
        return res;
    }
};`,
      java: `class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        Arrays.sort(nums);
        List<List<Integer>> res = new ArrayList<>();
        for (int i = 0; i < nums.length - 2; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            int l = i + 1, r = nums.length - 1;
            while (l < r) {
                int sum = nums[i] + nums[l] + nums[r];
                if (sum == 0) {
                    res.add(Arrays.asList(nums[i], nums[l], nums[r]));
                    while (l < r && nums[l] == nums[l + 1]) l++;
                    while (l < r && nums[r] == nums[r - 1]) r--;
                    l++; r--;
                } else if (sum < 0) l++;
                else r--;
            }
        }
        return res;
    }
}`
    },
    testcases: [
      {
        id: 1,
        name: "Case 1",
        input: { nums: [-1, 0, 1, 2, -1, -4] },
        displayInput: "nums = [-1,0,1,2,-1,-4]",
        expected: "[[-1,-1,2],[-1,0,1]]"
      },
      {
        id: 2,
        name: "Case 2",
        input: { nums: [0, 1, 1] },
        displayInput: "nums = [0,1,1]",
        expected: "[]"
      },
      {
        id: 3,
        name: "Case 3",
        input: { nums: [0, 0, 0] },
        displayInput: "nums = [0,0,0]",
        expected: "[[0,0,0]]"
      }
    ],
    editorial: {
      summary: "Sort the array and use Two Pointers to find complementary pairs in O(n^2) time.",
      approaches: [
        {
          title: "Sort + Two Pointers",
          timeComplexity: "O(n^2)",
          spaceComplexity: "O(1) extra space",
          description: "Sorting takes O(n log n). Fixing one number gives a target sum for two numbers, solvable in O(n) with two pointers."
        }
      ]
    }
  },
  {
    id: 11,
    number: 11,
    title: "Container With Most Water",
    slug: "container-with-most-water",
    difficulty: "Medium",
    category: "Algorithms",
    acceptance: "54.9%",
    likes: 27800,
    dislikes: 1610,
    topics: ["Array", "Two Pointers", "Greedy"],
    companies: ["Amazon", "Google", "Apple", "Meta"],
    description: `
<p class="mb-3">You are given an integer array <code>height</code> of length <code>n</code>. There are <code>n</code> vertical lines drawn such that the two endpoints of the <code>i<sup>th</sup></code> line are <code>(i, 0)</code> and <code>(i, height[i])</code>.</p>
<p class="mb-3">Find two lines that together with the x-axis form a container, such that the container contains the most water.</p>
<p class="mb-3">Return <em>the maximum amount of water a container can store</em>.</p>
<p class="text-xs text-slate-500">Notice that you may not slant the container.</p>
`,
    examples: [
      {
        id: 1,
        input: "height = [1,8,6,2,5,4,8,3,7]",
        output: "49",
        explanation: "The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water the container can contain is 49."
      },
      {
        id: 2,
        input: "height = [1,1]",
        output: "1",
        explanation: "The max area between index 0 and 1 is 1 * 1 = 1."
      }
    ],
    constraints: [
      "n == height.length",
      "2 <= n <= 10^5",
      "0 <= height[i] <= 10^4"
    ],
    hints: [
      "Start with the widest container using two pointers at the ends.",
      "Always move the pointer pointing to the shorter line inward."
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
  let maxWater = 0;
  let left = 0;
  let right = height.length - 1;
  while (left < right) {
    const width = right - left;
    const currentHeight = Math.min(height[left], height[right]);
    maxWater = Math.max(maxWater, width * currentHeight);
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }
  return maxWater;
};`,
      typescript: `function maxArea(height: number[]): number {
  let max = 0, l = 0, r = height.length - 1;
  while (l < r) {
    max = Math.max(max, (r - l) * Math.min(height[l], height[r]));
    if (height[l] < height[r]) l++;
    else r--;
  }
  return max;
};`,
      python: `class Solution:
    def maxArea(self, height: List[int]) -> int:
        l, r = 0, len(height) - 1
        max_area = 0
        while l < r:
            max_area = max(max_area, (r - l) * min(height[l], height[r]))
            if height[l] < height[r]:
                l += 1
            else:
                r -= 1
        return max_area`,
      cpp: `class Solution {
public:
    int maxArea(vector<int>& height) {
        int l = 0, r = height.size() - 1, maxArea = 0;
        while (l < r) {
            maxArea = max(maxArea, (r - l) * min(height[l], height[r]));
            if (height[l] < height[r]) l++;
            else r--;
        }
        return maxArea;
    }
};`,
      java: `class Solution {
    public int maxArea(int[] height) {
        int l = 0, r = height.length - 1, max = 0;
        while (l < r) {
            max = Math.max(max, (r - l) * Math.min(height[l], height[r]));
            if (height[l] < height[r]) l++;
            else r--;
        }
        return max;
    }
}`
    },
    testcases: [
      {
        id: 1,
        name: "Case 1",
        input: { height: [1, 8, 6, 2, 5, 4, 8, 3, 7] },
        displayInput: "height = [1,8,6,2,5,4,8,3,7]",
        expected: "49"
      },
      {
        id: 2,
        name: "Case 2",
        input: { height: [1, 1] },
        displayInput: "height = [1,1]",
        expected: "1"
      }
    ],
    editorial: {
      summary: "Two Pointers starting at extremities, moving the shorter edge inward.",
      approaches: [
        {
          title: "Two Pointers",
          timeComplexity: "O(n)",
          spaceComplexity: "O(1)",
          description: "Since width decreases with every step, the only chance of finding a bigger area is by discovering a taller line."
        }
      ]
    }
  },
  {
    id: 53,
    number: 53,
    title: "Maximum Subarray",
    slug: "maximum-subarray",
    difficulty: "Medium",
    category: "Algorithms",
    acceptance: "50.6%",
    likes: 33400,
    dislikes: 1410,
    topics: ["Array", "Divide and Conquer", "Dynamic Programming"],
    companies: ["Amazon", "Microsoft", "Apple", "Google", "Bloomberg"],
    description: `
<p class="mb-3">Given an integer array <code>nums</code>, find the subarray with the largest sum, and return <em>its sum</em>.</p>
`,
    examples: [
      {
        id: 1,
        input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        output: "6",
        explanation: "The subarray [4,-1,2,1] has the largest sum 6."
      },
      {
        id: 2,
        input: "nums = [1]",
        output: "1",
        explanation: "The subarray [1] has the largest sum 1."
      },
      {
        id: 3,
        input: "nums = [5,4,-1,7,8]",
        output: "23",
        explanation: "The subarray [5,4,-1,7,8] has the largest sum 23."
      }
    ],
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4"
    ],
    hints: [
      "Kadane's Algorithm: at each index, decide whether to add nums[i] to current sum or start fresh at nums[i]."
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
  let currentSum = nums[0];
  let maxSum = nums[0];
  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }
  return maxSum;
};`,
      typescript: `function maxSubArray(nums: number[]): number {
  let cur = nums[0], max = nums[0];
  for (let i = 1; i < nums.length; i++) {
    cur = Math.max(nums[i], cur + nums[i]);
    max = Math.max(max, cur);
  }
  return max;
};`,
      python: `class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        cur_sum = max_sum = nums[0]
        for num in nums[1:]:
            cur_sum = max(num, cur_sum + num)
            max_sum = max(max_sum, cur_sum)
        return max_sum`,
      cpp: `class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int cur = nums[0], res = nums[0];
        for (size_t i = 1; i < nums.size(); ++i) {
            cur = max(nums[i], cur + nums[i]);
            res = max(res, cur);
        }
        return res;
    }
};`,
      java: `class Solution {
    public int maxSubArray(int[] nums) {
        int cur = nums[0], max = nums[0];
        for (int i = 1; i < nums.length; i++) {
            cur = Math.max(nums[i], cur + nums[i]);
            max = Math.max(max, cur);
        }
        return max;
    }
}`
    },
    testcases: [
      {
        id: 1,
        name: "Case 1",
        input: { nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4] },
        displayInput: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        expected: "6"
      },
      {
        id: 2,
        name: "Case 2",
        input: { nums: [1] },
        displayInput: "nums = [1]",
        expected: "1"
      },
      {
        id: 3,
        name: "Case 3",
        input: { nums: [5, 4, -1, 7, 8] },
        displayInput: "nums = [5,4,-1,7,8]",
        expected: "23"
      }
    ],
    editorial: {
      summary: "Kadane's Algorithm runs in linear O(n) time and O(1) space.",
      approaches: [
        {
          title: "Kadane's Algorithm",
          timeComplexity: "O(n)",
          spaceComplexity: "O(1)",
          description: "Keep tracking the maximum subarray ending at the current index. If current sum becomes negative, it's better to restart."
        }
      ]
    }
  },
  {
    id: 704,
    number: 704,
    title: "Binary Search",
    slug: "binary-search",
    difficulty: "Easy",
    category: "Algorithms",
    acceptance: "57.4%",
    likes: 11400,
    dislikes: 230,
    topics: ["Array", "Binary Search"],
    companies: ["Google", "Amazon", "Microsoft", "Apple"],
    description: `
<p class="mb-3">Given an array of integers <code>nums</code> which is sorted in ascending order, and an integer <code>target</code>, write a function to search <code>target</code> in <code>nums</code>. If <code>target</code> exists, then return its index. Otherwise, return <code>-1</code>.</p>
<p class="mb-3">You must write an algorithm with <code>O(log n)</code> runtime complexity.</p>
`,
    examples: [
      {
        id: 1,
        input: "nums = [-1,0,3,5,9,12], target = 9",
        output: "4",
        explanation: "9 exists in nums and its index is 4."
      },
      {
        id: 2,
        input: "nums = [-1,0,3,5,9,12], target = 2",
        output: "-1",
        explanation: "2 does not exist in nums so return -1."
      }
    ],
    constraints: [
      "1 <= nums.length <= 10^4",
      "-10^4 < nums[i], target < 10^4",
      "All the integers in nums are unique.",
      "nums is sorted in ascending order."
    ],
    hints: [
      "Use low and high pointers, checking mid at each step."
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
  let low = 0;
  let high = nums.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (nums[mid] === target) return mid;
    else if (nums[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
};`,
      typescript: `function search(nums: number[], target: number): number {
  let l = 0, r = nums.length - 1;
  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) l = mid + 1;
    else r = mid - 1;
  }
  return -1;
};`,
      python: `class Solution:
    def search(self, nums: List[int], target: int) -> int:
        l, r = 0, len(nums) - 1
        while l <= r:
            mid = (l + r) // 2
            if nums[mid] == target:
                return mid
            elif nums[mid] < target:
                l = mid + 1
            else:
                r = mid - 1
        return -1`,
      cpp: `class Solution {
public:
    int search(vector<int>& nums, int target) {
        int l = 0, r = nums.size() - 1;
        while (l <= r) {
            int mid = l + (r - l) / 2;
            if (nums[mid] == target) return mid;
            if (nums[mid] < target) l = mid + 1;
            else r = mid - 1;
        }
        return -1;
    }
};`,
      java: `class Solution {
    public int search(int[] nums, int target) {
        int l = 0, r = nums.length - 1;
        while (l <= r) {
            int mid = l + (r - l) / 2;
            if (nums[mid] == target) return mid;
            if (nums[mid] < target) l = mid + 1;
            else r = mid - 1;
        }
        return -1;
    }
}`
    },
    testcases: [
      {
        id: 1,
        name: "Case 1",
        input: { nums: [-1, 0, 3, 5, 9, 12], target: 9 },
        displayInput: "nums = [-1,0,3,5,9,12]\ntarget = 9",
        expected: "4"
      },
      {
        id: 2,
        name: "Case 2",
        input: { nums: [-1, 0, 3, 5, 9, 12], target: 2 },
        displayInput: "nums = [-1,0,3,5,9,12]\ntarget = 2",
        expected: "-1"
      }
    ],
    editorial: {
      summary: "Standard binary search dividing search space in half each iteration.",
      approaches: [
        {
          title: "Iterative Binary Search",
          timeComplexity: "O(log n)",
          spaceComplexity: "O(1)",
          description: "Maintain left and right boundaries, probe the midpoint, and halve the range based on comparison."
        }
      ]
    }
  },
  {
    id: 21,
    number: 21,
    title: "Merge Two Sorted Lists",
    slug: "merge-two-sorted-lists",
    difficulty: "Easy",
    category: "Algorithms",
    acceptance: "64.1%",
    likes: 22000,
    dislikes: 1980,
    topics: ["Linked List", "Recursion"],
    companies: ["Amazon", "Microsoft", "Apple", "Google"],
    description: `
<p class="mb-3">You are given the heads of two sorted linked lists <code>list1</code> and <code>list2</code>.</p>
<p class="mb-3">Merge the two lists into one <strong>sorted</strong> list. The list should be made by splicing together the nodes of the first two lists.</p>
<p class="mb-3">Return <em>the head of the merged linked list</em>.</p>
`,
    examples: [
      {
        id: 1,
        input: "list1 = [1,2,4], list2 = [1,3,4]",
        output: "[1,1,2,3,4,4]",
        explanation: "Merged result contains all elements in non-decreasing order."
      },
      {
        id: 2,
        input: "list1 = [], list2 = []",
        output: "[]",
        explanation: "Both lists are empty."
      },
      {
        id: 3,
        input: "list1 = [], list2 = [0]",
        output: "[0]",
        explanation: "List 1 is empty, returning list 2."
      }
    ],
    constraints: [
      "The number of nodes in both lists is in the range [0, 50].",
      "-100 <= Node.val <= 100",
      "Both list1 and list2 are sorted in non-decreasing order."
    ],
    hints: [
      "Create a dummy head node and attach the smaller value at each step."
    ],
    starterCode: {
      javascript: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function(list1, list2) {
  const dummy = { val: -1, next: null };
  let current = dummy;
  while (list1 && list2) {
    if (list1.val <= list2.val) {
      current.next = list1;
      list1 = list1.next;
    } else {
      current.next = list2;
      list2 = list2.next;
    }
    current = current.next;
  }
  current.next = list1 || list2;
  return dummy.next;
};`,
      typescript: `function mergeTwoLists(list1: any, list2: any): any {
  const dummy: any = { val: -1, next: null };
  let cur = dummy;
  while (list1 && list2) {
    if (list1.val <= list2.val) {
      cur.next = list1;
      list1 = list1.next;
    } else {
      cur.next = list2;
      list2 = list2.next;
    }
    cur = cur.next;
  }
  cur.next = list1 || list2;
  return dummy.next;
};`,
      python: `class Solution:
    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
        dummy = ListNode(-1)
        cur = dummy
        while list1 and list2:
            if list1.val <= list2.val:
                cur.next = list1
                list1 = list1.next
            else:
                cur.next = list2
                list2 = list2.next
            cur = cur.next
        cur.next = list1 or list2
        return dummy.next`,
      cpp: `class Solution {
public:
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        ListNode dummy(-1);
        ListNode* cur = &dummy;
        while (list1 && list2) {
            if (list1->val <= list2->val) {
                cur->next = list1;
                list1 = list1->next;
            } else {
                cur->next = list2;
                list2 = list2->next;
            }
            cur = cur->next;
        }
        cur->next = list1 ? list1 : list2;
        return dummy.next;
    }
};`,
      java: `class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        ListNode dummy = new ListNode(-1);
        ListNode cur = dummy;
        while (list1 != null && list2 != null) {
            if (list1.val <= list2.val) {
                cur.next = list1;
                list1 = list1.next;
            } else {
                cur.next = list2;
                list2 = list2.next;
            }
            cur = cur.next;
        }
        cur.next = list1 != null ? list1 : list2;
        return dummy.next;
    }
}`
    },
    testcases: [
      {
        id: 1,
        name: "Case 1",
        input: { list1: [1, 2, 4], list2: [1, 3, 4] },
        displayInput: "list1 = [1,2,4]\nlist2 = [1,3,4]",
        expected: "[1,1,2,3,4,4]"
      },
      {
        id: 2,
        name: "Case 2",
        input: { list1: [], list2: [] },
        displayInput: "list1 = []\nlist2 = []",
        expected: "[]"
      }
    ],
    editorial: {
      summary: "Iterative merge using a dummy sentinel node.",
      approaches: [
        {
          title: "Dummy Sentinel Pointer",
          timeComplexity: "O(n + m)",
          spaceComplexity: "O(1)",
          description: "Compare heads of both lists and advance the pointer for whichever is smaller, appending remaining items at the end."
        }
      ]
    }
  },
  {
    id: 42,
    number: 42,
    title: "Trapping Rain Water",
    slug: "trapping-rain-water",
    difficulty: "Hard",
    category: "Algorithms",
    acceptance: "61.3%",
    likes: 31000,
    dislikes: 460,
    topics: ["Array", "Two Pointers", "Dynamic Programming", "Stack"],
    companies: ["Amazon", "Goldman Sachs", "Google", "Bloomberg", "Meta"],
    description: `
<p class="mb-3">Given <code>n</code> non-negative integers representing an elevation map where the width of each bar is <code>1</code>, compute how much water it can trap after raining.</p>
`,
    examples: [
      {
        id: 1,
        input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]",
        output: "6",
        explanation: "The elevation map [0,1,0,2,1,0,1,3,2,1,2,1] traps 6 units of rain water."
      },
      {
        id: 2,
        input: "height = [4,2,0,3,2,5]",
        output: "9",
        explanation: "The elevation map [4,2,0,3,2,5] traps 9 units of rain water."
      }
    ],
    constraints: [
      "n == height.length",
      "1 <= n <= 2 * 10^4",
      "0 <= height[i] <= 10^5"
    ],
    hints: [
      "For each bar, the water trapped depends on min(max_left, max_right) - height[i].",
      "Can we optimize using Two Pointers from both ends?"
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
  let left = 0, right = height.length - 1;
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
  return water;
};`,
      typescript: `function trap(height: number[]): number {
  let l = 0, r = height.length - 1, lMax = 0, rMax = 0, ans = 0;
  while (l < r) {
    if (height[l] < height[r]) {
      if (height[l] >= lMax) lMax = height[l];
      else ans += lMax - height[l];
      l++;
    } else {
      if (height[r] >= rMax) rMax = height[r];
      else ans += rMax - height[r];
      r--;
    }
  }
  return ans;
};`,
      python: `class Solution:
    def trap(self, height: List[int]) -> int:
        l, r = 0, len(height) - 1
        l_max, r_max = 0, 0
        ans = 0
        while l < r:
            if height[l] < height[r]:
                if height[l] >= l_max:
                    l_max = height[l]
                else:
                    ans += l_max - height[l]
                l += 1
            else:
                if height[r] >= r_max:
                    r_max = height[r]
                else:
                    ans += r_max - height[r]
                r -= 1
        return ans`,
      cpp: `class Solution {
public:
    int trap(vector<int>& height) {
        int l = 0, r = height.size() - 1;
        int lMax = 0, rMax = 0, total = 0;
        while (l < r) {
            if (height[l] < height[r]) {
                if (height[l] >= lMax) lMax = height[l];
                else total += lMax - height[l];
                l++;
            } else {
                if (height[r] >= rMax) rMax = height[r];
                else total += rMax - height[r];
                r--;
            }
        }
        return total;
    }
};`,
      java: `class Solution {
    public int trap(int[] height) {
        int l = 0, r = height.length - 1;
        int lMax = 0, rMax = 0, water = 0;
        while (l < r) {
            if (height[l] < height[r]) {
                if (height[l] >= lMax) lMax = height[l];
                else water += lMax - height[l];
                l++;
            } else {
                if (height[r] >= rMax) rMax = height[r];
                else water += rMax - height[r];
                r--;
            }
        }
        return water;
    }
}`
    },
    testcases: [
      {
        id: 1,
        name: "Case 1",
        input: { height: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1] },
        displayInput: "height = [0,1,0,2,1,0,1,3,2,1,2,1]",
        expected: "6"
      },
      {
        id: 2,
        name: "Case 2",
        input: { height: [4, 2, 0, 3, 2, 5] },
        displayInput: "height = [4,2,0,3,2,5]",
        expected: "9"
      }
    ],
    editorial: {
      summary: "Two Pointers maintaining left and right maximum wall heights.",
      approaches: [
        {
          title: "Two Pointers",
          timeComplexity: "O(n)",
          spaceComplexity: "O(1)",
          description: "Water height is constrained by the smaller boundary wall. Move inward from the lower wall while accumulating trapped water."
        }
      ]
    }
  },
  {
    id: 4,
    number: 4,
    title: "Median of Two Sorted Arrays",
    slug: "median-of-two-sorted-arrays",
    difficulty: "Hard",
    category: "Algorithms",
    acceptance: "39.2%",
    likes: 27500,
    dislikes: 3010,
    topics: ["Array", "Binary Search", "Divide and Conquer"],
    companies: ["Google", "Amazon", "Apple", "Microsoft", "Goldman Sachs"],
    description: `
<p class="mb-3">Given two sorted arrays <code>nums1</code> and <code>nums2</code> of size <code>m</code> and <code>n</code> respectively, return <strong>the median</strong> of the two sorted arrays.</p>
<p class="mb-3">The overall run time complexity should be <code>O(log (m+n))</code>.</p>
`,
    examples: [
      {
        id: 1,
        input: "nums1 = [1,3], nums2 = [2]",
        output: "2.00000",
        explanation: "merged array = [1,2,3] and median is 2."
      },
      {
        id: 2,
        input: "nums1 = [1,2], nums2 = [3,4]",
        output: "2.50000",
        explanation: "merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5."
      }
    ],
    constraints: [
      "nums1.length == m",
      "nums2.length == n",
      "0 <= m <= 1000",
      "0 <= n <= 1000",
      "1 <= m + n <= 2000",
      "-10^6 <= nums1[i], nums2[i] <= 10^6"
    ],
    hints: [
      "Partition both arrays such that the left half and right half have equal lengths and all elements on the left are <= elements on the right."
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
  if (nums1.length > nums2.length) {
    return findMedianSortedArrays(nums2, nums1);
  }
  const m = nums1.length;
  const n = nums2.length;
  let low = 0, high = m;

  while (low <= high) {
    const partitionX = Math.floor((low + high) / 2);
    const partitionY = Math.floor((m + n + 1) / 2) - partitionX;

    const maxLeftX = partitionX === 0 ? -Infinity : nums1[partitionX - 1];
    const minRightX = partitionX === m ? Infinity : nums1[partitionX];

    const maxLeftY = partitionY === 0 ? -Infinity : nums2[partitionY - 1];
    const minRightY = partitionY === n ? Infinity : nums2[partitionY];

    if (maxLeftX <= minRightY && maxLeftY <= minRightX) {
      if ((m + n) % 2 === 0) {
        return (Math.max(maxLeftX, maxLeftY) + Math.min(minRightX, minRightY)) / 2;
      } else {
        return Math.max(maxLeftX, maxLeftY);
      }
    } else if (maxLeftX > minRightY) {
      high = partitionX - 1;
    } else {
      low = partitionX + 1;
    }
  }
  return 0.0;
};`,
      typescript: `function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  if (nums1.length > nums2.length) return findMedianSortedArrays(nums2, nums1);
  const m = nums1.length, n = nums2.length;
  let low = 0, high = m;
  while (low <= high) {
    const px = Math.floor((low + high) / 2);
    const py = Math.floor((m + n + 1) / 2) - px;
    const maxLx = px === 0 ? -Infinity : nums1[px - 1];
    const minRx = px === m ? Infinity : nums1[px];
    const maxLy = py === 0 ? -Infinity : nums2[py - 1];
    const minRy = py === n ? Infinity : nums2[py];
    if (maxLx <= minRy && maxLy <= minRx) {
      if ((m + n) % 2 === 0) {
        return (Math.max(maxLx, maxLy) + Math.min(minRx, minRy)) / 2;
      }
      return Math.max(maxLx, maxLy);
    } else if (maxLx > minRy) high = px - 1;
    else low = px + 1;
  }
  return 0;
};`,
      python: `class Solution:
    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:
        if len(nums1) > len(nums2):
            nums1, nums2 = nums2, nums1
        m, n = len(nums1), len(nums2)
        low, high = 0, m
        while low <= high:
            px = (low + high) // 2
            py = (m + n + 1) // 2 - px
            max_lx = float('-inf') if px == 0 else nums1[px - 1]
            min_rx = float('inf') if px == m else nums1[px]
            max_ly = float('-inf') if py == 0 else nums2[py - 1]
            min_ry = float('inf') if py == n else nums2[py]
            if max_lx <= min_ry and max_ly <= min_rx:
                if (m + n) % 2 == 0:
                    return (max(max_lx, max_ly) + min(min_rx, min_ry)) / 2.0
                return float(max(max_lx, max_ly))
            elif max_lx > min_ry:
                high = px - 1
            else:
                low = px + 1
        return 0.0`,
      cpp: `class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        if (nums1.size() > nums2.size()) return findMedianSortedArrays(nums2, nums1);
        int m = nums1.size(), n = nums2.size();
        int low = 0, high = m;
        while (low <= high) {
            int px = (low + high) / 2;
            int py = (m + n + 1) / 2 - px;
            int maxLx = px == 0 ? INT_MIN : nums1[px - 1];
            int minRx = px == m ? INT_MAX : nums1[px];
            int maxLy = py == 0 ? INT_MIN : nums2[py - 1];
            int minRy = py == n ? INT_MAX : nums2[py];
            if (maxLx <= minRy && maxLy <= minRx) {
                if ((m + n) % 2 == 0) return (max(maxLx, maxLy) + min(minRx, minRy)) / 2.0;
                return max(maxLx, maxLy);
            } else if (maxLx > minRy) high = px - 1;
            else low = px + 1;
        }
        return 0.0;
    }
};`,
      java: `class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        if (nums1.length > nums2.length) return findMedianSortedArrays(nums2, nums1);
        int m = nums1.length, n = nums2.length;
        int low = 0, high = m;
        while (low <= high) {
            int px = (low + high) / 2;
            int py = (m + n + 1) / 2 - px;
            int maxLx = px == 0 ? Integer.MIN_VALUE : nums1[px - 1];
            int minRx = px == m ? Integer.MAX_VALUE : nums1[px];
            int maxLy = py == 0 ? Integer.MIN_VALUE : nums2[py - 1];
            int minRy = py == n ? Integer.MAX_VALUE : nums2[py];
            if (maxLx <= minRy && maxLy <= minRx) {
                if ((m + n) % 2 == 0) return (Math.max(maxLx, maxLy) + Math.min(minRx, minRy)) / 2.0;
                return Math.max(maxLx, maxLy);
            } else if (maxLx > minRy) high = px - 1;
            else low = px + 1;
        }
        return 0.0;
    }
}`
    },
    testcases: [
      {
        id: 1,
        name: "Case 1",
        input: { nums1: [1, 3], nums2: [2] },
        displayInput: "nums1 = [1,3]\nnums2 = [2]",
        expected: "2.00000"
      },
      {
        id: 2,
        name: "Case 2",
        input: { nums1: [1, 2], nums2: [3, 4] },
        displayInput: "nums1 = [1,2]\nnums2 = [3,4]",
        expected: "2.50000"
      }
    ],
    editorial: {
      summary: "Binary search on the smaller array partition in O(log(min(m, n))) time.",
      approaches: [
        {
          title: "Binary Search Partition",
          timeComplexity: "O(log(min(m, n)))",
          spaceComplexity: "O(1)",
          description: "Perform binary search to split the two arrays such that all elements on the left side are smaller than or equal to elements on the right side."
        }
      ]
    }
  }
];

export const defaultSubmissions = [
  {
    id: "sub_101",
    problemId: 1,
    status: "Accepted",
    runtime: "48 ms",
    memory: "42.8 MB",
    language: "JavaScript",
    timestamp: "12 mins ago"
  },
  {
    id: "sub_102",
    problemId: 20,
    status: "Accepted",
    runtime: "54 ms",
    memory: "41.9 MB",
    language: "JavaScript",
    timestamp: "2 hours ago"
  },
  {
    id: "sub_103",
    problemId: 3,
    status: "Accepted",
    runtime: "68 ms",
    memory: "45.1 MB",
    language: "TypeScript",
    timestamp: "Yesterday"
  },
  {
    id: "sub_104",
    problemId: 121,
    status: "Accepted",
    runtime: "62 ms",
    memory: "51.4 MB",
    language: "Python",
    timestamp: "3 days ago"
  },
  {
    id: "sub_105",
    problemId: 206,
    status: "Accepted",
    runtime: "52 ms",
    memory: "44.2 MB",
    language: "JavaScript",
    timestamp: "4 days ago"
  },
  {
    id: "sub_106",
    problemId: 53,
    status: "Accepted",
    runtime: "74 ms",
    memory: "48.9 MB",
    language: "C++",
    timestamp: "5 days ago"
  },
  {
    id: "sub_107",
    problemId: 15,
    status: "Wrong Answer",
    runtime: "N/A",
    memory: "N/A",
    language: "JavaScript",
    timestamp: "6 days ago"
  }
];

