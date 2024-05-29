import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import { MongoClient } from "mongodb";
import jwt from "jsonwebtoken";


export async function POST(req, res) {
    const { email, pass } = await req.json()
    const client = await MongoClient.connect(process.env.NEXT_PUBLIC_URL_DATA_BASE)
    const db = client.db()
    const getUser = await db.collection('DB-USERS').findOne({ email: email })
    const statusUser = bcrypt.compareSync(pass, getUser?.pass || '')
    if (getUser && statusUser) {
        const { _id, FName, LName, email } = getUser
        const token = jwt.sign({ _id, FName, LName, email }, process.env.NEXT_PUBLIC_SECRET_KEY, { expiresIn: '1h' })
        console.log(token);
        return NextResponse.json({ token: token }, { status: 200 })
    } else {
        return NextResponse.json({ message: 'Incorrect Username or Password' }, { status: 400 })
    }
}