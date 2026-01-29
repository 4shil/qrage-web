import { useState } from 'react';
import { SocialPlatform } from '../types/qr';
import { isValidUrl, ensureHttps } from '../utils/qr';

interface URLFormProps {
  onGenerate: (content: string, platform?: SocialPlatform) => void;
}

export function URLForm({ onGenerate }: URLFormProps) {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      setError('URL is required');
      return;
    }
    const fullUrl = ensureHttps(url.trim());
    if (!isValidUrl(url.trim())) {
      setError('Invalid URL format');
      return;
    }
    setError('');
    onGenerate(fullUrl);
  };

  const handleChange = (value: string) => {
    setUrl(value);
    if (error) setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="brutal-label">Website URL</label>
        <input
          type="text"
          value={url}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="example.com"
          className={`brutal-input ${error ? 'border-red-500' : ''}`}
        />
        {error && <p className="text-red-500 font-bold mt-2 text-sm">{error}</p>}
        <p className="text-gray-600 text-sm mt-2">https:// will be added automatically if missing</p>
      </div>
      <button type="submit" className="brutal-button w-full">
        Generate QR Code
      </button>
    </form>
  );
}
