import { useTranslation } from 'react-i18next';
import { Sprout, Heart, Mail, Phone, MapPin, Instagram, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Footer() {
  const { t } = useTranslation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <Sprout className="h-8 w-8" />
              <span className="font-bold text-2xl">Nech Mě Růst</span>
            </div>
            <p className="text-primary-foreground/80 max-w-md">
              Tvoříme prostor pro růst duše, srdce i přírody. Přidejte se k našemu společenství a objevte harmonii s přírodou.
            </p>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" asChild className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                <a href="https://instagram.com/nech_me_rust" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                <a href="https://facebook.com/nechmerust" target="_blank" rel="noopener noreferrer">
                  <Facebook className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Rychlé odkazy</h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>
                <button 
                  onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-primary-foreground transition-colors"
                >
                  {t('nav.about')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.querySelector('#events')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-primary-foreground transition-colors"
                >
                  {t('nav.events')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.querySelector('#support')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-primary-foreground transition-colors"
                >
                  {t('nav.support')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-primary-foreground transition-colors"
                >
                  {t('nav.contact')}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Kontakt</h3>
            <div className="space-y-3 text-primary-foreground/80">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:info@nechmerust.org" className="hover:text-primary-foreground transition-colors">
                  info@nechmerust.org
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <a href="tel:+420123456789" className="hover:text-primary-foreground transition-colors">
                  +420 123 456 789
                </a>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-1" />
                <div>
                  <p>Nech Mě Růst z.s.</p>
                  <p>123 45 Krásná Příroda</p>
                  <p>Česká republika</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-primary-foreground/80 text-sm">
            {t('footer.copyright')}
          </p>
          <div className="flex items-center space-x-2 text-primary-foreground/80 text-sm mt-4 md:mt-0">
            <Heart className="h-4 w-4 text-red-400" />
            <span>{t('footer.made_with_love')}</span>
          </div>
        </div>

        {/* Back to Top */}
        <div className="text-center mt-8">
          <Button 
            variant="outline" 
            onClick={scrollToTop}
            className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
          >
            ↑ Zpět nahoru
          </Button>
        </div>
      </div>
    </footer>
  );
}