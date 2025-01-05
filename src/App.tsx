import { Toaster } from "@/components/ui/toaster";
import Providers from "@/providers";
import { Router } from "@/routes/Router";

const App = () => {
  return (
    <Providers>
      <Router />
      <Toaster />
    </Providers>
  );
};

export default App;
