import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";
import { auth } from "firebaseConfig";
import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const authenticator = new Authenticator<User>();

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const email = form.get("email");
    const password = form.get("password");

    console.log(email);
    console.log(password);

    const user = await signInWithEmailAndPassword(
      auth,
      String(email),
      String(password)
    );
    return user.user;
  }),
  "password-signin"
);

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const email = form.get("email");
    const password = form.get("password");

    const user = await createUserWithEmailAndPassword(
      auth,
      String(email),
      String(password)
    );
    return user.user;
  }),
  "password-signup"
);
