// src/app/contacto/page.tsx
'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';

const schema = z.object({
  name: z.string().min(2, 'Nombre muy corto'),
  email: z.string().email('Email inválido'),
  message: z.string().min(10, 'Mensaje muy corto'),
});

type FormData = z.infer<typeof schema>;

export default function ContactPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Lógica de envío
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-12"
    >
      <h1 className="text-3xl font-bold mb-8 text-impacto-purple">Contacto</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-6">
        <div>
          <label className="block mb-2">Nombre</label>
          <input
            {...register('name')}
            className="w-full p-2 border rounded"
          />
          {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
        </div>
        
        <div>
          <label className="block mb-2">Email</label>
          <input
            type="email"
            {...register('email')}
            className="w-full p-2 border rounded"
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
        </div>
        
        <div>
          <label className="block mb-2">Mensaje</label>
          <textarea
            {...register('message')}
            className="w-full p-2 border rounded h-32"
          />
          {errors.message && <span className="text-red-500 text-sm">{errors.message.message}</span>}
        </div>
        
        <button
          type="submit"
          className="bg-impacto-purple text-white px-6 py-2 rounded hover:bg-opacity-90 transition-colors"
        >
          Enviar Mensaje
        </button>
      </form>
    </motion.div>
  );
}