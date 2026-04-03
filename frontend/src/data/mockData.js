
// Basic User Mock
export const MOCK_USER = {
  id: "u1",
  username: "j_doe",
  email: "john@example.com",
  avatar: "https://ui-avatars.com/api/?name=John+Doe&background=random",
  education: "B.Tech Computer Science",
  stats: {
    simulationsStarted: 5,
    hoursLearned: 14,
    badgesEarned: 3
  },
  wishlist: ["job_uiux", "job_db"]
};

// Job Roles
export const MOCK_JOBS = [
  {
    id: "job_dev",
    title: "Software Developer",
    description: "Develop and maintain software applications using modern programming languages and frameworks.",
    difficulty: "Intermediate",
    time: "45 min",
    skills: ["Python", "JavaScript", "Problem Solving"],
    tasks_count: 4,
    detailed_description: "As a Software Developer, you will be responsible for designing, coding, testing, and debugging software applications. You will work with a team of developers to create high-quality software solutions."
  },
  {
    id: "job_uiux",
    title: "UI/UX Designer",
    description: "Design intuitive user interfaces and user experiences for web and mobile applications.",
    difficulty: "Beginner",
    time: "30 min",
    skills: ["Figma", "Prototyping", "User Research"],
    tasks_count: 3,
    detailed_description: "Create user-centered designs by understanding business requirements, and user feedback. Create user flows, wireframes, prototypes and mockups."
  },
  {
    id: "job_data",
    title: "Data Analyst",
    description: "Analyze complex data sets to help companies make better business decisions.",
    difficulty: "Advanced",
    time: "60 min",
    skills: ["SQL", "Data Visualization", "Python"],
    tasks_count: 5,
    detailed_description: "Interpret data, analyze results using statistical techniques and provide ongoing reports. Develop and implement databases, data collection systems, data analytics and other strategies that optimize statistical efficiency and quality."
  },
  {
    id: "job_test",
    title: "Software Tester",
    description: "Ensure software quality by running manual and automated tests.",
    difficulty: "Beginner",
    time: "40 min",
    skills: ["Manual Testing", "Automation", "Bug Reporting"],
    tasks_count: 4,
    detailed_description: "Responsible for the quality of software development and deployment. Involved in performing automated and manual tests to ensure the software created by developers is fit for purpose."
  },
  {
    id: "job_db",
    title: "Database Developer",
    description: "Design, develop and maintain database systems for optimal performance.",
    difficulty: "Intermediate",
    time: "50 min",
    skills: ["SQL", "Database Design", "Performance Tuning"],
    tasks_count: 4,
    detailed_description: "Design stable and reliable databases according to our company's needs. You will be responsible for developing, testing, improving and maintaining new and existing databases to help users retrieve data effectively."
  }
];

