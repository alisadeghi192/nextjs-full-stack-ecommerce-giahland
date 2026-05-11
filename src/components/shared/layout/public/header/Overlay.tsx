"use client";

interface OverlayProps {
  isOpen: boolean;
  onClose: () => void;
  topOffset?: number;
  zIndex?: number;
}

export default function Overlay({
  isOpen,
  onClose,
  topOffset = 0,
  zIndex = 30,
}: OverlayProps) {
  return (
    <div
      className={`fixed inset-0 bg-black/60 transition-all duration-200 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      style={{ top: `${topOffset}px`, zIndex }}
      onClick={onClose}
    />
  );
}