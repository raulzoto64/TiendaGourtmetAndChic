import { useEffect, useMemo, useState } from "react";

type Format = { label: string; price: number; vat: string; was?: number };
type Product = {
  id: string;
  name: string;
  short: string;
  image: string;
  category: string;
  badge?: string;
  formats: Format[];
  description: string;
  details: string[];
  quoteOnly?: boolean;
};

const products: Product[] = [
  {
    id: "caviar-de-trufa",
    name: "Caviar de trufa",
    short: "Esferificaciones de Tuber melanosporum",
    image: "/assets/catalog/black-truffle-bubbles.jpg",
    category: "Alta cocina",
    badge: "ANUGA Top Innovation",
    formats: [
      { label: "50 g", price: 14.88, vat: "10%", was: 18.17 },
      { label: "100 g · refrigerado", price: 15, vat: "10%", was: 30 },
      { label: "200 g", price: 38.99, vat: "10%", was: 44.11 },
    ],
    description:
      "Esferificaciones de jugo de trufa negra con la textura, salinidad y color del caviar. Un acabado preciso para platos que buscan profundidad y sorpresa.",
    details: ["Jugo de Tuber melanosporum", "Elaboración artesanal", "Origen Aragón, España"],
  },
  {
    id: "aceite-de-trufa",
    name: "Aceite de trufa",
    short: "AOVE Empeltre infusionado con ajo y trufa",
    image: "/assets/catalog/aceite-trufa.jpg",
    category: "Despensa",
    formats: [
      { label: "125 ml", price: 12.42, vat: "4%" },
      { label: "500 ml", price: 33.23, vat: "4%" },
    ],
    description:
      "Aceite de oliva virgen extra Empeltre, cosechado a mano e infusionado lentamente con ajo, trufa y aromas naturales. Versátil en sala y cocina.",
    details: ["AOVE variedad Empeltre", "Ajo y trufa", "Hecho a mano"],
  },
  {
    id: "sal-de-trufa",
    name: "Sal de trufa 8%",
    short: "Sal de manantial y trufa negra",
    image: "/assets/catalog/sal-trufa.jpg",
    category: "Despensa",
    badge: "8% trufa negra",
    formats: [
      { label: "100 g", price: 20.92, vat: "10%" },
      { label: "250 g", price: 35.53, vat: "10%" },
    ],
    description:
      "Salmuera de manantial de Naval, en los Pirineos aragoneses, cocinada con trufa negra entera molida (50% T. melanosporum, 50% T. aestivum). Intensidad real, sin atajos, en pequeños lotes de pueblos de Aragón con riesgo de despoblación.",
    details: ["8% de trufa negra", "Sin conservantes", "Pequeños lotes"],
  },
  {
    id: "miel-de-trufa",
    name: "Miel de trufa 4%",
    short: "Miel de encina macerada con trufa",
    image: "/assets/catalog/miel-trufa.jpg",
    category: "Despensa",
    formats: [
      { label: "140 g", price: 20, vat: "10%" },
      { label: "380 g", price: 34.69, vat: "10%" },
    ],
    description:
      "Miel de encina de gran altitud, aromatizada mediante maceración tradicional de láminas de trufa. Dulce, terrosa y extraordinaria.",
    details: ["4% de trufa", "Miel de encina", "Maceración tradicional"],
  },
  {
    id: "queso-de-trufa",
    name: "Queso de trufa 2%",
    short: "Oveja semicurado con esferificaciones",
    image: "/assets/catalog/queso-trufa.jpg",
    category: "Refrigerado",
    formats: [
      { label: "250 g", price: 9.38, vat: "4%" },
      { label: "500 g", price: 16.64, vat: "4%" },
      { label: "3 kg", price: 99.84, vat: "4%" },
    ],
    description:
      "Queso de oveja semicurado de Teruel, madurado a 1.200 metros e integrado con esferificaciones de trufa negra. Elaborado en pequeños lotes, junto a productores de pueblos de Aragón con riesgo de despoblación.",
    details: ["Leche de oveja", "Madurado en Teruel", "Pequeños lotes"],
  },
  {
    id: "truffo",
    name: "Truffo",
    short: "La trufa reconstruida y sellada con oro",
    image: "/assets/catalog/truffo.jpg",
    category: "Edición singular",
    badge: "Novedad mundial",
    formats: [
      { label: "10 g", price: 8.69, vat: "10%" },
      { label: "120 g", price: 97.14, vat: "10%" },
    ],
    description:
      "Tuber melanosporum reconstruida mediante un proceso único y sellada con oro de 24K. Inspirada en el Kintsugi japonés y creada para la liturgia del laminado en mesa.",
    details: ["Tuber melanosporum", "Oro alimentario de 24K", "Vida útil extendida"],
  },
  {
    id: "trufa-negra-fresca",
    name: "Trufa negra fresca",
    short: "Tuber melanosporum seleccionada en origen",
    image: "/assets/catalog/trufas-frescas.jpg",
    category: "Trufa fresca",
    badge: "Producto de temporada",
    formats: [
      { label: "100 g", price: 0, vat: "10%" },
      { label: "250 g", price: 0, vat: "10%" },
      { label: "500 g", price: 0, vat: "10%" },
    ],
    description:
      "Piezas frescas seleccionadas en campo, una a una, en Aragón y enviadas en frío en su punto óptimo de maduración. Disponibilidad según mercado diario.",
    details: ["Selección en campo", "Envío refrigerado 48/72 h", "Trazabilidad de origen"],
    quoteOnly: true,
  },
  {
    id: "carpaccio-de-trufa",
    name: "Carpaccio de trufa",
    short: "Láminas de trufa listas para emplatar",
    image: "/assets/catalog/carpaccio-trufa.jpg",
    category: "Alta cocina",
    formats: [
      { label: "100 g", price: 0, vat: "10%" },
      { label: "365 g", price: 0, vat: "10%" },
    ],
    description:
      "Trufa laminada artesanalmente y conservada para mantener su textura y carácter. Una solución precisa y rápida para el servicio profesional.",
    details: ["Laminado artesanal", "Listo para servir", "Formato horeca disponible"],
    quoteOnly: true,
  },
  {
    id: "salsa-de-trufa",
    name: "Salsa de trufa 7%",
    short: "Fondo aromático para cocina profesional",
    image: "/assets/catalog/salsa-trufa.jpg",
    category: "Despensa",
    formats: [
      { label: "120 g", price: 0, vat: "10%" },
      { label: "500 g", price: 0, vat: "10%" },
    ],
    description:
      "Salsa artesana con un 7% de trufa para enriquecer arroces, carnes, pastas y fondos. Preparada en pequeños lotes y pensada para un resultado constante.",
    details: ["7% de trufa", "Pequeños lotes", "Formato retail y profesional"],
    quoteOnly: true,
  },
  {
    id: "aceite-de-oliva-virgen-extra",
    name: "AOVE Empeltre",
    short: "Aceite de oliva de cosecha aragonesa",
    image: "/assets/catalog/aceite-oliva.jpg",
    category: "Despensa",
    formats: [
      { label: "250 ml", price: 0, vat: "4%" },
      { label: "500 ml", price: 0, vat: "4%" },
    ],
    description:
      "Aceite de oliva virgen extra de variedad Empeltre, cosechado a mano. La base mediterránea de nuestros elaborados y un producto excepcional por sí mismo.",
    details: ["Variedad Empeltre", "Cosecha manual", "Origen Aragón"],
    quoteOnly: true,
  },
  {
    id: "laminador-de-trufa",
    name: "Laminador de trufa",
    short: "Corte preciso para el ritual en mesa",
    image: "/assets/catalog/laminador.jpg",
    category: "Accesorios",
    formats: [{ label: "1 unidad", price: 0, vat: "21%" }],
    description:
      "Laminador regulable para conseguir cortes finos, regulares y elegantes. El instrumento esencial para terminar cada plato ante el comensal.",
    details: ["Corte regulable", "Uso profesional", "Fácil limpieza"],
    quoteOnly: true,
  },
];