// Tasks
export const MOCK_TASKS = {
  "job_dev": [
    {
      id: "t1",
      number: 1,
      type: "code_debug",
      title: "Fix Broken Function Interface",
      description: "The core API function responsible for user status updates is returning a malformed response object. Currently, the function returns a statusCode key, but the frontend interface expects a key named status for compatibility with our legacy dashboard.",
      requirements: [
        "Modify formatResponse in the editor.",
        "Ensure the returned object contains status and data.",
        "The data payload must remain intact."
      ],
      test_case: {
        actual: '{\n  "statusCode": 200,\n  "data": []\n}',
        expected: '{\n  "status": 200,\n  "data": []\n}'
      },
      context: "Currently, the function returns a statusCode key, but the frontend interface expects a key named status.",
      code_snippet: "/**\n * Formats the API response for the frontend dashboard.\n */\nexport function formatResponse(data, code) {\n  return {\n    statusCode: code, // BUG: Should be 'status'\n    data: data,\n    timestamp: Date.now()\n  };\n}\n\n// Usage:\nconst result = formatResponse([], 200);\nconsole.log(result);",
      time_limit: 1500,
      difficulty: "Easy",
      hint: "Simply rename the 'statusCode' key to 'status' in the returned object."
    },
    {
      id: "t2",
      number: 2,
      type: "code_explanation",
      title: "Code Explanation Task",
      subtitle: "Analyze the Tic-Tac-Toe winner-checking algorithm on the left and provide a structured breakdown of how the logic functions.",
      description: "Analyze the Tic-Tac-Toe winner-checking algorithm on the left and provide a structured breakdown of how the logic functions.",
      breadcrumbs: "Level 1: Fundamentals / Task 2: Logic Decomposition",
      progress: 40,
      taskLabel: "Task 2 of 5 in Level 1",
      fileName: "tic-tac-toe.js",
      code_snippet: "function checkWinner(squares) {\n  const lines = [\n    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows\n    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols\n    [0, 4, 8], [2, 4, 6]             // Diagonals\n  ];\n\n  for (let i = 0; i < lines.length; i++) {\n    const [a, b, c] = lines[i];\n    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {\n      return squares[a];\n    }\n  }\n  return null;\n}",
      time_limit: 600,
      difficulty: "Easy",
      hint: "Focus on how the 'lines' array defines all possible winning combinations."
    },
    {
      id: "t4",
      number: 3,
      type: "code_debug",
      title: "Sanitize User Inputs",
      description: "The feedback submission form is vulnerable to simple script injections. You need to sanitize the comment field to strip out HTML tags.",
      requirements: [
        "Include a regex to remove <script> tags.",
        "Ensure normal text remains untouched.",
        "Return the sanitized string."
      ],
      code_snippet: "function sanitize(text) {\n  // BUG: This only removes the first tag\n  return text.replace('<script>', '');\n}\n\n// Test:\nconsole.log(sanitize('<script>alert(1)</script> Hello'));",
      test_case: {
        actual: 'alert(1)</script> Hello',
        expected: 'alert(1) Hello'
      },
      difficulty: "Easy",
      time_limit: 900,
      hint: "Use a global regex like /<[^>]*>/g to strip all tags."
    },
    {
      id: "t5",
      number: 4,
      type: "code_write",
      title: "Optimize Search Algorithm",
      description: "Our user search is currently using a nested loop that is extremely slow for large datasets. Refactor it to use a Hash Map (Object) for O(1) lookups.",
      requirements: [
        "Eliminate the nested loop.",
        "Create a lookup table from the users array.",
        "Return the matching user object by ID."
      ],
      code_snippet: "function findUser(users, id) {\n  // CURRENT: O(n)\n  for(let user of users) {\n    if(user.id === id) return user;\n  }\n  return null;\n}",
      test_case: {
        actual: "O(n) Iteration",
        expected: "O(1) Map Lookup"
      },
      difficulty: "Medium",
      time_limit: 1200,
      hint: "Iterate once to build a map: { [user.id]: user }"
    },
    {
      id: "t6",
      number: 5,
      type: "code_debug",
      title: "API Integration Fix",
      description: "The final step is to connect our local state to the legacy API backend. The auth header is currently missing a 'Bearer' prefix.",
      requirements: [
        "Add 'Bearer ' prefix to the token.",
        "Ensure the header key is correct.",
        "Log 'Connection Successful' on success."
      ],
      code_snippet: "function connect(token) {\n  const headers = {\n    'Authorization': token // BUG: Missing Bearer\n  };\n  return headers;\n}",
      test_case: {
        actual: '{"Authorization": "xyz123"}',
        expected: '{"Authorization": "Bearer xyz123"}'
      },
      difficulty: "Hard",
      time_limit: 1800,
      hint: "Use template literals: `Bearer ${token}`"
    }
  ],
  "job_uiux": [
    {
      id: "t3",
      number: 1,
      type: "multiple_choice",
      title: "Color Theory",
      description: "Which color combination provides the best contrast for text on a white background?",
      options: ["Light Yellow", "Dark Blue", "Pale Pink", "White"],
      time_limit: 120,
      hint: "Think about readability. Dark colors on a white background typically provide the best contrast for text."
    }
  ]
};

// Simulation History
export const MOCK_SIMULATIONS = [
  {
    id: "sim_1",
    job_id: "job_dev",
    job_title: "Software Developer",
    date: "2024-01-10",
    score: 85,
    status: "Completed",
    level: "Advanced"
  },
  {
    id: "sim_2",
    job_id: "job_data",
    job_title: "Data Analyst",
    date: "2024-01-12",
    score: 60,
    status: "Completed",
    level: "Intermediate"
  }
];

// Feedback
export const MOCK_FEEDBACK = {
  simulation_id: "sim_1",
  overall_score: 85,
  level: "Advanced",
  metrics: {
    accuracy: 90,
    time_efficiency: 80,
    skill_relevance: 85
  },
  strengths: ["Code Logic", "Syntax Knowledge"],
  weaknesses: ["Edge Case Handling"],
  skills_analysis: [
    { skill: "Python", score: 90 },
    { skill: "Problem Solving", score: 80 }
  ],
  recommendations: [
    {
      title: "Advanced React Patterns",
      provider: "FrontendMasters",
      url: "#"
    }
  ]
};

// Notifications
export const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    title: "Simulation Completed!",
    message: "You have successfully completed the Software Developer simulation with a score of 85%.",
    time: "2 hours ago",
    type: "success",
    read: false
  },
  {
    id: 2,
    title: "New Job Available",
    message: "A new UI/UX Designer role has been added to the simulator.",
    time: "5 hours ago",
    type: "info",
    read: false
  },
  {
    id: 3,
    title: "Achievement Unlocked",
    message: "Congratulations! You've reached the Pro level in Database Design.",
    time: "1 day ago",
    type: "achievement",
    read: true
  },
  {
    id: 4,
    title: "Profile Update",
    message: "Your profile has been successfully updated with new skills.",
    time: "2 days ago",
    type: "info",
    read: true
  }
];

