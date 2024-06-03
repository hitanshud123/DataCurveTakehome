import { API_URL } from "./baseUrl";

export interface CodeOutput {
  stdout: string;
  stderr: string;
  retval: number;
}

export default async function runCode(code: string): Promise<CodeOutput> {
  try {
    console.log(API_URL + "run-code/");
    const res = await fetch(API_URL + "run-code/", {
      method: "POST",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({ code: code }),
    });

    const output = await res.json();
    return output;
  } catch {
    throw new Error("Failed to Run Code");
  }
}
