import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const {
      nombre,
      descripcion,
      precio,
      id_rest,
      disponible,
      vegetariano,
      sin_gluten,
      kosher,
    } = await request.json();

    await sql`
      INSERT INTO platos (nombre, descripcion, precio, id_rest, disponible, vegetariano, sin_gluten, kosher)
      VALUES (${nombre}, ${descripcion}, ${precio}, ${id_rest}, ${disponible}, ${vegetariano}, ${sin_gluten}, ${kosher});
    `;

    return NextResponse.json({ message: 'Plato insertado con éxito' }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

