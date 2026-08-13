import { ArrowUp, MessageCircle } from "lucide-react";
import { WHATSAPP } from "@/lib/products";
import { useScrolled } from "@/lib/motion";

export function FloatingActions() {
  const show = useScrolled(500);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-4">
      {show && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          className="grid h-12 w-12 place-items-center rounded-full bg-green-deep text-cream shadow-[0_18px_30px_-16px_rgba(15,46,10,0.9)] transition-transform hover:-translate-y-0.5"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
      <a
        href={WHATSAPP}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="animate-float-idle grid h-14 w-14 place-items-center rounded-full bg-green text-cream shadow-[0_20px_36px_-16px_rgba(28,70,16,0.9)] transition-colors hover:bg-mint"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </div>
  );
}
