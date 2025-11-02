
import React, { useState, useCallback } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';

import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { StyleGrid } from './components/StyleGrid';
import { PromptInput } from './components/PromptInput';
import { GenerateButton } from './components/GenerateButton';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ResultDisplay } from './components/ResultDisplay';
import { STYLES } from './constants';
import { editImageWithGemini } from './services/geminiService';
import type { Style } from './types';
import { fileToBase64 } from './services/utils';

const App: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<{ file: File, base64: string } | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<Style | null>(STYLES[0]);
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = useCallback(async (file: File) => {
    try {
      if (file.size > 10 * 1024 * 1024) {
        setError('File size must not exceed 10 MB.');
        return;
      }
      setError(null);
      const base64 = await fileToBase64(file);
      setUploadedImage({ file, base64 });
    } catch (err) {
      setError('Failed to read the image file.');
      console.error(err);
    }
  }, []);

  const handleGenerate = useCallback(async () => {
    if (!uploadedImage) {
      setError('Please upload an image first.');
      return;
    }

    const prompt = customPrompt.trim() || selectedStyle?.prompt;
    if (!prompt) {
      setError('Please select a style or enter a custom prompt.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const resultBase64 = await editImageWithGemini(
        uploadedImage.base64,
        uploadedImage.file.type,
        prompt
      );
      setGeneratedImage(`data:image/png;base64,${resultBase64}`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Generation failed: ${errorMessage}`);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [uploadedImage, customPrompt, selectedStyle]);

  const handleReset = useCallback(() => {
    setUploadedImage(null);
    setSelectedStyle(STYLES[0]);
    setCustomPrompt('');
    setGeneratedImage(null);
    setError(null);
    setIsLoading(false);
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return <LoadingSpinner />;
    }
    if (generatedImage) {
      return <ResultDisplay generatedImage={generatedImage} onReset={handleReset} />;
    }
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <ImageUploader onImageUpload={handleImageUpload} uploadedImage={uploadedImage?.base64 ?? null} />
        {error && <div className="text-red-400 text-center bg-red-900/50 p-3 rounded-lg">{error}</div>}
        <StyleGrid styles={STYLES} selectedStyle={selectedStyle} onStyleSelect={setSelectedStyle} />
        <PromptInput value={customPrompt} onChange={setCustomPrompt} />
        <GenerateButton onClick={handleGenerate} disabled={!uploadedImage || isLoading} />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/60 to-blue-900/80 text-white selection:bg-purple-500 selection:text-white">
      <main className="py-12 md:py-20">
        <Header />
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
