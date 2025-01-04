import Providers from "./providers";
import { Router } from "./routes/Router";

const App = () => {
  return (
    <Providers>
      <div className="w-full h-full bg-amber-200">
        App
        <Router />
      </div>
    </Providers>
  );
};

export default App;
