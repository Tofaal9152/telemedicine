"use server";

import apiServer from "@/lib/apiServer";


async function fetchServerData<T>(url: string): Promise<{
  data: T | null;
  error: string | null;
}> {
  try {
    const res = await apiServer.get<T>(url);
    console.log(res.data);
    return {
      data: res.data,
      error: null,
    };
  } catch (err: any) {
    return {
      data: null,
      error: err?.message || "Something went wrong",
    };
  }
}
export default fetchServerData;
