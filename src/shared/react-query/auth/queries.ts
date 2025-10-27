import { AuthActions } from "@/shared/api-utils/actions/auth.actions";
import { queryOptions } from "@tanstack/react-query";

export class AuthQueriesOptions {
  constructor(public readonly authActions: AuthActions) {}

  public me() {
    return queryOptions({
      queryKey: ["auth", "me"],
      queryFn: async () => {
        const res = await this.authActions.me();

        if (res.error || !res.data) {
          throw new Error(res.message, {
            cause: res.message,
          });
        }

        return res.data;
      },
    });
  }
}
