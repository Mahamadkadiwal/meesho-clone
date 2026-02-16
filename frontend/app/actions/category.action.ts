"use server";
import { api } from "../_lib/api";

export async function createCategory(data: any) {
  const category = await api("/category", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return category;
}

export async function editCategory(id: string, data: any) {
  const category = await api(`/category/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return category;
}

export async function deleteCategory(id: string) {
  const category = await api(`/category/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return category;
}
