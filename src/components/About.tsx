import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Eye, Target, Heart, CheckCircle } from 'lucide-react';

export function About() {
  const { t } = useTranslation();

  const values = t('about.values', { returnObjects: true }) as string[];

  return (
    <section id="about" className="py-20 bg-gradient-earth">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t('about.title')}
          </h2>
        </div>

        {/* Vision, Mission & Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Vision */}
          <Card className="group hover:shadow-nature transition-all duration-300 hover:-translate-y-2">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <Eye className="h-12 w-12 text-primary mx-auto group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                {t('about.vision_title')}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t('about.vision_text')}
              </p>
            </CardContent>
          </Card>

          {/* Mission */}
          <Card className="group hover:shadow-nature transition-all duration-300 hover:-translate-y-2">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <Target className="h-12 w-12 text-primary mx-auto group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                {t('about.mission_title')}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t('about.mission_text')}
              </p>
            </CardContent>
          </Card>

          {/* Values */}
          <Card className="group hover:shadow-nature transition-all duration-300 hover:-translate-y-2 md:col-span-2 lg:col-span-1">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <Heart className="h-12 w-12 text-primary mx-auto group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-6 text-center">
                {t('about.values_title')}
              </h3>
              <ul className="space-y-3">
                {values.map((value, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">{value}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}