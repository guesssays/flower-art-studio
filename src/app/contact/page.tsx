'use client';

import { useState } from 'react';
import Link from 'next/link';
import FloatingWrappingPapers from '@/components/FloatingWrappingPapers';
import {
  useScrollAnimation,
  AnimatedCard
} from '@/components/ScrollAnimations';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  eventDate: string;
  budget: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function ContactPage() {
  const [isVisible, setIsVisible] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const scrollRef = useScrollAnimation();

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    eventDate: '',
    budget: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const services = [
    'Консультация по дизайну',
    'Свадебные композиции',
    'Оформление мероприятий',
    'Подписка «Цветы»',
    'Корпоративные букеты',
    'Специальные случаи'
  ];

  const budgetRanges = [
    'До 50 000 ₽',
    '50 000 – 100 000 ₽',
    '100 000 – 250 000 ₽',
    '250 000 – 500 000 ₽',
    '500 000 – 1 000 000 ₽',
    'Более 1 000 000 ₽'
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Имя обязательно';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Фамилия обязательна';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email обязателен';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Введите корректный email';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Телефон обязателен';
    }
    if (!formData.service) {
      newErrors.service = 'Выберите услугу';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Сообщение обязательно';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Сообщение должно быть не менее 10 символов';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitted(true);
    } catch {
      console.error('Ошибка отправки формы');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="relative min-h-screen" ref={scrollRef}>
        {isVisible && (
          <div className="fixed inset-0 z-10 pointer-events-none">
            <FloatingWrappingPapers intensity="subtle" showControls={false} autoStart />
          </div>
        )}
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero">
          <div className="relative z-20 max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <div className="animate-on-scroll">
              <div className="w-24 h-24 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-8">
                <span className="text-primary text-4xl">✓</span>
              </div>
              <h1 className="text-headline text-primary mb-8">
                Спасибо!
              </h1>
              <p className="text-body-lg text-neutral-600 mb-12 max-w-2xl mx-auto">
                Мы получили ваше сообщение и свяжемся с вами в течение 24 часов.  
                Нам не терпится воплотить вашу цветочную идею в жизнь!
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link href="/" className="btn-primary">
                  На главную
                </Link>
                <Link href="/gallery" className="btn-secondary">
                  Перейти в галерею
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen" ref={scrollRef}>
      {isVisible && (
        <div className="fixed inset-0 z-10 pointer-events-none">
          <FloatingWrappingPapers intensity="subtle" showControls={false} autoStart />
        </div>
      )}

      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-hero">
        <div className="relative z-20 max-w-6xl mx-auto px-6 lg:px-8 text-center">
          <div className="animate-on-scroll">
            <p className="text-caption text-neutral-600 mb-6">
              Свяжитесь с нами
            </p>
            <h1 className="text-hero text-primary mb-8">
              Контактная форма
            </h1>
            <p className="text-subheading text-neutral-700 mb-12 max-w-4xl mx-auto">
              Готовы создать что‑то прекрасное вместе?
            </p>
            <p className="text-body-lg text-neutral-600 mb-16 max-w-5xl mx-auto">
              Планируете свадьбу, особое событие или просто хотите украсить пространство?  
              Расскажите нам о своей идее — мы поможем воплотить её в жизнь.
            </p>
           
          </div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
   <section className="py-24 bg-gradient-hero">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* Contact Form */}
            <div className="animate-on-scroll">
              <div className="card-premium p-8 lg:p-12">
                <h2 className="text-headline text-primary mb-8">
                  Отправьте нам сообщение
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="form-label">
                        Имя *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`form-input ${errors.firstName ? 'border-red-500' : ''}`}
                        placeholder="Ваше имя"
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm mt-2">{errors.firstName}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="lastName" className="form-label">
                        Фамилия *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`form-input ${errors.lastName ? 'border-red-500' : ''}`}
                        placeholder="Ваша фамилия"
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm mt-2">{errors.lastName}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="form-label">
                        E-mail *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`form-input ${errors.email ? 'border-red-500' : ''}`}
                        placeholder="ваш@почта.ру"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-2">{errors.email}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="phone" className="form-label">
                        Телефон *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`form-input ${errors.phone ? 'border-red-500' : ''}`}
                        placeholder="+7 (999) 123‑45‑67"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-2">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="service" className="form-label">
                        Услуга *
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        className={`form-input ${errors.service ? 'border-red-500' : ''}`}
                      >
                        <option value="">Выберите услугу</option>
                        {services.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      {errors.service && (
                        <p className="text-red-500 text-sm mt-2">{errors.service}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="eventDate" className="form-label">
                        Дата события
                      </label>
                      <input
                        type="date"
                        id="eventDate"
                        name="eventDate"
                        value={formData.eventDate}
                        onChange={handleInputChange}
                        className="form-input"
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="budget" className="form-label">
                      Ориентировочный бюджет
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="form-input"
                    >
                      <option value="">Выберите диапазон</option>
                      {budgetRanges.map(b => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="form-label">
                      Расскажите о своей идее *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      className={`form-input resize-vertical ${errors.message ? 'border-red-500' : ''}`}
                      placeholder="Опишите мероприятие, стиль, цветовые акценты либо любые пожелания…"
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-2">{errors.message}</p>
                    )}
                    <p className="text-sm text-neutral-500 mt-2">
                      Минимум 10 символов
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full btn-primary ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? 'Отправка…' : 'Отправить сообщение'}
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="animate-on-scroll space-y-8">
              <div className="card-premium p-8">
                <h3 className="text-xl font-display font-semibold text-primary mb-6">
                  Наш адрес
                </h3>
                <p className="text-neutral-600">
                  123 Flower Street<br />
                  Design District<br />
                  New York, NY 10001
                </p>
              </div>

              <div className="card-premium p-8">
                <h3 className="text-xl font-display font-semibold text-primary mb-6">
                  Телефон
                </h3>
                <p className="text-neutral-600">+1 (555) 123‑4567</p>
              </div>

              <div className="card-premium p-8">
                <h3 className="text-xl font-display font-semibold text-primary mb-6">
                  E‑mail
                </h3>
                <p className="text-neutral-600">hello@bloomandcreate.com</p>
              </div>

              {/* Studio Hours */}
              <div className="card-premium p-8">
                <h3 className="text-xl font-display font-semibold text-primary mb-6">
                  Часы работы
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Понедельник – Пятница</span>
                    <span className="font-medium text-primary">9:00 – 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Суббота</span>
                    <span className="font-medium text-primary">10:00 – 16:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Воскресенье</span>
                    <span className="font-medium text-primary">По записи</span>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-accent/10 rounded-lg">
                  <p className="text-sm text-neutral-700">
                    <strong>Консультации только по записи.</strong> 
                    Пожалуйста, позвоните или забронируйте онлайн.
                  </p>
                </div>
              </div>

              {/* Map */}
              <div className="card-premium p-8">
                <h3 className="text-xl font-display font-semibold text-primary mb-6">
                  Мы на карте
                </h3>
                <div className="aspect-video bg-neutral-100 rounded-lg overflow-hidden mb-6">
                  {/* Здесь можно вставить iframe с картой, если нужно */}
                  <iframe
                    src="https://maps.google.com/?q=123+Flower+Street,+New+York,+NY+10001&output=embed"
                    className="w-full h-full border-0"
                    allowFullScreen
                  />
                </div>
                <a
                  href="https://maps.google.com/?q=123+Flower+Street,+New+York,+NY+10001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary inline-block"
                >
                  Открыть в Google Картах
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gradient-hero">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-headline text-primary mb-6">
              Часто задаваемые вопросы
            </h2>
            <p className="text-body-lg text-neutral-600">
              Всё, что вам нужно знать о наших услугах и процессе работы.
            </p>
          </div>
          <div className="space-y-6">
            {[
              {
                question: "За сколько заранее стоит бронировать?",
                answer:  "Рекомендуем бронировать за 2–4 недели для стандартных заказов и за 6–8 недель для свадеб или крупных мероприятий. Срочные заказы также возможны."
              },
              {
                question: "Предоставляете ли вы доставку?",
                answer:  "Да! Доставляем по всему Нью-Йорку. Стоимость доставки рассчитывается при оформлении заказа."
              },
              {
                question: "Можно ли посмотреть примеры вашей работы?",
                answer:  "Конечно! Просмотрите нашу галерею онлайн, посетите студию или запишитесь на консультацию для просмотра портфолио."
              },
              {
                question: "Что делать, если нужно изменить заказ?",
                answer:  "Изменения принимаются до 48 часов до даты доставки. Пожалуйста, свяжитесь с нами как можно раньше."
              },
              {
                question: "Работаете ли вы с разными бюджетами?",
                answer:  "Да, мы создаём красивые композиции в любом ценовом диапазоне. На консультации обсудим подходящие варианты."
              }
            ].map((faq, i) => (
              <AnimatedCard key={i} className="card-premium">
                <div className="p-8">
                  <h3 className="text-lg font-display font-semibold text-primary mb-4">
                    {faq.question}
                  </h3>
                  <p className="text-neutral-600">
                    {faq.answer}
                  </p>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
