import {
  Home,
  Key,
  Landmark,
  Settings,
  HardHat,
  PencilRuler,
  FileText,
  Lightbulb,
  ArrowRight,
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Users,
  Zap,
  FileCheck,
  Star,
  Info,
  Search,
  ChevronDown,
  Video,
  User,
  Bed,
  Bath,
  Ruler,
  Building2,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";

/**
 * String-keyed icon component mirroring Banani's `<Icon i="..." />` API so the
 * reproduced markup stays 1:1 with the source design.
 */
const REGISTRY: Record<string, LucideIcon> = {
  home: Home,
  key: Key,
  landmark: Landmark,
  settings: Settings,
  "hard-hat": HardHat,
  "pencil-ruler": PencilRuler,
  "file-text": FileText,
  lightbulb: Lightbulb,
  "arrow-right": ArrowRight,
  "arrow-left": ArrowLeft,
  "map-pin": MapPin,
  phone: Phone,
  mail: Mail,
  clock: Clock,
  "shield-check": ShieldCheck,
  users: Users,
  zap: Zap,
  "file-check": FileCheck,
  star: Star,
  info: Info,
  search: Search,
  "chevron-down": ChevronDown,
  video: Video,
  user: User,
  bed: Bed,
  bath: Bath,
  ruler: Ruler,
  building: Building2,
  check: CheckCircle2,
};

type IconProps = {
  i: string;
  size?: number;
  className?: string;
  strokeWidth?: number;
};

export function Icon({ i, size = 16, className, strokeWidth = 2 }: IconProps) {
  const Cmp = REGISTRY[i];
  if (!Cmp) return null;
  return <Cmp size={size} strokeWidth={strokeWidth} className={className} />;
}
