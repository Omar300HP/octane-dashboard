import { Provider } from "react-redux";
import { store } from "./store";

type ReduxStoreProps = {
  children: React.ReactNode;
};

const ReduxStore: React.FC<ReduxStoreProps> = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

export { ReduxStore };
