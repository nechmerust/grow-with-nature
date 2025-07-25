import { Navigation } from '@/components/Navigation';
import { Events } from '@/components/Events';
import { Footer } from '@/components/Footer';

const EventsPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Events />
      <Footer />
    </div>
  );
};

export default EventsPage;