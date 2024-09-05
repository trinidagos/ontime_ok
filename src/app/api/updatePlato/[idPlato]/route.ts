import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// Función para manejar la solicitud POST
export async function POST(request: Request, { params }: { params: { idPlato: string } }) {
  const id = params.idPlato;

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
    
    const result = await sql`
      UPDATE platos
      SET nombre = ${nombre}, descripcion = ${descripcion}, precio = ${precio}, vegetariano = ${vegetariano}, sin_gluten = ${sin_gluten}, kosher = ${kosher}
      WHERE id = ${id}
      RETURNING *;  
    `;

    // Devolver la fila actualizada como respuesta
    return NextResponse.json({ message: 'Plato modificado exitosamente', plato: result.rows[0] }, { status: 200 });

  } catch (error: any) {
    // Manejo de errores
    console.error('Error actualizando los datos:', error.message);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}
