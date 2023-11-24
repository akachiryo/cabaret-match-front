import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type State = {
  role: string
}

type Action = {
  updateRole: (role: string) => void
}

export const useUserStore = create<State & Action>(
  persist(
    (set) => ({
      role: '',
      updateRole: (role) => set({ role }),
      resetRole: () => set({ role: '' }),
    }),
    {
      name: 'role',
    },
  ),
)
