# 🚀 Multi-Tenant SaaS Platform

A production-ready multi-tenant SaaS platform that allows users to select React templates, deploy them to custom domains, and manage content through Wagtail CMS.

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)]()
[![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react)]()
[![Django](https://img.shields.io/badge/Django-4.2+-092E20?logo=django)]()
[![Wagtail](https://img.shields.io/badge/Wagtail-5.2+-43B02A?logo=wagtail)]()

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Quick Start](#quick-start)
- [Documentation](#documentation)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

This platform enables you to run a **white-label SaaS** where customers can:

1. **Preview** multiple React + Tailwind templates
2. **Select** a template for their business
3. **Deploy** automatically to their own domain/subdomain
4. **Manage content** through an intuitive Wagtail CMS

**Perfect for:**

- 🏫 Educational institutions
- 🏥 Healthcare providers
- 🍔 Restaurants & cafes
- 💼 Professional portfolios
- 🏢 Small businesses

---

## ✨ Features

### 🎨 Frontend

- ✅ Multiple pre-built React + TypeScript + Tailwind templates
- ✅ Dynamic branding (colors, fonts, logos) per tenant
- ✅ Responsive and mobile-optimized
- ✅ Built with Vite for lightning-fast performance
- ✅ CSS variables for easy theme customization

### 🛠️ Backend

- ✅ Django + Wagtail CMS for content management
- ✅ Multi-tenant architecture with domain-based routing
- ✅ RESTful API for frontend integration
- ✅ Automated deployment via GitHub Actions
- ✅ Apache2 virtual host auto-configuration

### 🚀 Deployment

- ✅ **Fully automated** - zero manual intervention
- ✅ GitHub Actions CI/CD pipeline
- ✅ Supports custom domains and subdomains
- ✅ SSL certificate auto-provisioning
- ✅ Rollback capability on failed deployments

---

## 🏗️ Architecture

```
┌──────────────────┐
│  User Dashboard  │
│  (Select Template)│
└────────┬─────────┘
         │
         ▼
┌──────────────────┐      ┌─────────────────┐
│ Django Backend   │──────▶│ GitHub Actions  │
│ (Trigger Deploy) │      │ (Build Template)│
└──────────────────┘      └────────┬────────┘
         │                          │
         │                          ▼
         │                 ┌─────────────────┐
         │                 │  VPS (Apache2)  │
         │                 │  Serve Template │
         │                 └────────┬────────┘
         │                          │
         ▼                          ▼
┌──────────────────┐      ┌─────────────────┐
│  Wagtail CMS     │─────▶│  React Frontend │
│  (Content API)   │      │  (Fetch Content)│
└──────────────────┘      └─────────────────┘
```

---

## 🚀 Quick Start

### Prerequisites

```bash
Node.js 18+
Python 3.10+
PostgreSQL 13+
Apache2 (for VPS deployment)
GitHub Account
```

### 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/saas-platform.git
cd saas-platform
```

### 2️⃣ Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure database
cp .env.example .env
# Edit .env with your database credentials

# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Setup initial templates
python manage.py setup_templates

# Run server
python manage.py runserver
```

Backend will be available at: `http://localhost:8000`  
Admin panel: `http://localhost:8000/admin`

### 3️⃣ Frontend Template Setup

```bash
cd templates-frontend/school-template

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Run development server
npm run dev
```

Template will be available at: `http://localhost:5173`

---

## 📚 Documentation

Comprehensive guides for developers:

### For Frontend Developers

📄 [Frontend Developer Guide](./docs/FRONTEND_GUIDE.md)

- Template development workflow
- Tenant loading system
- Dynamic styling with CSS variables
- API integration patterns
- Testing and deployment

### For Backend Developers

📄 [Backend Developer Guide](./docs/BACKEND_GUIDE.md)

- Django + Wagtail setup
- Multi-tenant database models
- REST API endpoints
- Deployment automation
- GitHub Actions integration

---

## 🗂️ Project Structure

```
saas-platform/
│
│
├── templates-frontend/           # React templates
│   ├── school-template/
│   │   ├── src/
│   │   ├── public/
│   │   ├── package.json
│   │   └── vite.config.ts
│   ├── hospital-template/
│   ├── restaurant-template/
│   └── portfolio-template/
│
├── .github/
│   └── workflows/
│       └── deploy.yml            # CI/CD pipeline
│
├── docs/                         # Documentation
│   ├── FRONTEND_GUIDE.md
│   └── BACKEND_GUIDE.md
│
└── README.md
```

---

## 🔧 Configuration

### GitHub Secrets

Add these secrets to your GitHub repository:

```
Settings → Secrets and variables → Actions → New repository secret
```

| Secret Name   | Description                | Example                     |
| ------------- | -------------------------- | --------------------------- |
| `VPS_HOST`    | Your VPS IP address        | `123.45.67.89`              |
| `VPS_USER`    | SSH username               | `root`                      |
| `VPS_SSH_KEY` | Private SSH key            | Copy entire `~/.ssh/id_rsa` |
| `SSL_EMAIL`   | Email for SSL certificates | `admin@yourdomain.com`      |

### Environment Variables

**Backend (.env)**

```env
SECRET_KEY=your-django-secret-key
DEBUG=False
DATABASE_URL=postgresql://user:pass@localhost/dbname

GITHUB_TOKEN=ghp_your_personal_access_token
GITHUB_REPO=yourusername/saas-platform
BACKEND_URL=https://api.yourdomain.com
```

**Frontend (.env)**

```env
VITE_API_URL=https://api.yourdomain.com
VITE_TENANT_DOMAIN=demo.yourdomain.com
```

---

## 🚀 Deployment

### Automated Deployment Flow

When a user selects a template:

1. **User Action** → Selects template from dashboard
2. **Backend Trigger** → Django calls GitHub API
3. **GitHub Actions** → Builds React template
4. **Upload** → Deploys `dist/` to VPS
5. **Apache Config** → Auto-creates virtual host
6. **SSL Setup** → Provisions Let's Encrypt certificate
7. **Go Live** → Site accessible at user's domain

### Manual Deployment

#### Deploy Backend

```bash
# On your VPS
cd /var/www
git clone https://github.com/yourusername/saas-platform.git
cd saas-platform/backend

python3 -m venv .venv
source .venv/bin/activate

pip install -r requirements.txt
python manage.py migrate
python manage.py collectstatic

# Run with Gunicorn
gunicorn config.wsgi:application --bind 0.0.0.0:8000
```

#### Deploy Frontend Template

```bash
cd templates-frontend/school-template
npm install
npm run build

# Upload dist/ to VPS
scp -r dist/* root@your-vps:/var/www/tenant123/dist/
```

---

## 🧪 Testing

### Backend Tests

```bash
cd backend
python manage.py test
```

### Frontend Tests

```bash
cd templates-frontend/school-template
npm run test
```

### API Testing

```bash
# Test tenant API
curl "http://localhost:8000/api/tenant/?domain=demo.yourdomain.com"

# Test template list
curl "http://localhost:8000/api/templates/"
```

---

## 🛠️ Available Templates

| Template                | Category      | Features                                            |
| ----------------------- | ------------- | --------------------------------------------------- |
| **School Template**     | Education     | Hero section, courses, staff profiles, contact form |
| **Hospital Template**   | Healthcare    | Services, doctors, appointments, testimonials       |
| **Restaurant Template** | Food & Dining | Menu, gallery, reservations, location map           |
| **Portfolio Template**  | Professional  | Projects showcase, about, skills, contact           |

### Adding New Templates

1. Create new React + Vite project in `templates-frontend/`
2. Implement tenant loading logic
3. Add template record in Django admin
4. Update `deploy.yml` if needed
5. Test deployment

---

## 📊 Tech Stack

### Frontend

- **Framework:** React 18+
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Build Tool:** Vite
- **HTTP Client:** Axios

### Backend

- **Framework:** Django 4.2+
- **CMS:** Wagtail 5.2+
- **API:** Django REST Framework
- **Database:** PostgreSQL
- **Auth:** Django Auth System

### DevOps

- **CI/CD:** GitHub Actions
- **Web Server:** Apache2
- **SSL:** Let's Encrypt (Certbot)
- **VPS:** Hostinger (or any Linux VPS)

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code style
- Write tests for new features
- Update documentation
- Use meaningful commit messages

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Authors

- **Your Name** - _Initial work_ - [GitHub Profile](https://github.com/yourusername)

---

## 🙏 Acknowledgments

- Wagtail CMS team for the excellent CMS
- React and Vite teams for amazing developer experience
- Tailwind CSS for utility-first styling
- Open source community

---

## 📞 Support

- **Documentation:** Check the [docs](./docs) folder
- **Issues:** [GitHub Issues](https://github.com/yourusername/saas-platform/issues)
- **Discussions:** [GitHub Discussions](https://github.com/yourusername/saas-platform/discussions)

---

## 🗺️ Roadmap

- [ ] Add more template categories
- [ ] Implement template marketplace
- [ ] Add visual page builder
- [ ] Mobile app for content management
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Payment gateway integration
- [ ] Custom domain SSL automation

---

## ⭐ Star History

If you find this project useful, please consider giving it a star! ⭐

---

**Built with ❤️ for the developer community**
