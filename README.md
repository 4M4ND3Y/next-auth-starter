# Next Auth Starter

A comprehensive authentication system built with **Next.js 15**, **TypeScript**, and **MongoDB**. This starter template provides a complete foundation for applications requiring user authentication, email verification, and password reset functionality.

![Next.js](https://img.shields.io/badge/Next.js-15.5.3-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-8.18.1-green?style=for-the-badge&logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🔐 **Authentication System**

- User registration with secure password hashing (bcrypt)
- User login with JWT token-based authentication
- Automatic token expiration and secure cookie management
- Protected routes with middleware
- Logout functionality

### 📧 **Email Services**

- Email verification system with custom HTML templates
- Password reset via email
- On-demand verification email sending
- Gmail SMTP integration with secure configuration
- Beautiful, responsive email templates

### 🎨 **Modern UI/UX**

- Dark/Light mode toggle with system preference detection
- Responsive design with Tailwind CSS v4
- Professional UI components with Radix UI
- Loading states and toast notifications
- Hover cards and tooltips for enhanced UX

### 🛡️ **Security Features**

- Password hashing with bcryptjs
- JWT token authentication
- Secure HTTP-only cookies
- Token expiration handling
- Protected API routes

### 🗄️ **Database Integration**

- MongoDB with Mongoose ODM
- User schema with validation
- Token-based verification system
- Automatic connection handling

## 🚀 Tech Stack

### **Frontend**

- **Next.js 15.5.3** - React framework with Turbopack
- **React 19.1.0** - Latest React version
- **TypeScript 5** - Type-safe development
- **Tailwind CSS v4** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Modern icon library

### **Backend**

- **Next.js API Routes** - Server-side functionality
- **MongoDB** - NoSQL database
- **Mongoose 8.18.1** - MongoDB object modeling
- **JWT** - JSON Web Token authentication
- **bcryptjs** - Password hashing

### **Email**

- **Nodemailer 7.0.6** - Email sending
- **Gmail SMTP** - Email service provider
- **Custom HTML Templates** - Professional email design

### **Development Tools**

- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Sonner** - Toast notifications
- **Axios** - HTTP client

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** or **yarn** or **pnpm**
- **MongoDB** (local installation or MongoDB Atlas account)
- **Gmail account** (for email functionality)

## ⚡ Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/4M4ND3Y/next-auth-starter.git
cd next-auth-starter
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory:

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/next-auth-starter
# For MongoDB Atlas: mongodb atlas connection string

# JWT Configuration
SECRET_TOKEN=your-super-secret-jwt-token-here

# Application Configuration
DOMAIN=http://localhost:3000

# Gmail SMTP Configuration
GMAIL_SMTP_SERVICE=gmail
GMAIL_SMTP_HOST=smtp.gmail.com
GMAIL_SMTP_PORT=587
GMAIL_SMTP_SECURE=false
GMAIL_SMTP_USERNAME=your-gmail@gmail.com
GMAIL_SMTP_PASSWORD=your-app-password
EMAIL_FROM="Next Auth Starter <your-gmail@gmail.com>"
```

### 4. Gmail Configuration

#### Enable App Passwords:

1. Go to your [Google Account settings](https://myaccount.google.com/)
2. Navigate to **Security** → **2-Step Verification**
3. Enable 2-Step Verification if not already enabled
4. Go to **App passwords** and generate a new password
5. Use this app password in `GMAIL_SMTP_PASSWORD`

### 5. Start Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your application.

## 📁 Project Structure

```
next-auth-starter/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API Routes
│   │   │   └── users/         # User-related endpoints
│   │   │       ├── login/     # Login endpoint
│   │   │       ├── logout/    # Logout endpoint
│   │   │       ├── signup/    # Registration endpoint
│   │   │       ├── me/        # Get user profile
│   │   │       ├── verifyemail/    # Email verification
│   │   │       ├── resetpassword/  # Password reset
│   │   │       ├── send-verification/ # Send verification email
│   │   │       └── send-reset-email/  # Send reset email
│   │   ├── login/             # Login page
│   │   ├── signup/            # Registration page
│   │   ├── profile/           # User profile page
│   │   ├── verifyemail/       # Email verification page
│   │   ├── resetpassword/     # Password reset page
│   │   ├── globals.css        # Global styles
│   │   └── layout.tsx         # Root layout
│   ├── components/            # Reusable components
│   │   ├── ui/               # UI components (Radix UI)
│   │   └── theme-provider.tsx # Theme provider
│   ├── helpers/              # Utility functions
│   │   ├── mailer.ts         # Email functionality
│   │   └── getDataFromToken.ts # JWT token decoder
│   ├── lib/                  # Library utilities
│   │   └── utils.ts          # Utility functions
│   ├── models/               # Database models
│   │   └── userModel.ts      # User schema
│   ├── dbConfig/             # Database configuration
│   │   └── dbConfig.ts       # MongoDB connection
│   └── middleware.ts         # Route protection middleware
├── public/                   # Static assets
├── components.json           # UI component configuration
├── package.json             # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── tailwind.config.js      # Tailwind CSS configuration
```

## 🔑 API Endpoints

### **Authentication**

- `POST /api/users/signup` - User registration
- `POST /api/users/login` - User login
- `GET /api/users/logout` - User logout
- `GET /api/users/me` - Get current user profile

### **Email Services**

- `POST /api/users/send-verification` - Send verification email
- `POST /api/users/verifyemail` - Verify email with token
- `POST /api/users/send-reset-email` - Send password reset email
- `POST /api/users/resetpassword` - Reset password with token

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack
npm run build        # Build for production with Turbopack
npm run start        # Start production server
npm run lint         # Run ESLint

# Alternative package managers
yarn dev / pnpm dev  # Development with yarn/pnpm
yarn build / pnpm build  # Build with yarn/pnpm
```

## 🔒 Security Features

### **Password Security**

- Passwords are hashed using bcryptjs with salt rounds
- No plain text passwords stored in database

### **JWT Tokens**

- Secure token generation with expiration
- HTTP-only cookies for token storage
- Automatic token validation on protected routes

### **Route Protection**

- Middleware-based route protection
- Automatic redirects for authenticated/unauthenticated users
- Protected API endpoints

### **Email Security**

- Verification tokens with expiration (1 hour)
- Secure SMTP configuration with STARTTLS
- Password reset tokens with time-based expiration

## 🎨 UI Components

The project uses a comprehensive set of UI components built with Radix UI:

- **Button** - Various button variants and sizes
- **Input** - Form input fields with validation styles
- **Label** - Accessible form labels
- **Avatar** - User profile pictures with fallbacks
- **Badge** - Status indicators (verified/unverified)
- **Dropdown Menu** - Context menus and navigation
- **Hover Card** - Rich hover interactions
- **Tooltip** - Helpful tooltips and hints
- **Mode Toggle** - Dark/light theme switcher

## 🌐 Environment Variables Reference

| Variable              | Description               | Example                              |
| --------------------- | ------------------------- | ------------------------------------ |
| `MONGODB_URI`         | MongoDB connection string | `mongodb://localhost:27017/nextauth` |
| `SECRET_TOKEN`        | JWT secret key            | `your-super-secret-key`              |
| `DOMAIN`              | Application domain        | `http://localhost:3000`              |
| `GMAIL_SMTP_SERVICE`  | Email service provider    | `gmail`                              |
| `GMAIL_SMTP_HOST`     | SMTP host                 | `smtp.gmail.com`                     |
| `GMAIL_SMTP_PORT`     | SMTP port                 | `587`                                |
| `GMAIL_SMTP_SECURE`   | Use SSL/TLS               | `false`                              |
| `GMAIL_SMTP_USERNAME` | Gmail address             | `your-email@gmail.com`               |
| `GMAIL_SMTP_PASSWORD` | Gmail app password        | `generated-app-password`             |
| `EMAIL_FROM`          | Sender email with name    | `"App Name <email@gmail.com>"`       |

## 🚀 Deployment

### **Vercel (Recommended)**

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### **Other Platforms**

The app can be deployed on any platform supporting Node.js:

- **Netlify**
- **Railway**
- **DigitalOcean**
- **AWS**
- **Heroku**

### **Production Environment Variables**

Make sure to update these for production:

- Change `DOMAIN` to your production URL
- Use a strong `SECRET_TOKEN`
- Configure production MongoDB URI
- Set up production email service

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Aman Dey**

- GitHub: [@4M4ND3Y](https://github.com/4M4ND3Y)
- LinkedIn: [Aman Dey](https://linkedin.com/in/amandey)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) for accessible component primitives
- [Vercel](https://vercel.com/) for the deployment platform

## 📞 Support

If you have any questions or need help with setup, feel free to:

- Open an issue on GitHub
- Contact me through my GitHub profile
- Check the documentation for detailed guides

---

⭐ If you found this project helpful, please consider giving it a star on GitHub!
