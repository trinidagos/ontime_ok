import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { idRest: string } }) {
  const idRest = params.idRest; // Captura el parámetro 'id' de la URL
  try {
    const result = await sql`
    SELECT 
        r.mail,
        r.telefono,
        EXISTS (
          SELECT 1
          FROM platos
          WHERE kosher = TRUE AND id_rest = ${idRest}
        ) AS existe_kosher,
        EXISTS (
          SELECT 1
          FROM platos
          WHERE sin_gluten = TRUE AND id_rest = ${idRest}
        ) AS existe_sin_gluten,
        EXISTS (
          SELECT 1
          FROM platos
          WHERE vegetariano = TRUE AND id_rest = ${idRest}
        ) AS existe_vegetariano
      FROM restaurante r
      WHERE r.id = ${idRest};
    `;
      
    // Devolver los resultados en formato JSON con un estado 200 (OK)
    return NextResponse.json(result.rows, { status: 200 });
  } catch (error: any) {
    // Manejo de errores
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}