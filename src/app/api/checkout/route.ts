// src/app/api/checkout/route.ts
import { NextResponse } from 'next/server';
import mercadopago from 'mercadopago';

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN!,
});

export async function POST(request: Request) {
  const { items } = await request.json();
  
  const preference = {
    items: items.map((item: any) => ({
      title: item.name,
      unit_price: item.price,
      quantity: item.quantity,
      currency_id: 'ARS',
    })),
    back_urls: {
      success: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success`,
      failure: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/error`,
    },
    auto_return: 'approved',
  };

  try {
    const response = await mercadopago.preferences.create(preference);
    return NextResponse.json({ id: response.body.id });
  } catch (error) {
    return NextResponse.json({ error: 'Error creating payment' }, { status: 500 });
  }
}