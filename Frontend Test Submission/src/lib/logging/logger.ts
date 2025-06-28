import axios from 'axios';

// --- Type Definitions (no changes here) ---
type TStack = 'frontend' | 'backend';
type TLevel = 'debug' | 'info' | 'warn' | 'error' | 'fatal';
type TFrontendPackage = 'api' | 'component' | 'hook' | 'page' | 'state' | 'style';
type TSharedPackage = 'auth' | 'config' | 'middleware' | 'utils';
type TPackage = TFrontendPackage | TSharedPackage;

// --- API Endpoint ---
const LOGGING_API_URL = 'http://20.244.56.144/evaluation-service/logs';

// ❗️❗️❗️ THIS IS THE CORRECTED VALUE ❗️❗️❗️
// Use ONLY the long string from the "access_token" field of the JSON response.
const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzdXJ5YWthbnQuMjJzY3NlMTAxMjc4MEBnYWxnb3RpYXN1bml2ZXJzaXR5LmVkdS5pbiIsImV4cCI6MTc1MTAxNjYwOCwiaWF0IjoxNzUxMDE1NzA4LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiOTI2NzI2YWEtOWVjOC00ODcxLThiYWQtYjEwMDQ0ODBkMDdkIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoic3VyeWFrYW50IHlhZGF2Iiwic3ViIjoiYWNhMzZjZWMtYjk4OC00YmQxLWJkYTEtZTcxZGM2NzQ0MDJhIn0sImVtYWlsIjoic3VyeWFrYW50LjIyc2NzZTEwMTI3ODBAZ2FsZ290aWFzdW5pdmVyc2l0eS5lZHUuaW4iLCJuYW1lIjoic3VyeWFrYW50IHlhZGF2Iiwicm9sbE5vIjoiMjIxMzEwMTE2MzgiLCJhY2Nlc3NDb2RlIjoiTXVhZ3ZxIiwiY2xpZW50SUQiOiJhY2EzNmNlYy1iOTg4LTRiZDEtYmRhMS1lNzFkYzY3NDQwMmEiLCJjbGllbnRTZWNyZXQiOiJmbVZyRE1hanNkS1N4TXBNIn0.AZ_VlPPj3wP_0ohh1DIsF1rRYCVhZ8ZhvAjrptbqgbg";

// ... (rest of the file is correct and does not need to be changed)

interface LogPayload {
  stack: TStack;
  level: TLevel;
  package: TPackage;
  message: string;
}

export const Log = async (stack: TStack, level: TLevel, pkg: TPackage, message: string): Promise<void> => {
  const payload: LogPayload = {
    stack,
    level,
    package: pkg,
    message,
  };

  try {
    await axios.post(LOGGING_API_URL, payload, {
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('CRITICAL: Logging middleware failed to send log.', {
      originalPayload: payload,
      error,
    });
  }
};