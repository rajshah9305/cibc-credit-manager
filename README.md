# CIBC Credit Manager

A modern, responsive web application for managing your CIBC credit card account with real-time monitoring and intuitive financial insights.

![CIBC Credit Manager](https://img.shields.io/badge/React-18.2.0-blue) ![Vite](https://img.shields.io/badge/Vite-4.5.0-646CFF) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3.5-38B2AC) ![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

### 🏦 **Real-time Credit Monitoring**
- Live credit utilization tracking
- Available credit calculations
- Over-limit and low-credit alerts
- Credit health status indicators

### 📊 **Interactive Dashboard**
- Visual credit utilization gauge
- Financial statistics cards
- Quick action buttons
- Dark/light theme support

### 🔄 **CIBC Data Integration**
- Clipboard paste functionality for CIBC data
- Automatic parsing of credit information
- Real-time data updates
- Export functionality

### 🎨 **Modern UI/UX**
- Responsive design with Tailwind CSS
- Smooth animations with Framer Motion
- Toast notifications
- Gradient backgrounds and modern styling

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cibc-credit-manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 📁 Project Structure

```
cibc-credit-manager/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx          # Main dashboard component
│   │   ├── BalanceGauge.jsx       # Credit utilization gauge
│   │   └── QuickActions.jsx       # Action buttons and modals
│   ├── context/
│   │   └── CreditCardContext.jsx  # Global state management
│   ├── hooks/
│   │   └── useCreditCard.js       # Custom credit card hook
│   ├── styles/
│   │   └── globals.css            # Global styles and animations
│   ├── app.jsx                    # Main App component
│   └── main.jsx                   # Application entry point
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── vercel.json
```

## 🛠️ Technology Stack

### Core
- **React 18.2.0** - UI framework
- **Vite 4.5.0** - Build tool and dev server
- **JavaScript (ES6+)** - Programming language

### Styling & UI
- **Tailwind CSS 3.3.5** - Utility-first CSS framework
- **Framer Motion 10.16.4** - Animation library
- **Lucide React 0.294.0** - Icon library

### State Management
- **React Context API** - Global state management
- **useReducer** - State updates

### Notifications
- **React Toastify 9.1.3** - Toast notifications

### Deployment
- **Vercel** - Hosting platform

## 🎯 Usage

### Dashboard Overview
The main dashboard displays:
- **Credit Health Status** - Visual indicator of your credit utilization
- **Available Credit** - Real-time available credit amount
- **Current Balance** - Your current credit card balance
- **Next Payment** - Minimum payment due and date
- **Credit Limit** - Total credit limit

### Quick Actions
- **Make Payment** - Process credit card payments
- **Refresh Data** - Update account information
- **Export Data** - Download account data as JSON
- **Settings** - Application settings (coming soon)

### CIBC Data Import
1. Copy credit card data from CIBC online banking
2. Paste anywhere in the application (Ctrl+V)
3. Data is automatically parsed and imported
4. Real-time updates and notifications

## 🔧 Configuration

### Environment Variables
No environment variables required for basic functionality.

### Customization
- Modify `src/context/CreditCardContext.jsx` for initial data
- Update `tailwind.config.js` for theme customization
- Edit `src/styles/globals.css` for custom animations

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop** (1024px+)
- **Tablet** (768px - 1023px)
- **Mobile** (320px - 767px)

## 🌙 Dark Mode

Automatic dark mode detection based on system preferences with manual toggle option.

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Deploy automatically on push to main branch
3. Custom domain configuration available

### Manual Deployment
```bash
npm run build
# Upload dist/ folder to your hosting provider
```

## 🔒 Security Features

- XSS Protection headers
- Content Security Policy
- Frame Options protection
- Content Type Options

## 🐛 Troubleshooting

### Common Issues

**Build Errors**
- Ensure Node.js 16+ is installed
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`

**Styling Issues**
- Verify Tailwind CSS is properly configured
- Check PostCSS configuration

**Import Errors**
- Ensure all component files exist
- Check import paths are correct

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- CIBC for inspiration
- React team for the amazing framework
- Tailwind CSS for the utility-first approach
- Framer Motion for smooth animations

## 📞 Support

For support, email support@example.com or create an issue in the repository.

---

**Note**: This is a personal finance management tool. Always verify financial data with your official banking statements.