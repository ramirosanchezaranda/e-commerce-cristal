'use client';
import { useRef, useLayoutEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { Product } from '@/types/product';
import { useCartStore } from '@/store/cartStore';
import { FaShoppingCart, FaEye } from 'react-icons/fa';

export default function ProductCard({ product }: { product: Product }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCartStore();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(cardRef.current, {
        y: 50,
        opacity: 0
      });
      
      if (contentRef.current) {
        gsap.set([...Array.from(contentRef.current.children)], {
          y: 20,
          opacity: 0
        });
      }

      gsap.to(cardRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top bottom-=100",
          end: "top center",
          toggleActions: "play none none reverse"
        }
      });

      gsap.to(imageRef.current, {
        y: -20,
        ease: "none",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      if (contentRef.current) {
        const children = Array.from(contentRef.current.children);
        if (children.length > 0) {
          gsap.to(children, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top bottom-=50",
              toggleActions: "play none none reverse"
            }
          });
        }
      }
    }, cardRef);

    return () => ctx.revert();
  }, []);

  const handleAddToCart = () => {
    if (!product) return;

    const card = cardRef.current;
    if (card) {
      const tl = gsap.timeline();
      tl.to(card, {
        scale: 1.02,
        duration: 0.2,
        ease: "power2.out"
      })
      .to(card, {
        scale: 1,
        duration: 0.1,
        ease: "power2.in"
      });

      const ripple = document.createElement('div');
      ripple.className = 'absolute w-4 h-4 bg-impacto-purple-lighter rounded-full';
      card.appendChild(ripple);
      
      gsap.fromTo(ripple, 
        { 
          scale: 0,
          opacity: 0.8,
          x: '-50%',
          y: '-50%'
        },
        {
          scale: 4,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          onComplete: () => ripple.remove()
        }
      );

      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      });
    }
  };

  return (
    <div
      ref={cardRef}
      className="bg-white rounded-lg shadow-lg overflow-hidden relative group hover:shadow-xl transition-shadow duration-300"
    >
      <div ref={imageRef} className="relative h-64 overflow-hidden">
        <Image
          src={product.image || '/placeholder.jpg'}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div ref={contentRef} className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {product.name}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2">
          {product.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-impacto-purple">
            ${product.price.toLocaleString()}
          </span>
          <div className="flex gap-2">
            <Link
              href={`/galeria/${product.id}`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <FaEye />
              <span>Ver</span>
            </Link>
            <button
              onClick={handleAddToCart}
              className="inline-flex items-center gap-2 px-4 py-2 bg-impacto-purple text-white rounded-lg hover:bg-opacity-90 transition-colors"
            >
              <FaShoppingCart />
              <span>Agregar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}