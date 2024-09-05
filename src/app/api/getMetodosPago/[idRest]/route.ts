import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { idRest: string } }) {
  const idrest = params.idRest;

  try {
    // Ejecutar la consulta SQL para obtener los métodos de pago
    const result = await sql`
      SELECT 
        debito, 
        credito, 
        mercadopago, 
        efectivo, 
        modo
      FROM 
        restaurante
      WHERE 
        id = ${idrest};
    `;

    // Devolver los resultados en formato JSON con un estado 200 (OK)
    return NextResponse.json(result.rows, { status: 200 });

  } catch (error: any) {
    // Manejo de errores
    console.error('Error fetching data:', error.message);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}
