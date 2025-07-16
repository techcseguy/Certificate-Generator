import React, { useEffect, useRef } from 'react';
import { Download } from 'lucide-react';

const CertificateCanvas = ({ design, category, onCodeView }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 800;
    canvas.height = 600;

    // Execute the design code
    try {
      const executeDesign = new Function('ctx', 'canvas', 'category', design.code);
      executeDesign(ctx, canvas, category);
    } catch (error) {
      console.error('Error executing design code:', error);
      // Fallback design
      drawFallbackDesign(ctx, canvas, category, design.style);
    }
  }, [design, category]);

  const drawFallbackDesign = (ctx, canvas, category, style) => {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background based on style
    const backgrounds = {
      'Classic': '#f8f9fa',
      'Modern': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'Elegant': '#1a1a2e',
      'Professional': '#ffffff',
      'Creative': '#ff6b6b'
    };

    // Draw background
    if (style === 'Modern') {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#667eea');
      gradient.addColorStop(1, '#764ba2');
      ctx.fillStyle = gradient;
    } else {
      ctx.fillStyle = backgrounds[style] || '#f8f9fa';
    }
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Border
    ctx.strokeStyle = style === 'Elegant' ? '#ffd700' : '#333';
    ctx.lineWidth = 8;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

    // Title
    ctx.fillStyle = style === 'Elegant' ? '#ffffff' : '#333';
    ctx.font = 'bold 36px Georgia';
    ctx.textAlign = 'center';
    ctx.fillText('CERTIFICATE', canvas.width / 2, 120);

    // Subtitle
    ctx.font = '24px Georgia';
    ctx.fillText('of Achievement', canvas.width / 2, 160);

    // Main content
    ctx.font = 'bold 32px Georgia';
    ctx.fillText(category, canvas.width / 2, 280);

    // Description
    ctx.font = '18px Georgia';
    ctx.fillText('This certificate is awarded in recognition of', canvas.width / 2, 320);
    ctx.fillText('outstanding achievement and dedication', canvas.width / 2, 345);

    // Signature line
    ctx.strokeStyle = style === 'Elegant' ? '#ffd700' : '#333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - 100, 450);
    ctx.lineTo(canvas.width / 2 + 100, 450);
    ctx.stroke();

    // Signature text
    ctx.fillStyle = style === 'Elegant' ? '#ffffff' : '#333';
    ctx.font = '16px Georgia';
    ctx.fillText('Signature', canvas.width / 2, 470);

    // Date
    const date = new Date().toLocaleDateString();
    ctx.fillText(`Date: ${date}`, canvas.width / 2, 520);
  };

  const downloadCertificate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `${category.replace(/\s+/g, '_')}_${design.name}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{design.name}</h3>
        <div className="flex gap-2">
          <button
            onClick={() => onCodeView(design.code)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
          >
            View Code
          </button>
          <button
            onClick={downloadCertificate}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm flex items-center gap-2"
          >
            <Download size={16} />
            Download
          </button>
        </div>
      </div>
      
      <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full h-auto max-w-full"
          style={{ display: 'block' }}
        />
      </div>
    </div>
  );
};

export default CertificateCanvas;
