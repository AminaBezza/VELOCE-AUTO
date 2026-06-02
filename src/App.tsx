import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  CarFront,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Facebook,
  Heart,
  Instagram,
  LayoutDashboard,
  Loader2,
  Mail,
  MapPin,
  Menu,
  MessageCircleMore,
  MessageSquareText,
  PencilLine,
  Phone,
  Search,
  Send,
  Shield,
  Star,
  Tags,
  Trash2,
  Upload,
  WalletCards,
  Waves,
  X,
  Youtube,
  Settings,
  LogOut,
  ToggleLeft,
  ToggleRight,
  Key,
  Globe,
  ArrowLeftRight,
  Wrench,
  Coins,
  RotateCcw
} from 'lucide-react';
import { FaTiktok } from 'react-icons/fa6';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

type Language = 'EN';
type VehicleStatus = 'new' | 'preowned';
type LeadStatus = 'new' | 'contacted' | 'qualified' | 'closed';

type Vehicle = {
  id: string;
  brand: string;
  model: string;
  year: number;
  price_dzd: number;
  mileage: number;
  engine: string;
  gearbox: string;
  body_type: string;
  color: string;
  status: VehicleStatus;
  is_featured: boolean;
  images: string[];
  description: string;
  power: string;
  torque: string;
  zeroTo100: string;
  topSpeed: string;
  vin: string;
  created_at: string;
};

type Lead = {
  id: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  vehicle_id: string | null;
  source: string;
  status: LeadStatus;
  created_at: string;
};

type Brand = {
  id: string;
  name: string;
};

type Settings = {
  agencyName: string;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  hours: string;
};

type HeroFilters = {
  query: string;
  brand: string;
  bodyType: string;
  priceRange: string;
  year: string;
};

type ContactForm = {
  name: string;
  phone: string;
  email: string;
  interest: string;
  message: string;
};

type EnquiryForm = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

type VehicleForm = {
  id?: string;
  brand: string;
  model: string;
  year: string;
  price_dzd: string;
  mileage: string;
  engine: string;
  gearbox: string;
  body_type: string;
  color: string;
  status: VehicleStatus;
  is_featured: boolean;
  imagesText: string;
  description: string;
  power: string;
  torque: string;
  zeroTo100: string;
  topSpeed: string;
  vin: string;
};

type LocalizedCopy = {
  eyebrow: string;
  explore: string;
  subtitle: string;
  search: string;
  book: string;
};

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
const hasSupabase = Boolean(supabaseUrl && supabaseAnonKey);
const supabase: SupabaseClient | null = hasSupabase ? createClient(supabaseUrl as string, supabaseAnonKey as string) : null;

const adminPassword = (import.meta.env.VITE_ADMIN_PASSWORD as string | undefined) ?? 'VELOCE2026';

const navLinks = ['Home', 'Inventory', 'Services', 'About', 'Contact'];
const brands = ['BMW', 'Mercedes-Benz', 'Porsche', 'Ferrari', 'Lamborghini', 'Range Rover', 'Audi', 'Bentley', 'McLaren', 'Maserati'];
const bodyTypes = ['All Types', 'Sedan', 'SUV', 'Coupe', 'Convertible', 'Supercar'];
const priceRanges = ['Any', 'Under 15M DZD', '15–30M', '30–60M', 'Above 60M'];
const yearRanges = ['Any', '2024', '2023', '2022', '2021', 'Older'];
const tabs = ['All', 'New', 'Pre-Owned', 'SUV', 'Sedan', 'Supercar'];

const serviceItems = [
  ['01', 'New Vehicle Sales', 'Factory-fresh inventory sourced from the most desirable manufacturers in the world.'],
  ['02', 'Pre-Owned Sales', 'Certified luxury vehicles curated for condition, provenance, and long-term value.'],
  ['03', 'Vehicle Import', 'White-glove importation, customs, homologation, and registration handling in Algeria.'],
  ['04', 'Trade-In & Valuation', 'Transparent market-based valuation and effortless trade-in support.'],
  ['05', 'After-Sales Service', 'Maintenance guidance, concierge support, and ownership assistance.'],
  ['06', 'Financing Advisory', 'Tailored finance structures with partnered Algerian institutions.']
] as const;

const defaultSettings: Settings = {
  agencyName: 'VELOCE AUTO',
  address: 'Hydra, Algiers, Algeria',
  phone: '+213 555 010 990',
  whatsapp: '+213 555 010 990',
  email: 'contact@veloceauto.dz',
  hours: 'Sat - Thu: 09:00 - 19:00'
};

const localKeys = {
  vehicles: 'veloce-auto-vehicles',
  leads: 'veloce-auto-leads',
  brands: 'veloce-auto-brands',
  settings: 'veloce-auto-settings'
};

