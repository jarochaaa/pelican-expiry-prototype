import cocaColaImg from '../assets/products/coca-cola.png'
import pestoImg from '../assets/products/pesto.png'
import spriteImg from '../assets/products/sprite.png'

export type TaskKind = 'expiry-check' | 'out-of-date'

export interface Batch {
  id: string
  quantity: number | null
  expiryDate: string
  location: string
}

export interface Product {
  id: string
  /** i18n key for product name */
  nameKey: string
  imageUrl: string
  expectedExpiryDate: string
  location: string
  /** i18n key for the instruction chip — uses {date} param */
  instructionKey: string
  /** i18n key for the page alert — uses {date} and/or {location} params */
  alertKey: string
  alertVariant: 'pink' | 'yellow'
  /** i18n key for the main CTA */
  ctaKey: string
  flow: 'expiry-check' | 'mismatch' | 'missing-units' | 'remove-expired'
}

export interface TaskGroup {
  location: string
  productIds: string[]
  unlockOnMismatchOf?: string
}

export interface Task {
  id: string
  kind: TaskKind
  title: string
  groups: TaskGroup[]
}

export const products: Record<string, Product> = {
  'coca-cola-001': {
    id: 'coca-cola-001',
    nameKey: 'products.cocaCola',
    imageUrl: cocaColaImg,
    expectedExpiryDate: '01/11/2027',
    location: '001-39-00C',
    instructionKey: 'product.chip.countAllBy',
    alertKey: 'product.alert.countAllOn',
    alertVariant: 'pink',
    ctaKey: 'product.inputQuantity',
    flow: 'expiry-check',
  },
  'pesto-001': {
    id: 'pesto-001',
    nameKey: 'products.pesto',
    imageUrl: pestoImg,
    expectedExpiryDate: '12/12/2027',
    location: '001-39-00C',
    instructionKey: 'product.chip.countAllBy',
    alertKey: 'product.alert.countAllOn',
    alertVariant: 'pink',
    ctaKey: 'product.inputQuantity',
    flow: 'expiry-check',
  },
  'coca-cola-120': {
    id: 'coca-cola-120',
    nameKey: 'products.cocaCola120',
    imageUrl: cocaColaImg,
    expectedExpiryDate: '01/15/2027',
    location: '120-39-ABC',
    instructionKey: 'product.chip.checkLeftoverBy',
    alertKey: 'product.alert.timeToCheckMissing',
    alertVariant: 'pink',
    ctaKey: 'product.inputQuantityLower',
    flow: 'missing-units',
  },
  'sprite-001': {
    id: 'sprite-001',
    nameKey: 'products.sprite',
    imageUrl: spriteImg,
    expectedExpiryDate: '01/11/2027',
    location: '001-39-00C',
    instructionKey: 'product.chip.removeExpired',
    alertKey: 'product.alert.removeCount',
    alertVariant: 'pink',
    ctaKey: 'product.inputQuantityLower',
    flow: 'remove-expired',
  },
}

export const tasks: Record<string, Task> = {
  '67890-expiry': {
    id: '67890-expiry',
    kind: 'expiry-check',
    title: '67890',
    groups: [
      { location: '001-39-00C', productIds: ['coca-cola-001', 'pesto-001'] },
      { location: '120-39-ABC', productIds: ['coca-cola-120'], unlockOnMismatchOf: 'coca-cola-001' },
    ],
  },
  '67890-outofdate': {
    id: '67890-outofdate',
    kind: 'out-of-date',
    title: '67890',
    groups: [{ location: '001-39-00C', productIds: ['sprite-001'] }],
  },
}
