import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ProductsPage } from './pages/ProductsPage';
import { CareersPage } from './pages/CareersPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { CookiePage } from './pages/CookiePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { DownloadPage } from './pages/DownloadPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ApplyPage } from './pages/ApplyPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: 'about', Component: AboutPage },
      { path: 'services', Component: ServicesPage },
      { path: 'products', Component: ProductsPage },
      { path: 'careers', Component: CareersPage },
      { path: 'contact', Component: ContactPage },
      { path: 'privacy', Component: PrivacyPage },
      { path: 'terms', Component: TermsPage },
      { path: 'cookies', Component: CookiePage },
      { path: 'download', Component: DownloadPage },
      { path: 'products/:id', Component: ProductDetailPage },
      { path: 'apply', Component: ApplyPage },
      { path: '*', Component: NotFoundPage },
    ],
  },
]);
