import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, HandHeart, Share2, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export function Support() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const bankAccount = "123456789/0100"; // Replace with actual bank account

  const copyBankAccount = async () => {
    try {
      await navigator.clipboard.writeText(bankAccount);
      setCopied(true);
      toast({
        title: t('common.success'),
        description: t('support.copy_account'),
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <section id="support" className="py-20 bg-gradient-earth">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t('support.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('support.subtitle')}
          </p>
        </div>

        {/* Support Options Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Financial Support */}
          <Card className="group hover:shadow-nature transition-all duration-300 hover:-translate-y-2">
            <CardHeader className="text-center">
              <div className="mb-4">
                <Heart className="h-12 w-12 text-primary mx-auto group-hover:scale-110 transition-transform duration-300" />
              </div>
              <CardTitle className="text-2xl">{t('support.donate_title')}</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-muted-foreground">
                {t('support.donate_text')}
              </p>
              
              <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                <p className="text-sm font-medium">{t('support.bank_account')}</p>
                <div className="flex items-center justify-between bg-background/80 rounded px-3 py-2">
                  <span className="font-mono text-sm">{bankAccount}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={copyBankAccount}
                    className="h-8 w-8 p-0"
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <Button variant="nature" className="w-full">
                <Heart className="h-4 w-4 mr-2" />
                Darovat
              </Button>
            </CardContent>
          </Card>

          {/* Volunteering */}
          <Card className="group hover:shadow-nature transition-all duration-300 hover:-translate-y-2">
            <CardHeader className="text-center">
              <div className="mb-4">
                <HandHeart className="h-12 w-12 text-primary mx-auto group-hover:scale-110 transition-transform duration-300" />
              </div>
              <CardTitle className="text-2xl">{t('support.volunteer_title')}</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-muted-foreground">
                {t('support.volunteer_text')}
              </p>

              <div className="space-y-2">
                <Badge variant="secondary" className="mr-2">Práce na statku</Badge>
                <Badge variant="secondary" className="mr-2">Workshopy</Badge>
                <Badge variant="secondary">Organizace akcí</Badge>
              </div>

              <Button variant="outline" className="w-full">
                <HandHeart className="h-4 w-4 mr-2" />
                Chci pomoci
              </Button>
            </CardContent>
          </Card>

          {/* Sharing */}
          <Card className="group hover:shadow-nature transition-all duration-300 hover:-translate-y-2">
            <CardHeader className="text-center">
              <div className="mb-4">
                <Share2 className="h-12 w-12 text-primary mx-auto group-hover:scale-110 transition-transform duration-300" />
              </div>
              <CardTitle className="text-2xl">{t('support.share_title')}</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-muted-foreground">
                {t('support.share_text')}
              </p>

              <div className="space-y-2">
                <Badge variant="secondary" className="mr-2">Facebook</Badge>
                <Badge variant="secondary" className="mr-2">Instagram</Badge>
                <Badge variant="secondary">Word of mouth</Badge>
              </div>

              <Button variant="outline" className="w-full">
                <Share2 className="h-4 w-4 mr-2" />
                Sdílet
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="bg-gradient-forest text-primary-foreground max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                Společně vytváříme lepší svět
              </h3>
              <p className="text-primary-foreground/90 mb-6">
                Každý příspěvek, ať už finanční, časový nebo v podobě sdílení našeho poslání, nám pomáhá růst a rozvíjet naši vizi.
              </p>
              <Button size="lg" variant="sunrise">
                Kontaktujte nás
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}