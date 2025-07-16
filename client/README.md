# Certificate Generator

A modern web application that generates beautiful certificate designs using Canvas.js and OpenAI API integration.

## Features

- **AI-Powered Design Generation**: Creates 5 unique certificate designs based on category input
- **Canvas.js Rendering**: Real-time certificate rendering with beautiful graphics
- **Code Display**: Shows the Canvas.js code for each generated design
- **Download Functionality**: Export certificates as PNG images
- **Responsive Design**: Works seamlessly across all devices
- **Modern UI**: Clean, professional interface with smooth animations

## Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Canvas Rendering**: HTML5 Canvas API
- **Icons**: Lucide React
- **Build Tool**: Vite
- **AI Integration**: OpenAI API (configurable)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### OpenAI API Setup (Optional)

To use real AI-generated designs instead of mock data:

1. Get an OpenAI API key from [OpenAI Platform](https://platform.openai.com/)
2. Create a `.env` file in the project root:
   ```
   VITE_REACT_APP_OPENAI_API_KEY=your_api_key_here
   ```
3. Uncomment the actual OpenAI implementation in `src/services/openai.ts`

## Usage

1. Enter a course or category name (e.g., "Web Development", "Machine Learning")
2. Click "Generate Designs" to create 5 unique certificate designs
3. View the Canvas.js code for each design by clicking "View Code"
4. Download any certificate as a PNG image using the "Download" button

## Project Structure

```
src/
├── components/           # React components
│   ├── CertificateCanvas.tsx    # Certificate rendering component
│   ├── CodeModal.tsx           # Code display modal
│   └── LoadingSpinner.tsx      # Loading indicator
├── services/            # API services
│   └── openai.ts       # OpenAI integration
├── App.tsx             # Main application component
└── main.tsx           # Application entry point
```

## Design Styles

The application generates 5 different certificate styles:

1. **Classic**: Traditional design with serif fonts and decorative borders
2. **Modern**: Clean, gradient backgrounds with sans-serif typography
3. **Elegant**: Dark theme with gold accents and sophisticated styling
4. **Professional**: Corporate look with structured layout and blue accents
5. **Creative**: Colorful, artistic design with playful elements

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Demo

For a live demonstration, visit [your-demo-url] or check out the YouTube walkthrough at [your-youtube-url].