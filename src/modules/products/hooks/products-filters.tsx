import { createContext, use, useReducer } from "react";

interface ProvidersProps {
  children: React.ReactNode;
  initialState?: Filters;
}

interface Filters {
  name?: string | null;
  categoryId?: string | null;
  limit: number;
  barcode?: string | null;
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
      type: "set:barcode";
      payload: string | null;
    }
  | {
      type: "clear:filters";
    };

interface Context {
  filters: Filters;
  filtersDispatch: React.ActionDispatch<[action: FiltersActions]>;
}

const ProductsFiltersContext = createContext<Context | null>(null);

export function useProductsFilters() {
  const context = use(ProductsFiltersContext);

  if (!context) {
    throw new Error(
      "useProductsFilters must be used within a ProductsListProvider"
    );
  }

  return context;
}

function filtersReducer(state: Filters, action: FiltersActions): Filters {
  switch (action.type) {
    case "set:limit":
      return {
        ...state,
        limit: action.payload,
      };
    case "set:name":
      return {
        ...state,
        name: action.payload?.trim().toLowerCase(),
      };
    case "set:categoryId":
      return {
        ...state,
        categoryId: action.payload,
      };

    case "set:barcode":
      return {
        ...state,
        barcode: action.payload,
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
