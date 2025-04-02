# Open Trivia DB App

Simple interactive web-based trivia game powered by the Open Trivia Database API.

## Features

- **Dynamic Quiz Experience**: Answer questions one at a time with immediate feedback
- **Customizable Quizzes**: Select from multiple categories and difficulty levels
- **Score Tracking**: Keep track of your performance as you progress
- **Sound Effects**: Optional sound feedback for correct and incorrect answers
- **Responsive Design**: Play on any device with a seamless experience

## Demo - [Link](https://opentdb-trivia-smoky.vercel.app/)
![image](https://github.com/user-attachments/assets/5f5ddf78-2df7-4431-b47f-80a03f40cf3d)
![image](https://github.com/user-attachments/assets/ff803fa7-8379-4387-9266-95ec8ff51e1b)
![image](https://github.com/user-attachments/assets/c205bc72-a27e-4f9c-b525-9aeea67334c2)


## Technologies Used

- React 18
- TypeScript
- TanStack Router for navigation
- TanStack Query for data fetching
- Tone.js for sound effects
- Tailwind CSS for styling
- Vitest & React Testing Library for testing

## Getting Started

### Prerequisites

- Node.js (v18.0.0 or higher)
- npm or yarn or pnpm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/trivia-game-app.git
   cd trivia-game-app
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

### Running Tests

Run the test suite:

```bash
npm run test
# or
yarn test
# or
pnpm test
```

Run tests with coverage:

```bash
npm run test:coverage
# or
yarn test:coverage
# or
pnpm test:coverage
```

## Usage

1. On the home page, configure your quiz:

   - Select a category (General Knowledge, Science, History, etc.)
   - Choose difficulty level (Easy, Medium, Hard)
   - Set the number of questions (1-50)
   - Select question type (Multiple Choice or True/False)

2. Start the quiz by clicking the "Start Quiz" button

3. Answer each question by clicking on your chosen option

   - Correct answers will be highlighted in green
   - Incorrect answers will be highlighted in red
   - The app will automatically progress to the next question after a brief delay

4. At the end of the quiz, view your score and summary

5. Choose to play again or return to the home screen to configure a new quiz

## Project Structure

```
src/
├── client/                     # API client functionality
│   ├── fetchQuiz/              # Quiz fetching logic
│   └── fetchQuizCategory/      # Category fetching logic
├── constants/                  # Application constants
│   ├── api.ts                  # API endpoints and config
│   └── options.ts              # Quiz options and settings
├── hooks/                      # Custom React hooks
│   ├── useQuizCategoryData.ts  # Hook for fetching categories
│   └── useQuizData.ts          # Hook for fetching quiz questions
├── mock/                       # Testing mocks
│   └── client/                 # API client mocks
├── routes/                     # Application routes using TanStack Router
│   ├── -module/                # Route-specific modules
│   │   ├── Home/               # Home page components & logic
│   │   │   ├── __tests__/      # Home page tests
│   │   │   ├── components/     # Home page components
│   │   │   └── useHomePage.ts  # Home page hook
│   │   └── Quiz/               # Quiz page components & logic
│   │       ├── __tests__/      # Quiz page tests
│   │       ├── components/     # Quiz page components
│   │       └── useQuizPage.ts  # Quiz page hook
│   ├── root.tsx                # Root route component
│   ├── index.tsx               # Main entry point for routes
│   └── quiz.tsx                # Quiz route component
└── types/                      # TypeScript type definitions
└── util/                       # Utility functions
```

## API Integration

This app uses the Open Trivia Database API:

- Base URL: `https://opentdb.com/api.php`
- Parameters:
  - `amount`: Number of questions (1-50)
  - `category`: Question category ID
  - `difficulty`: Question difficulty (easy, medium, hard)
  - `type`: Question type (multiple, boolean)

## Key Components

- **Home**: Landing page with quiz configuration options
- **QuizConfiguration**: Component for selecting quiz parameters
- **QuizPage**: Main quiz gameplay component
- **QuestionView**: Displays individual questions and answer options
- **FinishedView**: End-of-quiz summary showing final score

## Custom Hooks

- **useHomePage**: Manages home page state and quiz configuration
- **useQuizPage**: Handles quiz state, question navigation, and scoring
- **useQuizData**: Fetches quiz questions based on selected parameters
- **useQuizCategoryData**: Retrieves available quiz categories

## Testing Strategy

The application uses Vitest and React Testing Library for comprehensive test coverage. The test suite includes:

### HomePage Tests

The HomePage tests verify that:

1. The page renders correctly when category fetching is successful
2. The page renders correctly when category fetching fails
3. The "Start Quiz" button is properly disabled when configuration is incomplete
4. The "Start Quiz" button becomes enabled and works correctly when all configurations are filled

Key testing patterns:

- Mocking API responses for category data
- Verifying UI elements are displayed
- Testing form interactions
- Checking navigation occurs with correct parameters

### QuizPage Tests

The QuizPage tests verify that:

1. The quiz page renders correctly when questions are fetched successfully
2. The page shows appropriate UI when quiz data is empty
3. The page shows error messages when quiz data fetching fails
4. Sound toggle functionality works correctly
5. Answer selection works properly, including:
   - Correct/incorrect answer indication
   - Sound feedback (when enabled)
   - Timer-based progression to next question
   - Final score calculation
   - Navigation back to home

Key testing patterns:

- Mocking API responses for quiz questions
- Testing loading states
- Verifying error handling
- Testing interactive features (sound toggle, answer selection)
- Checking timing-dependent behavior using Vitest's timer mocking

### Test Structure

The tests follow a consistent structure:

```javascript
describe('Component test', () => {
  beforeEach(() => {
    // Setup: mock dependencies, reset state
  });

  it('tests specific functionality', async () => {
    // Arrange: setup test conditions
    // Act: perform actions
    // Assert: verify expected outcomes
  });
});
```

Examples of mocked dependencies include:

- API calls (fetchQuiz, fetchQuizCategory)
- Navigation functions (useNavigate)
- Browser APIs (localStorage)
- External libraries (Tone.js for sound effects)

### Test Coverage
99.69% Statements (661/663) || 95.68% Branches (111/116) || 97.5% Functions (39/40) || 99.69% Lines (661/663)
| File                                  | Statements | Branches | Functions | Lines  |
|---------------------------------------|------------|----------|-----------|--------|
| client/fetchQuiz                      | 89.47% (17/19)  | 60% (3/5)  | 100% (2/2)  | 89.47% (17/19)  |
| client/fetchQuizCategory              | 100% (12/12)  | 100% (3/3)  | 100% (2/2)  | 100% (12/12)  |
| constants                             | 100% (28/28)  | 100% (0/0)  | 100% (0/0)  | 100% (28/28)  |
| hooks                                 | 100% (17/17)  | 100% (3/3)  | 100% (3/3)  | 100% (17/17)  |
| mock/client                           | 100% (214/214)  | 100% (14/14)  | 100% (9/9)  | 100% (214/214)  |
| routes                                | 100% (77/77)  | 92.3% (12/13)  | 66.66% (2/3)  | 100% (77/77)  |
| routes/-module/Home                   | 100% (29/29)  | 100% (7/7)  | 100% (3/3)  | 100% (29/29)  |
| routes/-module/Home/components        | 100% (76/76)  | 100% (14/14)  | 100% (5/5)  | 100% (76/76)  |
| routes/-module/Quiz                   | 100% (94/94)  | 94.44% (34/36)  | 100% (7/7)  | 100% (94/94)  |
| routes/-module/Quiz/components        | 100% (92/92)  | 100% (19/19)  | 100% (5/5)  | 100% (92/92)  |
| util                                  | 100% (5/5)  | 100% (2/2)  | 100% (1/1)  | 100% (5/5)  |


## Extra Features

This project is equipped with pre-commit hooks powered by Husky and lint-staged that enable eslint, prettier check and unit testing run before user is allowed to commit to the branch

### Eslint Configuration

```js
export default defineConfig([
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'], languageOptions: { globals: globals.browser } },
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'], plugins: { js }, extends: ['js/recommended'] },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
    },
  },
  globalIgnores(['vite.config.js']),
]);
```

### Prettier Configuration

```json
{
  "trailingComma": "es5",
  "printWidth": 120,
  "singleQuote": true,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "endOfLine": "lf",
  "arrowParens": "always"
}
```


## Acknowledgements

- [Open Trivia Database](https://opentdb.com/) for providing the free trivia API
- [Lucide React](https://lucide.dev/) for the beautiful icons
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [TanStack](https://tanstack.com/) for the excellent React libraries
