// src/app/page.tsx
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Head from 'next/head';

interface TextData {
  title?: string;
  content?: string;
  book?: string;
  author?: string;
  // Add other properties as needed
}

function HomePage() {
  const [currentText, setCurrentText] = useState<TextData>({});
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    fetchTexts(language);
  }, [language]);

const fetchTexts = async (lang: string) => {
  try {
    const response = await fetch(`/api/text/${lang}`); // Updated URL

      const files = await response.json();
      console.log('Available files:', files);
      if (files.length > 0) {
        const randomFile = files[Math.floor(Math.random() * files.length)];
        const fileContent = await fetch(`/texts/${lang}/${randomFile}`);
        const data = await fileContent.json();
        setCurrentText(data);
      } else {
        console.log("No texts available for this language.");
        setCurrentText({});
      }
    } catch (error) {
      console.error("Failed to fetch texts:", error); // Keep the error handling
    }
  };

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    fetchTexts(lang);
  };

  const copyToClipboard = () => {
    if (currentText.content) {
      navigator.clipboard.writeText(currentText.content);
    }
  };

  return (
    <>
      {/* Favicon and meta tags */}
      <Head>
        <title>Public Domain Texts</title>
        <link rel="icon" href="/icon.png" />
      </Head>

      <div className="flex flex-col justify-start items-center min-h-screen px-4 py-8">
        <div className="max-w-2xl w-full">
          <h1 className="text-2xl font-bold flex items-center">
          <Image src="/icon.png" alt="Logo" width={32} height={32} className="w-8 h-8 mr-2" />
            Public-Domain Text Examples
          </h1>

          <div className="my-4">
            {['en', 'es', 'fr', 'de', 'it', 'pt'].map((lang) => (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className={`px-4 py-2 m-1 rounded ${language === lang ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="max-w-full p-4 border rounded-lg bg-gray-100 shadow-lg">
            {currentText?.title && <h2 className="text-lg font-semibold">{currentText.title}</h2>}
            {currentText?.book && <p className="italic">From: {currentText.book}</p>}
            {currentText?.author && <p className="font-medium">By: {currentText.author}</p>}
            <p className="mt-4 whitespace-pre-line">{currentText.content}</p>

            <div className="flex justify-between mt-4">
              <button onClick={copyToClipboard} className="px-4 py-2 bg-gray-300 rounded text-sm">
                Copy Text
              </button>
              <button onClick={() => fetchTexts(language)} className="px-4 py-2 bg-blue-300 rounded text-sm">
                New Excerpt
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
