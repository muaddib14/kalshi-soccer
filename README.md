# Kalshi Soccer - AI-Powered Football Betting Predictions

[![Next.js](https://img.shields.io/badge/Next.js-14.2.0-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4.3-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![pnpm](https://img.shields.io/badge/pnpm-8.15.4-F69220?logo=pnpm)](https://pnpm.io/)

> AI-powered football betting predictions for the Premier League with real data integration

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## 🎯 Features

### Core Functionality
- **Match Forecasting**: Real-time predictions with win/draw/loss percentages
- **Over/Under Goals**: Statistical analysis for goal predictions (1.5, 2.5, 3.5)
- **AI Match Discussion**: Intelligent analysis of tactical setups and key factors
- **Prediction History**: Track accuracy and performance metrics
- **Football News**: Latest team news and updates

### Technical Features
- **Clean Architecture**: SOLID principles with separation of concerns
- **State Management**: Zustand for efficient global state
- **Seamless Loading**: Skeleton screens and smooth transitions
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Type Safety**: Full TypeScript implementation

## 🏗️ Architecture

### Clean Architecture Pattern
```
├── domain/           # Business logic and rules
├── application/      # Use cases and interfaces
├── infrastructure/   # External APIs and data sources
└── presentation/     # UI components and pages
```

### Component Structure
```
/components
  /ui              # Reusable UI components
  /features        # Feature-specific components
    /forecast      # Match prediction components
    /ai           # AI analysis components
    /history      # Prediction history
    /news         # Football news
  /layout          # Layout components
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm 8+

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/muaddib14/kalshi-soccer.git
   cd kalshi-soccer
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start development server**
   ```bash
   pnpm dev
   ```

4. **Open browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Environment Variables

Create a `.env.local` file:

```env
# OpenRouter AI API Key
OPENROUTER_API_KEY=your_openrouter_api_key_here
```

## 🎮 Usage

### Making Predictions
1. Select two teams from the dropdown menus
2. Click "Predict" to generate AI-powered analysis
3. View detailed forecasts with win percentages
4. Explore AI insights and tactical analysis

### Understanding Results
- **Win Probabilities**: Statistical likelihood of each outcome
- **Over/Under Goals**: Expected total goals in the match
- **AI Analysis**: Tactical insights and risk factors
- **Confidence Level**: Algorithm certainty (High/Medium/Low)

## 🧠 AI & Prediction Engine

### Prediction Algorithm
- Home advantage calculations
- Team form analysis
- League-specific factors
- Statistical modeling

### AI Analysis Features
- Tactical breakdown
- Player recommendations
- Risk assessment
- Key match insights

## 📊 Performance Metrics

- **Prediction Accuracy**: Track success rates
- **Algorithm Performance**: Compare different models
- **Historical Data**: Analyze prediction trends
- **Confidence Scoring**: Measure certainty levels

## 🔌 Data Sources

- **Official Premier League**: Real-time fixture data and results
- **OpenFootball Database**: Historical match data and statistics
- **OpenRouter AI**: Advanced prediction algorithms

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript 5.4.3
- **Styling**: Tailwind CSS 3.4.1
- **State Management**: Zustand
- **Icons**: Lucide React
- **Package Manager**: pnpm
- **Linting**: ESLint 9

## 📱 Responsive Design

- **Mobile**: Optimized touch interface
- **Tablet**: Two-column layout
- **Desktop**: Full feature set with hover effects

## 🎨 Design System

### Color Palette
- **Primary**: Slate 900 (Brand) + Blue 600 (Actions)
- **Success**: Green 500 (Wins)
- **Warning**: Yellow 500 (Draws)
- **Danger**: Red 500 (Losses)
- **Neutral**: Slate variants

### Typography
- **Headings**: Oswald (Condensed, sports-focused)
- **Body**: Inter (Clean, tabular figures)
- **UI Elements**: Medium weight for clarity

## 🔧 Development

### Code Structure
- **SOLID Principles**: Single responsibility, dependency inversion
- **Clean Architecture**: Clear separation of layers
- **Type Safety**: Comprehensive TypeScript coverage
- **Performance**: Optimized rendering and state management

### Available Scripts
```bash
pnpm dev          # Development server
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # ESLint checks
```

## 📈 Future Enhancements

- **Real-time Data**: Live match statistics
- **User Accounts**: Personal prediction history
- **Mobile App**: Native iOS/Android versions
- **Advanced Analytics**: Machine learning models
- **Social Features**: Community predictions

## 📖 Documentation

- [Architecture Overview](./ARCHITECTURE.md) - Detailed information about the clean architecture implementation
- [Component Structure](./src/presentation/components/) - Component documentation and usage

## 🚀 Deployment

This project can be deployed to:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **Any Node.js hosting platform**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Premier League** for official data
- **OpenFootball** for historical data
- **OpenRouter** for AI prediction capabilities
- **Next.js team** for the amazing framework

---

**Built with ❤️ by MiniMax Agent**
