import { create } from 'zustand'
import type { Batch } from '../data/tasks'

interface ProductEntry {
  batches: Batch[]
  status: 'pending' | 'checked' | 'mismatch' | 'not-found'
}

interface PendingNotification {
  taskId: string
  message: string
}

type Lang = 'en' | 'pt'

interface State {
  entries: Record<string, ProductEntry> // key = `${taskId}:${productId}`
  pendingNotification: PendingNotification | null
  language: Lang
  setLanguage: (lang: Lang) => void
  setBatches: (taskId: string, productId: string, batches: Batch[]) => void
  appendBatch: (taskId: string, productId: string, batch: Batch) => void
  markChecked: (taskId: string, productId: string) => void
  markMismatch: (taskId: string, productId: string) => void
  markNotFound: (taskId: string, productId: string) => void
  setPendingNotification: (n: PendingNotification) => void
  clearPendingNotification: () => void
  reset: () => void
  getEntry: (taskId: string, productId: string) => ProductEntry | undefined
}

const key = (t: string, p: string) => `${t}:${p}`

export const useProto = create<State>((set, get) => ({
  entries: {},
  pendingNotification: null,
  setPendingNotification: (n) => set({ pendingNotification: n }),
  clearPendingNotification: () => set({ pendingNotification: null }),
  language: 'en',
  setLanguage: (lang) => set({ language: lang }),
  setBatches: (taskId, productId, batches) =>
    set((s) => ({
      entries: {
        ...s.entries,
        [key(taskId, productId)]: {
          ...(s.entries[key(taskId, productId)] ?? { status: 'pending', batches: [] }),
          batches,
        },
      },
    })),
  markChecked: (taskId, productId) =>
    set((s) => ({
      entries: {
        ...s.entries,
        [key(taskId, productId)]: {
          ...(s.entries[key(taskId, productId)] ?? { batches: [], status: 'pending' }),
          status: 'checked',
        },
      },
    })),
  markMismatch: (taskId, productId) =>
    set((s) => ({
      entries: {
        ...s.entries,
        [key(taskId, productId)]: {
          ...(s.entries[key(taskId, productId)] ?? { batches: [], status: 'pending' }),
          status: 'mismatch',
        },
      },
    })),
  markNotFound: (taskId, productId) =>
    set((s) => ({
      entries: {
        ...s.entries,
        [key(taskId, productId)]: {
          ...(s.entries[key(taskId, productId)] ?? { batches: [], status: 'pending' }),
          status: 'not-found',
        },
      },
    })),
  appendBatch: (taskId, productId, batch) =>
    set((s) => {
      const existing = s.entries[key(taskId, productId)] ?? { batches: [], status: 'pending' as const }
      return {
        entries: {
          ...s.entries,
          [key(taskId, productId)]: {
            ...existing,
            batches: [batch, ...existing.batches],
          },
        },
      }
    }),
  reset: () => set({ entries: {} }),
  getEntry: (taskId, productId) => get().entries[key(taskId, productId)],
}))
