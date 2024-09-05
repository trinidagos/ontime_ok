import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id; 
  try {
    const result = await sql`
      SELECT foto, nombre, descripcion, vegetariano, sin_gluten, kosher
      FROM platos
      WHERE id = ${id};
      `;

    // Devuelve la información del plato
    return NextResponse.json(result.rows[0], { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error obteniendo la información del plato' }, { status: 500 });
  }
}
