import { useEffect } from 'react';
import ContactSection from '../components/ContactSection';

export default function ContactPageRoute() {
  useEffect(() => {
    document.title = 'Contact Us | Krypt Media';
  }, []);

  return (
    <div id="contact">
      <ContactSection />
    </div>
  );
}
