'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface ImageCarouselProps {
    images: string[]
    alt: string
}

export default function ImageCarousel({ images, alt }: ImageCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0)

    // Se não houver imagens ou array vazio, não renderizar
    if (!images || images.length === 0) {
        return null
    }

    // Se houver apenas uma imagem, mostrar sem controles
    if (images.length === 1) {
        return (
            <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden">
                <Image
                    src={images[0]}
                    alt={alt}
                    fill
                    className="object-cover"
                    priority
                />
            </div>
        )
    }

    const nextImage = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length)
    }

    const prevImage = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
    }

    const goToImage = (index: number) => {
        setCurrentIndex(index)
    }

    return (
        <div className="space-y-4">
            {/* Main Image */}
            <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden bg-gray-100">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={images[currentIndex]}
                            alt={`${alt} - Imagem ${currentIndex + 1}`}
                            fill
                            className="object-cover"
                            priority={currentIndex === 0}
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows */}
                <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all hover:scale-110"
                    aria-label="Imagem anterior"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all hover:scale-110"
                    aria-label="Próxima imagem"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                    {currentIndex + 1} / {images.length}
                </div>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                {images.map((image, index) => (
                    <button
                        key={index}
                        onClick={() => goToImage(index)}
                        className={`relative h-20 rounded-lg overflow-hidden transition-all ${index === currentIndex
                            ? 'ring-4 ring-blue-600 scale-105'
                            : 'ring-2 ring-gray-200 hover:ring-blue-400'
                            }`}
                    >
                        <Image
                            src={image}
                            alt={`Miniatura ${index + 1}`}
                            fill
                            className="object-cover"
                        />
                    </button>
                ))}
            </div>
        </div>
    )
}
