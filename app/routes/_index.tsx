import { redirect, type MetaFunction } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { auth } from "firebaseConfig";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader() {
  const user = auth.currentUser;
  if (!user) {
    return redirect("/signin");
  }
  return {
    user,
  };
}

export async function action() {
  await auth.signOut();
  return redirect("/");
}

export default function Index() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="max-w-[720px] h-full mx-auto flex items-center justify-center flex-col">
      <p>{data.user.email}</p>
      <Form method="post" className="w-full mb-2">
        <button className="w-full p-2 bg-blue-400 text-white">Logout</button>
      </Form>
    </div>
  );
}
