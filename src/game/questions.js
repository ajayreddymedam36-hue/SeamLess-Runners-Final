export const SUBJECTS = ["python", "html", "css", "javascript", "react", "sql"];
export const DIFFICULTIES = ["easy", "medium", "hard"];

export const QUESTIONS = {
  javascript: {
    easy: [
      { question: "Which keyword declares a variable in modern JS?", options: ["var", "let", "define", "dim"], answer: "let" },
      { question: "What does '===' check?", options: ["Value only", "Type only", "Value and type", "Reference"], answer: "Value and type" },
      { question: "Which method adds an item to the end of an array?", options: ["push()", "pop()", "shift()", "concat()"], answer: "push()" },
      { question: "Which is a JS data type?", options: ["float", "char", "boolean", "double"], answer: "boolean" },
    ],
    medium: [
      { question: "What does 'typeof null' return?", options: ["null", "undefined", "object", "string"], answer: "object" },
      { question: "Which creates a new array from an iterable?", options: ["Array.from()", "Array.new()", "[].make()", "Array.list()"], answer: "Array.from()" },
      { question: "What is a closure?", options: ["A loop", "Function with access to outer scope", "An object", "A promise"], answer: "Function with access to outer scope" },
    ],
    hard: [
      { question: "What does Symbol.iterator define?", options: ["Hash key", "Iteration protocol", "Type tag", "Promise resolver"], answer: "Iteration protocol" },
      { question: "Output of: [1,2,3].reduce((a,b)=>a+b)", options: ["6", "123", "0", "undefined"], answer: "6" },
      { question: "What does Object.freeze() do?", options: ["Deletes object", "Makes immutable", "Clones it", "Serializes"], answer: "Makes immutable" },
    ],
  },
  python: {
    easy: [
      { question: "Which prints text?", options: ["echo()", "print()", "log()", "write()"], answer: "print()" },
      { question: "Comments start with?", options: ["//", "#", "--", "/*"], answer: "#" },
      { question: "Which is a list?", options: ["{1,2,3}", "[1,2,3]", "(1,2,3)", "<1,2,3>"], answer: "[1,2,3]" },
    ],
    medium: [
      { question: "Length of a list 'lst'?", options: ["lst.size()", "len(lst)", "lst.length", "size(lst)"], answer: "len(lst)" },
      { question: "What does 'is' check?", options: ["Equality", "Identity", "Type", "Truthiness"], answer: "Identity" },
      { question: "Which is immutable?", options: ["list", "dict", "tuple", "set"], answer: "tuple" },
    ],
    hard: [
      { question: "What is a decorator?", options: ["A class", "A function modifying another", "A loop", "A module"], answer: "A function modifying another" },
      { question: "GIL stands for?", options: ["Global Interpreter Lock", "General Input Loop", "Generic Index List", "Global Init Layer"], answer: "Global Interpreter Lock" },
      { question: "Output: list(range(2,8,2))", options: ["[2,4,6]", "[2,4,6,8]", "[2,3,4,5,6,7]", "[2,8]"], answer: "[2,4,6]" },
    ],
  },
  html: {
    easy: [
      { question: "HTML stands for?", options: ["Hyper Trainer Markup", "HyperText Markup Language", "High Text Machine", "Hyper Tool ML"], answer: "HyperText Markup Language" },
      { question: "Tag for largest heading?", options: ["<h6>", "<head>", "<h1>", "<heading>"], answer: "<h1>" },
      { question: "Tag for line break?", options: ["<br>", "<lb>", "<break>", "<newline>"], answer: "<br>" },
    ],
    medium: [
      { question: "Which is semantic?", options: ["<div>", "<span>", "<article>", "<b>"], answer: "<article>" },
      { question: "Attribute for image source?", options: ["link", "src", "href", "url"], answer: "src" },
      { question: "Which makes a numbered list?", options: ["<ul>", "<ol>", "<li>", "<dl>"], answer: "<ol>" },
    ],
    hard: [
      { question: "Purpose of <meta charset>?", options: ["SEO", "Character encoding", "Author info", "Script type"], answer: "Character encoding" },
      { question: "Which lazy-loads images?", options: ["loading='lazy'", "defer", "async", "preload='no'"], answer: "loading='lazy'" },
      { question: "ARIA attribute prefix?", options: ["data-", "aria-", "role-", "a11y-"], answer: "aria-" },
    ],
  },
  css: {
    easy: [
      { question: "Property to change text color?", options: ["font-color", "text-color", "color", "fgcolor"], answer: "color" },
      { question: "Selector for id 'main'?", options: [".main", "#main", "*main", "main"], answer: "#main" },
      { question: "Which makes text bold?", options: ["font-weight: bold", "text-bold: yes", "weight: 900", "bold: true"], answer: "font-weight: bold" },
    ],
    medium: [
      { question: "Display for flex container?", options: ["block", "flex", "grid", "inline"], answer: "flex" },
      { question: "Unit relative to root font size?", options: ["em", "rem", "vw", "px"], answer: "rem" },
      { question: "Pseudo-class for hover?", options: [":hover", "::hover", ".hover", "@hover"], answer: ":hover" },
    ],
    hard: [
      { question: "Which has highest specificity?", options: ["Class", "Tag", "ID", "Attribute"], answer: "ID" },
      { question: "Property to create stacking context?", options: ["display", "z-index with position", "float", "overflow"], answer: "z-index with position" },
      { question: "What does 'fr' unit do in grid?", options: ["fixed ratio", "fraction of free space", "frame rate", "fluid rem"], answer: "fraction of free space" },
    ],
  },
  react: {
    easy: [
      { question: "React is a?", options: ["Database", "UI library", "Server", "Language"], answer: "UI library" },
      { question: "Hook for state?", options: ["useEffect", "useState", "useRef", "useMemo"], answer: "useState" },
      { question: "JSX compiles to?", options: ["HTML", "React.createElement calls", "CSS", "JSON"], answer: "React.createElement calls" },
    ],
    medium: [
      { question: "Hook for side effects?", options: ["useState", "useMemo", "useEffect", "useCallback"], answer: "useEffect" },
      { question: "Key prop is used for?", options: ["Styling", "List reconciliation", "Routing", "Auth"], answer: "List reconciliation" },
      { question: "Pass data to child via?", options: ["State", "Props", "Refs", "Context only"], answer: "Props" },
    ],
    hard: [
      { question: "useMemo is for?", options: ["Side effects", "Memoizing values", "DOM refs", "Routing"], answer: "Memoizing values" },
      { question: "What does React.memo do?", options: ["Caches state", "Skips re-render if props equal", "Stores refs", "Creates context"], answer: "Skips re-render if props equal" },
      { question: "Reconciliation refers to?", options: ["State sync", "Diffing virtual DOM", "Build step", "Hydration"], answer: "Diffing virtual DOM" },
    ],
  },
  sql: {
    easy: [
      { question: "Retrieve all rows from table?", options: ["GET * IN t", "SELECT * FROM t", "FETCH t", "READ t"], answer: "SELECT * FROM t" },
      { question: "Add new row?", options: ["INSERT INTO", "ADD ROW", "PUT INTO", "APPEND"], answer: "INSERT INTO" },
      { question: "Remove a table?", options: ["DELETE TABLE", "DROP TABLE", "REMOVE TABLE", "ERASE TABLE"], answer: "DROP TABLE" },
    ],
    medium: [
      { question: "Combine rows from two tables?", options: ["MERGE", "JOIN", "LINK", "UNION ONLY"], answer: "JOIN" },
      { question: "Filter groups?", options: ["WHERE", "HAVING", "FILTER", "GROUPBY"], answer: "HAVING" },
      { question: "Count rows?", options: ["SUM(*)", "COUNT(*)", "TOTAL(*)", "ROWS()"], answer: "COUNT(*)" },
    ],
    hard: [
      { question: "ACID 'I' stands for?", options: ["Index", "Isolation", "Integrity", "Iteration"], answer: "Isolation" },
      { question: "Window function clause?", options: ["GROUP BY", "OVER", "PARTITION ONLY", "WITHIN"], answer: "OVER" },
      { question: "Index primarily improves?", options: ["Writes", "Reads", "Storage", "Backups"], answer: "Reads" },
    ],
  },
};
