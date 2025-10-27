import { SessionSummary } from "@/shared/entities/session.entity";
import { UserDetail } from "@/shared/entities/user.entity";
import { SignInSchema } from "@/shared/schemas/auth/sign-in.schema";
import { SignUpSchema } from "@/shared/schemas/auth/sign-up.schema";
import { API } from "../api";
import { ENDPOINTS } from "../endpoints";
import { safeAction } from "../http/safe-action";

export class AuthActions {
  constructor(private readonly api: API) {}

  public async signUp(data: SignUpSchema) {
    const res = await safeAction(
      () => this.api.post<null, SignUpSchema>(ENDPOINTS.AUTH.SIGN_UP, data),
      "Error al iniciar sesión"
    );

    return res;
  }

  public async signIn(data: SignInSchema) {
    const res = await safeAction(
      () =>
        this.api.post<SessionSummary, SignInSchema>(
          ENDPOINTS.AUTH.SIGN_IN,
          data
        ),
      "Error al iniciar sesión"
    );

    return res;
  }

  public async me() {
    const res = await safeAction(
      () => this.api.get<UserDetail>(ENDPOINTS.AUTH.ME),
      "Error al iniciar sesión"
    );

    return res;
  }

  public async signOut() {
    const res = await safeAction(
      () => this.api.post<null, null>(ENDPOINTS.AUTH.SIGN_OUT, null),
      "Error al iniciar sesión"
    );

    return res;
  }

  public async closeAllSessions() {
    const res = await safeAction(
      () => this.api.post<null, null>(ENDPOINTS.AUTH.CLOSE_ALL_SESSIONS, null),
      "Error al iniciar sesión"
    );

    return res;
  }
}
