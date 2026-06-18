import { serverFetch } from "@/lib/api/serverFetch";

export const getAllCategories = () => serverFetch("/categories");
