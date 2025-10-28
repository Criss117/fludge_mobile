import { env } from "@/modules/shared/lib/config";
import { AuthActions } from "@/shared/api-utils/actions/auth.actions";
import { BusinessesActions } from "@/shared/api-utils/actions/businesses.actions";
import { API } from "@/shared/api-utils/api";
import { AuthMutationsOptions } from "@/shared/react-query/auth/mutations";
import { AuthQueriesOptions } from "@/shared/react-query/auth/queries";
import { BusinessQueriesOptions } from "@/shared/react-query/businesses/queries";

export const api = new API(env.EXPO_PUBLIC_API_URL);

//Auth Actions
export const authActions = new AuthActions(api);
export const businessesActions = new BusinessesActions(api);

//Auth Queries
export const authQueriesOptions = new AuthQueriesOptions(authActions);
export const authMutationsOptions = new AuthMutationsOptions(authActions);

//Business Queries
export const businessQueriesOptions = new BusinessQueriesOptions(
  businessesActions
);
