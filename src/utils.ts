import data from './data.json';
import { QuizQuestion, Situation, QuestionOption } from './types';

export const allSituations = data as Situation[];

function shuffleArray<T>(array: T[]): T[] {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

function getRandomItems<T>(array: T[], count: number, excludePredicate: (item: T) => boolean): T[] {
  const filtered = array.filter(item => !excludePredicate(item));
  return shuffleArray(filtered).slice(0, count);
}

function createOptions(correctText: string, otherSituations: Situation[], field: keyof Situation): QuestionOption[] {
  // Extract unique distractors for the specific field
  const distractors = Array.from(new Set(otherSituations.map(s => s[field] as string)))
    .filter(text => text !== correctText);

  // Take up to 3 distractors
  const selectedDistractors = shuffleArray(distractors).slice(0, 3);
  
  const options: QuestionOption[] = [
    { text: correctText, isCorrect: true },
    ...selectedDistractors.map(text => ({ text, isCorrect: false }))
  ];

  return shuffleArray(options);
}

export function generateQuiz(count: number = 10, testId: number | 'random' = 'random'): QuizQuestion[] {
  let selectedSituations: Situation[] = [];
  
  if (testId === 'random') {
    selectedSituations = shuffleArray(allSituations).slice(0, count);
  } else {
    const startIdx = (testId - 1) * count;
    selectedSituations = allSituations.slice(startIdx, startIdx + count);
  }

  return selectedSituations.map(situation => {
    return {
      id: situation.id,
      situationName: situation.name,
      nameOptions: createOptions(situation.name, allSituations, 'name'),
      indirectOptions: createOptions(situation.indirect, allSituations, 'indirect'),
      directOptions: createOptions(situation.direct, allSituations, 'direct'),
      actionOptions: createOptions(situation.action, allSituations, 'action'),
    };
  });
}
