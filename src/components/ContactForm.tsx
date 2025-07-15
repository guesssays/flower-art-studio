'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Имя обязательно для заполнения';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email обязателен для заполнения';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Пожалуйста, введите корректный email';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Тема обязательна для заполнения';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Сообщение обязательно для заполнения';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Сообщение должно содержать минимум 10 символов';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Имитация отправки формы
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Сброс формы
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setIsSubmitted(false);
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-2xl mx-auto animate-on-scroll">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-display font-semibold text-neutral-900 mb-4">
            Сообщение отправлено!
          </h3>
          <p className="text-neutral-600 leading-relaxed">
            Спасибо за ваше обращение. Мы свяжемся с вами в ближайшее время.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto animate-on-scroll">
      <CardHeader>
        <CardTitle className="text-3xl font-display text-center text-gradient">
          Свяжитесь с нами
        </CardTitle>
        <p className="text-center text-neutral-600 mt-2">
          Мы будем рады помочь вам создать идеальный букет
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-neutral-700">
                Имя *
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Ваше имя"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={errors.name ? 'border-red-300 focus-visible:ring-red-400' : ''}
              />
              {errors.name && (
                <p className="text-sm text-red-500 mt-1">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-neutral-700">
                Email *
              </label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={errors.email ? 'border-red-300 focus-visible:ring-red-400' : ''}
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium text-neutral-700">
              Телефон
            </label>
            <Input
              id="phone"
              type="tel"
              placeholder="+7 (000) 000-00-00"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="subject" className="text-sm font-medium text-neutral-700">
              Тема *
            </label>
            <Input
              id="subject"
              type="text"
              placeholder="Тема вашего обращения"
              value={formData.subject}
              onChange={(e) => handleInputChange('subject', e.target.value)}
              className={errors.subject ? 'border-red-300 focus-visible:ring-red-400' : ''}
            />
            {errors.subject && (
              <p className="text-sm text-red-500 mt-1">{errors.subject}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium text-neutral-700">
              Сообщение *
            </label>
            <Textarea
              id="message"
              placeholder="Расскажите нам о ваших пожеланиях..."
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              className={errors.message ? 'border-red-300 focus-visible:ring-red-400' : ''}
              rows={5}
            />
            {errors.message && (
              <p className="text-sm text-red-500 mt-1">{errors.message}</p>
            )}
          </div>

          <Button
            type="submit"
            variant="premium"
            size="lg"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Отправляем...
              </>
            ) : (
              'Отправить сообщение'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;
