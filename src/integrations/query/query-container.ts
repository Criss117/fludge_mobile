import { env } from "@/modules/shared/lib/config";
import { AuthActions } from "@/shared/api-utils/actions/auth.actions";
import { BusinessesActions } from "@/shared/api-utils/actions/businesses.actions";
import { GroupsActions } from "@/shared/api-utils/actions/groups.actions";
import { API } from "@/shared/api-utils/api";
import { AuthMutationsOptions } from "@/shared/react-query/auth/mutations";
import { AuthQueriesOptions } from "@/shared/react-query/auth/queries";
import { BusinessQueriesOptions } from "@/shared/react-query/businesses/queries";
import { GroupsMutationsOptions } from "@/shared/react-query/groups/mutations";
import { GroupsQueriesOptions } from "@/shared/react-query/groups/queries";

export const api = new API(env.EXPO_PUBLIC_API_URL);

//Auth Actions
export const authActions = new AuthActions(api);
export const businessesActions = new BusinessesActions(api);
export const groupsActions = new GroupsActions(api);

//Auth Queries
export const authQueriesOptions = new AuthQueriesOptions(authActions);
export const authMutationsOptions = new AuthMutationsOptions(authActions);

//Business Queries
export const businessQueriesOptions = new BusinessQueriesOptions(
  businessesActions
);

//Groups Queries
export const groupsQueriesOptions = new GroupsQueriesOptions(groupsActions);
export const groupsMutationsOptions = new GroupsMutationsOptions(groupsActions);
