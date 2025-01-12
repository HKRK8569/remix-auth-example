import { google } from "googleapis";

const authClient = new google.auth.OAuth2({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirectUri: "http://localhost:5173/auth/google/callback",
});

export const generateAuthUrl = () => {
  const url = authClient.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ],
  });

  return url;
};

export const getToken = async (token: string) => {
  const { tokens } = await authClient.getToken(token);
  return tokens;
};
