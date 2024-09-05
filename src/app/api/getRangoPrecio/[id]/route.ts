import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id; // Captura el parámetro 'id' de la URL
  try {
    const result = await sql`
    SELECT
        ROUND(MIN(precio) / 100.0) * 100 AS precio_minimo,
        ROUND(MAX(precio) / 100.0) * 100 AS precio_maximo
      FROM platos
      WHERE id_rest = ${id};
    `;

    // Devolver los resultados en formato JSON con un estado 200 (OK)
    return NextResponse.json(result.rows, { status: 200 });
  } catch (error: any) {
    // Manejo de errores
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