function Icon({ name }: { name: "bag" | "arrow" | "menu" | "close" | "check" }) {
  const paths = {
    bag: <><path d="M6 8h12l1 12H5L6 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></>,
    arrow: <><path d="M5 12h14" /><path d="m14 7 5 5-5 5" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
    check: <path d="m5 12 4 4L19 6" />,
  };
  return <svg viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>;
}

function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <button className={`logo ${inverse ? "logo--inverse" : ""}`} onClick={() => goHome()}>
      <img src="/assets/gourmet-chic-logo.svg" alt="Gourmet & Chic" />
    </button>
  );
}

function scrollTop() {
  scrollTo({ top: 0, behavior: "auto" });
  setTimeout(() => scrollTo({ top: 0, behavior: "auto" }), 60);
}

function goHome(resetScroll = true) {
  history.pushState({}, "", "/");
  dispatchEvent(new PopStateEvent("popstate"));
  if (resetScroll) scrollTop();
}

function goToSection(selector: string) {
  goHome(false);
  setTimeout(() => {
    const target = document.querySelector(selector);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    else scrollTop();
  }, 90);
}

function Header({ onContact }: { onContact: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="announcement">Envío nacional 48/72h · Atención profesional personalizada</div>
      <header className="header">
        <Logo />
        <nav className={open ? "nav nav--open" : "nav"}>
          <button onClick={() => { goToSection("#productos"); setOpen(false); }}>Tienda</button>
          <button onClick={() => { goToSection("#trufas"); setOpen(false); }}>Trufa fresca</button>
          <button onClick={() => { goToSection("#profesionales"); setOpen(false); }}>Profesionales</button>
          <button onClick={() => { goToSection("#origen"); setOpen(false); }}>Nuestro origen</button>
        </nav>
        <div className="header__actions">
          <button className="cart-button" onClick={onContact} aria-label="Contactar para hacer pedido">
            <Icon name="bag" /><span>Pedido</span>
          </button>
          <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Menú">
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </header>
    </>
  );
}

