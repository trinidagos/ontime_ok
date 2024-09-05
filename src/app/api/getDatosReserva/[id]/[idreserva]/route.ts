import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: string, idreserva: string } }) {
  const restauranteId = params.id; 
  const reservaId = params.idreserva;

  try {
    // Primera consulta: Obtener la información de la reserva y el id_pedido
    const reservaResult = await sql`
      SELECT 
        r.documento_usuario,
        r.nombre,
        r.fecha,
        r.hora,
        r.telefono,
        r.mail,
        r.cant_clientes,
        r.id_restaurante,
        p.id AS id_pedido,   
        p.metodo_pago,
        p.precio_total
      FROM 
        reserva r
      JOIN 
        pedido p ON r.id = p.id_reserva
      WHERE 
        r.id_restaurante = ${restauranteId} AND r.id = ${reservaId}
      ORDER BY 
        r.fecha, r.hora;
    `;

    // Obtener el primer registro de la consulta
    const reserva = reservaResult.rows[0];
    const pedidoId = reserva.id_pedido;

    // Segunda consulta: Obtener los detalles de los platos asociados al pedido
    const platosResult = await sql`
      SELECT 
        pl.id AS id_plato,
        pl.nombre AS nombre_plato,
        c.cantidad
      FROM 
        comanda c
      JOIN 
        platos pl ON c.id_plato = pl.id
      WHERE 
        c.id_pedido = ${pedidoId};
    `;

    // Preparar la respuesta
    const respuesta = {
      reserva,
      platos: platosResult.rows
    };;

    return NextResponse.json(respuesta, { status: 200 });
  } catch (error: any) {
    console.error('Error al obtener la reserva:', error);
    return NextResponse.json({ error: 'Error al obtener la reserva' }, { status: 500 });
  }
}



