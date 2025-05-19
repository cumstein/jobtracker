'use client'

import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { useState } from 'react'
import bcrypt from 'bcryptjs'

type FormValues = {
  email: string
  password: string
}

export default function RegisterForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>()
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: FormValues) => {
    setLoading(true)

    const hashedPassword = await bcrypt.hash(data.password, 10)

    const res = await fetch('/api//auth/register', {
      method: 'POST',
      body: JSON.stringify({
        email: data.email,
        hashedPassword,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    setLoading(false)
    const result = await res.json()
    console.log(result)
  }

  return (
    <Card className="max-w-sm mx-auto mt-10 p-4">
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input placeholder="Email" {...register('email', { required: true })} />
          <Input placeholder="Password" type="password" {...register('password', { required: true })} />
          <Button type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
