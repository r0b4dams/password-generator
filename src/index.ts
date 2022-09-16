const button = document.querySelector<HTMLButtonElement>('#generate')!;
const textArea = document.querySelector<HTMLTextAreaElement>('#password')!;

const RANGE = /\b([8-9]|[1-9][0-9]|1[01][0-9]|12[0-8])\b/;
const CHARS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
  lowercase: 'abcdefghijklmnopqrstuvwxyz'.split(''),
  numbers: '0123456789'.split(''),
  special: '!@#$%&?'.split(''),
};

const setPassword = (): void => {
  const length = getPasswordLength();
  if (!length) {
    textArea.value = 'Password not generated: No valid length entered';
    return;
  }

  const chars = getPasswordChars();
  if (!chars.length) {
    textArea.value = 'Password not generated: No character types selected';
    return;
  }

  textArea.value = generatePassword(length, chars);
};

const getPasswordLength = (): number | null => {
  let input: string | null;

  do {
    input = prompt(
      `
      Enter a password length of at least 8 characters
      and no more than 128 characters.
      `
    );
    if (input && RANGE.test(input)) return Number(input);
  } while (input);

  return null;
};

const getPasswordChars = (): string[] => {
  let chars: string[] = [];

  if (window.confirm('Would you like to include lowercase letters?')) {
    chars = chars.concat(CHARS.lowercase);
  }

  if (window.confirm('Would you like to include uppercase letters?')) {
    chars = chars.concat(CHARS.uppercase);
  }

  if (window.confirm('Would you like to include numbers?')) {
    chars = chars.concat(CHARS.numbers);
  }

  if (window.confirm('Would you like to include special characters?')) {
    chars = chars.concat(CHARS.special);
  }

  return chars;
};

const generatePassword = (length: number, chars: string[]): string => {
  let password = [];
  for (let i = 0; i < length; i++) {
    const randomIdx = Math.floor(Math.random() * chars.length);
    const randomChar = chars[randomIdx];
    password.push(randomChar);
  }
  return password.join('');
};

button.addEventListener('click', setPassword);
