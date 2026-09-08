import { useEffect } from "react";
import { useAuthStore } from "../../../stores";

export default function AuthInitializer() {
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    void initialize();
  }, [initialize]);

  return null;
}
