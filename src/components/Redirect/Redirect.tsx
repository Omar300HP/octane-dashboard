import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface RedirectProps {
  to: string;
  from?: string;
}

const Redirect: React.FC<RedirectProps> = ({ to, from }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if ((from && location.pathname === from) || !from) {
      navigate(to);
    }
  }, [location]);

  return null;
};

export { Redirect };
