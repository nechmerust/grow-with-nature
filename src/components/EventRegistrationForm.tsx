import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

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

interface EventRegistrationFormProps {
  event: Event;
  isOpen: boolean;
  onClose: () => void;
}

const formSchema = z.object({
  name: z.string().min(2, 'Jméno musí mít alespoň 2 znaky'),
  email: z.string().email('Neplatná e-mailová adresa'),
  phone: z.string().min(9, 'Neplatné telefonní číslo'),
  message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function EventRegistrationForm({ event, isOpen, onClose }: EventRegistrationFormProps) {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Registration data:', {
        eventId: event.id,
        eventTitle: event.title,
        ...data
      });

      toast({
        title: t('common.success'),
        description: t('events.register_form.success'),
      });

      form.reset();
      onClose();
    } catch (error) {
      toast({
        title: t('common.error'),
        description: t('events.register_form.error'),
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('events.register_form.title')}</DialogTitle>
          <p className="text-sm text-muted-foreground">{event.title}</p>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('events.register_form.name')}</FormLabel>
                  <FormControl>
                    <Input placeholder="Jan Novák" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('events.register_form.email')}</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="jan@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('events.register_form.phone')}</FormLabel>
                  <FormControl>
                    <Input placeholder="+420 123 456 789" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('events.register_form.message')}</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Vaše zpráva nebo dotazy..."
                      className="resize-none"
                      rows={3}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                {t('common.cancel')}
              </Button>
              <Button type="submit" variant="nature" disabled={isSubmitting} className="flex-1">
                {isSubmitting ? t('common.loading') : t('events.register_form.submit')}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}