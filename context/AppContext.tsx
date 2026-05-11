'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Frequency = "daily" | "weekly" | "monthly";

export interface Brand {
  id: string;
  name: string;
  category: string;
  followers: string;
  initials: string;
  color: string;
}

interface Preferences {
  marketingUpdates: boolean;
  utilityUpdates: boolean;
}

interface AppState {
  isAuthenticated: boolean;
  onboardingCompleted: boolean;
  user: { email: string; name: string } | null;
  phoneNumber: string;
  phoneConnected: boolean;
  selectedBrandIds: string[];
  frequency: Frequency;
  preferences: Preferences;
}

interface AppContextType extends AppState {
  login: (email: string, password: string) => void;
  signup: (email: string, password: string) => void;
  logout: () => void;
  completeOnboarding: (brandIds: string[]) => void;
  connectPhone: (phone: string) => void;
  disconnectPhone: () => void;
  changePhone: (phone: string) => void;
  updateFrequency: (f: Frequency) => void;
  updatePreferences: (prefs: Partial<Preferences>) => void;
  updateSelectedBrands: (ids: string[]) => void;
}

const defaultState: AppState = {
  isAuthenticated: false,
  onboardingCompleted: false,
  user: null,
  phoneNumber: "",
  phoneConnected: false,
  selectedBrandIds: [],
  frequency: "weekly",
  preferences: {
    marketingUpdates: true,
    utilityUpdates: true,
  },
};

const AppContext = createContext<AppContextType | null>(null);

const STORAGE_KEY = "NBMC_state";

function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...defaultState, ...JSON.parse(raw) };
  } catch {}
  return defaultState;
}

function saveState(state: AppState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(loadState);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const update = (partial: Partial<AppState>) =>
    setState((s) => ({ ...s, ...partial }));

  const login = (email: string, _password: string) => {
    update({
      isAuthenticated: true,
      user: { email, name: email.split("@")[0] },
    });
  };

  const signup = (email: string, _password: string) => {
    update({
      isAuthenticated: true,
      onboardingCompleted: false,
      user: { email, name: email.split("@")[0] },
    });
  };

  const logout = () => setState(defaultState);

  const completeOnboarding = (brandIds: string[]) => {
    update({ onboardingCompleted: true, selectedBrandIds: brandIds });
  };

  const connectPhone = (phone: string) => {
    update({ phoneNumber: phone, phoneConnected: true });
  };

  const disconnectPhone = () => {
    update({ phoneNumber: "", phoneConnected: false });
  };

  const changePhone = (phone: string) => {
    update({ phoneNumber: phone, phoneConnected: true });
  };

  const updateFrequency = (f: Frequency) => {
    update({ frequency: f });
  };

  const updatePreferences = (prefs: Partial<Preferences>) => {
    setState((s) => ({
      ...s,
      preferences: { ...s.preferences, ...prefs },
    }));
  };

  const updateSelectedBrands = (ids: string[]) => {
    update({ selectedBrandIds: ids });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        login,
        signup,
        logout,
        completeOnboarding,
        connectPhone,
        disconnectPhone,
        changePhone,
        updateFrequency,
        updatePreferences,
        updateSelectedBrands,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}

export const BRANDS: Brand[] = [
  { id: "nike", name: "Nike", category: "Sports & Fashion", followers: "12.4M", initials: "NK", color: "#111" },
  { id: "apple", name: "Apple", category: "Technology", followers: "28.1M", initials: "AP", color: "#555" },
  { id: "cocacolaindia", name: "Coca-Cola", category: "Food & Beverage", followers: "8.7M", initials: "CC", color: "#E63946" },
  { id: "pepsiindia", name: "Pepsi", category: "Food & Beverage", followers: "15.2M", initials: "TS", color: "#CC0000" },
  { id: "mcdonalds", name: "McDonald's", category: "Food & Beverage", followers: "7.2M", initials: "MC", color: "#FFC72C" },
  { id: "amazon", name: "Amazon", category: "E-Commerce", followers: "22.8M", initials: "AZ", color: "#FF9900" },
  { id: "netflix", name: "Netflix", category: "Entertainment", followers: "19.5M", initials: "NF", color: "#E50914" },
  { id: "spotify", name: "Spotify", category: "Music", followers: "11.3M", initials: "SP", color: "#1DB954" },
  { id: "adidas", name: "Adidas", category: "Sports & Fashion", followers: "9.8M", initials: "AD", color: "#000" },
  { id: "google", name: "Google", category: "Technology", followers: "31.7M", initials: "GO", color: "#4285F4" },
  { id: "starbucks", name: "Starbucks", category: "Beverages", followers: "6.4M", initials: "SB", color: "#00704A" },
  { id: "samsung", name: "Samsung", category: "Technology", followers: "18.9M", initials: "SS", color: "#1428A0" },
  { id: "louisvuitton", name: "Louis Vuitton", category: "Luxury Fashion", followers: "5.6M", initials: "LV", color: "#8B6914" },
  { id: "ikea", name: "IKEA", category: "Home & Living", followers: "4.3M", initials: "IK", color: "#0058A3" },
  { id: "zara", name: "Zara", category: "Fashion", followers: "6.1M", initials: "ZA", color: "#222" },
  { id: "bmw", name: "BMW", category: "Automotive", followers: "13.7M", initials: "BM", color: "#1C69D4" },
  { id: "airbnb", name: "Airbnb", category: "Travel", followers: "8.4M", initials: "AB", color: "#FF5A5F" },
  { id: "disney", name: "Disney", category: "Entertainment", followers: "24.1M", initials: "DS", color: "#1A1D61" },
  { id: "hm", name: "H&M", category: "Fashion", followers: "5.9M", initials: "HM", color: "#E50010" },
  { id: "sony", name: "Sony", category: "Electronics", followers: "10.2M", initials: "SN", color: "#000" },
];