function ProductCard({ product, onSelect }: { product: Product; onSelect: (product: Product) => void }) {
  const open = () => {
    history.pushState({}, "", `/producto/${product.id}`);
    dispatchEvent(new PopStateEvent("popstate"));
    scrollTop();
  };
  return (
    <article className="product-card">
      <button className="product-card__image" onClick={open}>
        {product.badge && <span className="badge">{product.badge}</span>}
        <img src={product.image} alt={product.name} />
        <span className="image-cta">Ver producto <Icon name="arrow" /></span>
      </button>
      <div className="product-card__body">
        <p>{product.category}</p>
        <button className="product-title" onClick={open}>{product.name}</button>
        <span>{product.short}</span>
        <div className="product-card__footer">
          <strong>Venta por cajas de 6 a 24</strong>
          <button className="round-button" onClick={() => product.quoteOnly ? open() : onSelect(product)} aria-label={`Contactar por ${product.name}`}>
            {product.quoteOnly ? "→" : "+"}
          </button>
        </div>
      </div>
    </article>
  );
}

function Home({ onSelect, onQuote }: { onSelect: (product: Product) => void; onQuote: () => void }) {
  const [filter, setFilter] = useState("Todos");
  const shown = filter === "Todos" ? products : products.filter((p) => p.category === filter);
  return (
    <main>
      <section className="hero">
        <div className="hero__media"><img src="/assets/chef-trufa.jpg" alt="Chef laminando trufa negra" /></div>
        <div className="hero__shade" />
        <div className="hero__content">
          <p className="eyebrow eyebrow--gold">Artesanos de la trufa · Aragón</p>
          <h1>Ingredientes únicos.<br /><em>Creaciones extraordinarias.</em></h1>
          <p className="hero__lead">Trufas frescas y elaborados artesanos, naturales y sin conservantes para chefs, tiendas gourmet y amantes de lo excepcional.</p>
          <div className="hero__buttons">
            <button className="button button--red" onClick={() => document.querySelector("#productos")?.scrollIntoView({ behavior: "smooth" })}>Descubrir la selección <Icon name="arrow" /></button>
            <button className="button button--ghost" onClick={onQuote}>Soy chef</button>
          </div>
        </div>
        <div className="hero__trust">
          <span><b>15+</b> años de experiencia</span>
          <span><b>100%</b> origen español</span>
          <span><b>48/72h</b> envío refrigerado</span>
        </div>
      </section>

      <section className="intro section" id="origen">
        <div>
          <p className="eyebrow">De la tierra a las mejores mesas</p>
          <h2>La trufa transforma platos en experiencias.</h2>
        </div>
        <div className="intro__copy">
          <p>Trabajamos en pequeños lotes, junto a productores y artesanos de pueblos de Aragón con riesgo de despoblación. Sin añadidos innecesarios. Solo materia prima, oficio y el saber hacer heredado durante generaciones.</p>
          <a href="#productos">Conoce nuestros elaborados <Icon name="arrow" /></a>
        </div>
      </section>

      <section className="catalog section" id="productos">
        <div className="section-head">
          <div><p className="eyebrow">Selección gourmet artesanal</p><h2>La despensa de la trufa</h2></div>
          <p>Productos creados para elevar cada pase, desde la base aromática hasta el acabado final.</p>
        </div>
        <div className="filters" role="tablist">
          {["Todos", "Trufa fresca", "Alta cocina", "Despensa", "Refrigerado", "Edición singular", "Accesorios"].map((item) => (
            <button className={filter === item ? "active" : ""} onClick={() => setFilter(item)} key={item}>{item}</button>
          ))}
        </div>
        <div className="product-grid">
          {shown.map((product) => <ProductCard product={product} onSelect={onSelect} key={product.id} />)}
        </div>
      </section>

      <section className="fresh" id="trufas">
        <div className="fresh__top">
          <p className="eyebrow eyebrow--gold">Calendario de campaña</p>
          <h2>Cada trufa,<br />en su momento.</h2>
          <p>Seleccionamos en campo las mejores piezas en su punto óptimo de maduración. Consulta disponibilidad diaria.</p>
          <button className="button button--light" onClick={onQuote}>Contactar para hacer pedido <Icon name="arrow" /></button>
        </div>
        <div className="season-grid">
          {[
            ["01", "Tuber aestivum", "Trufa de verano", "Mayo — Agosto"],
            ["02", "Tuber uncinatum", "Trufa de otoño", "Septiembre — Diciembre"],
            ["03", "Tuber melanosporum", "Trufa de invierno", "Diciembre — Marzo"],
            ["04", "Tuber magnatum", "Trufa blanca", "Septiembre — Diciembre"],
          ].map(([n, latin, name, date]) => (
            <article key={n}><span>{n}</span><i>◆</i><small>{latin}</small><h3>{name}</h3><p>{date}</p></article>
          ))}
        </div>
      </section>

      <section className="professional section" id="profesionales">
        <div className="professional__image"><img src="/assets/plato-trufa.jpg" alt="Creación gastronómica con trufa" /><span>Producto · Técnica · Creatividad</span></div>
        <div className="professional__content">
          <p className="eyebrow eyebrow--gold">Programa profesional</p>
          <h2>Creado para<br />diferenciarte.</h2>
          <p>Formatos por caja adaptados a cocina profesional y retail, atención directa y logística refrigerada.</p>
          <ul>
            <li><Icon name="check" /><span><b>Chefs y restaurantes</b><small>Formatos grandes, regularidad y asesoramiento.</small></span></li>
            <li><Icon name="check" /><span><b>Tiendas especializadas</b><small>Cajas surtidas, exposición y reposición ágil.</small></span></li>
            <li><Icon name="check" /><span><b>Regalo corporativo</b><small>Selecciones personalizadas y presentación premium.</small></span></li>
          </ul>
          <button className="button button--red" onClick={onQuote}>Contactar para hacer pedido <Icon name="arrow" /></button>
        </div>
      </section>

      <section className="offer section">
        <div><p className="eyebrow">Oferta primera compra</p><h2>Foodie Box Chef</h2><p>6 productos esenciales para llevar textura, aroma y profundidad a cada servicio.</p></div>
        <div className="offer__price"><span>Caja surtida</span><strong>6 productos</strong><small>Venta por cajas · envío 48/72h</small></div>
        <button className="button button--dark" onClick={onQuote}>Contactar para hacer pedido <Icon name="arrow" /></button>
      </section>
    </main>
  );
}

