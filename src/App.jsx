import React, { useMemo, useState } from 'react';
import site from './data/site.json';
import catalogue from './data/products.json';
import { waLink } from './lib/whatsapp';
import './big-city.css';

const products = catalogue.items;
const money = (value) => value == null ? 'Ask for price' : `US$${Number(value).toFixed(0)}`;
const ask = (p) => `Hi Big City Gadgets, I'm interested in the ${p.name}${p.model?.includes('GB') ? ` (${p.model})` : ''}, listed at ${money(p.price)}. Is it still available? Please share its condition, photos and collection details.`;

export default function App() {
  const { business, contact } = site;
  const [query, setQuery] = useState('');
  const [brand, setBrand] = useState('All');
  const [activeProduct, setActiveProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const shown = useMemo(() => products.filter(p => (brand === 'All' || p.brand === brand) && `${p.name} ${p.model} ${p.brand}`.toLowerCase().includes(query.toLowerCase())), [query, brand]);
  const featured = products.find(p => p.id === 'zflip5-256') || products[0];
  const brands = ['All', ...new Set(products.map(p => p.brand))];
  return <div className="bcg-site" id="top">
    <header className="bcg-nav"><a className="bcg-wordmark" href="#top"><span className="bcg-mark">BC</span><span>BIG CITY <i>GADGETS</i></span></a><nav><a href="#collection">The collection</a><a href="#visit">Find the shop</a></nav></header>

    <section className="bcg-hero">
      <div className="bcg-hero-shade"></div><div className="bcg-hero-content">
        <p className="bcg-kicker"><span></span> XIMEX MALL · HARARE CBD</p>
        <h1>Good phones.<br/><em>Better finds.</em></h1>
        <p className="bcg-hero-copy">A considered collection of pre-loved smartphones, selected for people who know what they want.</p>
        <div className="bcg-hero-actions"><a className="bcg-button" href="#collection">Explore the collection <span>↘</span></a></div>
        </div>
          </section>

    <section className="bcg-collection" id="collection"><div className="bcg-collection-head"><div><div className="bcg-section-index">02 — AVAILABLE PRICE LIST</div><h2>The collection<span>.</span></h2><p>Browse the models and listed prices. Stock and final condition are confirmed directly with the shop.</p></div></div>
      <div className="bcg-controls"><label className="bcg-search"><span>⌕</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Find a model…" aria-label="Search phones"/></label><div className="bcg-filters">{brands.map(b=><button key={b} className={brand===b?'active':''} onClick={()=>setBrand(b)}>{b}</button>)}</div></div>
      <div className="bcg-grid">{shown.map((p,i)=><article className="bcg-product" key={p.id}><button type="button" className="bcg-product-photo" onClick={()=>{setActiveProduct(p);setActiveImage(0);}} aria-label={`View ${p.name} product photos`}><img src={p.image} alt={`${p.name} product reference image`} loading="lazy" decoding="async"/><span className="bcg-product-number">{String(i+1).padStart(2,'0')}</span><span className="bcg-preloved">PRE-LOVED</span><span className="bcg-photo-arrow">VIEW {p.gallery?.length || 1} PHOTOS ↗</span></button><h3>{p.name}</h3><div className="bcg-product-bottom"><strong>{money(p.price)}</strong><a href={waLink(contact.whatsapp,ask(p))} target="_blank" rel="noreferrer">Ask about this phone ↗</a></div></article>)}</div>
      {shown.length===0&&<p className="bcg-empty">No matching model. <a href={waLink(contact.whatsapp,'Hi Big City Gadgets, I am looking for a phone that is not listed. Can you help?')} target="_blank" rel="noreferrer">Ask us to help source it ↗</a></p>}
    </section>

    <section className="bcg-visit" id="visit"><div className="bcg-visit-image"><div className="bcg-visit-overlay"><span>COME THROUGH</span><strong>HARARE<br/><em>CBD.</em></strong></div></div><div className="bcg-visit-info"><div className="bcg-section-index">04 — FIND US</div><h2>Meet us<br/><em>in the city.</em></h2><p className="bcg-location">{contact.address}</p><div className="bcg-contact-line"><span>WHATSAPP / CALL</span><a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noreferrer">{contact.displayNumber} ↗</a></div><div className="bcg-contact-line"><span>EMAIL</span><a href={`mailto:${contact.email}`}>{contact.email}</a></div><div className="bcg-visit-actions"><a className="bcg-button" href="https://www.google.com/maps/search/?api=1&query=Ximex+Mall+Harare+Zimbabwe" target="_blank" rel="noreferrer">Get directions ↗</a></div></div></section>
    {activeProduct && <div className="bcg-gallery-backdrop" role="presentation" onClick={()=>setActiveProduct(null)}><section className="bcg-gallery-modal" role="dialog" aria-modal="true" aria-label={`${activeProduct.name} photo gallery`} onClick={e=>e.stopPropagation()}><button className="bcg-gallery-close" onClick={()=>setActiveProduct(null)} aria-label="Close gallery">×</button><div className="bcg-gallery-kicker">PRODUCT REFERENCE / {activeProduct.model}</div><h2>{activeProduct.name}</h2><div className="bcg-gallery-stage"><button className="bcg-gallery-arrow" disabled={activeImage===0} onClick={()=>setActiveImage(i=>Math.max(0,i-1))} aria-label="Previous image">‹</button><img src={activeProduct.gallery?.[activeImage] || activeProduct.image} alt={`${activeProduct.name} reference view ${activeImage+1}`} /><button className="bcg-gallery-arrow" disabled={activeImage >= (activeProduct.gallery?.length || 1)-1} onClick={()=>setActiveImage(i=>Math.min((activeProduct.gallery?.length || 1)-1,i+1))} aria-label="Next image">›</button></div><div className="bcg-gallery-thumbs">{(activeProduct.gallery || [activeProduct.image]).map((src,i)=><button key={src} className={activeImage===i?'active':''} onClick={()=>setActiveImage(i)} aria-label={`Show image ${i+1}`}><img src={src} alt="" loading="lazy"/></button>)}</div><p className="bcg-gallery-note">Reference imagery. Ask the shop for actual photos, storage confirmation and condition details of the available pre-loved unit.</p><a className="bcg-button" href={waLink(contact.whatsapp,ask(activeProduct))} target="_blank" rel="noreferrer">Enquire on WhatsApp ↗</a></section></div>}
    <footer className="bcg-footer"><a className="bcg-wordmark" href="#top"><span className="bcg-mark">BC</span><span>BIG CITY <i>GADGETS</i></span></a><span>PRE-LOVED PHONES. GOOD FINDS.</span><span>BUILT BY WEVIBED</span></footer>
    <a className="bcg-mobile-whatsapp" href={waLink(contact.whatsapp,'Hi Big City Gadgets, I would like to enquire about your phones.')} target="_blank" rel="noreferrer" aria-label="Chat with Big City Gadgets on WhatsApp" title="Chat on WhatsApp"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16.02 3.2A12.55 12.55 0 0 0 5.23 22.17L3.5 28.5l6.5-1.7A12.55 12.55 0 1 0 16.02 3.2Zm0 22.7c-1.9 0-3.75-.5-5.37-1.47l-.39-.23-3.86 1.01 1.03-3.76-.25-.4a10.1 10.1 0 1 1 8.84 4.85Zm5.55-7.57c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.96 1.18-.18.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.49-.9-.8-1.5-1.78-1.68-2.08-.18-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.68-1.63-.93-2.23-.24-.58-.49-.5-.68-.51h-.58c-.2 0-.52.07-.8.37-.28.3-1.05 1.03-1.05 2.5s1.08 2.9 1.23 3.1c.15.2 2.12 3.24 5.13 4.54.72.31 1.28.5 1.72.64.72.23 1.37.2 1.89.12.58-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.08-.13-.28-.2-.58-.35Z"/></svg></a>
  </div>;
}
