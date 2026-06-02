export type VehicleStatus = 'new' | 'preowned';

export type Vehicle = {
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

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'closed';

export type Lead = {
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

export type Brand = {
  id: string;
  name: string;
};

export type Settings = {
  agencyName: string;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  hours: string;
};