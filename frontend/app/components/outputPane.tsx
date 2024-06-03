import { useState } from "react";

interface OutputPaneProps {
  output: string;
}

const OutputPane: React.FC<OutputPaneProps> = ({ output }) => {
  return (
    <div>
      <p className="text-lg mb-2">Output</p>
      <pre className="text-white text-sm">{output}</pre>
    </div>
  );
};

export default OutputPane;
