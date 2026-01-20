"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Veuillez entrer une adresse email valide"),
  telephone: z
    .string()
    .min(10, "Le numéro de téléphone doit contenir au moins 10 chiffres")
    .regex(/^[0-9\s\-\+\.]+$/, "Numéro de téléphone invalide"),
  service: z.string().min(1, "Veuillez sélectionner un service"),
  message: z
    .string()
    .min(10, "Le message doit contenir au moins 10 caractères"),
  rgpd: z
    .boolean()
    .refine((val) => val === true, {
      message: "Vous devez accepter la politique de confidentialité",
    }),
});

type ContactFormData = z.infer<typeof contactSchema>;

const services = [
  { value: "", label: "Sélectionnez un service" },
  { value: "menage", label: "Ménage et nettoyage" },
  { value: "repassage", label: "Repassage et entretien du linge" },
  { value: "courses", label: "Livraison de courses" },
  { value: "nettoyage-specifique", label: "Nettoyage spécifique" },
  { value: "home-organising", label: "Home Organising & Coaching" },
  { value: "professionnel", label: "Services professionnels" },
  { value: "autre", label: "Autre demande" },
];

function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error("API Error:", result);
        throw new Error(result.error || "Erreur lors de l'envoi");
      }

      setSubmitStatus("success");
      reset();
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyles =
    "w-full px-4 py-3.5 rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:bg-white transition-all duration-300 hover:border-neutral-300";
  const errorStyles = "border-red-300 focus:ring-red-500 bg-red-50/50";
  const labelStyles = "block text-sm font-semibold text-neutral-700 mb-2";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="nom" className={labelStyles}>
            Nom complet *
          </label>
          <input
            id="nom"
            type="text"
            placeholder="Votre nom"
            className={cn(inputStyles, errors.nom && errorStyles)}
            {...register("nom")}
          />
          {errors.nom && (
            <p className="mt-1 text-sm text-red-500">{errors.nom.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className={labelStyles}>
            Adresse email *
          </label>
          <input
            id="email"
            type="email"
            placeholder="votre@email.com"
            className={cn(inputStyles, errors.email && errorStyles)}
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="telephone" className={labelStyles}>
            Téléphone *
          </label>
          <input
            id="telephone"
            type="tel"
            placeholder="06 XX XX XX XX"
            className={cn(inputStyles, errors.telephone && errorStyles)}
            {...register("telephone")}
          />
          {errors.telephone && (
            <p className="mt-1 text-sm text-red-500">
              {errors.telephone.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="service" className={labelStyles}>
            Service souhaité *
          </label>
          <select
            id="service"
            className={cn(inputStyles, errors.service && errorStyles)}
            {...register("service")}
          >
            {services.map((service) => (
              <option key={service.value} value={service.value}>
                {service.label}
              </option>
            ))}
          </select>
          {errors.service && (
            <p className="mt-1 text-sm text-red-500">
              {errors.service.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelStyles}>
          Votre message *
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder="Décrivez votre besoin..."
          className={cn(inputStyles, "resize-none", errors.message && errorStyles)}
          {...register("message")}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
        )}
      </div>

      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            className="mt-1 w-5 h-5 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
            {...register("rgpd")}
          />
          <span className="text-sm text-neutral-600">
            J&apos;accepte que mes données soient utilisées pour traiter ma
            demande conformément à la{" "}
            <a
              href="/mentions-legales"
              className="text-primary-600 hover:underline"
            >
              politique de confidentialité
            </a>
            . *
          </span>
        </label>
        {errors.rgpd && (
          <p className="mt-1 text-sm text-red-500">{errors.rgpd.message}</p>
        )}
      </div>

      {submitStatus === "success" && (
        <div className="flex items-start gap-4 p-5 bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 rounded-2xl border border-green-100">
          <div className="flex-shrink-0 w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
            <CheckCircle size={20} className="text-white" />
          </div>
          <div>
            <p className="font-semibold text-green-800">Message envoyé avec succès !</p>
            <p className="text-sm text-green-600 mt-1">
              Nous vous recontacterons dans les plus brefs délais.
            </p>
          </div>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="flex items-start gap-4 p-5 bg-gradient-to-r from-red-50 to-rose-50 text-red-700 rounded-2xl border border-red-100">
          <div className="flex-shrink-0 w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center">
            <AlertCircle size={20} className="text-white" />
          </div>
          <div>
            <p className="font-semibold text-red-800">Une erreur est survenue</p>
            <p className="text-sm text-red-600 mt-1">
              Veuillez réessayer ou nous contacter par téléphone.
            </p>
          </div>
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full group shadow-lg shadow-primary-500/20 hover:shadow-xl hover:shadow-primary-500/30 hover:-translate-y-0.5 transition-all duration-300"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 size={20} className="mr-2 animate-spin" />
            Envoi en cours...
          </>
        ) : (
          <>
            <Send size={20} className="mr-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            Envoyer ma demande
          </>
        )}
      </Button>
    </form>
  );
}

export { ContactForm };
