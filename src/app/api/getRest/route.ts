import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Ejecutar la consulta
    const result = await sql`SELECT id, nombre, foto FROM restaurante`;

    // Devolver los resultados en formato JSON con un estado 200 (OK)
    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    // Manejo de errores
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

