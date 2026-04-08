// Utilities
export { cn } from './lib/utils'

// ─── Tier 1 — Primitives ──────────────────────────────────────────────────────
export { Button, buttonVariants } from './components/Button'
export type { ButtonProps } from './components/Button'

export { Badge, badgeVariants } from './components/Badge'
export type { BadgeProps } from './components/Badge'

export { Input } from './components/Input'
export type { InputProps } from './components/Input'

export {
  Select, SelectGroup, SelectValue, SelectTrigger,
  SelectContent, SelectLabel, SelectItem, SelectSeparator,
} from './components/Select'

export { Checkbox } from './components/Checkbox'
export { RadioGroup, RadioGroupItem } from './components/Radio'
export { Switch } from './components/Switch'

export { Textarea } from './components/Textarea'
export type { TextareaProps } from './components/Textarea'

export { Label } from './components/Label'
export type { LabelProps } from './components/Label'

export { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from './components/Tooltip'
export { Avatar, AvatarImage, AvatarFallback } from './components/Avatar'
export { Separator } from './components/Separator'

export { Skeleton } from './components/Skeleton'
export type { SkeletonProps } from './components/Skeleton'

export { Icon } from './components/Icon'
export type { IconProps } from './components/Icon'

// ─── Tier 2 — Composition ─────────────────────────────────────────────────────
export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './components/Card'

export { Alert, AlertTitle, AlertDescription, alertVariants } from './components/Alert'
export type { AlertProps } from './components/Alert'

export {
  Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter,
  DialogTitle, DialogDescription, DialogClose,
} from './components/Dialog'

export {
  Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerFooter,
  DrawerTitle, DrawerDescription, DrawerClose,
} from './components/Drawer'

export {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup,
  DropdownMenuItem, DropdownMenuCheckboxItem, DropdownMenuRadioItem, DropdownMenuRadioGroup,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut,
  DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent, DropdownMenuPortal,
} from './components/DropdownMenu'

export {
  NavigationMenu, NavigationMenuList, NavigationMenuItem,
  NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink,
  NavigationMenuViewport, NavigationMenuIndicator, navigationMenuTriggerStyle,
} from './components/NavigationMenu'

export { Tabs, TabsList, TabsTrigger, TabsContent } from './components/Tabs'
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './components/Accordion'

export {
  Form, FormField, FormItem, FormLabel, FormControl,
  FormDescription, FormMessage, useFormField,
} from './components/Form'

export {
  Table, TableHeader, TableBody, TableFooter,
  TableRow, TableHead, TableCell, TableCaption,
} from './components/Table'

export {
  Pagination, PaginationContent, PaginationItem, PaginationLink,
  PaginationPrevious, PaginationNext, PaginationEllipsis,
} from './components/Pagination'

export { Toaster, toast } from './components/Toast'

export { Progress } from './components/Progress'
export type { ProgressProps } from './components/Progress'

// ─── Tier 3 — Trusti Specific ─────────────────────────────────────────────────
export { InsuranceProductCard } from './components/InsuranceProductCard'
export type { InsuranceProductCardProps } from './components/InsuranceProductCard'

export { PriceComparisonRow } from './components/PriceComparisonRow'
export type { PriceComparisonRowProps } from './components/PriceComparisonRow'

export { StepIndicator } from './components/StepIndicator'
export type { StepIndicatorProps, Step, StepStatus } from './components/StepIndicator'

export { TrustBadge, trustBadgeVariants } from './components/TrustBadge'
export type { TrustBadgeProps } from './components/TrustBadge'

export { RatingDisplay } from './components/RatingDisplay'
export type { RatingDisplayProps } from './components/RatingDisplay'

export { HeroSection } from './components/HeroSection'
export type { HeroSectionProps } from './components/HeroSection'

export { SectionHeader } from './components/SectionHeader'
export type { SectionHeaderProps } from './components/SectionHeader'

export { FeatureList } from './components/FeatureList'
export type { FeatureListProps, FeatureItem } from './components/FeatureList'

export { TestimonialCard } from './components/TestimonialCard'
export type { TestimonialCardProps } from './components/TestimonialCard'

export { FAQAccordion } from './components/FAQAccordion'
export type { FAQAccordionProps, FAQItem } from './components/FAQAccordion'

export { CTABanner } from './components/CTABanner'
export type { CTABannerProps } from './components/CTABanner'

export { PartnerLogoStrip } from './components/PartnerLogoStrip'
export type { PartnerLogoStripProps, PartnerLogo } from './components/PartnerLogoStrip'

// ─── Motion ───────────────────────────────────────────────────────────────────
export { FadeIn } from './motion/FadeIn'
export type { FadeInProps, FadeInDirection } from './motion/FadeIn'

export { StaggerChildren } from './motion/StaggerChildren'
export type { StaggerChildrenProps } from './motion/StaggerChildren'

export { ScaleOnHover } from './motion/ScaleOnHover'
export type { ScaleOnHoverProps } from './motion/ScaleOnHover'

export { AnimatedNumber } from './motion/AnimatedNumber'
export type { AnimatedNumberProps } from './motion/AnimatedNumber'

export { PresenceTransition } from './motion/PresenceTransition'
export type { PresenceTransitionProps, PresenceMode } from './motion/PresenceTransition'

export {
  easeOut, easeIn, easeInOut,
  microTransition, standardTransition, revealTransition,
  springTransition, softSpringTransition,
  fadeInUpVariants, fadeInDownVariants, fadeInLeftVariants,
  fadeInRightVariants, fadeInVariants,
  staggerContainerVariants, staggerItemVariants,
} from './motion/presets'

export {
  motion, AnimatePresence,
  useReducedMotion, useInView, useScroll,
  useTransform, useSpring, useMotionValue,
} from './motion/index'
