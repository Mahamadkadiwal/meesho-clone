"use server";

import { cookies } from "next/headers";
import { api } from "../_lib/api";

export async function createUser(data: any) {
  const user = await api("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });

  (await cookies()).set("access_token", user.access_token, {
    httpOnly: true,
    secure: false,
  });

  (await cookies()).set("refresh_token", user.refresh_token, {
    httpOnly: true,
    secure: false,
  });

  (await cookies()).set("role", user.role, {
    httpOnly: true,
    secure: false,
  });

  (await cookies()).set("user_id", user.sub, {
    httpOnly: true,
    secure: false,
  });

  return user;
}

export async function loginUser(data: any) {
  const user = await api("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });

  (await cookies()).set("access_token", user.access_token, {
    httpOnly: true,
    secure: false,
  });

  (await cookies()).set("refresh_token", user.refresh_token, {
    httpOnly: true,
    secure: false,
  });

  (await cookies()).set("role", user.role, {
    httpOnly: true,
    secure: false,
  });

  (await cookies()).set("user_id", user.sub, {
    httpOnly: true,
    secure: false,
  });

  return user;
}

export async function logoutUser(data: any) {
  const user = await api("/auth/logout", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return user;
}
