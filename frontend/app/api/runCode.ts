export interface CodeOutput {
    stdout: string;
    stderr: string;
    retval: number;
}

export default async function runCode(code: string): Promise<CodeOutput>  {
    try {
        const res = await fetch('http://127.0.0.1:8000/run-code/', {
        method: 'POST',
        headers: {
            'content-type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify({ code: code }),
        });

        const output = await res.json();
        return output
    } catch {
        throw new Error("Failed to Run Code")
    }
}