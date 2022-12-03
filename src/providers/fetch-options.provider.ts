export interface ResponseOptions {
  [key: string]: number;
}

interface Response {
  byCategory: ResponseOptions;
  byDifficulty: ResponseOptions;
}

const SERVICE_URL = process.env.SERVICE_URL ?? 'https://the-trivia-api.com';

export const fetchOptions = async (): Promise<Response> => {
  const response = await fetch(`${SERVICE_URL}/api/metadata`);
  return response.json();
}