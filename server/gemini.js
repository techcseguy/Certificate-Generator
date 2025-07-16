const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Gemini API
console.log(process.env.GEMINI_API_KEY);
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Certificate generation function
const generateCertificateDesignsWithGemini = async (category) => {
  if (!category?.trim()) {
    throw new Error("Category is required");
  }

  const styles = ["Classic", "Modern", "Elegant", "Professional", "Creative"];
  const designs = [];

  for (let i = 0; i < styles.length; i++) {
    const style = styles[i];

    const prompt = `Generate Canvas.js code for a ${style.toLowerCase()} certificate design for "${category}".

Requirements:
1. Use HTML5 Canvas API with ctx (2D context)
2. Set canvas dimensions to 800x600
3. Clear canvas and draw a beautiful ${style.toLowerCase()} background
4. Add decorative borders and elements appropriate for ${style.toLowerCase()} style
5. Include "CERTIFICATE" as the main title
6. Display the category: "${category}"
7. Add completion text like "This is to certify that [recipient] has successfully completed"
8. Include signature lines and date
9. Use appropriate colors and fonts for ${style.toLowerCase()} aesthetic
10. Make it professional and visually appealing

Return ONLY the JavaScript code that works with canvas and ctx variables. No markdown formatting, no explanations, just the executable JavaScript code.

Example structure:
// Clear canvas
ctx.clearRect(0, 0, canvas.width, canvas.height);

// Your drawing code here...
ctx.fillStyle = '#color';
ctx.fillRect(x, y, width, height);
// etc.`;

    try {
      // const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-preview-image-generation" });
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      if (!text) {
        throw new Error(`No code received from Gemini API for ${style} style`);
      }

      console.log(`Generated ${style} design, length: ${text.length}`);

      // Clean the code from any markdown formatting
      const cleanedCode = text
        .replace(/```(?:javascript|js)?\n?/g, '')
        .replace(/```/g, '')
        .trim();

      // Validate that we have some code
      if (cleanedCode.length < 50) {
        throw new Error(`Generated code too short for ${style} style`);
      }

      designs.push({
        id: style.toLowerCase(),
        name: `${style} Design`,
        style,
        code: cleanedCode,
      });

      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
      
    } catch (error) {
      console.error(`Error generating ${style} design:`, error);
      
      // Fallback to template if API fails
      const fallbackCode = generateFallbackCode(style, category);
      designs.push({
        id: style.toLowerCase(),
        name: `${style} Design`,
        style,
        code: fallbackCode,
      });
    }
  }

  return designs;
};

