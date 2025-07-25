import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Events } from '@/components/Events';
import { Support } from '@/components/Support';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Events />
      <Support />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
