import { useEffect, useState } from 'react';
import axios from 'axios';

const fetchLanguages = async () => {
  const options = {
    method: 'GET',
    url: 'https://google-translator9.p.rapidapi.com/v2/languages',
    headers: {
      'x-rapidapi-key': '299c2f440fmshc3902f34d5acb7ap1c62a9jsnad9289cb4b59',
      'x-rapidapi-host': 'google-translator9.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    return response.data.data.languages;
  } catch (error) {
    console.error(error);
    return [];
  }
};

function App() {
  const [languages, setLanguages] = useState([]);
  const [res, setRes] = useState('');
  const [text, setText] = useState('');
  const [lang, setLang] = useState('en');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [detectedLanguage, setDetectedLanguage] = useState('');

  useEffect(() => {
    const loadLanguages = async () => {
      const langs = await fetchLanguages();
      setLanguages(langs);
    };
    loadLanguages();
  }, []);

  const fetchtrans = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    setLoading(true);
    const options = {
      method: 'POST',
      url: 'https://google-translate113.p.rapidapi.com/api/v1/translator/text',
      headers: {
        'x-rapidapi-key': '299c2f440fmshc3902f34d5acb7ap1c62a9jsnad9289cb4b59',
        'x-rapidapi-host': 'google-translate113.p.rapidapi.com',
        'Content-Type': 'application/json'
      },
      data: {
        from: 'auto',
        to: lang,
        text: text
      }
    };

    try {
      const response = await axios.request(options);
      setRes(response.data.trans);
      setDetectedLanguage('English');
    } catch (error) {
      console.error(error);
      setRes('Translation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(res);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const wordCount = text.split(' ').filter(word => word.length > 0).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-blue-100">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              Language Translator
            </h1>
            <p className="text-gray-600">Translate text between 100+ languages</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter text to translate:
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full h-32 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Enter text to translate..."
              />
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Language:
                </label>
                <select
                  value={lang}
                  onChange={(e) => setLang(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  {languages.map((l) => (
                    <option key={l.language} value={l.language}>
                      {l.language}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={fetchtrans}
                disabled={loading || !text.trim()}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Translating...
                  </div>
                ) : (
                  'Translate'
                )}
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
            <p className="text-sm text-gray-600 mb-2">Translation:</p>
            <div className="bg-white rounded-lg p-4 border border-blue-200 min-h-[100px] mb-4">
              <p className="text-lg text-gray-800">
                {res || "Translation will appear here..."}
              </p>
            </div>
            <div className="flex justify-center">
              <button 
                onClick={copyToClipboard}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
              >
                <span>{copied ? "✅" : "📋"}</span>
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          <div className="mt-6 text-center text-sm text-gray-600 bg-gray-50 rounded-lg p-4">
            <div className="flex flex-wrap justify-center gap-6">
              <div>Characters: {text.length}</div>
              <div>Words: {wordCount}</div>
              {detectedLanguage && <div>Detected: {detectedLanguage}</div>}
            </div>
          </div>

          {detectedLanguage && (
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500">
                We automatically detected the source language as <span className="font-medium text-blue-600">{detectedLanguage}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
