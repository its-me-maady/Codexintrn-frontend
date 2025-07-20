import React, { useState, useCallback, useEffect } from "react";

const App = () => {
  const [randomString, setRandomString] = useState("");
  const [length, setLength] = useState(8);

  const generateRandomString = useCallback(() => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setRandomString(result);
  }, [length]);

  useEffect(() => {
    generateRandomString();
  }, [generateRandomString]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Random String Generator</h1>
      <p className="text-lg mb-4">
        Generated String: <span className="font-mono text-green-600">{randomString}</span>
      </p>
      <div className="flex items-center mb-4">
        <label className="text-gray-700 font-medium mr-2">String Length:</label>
        <input
          type="number"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          min="1"
          className="w-16 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        onClick={generateRandomString}
        className="px-6 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Generate New String
      </button>
    </div>
  );
};

export default App;
