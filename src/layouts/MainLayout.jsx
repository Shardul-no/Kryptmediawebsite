import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppFixed from '../components/WhatsAppFixed';

/**
 * Main layout wrapper used by all pages.
 * Provides consistent Navbar and Footer around page content.
 */
export default function MainLayout() {
  return (
    <div className="min-h-[100dvh] bg-tan-100 text-charcoal">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <WhatsAppFixed />
      <Footer />
    </div>
  );
}
