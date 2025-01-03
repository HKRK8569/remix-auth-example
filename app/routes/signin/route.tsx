import { ActionFunctionArgs } from "@remix-run/node";
import { Form, Link, redirect } from "@remix-run/react";
import { authenticator } from "auth.server";
import { auth } from "firebaseConfig";

export async function loader() {
  const user = auth.currentUser;
  if (user) {
    return redirect("/");
  }
  return null;
}

export async function action({ request }: ActionFunctionArgs) {
  await authenticator.authenticate("password-signin", request);
  return redirect("/");
}

export default function Signin() {
  return (
    <div className="max-w-[720px] h-full mx-auto flex items-center justify-center flex-col">
      <Form method="post" className="w-full mb-2">
        <input
          type="email"
          name="email"
          className="block w-full p-2 mb-2 border-black border"
          required
        />
        <input
          type="password"
          name="password"
          className="block w-full p-2 mb-2 border-black border"
          autoComplete="current-password"
          required
        />
        <button className="w-full p-2 bg-blue-400 text-white">Sign In</button>
      </Form>
      <Link className="text-blue-600" to="/signup">
        新規登録はこちら
      </Link>
    </div>
  );
}
