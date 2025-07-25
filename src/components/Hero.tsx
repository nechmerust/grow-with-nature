import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { ArrowDown, Heart, Leaf } from 'lucide-react';
import heroImage from '@/assets/hero-forest.jpg';

export function Hero() {
  const { t } = useTranslation();

  const scrollToAbout = () => {
    const element = document.querySelector('#about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToEvents = () => {
    const element = document.querySelector('#events');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Animated Icons */}
          <div className="flex justify-center space-x-8 mb-8">
            <Leaf className="h-12 w-12 text-accent animate-bounce" style={{ animationDelay: '0s' }} />
            <Heart className="h-12 w-12 text-accent animate-bounce" style={{ animationDelay: '0.5s' }} />
            <Leaf className="h-12 w-12 text-accent animate-bounce" style={{ animationDelay: '1s' }} />
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            {t('hero.title')}
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            {t('hero.subtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button
              size="lg"
              variant="sunrise"
              onClick={scrollToEvents}
              className="text-lg px-8 py-4"
            >
              {t('hero.cta')}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={scrollToAbout}
              className="text-lg px-8 py-4 text-white border-white/30 hover:bg-white/10"
            >
              {t('hero.learn_more')}
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div className="pt-16">
            <button
              onClick={scrollToAbout}
              className="animate-bounce text-white/70 hover:text-white transition-colors"
            >
              <ArrowDown className="h-8 w-8" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}