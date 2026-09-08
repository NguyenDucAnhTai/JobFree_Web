const required = (value: string | undefined, name: string): string => {
  if (value) {
    return value;
  }

  if (import.meta.env.DEV) {
    return "http://localhost:3000";
  }

  throw new Error(`Missing environment variable: ${name}`);
};

export const ENV = {
  API_URL: required(import.meta.env.VITE_API_URL, "VITE_API_URL"),
} as const;
