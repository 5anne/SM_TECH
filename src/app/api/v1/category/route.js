export async function GET() {
    return Response.json(products, {
        headers: {
            "Set-Cookie": "theme=dark",
        }
    })
}