function ProductDetail({ product, onSelect }: { product: Product; onSelect: (p: Product) => void }) {
  const [activeImage, setActiveImage] = useState(product.image);
  const gallery = product.category === "Trufa fresca"
    ? [product.image, "/assets/trufas-corte.jpg", "/assets/trufas-textura.jpeg"]
    : [product.image, "/assets/aceite-trufa.jpg", "/assets/carpaccio-trufa.jpg"];
  useEffect(() => {
    setActiveImage(product.image);
  }, [product]);
  return (
    <main className="detail">
      <div className="breadcrumbs"><button onClick={() => goToSection("#productos")}>Tienda</button><span>/</span><span>{product.name}</span></div>
      <section className="detail__top">
        <div className="detail__gallery">
          {product.badge && <span className="badge">{product.badge}</span>}
          <img src={activeImage} alt={product.name} />
          <div className="gallery-thumbs">
            {gallery.map((image, index) => (
              <button
                className={activeImage === image ? "active" : ""}
                onClick={() => setActiveImage(image)}
                aria-label={`Ver imagen ${index + 1} de ${product.name}`}
                key={image}
              >
                <img src={image} alt="" />
              </button>
            ))}
          </div>
          <div className="gallery-note"><span>01</span><p>Fotografía de producto</p></div>
        </div>
        <div className="detail__purchase">
          <p className="eyebrow">{product.category}</p>
          <h1>{product.name}</h1>
          <p className="detail__short">{product.short}</p>
          <p className="detail__description">{product.description}</p>
          <p className="detail__boxes">Venta por cajas de 6 a 24 unidades. Envío 48/72h.</p>
          <div className="purchase-row">
            <button className="button button--red purchase-button" onClick={() => onSelect(product)}>
              Contactar para hacer pedido <Icon name="arrow" />
            </button>
          </div>
          <div className="detail__benefits">
            <span><b>Origen garantizado</b><small>Aragón, España</small></span>
            <span><b>Envío seguro</b><small>Embalaje profesional</small></span>
            <span><b>Atención directa</b><small>+34 670 414 347</small></span>
          </div>
        </div>
      </section>
      <section className="story">
        <div><p className="eyebrow eyebrow--gold">Artesanal · Natural · Origen español</p><h2>Una materia prima<br />que habla por sí sola.</h2></div>
        <div><p>{product.description}</p><ul>{product.details.map((item) => <li key={item}><Icon name="check" />{item}</li>)}</ul></div>
      </section>
      {product.id === "truffo" && (
        <section className="kintsugi">
          <p>Filosofía Kintsugi — 金継ぎ</p>
          <blockquote>“El arte de reparar con oro lo que se rompió, haciéndolo más valioso que el original.”</blockquote>
          <div><span><b>365 días</b>Disponibilidad total</span><span><b>24K</b>Oro alimentario</span><span><b>4–12 meses</b>Vida útil extendida</span></div>
        </section>
      )}
      <section className="related section">
        <div className="section-head"><div><p className="eyebrow">También te puede interesar</p><h2>Completa tu selección</h2></div></div>
        <div className="product-grid product-grid--three">{products.filter((p) => p.id !== product.id).slice(0, 3).map((p) => <ProductCard product={p} onSelect={onSelect} key={p.id} />)}</div>
      </section>
    </main>
  );
}

