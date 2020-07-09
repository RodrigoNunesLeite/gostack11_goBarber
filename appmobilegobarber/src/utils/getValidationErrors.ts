import { ValidationError } from 'yup';

interface Errors {
  // no lugar da palavra key poderia ser qualquer coisa
  // aqui diz que será qualquer propriedade string
  [key: string]: string;
}

export default function getValidationErrors(err: ValidationError): Errors {
  const validationErrors: Errors = {};

  err.inner.forEach(error => {
    validationErrors[error.path] = error.message;
  });

  return validationErrors;
}
