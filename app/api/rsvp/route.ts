// // import { supabase } from "../../lib/supabase";
// import { supabase } from "@/lib/supabase";
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   const body = await req.json();

//   const { name, phone, attending, guests } = body;

//   const { error } = await supabase.from("rsvp").insert([
//     {
//       name,
//       phone,
//       attending,
//       guests,
//     },
//   ]);

//   if (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }

//   return NextResponse.json({ success: true });
// }


import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Incoming data:", body);

    const { name, phone, attending, guests } = body;

    const { error } = await supabase.from("rsvp").insert([
      { name, phone, attending, guests },
    ]);

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json({ error: "Server crashed" }, { status: 500 });
  }
}