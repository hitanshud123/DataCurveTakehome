import { API_URL } from "./baseUrl";

export default async function submitCode(code: string, output: string) {
  try {
    const res = await fetch(API_URL + "submission/", {
      method: "POST",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({ code: code, output: output, userid: 0 }),
    });
  } catch {
    throw new Error("Failed to Run Code");
  }
}
