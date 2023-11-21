export const generateLetter = () => {
  //no one wants to guess with Q, X, Y, and Z
  const alphabet = 'ABCDEFGHIJKLMNOPRSTUVW';
  const randomNum = Math.floor(Math.random() * 22);
  const randomLetter = alphabet[randomNum];
  return randomLetter;
};

export const generateWordLength = () => {
  return Math.floor(Math.random() * 3 + 4);
};

const test = () => {
  return "i can't believe i had the wrong email associated with my github account";
};
