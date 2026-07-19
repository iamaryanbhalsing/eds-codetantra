import fs from 'fs';
import path from 'path';

const THEORY_FILE = 'C:\\Users\\HP\\Downloads\\imp\\eds theory.txt';
const PRACTICAL_FILE = 'C:\\Users\\HP\\Downloads\\imp\\eds practicla.txt';
const THEORY_OUTPUT = 'C:\\Users\\HP\\Desktop\\eds-portal\\src\\data\\theory.json';
const LAB_OUTPUT = 'C:\\Users\\HP\\Desktop\\eds-portal\\src\\data\\lab.json';

const THEORY_TOPICS: Record<string, { topic: string; order: number }> = {
  '1': { topic: 'Numbers & Data Types', order: 1 },
  '2.1': { topic: 'Lists', order: 2 },
  '2.3': { topic: 'Tuples', order: 3 },
  '3.1': { topic: 'Dictionaries', order: 4 },
  '3.2': { topic: 'Type Conversion', order: 5 },
  '4.1': { topic: 'Arithmetic Operators', order: 6 },
  '4.2': { topic: 'Comparison Operators', order: 7 },
  '5.1': { topic: 'Assignment Operators', order: 8 },
  '5.2': { topic: 'Bitwise Operators', order: 9 },
  '6': { topic: 'Logical Operators', order: 10 },
  '6.2': { topic: 'Membership Operators', order: 11 },
  '7.1': { topic: 'Identity Operators', order: 12 },
  '7.2': { topic: 'Operator Precedence', order: 13 },
  '8': { topic: 'If Statement', order: 14 },
  '9': { topic: 'If-Else Statement', order: 15 },
  '10': { topic: 'If-Elif-Else', order: 16 },
  '11': { topic: 'While Loop', order: 17 },
  '12': { topic: 'For Loop', order: 18 },
  '13': { topic: 'Break Statement', order: 19 },
  '14': { topic: 'Continue Statement', order: 20 },
  '15': { topic: 'Pass Statement', order: 21 },
  '16': { topic: 'Functions', order: 22 },
  '17': { topic: 'Functions (Arguments)', order: 23 },
  '18': { topic: 'Default & Variable Arguments', order: 24 },
  '19': { topic: 'Lambda, Map, Filter', order: 25 },
  '20': { topic: 'Fruitful Functions', order: 26 },
  '21': { topic: 'Variable Scope', order: 27 },
  '22': { topic: 'Recursion', order: 28 },
  '23': { topic: 'Modules', order: 29 },
  '24': { topic: 'Importing Modules', order: 30 },
  '25': { topic: 'From Import', order: 31 },
  '26': { topic: 'Math Library', order: 32 },
};

const LAB_TOPICS: Record<string, { topic: string; order: number }> = {
  '1.1': { topic: 'Basic Programs', order: 1 },
  '1.2': { topic: 'Conditionals & Recursion', order: 2 },
  '2.1': { topic: 'Lists & Dictionaries', order: 3 },
  '2.2': { topic: 'Array Operations', order: 4 },
  '3.1': { topic: 'NumPy Basics', order: 5 },
  '3.2': { topic: 'NumPy Operations', order: 6 },
  '4.1': { topic: 'Pandas Basics', order: 7 },
  '4.2': { topic: 'Pandas Analysis', order: 8 },
  '5.1': { topic: 'Matplotlib Basics', order: 9 },
  '5.2': { topic: 'Matplotlib Visualization', order: 10 },
};

function cleanStatement(text: string): string {
  // Remove UI artifacts like "Terminal Test cases Prev Reset Submit Next"
  let cleaned = text.replace(/\s*Terminal\s+Test\s+cases\s+Prev\s+Reset\s+Submit\s+Next\s*/gi, '');
  // Normalize whitespace: collapse multiple spaces/newlines into single spaces, but keep readable
  cleaned = cleaned.replace(/\n/g, ' ');
  cleaned = cleaned.replace(/\s{2,}/g, ' ');
  return cleaned.trim();
}

function cleanCode(text: string): string {
  // Remove trailing blank lines
  const lines = text.split('\n');
  let end = lines.length;
  while (end > 0 && lines[end - 1].trim() === '') {
    end--;
  }
  return lines.slice(0, end).join('\n').trimEnd();
}

