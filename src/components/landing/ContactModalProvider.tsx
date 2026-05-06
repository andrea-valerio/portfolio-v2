"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { ContactModal, type ContactModalMode } from "./ContactModal";

type ContactModalContextValue = {
  openContact: () => void;
  openCvPreview: () => void;
};

const ContactModalContext = createContext<ContactModalContextValue | null>(null);

export function useContactModal(): ContactModalContextValue {
  const ctx = useContext(ContactModalContext);
  if (!ctx) {
    throw new Error("useContactModal must be used within ContactModalProvider");
  }
  return ctx;
}

export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<ContactModalMode>("contact");
  const openContact = useCallback(() => {
    setMode("contact");
    setOpen(true);
  }, []);
  const openCvPreview = useCallback(() => {
    setMode("cv");
    setOpen(true);
  }, []);
  const value = useMemo(
    () => ({ openContact, openCvPreview }),
    [openContact, openCvPreview],
  );

  return (
    <ContactModalContext.Provider value={value}>
      {children}
      <ContactModal open={open} mode={mode} onClose={() => setOpen(false)} />
    </ContactModalContext.Provider>
  );
}
