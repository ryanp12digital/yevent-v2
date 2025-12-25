
import { z } from 'zod';

// Strict email regex to avoid illegal characters and ensure proper TLD structure
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const bookingSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z
    .string()
    .min(1, 'E-mail é obrigatório')
    .email('E-mail inválido')
    .regex(emailRegex, 'Formato de e-mail inválido ou caracteres não permitidos'),
  phone: z.string().min(10, 'Telefone inválido (mínimo 10 dígitos)'),
  space_id: z.string().optional(),
  message: z.string().min(5, 'Por favor, descreva brevemente seu evento'),
});

export type BookingFormData = z.infer<typeof bookingSchema>;

export const newsletterSchema = z.object({
  email: z.string().email('E-mail inválido'),
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;
