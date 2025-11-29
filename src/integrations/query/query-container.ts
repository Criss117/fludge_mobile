import { env } from "@/modules/shared/lib/config";
import { AuthActions } from "@/shared/api-utils/actions/auth.actions";
import { BusinessesActions } from "@/shared/api-utils/actions/businesses.actions";
import { CategoriesActions } from "@/shared/api-utils/actions/categories.actions";
import { EmployeesActions } from "@/shared/api-utils/actions/employees.actions";
import { GroupsActions } from "@/shared/api-utils/actions/groups.actions";
import { ProductsActions } from "@/shared/api-utils/actions/products.actions";
import { TicketsActions } from "@/shared/api-utils/actions/tickets.actions";
import { API } from "@/shared/api-utils/api";
import { AuthMutationsOptions } from "@/shared/react-query/auth/mutations";
import { AuthQueriesOptions } from "@/shared/react-query/auth/queries";
import { BusinessesMutationsOptions } from "@/shared/react-query/businesses/mutation";
import { BusinessQueriesOptions } from "@/shared/react-query/businesses/queries";
import { CategoriesMutationsOptions } from "@/shared/react-query/categories/mutations";
import { EmployeesMutationsOptions } from "@/shared/react-query/employees/mutations";
import { EmployeesQueriesOptions } from "@/shared/react-query/employees/queries";
import { GroupsMutationsOptions } from "@/shared/react-query/groups/mutations";
import { GroupsQueriesOptions } from "@/shared/react-query/groups/queries";
import { ProductsMutationsOptions } from "@/shared/react-query/products/mutations";
import { ProductsQueriesOptions } from "@/shared/react-query/products/queries";
import { TicketsMutationsOptions } from "@/shared/react-query/tickets/mutations";
import { TicketsQueriesOptions } from "@/shared/react-query/tickets/queries";

export const api = new API(
  env.EXPO_PUBLIC_API_URL || "http://192.168.101.9:8080/api"
);

//Auth Actions
export const authActions = new AuthActions(api);
export const businessesActions = new BusinessesActions(api);
export const groupsActions = new GroupsActions(api);
export const employeesActions = new EmployeesActions(api);
export const productsActions = new ProductsActions(api);
export const categoriesActions = new CategoriesActions(api);
export const ticketsActions = new TicketsActions(api);

//Auth Queries
export const authQueriesOptions = new AuthQueriesOptions(authActions);
export const authMutationsOptions = new AuthMutationsOptions(authActions);

//Business Queries
export const businessQueriesOptions = new BusinessQueriesOptions(
  businessesActions
);
export const businessesMutationsOptions = new BusinessesMutationsOptions(
  businessesActions
);

//Groups Queries
export const groupsQueriesOptions = new GroupsQueriesOptions(groupsActions);
export const groupsMutationsOptions = new GroupsMutationsOptions(groupsActions);

//Employees Queries
export const employeesQueriesOptions = new EmployeesQueriesOptions(
  employeesActions
);
export const employeesMutationsOptions = new EmployeesMutationsOptions(
  employeesActions
);

//Products Queries
export const productsQueriesOptions = new ProductsQueriesOptions(
  productsActions
);
export const productsMutationsOptions = new ProductsMutationsOptions(
  productsActions
);

//Categories Queries
// export const categoriesQueriesOptions = new CategoriesQueriesOptions(
//   categoriesActions
// );
export const categoriesMutationsOptions = new CategoriesMutationsOptions(
  categoriesActions
);

//Tickets Queries
export const ticketsQueriesOptions = new TicketsQueriesOptions(ticketsActions);
export const ticketsMutationsOptions = new TicketsMutationsOptions(
  ticketsActions
);
