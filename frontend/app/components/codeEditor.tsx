
import React, { useState } from 'react';
import { Editor } from "@monaco-editor/react";
import OutputPane from './outputPane';


interface CodeEditorProps {
    code: string;
    handleCodeChange: (value: string | undefined) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({code, handleCodeChange}) => {
  return (
          <Editor
            className="h-full w-full"
            options={{
              padding: {
                top: 6,
                bottom: 6
              },
              minimap: {
                enabled: false,
              },
            }}
            theme="vs-dark"
            language="python"
            value={code}
            onChange={handleCodeChange}
          />


  );
};

export default CodeEditor;