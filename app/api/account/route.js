import { headers } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { MongoClient, ObjectId } from "mongodb";
import bcrypt from 'bcrypt'

export async function GET() {
    const head = headers()
    const getHredersInfo = head.get('Authorization')
    const client = await MongoClient.connect(process.env.NEXT_PUBLIC_URL_DATA_BASE)
    const db = client.db()
    try {
        const getInfoUser = jwt.verify(getHredersInfo, process.env.NEXT_PUBLIC_SECRET_KEY)
        const getID = new ObjectId(getInfoUser._id)
        const { _id, FName, LName, email } = await db.collection('DB-USERS').findOne({ _id: getID })
        return NextResponse.json({ _id, FName, LName, email }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: 'Invalid Token' }, { status: 403 })
    }
}

export async function PATCH(req) {
    const head = headers()
    const getHredersInfo = head.get('Authorization')
    const allInfo = await req.json()
    const getInfoUser = jwt.verify(getHredersInfo, process.env.NEXT_PUBLIC_SECRET_KEY)
    const getID = new ObjectId(getInfoUser._id)
    const client = await MongoClient.connect(process.env.NEXT_PUBLIC_URL_DATA_BASE)
    const db = client.db()
    const findUser = await db.collection('DB-USERS').findOne({ _id: getID })
    let hashNewPass = ''

    if (allInfo.FName && allInfo.LName && allInfo.email && allInfo.pass && allInfo?.newPass == allInfo?.confirmNewPass && findUser) {
        try {
            const getInfoUser = jwt.verify(getHredersInfo, process.env.NEXT_PUBLIC_SECRET_KEY)
            const checkPass = bcrypt?.compareSync(allInfo.pass, findUser.pass)
            if (getInfoUser && checkPass) {
                const getID = new ObjectId(getInfoUser._id)
                if (allInfo.newPass) {
                    hashNewPass = bcrypt.hashSync(allInfo.newPass, 10)
                }
                try {
                    await db.collection('DB-USERS').updateOne({ _id: getID }, { $set: { FName: allInfo.FName, LName: allInfo.LName, email: allInfo.email, pass: hashNewPass || findUser.pass } })
                    const { _id, FName, LName, email } = await db.collection('DB-USERS').findOne({ _id: getID })
                    const getNewToken = jwt.sign({ _id, FName, LName, email }, process.env.NEXT_PUBLIC_SECRET_KEY)
                    console.log({ _id, FName, LName, email });
                    return NextResponse.json({ token: getNewToken }, { status: 200 })
                } catch (error) {
                    return NextResponse.json({ message: 'Something Went Wrong', error }, { status: 403 })
                }
            } else {
                return NextResponse.json({ message: 'Something Went Wrong 0000000000' }, { status: 403 })
            }
        } catch (error) {
            return NextResponse.json({ message: 'Invalid Token 123456789' }, { status: 400 })
        }
    } else {
        return NextResponse.json({ message: 'Please Check Your Info' }, { status: 400 })
    }
}