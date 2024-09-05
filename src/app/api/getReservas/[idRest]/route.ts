import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';


export async function GET(request: Request, { params }: { params: { idRest: string } }) {
  const restauranteId = params.idRest;


  try {
    // Primera consulta: Obtener todas las reservas de un restaurante
    const reservasResult = await sql`
      SELECT
        r.id AS reserva_id,
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
        r.id_restaurante = ${restauranteId}
      ORDER BY
        r.fecha, r.hora;
    `;


    // Mapear reservas para añadir la información de los platos de cada pedido
    const reservasConPlatos = await Promise.all(reservasResult.rows.map(async (reserva) => {
      const pedidoId = reserva.id_pedido;


      // Segunda consulta: Obtener los detalles de los platos asociados a cada pedido
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


      // Retornar la reserva con los detalles de los platos
      return {
        reserva,
        platos: platosResult.rows
      };
    }));


    // Enviar la respuesta JSON con todas las reservas y sus platos asociados
    return NextResponse.json(reservasConPlatos, { status: 200 });
  } catch (error: any) {
    console.error('Error al obtener las reservas:', error);
    return NextResponse.json({ error: 'Error al obtener las reservas' }, { status: 500 });
  }
}


