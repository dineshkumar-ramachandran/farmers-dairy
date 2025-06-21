import { NextResponse } from "next/server"

const orders: any[] = []

export async function GET() {
  try {
    return NextResponse.json({ orders })
  } catch (error) {
    console.error("Error fetching orders:", error)
    return NextResponse.json({ orders: [] })
  }
}
