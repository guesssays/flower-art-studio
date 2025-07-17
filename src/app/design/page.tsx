'use client';

import { useState } from 'react';
import Link from 'next/link';
import FloatingWrappingPapers from '@/components/FloatingWrappingPapers';
import {
  useScrollAnimation,
  AnimatedCard,
  StaggerSection
} from '@/components/ScrollAnimations';

export default function DesignPage() {
  const [selectedService, setSelectedService] = useState('consultation');
  const [isVisible, setIsVisible] = useState(true);
  const scrollRef = useScrollAnimation();

const services = [
  {
    id: 'consultation',
    title: 'Консультация по дизайну',
    description: 'Индивидуальная сессия с нашими мастерами-флористами',
    price: 'от 180 000 сум',
    features: [
      'Персональная сессия дизайна',
      'Подбор цветовой палитры',
      'Рекомендации сезонных цветов',
      'Разработка стиля и темы',
      'Создание цифрового макета'
    ],
    duration: '60 минут',
    image: '/flowers/4.jpg',
    recommended: true
  },
  {
    id: 'wedding',
    title: 'Свадебные коллекции',
    description: 'Полный флористический дизайн для вашего торжества',
    price: 'от 2 900 000 сум',
    features: [
      'Дизайн свадебного букета',
      'Букеты для подружек невесты',
      'Украшение церемонии',
      'Центровые композиции для банкета',
      'Персональные букеты и бутоньерки'
    ],
    duration: 'планирование 6–8 недель',
    image: '/flowers/5.jpg',
    recommended: false
  },
  {
    id: 'events',
    title: 'Оформление мероприятий',
    description: 'Корпоративные и специальные флористические инсталляции',
    price: 'от 550 000 сум',
    features: [
      'Индивидуальный стиль оформления',
      'Крупномасштабные инсталляции',
      'Интеграция фирменного стиля',
      'Сезонные тематические решения',
      'Доставка и монтаж включены'
    ],
    duration: 'планирование 2–4 недели',
    image: '/flowers/6.jpg',
    recommended: false
  },
  {
    id: 'subscription',
    title: 'Подписка «Цветы»',
    description: 'Регулярная доставка свежих цветов',
    price: 'от 120 000 сум/мес',
    features: [
      'Еженедельная или ежемесячная доставка',
      'Сезонная ротация ассортимента',
      'Настройка цветовых предпочтений',
      'Премиальная упаковка',
      'Инструкции по уходу'
    ],
    duration: 'непрерывная услуга',
    image: '/flowers/7.jpg',
    recommended: false
  }
];


  const designStyles = [
    {
      name: 'Современный минимализм',
      description: 'Чистые линии и элегантная простота',
      colors: ['#ffffff', '#f5f5f4', '#a8a29e'],
      features: ['Один центральный цветок', 'Нейтральные палитры', 'Геометрические формы']
    },
    {
      name: 'Романтический сад',
      description: 'Нежные, плавные композиции в винтажном стиле',
      colors: ['#fecaca', '#f9a8d4', '#ddd6fe'],
      features: ['Розы и пионы', 'Пастельные оттенки', 'Свободные органические формы']
    },
    {
      name: 'Ярко и смело',
      description: 'Захватывающие цвета и динамичные композиции',
      colors: ['#fbbf24', '#f97316', '#dc2626'],
      features: ['Тропические цветы', 'Яркие цветовые миксы', 'Выразительные центры']
    },
    {
      name: 'Дикие полевые цветы',
      description: 'Непринуждённые, вдохновлённые лугом букеты',
      colors: ['#84cc16', '#eab308', '#f59e0b'],
      features: ['Полевые цветы', 'Природные оттенки', 'Органичные текстуры']
    }
  ];

  return (
    <div className="relative min-h-screen" ref={scrollRef}>
      {/* Летающие обёрточные бумаги на фоне */}
      {isVisible && (
        <div className="fixed inset-0 z-10 pointer-events-none">
          <FloatingWrappingPapers intensity="subtle" showControls={false} autoStart />
        </div>
      )}

      {/* Hero-раздел */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero">
        <div className="relative z-20 max-w-6xl mx-auto px-6 lg:px-8 text-center">
          <div className="animate-on-scroll">
            <p className="text-caption text-neutral-600 mb-6">
              Индивидуальный флористический дизайн
            </p>
            <h1 className="text-hero text-primary mb-8">
              Услуги по индивидуальному дизайну
            </h1>
            <p className="text-subheading text-neutral-700 mb-12 max-w-4xl mx-auto">
              Позвольте нашим мастерам-флористам создать нечто особенное для ваших важных моментов
            </p>
            <p className="text-body-lg text-neutral-600 mb-16 max-w-5xl mx-auto">
              От персональных консультаций до масштабных инсталляций на мероприятиях — 
              мы воплощаем вашу цветочную идею в жизнь с безупречным мастерством и вниманием к деталям.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
              <Link href="/contact" className="btn-primary">
                Записаться на консультацию
              </Link>
              <Link href="/gallery" className="btn-secondary">
                Просмотреть портфолио
              </Link>
            </div>

           
          </div>
        </div>
      </section>

     {/* Раздел услуг */}
<section className="py-24 bg-white">
  <div className="max-w-7xl mx-auto px-6 lg:px-8">
    <div className="text-center mb-20 animate-on-scroll">
      <h2 className="text-headline text-primary mb-6">
        Наши услуги по дизайну
      </h2>
      <p className="text-body-lg text-neutral-600 max-w-3xl mx-auto">
        Выберите из полного спектра наших флористических услуг, каждая из которых создаёт незабываемые впечатления.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {services.map((service) => (
        <div key={service.id} className="flex flex-col items-center">
          {/* Бейдж "Популярно" над карточкой */}
          {service.recommended && (
            <div className="mb-2">
              <span className="bg-accent text-primary text-xs font-semibold px-3 py-1 rounded-md uppercase tracking-wide shadow-md">
                Популярно
              </span>
            </div>
          )}
          <AnimatedCard className="w-full">
            <div
              className={`card-premium cursor-pointer ${selectedService === service.id ? 'ring-2 ring-accent' : ''}`}
              onClick={() => setSelectedService(service.id)}
            >
              <div className="p-8">
                <h3 className="text-xl font-display font-semibold text-primary mb-4">
                  {service.title}
                </h3>
                <p className="text-neutral-600 mb-6">
                  {service.description}
                </p>

                <div className="mb-6">
                  <div className="text-2xl font-display font-bold text-accent mb-2">
                    {service.price}
                  </div>
                  <div className="text-sm text-neutral-500">
                    {service.duration}
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span className="text-neutral-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className={`w-full justify-center ${service.recommended ? 'btn-accent' : 'btn-secondary'}`}
                >
                  Узнать больше
                </Link>
              </div>
            </div>
          </AnimatedCard>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* Стили дизайна */}
      <section className="py-24 bg-gradient-hero">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20 animate-on-scroll">
            <h2 className="text-headline text-primary mb-6">
              Стили дизайна
            </h2>
            <p className="text-body-lg text-neutral-600 max-w-3xl mx-auto">
              Ознакомьтесь с нашими фирменными стилями и выберите идеальный для вашей идеи.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {designStyles.map((style) => (
              <AnimatedCard key={style.name} className="card-premium group cursor-pointer">
                <div className="p-8">
                  <div className="flex space-x-3 mb-6">
                    {style.colors.map((color, idx) => (
                      <div
                        key={idx}
                        className="w-8 h-8 rounded-full border-2 border-white shadow-md"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>

                  <h3 className="text-xl font-display font-semibold text-primary mb-4">
                    {style.name}
                  </h3>
                  <p className="text-neutral-600 mb-6">
                    {style.description}
                  </p>

                  <ul className="space-y-2">
                    {style.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-neutral-600">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Процесс работы */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20 animate-on-scroll">
            <h2 className="text-headline text-primary mb-6">
              Наш процесс работы
            </h2>
            <p className="text-body-lg text-neutral-600 max-w-3xl mx-auto">
              От концепта до реализации — мы сопровождаем вас на каждом этапе воплощения цветочной идеи.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Консультация',
                description: 'Обсуждаем вашу идею, стиль и детали события.'
              },
              {
                step: '02',
                title: 'Разработка дизайна',
                description: 'Готовим подробные предложения с палитрой и выбором цветов.'
              },
              {
                step: '03',
                title: 'Утверждение и доработка',
                description: 'Вносим правки по вашим отзывам до полного соответствия.'
              },
              {
                step: '04',
                title: 'Создание и доставка',
                description: 'Изготавливаем композиции и доставляем с заботой.'
              }
            ].map((step) => (
              <div key={step.step} className="text-center animate-on-scroll">
                <div className="w-16 h-16 bg-accent text-primary font-display font-bold text-xl rounded-full flex items-center justify-center mx-auto mb-6">
                  {step.step}
                </div>
                <h3 className="text-xl font-display font-semibold text-primary mb-4">
                  {step.title}
                </h3>
                <p className="text-neutral-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Отзывы клиентов */}
      <section className="py-24 bg-gradient-hero">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20 animate-on-scroll">
            <h2 className="text-headline text-primary mb-6">
              Истории клиентов
            </h2>
            <p className="text-body-lg text-neutral-600 max-w-3xl mx-auto">
              Узнайте, что говорят наши клиенты о сотрудничестве с нами.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Эмма и Джеймс',
                event: 'Свадьба',
                quote: 'Свадебный букет превзошёл все ожидания. Каждый деталь была идеальна, а цвета — восхитительны.',
                rating: 5
              },
              {
                name: 'Corporate Events Inc.',
                event: 'Корпоративное событие',
                quote: 'Профессиональный сервис от начала до конца. Композиции идеально подошли под наш фирменный стиль.',
                rating: 5
              },
              {
                name: 'Сара М.',
                event: 'День рождения',
                quote: 'Консультация помогла выбрать лучший стиль. Итоговый результат был просто волшебным!',
                rating: 5
              }
            ].map((testimonial) => (
              <AnimatedCard key={testimonial.name} className="card-premium">
                <div className="p-8">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-accent text-lg">★</span>
                    ))}
                  </div>
                  <blockquote className="text-neutral-700 mb-6 italic">
                    "{testimonial.quote}"
                  </blockquote>
                  <div>
                    <div className="font-semibold text-primary">{testimonial.name}</div>
                    <div className="text-sm text-neutral-600">{testimonial.event}</div>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Призыв к действию */}
      <section className="py-24 bg-primary text-secondary">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="animate-on-scroll">
            <h2 className="text-headline mb-8">
              Готовы создать что‑то прекрасное?
            </h2>
            <p className="text-body-lg mb-12 text-neutral-300">
              Давайте воплотим вашу цветочную идею в жизнь. Запишитесь на консультацию сегодня и узнайте все возможности.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/contact" className="btn-accent">
                Записаться на консультацию
              </Link>
              <Link href="/gallery" className="btn-secondary">
                Посмотреть работы
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
