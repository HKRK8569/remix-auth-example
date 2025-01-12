import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "firebaseConfig";
import { getToken } from "google.auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  if (!code) return redirect("/signin");
  const tokens = await getToken(code);
  const credential = GoogleAuthProvider.credential(tokens.id_token);
  await signInWithCredential(auth, credential);
  const currentUser = auth.currentUser;
  return redirect("/");
}

export default function AuthHandler() {
  return <div></div>;
}