// Fallback templates if Gemini API fails
const generateFallbackCode = (style, category) => {
  const templates = {
    Classic: `
// Classic Certificate Design
ctx.clearRect(0, 0, canvas.width, canvas.height);

// Background
const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
gradient.addColorStop(0, '#f8f9fa');
gradient.addColorStop(1, '#e9ecef');
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Border
ctx.strokeStyle = '#2c3e50';
ctx.lineWidth = 8;
ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);

// Title
ctx.fillStyle = '#2c3e50';
ctx.font = 'bold 48px serif';
ctx.textAlign = 'center';
ctx.fillText('CERTIFICATE', canvas.width / 2, 150);

// Category
ctx.font = 'bold 32px serif';
ctx.fillStyle = '#e74c3c';
ctx.fillText('${category}', canvas.width / 2, 250);

// Description
ctx.font = '18px serif';
ctx.fillStyle = '#34495e';
ctx.fillText('This is to certify successful completion of', canvas.width / 2, 320);

// Signature line
ctx.strokeStyle = '#2c3e50';
ctx.lineWidth = 2;
ctx.beginPath();
ctx.moveTo(200, 450);
ctx.lineTo(350, 450);
ctx.stroke();

// Date
ctx.font = '16px serif';
ctx.fillText(new Date().toLocaleDateString(), 275, 480);
    `,
    
    Modern: `
// Modern Certificate Design
ctx.clearRect(0, 0, canvas.width, canvas.height);

// Modern gradient
const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
gradient.addColorStop(0, '#667eea');
gradient.addColorStop(1, '#764ba2');
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, canvas.width, canvas.height);

// White content area
ctx.fillStyle = '#ffffff';
ctx.fillRect(60, 60, canvas.width - 120, canvas.height - 120);

// Title
ctx.fillStyle = '#2d3748';
ctx.font = 'bold 42px sans-serif';
ctx.textAlign = 'center';
ctx.fillText('CERTIFICATE', canvas.width / 2, 140);

// Category
ctx.fillStyle = '#667eea';
ctx.fillRect(200, 200, 400, 50);
ctx.fillStyle = '#ffffff';
ctx.font = 'bold 24px sans-serif';
ctx.fillText('${category}', canvas.width / 2, 230);

// Description
ctx.fillStyle = '#4a5568';
ctx.font = '16px sans-serif';
ctx.fillText('Certificate of Completion', canvas.width / 2, 300);

// Date
ctx.fillStyle = '#2d3748';
ctx.font = '16px sans-serif';
ctx.fillText(new Date().toLocaleDateString(), canvas.width / 2, 450);
    `,
    
    Elegant: `
// Elegant Certificate Design
ctx.clearRect(0, 0, canvas.width, canvas.height);

// Elegant background
ctx.fillStyle = '#faf7f0';
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Ornate border
ctx.strokeStyle = '#8b4513';
ctx.lineWidth = 3;
ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);

// Title
ctx.fillStyle = '#8b4513';
ctx.font = 'bold 44px serif';
ctx.textAlign = 'center';
ctx.fillText('Certificate', canvas.width / 2, 150);

// Category
ctx.font = 'bold 28px serif';
ctx.fillStyle = '#2f4f4f';
ctx.fillText('${category}', canvas.width / 2, 250);

// Description
ctx.font = '18px serif';
ctx.fillText('Presented in recognition of excellence', canvas.width / 2, 320);

// Date
ctx.font = '16px serif';
ctx.fillText(new Date().toLocaleDateString(), canvas.width / 2, 450);
    `,
    
    Professional: `
// Professional Certificate Design
ctx.clearRect(0, 0, canvas.width, canvas.height);

// White background
ctx.fillStyle = '#ffffff';
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Header
ctx.fillStyle = '#1a365d';
ctx.fillRect(0, 0, canvas.width, 80);

// Title
ctx.fillStyle = '#ffffff';
ctx.font = 'bold 36px sans-serif';
ctx.textAlign = 'center';
ctx.fillText('CERTIFICATE', canvas.width / 2, 50);

// Border
ctx.strokeStyle = '#1a365d';
ctx.lineWidth = 2;
ctx.strokeRect(50, 50, canvas.width - 100, canvas.height - 100);

// Category
ctx.fillStyle = '#2d3748';
ctx.font = 'bold 32px sans-serif';
ctx.fillText('${category}', canvas.width / 2, 180);

// Description
ctx.fillStyle = '#718096';
ctx.font = '16px sans-serif';
ctx.fillText('Certificate of Professional Completion', canvas.width / 2, 280);

// Date
ctx.fillStyle = '#2d3748';
ctx.fillText(new Date().toLocaleDateString(), canvas.width / 2, 450);
    `,
    
    Creative: `
// Creative Certificate Design
ctx.clearRect(0, 0, canvas.width, canvas.height);

// Creative background
const gradient = ctx.createRadialGradient(canvas.width/2, canvas.height/2, 0, canvas.width/2, canvas.height/2, 400);
gradient.addColorStop(0, '#ff6b6b');
gradient.addColorStop(0.5, '#4ecdc4');
gradient.addColorStop(1, '#45b7d1');
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, canvas.width, canvas.height);

// White overlay
ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
ctx.fillRect(50, 50, canvas.width - 100, canvas.height - 100);

// Title
ctx.fillStyle = '#2c3e50';
ctx.font = 'bold 40px sans-serif';
ctx.textAlign = 'center';
ctx.fillText('CREATIVE CERTIFICATE', canvas.width / 2, 140);

// Category
ctx.fillStyle = '#ff6b6b';
ctx.font = 'bold 30px sans-serif';
ctx.fillText('${category}', canvas.width / 2, 220);

// Description
ctx.fillStyle = '#34495e';
ctx.font = '18px sans-serif';
ctx.fillText('🎨 Awarded for creative excellence', canvas.width / 2, 300);

// Date
ctx.fillStyle = '#2c3e50';
ctx.font = '16px sans-serif';
ctx.fillText(new Date().toLocaleDateString(), canvas.width / 2, 450);
    `
  };

  return templates[style] || templates.Classic;
};

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Certificate Generator API is running!' });
});

