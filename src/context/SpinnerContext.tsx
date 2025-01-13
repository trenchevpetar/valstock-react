import { createContext, useState, useContext, ReactNode } from "react";

interface SpinnerContextType {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

const SpinnerContext = createContext<SpinnerContextType>({
  isLoading: false,
  setLoading: () => {}
})

// eslint-disable-next-line react-refresh/only-export-components
export const useSpinner = () => useContext(SpinnerContext)

export const SpinnerProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <SpinnerContext.Provider value={{ isLoading, setLoading: setIsLoading }}>
      {children}
    </SpinnerContext.Provider>
  )
}

