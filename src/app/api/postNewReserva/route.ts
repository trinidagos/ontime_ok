import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const {
      documento_usuario,
      nombre,
      fecha,
      hora,
      telefono,
      mail,
      cant_clientes,
      id_restaurante,
      platos,
      metododepago
    } = await request.json();

    console.log("Datos recibidos:", {
      documento_usuario,
      nombre,
      fecha,
      hora,
      telefono,
      mail,
      cant_clientes,
      id_restaurante,
      platos,
      metododepago
    });
    console.log(platos.cantidad)
    // Inserta la reserva en la tabla 'reserva'
    const reservaResult = await sql`
      INSERT INTO reserva (documento_usuario, nombre, fecha, hora, telefono, mail, cant_clientes, id_restaurante)
      VALUES (${documento_usuario}, ${nombre}, ${fecha}, ${hora}, ${telefono}, ${mail}, ${cant_clientes}, ${id_restaurante})
      RETURNING id;
    `;

    console.log("Reserva creada:", reservaResult.rows);

    const reservaId = reservaResult.rows[0].id;

    // Calcula el precio total de los platos
    const preciosPlatos = await Promise.all(
      platos.map(async (plato: { id: number, cantidad: number }) => {
        const platoResult = await sql`
          SELECT precio FROM platos WHERE id = ${plato.id}
        `;
        console.log("Precio del plato:", platoResult.rows[0].precio);
        return platoResult.rows[0].precio * plato.cantidad;
      })
    );

    const precioTotal = preciosPlatos.reduce((acc, precio) => acc + precio, 0);

    // Inserta el pedido en la tabla 'pedido'
    const pedidoResult = await sql`
      INSERT INTO pedido (id_reserva, precio_total, metodo_pago)
      VALUES (${reservaId}, ${precioTotal}, ${metododepago}) 
      RETURNING id;
    `;

    console.log("Pedido creado:", pedidoResult.rows);

    const pedidoId = pedidoResult.rows[0].id;

    // Inserta los platos en la tabla 'comanda'
    const comanda = platos.map((plato: { id: number, cantidad: number}) => sql`
      INSERT INTO comanda (id_plato, id_pedido, cantidad)
      VALUES (${plato.id}, ${pedidoId}, ${plato.cantidad});
    `);

    await Promise.all(comanda);

    console.log("Comandas creadas");

    return NextResponse.json({ id: reservaId }, { status: 201 });
  } catch (error: any) {
    console.error('Error creando la reserva:', error.message);
    return NextResponse.json({ error: 'Error creando la reserva' }, { status: 500 });
  }
}