app.post('/api/generate-certificates', async (req, res) => {
  try {
    const { category } = req.body;
    
    if (!category?.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Category is required and must be a non-empty string'
      });
    }

    console.log(`🚀 Generating certificates for category: "${category}"`);
    
    // Generate designs
    const designs = await generateCertificateDesignsWithGemini(category);
    
    console.log(`✅ Successfully generated ${designs.length} certificate designs`);
    
    res.json({
      success: true,
      data: designs,
      message: `Successfully generated ${designs.length} certificate designs`
    });
  } catch (error) {
    console.error('❌ Error generating certificates:', error);
    
    res.status(500).json({
      success: false,
      error: error.message || 'Internal server error while generating certificates'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 API endpoint: http://localhost:${PORT}/api/generate-certificates`);
  console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;









// const express = require('express');
// const cors = require('cors');
// const { GoogleGenAI, Modality } = require('@google/genai');
// require('dotenv').config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Initialize Gemini API
// const genAI = new GoogleGenAI({
//   apiKey: process.env.GEMINI_API_KEY || "AIzaSyCzQx771FbzeugYXeoyFA3hGj6l4n250ps",
// });

// // Certificate generation function
// const generateCertificateDesignsWithGemini = async (category) => {
//   if (!category?.trim()) {
//     throw new Error("Category is required");
//   }

//   const styles = ["Classic", "Modern", "Elegant", "Professional", "Creative"];
//   const designs = [];

//   for (let i = 0; i < styles.length; i++) {
//     const style = styles[i];

//     const prompt = `Generate Canvas.js code for a ${style.toLowerCase()} certificate design for "${category}".
//     The code should:
//     1. Clear the canvas and set up the drawing context
//     2. Draw a beautiful background appropriate for the style
//     3. Add decorative borders and elements
//     4. Include the title "CERTIFICATE" prominently
//     5. Display the category name: "${category}"
//     6. Add descriptive text about the achievement
//     7. Include a signature area
//     8. Add the current date
//     9. Use appropriate colors and fonts for the ${style.toLowerCase()} style
//     10. Make it visually appealing and professional

// Return only the JavaScript code that uses ctx and canvas. Also return a preview image of the final certificate.`;

//     try {
//       const response = await genAI.models.generateContent({
//         model: "gemini-2.0-flash-preview-image-generation",
//         contents: prompt,
//         config: {
//           responseModalities: [Modality.TEXT, Modality.IMAGE],
//         },
//       });

//       // Log the response structure for debugging
//       console.log('Gemini API Response:', {
//         responseKeys: Object.keys(response),
//         responseContent: response.response?.content,
//         responseText: response.response?.text,
//         responseParts: response.response?.parts
//       });

//       // Try different ways to extract text content
//       let text;
//       if (response.response?.content) {
//         text = response.response.content;
//       } else if (response.response?.text) {
//         text = response.response.text;
//       } else if (response.response?.parts) {
//         // If response is split into parts
//         text = response.response.parts.map(part => part.text).join('\n');
//       }

//       if (!text) {
//         throw new Error('No code received from Gemini API');
//       }

//       // Clean code from markdown artifacts
//       const cleanedCode = text
//         .replace(/```(?:javascript|js)?\n?/g, '')
//         .trim()
//         .replace(/^['"`]|['"`]$/g, '');

//       designs.push({
//         id: style.toLowerCase(),
//         name: `${style} Design`,
//         style,
//         code: cleanedCode,
//       });
//     } catch (error) {
//       console.error(`Error generating ${style} design:`, error);
//       throw error;
//     }
//   }

//   return designs;
// };

// app.get('/', (req, res) => {
//   res.json({ message: 'Certificate Generator API is running!' });
// });

// app.post('/api/generate-certificates', async (req, res) => {
//   try {
//     const { category } = req.body;
    
//     if (!category?.trim()) {
//       return res.status(400).json({
//         success: false,
//         error: 'Category is required and must be a non-empty string'
//       });
//     }

//     console.log(`🚀 Generating certificates for category: "${category}"`);
    
//     // Generate designs
//     const designs = await generateCertificateDesignsWithGemini(category);
    
//     console.log(`✅ Successfully generated ${designs.length} certificate designs`);
    
//     res.json({
//       success: true,
//       data: designs,
//       message: `Successfully generated ${designs.length} certificate designs`
//     });
//   } catch (error) {
//     console.error('❌ Error generating certificates:', error);
    
//     res.status(500).json({
//       success: false,
//       error: error.message || 'Internal server error while generating certificates'
//     });
//   }
// });

// // Health check endpoint
// app.get('/api/health', (req, res) => {
//   res.json({
//     status: 'OK',
//     timestamp: new Date().toISOString(),
//     uptime: process.uptime()
//   });
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error('Unhandled error:', err);
//   res.status(500).json({
//     success: false,
//     error: 'Internal server error'
//   });
// });

// // 404 handler
// app.use('*', (req, res) => {
//   res.status(404).json({
//     success: false,
//     error: 'Route not found'
//   });
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
//   console.log(`📝 API endpoint: http://localhost:${PORT}/api/generate-certificates`);
//   console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
// });

// module.exports = app;