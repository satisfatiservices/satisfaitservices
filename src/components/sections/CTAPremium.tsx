"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, ArrowRight, MessageCircle, Mail, MapPin, LucideIcon } from "lucide-react";
import { Container, Button } from "@/components/ui";
import { SITE_CONFIG } from "@/lib/constants";
import { getPhoneLink, getWhatsAppLink } from "@/lib/utils";

interface CtaSectionData {
  badge: string;
  mainTitle: string;
  highlightedText: string;
  description: string;
  buttons: Array<{ text: string; type: string; icon: string }>;
  contactInfo: Array<{ label: string; value: string; icon: string }>;
}

const iconMap: Record<string, LucideIcon> = {
  arrowRight: ArrowRight,
  phone: Phone,
  messageCircle: MessageCircle,
  mail: Mail,
  mapPin: MapPin,
};

function CTAPremium({ data }: { data?: CtaSectionData | null }) {
  const badge = data?.badge || "Prêt à commencer ?";
  const mainTitle = data?.mainTitle || "Offrez-vous un intérieur";
  const highlightedText = data?.highlightedText || "impeccable";
  const description = data?.description || "Devis gratuit et personnalisé. Intervention à Narcastet, Pau et dans les Pyrénées-Atlantiques.";

  const buttons = data?.buttons?.map(b => ({ ...b, icon: iconMap[b.icon as any] || ArrowRight })) || [
    { text: "Demander un devis", type: "primary", icon: ArrowRight },
    { text: "Nous appeler", type: "secondary", icon: Phone }
  ];

  const contactInfo = data?.contactInfo?.map(c => ({ ...c, icon: iconMap[c.icon as any] || Phone })) || [
    { label: "Téléphone", value: SITE_CONFIG.contact.phone, icon: Phone },
    { label: "WhatsApp", value: "Discutons en direct", icon: MessageCircle },
    { label: "Email", value: SITE_CONFIG.contact.email, icon: Mail },
    { label: "Zone d'intervention", value: "Pau & environs (30km)", icon: MapPin }
  ];
  return (
    <section className="py-12 md:py-20 lg:py-28 bg-white relative overflow-hidden">
      <Container size="xl" className="px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative"
        >
          {/* Main CTA Card */}
          <div className="relative bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 rounded-2xl md:rounded-3xl overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary-500/20 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-primary-600/20 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 p-6 md:p-10 lg:p-14">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Content */}
                <div className="text-center lg:text-left">
                  <motion.span
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className="inline-block px-3 py-1.5 md:px-4 md:py-2 bg-primary-500/20 text-primary-300 rounded-full text-xs md:text-sm font-medium mb-4 md:mb-6"
                  >
                    {badge}
                  </motion.span>

                  <motion.h2
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 md:mb-6 leading-tight"
                  >
                    {mainTitle}{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-300">
                      {highlightedText}
                    </span>
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="text-sm md:text-base text-neutral-400 mb-6 md:mb-8 max-w-lg mx-auto lg:mx-0"
                  >
                    {description}
                  </motion.p>

                  {/* CTA buttons - visible only on desktop here */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="hidden lg:flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
                  >
                    {buttons.map((button, index) => {
                      const ButtonIcon = button.icon;
                      const href = button.type === "primary" ? "/contact" : getPhoneLink(SITE_CONFIG.contact.phone);
                      const LinkComponent = button.type === "primary" ? Link : "a";

                      return (
                        <LinkComponent key={index} href={href}>
                          <Button
                            size="lg"
                            variant={button.type === "primary" ? "primary" : "outline"}
                            className={button.type === "primary"
                              ? "w-full sm:w-auto bg-primary-500 hover:bg-primary-600 shadow-lg shadow-primary-500/30 text-sm md:text-base"
                              : "w-full sm:w-auto border-neutral-600 text-white hover:bg-neutral-700 text-sm md:text-base"
                            }
                          >
                            {button.type === "secondary" && <ButtonIcon size={16} className="mr-2" />}
                            {button.text}
                            {button.type === "primary" && <ButtonIcon size={16} className="ml-2" />}
                          </Button>
                        </LinkComponent>
                      );
                    })}
                  </motion.div>
                </div>

                {/* Contact Cards */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="space-y-3"
                >
                  {contactInfo.slice(0, 2).map((info, index) => {
                    const InfoIcon = info.icon;
                    const iconColorMap: Record<string, string> = {
                      phone: "bg-primary-500/20 text-primary-400",
                      messageCircle: "bg-green-500/20 text-green-400",
                    };
                    const iconColor = iconColorMap[info.icon === Phone ? "phone" : "messageCircle"] || "bg-primary-500/20 text-primary-400";
                    const href = info.label === "Téléphone" ? getPhoneLink(info.value) : getWhatsAppLink(SITE_CONFIG.contact.whatsapp);

                    return (
                      <a
                        key={index}
                        href={href}
                        {...(info.label === "WhatsApp" && { target: "_blank", rel: "noopener noreferrer" })}
                        className="group block bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 md:p-5 hover:bg-white/10 transition-all duration-200"
                      >
                        <div className="flex items-center gap-3 md:gap-4">
                          <div className={`w-10 h-10 md:w-11 md:h-11 rounded-lg flex items-center justify-center ${iconColor.split(' ')[0]}`}>
                            <InfoIcon size={18} className={`md:w-5 md:h-5 ${iconColor.split(' ')[1]}`} {...(InfoIcon === MessageCircle && { fill: "currentColor" })} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-[10px] md:text-xs text-neutral-400">{info.label}</p>
                            <p className="text-sm md:text-base font-semibold text-white truncate">
                              {info.value}
                            </p>
                          </div>
                        </div>
                      </a>
                    );
                  })}

                  {/* Last 2 items in 2 columns */}
                  <div className="grid grid-cols-2 gap-3">
                    {contactInfo.slice(2).map((info, index) => {
                      const InfoIcon = info.icon;
                      const iconColorMap: Record<string, string> = {
                        mail: "bg-blue-500/20 text-blue-400",
                        mapPin: "bg-purple-500/20 text-purple-400",
                      };
                      const iconColor = iconColorMap[info.icon === Mail ? "mail" : "mapPin"] || "bg-blue-500/20 text-blue-400";
                      const isClickable = info.label === "Email";
                      const Element = isClickable ? "a" : "div";

                      return (
                        <Element
                          key={index}
                          {...(isClickable && { href: `mailto:${info.value}` })}
                          className={`block bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 md:p-4 ${isClickable ? "hover:bg-white/10" : ""} transition-all duration-200`}
                        >
                          <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center mb-2 ${iconColor.split(' ')[0]}`}>
                            <InfoIcon size={14} className={`md:w-4 md:h-4 ${iconColor.split(' ')[1]}`} />
                          </div>
                          <p className="text-[10px] text-neutral-400">{info.label}</p>
                          <p className="text-[10px] md:text-xs font-semibold text-white truncate">
                            {info.value}
                          </p>
                        </Element>
                      );
                    })}
                  </div>

                  {/* CTA buttons - visible only on mobile after contact cards */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="lg:hidden flex flex-col sm:flex-row gap-3 pt-4"
                  >
                    {buttons.map((button, index) => {
                      const ButtonIcon = button.icon;
                      const href = button.type === "primary" ? "/contact" : getPhoneLink(SITE_CONFIG.contact.phone);
                      const LinkComponent = button.type === "primary" ? Link : "a";

                      return (
                        <LinkComponent key={index} href={href} className="flex-1">
                          <Button
                            size="lg"
                            variant={button.type === "primary" ? "primary" : "outline"}
                            className={button.type === "primary"
                              ? "w-full bg-primary-500 hover:bg-primary-600 shadow-lg shadow-primary-500/30 text-sm"
                              : "w-full border-neutral-600 text-white hover:bg-neutral-700 text-sm"
                            }
                          >
                            {button.type === "secondary" && <ButtonIcon size={16} className="mr-2" />}
                            {button.text}
                            {button.type === "primary" && <ButtonIcon size={16} className="ml-2" />}
                          </Button>
                        </LinkComponent>
                      );
                    })}
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

export { CTAPremium };
