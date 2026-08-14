import { ArrowUp } from "lucide-react";
import { WHATSAPP } from "@/lib/products";
import { useScrolled } from "@/lib/motion";

/** Genuine WhatsApp glyph — the lucide MessageCircle looks nothing like it. */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12.04 2C6.58 2 2.14 6.44 2.13 11.9c0 1.75.45 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.78 1.22h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.64-1.03-5.13-2.9-6.99A9.83 9.83 0 0 0 12.04 2Zm.02 18.15h-.01a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.11.82.83-3.04-.2-.31a8.14 8.14 0 0 1-1.26-4.39c0-4.53 3.7-8.22 8.23-8.22 2.2 0 4.26.86 5.82 2.41a8.14 8.14 0 0 1 2.41 5.83c0 4.53-3.7 8.22-8.23 8.22Z" />
    </svg>
  );
}

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
        className="animate-float-idle grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_20px_36px_-16px_rgba(37,211,102,0.9)] transition-transform hover:-translate-y-0.5 hover:bg-[#20BD5A]"
      >
        <WhatsAppIcon className="h-7 w-7" />
      </a>
    </div>
  );
}
