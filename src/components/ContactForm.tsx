"use client";

import { useState } from "react";
import { Icon } from "./Icon";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { site, whatsappLink } from "@/data/site";

type Status = "idle" | "loading" | "success" | "error";

const PROJECT_TYPES = [
  "Acheter",
  "Louer",
  "Vendre",
  "Construire",
  "Gestion",
  "Autre",
];

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    if (!accessKey) {
      setStatus("error");
      setErrorMsg(
        "Le formulaire n'est pas encore configuré. Contactez-nous directement par WhatsApp ou téléphone."
      );
      return;
    }

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", accessKey);
    formData.append("subject", "Nouveau message — site DTS GROUPE");
    formData.append("from_name", "Site DTS GROUPE");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        e.currentTarget.reset();
      } else {
        setStatus("error");
        setErrorMsg("Une erreur est survenue. Réessayez ou contactez-nous par WhatsApp.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Impossible d'envoyer le message. Vérifiez votre connexion ou utilisez WhatsApp.");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-line rounded-md p-8 bg-muted text-center">
        <div className="w-12 h-12 rounded-full bg-whatsapp/15 flex items-center justify-center mx-auto mb-4">
          <Icon i="check" size={26} className="text-whatsapp" />
        </div>
        <h3 className="font-headings font-semibold text-lg text-ink mb-1">
          Message envoyé !
        </h3>
        <p className="font-body text-sm text-muted-foreground">
          Merci, nous vous répondrons rapidement.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm font-medium text-primary hover:underline"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  const inputClass =
    "w-full bg-background border border-line rounded-md px-3 py-2.5 text-sm font-body text-ink outline-none focus:border-primary transition-colors";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-ink mb-1.5 font-body">
          Nom complet
        </label>
        <input id="name" name="name" required className={inputClass} placeholder="Votre nom" />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-ink mb-1.5 font-body">
          Téléphone / WhatsApp
        </label>
        <input
          id="phone"
          name="phone"
          required
          className={inputClass}
          placeholder="+224 6XX XX XX XX"
        />
      </div>

      <div>
        <label htmlFor="project" className="block text-sm font-medium text-ink mb-1.5 font-body">
          Type de projet
        </label>
        <select id="project" name="project_type" className={`${inputClass} cursor-pointer`}>
          {PROJECT_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-ink mb-1.5 font-body">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          className={`${inputClass} resize-y`}
          placeholder="Décrivez votre projet ou votre demande..."
        />
      </div>

      {status === "error" && (
        <div className="flex items-start gap-2 text-sm text-accent font-body bg-accent/10 border border-accent/30 rounded-md p-3">
          <Icon i="info" size={15} className="mt-0.5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="font-body font-medium text-sm bg-primary text-primary-foreground px-6 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-60"
      >
        {status === "loading" ? "Envoi..." : "Envoyer le message"}
        {status !== "loading" && <Icon i="arrow-right" size={16} />}
      </button>

      {/* WhatsApp fallback — always available */}
      <a
        href={whatsappLink(`Bonjour DTS GROUPE, je vous contacte via votre site.`)}
        target="_blank"
        rel="noopener noreferrer"
        className="font-body font-medium text-sm text-whatsapp-foreground bg-whatsapp px-6 py-3 rounded-xl flex items-center justify-center gap-2 hover:brightness-95 transition"
      >
        <WhatsAppIcon size={16} />
        Ou écrivez-nous sur WhatsApp
      </a>

      <p className="text-xs text-muted-foreground font-body text-center">
        Vous pouvez aussi nous appeler au {site.phones[0]}.
      </p>
    </form>
  );
}
