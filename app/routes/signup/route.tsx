import { ActionFunctionArgs } from "@remix-run/node";
import { Form, Link, redirect, useActionData } from "@remix-run/react";
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
  try {
    await authenticator.authenticate("password-signin", request);
  } catch (error) {
    return Response.json({ error });
  }
  return redirect("/");
}

export default function SignUp() {
  const actionData = useActionData<typeof action>();

  return (
    <div className="max-w-[720px] h-full mx-auto flex items-center justify-center flex-col">
      {actionData?.error && (
        <div className="p-2 bg-red-500 flex justify-center items-center mb-2 w-full rounded">
          <p className="text-white">新規登録に失敗しました。</p>
        </div>
      )}
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
        <button className="w-full p-2 bg-blue-400 text-white">新規登録</button>
      </Form>
      <Link to="/signin" className="text-blue-600">
        ログインはこちら
      </Link>
    </div>
  );
}
