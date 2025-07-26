import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { Footer } from '@/components/Footer';

const Index = () => {
  console.log('Index.tsx: Index page rendering...');
  
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Footer />
    </div>
  );
};

export default Index;