function getTheoryTopic(number: string): { topic: string; order: number } {
  const parts = number.split('.');
  // Try most specific first (e.g., "2.1")
  const prefix2 = `${parts[0]}.${parts[1]}`;
  if (THEORY_TOPICS[prefix2]) return THEORY_TOPICS[prefix2];
  // Try first part only (e.g., "1" or "6")
  if (THEORY_TOPICS[parts[0]]) return THEORY_TOPICS[parts[0]];
  // Fallback - shouldn't happen if all topics are covered
  return { topic: 'Unknown', order: 99 };
}

function getLabTopic(number: string): { topic: string; order: number } {
  const parts = number.split('.');
  const prefix2 = `${parts[0]}.${parts[1]}`;
  if (LAB_TOPICS[prefix2]) return LAB_TOPICS[prefix2];
  return { topic: 'Unknown', order: 99 };
}

function parseTheoryFile(content: string) {
  // Split by separator line (line of = characters)
  const sections = content.split(/^={50,}$/m);
  const questions: any[] = [];

  for (const section of sections) {
    const trimmed = section.trim();
    if (!trimmed) continue;

    // Extract question number and title
    const numberMatch = trimmed.match(/Question\s+number:\s*(\d+\.\d+\.\d+)\s*-\s*(.+)/i);
    if (!numberMatch) continue;

    const number = numberMatch[1].trim();
    const title = numberMatch[2].trim();

    // Extract question statement (everything between "Question Statement:" and "Code:")
    const statementMatch = trimmed.match(/Question\s+Statement:\s*([\s\S]*?)(?=\n\s*Code:)/i);
    const statement = statementMatch ? cleanStatement(statementMatch[1]) : '';

    // Extract code (everything after "Code:")
    const codeMatch = trimmed.match(/Code:\s*([\s\S]*?)$/i);
    const code = codeMatch ? cleanCode(codeMatch[1]) : '';

    const { topic, order } = getTheoryTopic(number);

    questions.push({
      id: `theory-${number}`,
      section: 'theory',
      number,
      title,
      statement,
      code,
      topic,
      topicOrder: order,
    });
  }

  return questions;
}

function parsePracticalFile(content: string) {
  // Split by separator line (line of - characters)
  const sections = content.split(/^-{50,}$/m);
  const questions: any[] = [];

  for (const section of sections) {
    const trimmed = section.trim();
    if (!trimmed) continue;

    // Extract question number (note the space before colon in practical file)
    const numberMatch = trimmed.match(/Question\s+Number\s*:\s*(\d+\.\d+\.\d+)/i);
    if (!numberMatch) continue;

    const number = numberMatch[1].trim();

    // Extract question statement
    const statementMatch = trimmed.match(/Question\s+Statement\s*:\s*([\s\S]*?)(?=\n\s*Code\s*:)/i);
    const statement = statementMatch ? cleanStatement(statementMatch[1]) : '';

    // Extract code
    const codeMatch = trimmed.match(/Code\s*:\s*([\s\S]*?)$/i);
    const code = codeMatch ? cleanCode(codeMatch[1]) : '';

    const { topic, order } = getLabTopic(number);

    questions.push({
      id: `lab-${number}`,
      section: 'lab',
      number,
      title: topic,
      statement,
      code,
      topic,
      topicOrder: order,
    });
  }

  return questions;
}

// Main
const outputDir = path.dirname(THEORY_OUTPUT);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Parse theory
const theoryContent = fs.readFileSync(THEORY_FILE, 'utf-8');
const theoryQuestions = parseTheoryFile(theoryContent);
fs.writeFileSync(THEORY_OUTPUT, JSON.stringify(theoryQuestions, null, 2), 'utf-8');
console.log(`Theory: ${theoryQuestions.length} questions written to ${THEORY_OUTPUT}`);

// Parse practical/lab
const practicalContent = fs.readFileSync(PRACTICAL_FILE, 'utf-8');
const labQuestions = parsePracticalFile(practicalContent);
fs.writeFileSync(LAB_OUTPUT, JSON.stringify(labQuestions, null, 2), 'utf-8');
console.log(`Lab: ${labQuestions.length} questions written to ${LAB_OUTPUT}`);
