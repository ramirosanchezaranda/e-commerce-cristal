// src/app/api/checkout/route.ts
import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Preference } from 'mercadopago';

const client = new MercadoPagoConfig({ 
  accessToken: process.env.MP_ACCESS_TOKEN! 
});

export async function POST(request: Request) {
  const { items } = await request.json();
  
  try {
    const preference = new Preference(client);
    const result = await preference.create({
      body: {
        items: items.map((item: any) => ({
          title: item.name,
          unit_price: Number(item.price),
          quantity: Number(item.quantity),
          currency_id: 'ARS',
        })),
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success`,
          failure: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/error`,
        },
        auto_return: 'approved',
      }
    });

    return NextResponse.json({ url: result.init_point });
  } catch (error) {
    console.error('Error creating preference:', error);
    return NextResponse.json({ error: 'Error creating payment preference' }, { status: 500 });
  }
}