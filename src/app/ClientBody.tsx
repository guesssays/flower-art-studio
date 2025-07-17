'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Premium Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-neutral-200/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo & Brand */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-accent rounded-none flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <span className="text-white font-display font-bold text-lg">N</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-lg font-semibold text-primary leading-none md:text-2xl">
                  Your Logo
                </span>
                <span className="text-caption text-neutral-600 leading-none text-xs md:text-sm">
                  Flower House
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-12">
              <Link href="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>
                Главная
              </Link>
              <Link href="/gallery" className={`nav-link ${pathname === '/gallery' ? 'active' : ''}`}>
                Галерея
              </Link>
              <Link href="/design" className={`nav-link ${pathname === '/design' ? 'active' : ''}`}>
                Индивидуальный букет
              </Link>
              <Link href="/contact" className={`nav-link ${pathname === '/contact' ? 'active' : ''}`}>
                Контакты
              </Link>
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Link href="/contact" className="btn-accent">
                Оставить заявку
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center"
              aria-label="Переключить меню"
            >
              <span
                className={`block w-8 h-1 rounded-full bg-neutral-900 transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45 translate-y-2' : '-translate-y-2'
                }`}
              />
              <span
                className={`block w-8 h-1 rounded-full bg-neutral-900 transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`block w-8 h-1 rounded-full bg-neutral-900 transition-all duration-300 ${
                  isMenuOpen ? '-rotate-45 -translate-y-2' : 'translate-y-2'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden absolute top-full left-0 right-0 bg-white transition-all duration-300 border-b border-neutral-200/50 shadow ${
            isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        >
          <div className="flex flex-col items-center justify-center px-6 py-10 space-y-7">
            <Link
              href="/"
              className={`block nav-link text-lg font-semibold text-neutral-900 hover:text-primary transition-colors ${
                pathname === '/' ? 'text-primary' : ''
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Главная
            </Link>
            <Link
              href="/gallery"
              className={`block nav-link text-lg font-semibold text-neutral-900 hover:text-primary transition-colors ${
                pathname === '/gallery' ? 'text-primary' : ''
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Галерея
            </Link>
            <Link
              href="/design"
              className={`block nav-link text-lg font-semibold text-neutral-900 hover:text-primary transition-colors ${
                pathname === '/design' ? 'text-primary' : ''
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Индивидуальный букет
            </Link>
            <Link
              href="/contact"
              className={`block nav-link text-lg font-semibold text-neutral-900 hover:text-primary transition-colors ${
                pathname === '/contact' ? 'text-primary' : ''
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Контакты
            </Link>
            <Link
              href="/contact"
              className="btn-accent w-full justify-center mt-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Оставить заявку
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20">{children}</main>

      {/* Premium Footer */}
{/* Premium Footer */}
<footer className="bg-primary text-secondary pt-12 pb-8">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
      {/* Brand */}
      <div className="lg:col-span-2 flex flex-col items-center md:items-start text-center md:text-left">
        <div className="flex items-center space-x-3 mb-6 justify-center md:justify-start">
          <div className="w-12 h-12 bg-gradient-accent flex items-center justify-center">
            <span className="text-primary font-display font-bold text-xl">N</span>
          </div>
          <div>
            <h3 className="font-display text-xl font-semibold text-primary sm:text-2xl">
             Your Logo
            </h3>
            <p className="text-caption text-white/80">Цветочное искусство</p>
          </div>
        </div>
        <p className="text-body-lg text-white/90 mb-6 max-w-md">
          Создаём красоту природы в незабываемые композиции с помощью премиального флористического искусства.
        </p>
        <div className="flex space-x-4 justify-center md:justify-start">{/* Соц. иконки */}</div>
      </div>

      {/* Services */}
      <div className="flex flex-col items-center md:items-start text-center md:text-left">
        <h4 className="font-display text-lg font-semibold mb-6 text-primary">Услуги</h4>
        <ul className="space-y-3">
          <li>
            <a href="#" className="text-white/90 hover:text-accent transition-colors duration-300">Индивидуальные букеты</a>
          </li>
          <li>
            <a href="#" className="text-white/90 hover:text-accent transition-colors duration-300">Свадебная флористика</a>
          </li>
          <li>
            <a href="#" className="text-white/90 hover:text-accent transition-colors duration-300">Декор мероприятий</a>
          </li>
          <li>
            <a href="#" className="text-white/90 hover:text-accent transition-colors duration-300">Корпоративные композиции</a>
          </li>
        </ul>
      </div>

      {/* Contact */}
      <div className="flex flex-col items-center md:items-start text-center md:text-left">
        <h4 className="font-display text-lg font-semibold mb-6 text-primary">Контакты</h4>
        <div className="space-y-3 text-white/90">
          <p>123 Цветочная улица<br />Ташкент, Узбекистан</p>
          <p>+998 (90) 123-45-67</p>
          <p>hello@flower.uz</p>
        </div>
      </div>
    </div>

    <div className="border-t border-white/30 mt-10 pt-6 flex flex-col gap-4 md:flex-row md:gap-0 md:justify-between items-center text-center">
      <p className="text-white/70 text-xs sm:text-sm">
        © 2024 Flower House. Все права защищены.
      </p>
      <div className="flex flex-col gap-2 md:flex-row md:space-x-6">
        <a href="#" className="text-white/70 hover:text-accent text-xs sm:text-sm transition-colors duration-300">
          Политика конфиденциальности
        </a>
        <a href="#" className="text-white/70 hover:text-accent text-xs sm:text-sm transition-colors duration-300">
          Пользовательское соглашение
        </a>
      </div>
    </div>
  </div>
</footer>

    </div>
  );
}
