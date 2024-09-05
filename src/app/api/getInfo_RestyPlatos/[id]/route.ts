import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id; // Captura el parámetro 'id' de la URL
  try {
    const result = await sql`
      SELECT 
        r.nombre AS restaurante,
        r.direccion,
        r.calle,
        r.foto,
        p.nombre AS plato,
        p.precio
      FROM 
        restaurante r
      JOIN 
        platos p ON r.id = p.id_rest
      WHERE 
        r.id = ${id};
    `;
    // Devolver los resultados en formato JSON con un estado 200 (OK)
    return NextResponse.json(result.rows, { status: 200 });
  } catch (error: any) {
    // Manejo de errores
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}