import React, { useState } from 'react';
import { Award, Sparkles, Code, Download } from 'lucide-react';
import CertificateCanvas from './components/CertificateCanvas.jsx';
import CodeModal from './components/CodeModal.jsx';
import LoadingSpinner from './components/LoadingSpinner.jsx';

// API configuration
const API_BASE_URL = 'https://certificate-generator-q7db.onrender.com';

// API service function
const generateCertificateDesigns = async (category) => {
  if (!category?.trim()) {
    throw new Error('Category is required');
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/generate-certificates`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ category }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }

    if (!data.success) {
      throw new Error(data.error || 'Failed to generate certificate designs');
    }

    return data.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

function App() {
  const [category, setCategory] = useState('');
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [currentCode, setCurrentCode] = useState('');
  const [currentTitle, setCurrentTitle] = useState('');

  const handleGenerate = async () => {
    if (!category.trim()) {
      setError('Please enter a category name');
      return;
    }

    setLoading(true);
    setError('');
    setDesigns([]);

    try {
      console.log('🚀 Generating certificates for:', category);
      const generatedDesigns = await generateCertificateDesigns(category);
      console.log('✅ Generated designs:', generatedDesigns);
      setDesigns(generatedDesigns);
    } catch (err) {
      console.error('❌ Generation error:', err);
      
      // More specific error handling
      if (err.message.includes('fetch')) {
        setError('Unable to connect to the server. Please make sure the backend is running.');
      } else if (err.message.includes('Category is required')) {
        setError('Please enter a valid category name');
      } else {
        setError(err.message || 'Failed to generate certificate designs. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCodeView = (code, title = 'Certificate Design') => {
    setCurrentCode(code);
    setCurrentTitle(title);
    setShowCodeModal(true);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleGenerate();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Award className="text-blue-600" size={32} />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Certificate Generator</h1>
              <p className="text-gray-600">Create beautiful certificates with AI-powered Canvas.js designs</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Input Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="text-purple-600" size={24} />
            <h2 className="text-2xl font-semibold text-gray-800">Generate Certificate Designs</h2>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Course/Category Name
              </label>
              <input
                type="text"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="e.g., Machine Learning, Web Development, Digital Marketing"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
            </div>
            
            <button
              onClick={handleGenerate}
              disabled={loading || !category.trim()}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 sm:self-end"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  Generate Designs
                </>
              )}
            </button>
          </div>
          
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700">{error}</p>
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-200">
            <LoadingSpinner />
          </div>
        )}

        {/* Results Section */}
        {designs.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <Code className="text-green-600" size={24} />
              <h2 className="text-2xl font-semibold text-gray-800">Generated Certificate Designs</h2>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                {designs.length} designs
              </span>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {designs.map((design) => (
                <CertificateCanvas
                  key={design.id}
                  design={design}
                  category={category}
                  onCodeView={(code) => handleCodeView(code, design.name)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && designs.length === 0 && !error && (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center border border-gray-200">
            <Award className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Create Certificates</h3>
            <p className="text-gray-600 mb-6">Enter a course or category name above to generate 5 unique certificate designs using AI-powered Canvas.js</p>
            <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Sparkles size={16} />
                <span>AI-Generated Designs</span>
              </div>
              <div className="flex items-center gap-2">
                <Code size={16} />
                <span>Canvas.js Code</span>
              </div>
              <div className="flex items-center gap-2">
                <Download size={16} />
                <span>Download Ready</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Code Modal */}
      <CodeModal
        isOpen={showCodeModal}
        onClose={() => setShowCodeModal(false)}
        code={currentCode}
        title={currentTitle}
      />

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-600">
            Built with Canvas.js and Gemini API • Create beautiful certificates instantly
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
