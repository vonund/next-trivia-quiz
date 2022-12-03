export interface ResponseOptions {
  [key: string]: number;
}

interface Response {
  byCategory: ResponseOptions;
  byDifficulty: ResponseOptions;
}

export const fetchOptions = async (): Promise<Response> => {
  const response = await fetch("https://the-trivia-api.com/api/metadata");
  return response.json();
}