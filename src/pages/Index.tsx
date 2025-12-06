// Update this page (the content is just a fallback if you fail to update the page)

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, [navigate]);

  return null;
};

export default Index;
