// // import { supabase } from "../../lib/supabase";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, attending, guests } = body;

    const { data, error } = await supabase
      .from("rsvp")
      .insert([{ name, phone, attending, guests }])
      .select(); // 👈 IMPORTANT

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          { success: false, error: "Phone already exists" },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
    });

  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Server crashed" },
      { status: 500 }
    );
  }
}