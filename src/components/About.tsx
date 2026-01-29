export function About() {
  return (
    <section className="brutal-card mt-8">
      <h2 className="brutal-heading text-lg mb-4">About</h2>
      
      <div className="space-y-4 text-[#737373]">
        <p>
          Qraw is a free, open-source QR code generator built for simplicity and privacy. 
          No accounts, no tracking, no data collection.
        </p>
        
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 border-2 border-[#e5e5e5] rounded-sm">
            <h3 className="font-bold text-[#1a1a1a] mb-2">Privacy First</h3>
            <p className="text-sm">
              All QR codes are generated locally in your browser. Your data never leaves your device.
            </p>
          </div>
          
          <div className="p-4 border-2 border-[#e5e5e5] rounded-sm">
            <h3 className="font-bold text-[#1a1a1a] mb-2">Customizable</h3>
            <p className="text-sm">
              Add titles, custom colors, background images, and social media logos to your QR codes.
            </p>
          </div>
          
          <div className="p-4 border-2 border-[#e5e5e5] rounded-sm">
            <h3 className="font-bold text-[#1a1a1a] mb-2">Works Offline</h3>
            <p className="text-sm">
              Once loaded, the app works without internet. Install it as a PWA for offline access.
            </p>
          </div>
        </div>
        
        <div className="pt-4 border-t border-[#e5e5e5] mt-6">
          <h3 className="font-bold text-[#1a1a1a] mb-3">Features</h3>
          <ul className="text-sm space-y-2">
            <li><span className="font-medium text-[#1a1a1a]">Website URLs</span> - Link to any webpage with automatic HTTPS</li>
            <li><span className="font-medium text-[#1a1a1a]">Wi-Fi Networks</span> - Share network credentials instantly</li>
            <li><span className="font-medium text-[#1a1a1a]">Social Media</span> - Quick profile links with embedded platform logos</li>
            <li><span className="font-medium text-[#1a1a1a]">Custom Titles</span> - Add headings to your QR code exports</li>
            <li><span className="font-medium text-[#1a1a1a]">Background Images</span> - Personalize with custom backgrounds</li>
            <li><span className="font-medium text-[#1a1a1a]">Multiple Formats</span> - Export as PNG, SVG, or PDF</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
