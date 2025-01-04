import { Toaster } from "@/components/ui/toaster";
import Providers from "@/providers";
import { Router } from "@/routes/Router";

const App = () => {
  return (
    <Providers>
      <div className="w-full h-full bg-amber-200">
        App
        <Router />
      </div>

      <Toaster />
    </Providers>
  );
};

export default App;
