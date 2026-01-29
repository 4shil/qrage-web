import QRCode from 'qrcode';
import { WifiData, SocialData, SOCIAL_PLATFORMS, QRStyle } from '../types/qr';

export function generateWifiString(data: WifiData): string {
  const { ssid, password, security, hidden } = data;
  const escapedSsid = escapeWifiField(ssid);
  const escapedPassword = escapeWifiField(password);
  return `WIFI:T:${security};S:${escapedSsid};P:${escapedPassword};H:${hidden};;`;
}

export function escapeWifiField(field: string): string {
  return field
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/:/g, '\\:')
    .replace(/"/g, '\\"');
}

export function stripEmoji(text: string): string {
  return text.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '');
}

export function generateSocialUrl(data: SocialData): string {
  const platform = SOCIAL_PLATFORMS[data.platform];
  if (data.platform === 'custom') {
    return ensureHttps(data.username);
  }
  const username = data.username.replace(/^[@+]/, '');
  return `${platform.baseUrl}${username}`;
}

export function ensureHttps(url: string): string {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`;
  }
  return url;
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(ensureHttps(url));
    return true;
  } catch {
    return false;
  }
}

export function checkContrast(fg: string, bg: string): boolean {
  const getLuminance = (hex: string): number => {
    const rgb = parseInt(hex.slice(1), 16);
    const r = ((rgb >> 16) & 0xff) / 255;
    const g = ((rgb >> 8) & 0xff) / 255;
    const b = (rgb & 0xff) / 255;
    const toLinear = (c: number) => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
  };
  const l1 = getLuminance(fg);
  const l2 = getLuminance(bg);
  const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  return ratio >= 4.5;
}

export async function generateQRDataUrl(content: string, style: QRStyle): Promise<string> {
  return await QRCode.toDataURL(content, {
    errorCorrectionLevel: style.errorCorrection,
    margin: 2,
    width: 300,
    color: {
      dark: style.foreground,
      light: style.background,
    },
  });
}

export async function generateQRSvg(content: string, style: QRStyle): Promise<string> {
  return await QRCode.toString(content, {
    type: 'svg',
    errorCorrectionLevel: style.errorCorrection,
    margin: 2,
    width: 300,
    color: {
      dark: style.foreground,
      light: style.background,
    },
  });
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