const initialVehicles: Vehicle[] = [
  {
    id: '1',
    brand: 'Porsche',
    model: '911 Turbo S',
    year: 2024,
    price_dzd: 62800000,
    mileage: 1200,
    engine: '3.8L Twin-Turbo Flat-6',
    gearbox: '8-Speed PDK',
    body_type: 'Coupe',
    color: 'Aventurine Green',
    status: 'new',
    is_featured: true,
    images: ['https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80', 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1400&q=80'],
    description: 'A precision engineered grand tourer with everyday usability and brutal performance. Specified for discerning drivers who demand both control and theatre.',
    power: '640 hp',
    torque: '800 Nm',
    zeroTo100: '2.7s',
    topSpeed: '330 km/h',
    vin: 'WP0ZZZ99ZRS123001',
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    brand: 'Mercedes-Benz',
    model: 'G 63 AMG',
    year: 2023,
    price_dzd: 78400000,
    mileage: 6800,
    engine: '4.0L V8 Biturbo',
    gearbox: '9-Speed Automatic',
    body_type: 'SUV',
    color: 'Obsidian Black',
    status: 'preowned',
    is_featured: true,
    images: ['https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=1400&q=80', 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1400&q=80'],
    description: 'The definitive luxury SUV, combining unmistakable presence with handcrafted comfort and devastating performance on any road surface.',
    power: '585 hp',
    torque: '850 Nm',
    zeroTo100: '4.5s',
    topSpeed: '220 km/h',
    vin: 'W1N4632761X123002',
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    brand: 'Ferrari',
    model: 'Roma',
    year: 2024,
    price_dzd: 91200000,
    mileage: 450,
    engine: '3.9L Twin-Turbo V8',
    gearbox: '8-Speed DCT',
    body_type: 'Coupe',
    color: 'Rosso Corsa',
    status: 'new',
    is_featured: true,
    images: ['https://images.unsplash.com/photo-1593941707882-a5bfc1c1c0b7?auto=format&fit=crop&w=1400&q=80', 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1400&q=80'],
    description: 'A modern interpretation of Ferrari elegance with an architecture of speed, luxury, and minimalistic sculpture.',
    power: '612 hp',
    torque: '760 Nm',
    zeroTo100: '3.4s',
    topSpeed: '320 km/h',
    vin: 'ZFF99RMX000123003',
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    brand: 'Range Rover',
    model: 'SV Autobiography',
    year: 2022,
    price_dzd: 55800000,
    mileage: 9300,
    engine: '4.4L V8',
    gearbox: '8-Speed Automatic',
    body_type: 'SUV',
    color: 'Santorini Black',
    status: 'preowned',
    is_featured: false,
    images: ['https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1400&q=80', 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1400&q=80'],
    description: 'A flagship SUV crafted for the executive lifestyle, offering sanctuary-grade comfort and commanding road presence.',
    power: '523 hp',
    torque: '750 Nm',
    zeroTo100: '4.6s',
    topSpeed: '250 km/h',
    vin: 'SALGA2BE7NA123004',
    created_at: new Date().toISOString()
  },
  {
    id: '5',
    brand: 'Lamborghini',
    model: 'Huracán EVO',
    year: 2024,
    price_dzd: 98500000,
    mileage: 220,
    engine: '5.2L V10',
    gearbox: '7-Speed DCT',
    body_type: 'Supercar',
    color: 'Arancio Xanto',
    status: 'new',
    is_featured: true,
    images: ['https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1400&q=80', 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1400&q=80'],
    description: 'An uncompromising statement of velocity and design, made for collectors who want every arrival to feel cinematic.',
    power: '640 hp',
    torque: '600 Nm',
    zeroTo100: '2.9s',
    topSpeed: '325 km/h',
    vin: 'ZHWUC1ZF0PLA12305',
    created_at: new Date().toISOString()
  },
  {
    id: '6',
    brand: 'Audi',
    model: 'RS7 Sportback',
    year: 2023,
    price_dzd: 47200000,
    mileage: 5400,
    engine: '4.0L V8 TFSI',
    gearbox: '8-Speed Tiptronic',
    body_type: 'Sedan',
    color: 'Nardo Gray',
    status: 'preowned',
    is_featured: false,
    images: ['https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80', 'https://images.unsplash.com/photo-1485291571150-772bcfc10da5?auto=format&fit=crop&w=1400&q=80'],
    description: 'A discreet powerhouse with executive comfort, perfect for clients who want all-weather speed and everyday practicality.',
    power: '591 hp',
    torque: '800 Nm',
    zeroTo100: '3.6s',
    topSpeed: '305 km/h',
    vin: 'WUAZZZFY0N123006',
    created_at: new Date().toISOString()
  }
];

function readLocal<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  const raw = window.localStorage.getItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeLocal<T>(key: string, value: T) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

function seedLocalData() {
  if (!window.localStorage.getItem(localKeys.vehicles)) writeLocal(localKeys.vehicles, initialVehicles);
  if (!window.localStorage.getItem(localKeys.leads)) writeLocal<Lead[]>(localKeys.leads, []);
  if (!window.localStorage.getItem(localKeys.brands)) writeLocal(localKeys.brands, brands.map((name) => ({ id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'), name })));
  if (!window.localStorage.getItem(localKeys.settings)) writeLocal(localKeys.settings, defaultSettings);
}

function getPriceMatch(value: number, range: string) {
  if (range === 'Any') return true;
  if (range === 'Under 15M DZD') return value < 15000000;
  if (range === '15–30M') return value >= 15000000 && value < 30000000;
  if (range === '30–60M') return value >= 30000000 && value < 60000000;
  return value >= 60000000;
}

function getYearMatch(year: number, range: string) {
  if (range === 'Any') return true;
  if (range === 'Older') return year <= 2021;
  return String(year) === range;
}

function formatPrice(value: number) {
  return `${new Intl.NumberFormat('en-US').format(value)} DZD`;
}

function formatMileage(value: number) {
  return `${new Intl.NumberFormat('en-US').format(value)} km`;
}

const copy = {
  eyebrow: "ALGERIA'S PREMIER AUTOMOTIVE EXPERIENCE",
  explore: 'Discover Your',
  subtitle: "Curated selection of the world's finest automobiles. New, pre-owned and exclusive imports available in Algiers.",
  search: 'SEARCH'
} as const;

function HistoryModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex bg-[#06080c]">
      {/* Left side: Background Image */}
      <div className="relative hidden w-1/2 lg:block">
        <div 
          className="absolute inset-0 bg-cover bg-center grayscale mix-blend-luminosity contrast-125 opacity-70" 
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1600&q=80)' }} 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-[#06080c]" />
      </div>

      {/* Right side: Content */}
      <div className="relative flex w-full flex-col justify-center px-8 py-20 overflow-y-auto lg:w-1/2 lg:px-24">
        <button 
          onClick={onClose} 
          className="absolute right-8 top-8 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white/50 transition hover:border-emerald-500 hover:text-emerald-500"
        >
          <X className="h-5 w-5" />
        </button>
        
        <div className="max-w-xl">
          <p className="text-[0.75rem] font-bold uppercase tracking-[0.4em] text-emerald-500">OUR HISTORY</p>
          <h2 className="mt-8 font-serif text-5xl leading-tight text-white lg:text-6xl">
            A Legacy of Automotive Excellence
          </h2>
          
          <div className="mt-12 space-y-8 text-lg leading-relaxed text-white/70">
            <p>
              Founded in 2010, VELOCE AUTO began with a singular vision: to bring the world's most exclusive and sought-after vehicles to discerning clients in Algeria.
            </p>
            <p>
              Over the years, we have built a reputation on uncompromising quality, absolute discretion, and a concierge-level approach to automotive acquisition. Our dedicated team sources rare models globally, ensuring provenance and mechanical perfection.
            </p>
            <p>
              Today, VELOCE AUTO stands as the premier destination for luxury automotive enthusiasts, offering not just cars, but an entry into an exclusive lifestyle.
            </p>
          </div>
          
          <div className="mt-16 grid grid-cols-2 gap-8 border-t border-white/10 pt-12">
            <div>
              <p className="font-serif text-4xl text-white">2010</p>
              <p className="mt-2 text-xs uppercase tracking-widest text-emerald-500">ESTABLISHED</p>
            </div>
            <div>
              <p className="font-serif text-4xl text-white">500+</p>
              <p className="mt-2 text-xs uppercase tracking-widest text-emerald-500">DELIVERED</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminRoute />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
}

function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [filters, setFilters] = useState<HeroFilters>({ query: '', brand: 'All Brands', bodyType: 'All Types', priceRange: 'Any', year: 'Any' });
  const [featuredTab, setFeaturedTab] = useState('All');
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
  const [loading, setLoading] = useState(true);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [contactForm, setContactForm] = useState<ContactForm>({ name: '', phone: '', email: '', interest: 'General Inquiry', message: '' });
  const [contactStatus, setContactStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [leadForm, setLeadForm] = useState<EnquiryForm>({ name: '', phone: '', email: '', message: '' });
  const [leadStatus, setLeadStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [brandList, setBrandList] = useState<Brand[]>(brands.map((name) => ({ id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'), name })));
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (location.hash) {
      document.querySelector(location.hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [location.hash]);

  useEffect(() => {
    seedLocalData();
    const load = async () => {
      setLoading(true);
      if (supabase) {
        const [vehiclesResult, settingsResult, brandsResult] = await Promise.all([
          supabase.from('vehicles').select('*').order('is_featured', { ascending: false }).order('created_at', { ascending: false }),
          supabase.from('settings').select('*').maybeSingle(),
          supabase.from('brands').select('*').order('name', { ascending: true })
        ]);
        if (!vehiclesResult.error && vehiclesResult.data?.length) setVehicles(vehiclesResult.data as Vehicle[]);
        if (!settingsResult.error && settingsResult.data) setSettings(settingsResult.data as Settings);
        if (!brandsResult.error && brandsResult.data?.length) setBrandList(brandsResult.data as Brand[]);
      } else {
        setVehicles(readLocal<Vehicle[]>(localKeys.vehicles, initialVehicles));
        setSettings(readLocal<Settings>(localKeys.settings, defaultSettings));
        setBrandList(readLocal<Brand[]>(localKeys.brands, brandList));
      }
      window.setTimeout(() => setLoading(false), 350);
    };
    void load();
  }, []);

  useEffect(() => writeLocal(localKeys.settings, settings), [settings]);
  useEffect(() => writeLocal(localKeys.brands, brandList), [brandList]);

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => {
      const query = filters.query.trim().toLowerCase();
      const matchesQuery =
        !query || [vehicle.brand, vehicle.model, vehicle.engine, vehicle.body_type, vehicle.color].join(' ').toLowerCase().includes(query);
      const matchesBrand = filters.brand === 'All Brands' || vehicle.brand === filters.brand;
      const matchesBodyType = filters.bodyType === 'All Types' || vehicle.body_type === filters.bodyType;
      const matchesPrice = getPriceMatch(vehicle.price_dzd, filters.priceRange);
      const matchesYear = getYearMatch(vehicle.year, filters.year);
      const matchesTab =
        featuredTab === 'All' ||
        (featuredTab === 'New' && vehicle.status === 'new') ||
        (featuredTab === 'Pre-Owned' && vehicle.status === 'preowned') ||
        vehicle.body_type === featuredTab;
      return matchesQuery && matchesBrand && matchesBodyType && matchesPrice && matchesYear && matchesTab;
    });
  }, [filters, vehicles, featuredTab]);

  const featuredVehicles = vehicles.filter((vehicle) => vehicle.is_featured);

  const openVehicle = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setLeadForm({ name: '', phone: '', email: '', message: '' });
    setLeadStatus('idle');
  };

  const submitLead = async (payload: Lead) => {
    if (supabase) {
      const { error } = await supabase.from('leads').insert(payload);
      return !error;
    }
    const current = readLocal<Lead[]>(localKeys.leads, []);
    writeLocal(localKeys.leads, [payload, ...current]);
    return true;
  };

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setContactStatus('sending');
    const success = await submitLead({
      id: crypto.randomUUID(),
      name: contactForm.name,
      phone: contactForm.phone,
      email: contactForm.email,
      message: `${contactForm.interest}: ${contactForm.message}`,
      vehicle_id: null,
      source: 'contact-form',
      status: 'new',
      created_at: new Date().toISOString()
    });
    if (success) {
      setContactForm({ name: '', phone: '', email: '', interest: 'General Inquiry', message: '' });
      setContactStatus('success');
    } else {
      setContactStatus('idle');
    }
  };

  const handleEnquirySubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedVehicle) return;
    setLeadStatus('sending');
    const success = await submitLead({
      id: crypto.randomUUID(),
      name: leadForm.name,
      phone: leadForm.phone,
      email: leadForm.email,
      message: leadForm.message,
      vehicle_id: selectedVehicle.id,
      source: 'vehicle-modal',
      status: 'new',
      created_at: new Date().toISOString()
    });
    if (success) {
      setLeadStatus('success');
      setLeadForm({ name: '', phone: '', email: '', message: '' });
    } else {
      setLeadStatus('idle');
    }
  };

  return (
    <div className="min-h-screen bg-ink text-white">
      <SiteHeader scrolled={scrolled} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main>
        <Hero filters={filters} setFilters={setFilters} onSearch={() => document.getElementById('inventory')?.scrollIntoView({ behavior: 'smooth' })} />
        <FeaturedInventory vehicles={filteredVehicles} loading={loading} featuredTab={featuredTab} setFeaturedTab={setFeaturedTab} wishlist={wishlist} setWishlist={setWishlist} onOpen={openVehicle} />
        <ServicesSection />
        <AboutSection onLearnMore={() => setShowHistoryModal(true)} />
        <ContactSection settings={settings} onSendMessage={() => setShowMessageModal(true)} />
      </main>
      <Footer settings={settings} />
      <FloatingWhatsApp phone={settings.whatsapp} />
      <AnimatePresence>
        {selectedVehicle ? (
          <VehicleModal vehicle={selectedVehicle} onClose={() => setSelectedVehicle(null)} leadForm={leadForm} setLeadForm={setLeadForm} leadStatus={leadStatus} onSubmit={handleEnquirySubmit} />
        ) : null}
      </AnimatePresence>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      {showHistoryModal && <HistoryModal onClose={() => setShowHistoryModal(false)} />}
      {showMessageModal && (
        <MessageModal 
          onClose={() => setShowMessageModal(false)} 
          contactForm={contactForm} 
          setContactForm={setContactForm} 
          contactStatus={contactStatus} 
          onSubmit={handleContactSubmit} 
        />
      )}
    </div>
  );
}

function LogoIcon({ className = "h-11 w-11" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>
      {/* Sleek shield outer contour */}
      <path 
        d="M50 90C75 75 85 45 80 15L50 5L20 15C15 45 25 75 50 90Z" 
        stroke="url(#logo-grad)" 
        strokeWidth="3.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      {/* Aerodynamic speed curves inside the shield */}
      <path 
        d="M28 22C38 32 44 48 48 58" 
        stroke="url(#logo-grad)" 
        strokeWidth="2" 
        strokeLinecap="round" 
        opacity="0.8"
      />
      <path 
        d="M72 22C62 32 56 48 52 58" 
        stroke="url(#logo-grad)" 
        strokeWidth="2" 
        strokeLinecap="round" 
        opacity="0.8"
      />
      {/* Crisp futuristic white V in center */}
      <path 
        d="M34 32L46 62L50 71L54 62L66 32" 
        stroke="white" 
        strokeWidth="4" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </svg>
  );
}

function SiteHeader({ scrolled, menuOpen, setMenuOpen }: { scrolled: boolean; menuOpen: boolean; setMenuOpen: (open: boolean) => void; }) {
  return (
    <header className={`fixed inset-x-0 top-0 z-40 border-b border-white/5 transition ${scrolled ? 'bg-[#06080c]/96 backdrop-blur-2xl' : 'bg-transparent'}`}>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#home" className="flex items-center gap-3 leading-none">
          <LogoIcon className="h-11 w-11 text-emerald-300" />
          <div className="flex flex-col">
            <span className="font-serif text-2xl font-bold tracking-[0.18em] text-[#f2eee4]">VELOCE</span>
            <span className="text-[10px] uppercase tracking-[0.52em] text-emerald-300/85">AUTO</span>
          </div>
        </a>
        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="text-sm tracking-[0.2em] text-white/58 transition hover:text-emerald-300">
              {link}
            </a>
          ))}
        </nav>
        <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open menu">
          <Menu className="h-7 w-7" />
        </button>
      </div>
    </header>
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void; }) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/95 px-5 py-6 backdrop-blur-2xl lg:hidden">
          <div className="flex items-center justify-between border-b border-white/10 pb-5">
            <div className="flex items-center gap-3">
              <LogoIcon className="h-12 w-12" />
              <div>
                <div className="font-serif text-4xl font-bold tracking-[0.18em] text-white">VELOCE</div>
                <div className="text-[10px] uppercase tracking-[0.6em] text-emerald-300">AUTO</div>
              </div>
            </div>
            <button onClick={onClose} aria-label="Close menu">
              <X className="h-7 w-7" />
            </button>
          </div>
          <div className="mt-8 space-y-5">
            {navLinks.map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} onClick={onClose} className="block border-b border-white/10 pb-4 font-serif text-4xl text-white">
                {link}
              </a>
            ))}
          </div>
          <div className="mt-8 space-y-4">
            <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100/80">English only</div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function Hero({ filters, setFilters, onSearch }: { filters: HeroFilters; setFilters: (next: HeroFilters) => void; onSearch: () => void; }) {
  return (
    <section id="home" className="relative h-screen min-h-[700px] overflow-hidden pt-20 pb-4">
      {/* Background layers */}
      <div className="absolute inset-0 bg-[#080c0f]" />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=2400&q=80')] bg-cover bg-[29%_50%] opacity-55" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,8,10,0.97)_0%,rgba(5,8,10,0.92)_35%,rgba(5,8,10,0.55)_62%,rgba(5,8,10,0.3)_80%,rgba(5,8,10,0.65)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,8,10,0.1)_0%,rgba(5,8,10,0.15)_60%,rgba(5,8,10,0.95)_100%)]" />
      {/* Green light rays */}
      <div className="absolute right-[-5%] top-[10%] h-[70%] w-[55%] rounded-full bg-emerald-400/4 blur-3xl" />
      <div className="absolute right-[2%] top-[25%] h-[2px] w-[45%] rotate-[-8deg] bg-gradient-to-r from-transparent via-emerald-300/60 to-transparent blur-[2px]" />
      <div className="absolute right-[0%] top-[32%] h-[2px] w-[40%] rotate-[5deg] bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent blur-[2px]" />
      <div className="absolute right-[5%] top-[38%] h-[2px] w-[35%] rotate-[2deg] bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent blur-[2px]" />
      <div className="absolute right-[8%] top-[44%] h-[1px] w-[30%] rotate-[-3deg] bg-gradient-to-r from-transparent via-emerald-300/35 to-transparent blur-[1px]" />

      {/* Main content */}
      <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-between px-4 pb-4 pt-12 sm:px-6 lg:px-8">
        {/* Top area: Text left + Stats right */}
        <div className="flex-1 flex items-center">
          <div className="flex w-full flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-16">
            {/* Left: Hero text */}
            <div className="max-w-3xl">
              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <p className="mb-5 text-[0.65rem] uppercase tracking-[0.5em] text-emerald-300/80">ALGERIA'S PREMIER AUTOMOTIVE EXPERIENCE</p>
                <h1 className="font-serif text-6xl italic leading-[0.95] text-[#f3ede2] text-shadow md:text-7xl lg:text-[6.5rem]">
                  Discover Your
                  <span className="block">Dream Luxury Car</span>
                </h1>
                <p className="mt-6 max-w-2xl text-[0.95rem] leading-7 text-[#ded6c8]/70">Curated selection of the world&apos;s finest automobiles. New, pre-owned and exclusive imports available in Algiers.</p>
              </motion.div>
            </div>

            {/* Right: 2 Stat cards stacked */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.3 }} className="hidden lg:flex flex-col gap-4 min-w-[320px]">
              <div className="rounded-2xl border border-white/8 bg-white/[0.02] px-6 py-5 backdrop-blur-[6px]">
                <div className="grid grid-cols-2 gap-8">
                  <div className="text-left">
                    <div className="font-serif text-4xl text-white"><HeroCounter value={500} suffix="+" /></div>
                    <div className="mt-1 text-[0.6rem] uppercase tracking-[0.25em] text-white/50">CARS IN STOCK</div>
                  </div>
                  <div className="text-left">
                    <div className="font-serif text-4xl text-white"><HeroCounter value={12} suffix="+" /></div>
                    <div className="mt-1 text-[0.6rem] uppercase tracking-[0.25em] text-white/50">PREMIUM BRANDS</div>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-white/8 bg-white/[0.02] px-6 py-5 backdrop-blur-[6px]">
                <div className="grid grid-cols-2 gap-8">
                  <div className="text-left">
                    <div className="font-serif text-4xl text-emerald-300"><HeroCounter value={98} suffix="%" /></div>
                    <div className="mt-1 text-[0.6rem] uppercase tracking-[0.25em] text-white/50">SATISFACTION</div>
                  </div>
                  <div className="text-left">
                    <div className="font-serif text-4xl text-white"><HeroCounter value={15} suffix="+" /></div>
                    <div className="mt-1 text-[0.6rem] uppercase tracking-[0.25em] text-white/50">YEARS</div>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                  <a href="https://instagram.com/meeena.aa" target="_blank" rel="noreferrer" className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-[6px] text-emerald-400 transition hover:bg-emerald-500/15 hover:border-emerald-500/40 hover:text-emerald-300">
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a href="mailto:bezzaamina31@gmail.com" className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-[6px] text-emerald-400 transition hover:bg-emerald-500/15 hover:border-emerald-500/40 hover:text-emerald-300">
                    <Mail className="h-5 w-5" />
                  </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Search bar at bottom */}
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2 }} className="w-full">
          <div className="hero-search-bar rounded-2xl border border-white/8 bg-[#0d1117]/80 p-3 shadow-luxury backdrop-blur-xl sm:p-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              <input className="hero-search-input flex-[1.3] rounded-xl border border-white/8 bg-[#161b22]/80 px-4 py-3 text-sm text-white/90 placeholder-white/35 outline-none transition focus:border-emerald-400/40" placeholder="Search by brand..." value={filters.query} onChange={(e) => setFilters({ ...filters, query: e.target.value })} />
              <select className="hero-search-select flex-1 rounded-xl border border-white/8 bg-[#161b22]/80 px-4 py-3 text-sm text-white/70 outline-none transition focus:border-emerald-400/40" value={filters.brand} onChange={(e) => setFilters({ ...filters, brand: e.target.value })}>
                <option value="All Brands">BRAND</option>
                {brands.map((brand) => <option key={brand}>{brand}</option>)}
              </select>
              <select className="hero-search-select flex-1 rounded-xl border border-white/8 bg-[#161b22]/80 px-4 py-3 text-sm text-white/70 outline-none transition focus:border-emerald-400/40" value={filters.bodyType} onChange={(e) => setFilters({ ...filters, bodyType: e.target.value })}>
                {bodyTypes.map((body) => <option key={body}>{body}</option>)}
              </select>
              <select className="hero-search-select flex-1 rounded-xl border border-white/8 bg-[#161b22]/80 px-4 py-3 text-sm text-white/70 outline-none transition focus:border-emerald-400/40" value={filters.priceRange} onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}>
                {priceRanges.map((price) => <option key={price}>{price}</option>)}
              </select>
              <select className="hero-search-select flex-1 rounded-xl border border-white/8 bg-[#161b22]/80 px-4 py-3 text-sm text-white/70 outline-none transition focus:border-emerald-400/40" value={filters.year} onChange={(e) => setFilters({ ...filters, year: e.target.value })}>
                {yearRanges.map((year) => <option key={year}>{year}</option>)}
              </select>
              <div className="flex gap-2 w-full lg:w-auto">
                <button onClick={onSearch} className="flex-1 lg:flex-none inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-emerald-400 hover:text-black">
                  <Search className="h-4 w-4" />
                  SEARCH
                </button>
                <button
                  type="button"
                  onClick={() => setFilters({ query: '', brand: 'All Brands', bodyType: 'All Types', priceRange: 'Any', year: 'Any' })}
                  className="inline-flex items-center justify-center rounded-xl border border-white/8 bg-[#161b22]/80 px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/50 transition hover:bg-white/10 hover:text-white"
                  title="Reset Filters"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3 px-1 text-[0.58rem] font-medium uppercase tracking-[0.35em] text-white/40">
              <div className="flex items-center gap-2">
                <span>LIMITED EDITIONS</span>
                <span className="text-emerald-400 font-bold mx-1">•</span>
                <span>PRIVATE SOURCING</span>
              </div>
              <div className="tracking-[0.25em]">FAST SEARCH. CLEAN RESULTS. PREMIUM STOCK.</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function HeroCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let frame = 0;
    const start = performance.now();
    const duration = 1100;
    const tick = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(value * eased));
      if (progress < 1) frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [value]);

  return <>{count}{suffix}</>;
}

