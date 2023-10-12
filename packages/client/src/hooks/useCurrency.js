import { createContext, useContext, useReducer } from "react";

const initialState = {
  currencySymbol: "$",
  multiplierFactor: 1,
};

export const CurrencyContext = createContext(initialState);

CurrencyContext.displayName = "CurrencyContext";

function currencyReducer(state, action) {
  switch (action.type) {
    case "SET_CURRENCY": {
      return {
        ...state,
        currencySymbol: action.payload.currencySymbol,
        multiplierFactor: action.payload.multiplierFactor,
      };
    }
    default:
      return state;
  }
}

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error(`useCurrency must be used within a CurrencyProvider`);
  }
  return context;
};

export const CurrencyProvider = (props) => {
  const [state, dispatch] = useReducer(currencyReducer, initialState);

  const setCurrency = (currencySymbol, multiplierFactor) =>
    dispatch({
      type: "SET_CURRENCY",
      payload: { currencySymbol, multiplierFactor },
    });

  const getPrice = (amount) => {
    const convertedAmount = (amount * state.multiplierFactor).toFixed(2);
    return `${state.currencySymbol}${convertedAmount}`;
  };

  return (
    <CurrencyContext.Provider
      value={{ currencySymbol: state.currencySymbol, setCurrency, getPrice }}
      {...props}
    />
  );
};
export const ManagedCurrencyContext = ({ children }) => (
  <CurrencyProvider>{children}</CurrencyProvider>
);