type OrderItem = { product: Product };

function QuoteModal({ open, onClose, items }: { open: boolean; onClose: () => void; items: OrderItem[] }) {
  const [sent, setSent] = useState(false);
  useEffect(() => {
    if (open) setSent(false);
  }, [open]);
  if (!open) return null;
  return <div className="modal-wrap"><div className="modal">
    <button className="modal__close" onClick={onClose}><Icon name="close" /></button>
    {!sent ? <><p className="eyebrow">Atención personalizada</p><h2>Contactar para hacer pedido</h2><p>Déjanos tus datos y te confirmamos disponibilidad de las cajas, portes e IVA.</p>
      <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
        {items.length > 0 && <div className="modal__order">
          <p><span>Tu solicitud</span><b>{items.length} {items.length === 1 ? "producto" : "productos"}</b></p>
          {items.map((item, i) => <p key={`${item.product.id}-${i}`}><span>{item.product.name}</span><b>Por cajas</b></p>)}
          <small>Venta por cajas de 6 a 24 unidades · confirmamos portes e IVA por WhatsApp</small>
        </div>}
        <div className="modal__fields">
          <label>Correo electrónico<input required type="email" placeholder="nombre@correo.com" /></label>
          <label>Celular / WhatsApp<input required type="tel" placeholder="+34 600 000 000" /></label>
          <label>Ciudad<input required placeholder="Tu ciudad" /></label>
        </div>
        <button className="button button--red" type="submit">Solicitar contacto <Icon name="arrow" /></button>
      </form></> :
      <div className="success"><span><Icon name="check" /></span><p className="eyebrow">Solicitud recibida</p><h2>Te contactamos ya.</h2><p>El equipo de Gourmet & Chic te escribe o llama de inmediato para cerrar el pedido.</p><button className="button button--dark" onClick={onClose}>Volver a la tienda</button></div>}
  </div></div>;
}

