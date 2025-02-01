// Crea src/components/ui/ImageWrapper.tsx
'use client';
import Image, { ImageProps } from 'next/image';

interface ImageWrapperProps extends Omit<ImageProps, 'src'> {
  src?: string | null;
  fallback?: string;
}

export default function ImageWrapper({
  src,
  alt,
  fallback = '/images/default-product.png',
  ...props
}: ImageWrapperProps) {
  return <Image {...props} alt={alt} src={src || fallback} />;
}