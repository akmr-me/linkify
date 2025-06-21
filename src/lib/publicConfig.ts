import { z } from "zod";

const schema = z.object({
  scheme: z.string().default("https"),
  apiHost: z.string().url(),
  apiURL: z.string().url(),
  feedbackFormURL: z.string().url(),
  host: z.string().url(),
  authority: z.string().url(),

  portfolioURL: z.string().url(),
  creatorName: z.string(),

  googleOAuthClientId: z.string().optional(),
  turnstileSiteKey: z.string().optional(),
});

const envVars = {
  scheme: process.env.NEXT_PUBLIC_SCHEME,
  apiHost: process.env.NEXT_PUBLIC_API_HOST,
  apiURL: process.env.NEXT_PUBLIC_API_URL,
  feedbackFormURL: process.env.NEXT_PUBLIC_FEEDBACK_FORM,
  host: `${process.env.NEXT_PUBLIC_SCHEME || "https"}://${
    process.env.NEXT_PUBLIC_AUTHORITY
  }`,
  authority: process.env.NEXT_PUBLIC_AUTHORITY,

  portfolioURL: process.env.NEXT_PUBLIC_PORTFOLIO_URL,
  creatorName: process.env.NEXT_PUBLIC_CREATOR_NAME,

  googleOAuthClientId: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID,
  turnstileSiteKey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
};

const publicConfig = schema.parse(envVars);

export default publicConfig;
