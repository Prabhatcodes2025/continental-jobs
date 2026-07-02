import { MessageCircle } from "lucide-react";
import { company } from "@/lib/site-data";

export function WhatsAppFloating() {
  return (
    <a
      href={company.socialChat}
      className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-2xl shadow-black/25 transition hover:scale-105 md:bottom-6 md:right-6"
      aria-label="Chat with Continental on WhatsApp"
      data-magnetic
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