function FeaturedInventory({ vehicles, loading, featuredTab, setFeaturedTab, wishlist, setWishlist, onOpen }: { vehicles: Vehicle[]; loading: boolean; featuredTab: string; setFeaturedTab: (tab: string) => void; wishlist: string[]; setWishlist: (updater: (current: string[]) => string[]) => void; onOpen: (vehicle: Vehicle) => void; }) {
  return (
    <section id="inventory" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="CURATED COLLECTION" title="Featured Vehicles" />
      <div className="mt-8 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button key={tab} className={`border px-4 py-2 text-xs uppercase tracking-[0.24em] transition ${featuredTab === tab ? 'border-gold bg-gold text-black' : 'border-white/10 bg-white/5 text-white/60 hover:border-gold/35 hover:text-white'}`} onClick={() => setFeaturedTab(tab)}>
            {tab}
          </button>
        ))}
      </div>
      {loading ? (
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="overflow-hidden border border-white/10 bg-white/5">
              <div className="aspect-[4/3] animate-pulse bg-white/10" />
              <div className="space-y-3 p-5">
                <div className="h-5 w-24 animate-pulse bg-white/10" />
                <div className="h-8 w-2/3 animate-pulse bg-white/10" />
                <div className="h-4 w-full animate-pulse bg-white/10" />
                <div className="h-4 w-5/6 animate-pulse bg-white/10" />
                <div className="h-10 w-full animate-pulse bg-white/10" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} saved={wishlist.includes(vehicle.id)} onToggleSaved={() => setWishlist((current) => (current.includes(vehicle.id) ? current.filter((id) => id !== vehicle.id) : [...current, vehicle.id]))} onOpen={() => onOpen(vehicle)} />
          ))}
        </div>
      )}
    </section>
  );
}

