import ReduxStore from "./store";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return <ReduxStore>{children}</ReduxStore>;
};

export { Providers };
