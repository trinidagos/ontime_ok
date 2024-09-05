import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request, { params }: { params: { idRest: string } }) {
  const idrest = params.idRest;

  try {
    // Parsear el cuerpo de la solicitud para obtener los datos enviados
    const { efectivo, mercadopago, modo, credito, debito } = await request.json();

    // Ejecutar la consulta SQL para actualizar los métodos de pago
    const result = await sql`
      UPDATE restaurante
      SET 
        efectivo = ${efectivo}, 
        mercadopago = ${mercadopago}, 
        modo = ${modo}, 
        credito = ${credito}, 
        debito = ${debito}
      WHERE id = ${idrest}
      RETURNING *;
    `;

    // Devolver la fila actualizada como respuesta
    return NextResponse.json({ message: 'Método de pago actualizado exitosamente', restaurante: result.rows[0] }, { status: 200 });

  } catch (error: any) {
    // Manejo de errores
    console.error('Error actualizando los datos:', error.message);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}
