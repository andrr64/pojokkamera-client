import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// 1. Define the shape of your state and actions
type UserState = {
  username: string;
  namaLengkap: string;
  setUsername: (name: string) => void;
  setNamaLengkap: (name: string) => void;
  reset: () => void;
  isEmpty: () => boolean; // <-- tambahkan fungsi
};

// 2. Create the store with persist middleware
const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      // Initial state
      username: "",
      namaLengkap: "",
      isEmpty: () => get().username === "", // <-- implementasi
      // Actions to update state
      setUsername: (name: string) => set({ username: name }),
      setNamaLengkap: (name: string) => set({ namaLengkap: name }),
      // The reset action now just resets the state.
      // The middleware will automatically update localStorage.
      reset: () => set({ username: "", namaLengkap: "" }),
    }),
    {
      // Configuration for the middleware
      name: "user-storage", // The key used in localStorage
      storage: createJSONStorage(() => localStorage), // (optional) Handle SSR
    }
  )
);

// 3. Export the hook with the same name for drop-in replacement
export const useUserPersist = useUserStore;