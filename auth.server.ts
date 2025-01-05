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
    try {
      const { user } = await signInWithEmailAndPassword(
        auth,
        String(email),
        String(password)
      );
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }),
  "password-signin"
);

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const email = form.get("email");
    const password = form.get("password");
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        String(email),
        String(password)
      );
      return user.user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }),
  "password-signup"
);
