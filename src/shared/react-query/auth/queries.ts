import { AuthActions } from "@/shared/api-utils/actions/auth.actions";
import { queryOptions } from "@tanstack/react-query";

export class AuthQueriesOptions {
  constructor(public readonly authActions: AuthActions) {}

  public async me() {
    return queryOptions({
      queryKey: ["auth", "me"],
      queryFn: () => this.authActions.me(),
    });
  }
}
