/**
 * Centralized app config: images, social links, contact form (Formspree).
 * Set resumeUrl to a PDF URL to show "Download CV" (e.g. Cloudinary or public link).
 */
export const config = {
  /** Optional: PDF URL for CV/Resume download. If set, "Download CV" appears in hero and nav. */
  resumeUrl: '' as string,
  /** Location for recruiters (e.g. "Buenos Aires, Argentina"). Leave empty to hide. */
  location: 'Buenos Aires, Argentina',
  /** When true, shows "Open to opportunities" badge in hero and footer. */
  openToWork: true,
  /** Formspree form ID for contact form. Set PUBLIC_FORMSPREE_FORM_ID in .env or Vercel; fallback so form works out of the box. */
  formspreeFormId: (import.meta.env.PUBLIC_FORMSPREE_FORM_ID ?? 'mdawdlld').trim(),
  images: {
    profile: {
      default:
        'https://res.cloudinary.com/dsbjzd18p/image/upload/f_auto,q_auto/v1772078363/lucas_ruiz_1_1_iqkopk.png',
      small:
        'https://res.cloudinary.com/dsbjzd18p/image/upload/f_auto,q_auto,w_400/v1772078363/lucas_ruiz_1_1_iqkopk.png',
      medium:
        'https://res.cloudinary.com/dsbjzd18p/image/upload/f_auto,q_auto,w_800/v1772078363/lucas_ruiz_1_1_iqkopk.png',
    },
    projects: {
      calendar: {
        default:
          'https://res.cloudinary.com/dsbjzd18p/image/upload/f_auto,q_auto/whycl0fflapnoxlbcvnl',
        thumbnail:
          'https://res.cloudinary.com/dsbjzd18p/image/upload/f_auto,q_auto,w_600/whycl0fflapnoxlbcvnl',
      },
      railcar: {
        default:
          'https://res.cloudinary.com/dsbjzd18p/image/upload/f_auto,q_auto/wxa8zat3w4woiij4ffeu',
        thumbnail:
          'https://res.cloudinary.com/dsbjzd18p/image/upload/f_auto,q_auto,w_600/wxa8zat3w4woiij4ffeu',
      },
      notes: {
        default:
          'https://res.cloudinary.com/dsbjzd18p/image/upload/f_auto,q_auto/abtcr8lqunllpcu2ku9y',
        thumbnail:
          'https://res.cloudinary.com/dsbjzd18p/image/upload/f_auto,q_auto,w_600/abtcr8lqunllpcu2ku9y',
      },
      ippt: {
        default:
          'https://res.cloudinary.com/dsbjzd18p/image/upload/v1744430791/nzqbrycp3b5gto0cf2dx.png',
        thumbnail:
          'https://res.cloudinary.com/dsbjzd18p/image/upload/v1744430791/nzqbrycp3b5gto0cf2dx.jpg',
      },
      assemblyLine: {
        default:
          'https://res.cloudinary.com/dsbjzd18p/image/upload/v1773008102/asssembly_line_dxsh8q.png',
        thumbnail:
          'https://res.cloudinary.com/dsbjzd18p/image/upload/v1773008102/asssembly_line_dxsh8q.png',
      },
      heyPrinter: {
        default: 'https://res.cloudinary.com/dsbjzd18p/image/upload/v1773017411/hey_printer_haypba.png',
        thumbnail: 'https://res.cloudinary.com/dsbjzd18p/image/upload/v1773017411/hey_printer_haypba.png',
      },
      n8nLecturaFacturas: {
        default: 'https://res.cloudinary.com/dsbjzd18p/image/upload/v1773109431/lectura_facturas_c0odhy.png',
        thumbnail: 'https://res.cloudinary.com/dsbjzd18p/image/upload/v1773109431/lectura_facturas_c0odhy.png',
      },
      n8nBigqueryCocheras: {
        default: 'https://res.cloudinary.com/dsbjzd18p/image/upload/v1773109637/n8n_cocheras_erc9hp.png',
        thumbnail: 'https://res.cloudinary.com/dsbjzd18p/image/upload/v1773109637/n8n_cocheras_erc9hp.png',
      },
      crecerJugandoGestalt: {
        default: 'https://res.cloudinary.com/dsbjzd18p/image/upload/v1773458915/crecer-jugando-gestalt_z1kr7q.png',
        thumbnail: 'https://res.cloudinary.com/dsbjzd18p/image/upload/f_auto,q_auto,w_600/v1773458915/crecer-jugando-gestalt_z1kr7q.png',
      },
      project4: {
        default: 'https://placehold.co/1200x800/1e293b/64748b?text=Project+4',
        thumbnail: 'https://placehold.co/600x400/1e293b/64748b?text=Project+4',
      },
      n8nDocumentosSalidaPdf: {
        default: 'https://res.cloudinary.com/dsbjzd18p/image/upload/v1773109637/documentos_salida_clye34.png',
        thumbnail: 'https://res.cloudinary.com/dsbjzd18p/image/upload/v1773109637/documentos_salida_clye34.png',
      },
      yogalab: {
        default:
          'https://res.cloudinary.com/dsbjzd18p/image/upload/v1744430791/psl8vhtsb2ugvtkpnzfq.png',
        thumbnail:
          'https://res.cloudinary.com/dsbjzd18p/image/upload/v1744430791/psl8vhtsb2ugvtkpnzfq.jpg',
      },
    },
  },
  socialLinks: {
    github: 'https://github.com/chill0101',
    linkedin: 'https://www.linkedin.com/in/lucasruiz0101/',
    whatsapp: 'https://wa.link/lq3sag',
    email: 'mailto:lucasruiz0110@gmail.com',
  },
} as const;
