
import React, { useState, useCallback } from 'react';
import { addWatermark } from '../services/utils';
import { DownloadIcon, ShareIcon, RefreshIcon } from './IconComponents';

interface ResultDisplayProps {
  generatedImage: string;
  onReset: () => void;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ generatedImage, onReset }) => {
  const [isWatermarking, setIsWatermarking] = useState(false);

  const handleDownload = (withWatermark: boolean) => async () => {
    if (withWatermark) {
      setIsWatermarking(true);
      try {
        const watermarkedImage = await addWatermark(generatedImage);
        downloadImage(watermarkedImage, 'trendify-ai-watermarked.jpg');
      } catch (error) {
        console.error('Failed to add watermark:', error);
        alert('Could not add watermark. Please try again.');
      } finally {
        setIsWatermarking(false);
      }
    } else {
      // Here you would typically show a rewarded ad before downloading.
      // For this example, we'll just allow the download.
      alert('Watch a short ad to download without a watermark! (Ad simulation)');
      downloadImage(generatedImage, 'trendify-ai-image.jpg');
    }
  };

  const downloadImage = (dataUrl: string, filename: string) => {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = useCallback(() => {
    if (navigator.share) {
        fetch(generatedImage)
            .then(res => res.blob())
            .then(blob => {
                const file = new File([blob], 'trendify-ai-image.png', { type: 'image/png' });
                navigator.share({
                    title: 'My Trendify AI Art',
                    text: 'Check out the amazing AI art I created with Trendify AI!',
                    files: [file]
                }).catch(error => console.log('Error sharing:', error));
            });
    } else {
        alert('Web Share API is not supported in your browser. Try downloading the image instead.');
    }
  }, [generatedImage]);


  return (
    <div className="w-full max-w-4xl mx-auto px-4 flex flex-col items-center gap-8 animate-[fadeIn_0.5s_ease-in-out]">
        <style>{`
            @keyframes fadeIn {
                from { opacity: 0; transform: scale(0.95); }
                to { opacity: 1; transform: scale(1); }
            }
        `}</style>
      <h2 className="text-3xl font-bold text-center">Your Masterpiece is Ready!</h2>
      <div className="w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl shadow-purple-900/40">
        <img src={generatedImage} alt="Generated AI art" className="w-full h-auto" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-lg">
        <button onClick={handleDownload(true)} disabled={isWatermarking} className="flex items-center justify-center gap-2 w-full bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors disabled:bg-gray-500">
            <DownloadIcon />
            {isWatermarking ? 'Processing...' : 'Download With Watermark'}
        </button>
         <button onClick={handleDownload(false)} className="flex items-center justify-center gap-2 w-full bg-green-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-600 transition-colors">
            <DownloadIcon />
            Download (No Watermark)
        </button>
      </div>
       <div className="flex items-center gap-4">
        <button onClick={handleShare} className="flex items-center justify-center gap-2 text-purple-200 hover:text-white transition-colors">
            <ShareIcon />
            Share
        </button>
        <button onClick={onReset} className="flex items-center justify-center gap-2 text-purple-200 hover:text-white transition-colors">
            <RefreshIcon />
            Create Another
        </button>
      </div>
    </div>
  );
};
