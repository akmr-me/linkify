# 🔗 Linkify - Modern URL Shortening Service

A production-ready, full-stack URL shortening and link management platform built with Next.js 15, TypeScript, and modern web technologies.

![Linkify Banner](https://via.placeholder.com/1200x400/1e293b/ffffff?text=Linkify+-+Modern+URL+Shortening)

## ✨ Features

- **🔗 URL Shortening**: Create short, memorable links instantly
- **📊 Analytics Dashboard**: Track clicks, engagement, and link performance
- **👤 User Authentication**: Secure login with Google OAuth and email/password
- **🎨 Modern UI**: Beautiful, responsive design with dark/light mode
- **📱 Mobile-First**: Optimized for all devices and screen sizes
- **🔒 Security**: Cloudflare Turnstile protection and secure link handling
- **⚡ Performance**: Built with Next.js 15 and Turbopack for blazing fast speeds
- **🎯 Custom Aliases**: Create custom short URLs with your preferred aliases
- **📈 Real-time Updates**: Live updates for link statistics and management

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/akmr-me/linkify.git
   cd linkify
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Configure the following variables in `.env.local`:

   ```env
   # Database
   DATABASE_URL="your-database-url"

   # Authentication
   NEXTAUTH_SECRET="your-nextauth-secret"
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"

   # Cloudflare Turnstile
   TURNSTILE_SECRET_KEY="your-turnstile-secret"
   TURNSTILE_SITE_KEY="your-turnstile-site-key"

   # App Configuration
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```

4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons
- **Zustand** - State management
- **React Hook Form** - Form handling
- **Zod** - Schema validation

### Backend

- **Next.js API Routes** - Server-side API endpoints
- **Prisma** - Database ORM
- **NextAuth.js** - Authentication
- **Axios** - HTTP client

### Development Tools

- **ESLint** - Code linting
- **Turbopack** - Fast bundler
- **PostCSS** - CSS processing

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication routes
│   ├── api/               # API endpoints
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   ├── shortner/         # URL shortening component
│   └── table/            # Data table components
├── containers/           # Page-level components
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions and configurations
├── services/            # API service layer
├── types/               # TypeScript type definitions
└── constants/           # Application constants
```

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema to database
npm run db:migrate   # Run database migrations
```

## 🌐 Deployment

### Vercel (Recommended)

1. **Connect your repository** to Vercel
2. **Set environment variables** in Vercel dashboard
3. **Deploy** - Vercel will automatically detect Next.js and deploy

### Other Platforms

The app can be deployed to any platform that supports Node.js:

- **Netlify** - With custom build settings
- **Railway** - Full-stack deployment
- **DigitalOcean App Platform** - Managed deployment
- **AWS/GCP/Azure** - Container deployment

## 🔐 Environment Variables

| Variable               | Description                   | Required |
| ---------------------- | ----------------------------- | -------- |
| `DATABASE_URL`         | Database connection string    | ✅       |
| `NEXTAUTH_SECRET`      | NextAuth.js secret key        | ✅       |
| `GOOGLE_CLIENT_ID`     | Google OAuth client ID        | ✅       |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret    | ✅       |
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile secret   | ✅       |
| `TURNSTILE_SITE_KEY`   | Cloudflare Turnstile site key | ✅       |
| `NEXT_PUBLIC_APP_URL`  | Your app's public URL         | ✅       |

<!-- ## 📊 API Endpoints -->

<!-- ### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Links

- `GET /api/links` - Get user's links
- `POST /api/links` - Create new short link
- `DELETE /api/links/[id]` - Delete a link
- `GET /api/links/[short]` - Redirect to original URL -->

<!-- ## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request** -->

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Amresh Kumar**

- Email: amresh@akmr.me
- Portfolio: [https://portfolio.akmr.me](https://portfolio.akmr.me)
- GitHub: [@akmr](https://github.com/akmr-me)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Vercel](https://vercel.com/) - Deployment platform
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Radix UI](https://www.radix-ui.com/) - UI primitives
- [Cloudflare](https://cloudflare.com/) - Turnstile protection

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/akmr-me/linkify/issues)
- **Email**: amresh@akmr.me
- **Documentation**: [Wiki](https://github.com/akmr-me/linkify/wiki)

---

⭐ **Star this repository if you found it helpful!**
