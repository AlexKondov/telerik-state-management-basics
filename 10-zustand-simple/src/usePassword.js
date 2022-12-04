import create from "zustand";

const usePasswordStore = create((set) => ({
  password: "",
  setPassword: (text) => set(() => ({ password: text })),
}));

export default usePasswordStore;
