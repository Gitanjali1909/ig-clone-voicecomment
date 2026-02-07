export async function POST(req) {
  try {
    const { email, password } = await req.json()
    if (!email || !password) return Response.json({ message: 'Email and password required' }, { status: 400 })
    if (!email.includes('@')) return Response.json({ message: 'Invalid email' }, { status: 400 })
    if (password.length < 6) return Response.json({ message: 'Password at least 6 chars' }, { status: 400 })
    
    const token = Buffer.from(JSON.stringify({ email, iat: Math.floor(Date.now() / 1000) })).toString('base64')
    return Response.json({ token }, { status: 201 })
  } catch (e) {
    return Response.json({ message: 'Server error' }, { status: 500 })
  }
}
