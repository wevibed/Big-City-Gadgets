import React from "react";

// Responsive catalogue photography. Product images are lazy-loaded and decoded off the main thread.
export default function ProductPhoto({ product, className = "", ratio = "1 / 1" }) {
  if (product.image) {
    return (
      <img
        src={product.image}
        alt={`${product.name} product reference`}
        loading="lazy"
        decoding="async"
        fetchPriority="low"
        className={`w-full object-cover ${className}`}
        style={{ aspectRatio: ratio, background: "#101f30" }}
      />
    );
  }
  return (
    <div className={`tint-${product.tint ?? 0} grid place-items-center ${className}`} style={{ aspectRatio: ratio }} role="img" aria-label={product.name}>
      <span className="font-display text-4xl font-bold opacity-40">{product.name.charAt(0)}</span>
    </div>
  );
}
