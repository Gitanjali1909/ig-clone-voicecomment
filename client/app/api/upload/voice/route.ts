export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const audio = formData.get('audio') as Blob

    if (!audio) return Response.json({ error: 'No audio file' }, { status: 400 })

    const mockUrl = `https://storage.example.com/voice-${Date.now()}.webm`
    return Response.json({ url: mockUrl }, { status: 200 })
  } catch (e) {
    return Response.json({ error: 'Upload failed' }, { status: 500 })
  }
}
