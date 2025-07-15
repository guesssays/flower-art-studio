'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useScrollAnimation, AnimatedCard } from '@/components/ScrollAnimations';
import { useEffect, useRef } from 'react';

// Галерея коллекций с ценами в сумах и локальными картинками
const flowerCollections = [
  {
    id: 'romantic',
    name: 'Романтическая коллекция',
    description: 'Яркие романтичные букеты с миксом тюльпанов, роз и весенних акцентов. Идеально для признаний и особых моментов.',
    flowers: ['Тюльпан', 'Роза', 'Пион', 'Гипсофила'],
    image: '/flowers/4.jpg',
    price: '180 000 – 290 000 сум'
  },
  {
    id: 'modern',
    name: 'Современная коллекция',
    description: 'Большие стильные композиции в модных тонах. Выразительные формы и уникальное сочетание цветущих растений.',
    flowers: ['Пион', 'Гвоздика', 'Статица', 'Эвкалипт', 'Вероника'],
    image: '/flowers/5.jpg',
    price: '230 000 – 360 000 сум'
  },
  {
    id: 'rustic',
    name: 'Рустикальная коллекция',
    description: 'Полевые цветы, зелень, простота и природная фактура. Для уютных тёплых событий и творческих душ.',
    flowers: ['Роза', 'Лаванда', 'Тюльпан', 'Гипсофила', 'Зелень'],
    image: '/flowers/6.jpg',
    price: '150 000 – 260 000 сум'
  },
  {
    id: 'seasonal',
    name: 'Сезонная коллекция',
    description: 'Свежие сезонные цветы и оттенки весны. Букеты, вдохновлённые временем года и переменой природы.',
    flowers: ['Ранункулюс', 'Анемона', 'Тюльпан', 'Мимоза'],
    image: '/flowers/7.jpg',
    price: '160 000 – 280 000 сум'
  },
  {
    id: 'luxury',
    name: 'Люксовая коллекция',
    description: 'Экзотические цветы и сочные оттенки для особых случаев и больших событий.',
    flowers: ['Роза', 'Пион', 'Орхидея', 'Гортензия'],
    image: '/flowers/8.jpg',
    price: '370 000 – 700 000 сум'
  },
  {
    id: 'exclusive',
    name: 'Эксклюзивная коллекция',
    description: 'Редкие сорта и уникальные композиции для взыскательных клиентов.',
    flowers: ['Редкая роза', 'Гортензия', 'Суккулент', 'Магнолия'],
    image: '/flowers/9.jpg',
    price: '900 000 – 1 700 000 сум'
  },
  {
    id: 'deluxe',
    name: 'Делюкс коллекция',
    description: 'Элитные букеты из пионов, амариллисов и экзотических растений. Для самой важной атмосферы.',
    flowers: ['Пион Корал', 'Гиацинт', 'Амариллис', 'Лотос'],
    image: '/flowers/10.jpg',
    price: '2 100 000 – 3 300 000 сум'
  },
  {
    id: 'gentle',
    name: 'Нежность весны',
    description: 'Воздушные пастельные букеты с мимозой и фрезией для лёгкого настроения.',
    flowers: ['Мимоза', 'Фрезия', 'Ирис', 'Гиацинт'],
    image: '/flowers/11.jpg',
    price: '120 000 – 210 000 сум'
  },
  {
    id: 'tropical',
    name: 'Тропическая коллекция',
    description: 'Яркие экзотические цветы для энергичных моментов и летних праздников.',
    flowers: ['Банановый лист', 'Антуриум', 'Стрелиция', 'Гузмания'],
    image: '/flowers/12.jpg',
    price: '340 000 – 550 000 сум'
  }
];



export default function GalleryPage() {
  const scrollRef = useScrollAnimation();

  useEffect(() => {
    if (!scrollRef.current) return;
    // Можно добавить дополнительные эффекты, если нужно
  }, [scrollRef]);

  return (
    <div className="relative min-h-screen" ref={scrollRef}>
      {/* Легкий фон с плавным переходом */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#f5f5f8] via-[#fafafc] to-[#fff]" />

      {/* Хедер */}
      <section className="relative flex items-center justify-center pt-24 pb-16 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center">
          <div className="animate-on-scroll">
            <p className="text-caption text-neutral-600 mb-6 tracking-widest uppercase">
              Виртуальная галерея
            </p>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight font-display text-primary mb-2 drop-shadow-lg">
              GOODVEEN Gallery
            </h1>
            <div className="flex justify-center mb-8">
              <span className="block text-xl md:text-2xl lg:text-3xl text-neutral-500 font-light tracking-widest">
                Авторские коллекции
              </span>
            </div>
            <p className="text-xl md:text-2xl text-neutral-700 mb-4 font-light max-w-3xl mx-auto">
              Премиальные композиции для вашего настроения, созданные лучшими флористами GOODVEEN.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-4">
              <Link href="/design" className="btn-primary">
                Дизайн вашего букета
              </Link>
              <Link href="/contact" className="btn-secondary">
                Связаться с флористами
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Карточки коллекций */}
      <section className="py-12 bg-transparent">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 animate-on-scroll">
            {flowerCollections.map((item, idx) => (
              <AnimatedCard key={item.id} className="card-premium group cursor-pointer">
                <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-pink-50 to-purple-100 relative">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority={idx === 0}
                  />
                  <div className="absolute inset-0 bg-white/10 group-hover:bg-primary/10 transition-colors duration-300" />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-display font-semibold text-primary mb-4">{item.name}</h3>
                  <p className="text-neutral-600 mb-4">{item.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {item.flowers.map(flower => (
                      <span key={flower} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">{flower}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg text-primary">{item.price}</span>
                    <Link href="/design" className="text-primary hover:text-accent underline text-sm font-medium transition-colors duration-200">
                      Хочу такой
                    </Link>
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
            <h2 className="text-headline mb-8 font-display">
              Закажите идеальный букет в 1 клик!
            </h2>
            <p className="text-body-lg mb-12 text-neutral-200">
              Напишите нам или создайте уникальный дизайн — флорист GOODVEEN подберёт лучшие свежие цветы и оформление для любого случая.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/design" className="btn-accent">
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
