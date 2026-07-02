const missingMessage = (name: string) =>
  `Missing required environment variable: ${name}. For Next.js, copy .env.example to .env.local and fill in production values.`;

export function requiredEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(missingMessage(name));
  }

  return value;
}

export function optionalEnv(name: string) {
  return process.env[name] || "";
}

