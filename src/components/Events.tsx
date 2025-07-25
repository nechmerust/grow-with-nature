import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Users, MapPin, Clock } from 'lucide-react';
import { EventRegistrationForm } from './EventRegistrationForm';

// Configure moment for calendar
moment.locale('cs');
const localizer = momentLocalizer(moment);

interface Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  description: string;
  location: string;
  maxParticipants: number;
  currentParticipants: number;
  price?: string;
}

// Sample events data
const sampleEvents: Event[] = [
  {
    id: '1',
    title: 'Workshop permakultury',
    start: new Date(2025, 2, 15, 10, 0), // March 15, 2025
    end: new Date(2025, 2, 15, 16, 0),
    description: 'Naučte se základy permakultury a udržitelného hospodářství.',
    location: 'Statek Nech Mě Růst',
    maxParticipants: 20,
    currentParticipants: 12,
    price: '800 Kč'
  },
  {
    id: '2',
    title: 'Víkendový pobyt s přírodou',
    start: new Date(2025, 3, 5, 18, 0), // April 5, 2025
    end: new Date(2025, 3, 7, 14, 0),
    description: 'Dva dny odpočinku a propojení s přírodou.',
    location: 'Statek Nech Mě Růst',
    maxParticipants: 15,
    currentParticipants: 8,
    price: '2500 Kč'
  },
  {
    id: '3',
    title: 'Bylinkářský workshop',
    start: new Date(2025, 4, 20, 9, 0), // May 20, 2025
    end: new Date(2025, 4, 20, 15, 0),
    description: 'Poznávání léčivých rostlin a příprava bylinných preparátů.',
    location: 'Statek Nech Mě Růst',
    maxParticipants: 12,
    currentParticipants: 12,
    price: '1200 Kč'
  }
];

export function Events() {
  const { t } = useTranslation();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  const handleEventSelect = (event: Event) => {
    setSelectedEvent(event);
  };

  const handleRegister = (event: Event) => {
    setSelectedEvent(event);
    setShowRegistrationForm(true);
  };

  const isEventFull = (event: Event) => {
    return event.currentParticipants >= event.maxParticipants;
  };

  const getAvailableSpots = (event: Event) => {
    return event.maxParticipants - event.currentParticipants;
  };

  return (
    <section id="events" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t('events.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('events.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calendar */}
          <div className="bg-card rounded-lg p-6 shadow-soft">
            <h3 className="text-2xl font-semibold mb-6 flex items-center">
              <CalendarDays className="h-6 w-6 mr-2 text-primary" />
              Kalendář událostí
            </h3>
            <div className="h-96">
              <Calendar
                localizer={localizer}
                events={sampleEvents}
                startAccessor="start"
                endAccessor="end"
                style={{ height: '100%' }}
                onSelectEvent={handleEventSelect}
                eventPropGetter={(event) => ({
                  style: {
                    backgroundColor: isEventFull(event as Event) ? '#ef4444' : 'hsl(var(--primary))',
                    borderColor: isEventFull(event as Event) ? '#dc2626' : 'hsl(var(--primary-glow))',
                  }
                })}
                messages={{
                  next: 'Další',
                  previous: 'Předchozí',
                  today: 'Dnes',
                  month: 'Měsíc',
                  week: 'Týden',
                  day: 'Den',
                  agenda: 'Agenda',
                  date: 'Datum',
                  time: 'Čas',
                  event: 'Událost',
                }}
              />
            </div>
          </div>

          {/* Event Details */}
          <div className="space-y-6">
            {selectedEvent ? (
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {selectedEvent.title}
                    {isEventFull(selectedEvent) ? (
                      <Badge variant="destructive">{t('events.full')}</Badge>
                    ) : (
                      <Badge variant="secondary">
                        {t('events.available_spots', { count: getAvailableSpots(selectedEvent) })}
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{selectedEvent.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Clock className="h-4 w-4 mr-2 text-primary" />
                      {moment(selectedEvent.start).format('DD.MM.YYYY HH:mm')} - {moment(selectedEvent.end).format('HH:mm')}
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-2 text-primary" />
                      {selectedEvent.location}
                    </div>
                    <div className="flex items-center text-sm">
                      <Users className="h-4 w-4 mr-2 text-primary" />
                      {selectedEvent.currentParticipants}/{selectedEvent.maxParticipants} účastníků
                    </div>
                    {selectedEvent.price && (
                      <div className="text-lg font-semibold text-primary">
                        {selectedEvent.price}
                      </div>
                    )}
                  </div>

                  <Button
                    className="w-full"
                    variant={isEventFull(selectedEvent) ? "secondary" : "nature"}
                    disabled={isEventFull(selectedEvent)}
                    onClick={() => handleRegister(selectedEvent)}
                  >
                    {isEventFull(selectedEvent) ? t('events.full') : t('events.register')}
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-dashed border-2 border-muted">
                <CardContent className="p-8 text-center">
                  <CalendarDays className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Klikněte na událost v kalendáři pro zobrazení detailů
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Upcoming Events List */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Nadcházející události</h3>
              {sampleEvents.map((event) => (
                <Card
                  key={event.id}
                  className="cursor-pointer hover:shadow-soft transition-shadow duration-200 border-l-4 border-l-primary"
                  onClick={() => handleEventSelect(event)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">{event.title}</h4>
                      <Badge variant={isEventFull(event) ? "destructive" : "default"}>
                        {isEventFull(event) ? t('events.full') : `${getAvailableSpots(event)} míst`}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {moment(event.start).format('DD.MM.YYYY HH:mm')}
                    </p>
                    <p className="text-sm">{event.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Registration Form Modal */}
      {showRegistrationForm && selectedEvent && (
        <EventRegistrationForm
          event={selectedEvent}
          isOpen={showRegistrationForm}
          onClose={() => setShowRegistrationForm(false)}
        />
      )}
    </section>
  );
}