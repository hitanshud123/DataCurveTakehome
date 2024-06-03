'use client';

import React, { useState } from 'react';

import CodeEditor from './components/codeEditor';
import OutputPane from './components/outputPane';
import runCode, { CodeOutput } from './api/runCode';
import submitCode from './api/submitCode';

const Home: React.FC = () => {
  const STARTERCODE = "print('Hello World!')"
  const [code, setCode] = useState<string>(STARTERCODE);
  const [output, setOutput] = useState<string>('-');

  const handleCodeChange = (newValue: string | undefined) => {
    if (newValue) {
        setCode(newValue);
        console.log(code)
    }
  };

  const handleRunCode = async () => {
    setOutput("Running...")
    try {
      const res = await runCode(code) 
      if (res.retval != 0) {
        setOutput(res.stdout + res.stderr)
      } else {
        setOutput(res.stdout)
      }
    } catch {
      alert("Failed to Run Code")
      setOutput("-")
    }
  }

  const handleSubmit = async () => {
    const prevOutput = output
    setOutput("Running...")
    try {
      const res = await runCode(code) 
      if (res.retval != 0) {
        setOutput(res.stdout + res.stderr)
      } else {
        setOutput(res.stdout)
      }
      await submitCode(code, output)
      alert("Code Submitted!!")
    } catch {
      alert("Failed to Submit Code")
      setOutput(prevOutput)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center p-4">
      <div className="flex justify-center mb-2">
        <button 
          className="bg-gray-900 hover:bg-gray-800 text-white py-2 px-4 mx-2 rounded"
          onClick={() => handleRunCode()}
        >
          Run Code
        </button>
        <button 
          className="bg-gray-900 hover:bg-gray-800 text-white py-2 px-4 mx-2 mr-7 rounded"
          onClick={() => handleSubmit()}
        >
          Submit
        </button>
      </div>

      <div className="output flex flex-col md:flex-row w-full flex-1">
        <div className="md:w-1/2 m-1 bg-gray-800 p-2 rounded">
          <CodeEditor
            code={code}
            handleCodeChange={handleCodeChange}
          />
        </div>
        <div className="md:w-1/2  bg-gray-800 p-2 m-1 rounded overflow-auto">
          <OutputPane output={output}/>
        </div>
      </div>
    </div>

  );
};

export default Home;
