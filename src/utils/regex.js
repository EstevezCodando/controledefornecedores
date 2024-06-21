export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const phoneRegex =
  /^(?:(?:\+|00)?(55)\s?)?(?:\(?[1-9][0-9]\)?\s?)?(?:9\d{4}|\d{4})-?\d{4}$/;
export const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;

export const validateEmail = (email) => emailRegex.test(email);
export const validatePhone = (phone) => phoneRegex.test(phone);
export const validateCNPJ = (cnpj) => {
  if (!cnpjRegex.test(cnpj)) return false;

  const cnpjNumbers = cnpj.replace(/[^\d]+/g, "");

  if (cnpjNumbers.length !== 14) return false;

  // Validação de dígitos verificadores
  let length = cnpjNumbers.length - 2;
  let numbers = cnpjNumbers.substring(0, length);
  const digits = cnpjNumbers.substring(length);
  let sum = 0;
  let pos = length - 7;
  for (let i = length; i >= 1; i--) {
    sum += numbers.charAt(length - i) * pos--;
    if (pos < 2) pos = 9;
  }
  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(0))) return false;

  length += 1;
  numbers = cnpjNumbers.substring(0, length);
  sum = 0;
  pos = length - 7;
  for (let i = length; i >= 1; i--) {
    sum += numbers.charAt(length - i) * pos--;
    if (pos < 2) pos = 9;
  }
  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(1))) return false;

  return true;
};