function KitModal({ open, onClose, onQuote }: { open: boolean; onClose: () => void; onQuote: () => void }) {
  const kit: [string, string][] = [
    ["Caviar de trufa 200 g", "44,11 €"],
    ["Aceite de trufa 500 ml", "33,23 €"],
    ["Sal de trufa 8% 250 g", "35,53 €"],
    ["Miel de trufa 4% 380 g", "34,69 €"],
    ["Queso de trufa 2% 500 g", "16,64 €"],
    ["Truffo 120 g", "97,14 €"],
  ];
  if (!open) return null;
  return <div className="modal-wrap"><div className="modal modal--kit">
    <button className="modal__close" onClick={onClose}><Icon name="close" /></button>
    <p className="eyebrow">Oferta exclusiva · profesionales</p>
    <h2>Todo lo que necesitas<br />para empezar.</h2>
    <p className="kit__intro">Kit pack de muestras · Foodie Box Chef</p>
    <p className="kit__head"><span>¿Qué incluye?</span><b>Precio unitario sin IVA</b></p>
    <ul className="kit__list">{kit.map(([name, price]) => <li key={name}><span>{name}</span><b>{price}</b></li>)}</ul>
    <div className="kit__total">
      <p><span>Primera compra</span><b>−10%</b></p>
      <p><span>Precio final de la Foodie Box Chef</span><b>235,21 €</b></p>
    </div>
    <div className="kit__included"><b>Incluido</b><span>Envío rápido y seguro · Soporte personalizado · Inspiración para tu cocina</span></div>
    <button className="button button--red" onClick={onQuote}>Contactar para hacer pedido <Icon name="arrow" /></button>
  </div></div>;
}

function Footer() {
  return <footer className="footer">
    <div className="footer__main"><Logo inverse /><div><p>Explorar</p><button onClick={() => goToSection("#productos")}>Tienda</button><button onClick={() => goToSection("#trufas")}>Trufa fresca</button><button onClick={() => goToSection("#profesionales")}>Profesionales</button></div><div><p>Contacto</p><a href="mailto:pedidos@gourmetandchic.es">pedidos@gourmetandchic.es</a><a href="tel:+34670414347">+34 670 414 347</a><span>Zaragoza · España</span></div><div className="footer__claim"><p>Artesanos y sostenibles</p><strong>Pequeños lotes.<br />Grandes historias.</strong></div></div>
    <div className="footer__bottom"><span>© 2026 Gourmet & Chic</span><span>Aviso legal · Privacidad · Cookies</span><span>Made with care in Aragón</span></div>
  </footer>;
}

export default function App() {
  const [path, setPath] = useState(location.pathname);
  const [order, setOrder] = useState<OrderItem[]>([]);
  const [quote, setQuote] = useState(false);
  const [kit, setKit] = useState(false);
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    const update = () => setPath(location.pathname);
    addEventListener("popstate", update);
    return () => removeEventListener("popstate", update);
  }, []);
  useEffect(() => {
    if (sessionStorage.getItem("kitShown")) return;
    const show = () => {
      if (sessionStorage.getItem("kitShown")) return;
      if (document.querySelector(".modal-wrap")) return;
      sessionStorage.setItem("kitShown", "1");
      setKit(true);
    };
    const timer = setTimeout(show, 15000);
    const onLeave = (event: MouseEvent) => {
      if (!event.relatedTarget && event.clientY <= 0) show();
    };
    let lastY = window.scrollY;
    const onScroll = () => {
      const current = window.scrollY;
      if (lastY - current > 80 && current < 120) show();
      lastY = current;
    };
    document.addEventListener("mouseout", onLeave);
    addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseout", onLeave);
      removeEventListener("scroll", onScroll);
    };
  }, []);
  const product = useMemo(() => products.find((p) => path.endsWith(p.id)), [path]);
  const select = (item: Product) => {
    setOrder([{ product: item }]);
    setQuote(true);
  };
  const openQuote = () => {
    setOrder([]);
    setQuote(true);
  };
  return (
    <>
      <Header onContact={() => setQuote(true)} />
      {product
        ? <ProductDetail product={product} onSelect={select} />
        : <Home onSelect={(p) => select(p)} onQuote={openQuote} />}
      <Footer />
      <QuoteModal open={quote} onClose={() => setQuote(false)} items={order} />
      <KitModal open={kit} onClose={() => setKit(false)} onQuote={() => { setKit(false); openQuote(); }} />
    </>
  );
}
