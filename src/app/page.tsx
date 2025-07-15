'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import FloatingWrappingPapers from '@/components/FloatingWrappingPapers';
import { useScrollAnimation, useParallax, AnimatedCard, CountUp } from '@/components/ScrollAnimations';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const scrollRef = useScrollAnimation();

  useParallax();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen" ref={scrollRef}>
      {/* Летающие обёрточные бумаги */}
      <div className="fixed inset-0 z-10 pointer-events-none">
        <FloatingWrappingPapers intensity="medium" showControls={false} autoStart />
      </div>

      {/* Hero-раздел */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero " />
        {/* Контент Hero */}
        <div className="relative z-20 max-w-6xl mx-auto px-6 lg:px-8 text-center">
          <div className="animate-on-scroll">
            <p className="text-caption text-neutral-600 mb-6">
              Премиальная флористика
            </p>
            <h1 className="text-hero text-primary mb-2 font-extrabold tracking-tight">
              GOODVEEN
            </h1>
            <div className="flex justify-center mb-8">
              <span className="block text-2xl md:text-3xl lg:text-4xl text-neutral-500 font-light tracking-widest">
                Flower House
              </span>
            </div>
            <p className="text-subheading text-neutral-700 mb-12 max-w-3xl mx-auto">
              Природная красота в новом воплощении
            </p>
            <p className="text-body-lg text-neutral-600 mb-16 max-w-4xl mx-auto">
              Откройте для себя яркие цветочные композиции, создающие неповторимые
              моменты. От летних букетов до элегантных сезонных коллекций —
              мы превращаем природу в искусство.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
              <Link href="/gallery" className="btn-primary">
                Смотреть коллекции
              </Link>
              <Link href="/contact" className="btn-secondary">
                Консультация дизайнера
              </Link>
            </div>
          </div>
        </div>
  
      </section>

      {/* Раздел статистики */}
      <section className="py-20 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            <div className="text-center animate-on-scroll">
              <div className="text-4xl md:text-5xl font-display font-bold text-accent mb-2">
                <CountUp end={10000} suffix="+" />
              </div>
              <p className="text-caption text-neutral-600">Довольных клиентов</p>
            </div>
            <div className="text-center animate-on-scroll">
              <div className="text-4xl md:text-5xl font-display font-bold text-green-600 mb-2">
                <CountUp end={500} suffix="+" />
              </div>
              <p className="text-caption text-neutral-600">Уникальных букетов</p>
            </div>
            <div className="text-center animate-on-scroll">
              <div className="text-4xl md:text-5xl font-display font-bold text-pink-500 mb-2">
                <CountUp end={50} suffix="+" />
              </div>
              <p className="text-caption text-neutral-600">Видов цветов</p>
            </div>
            <div className="text-center animate-on-scroll">
              <div className="text-4xl md:text-5xl font-display font-bold text-purple-600 mb-2">
                <CountUp end={5} />
              </div>
              <p className="text-caption text-neutral-600">Коллекций</p>
            </div>
          </div>
        </div>
      </section>

      {/* Раздел коллекций */}
      <section className="py-24 bg-gradient-hero">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20 animate-on-scroll">
            <h2 className="text-headline text-primary mb-6">
              Яркие коллекции
            </h2>
            <p className="text-body-lg text-neutral-600 max-w-3xl mx-auto">
              Каждая коллекция — это взрыв цвета и характера,
              отражающий дикую красоту природы.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Карточка 1 */}
           {/* Карточка 1 */}
<AnimatedCard className="card-premium group cursor-pointer">
  <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-yellow-100 to-orange-200 relative">
    <span className="absolute top-4 left-4 bg-accent text-primary text-xs font-semibold px-3 py-1 uppercase tracking-wide">
      Весенний хит
    </span>
    <img
      src="/flowers/1.jpg"
      alt="Весенняя коллекция тюльпанов"
      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
    />
  </div>
  <div className="p-8">
    <h3 className="text-2xl font-display font-semibold text-primary mb-4">
      Коллекция тюльпанов
    </h3>
    <p className="text-neutral-600 mb-6">
      Яркие и свежие тюльпаны всех оттенков, символ весны и хорошего настроения.
    </p>
    <ul className="space-y-2 text-sm text-neutral-600 mb-8">
      <li>Тюльпаны разноцветные</li>
    </ul>
    <Link href="/gallery" className="inline-flex items-center text-primary font-medium hover:text-accent transition-colors duration-300">
      Смотреть коллекцию
      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  </div>
</AnimatedCard>

{/* Карточка 2 */}
<AnimatedCard className="card-premium group cursor-pointer">
  <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-pink-100 to-rose-200 relative">
    <span className="absolute top-4 left-4 bg-pink-500 text-white text-xs font-semibold px-3 py-1 uppercase tracking-wide">
      Хит сезона
    </span>
    <img
      src="/flowers/2.jpg"
      alt="Современная коллекция"
      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
    />
  </div>
  <div className="p-8">
    <h3 className="text-2xl font-display font-semibold text-primary mb-4">
      Яркий микс
    </h3>
    <p className="text-neutral-600 mb-6">
      Смелое сочетание гербер, ранункулюсов и роз в современных цветах. Для тех, кто любит необычные букеты!
    </p>
    <ul className="space-y-2 text-sm text-neutral-600 mb-8">
      <li>Герберы, ранункулюсы, розы, зелёные акценты</li>
    </ul>
    <Link href="/gallery" className="inline-flex items-center text-primary font-medium hover:text-accent transition-colors duration-300">
      Смотреть коллекцию
      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  </div>
</AnimatedCard>

{/* Карточка 3 */}
<AnimatedCard className="card-premium group cursor-pointer">
  <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-emerald-100 to-green-200 relative">
    <span className="absolute top-4 left-4 bg-emerald-500 text-white text-xs font-semibold px-3 py-1 uppercase tracking-wide">
      Яркая классика
    </span>
    <img
      src="/flowers/3.jpg"
      alt="Классическая коллекция"
      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
    />
  </div>
  <div className="p-8">
    <h3 className="text-2xl font-display font-semibold text-primary mb-4">
      Классическая коллекция
    </h3>
    <p className="text-neutral-600 mb-6">
      Роскошный букет для ярких событий — герберы, розы и антуриумы в тёплой гамме.
    </p>
    <ul className="space-y-2 text-sm text-neutral-600 mb-8">
      <li>Герберы, розы, антуриум, декоративные цветы</li>
    </ul>
    <Link href="/gallery" className="inline-flex items-center text-primary font-medium hover:text-accent transition-colors duration-300">
      Смотреть коллекцию
      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  </div>
</AnimatedCard>

          </div>
        </div>
      </section>

      {/* Призыв к действию */}
      <section className="py-24 bg-primary text-secondary">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="animate-on-scroll">
            <h2 className="text-headline mb-8">
              Готовы добавить цвета в ваш мир?
            </h2>
            <p className="text-body-lg mb-12 text-neutral-300">
              Будь то особое событие или желание украсить будни,
              наши яркие композиции принесут радость в каждый день.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/gallery" className="btn-accent">
                Посмотреть галерею
              </Link>
              <Link href="/design" className="btn-secondary">
                Создать дизайн
              </Link>
              <Link href="/contact" className="btn-secondary">
                Связаться с нами
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
