import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import bcrypt from 'bcrypt'

export async function POST(req, res) {
    const getInfo = await req.json()
    console.log(getInfo);
    const setHashPass = bcrypt.hashSync(getInfo.pass, 10)
    if (getInfo.email?.includes('@') && getInfo.email?.includes('.com') && getInfo.pass === getInfo.confirmPass && getInfo.FName && getInfo.LName && getInfo.email) {
        const client = await MongoClient.connect(process.env.NEXT_PUBLIC_URL_DATA_BASE)
        const db = client.db()
        db.collection('DB-USERS').createIndex({ "email": 1 }, { unique: true })
        db.collection('DB-USERS').createIndex({ "FName": 1 }, { unique: false })
        db.collection('DB-USERS').createIndex({ "LName": 1 }, { unique: false })
        db.collection('DB-USERS').createIndex({ "pass": 1 }, { unique: false })
        const getInfoStatus = await db.collection('DB-USERS').insertOne({ FName: getInfo.FName, LName: getInfo.LName, email: getInfo.email, pass: setHashPass })
            .then(() => { return NextResponse.json({ message: 'Account Has Been Created Successfully' }, { status: 200 }) })
            .catch((e) => { return NextResponse.json({ message: 'Email Is Already Used' }, { status: 406 }) })
        client.close()
        return getInfoStatus
    } else {
        return NextResponse.json({ message: 'Something Wrong' }, { status: 406 })
    }
}