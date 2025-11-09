import { createContext, use, useReducer } from "react";

interface ProvidersProps {
  children: React.ReactNode;
  initialState?: Filters;
}

interface Filters {
  name?: string | null;
  categoryId?: string | null;
  limit: number;
}

interface Context {
  filters: Filters;
  filtersDispatch: React.ActionDispatch<[action: FiltersActions]>;
}

type FiltersActions =
  | {
      type: "set:name";
      payload: string | null;
    }
  | {
      type: "set:categoryId";
      payload: string | null;
    }
  | {
      type: "set:limit";
      payload: number;
    }
  | {
      type: "clear:filters";
    };

const ProductsFiltersContext = createContext<Context | null>(null);

export function useProductsList() {
  const context = use(ProductsFiltersContext);

  if (!context) {
    throw new Error(
      "useProductsList must be used within a ProductsListProvider"
    );
  }

  return context;
}

function filtersReducer(state: Filters, action: FiltersActions) {
  switch (action.type) {
    case "set:limit":
      return {
        ...state,
        limit: action.payload,
      };
    case "set:name":
      return {
        ...state,
        name: action.payload,
      };
    case "set:categoryId":
      return {
        ...state,
        categoryId: action.payload,
      };

    case "clear:filters":
      return {
        name: null,
        categoryId: null,
        limit: 5,
      };
    default:
      return state;
  }
}

export function ProductsFiltersProvider({
  children,
  initialState = {
    limit: 20,
    categoryId: null,
    name: null,
  },
}: ProvidersProps) {
  const [filters, dispatch] = useReducer(filtersReducer, initialState);

  return (
    <ProductsFiltersContext.Provider
      value={{
        filters,
        filtersDispatch: dispatch,
      }}
    >
      {children}
    </ProductsFiltersContext.Provider>
  );
}
