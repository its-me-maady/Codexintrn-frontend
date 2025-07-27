import React, { useState, useCallback, useEffect } from "react";

const App = () => {
  const [randomString, setRandomString] = useState("");
  const [length, setLength] = useState(8);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: false
  });
  const [copied, setCopied] = useState(false);

  const generateRandomString = useCallback(() => {
    let characters = "";
    if (options.uppercase) characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (options.lowercase) characters += "abcdefghijklmnopqrstuvwxyz";
    if (options.numbers) characters += "0123456789";
    if (options.symbols) characters += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (characters === "") {
      setRandomString("Please select at least one option");
      return;
    }

    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setRandomString(result);
    setCopied(false);
  }, [length, options]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(randomString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const handleOptionChange = (option) => {
    setOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }));
  };

  useEffect(() => {
    generateRandomString();
  }, [generateRandomString]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-purple-100">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              String Generator
            </h1>
            <p className="text-gray-600">Generate secure random strings instantly</p>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 mb-6 border border-purple-200">
            <p className="text-sm text-gray-600 mb-2">Generated String:</p>
            <div className="bg-white rounded-lg p-4 border border-purple-200 mb-3">
              <code className="text-lg font-mono text-purple-700 break-all">
                {randomString}
              </code>
            </div>
            <button 
              onClick={copyToClipboard}
              className="flex items-center gap-2 text-purple-600 hover:text-purple-800 font-medium transition-colors duration-200"
            >
              <span>{copied ? "✅" : "📋"}</span>
              {copied ? "Copied!" : "Copy to Clipboard"}
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-gray-700 font-medium">Length:</label>
              <input
                type="number"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                min="1"
                max="100"
                className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-center"
              />
            </div>
            
            <button
              onClick={generateRandomString}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Generate New String
            </button>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm font-medium text-gray-700 mb-3">Options:</p>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    checked={options.uppercase}
                    onChange={() => handleOptionChange('uppercase')}
                    className="mr-2 rounded focus:ring-purple-500 text-purple-600" 
                  />
                  Uppercase Letters
                </label>
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    checked={options.lowercase}
                    onChange={() => handleOptionChange('lowercase')}
                    className="mr-2 rounded focus:ring-purple-500 text-purple-600" 
                  />
                  Lowercase Letters
                </label>
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    checked={options.numbers}
                    onChange={() => handleOptionChange('numbers')}
                    className="mr-2 rounded focus:ring-purple-500 text-purple-600" 
                  />
                  Numbers
                </label>
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    checked={options.symbols}
                    onChange={() => handleOptionChange('symbols')}
                    className="mr-2 rounded focus:ring-purple-500 text-purple-600" 
                  />
                  Special Symbols
                </label>
              </div>
            </div>

            <div className="bg-purple-50 rounded-lg p-4">
              <p className="text-sm font-medium text-purple-700 mb-2">String Info:</p>
              <div className="text-sm text-purple-600 space-y-1">
                <div>Length: {randomString.length} characters</div>
                <div>Contains uppercase: {/[A-Z]/.test(randomString) ? "Yes" : "No"}</div>
                <div>Contains lowercase: {/[a-z]/.test(randomString) ? "Yes" : "No"}</div>
                <div>Contains numbers: {/\d/.test(randomString) ? "Yes" : "No"}</div>
                <div>Contains symbols: {/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(randomString) ? "Yes" : "No"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