function VehicleCard({ vehicle, saved, onToggleSaved, onOpen }: { vehicle: Vehicle; saved: boolean; onToggleSaved: () => void; onOpen: () => void; }) {
  return (
    <motion.article whileHover={{ y: -8 }} transition={{ duration: 0.24 }} className="overflow-hidden border border-white/10 bg-white/5 shadow-luxury">
      <div className="relative">
        <button className="group block w-full text-left" onClick={onOpen}>
          <div className="absolute left-4 top-4 z-10 rounded-full border border-gold bg-gold px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.25em] text-black">
            {vehicle.is_featured ? 'EXCLUSIVE IMPORT' : vehicle.status === 'new' ? 'NEW' : 'PRE-OWNED'}
          </div>
          <div
            className="absolute right-4 top-4 z-10 rounded-full border border-white/10 bg-black/40 p-2 text-white backdrop-blur-md transition hover:border-gold hover:text-gold"
            onClick={(event) => {
              event.stopPropagation();
              onToggleSaved();
            }}
          >
            <Heart className={`h-4 w-4 ${saved ? 'fill-gold text-gold' : ''}`} />
          </div>
          <div className="aspect-[4/3] overflow-hidden bg-black">
            <img src={vehicle.images[0]} alt={`${vehicle.brand} ${vehicle.model}`} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
          </div>
        </button>
      </div>
      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/50">{vehicle.brand}</p>
            <h3 className="mt-1 font-serif text-3xl text-white">{vehicle.model}</h3>
          </div>
          <div className="text-right">
            <div className="font-serif text-3xl text-gold">{formatPrice(vehicle.price_dzd)}</div>
            <div className="text-xs uppercase tracking-[0.25em] text-white/50">DZD</div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 text-xs text-white/60">
          <SpecPill label="Engine" value={vehicle.engine} />
          <SpecPill label="Gearbox" value={vehicle.gearbox} />
          <SpecPill label="0-100" value={vehicle.zeroTo100} />
        </div>
        <div className="grid grid-cols-3 gap-3 text-sm text-white/70">
          <KeyValue label="Year" value={String(vehicle.year)} />
          <KeyValue label="Mileage" value={formatMileage(vehicle.mileage)} />
          <KeyValue label="Body" value={vehicle.body_type} />
        </div>
        <button onClick={onOpen} className="w-full border border-gold bg-transparent px-5 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-gold transition hover:bg-gold hover:text-black">
          View Details
        </button>
      </div>
    </motion.article>
  );
}

function SpecPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-white/10 bg-black/30 px-3 py-3">
      <p className="text-[0.65rem] uppercase tracking-[0.24em] text-white/35">{label}</p>
      <p className="mt-1 text-white">{value}</p>
    </div>
  );
}

function KeyValue({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-white/45">{label}</p>
      <p>{value}</p>
    </div>
  );
}





