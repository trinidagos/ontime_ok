import { put } from '@vercel/blob';
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function PUT(request: Request, { params }: { params: { idPlato: string, idRest: string } }) {
  const idPlato = params.idPlato;
  const idRest = params.idRest;

  try {
    // Leer el cuerpo de la solicitud como FormData
    const formData = await request.formData();
    const file = formData.get('file') as File;
    // Verificar que el archivo existe
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Subir el archivo al blob storage
    const blob = await put(file.name, file, { access: 'public' });
    const blobUrl = blob.url;

    await sql`
      UPDATE platos
      SET foto = ${blobUrl}
      WHERE id = ${idPlato} AND id_rest = ${idRest};
    `;
    // Devolver la URL del blob
    return NextResponse.json({ message: 'File uploaded successfully', url: blobUrl }, { status: 200 });

  } catch (error: any) {
    // Manejo de errores
    console.error('Error:', error.message);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}
