import { useState } from 'react';
import { WifiSecurity, SocialPlatform } from '../types/qr';
import { generateWifiString, stripEmoji } from '../utils/qr';

interface WifiFormProps {
  onGenerate: (content: string, platform?: SocialPlatform) => void;
}

export function WifiForm({ onGenerate }: WifiFormProps) {
  const [ssid, setSsid] = useState('');
  const [password, setPassword] = useState('');
  const [security, setSecurity] = useState<WifiSecurity>('WPA');
  const [hidden, setHidden] = useState(false);
  const [errors, setErrors] = useState<{ ssid?: string; password?: string }>({});
  const [warning, setWarning] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { ssid?: string; password?: string } = {};
    
    const cleanSsid = stripEmoji(ssid.trim());
    if (!cleanSsid) {
      newErrors.ssid = 'Network name is required';
    } else if (cleanSsid.length > 32) {
      setWarning('SSID is longer than 32 characters - may not work on all devices');
    }
    
    if (security !== 'nopass' && !password.trim()) {
      newErrors.password = 'Password is required for secured networks';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setErrors({});
    const wifiString = generateWifiString({
      ssid: cleanSsid,
      password: password.trim(),
      security,
      hidden,
    });
    onGenerate(wifiString);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="brutal-label">Network Name (SSID)</label>
        <input
          type="text"
          value={ssid}
          onChange={(e) => { setSsid(e.target.value); setErrors({}); setWarning(''); }}
          placeholder="MyWiFiNetwork"
          className={`brutal-input ${errors.ssid ? 'border-red-500' : ''}`}
        />
        {errors.ssid && <p className="text-red-500 font-bold mt-2 text-sm">{errors.ssid}</p>}
        {warning && <p className="text-yellow-600 font-bold mt-2 text-sm">{warning}</p>}
      </div>
      
      <div>
        <label className="brutal-label">Security Type</label>
        <select
          value={security}
          onChange={(e) => setSecurity(e.target.value as WifiSecurity)}
          className="brutal-select"
        >
          <option value="WPA">WPA / WPA2 / WPA3</option>
          <option value="WEP">WEP</option>
          <option value="nopass">Open (No Password)</option>
        </select>
      </div>
      
      {security !== 'nopass' && (
        <div>
          <label className="brutal-label">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setErrors({}); }}
            placeholder="Enter password"
            className={`brutal-input ${errors.password ? 'border-red-500' : ''}`}
          />
          {errors.password && <p className="text-red-500 font-bold mt-2 text-sm">{errors.password}</p>}
        </div>
      )}
      
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="hidden"
          checked={hidden}
          onChange={(e) => setHidden(e.target.checked)}
          className="w-6 h-6 border-4 border-black cursor-pointer"
        />
        <label htmlFor="hidden" className="font-bold cursor-pointer">Hidden Network</label>
      </div>
      
      <button type="submit" className="brutal-button w-full">
        Generate WiFi QR
      </button>
    </form>
  );
}
