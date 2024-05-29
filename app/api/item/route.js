import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";


export async function GET() {
    const client = await MongoClient.connect(process.env.NEXT_PUBLIC_URL_DATA_BASE)
    const db = client.db()
    const booksInfo = await db.collection('DB-BOOKS').find().toArray(function (err, db) {
        if (err) { return err }
        return db
    })
    return NextResponse.json(booksInfo)
}