function ServicesSection() {
  const services = [
    {
      title: 'New Vehicle Sales',
      description: 'Factory-fresh inventory sourced from the most desirable manufacturers in the world.',
      icon: (
        <div className="relative flex items-center justify-center h-12 w-12 border border-gold/30 bg-gold/5 rounded-xl text-gold">
          <CarFront className="h-6 w-6" />
          <span className="absolute -top-1 -right-1 rounded bg-gold px-1 py-0.5 text-[0.45rem] font-bold text-black tracking-widest leading-none">SOLD</span>
        </div>
      )
    },
    {
      title: 'Pre-Owned Sales',
      description: 'Certified luxury vehicles curated for condition, provenance, and long-term value.',
      icon: (
        <div className="flex items-center justify-center h-12 w-12 border border-gold/30 bg-gold/5 rounded-xl text-gold">
          <CarFront className="h-6 w-6" />
        </div>
      )
    },
    {
      title: 'Vehicle Import',
      description: 'White-glove importation, customs, homologation, and registration handling in Algeria.',
      icon: (
        <div className="flex items-center justify-center gap-1 h-12 w-12 border border-gold/30 bg-gold/5 rounded-xl text-gold">
          <Key className="h-5 w-5 -rotate-45" />
          <Globe className="h-4 w-4 opacity-50 -ml-2 mt-2" />
        </div>
      )
    },
    {
      title: 'Trade-In & Valuation',
      description: 'Transparent market-based valuation and effortless trade-in support.',
      icon: (
        <div className="flex items-center justify-center h-12 w-12 border border-gold/30 bg-gold/5 rounded-xl text-gold">
          <ArrowLeftRight className="h-5 w-5" />
        </div>
      )
    },
    {
      title: 'After-Sales Service',
      description: 'Maintenance guidance, concierge support, and ownership assistance.',
      icon: (
        <div className="flex items-center justify-center h-12 w-12 border border-gold/30 bg-gold/5 rounded-xl text-gold">
          <Wrench className="h-5 w-5" />
        </div>
      )
    },
    {
      title: 'Financing Advisory',
      description: 'Tailored finance structures with partnered Algerian institutions.',
      icon: (
        <div className="flex items-center justify-center h-12 w-12 border border-gold/30 bg-gold/5 rounded-xl text-gold">
          <Coins className="h-5 w-5" />
        </div>
      )
    }
  ];

  return (
    <section id="services" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="OUR SERVICES" title="End-to-End Luxury Ownership" />
      
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <motion.div 
            key={service.title} 
            whileHover={{ y: -6, borderColor: 'rgba(52, 211, 153, 0.65)', boxShadow: '0 0 25px rgba(52, 211, 153, 0.12)' }}
            transition={{ duration: 0.24 }}
            className="relative flex flex-col p-8 sm:p-10 rounded-2xl border transition bg-[#0B0D11]/60 backdrop-blur-md overflow-hidden border-gold/15 shadow-luxury"
          >
            {/* Soft Radial Backlight Glow */}
            <div className="absolute -left-12 -top-12 h-32 w-32 rounded-full bg-emerald-400/4 blur-3xl" />
            
            {/* Icon container */}
            <div className="relative z-10 self-start">
              {service.icon}
            </div>

            {/* Content */}
            <div className="relative z-10 mt-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold tracking-wide text-white">{service.title}</h3>
                <p className="mt-3 text-xs leading-relaxed text-white/50">{service.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function AboutSection({ onLearnMore }: { onLearnMore?: () => void }) {
  return (
    <section id="about" className="relative w-full overflow-hidden">
      {/* Background Image full width */}
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1600&q=80)' }} 
      />
      {/* Gradient to darken the left side completely */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#06080c] via-[#06080c]/90 to-transparent" />
      
      {/* Container */}
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          
          {/* Left Column */}
          <div className="max-w-xl pt-6">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.35em] text-emerald-500/90">ABOUT VELOCE AUTO</p>
            <h2 className="mt-4 font-serif text-4xl leading-[1.1] text-white sm:text-[2.75rem]">
              A discreet agency for exceptional automotive acquisition.
            </h2>
            <p className="mt-6 text-[0.95rem] leading-relaxed text-white/60">
              VELOCE AUTO curates luxury, performance, and prestige vehicles for clients who want a highly personal buying journey. Every interaction is engineered to feel polished, responsive, and unmistakably premium.
            </p>
            
            {/* The 3 boxes */}
            <div className="mt-10 grid grid-cols-3 gap-3">
              {[
                ['Private', 'CONSULTATION'],
                ['Nationwide', 'DELIVERY'],
                ['Concierge', 'AFTERCARE']
              ].map(([top, bottom]) => (
                <div key={top} className="border border-white/20 bg-transparent py-4 text-center">
                  <p className="font-serif text-[1.35rem] text-emerald-500/90">{top}</p>
                  <p className="mt-1 text-[0.55rem] font-medium uppercase tracking-[0.2em] text-white/60">{bottom}</p>
                </div>
              ))}
            </div>

            {/* Button */}
            <button onClick={onLearnMore} className="mt-10 inline-flex items-center gap-2 border border-white/20 bg-transparent px-8 py-3 text-[0.65rem] font-bold uppercase tracking-[0.25em] text-white transition hover:border-emerald-500 hover:bg-emerald-500/10 hover:text-emerald-400">
              Learn more about us
            </button>
            
            <div className="mt-10 max-w-[420px] border border-white/10 bg-black/60 p-8 backdrop-blur-xl">
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.35em] text-emerald-500/90">CINEMATIC PRESENCE</p>
              <p className="mt-4 font-serif text-[1.75rem] leading-tight text-white">
                A showroom experience shaped around desirability, clarity, and trust.
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="hidden lg:block"></div>

        </div>
      </div>
    </section>
  );
}


function ContactSection({ settings, onSendMessage }: { settings: Settings; onSendMessage: () => void; }) {
  return (
    <section id="contact" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      {/* Top Part: Get in touch & 24/7 support box */}
      <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-center">
        <div>
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.35em] text-emerald-500/90">GET IN TOUCH</p>
          <h2 className="mt-4 font-serif text-4xl leading-[1.1] text-white sm:text-5xl">
            READY TO FIND YOUR DREAM CAR?
          </h2>
          <p className="mt-6 text-[0.95rem] leading-relaxed text-white/60">
            Our expert team is available 24/7 to assist you with any inquiries about buying, importing, or finding luxury cars in Algeria's most prestigious locations.
          </p>
          
          <div className="mt-10 space-y-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded border border-emerald-500/30 text-emerald-500">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/40">CALL US</p>
                <p className="mt-1 text-sm font-medium text-white">{settings.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded border border-emerald-500/30 text-emerald-500">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/40">EMAIL US</p>
                <p className="mt-1 text-sm font-medium text-white">bezzaamina31@gmail.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded border border-emerald-500/30 text-emerald-500">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/40">VISIT US</p>
                <p className="mt-1 text-sm font-medium text-white">{settings.address}</p>
              </div>
            </div>
          </div>
          
          <button className="mt-10 inline-flex items-center justify-center gap-2 border border-emerald-500 bg-emerald-500/10 px-8 py-4 text-[0.65rem] font-bold uppercase tracking-[0.25em] text-emerald-400 transition hover:bg-emerald-500 hover:text-black" onClick={onSendMessage}>
            SEND A MESSAGE
          </button>
        </div>
        
        {/* Right side support box */}
        <div className="relative lg:ml-8 mt-12 lg:mt-0">
          {/* subtle glow */}
          <div className="absolute inset-0 -m-8 bg-emerald-500/5 blur-3xl rounded-full" />
          <div className="relative flex flex-col items-center justify-center rounded-2xl border border-emerald-500/20 bg-[#0B0D11]/80 px-8 py-20 text-center shadow-[0_0_40px_rgba(52,211,153,0.05)] backdrop-blur-sm">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
              <MessageCircleMore className="h-8 w-8 text-emerald-500" />
            </div>
            <h3 className="font-serif text-2xl text-emerald-500">24/7 SUPPORT</h3>
            <p className="mt-4 text-sm leading-relaxed text-white/60 max-w-[250px]">
              Our team is available around the clock to answer your questions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoLine({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex gap-4 border-b border-white/10 py-4 last:border-b-0 last:pb-0">
      <div className="rounded-full border border-white/10 bg-white/5 p-3 text-gold">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <div className="text-xs uppercase tracking-[0.24em] text-white/40">{label}</div>
        <div className="mt-1 text-white/80">{value}</div>
      </div>
    </div>
  );
}

function Footer({ settings }: { settings: Settings }) {
  return (
    <footer className="border-t border-white/10 bg-black py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto_auto]">
          <div>
            <div className="flex items-center gap-3">
              <LogoIcon className="h-12 w-12" />
              <div>
                <div className="font-serif text-5xl text-white">VELOCE</div>
                <div className="mt-1 text-xs uppercase tracking-[0.5em] text-gold">AUTO</div>
              </div>
            </div>
            <p className="mt-4 max-w-md text-sm leading-7 text-white/60">Premium automotive agency for curated luxury vehicles, private consultations, and concierge-level service in Algiers.</p>
          </div>
          <FooterLinks title="Navigation" links={navLinks} />
          <FooterLinks title="Services" links={serviceItems.map(([, title]) => title)} />
        </div>
        <div className="mt-10 grid gap-6 border-t border-white/10 pt-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-gold">Newsletter</p>
            <div className="mt-3 flex max-w-md gap-3">
              <input className="luxury-input" placeholder="Email address" />
              <button className="shrink-0 border border-gold bg-gold px-5 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-black">Join</button>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm text-white/60">
            {[[Instagram, 'Instagram'], [Facebook, 'Facebook'], [Youtube, 'YouTube'], [FaTiktok, 'TikTok']].map(([Icon, label]) => (
              <a key={label as string} href="#" className="flex items-center gap-2 border border-white/10 bg-white/5 px-4 py-3 transition hover:border-gold/40 hover:text-gold">
                <Icon className="h-4 w-4" />
                {label as string}
              </a>
            ))}
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs uppercase tracking-[0.24em] text-white/35 lg:flex-row lg:items-center lg:justify-between">
          <span>© 2026 VELOCE AUTO</span>
          <span>{settings.email}</span>
          <div className="flex gap-4">
            <a href="#">Legal</a>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLinks({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.35em] text-gold">{title}</p>
      <div className="mt-4 space-y-3 text-sm text-white/60">
        {links.slice(0, 6).map((link) => (
          <div key={link}>{link}</div>
        ))}
      </div>
    </div>
  );
}

function FloatingWhatsApp({ phone }: { phone: string }) {
  const digits = phone.replace(/\D/g, '');
  return (
    <a
      href={`https://wa.me/${digits}`}
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-500 text-white shadow-luxury transition hover:scale-105"
    >
      <MessageCircleMore className="h-6 w-6" />
    </a>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.55em] text-gold">{eyebrow}</p>
      <h2 className="mt-4 max-w-3xl font-serif text-5xl leading-tight text-white sm:text-6xl">{title}</h2>
    </div>
  );
}

function VehicleModal({ vehicle, onClose, leadForm, setLeadForm, leadStatus, onSubmit }: { vehicle: Vehicle; onClose: () => void; leadForm: EnquiryForm; setLeadForm: (value: EnquiryForm) => void; leadStatus: 'idle' | 'sending' | 'success'; onSubmit: (event: FormEvent<HTMLFormElement>) => void; }) {
  const [activeImage, setActiveImage] = useState(vehicle.images[0]);

  return (
    <motion.div 
      className="fixed inset-0 z-50 overflow-y-auto bg-ink" 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
    >
      {/* Fixed Close Button */}
      <button 
        onClick={onClose} 
        className="fixed right-6 top-6 z-40 rounded-full border border-white/10 bg-black/60 p-3 text-white backdrop-blur-md transition hover:border-gold hover:text-gold hover:scale-105"
        aria-label="Close details"
      >
        <X className="h-6 w-6" />
      </button>

      {/* Grid container: Split Screen layout */}
      <div className="grid min-h-screen gap-0 lg:grid-cols-[1.1fr_0.9fr]">
        
        {/* Left Column: Image showcase (sticky on large screens) */}
        <div className="relative border-b border-white/5 bg-black lg:border-b-0 lg:border-r lg:h-screen lg:sticky lg:top-0 flex flex-col justify-between">
          <div className="flex-1 flex items-center justify-center overflow-hidden min-h-[350px] lg:min-h-0">
            <img src={activeImage} alt={vehicle.model} className="h-full w-full object-cover transition duration-300" />
          </div>
          {/* Thumbnails row */}
          <div className="flex gap-2 overflow-x-auto border-t border-white/5 bg-white/[0.01] p-4 no-scrollbar">
            {vehicle.images.map((image) => (
              <button 
                key={image} 
                onClick={() => setActiveImage(image)} 
                className={`h-16 w-24 flex-shrink-0 overflow-hidden border transition ${activeImage === image ? 'border-gold' : 'border-white/10 hover:border-white/20'}`}
              >
                <img src={image} alt={`${vehicle.model} thumbnail`} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Scrollable information */}
        <div className="flex flex-col p-6 sm:p-10 lg:p-16 justify-between bg-ink">
          <div className="space-y-8">
            {/* Header info */}
            <div className="border-b border-white/5 pb-8">
              <p className="text-xs uppercase tracking-[0.35em] text-gold font-semibold">{vehicle.brand}</p>
              <h2 className="mt-3 font-serif text-4xl sm:text-5xl lg:text-6xl text-white tracking-wide">{vehicle.model}</h2>
              <p className="mt-3 text-sm text-white/50 tracking-wider font-medium">{vehicle.year} &nbsp;•&nbsp; {vehicle.body_type} &nbsp;•&nbsp; {vehicle.color}</p>
              
              {/* Price tag */}
              <div className="mt-6 flex items-baseline gap-2">
                <span className="font-serif text-4xl sm:text-5xl text-gold">{formatPrice(vehicle.price_dzd)}</span>
                <span className="text-xs uppercase tracking-[0.35em] text-white/40 font-mono">DZD</span>
              </div>
            </div>

            {/* Spec grid 1 (Mileage, Engine, Gearbox, VIN with wrapping) */}
            <div className="grid grid-cols-2 gap-4">
              {[[ 'Mileage', formatMileage(vehicle.mileage) ], [ 'Engine', vehicle.engine ], [ 'Gearbox', vehicle.gearbox ], [ 'VIN', vehicle.vin ]].map(([label, value]) => (
                <div key={label} className="border border-white/5 bg-white/[0.02] p-4 rounded-xl">
                  <div className="text-[0.62rem] uppercase tracking-[0.25em] text-white/40 font-medium">{label}</div>
                  <div className="mt-2 text-xs sm:text-sm text-white font-mono tracking-wider break-all">{value}</div>
                </div>
              ))}
            </div>

            {/* Spec grid 2 (Performance metrics) */}
            <div className="grid grid-cols-2 gap-4 border-t border-b border-white/5 py-8">
              {[[ 'Power', vehicle.power ], [ 'Torque', vehicle.torque ], [ '0-100', vehicle.zeroTo100 ], [ 'Top Speed', vehicle.topSpeed ]].map(([label, value]) => (
                <div key={label} className="border border-white/5 bg-white/[0.02] p-4 text-center rounded-xl">
                  <div className="text-[0.62rem] uppercase tracking-[0.25em] text-white/40 font-medium">{label}</div>
                  <div className="mt-2 font-serif text-2xl sm:text-3xl text-white">{value}</div>
                </div>
              ))}
            </div>

            {/* Overview description */}
            <div className="space-y-4">
              <h3 className="text-xs uppercase tracking-[0.35em] text-white/50 font-semibold">Overview</h3>
              <p className="text-sm leading-8 text-[#ded6c8]/70 tracking-wide font-normal">{vehicle.description}</p>
            </div>

            {/* Premium CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="flex-1 min-w-[160px] bg-gold border border-gold hover:bg-transparent hover:text-gold px-6 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-black transition duration-300 rounded-xl">
                Book Test Drive
              </button>
              <button className="flex-1 min-w-[160px] border border-white/15 hover:border-white/35 px-6 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-white/90 transition duration-300 rounded-xl">
                Request Price
              </button>
            </div>

            {/* Enquiry Form */}
            <form className="mt-8 grid gap-4 border-t border-white/5 pt-8" onSubmit={onSubmit}>
              <p className="text-xs uppercase tracking-[0.35em] text-gold font-semibold font-serif">SUBMIT AN ENQUIRY</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <input className="luxury-input" placeholder="Name" value={leadForm.name} onChange={(event) => setLeadForm({ ...leadForm, name: event.target.value })} required />
                <input className="luxury-input" placeholder="Phone" value={leadForm.phone} onChange={(event) => setLeadForm({ ...leadForm, phone: event.target.value })} required />
                <input className="luxury-input sm:col-span-2" placeholder="Email" type="email" value={leadForm.email} onChange={(event) => setLeadForm({ ...leadForm, email: event.target.value })} required />
              </div>
              <textarea className="luxury-input min-h-32" placeholder="Message" value={leadForm.message} onChange={(event) => setLeadForm({ ...leadForm, message: event.target.value })} required />
              <button className="inline-flex items-center justify-center gap-2 bg-gold border border-gold hover:bg-transparent hover:text-gold px-6 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-black transition duration-300 rounded-xl">
                {leadStatus === 'sending' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                {leadStatus === 'success' ? 'Request Sent' : 'Submit Enquiry'}
              </button>
            </form>
          </div>
        </div>

      </div>
    </motion.div>
  );
}

function AdminRoute() {
  const [authenticated, setAuthenticated] = useState(() => window.sessionStorage.getItem('veloce-admin') === 'true');
  const [password, setPassword] = useState('');

  if (!authenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink px-4">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (password === adminPassword) {
              window.sessionStorage.setItem('veloce-admin', 'true');
              setAuthenticated(true);
            }
          }}
          className="w-full max-w-md border border-white/10 bg-white/5 p-8 shadow-luxury"
        >
          <p className="text-xs uppercase tracking-[0.45em] text-gold">Password Protected</p>
          <h1 className="mt-4 font-serif text-5xl text-white">Admin Access</h1>
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter password" className="luxury-input mt-8" />
          <button className="mt-4 w-full border border-gold bg-gold px-5 py-4 text-xs font-semibold uppercase tracking-[0.35em] text-black">Unlock</button>
        </form>
      </div>
    );
  }

  return <AdminDashboard onLogout={() => window.sessionStorage.removeItem('veloce-admin')} />;
}

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState<'dashboard' | 'vehicles' | 'leads' | 'brands' | 'settings'>('dashboard');
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
  const [leads, setLeads] = useState<Lead[]>(readLocal<Lead[]>(localKeys.leads, []));
  const [brandList, setBrandList] = useState<Brand[]>(readLocal<Brand[]>(localKeys.brands, brands.map((name) => ({ id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'), name }))));
  const [settings, setSettings] = useState<Settings>(readLocal<Settings>(localKeys.settings, defaultSettings));
  const [form, setForm] = useState<VehicleForm>({ brand: '', model: '', year: '2024', price_dzd: '', mileage: '', engine: '', gearbox: '', body_type: 'SUV', color: '', status: 'new', is_featured: false, imagesText: '', description: '', power: '', torque: '', zeroTo100: '', topSpeed: '', vin: '' });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [brandName, setBrandName] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (supabase) {
      void Promise.all([
        supabase.from('vehicles').select('*').order('created_at', { ascending: false }),
        supabase.from('leads').select('*').order('created_at', { ascending: false }),
        supabase.from('brands').select('*').order('name', { ascending: true }),
        supabase.from('settings').select('*').maybeSingle()
      ]).then(([vehiclesResult, leadsResult, brandsResult, settingsResult]) => {
        if (!vehiclesResult.error && vehiclesResult.data?.length) setVehicles(vehiclesResult.data as Vehicle[]);
        if (!leadsResult.error && leadsResult.data?.length) setLeads(leadsResult.data as Lead[]);
        if (!brandsResult.error && brandsResult.data?.length) setBrandList(brandsResult.data as Brand[]);
        if (!settingsResult.error && settingsResult.data) setSettings(settingsResult.data as Settings);
      });
    }
  }, []);

  useEffect(() => writeLocal(localKeys.vehicles, vehicles), [vehicles]);
  useEffect(() => writeLocal(localKeys.leads, leads), [leads]);
  useEffect(() => writeLocal(localKeys.brands, brandList), [brandList]);
  useEffect(() => writeLocal(localKeys.settings, settings), [settings]);

  const stats = useMemo(() => [
    ['Total Vehicles', vehicles.length],
    ['Leads Today', leads.filter((lead) => new Date(lead.created_at).toDateString() === new Date().toDateString()).length],
    ['Featured Count', vehicles.filter((vehicle) => vehicle.is_featured).length]
  ], [leads, vehicles]);

  const resetVehicleForm = () => {
    setEditingId(null);
    setForm({ brand: '', model: '', year: '2024', price_dzd: '', mileage: '', engine: '', gearbox: '', body_type: 'SUV', color: '', status: 'new', is_featured: false, imagesText: '', description: '', power: '', torque: '', zeroTo100: '', topSpeed: '', vin: '' });
  };

  const saveVehicle = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload: Vehicle = {
      id: editingId ?? crypto.randomUUID(),
      brand: form.brand,
      model: form.model,
      year: Number(form.year),
      price_dzd: Number(form.price_dzd),
      mileage: Number(form.mileage),
      engine: form.engine,
      gearbox: form.gearbox,
      body_type: form.body_type,
      color: form.color,
      status: form.status,
      is_featured: form.is_featured,
      images: form.imagesText
        .split('\n')
        .map((value) => value.trim())
        .filter(Boolean),
      description: form.description,
      power: form.power,
      torque: form.torque,
      zeroTo100: form.zeroTo100,
      topSpeed: form.topSpeed,
      vin: form.vin,
      created_at: new Date().toISOString()
    };

    if (supabase) {
      if (editingId) {
        await supabase.from('vehicles').update(payload).eq('id', editingId);
      } else {
        await supabase.from('vehicles').insert(payload);
      }
    }

    setVehicles((current) => {
      const rest = current.filter((vehicle) => vehicle.id !== payload.id);
      return [payload, ...rest];
    });
    setMessage('Vehicle saved successfully.');
    resetVehicleForm();
  };

  const editVehicle = (vehicle: Vehicle) => {
    setEditingId(vehicle.id);
    setForm({
      id: vehicle.id,
      brand: vehicle.brand,
      model: vehicle.model,
      year: String(vehicle.year),
      price_dzd: String(vehicle.price_dzd),
      mileage: String(vehicle.mileage),
      engine: vehicle.engine,
      gearbox: vehicle.gearbox,
      body_type: vehicle.body_type,
      color: vehicle.color,
      status: vehicle.status,
      is_featured: vehicle.is_featured,
      imagesText: vehicle.images.join('\n'),
      description: vehicle.description,
      power: vehicle.power,
      torque: vehicle.torque,
      zeroTo100: vehicle.zeroTo100,
      topSpeed: vehicle.topSpeed,
      vin: vehicle.vin
    });
    setTab('vehicles');
  };

  const deleteVehicle = async (id: string) => {
    if (supabase) await supabase.from('vehicles').delete().eq('id', id);
    setVehicles((current) => current.filter((vehicle) => vehicle.id !== id));
    setMessage('Vehicle deleted.');
  };

  const toggleFeatured = async (vehicle: Vehicle) => {
    const next = { ...vehicle, is_featured: !vehicle.is_featured };
    if (supabase) await supabase.from('vehicles').update({ is_featured: next.is_featured }).eq('id', vehicle.id);
    setVehicles((current) => current.map((item) => (item.id === vehicle.id ? next : item)));
  };

  const updateLeadStatus = async (id: string, status: LeadStatus) => {
    if (supabase) await supabase.from('leads').update({ status }).eq('id', id);
    setLeads((current) => current.map((lead) => (lead.id === id ? { ...lead, status } : lead)));
  };

  const addBrand = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!brandName.trim()) return;
    const next = [...brandList, { id: crypto.randomUUID(), name: brandName.trim() }];
    if (supabase) await supabase.from('brands').upsert(next);
    setBrandList(next);
    setBrandName('');
    setMessage('Brand added.');
  };

  const saveSettings = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (supabase) await supabase.from('settings').upsert(settings);
    setMessage('Settings saved.');
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
      <aside className="border-r border-white/10 bg-black/20 px-5 py-6 backdrop-blur-xl">
        <div className="mb-10 border border-white/10 bg-white/5 p-5">
          <p className="font-serif text-4xl leading-none tracking-[0.1em] text-white">VELOCE</p>
          <p className="mt-1 text-xs uppercase tracking-[0.45em] text-gold">AUTO ADMIN</p>
        </div>
        <div className="space-y-2">
          {[
            ['dashboard', LayoutDashboard, 'Dashboard'],
            ['vehicles', CarFront, 'Vehicles'],
            ['leads', MessageSquareText, 'Leads / Enquiries'],
            ['brands', Tags, 'Brands'],
            ['settings', Settings, 'Settings']
          ].map(([key, Icon, label]) => (
            <button key={key as string} onClick={() => setTab(key as 'dashboard' | 'vehicles' | 'leads' | 'brands' | 'settings')} className={`flex w-full items-center gap-3 border px-4 py-3 text-left text-sm transition ${tab === key ? 'border-gold bg-gold/10 text-white' : 'border-white/10 text-white/65 hover:border-gold/40 hover:text-white'}`}>
              <Icon className="h-4 w-4" />
              {label as string}
            </button>
          ))}
        </div>
        <button onClick={onLogout} className="mt-8 flex w-full items-center justify-center gap-2 border border-white/10 px-4 py-3 text-sm uppercase tracking-[0.24em] text-white/70 transition hover:border-gold hover:text-gold">
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </aside>

      <main className="px-4 py-6 sm:px-6 lg:px-8">
        {message ? <div className="mb-4 border border-gold/30 bg-gold/10 px-4 py-3 text-sm text-gold">{message}</div> : null}
        <div className="mb-6 flex flex-col gap-3 border border-white/10 bg-white/5 p-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-gold">Password protected</p>
            <h1 className="mt-2 font-serif text-4xl text-white">Agency Control Center</h1>
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-white/70">
            {stats.map(([label, value]) => (
              <StatBadge key={label as string} label={label as string} value={value as number} />
            ))}
            <StatBadge label={hasSupabase ? 'Supabase Connected' : 'Local Mode'} value={hasSupabase ? 1 : 0} />
          </div>
        </div>

        {tab === 'dashboard' ? <AdminOverview vehicles={vehicles} leads={leads} /> : null}

        {tab === 'vehicles' ? (
          <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
            <form className="border border-white/10 bg-white/5 p-5" onSubmit={saveVehicle}>
              <div className="mb-5 flex items-center justify-between">
                <h2 className="font-serif text-3xl">{editingId ? 'Edit Vehicle' : 'Add Vehicle'}</h2>
                {editingId ? <button type="button" onClick={resetVehicleForm} className="text-sm text-white/60 hover:text-white">Cancel</button> : null}
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  ['brand', 'Brand'],
                  ['model', 'Model'],
                  ['year', 'Year'],
                  ['price_dzd', 'Price DZD'],
                  ['mileage', 'Mileage'],
                  ['engine', 'Engine'],
                  ['gearbox', 'Gearbox'],
                  ['body_type', 'Body Type'],
                  ['color', 'Color'],
                  ['vin', 'VIN'],
                  ['power', 'Power'],
                  ['torque', 'Torque'],
                  ['zeroTo100', '0-100'],
                  ['topSpeed', 'Top Speed']
                ].map(([key, label]) => (
                  <input key={key} className="luxury-input" placeholder={label} value={(form as never)[key] as string} onChange={(event) => setForm({ ...form, [key]: event.target.value } as VehicleForm)} />
                ))}
                <select className="luxury-input" value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value as VehicleStatus })}>
                  <option value="new">new</option>
                  <option value="preowned">preowned</option>
                </select>
                <select className="luxury-input" value={form.body_type} onChange={(event) => setForm({ ...form, body_type: event.target.value })}>
                  <option>SUV</option>
                  <option>Sedan</option>
                  <option>Coupe</option>
                  <option>Convertible</option>
                  <option>Supercar</option>
                </select>
              </div>
              <textarea className="luxury-input mt-4 min-h-28" placeholder="Description" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} />
              <textarea className="luxury-input mt-4 min-h-28" placeholder="Image URLs, one per line" value={form.imagesText} onChange={(event) => setForm({ ...form, imagesText: event.target.value })} />
              <label className="mt-4 flex items-center gap-3 text-sm text-white/75">
                <input type="checkbox" checked={form.is_featured} onChange={(event) => setForm({ ...form, is_featured: event.target.checked })} />
                Featured vehicle
              </label>
              <button className="mt-5 flex w-full items-center justify-center gap-2 border border-gold bg-gold px-5 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-black transition hover:bg-transparent hover:text-gold">
                <Upload className="h-4 w-4" />
                Save Vehicle
              </button>
            </form>

            <div className="space-y-4">
              {vehicles.map((vehicle) => (
                <div key={vehicle.id} className="border border-white/10 bg-white/5 p-4">
                  <div className="flex gap-4">
                    <img src={vehicle.images[0]} alt={vehicle.model} className="h-24 w-32 object-cover" loading="lazy" />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="text-xs uppercase tracking-[0.3em] text-gold">{vehicle.brand}</p>
                          <h3 className="font-serif text-2xl">{vehicle.model}</h3>
                          <p className="text-sm text-white/55">{vehicle.year} · {formatPrice(vehicle.price_dzd)}</p>
                        </div>
                        <div className="flex gap-2">
                          <AdminActionButton label={vehicle.is_featured ? 'Featured' : 'Not Featured'} onClick={() => toggleFeatured(vehicle)} icon={vehicle.is_featured ? ToggleRight : ToggleLeft} />
                          <AdminActionButton label="Edit" onClick={() => editVehicle(vehicle)} icon={PencilLine} />
                          <AdminActionButton label="Delete" onClick={() => deleteVehicle(vehicle.id)} icon={Trash2} danger />
                        </div>
                      </div>
                      <p className="mt-3 line-clamp-2 text-sm text-white/70">{vehicle.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {tab === 'leads' ? <LeadsPanel leads={leads} onChangeStatus={updateLeadStatus} /> : null}
        {tab === 'brands' ? <BrandsPanel brandList={brandList} setBrandList={setBrandList} brandName={brandName} setBrandName={setBrandName} onAdd={addBrand} /> : null}
        {tab === 'settings' ? <SettingsPanel settings={settings} setSettings={setSettings} onSave={saveSettings} /> : null}
      </main>
    </div>
  );
}

function AdminOverview({ vehicles, leads }: { vehicles: Vehicle[]; leads: Lead[] }) {
  const cards = [
    { label: 'Total Vehicles', value: vehicles.length, icon: CarFront },
    { label: 'Featured', value: vehicles.filter((vehicle) => vehicle.is_featured).length, icon: Shield },
    { label: 'New Leads', value: leads.filter((lead) => lead.status === 'new').length, icon: MessageSquareText },
    { label: 'Qualified', value: leads.filter((lead) => lead.status === 'qualified').length, icon: BadgeCheck }
  ];

  return (
    <div className="grid gap-5 lg:grid-cols-4">
      {cards.map(({ label, value, icon: Icon }) => (
        <div key={label} className="border border-white/10 bg-white/5 p-5">
          <div className="flex items-center justify-between text-white/60">
            <span>{label}</span>
            <Icon className="h-4 w-4 text-gold" />
          </div>
          <div className="mt-4 font-serif text-5xl text-white">{value}</div>
        </div>
      ))}
    </div>
  );
}

function LeadsPanel({ leads, onChangeStatus }: { leads: Lead[]; onChangeStatus: (id: string, status: LeadStatus) => void; }) {
  return (
    <div className="mt-6 border border-white/10 bg-white/5 p-5">
      <h2 className="font-serif text-3xl text-white">Leads / Enquiries</h2>
      <div className="mt-5 overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="text-white/50">
            <tr>
              {['Name', 'Phone', 'Email', 'Interest', 'Status', 'Created'].map((head) => (
                <th key={head} className="border-b border-white/10 px-3 py-3 font-medium">{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="border-b border-white/5">
                <td className="px-3 py-3">{lead.name}</td>
                <td className="px-3 py-3">{lead.phone}</td>
                <td className="px-3 py-3">{lead.email}</td>
                <td className="px-3 py-3">{lead.source}</td>
                <td className="px-3 py-3">
                  <select className="luxury-input !w-40 !py-2" value={lead.status} onChange={(event) => onChangeStatus(lead.id, event.target.value as LeadStatus)}>
                    <option value="new">new</option>
                    <option value="contacted">contacted</option>
                    <option value="qualified">qualified</option>
                    <option value="closed">closed</option>
                  </select>
                </td>
                <td className="px-3 py-3 text-white/60">{new Date(lead.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function BrandsPanel({ brandList, setBrandList, brandName, setBrandName, onAdd }: { brandList: Brand[]; setBrandList: (value: Brand[]) => void; brandName: string; setBrandName: (value: string) => void; onAdd: (event: FormEvent<HTMLFormElement>) => void; }) {
  return (
    <div className="mt-6 grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
      <form className="border border-white/10 bg-white/5 p-5" onSubmit={onAdd}>
        <h2 className="font-serif text-3xl text-white">Manage Brands</h2>
        <input className="luxury-input mt-5" placeholder="Brand name" value={brandName} onChange={(event) => setBrandName(event.target.value)} />
        <button className="mt-4 w-full border border-gold bg-gold px-5 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-black">Add Brand</button>
      </form>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {brandList.map((brand) => (
          <div key={brand.id} className="border border-white/10 bg-white/5 p-5">
            <div className="text-xs uppercase tracking-[0.3em] text-gold">Brand</div>
            <div className="mt-2 font-serif text-3xl text-white">{brand.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsPanel({ settings, setSettings, onSave }: { settings: Settings; setSettings: (value: Settings) => void; onSave: (event: FormEvent<HTMLFormElement>) => void; }) {
  return (
    <form className="mt-6 max-w-3xl border border-white/10 bg-white/5 p-5" onSubmit={onSave}>
      <h2 className="font-serif text-3xl text-white">Agency Settings</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {(['agencyName', 'address', 'phone', 'whatsapp', 'email', 'hours'] as (keyof Settings)[]).map((field) => (
          <input key={field} className="luxury-input" placeholder={field} value={settings[field]} onChange={(event) => setSettings({ ...settings, [field]: event.target.value })} />
        ))}
      </div>
      <button className="mt-5 border border-gold bg-gold px-5 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-black">Save Settings</button>
    </form>
  );
}

function AdminActionButton({ label, onClick, icon: Icon, danger }: { label: string; onClick: () => void; icon: React.ElementType; danger?: boolean }) {
  return (
    <button type="button" title={label} onClick={onClick} className={`border px-3 py-2 text-sm transition ${danger ? 'border-red-500/30 text-red-300 hover:bg-red-500/10' : 'border-white/10 text-white/70 hover:border-gold hover:text-gold'}`}>
      <Icon className="h-4 w-4" />
    </button>
  );
}

function StatBadge({ label, value }: { label: string; value: number }) {
  return (
    <div className="border border-white/10 bg-white/5 px-3 py-2 text-sm">
      <span className="text-white/75">{label}: </span>
      <span className="text-gold">{value}</span>
    </div>
  );
}
function MessageModal({ onClose, contactForm, setContactForm, contactStatus, onSubmit }: { onClose: () => void; contactForm: ContactForm; setContactForm: (value: ContactForm) => void; contactStatus: 'idle' | 'sending' | 'success'; onSubmit: (event: FormEvent<HTMLFormElement>) => void; }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex bg-[#06080c]">
      {/* Left side: Map */}
      <div className="relative hidden w-1/2 lg:block">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d102341.45500642152!2d3.04197!3d36.7538!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128fad3fbe652071%3A0xc6c76dbb010a0aa7!2sAlgiers%2C%20Algeria!5e0!3m2!1sen!2sdz!4v1655000000000!5m2!1sen!2sdz" 
          width="100%" 
          height="100%" 
          style={{ border: 0, position: 'absolute', inset: 0 }} 
          allowFullScreen={false} 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          className="grayscale contrast-125 opacity-80 transition duration-500 hover:opacity-100 hover:grayscale-0"
        ></iframe>
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent to-[#06080c]/60" />
      </div>

      {/* Right side: Form */}
      <div className="relative flex w-full flex-col justify-center px-8 py-20 overflow-y-auto lg:w-1/2 lg:px-24">
        <button 
          onClick={onClose} 
          className="absolute right-8 top-8 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white/50 transition hover:border-emerald-500 hover:text-emerald-500"
        >
          <X className="h-5 w-5" />
        </button>
        
        <div className="max-w-xl">
          <p className="text-[0.75rem] font-bold uppercase tracking-[0.4em] text-emerald-500">SEND A MESSAGE</p>
          <h2 className="mt-4 font-serif text-4xl leading-tight text-white lg:text-5xl">
            Get in Touch
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/60">
            Our team is available around the clock to answer your questions.
          </p>
          
          <form className="mt-12 flex flex-col gap-6" onSubmit={onSubmit}>
            <div className="flex flex-col gap-2">
              <label className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-white/40">FULL NAME</label>
              <input className="luxury-input w-full bg-white/[0.02]" placeholder="Full Name" value={contactForm.name} onChange={(event) => setContactForm({ ...contactForm, name: event.target.value })} required />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-white/40">EMAIL ADDRESS</label>
              <input type="email" className="luxury-input w-full bg-white/[0.02]" placeholder="your@email.com" value={contactForm.email} onChange={(event) => setContactForm({ ...contactForm, email: event.target.value })} required />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-white/40">PHONE NUMBER</label>
              <input className="luxury-input w-full bg-white/[0.02]" placeholder="+213 XXXX XXXX" value={contactForm.phone} onChange={(event) => setContactForm({ ...contactForm, phone: event.target.value })} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-white/40">MESSAGE</label>
              <textarea className="luxury-input w-full min-h-[140px] bg-white/[0.02]" placeholder="Message" value={contactForm.message} onChange={(event) => setContactForm({ ...contactForm, message: event.target.value })} required />
            </div>
            
            <button type="submit" className="mt-4 inline-flex w-full items-center justify-center gap-2 border border-emerald-500 bg-emerald-500 px-5 py-4 text-[0.65rem] font-bold uppercase tracking-[0.25em] text-black transition hover:bg-transparent hover:text-emerald-400">
              {contactStatus === 'sending' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              {contactStatus === 'success' ? 'Submitted' : 'SEND A MESSAGE'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
