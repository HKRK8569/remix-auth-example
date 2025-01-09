import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { getToken } from "google.auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  if (!code) return redirect("/signin");
  const tokens = await getToken(code);
  console.log(tokens);
  return null;
}

export default function AuthGoogleCallback() {
  return <div></div>;
}
