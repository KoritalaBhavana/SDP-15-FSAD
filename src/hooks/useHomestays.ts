import { useEffect, useState } from "react";
import { homestaysApi } from "@/lib/api";
import { getAllHomestays } from "@/lib/homestayStore";
import { adaptHomestay, type FrontendHomestay } from "@/lib/homestayApiAdapter";

export const useHomestays = () => {
  const [homestays, setHomestays] = useState<FrontendHomestay[]>(() => getAllHomestays());

  useEffect(() => {
    let ignore = false;

    const loadHomestays = async () => {
      try {
        const response = await homestaysApi.getAll();
        if (!ignore && Array.isArray(response) && response.length > 0) {
          setHomestays(response.map(adaptHomestay));
        }
      } catch {
        // Keep local fallback data when the backend is not reachable yet.
      }
    };

    loadHomestays();

    return () => {
      ignore = true;
    };
  }, []);

  return homestays;
};
