'use client';

import Image from "next/image";

interface GalleryItem {
  url: string;
  title: string;
  flowers: string[];
  price: string;
}

interface Props {
  items: GalleryItem[];
}

export default function PremiumFlowerGallery({ items }: Props) {
  if (!items?.length) {
    return <div className="text-center text-red-500 py-20">Нет данных для галереи.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="rounded-2xl overflow-hidden shadow-lg bg-white border border-neutral-200 group hover:shadow-2xl transition-all"
          >
            <div className="relative w-full h-72">
              <Image
                src={item.url}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="p-6 flex flex-col gap-2">
              <div className="font-serif text-lg text-primary font-bold">{item.title}</div>
              <div className="flex flex-wrap gap-1 text-xs text-neutral-500">
                {item.flowers.map(f => (
                  <span key={f} className="bg-neutral-100 px-2 py-1 rounded">{f}</span>
                ))}
              </div>
              <div className="mt-2 text-primary font-semibold">{item.price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
