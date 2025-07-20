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

  useEffect(() => {
    const loadLanguages = async () => {
      const langs = await fetchLanguages();
      setLanguages(langs);
    };
    loadLanguages();
  }, []);

  const fetchtrans = async (e) => {
    e.preventDefault();
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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className='bg-gray-700 h-screen w-screen flex items-center justify-center'>
      <div className='bg-gray-800 w-1/2 h-1/2 rounded-lg shadow-lg flex flex-col items-center p-10'>
        <div className='bg-slate-700 rounded-2xl p-2 flex items-center justify-center gap-8 w-full text-2xl'>
          <input
            type="text"
            className='bg-blue-600 text-white p-2 rounded-2xl'
            onChange={(e) => setText(e.target.value)}
            placeholder='Enter your text'
          />
          <select
            name="Language"
            id="lang"
            className='bg-blue-600 p-2 rounded-2xl'
            value={lang}
            onChange={(e) => setLang(e.target.value)}
          >
            {languages.map((l) => (
              <option key={l.language} value={l.language}>
                {l.language}
              </option>
            ))}
          </select>
          <button
            className='bg-blue-600 p-2 rounded-2xl cursor-pointer hover:bg-blue-400'
            onClick={fetchtrans}
          >
            Submit
          </button>
        </div>
        <div className='bg-blue-600 text-orange-200 p-8 text-2xl my-auto'>{res}</div>
      </div>
    </main>
  );
}

export default App;
