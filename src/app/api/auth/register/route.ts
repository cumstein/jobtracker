
import { NextResponse } from 'next/server'
import {prisma} from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const { email, hashedPassword } = await req.json()

    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 })
    }

    const user = await prisma.user.create({
      data: {
        email,
        hashedPassword,
      },
    })

    return NextResponse.json({ user })
  } catch (err) {
    console.error('Error registering user:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
