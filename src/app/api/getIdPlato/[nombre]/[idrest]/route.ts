import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// Función para manejar la solicitud GET
export async function GET(request: Request, { params }: { params: { nombre: string, idrest: string } }) {
    const nombre = params.nombre;
    const idrest = params.idrest; 
  try {
    // Ejecutar la consulta SQL
    const result = await sql`
      SELECT id 
      FROM platos 
      WHERE nombre = ${nombre} AND id_rest = ${idrest};
    `;

    // Devolver el resultado en formato JSON
    return NextResponse.json(result.rows, { status: 200 });

  } catch (error: any) {
    // Manejo de errores
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
