import { clientFetch } from "@/lib/api/clientFetch";

export const getAllCategories = () => clientFetch("/categories");
