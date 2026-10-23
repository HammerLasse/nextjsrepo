export async function POST(request) {
  const { items } = await request.json();

  if (!Array.isArray(items) || items.length === 0) {
    return Response.json({ message: "Kurven er tom" }, { status: 400 });
  }

  return Response.json({
    message: "Ordren er gennemført!",
    orderId: crypto.randomUUID(),
  });
}
