export const DifficultyLevel = {
  GREEN: 0,
  GREENBLUE: 1,
  BLUE: 2,
  BLUEBLACK: 3,
  BLACK: 4,
  BLACKBLACK: 5,
};

export function getDifficultyIconPath(difficultyLevel) {
  switch (difficultyLevel) {
    case DifficultyLevel.GREEN:
      return 'https://www.hikingproject.com/img/diff/greenBorder.svg';
    case DifficultyLevel.GREENBLUE:
      return 'https://www.hikingproject.com/img/diff/greenBlueBorder.svg';
    case DifficultyLevel.BLUE:
      return 'https://www.hikingproject.com/img/diff/blueBorder.svg';
    case DifficultyLevel.BLUEBLACK:
      return 'https://www.hikingproject.com/img/diff/blueBlackBorder.svg';
    case DifficultyLevel.BLACK:
      return 'https://www.hikingproject.com/img/diff/blackBorder.svg';
    case DifficultyLevel.BLACKBLACK:
      return 'https://www.hikingproject.com/img/diff/dblackBorder.svg';
    default:
      return 'ahhhhhh';
  }
}

export function parseDifficultyFromNum(num) {
  if (num < 1) {
    return DifficultyLevel.GREEN;
  } else if (num < 2) {
    return DifficultyLevel.GREENBLUE;
  } else if (num < 3) {
    return DifficultyLevel.BLUE;
  } else if (num < 4) {
    return DifficultyLevel.BLUEBLACK;
  } else if (num < 5) {
    return DifficultyLevel.BLACK;
  } else {
    return DifficultyLevel.BLACKBLACK;
  }
}

export function getFrontFacingDifficulty(difficultyLevel) {
  switch (difficultyLevel) {
    case DifficultyLevel.GREEN:
      return 'Easy';
    case DifficultyLevel.GREENBLUE:
      return 'Easy/Intermediate';
    case DifficultyLevel.BLUE:
      return 'Intermediate';
    case DifficultyLevel.BLUEBLACK:
      return 'Intermediate/Difficult';
    case DifficultyLevel.BLACK:
      return 'Difficult';
    case DifficultyLevel.BLACKBLACK:
      return 'Very Difficult';
    default:
      return 'ahhhhhh';
  }
}
