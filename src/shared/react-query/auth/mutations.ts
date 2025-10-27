import { AuthActions } from "@/shared/api-utils/actions/auth.actions";
import { mutationOptions } from "@tanstack/react-query";

type SignUpParams = Parameters<AuthActions["signUp"]>[number];
type SignInParams = Parameters<AuthActions["signIn"]>[number];

export class AuthMutationsOptions {
  constructor(public readonly authActions: AuthActions) {}

  public signUp() {
    return mutationOptions({
      mutationFn: async (data: SignUpParams) => {
        const res = await this.authActions.signUp(data);

        if (res.error) {
          throw new Error(res.message, {
            cause: res.message,
          });
        }

        return res;
      },
    });
  }

  public signIn() {
    return mutationOptions({
      mutationFn: async (data: SignInParams) => {
        const res = await this.authActions.signIn(data);

        if (res.error) {
          throw new Error(res.message, {
            cause: res.message,
          });
        }

        return res;
      },
    });
  }

  public signOut() {
    return mutationOptions({
      mutationFn: async () => {
        const res = await this.authActions.signOut();

        if (res.error) {
          throw new Error(res.message, {
            cause: res.message,
          });
        }

        return res;
      },
    });
  }

  public closeAllSessions() {
    return mutationOptions({
      mutationFn: async () => {
        const res = await this.authActions.closeAllSessions();

        if (res.error) {
          throw new Error(res.message, {
            cause: res.message,
          });
        }

        return res;
      },
    });
  }
}
