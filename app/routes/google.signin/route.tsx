import { redirect } from "@remix-run/react";
import { generateAuthUrl } from "google.auth.server";

export async function action() {
  const url = generateAuthUrl();
  return redirect(url);
}
