// src/app/api/properties/approve/[id]/route.ts
import connectDB from "@/lib/db";
import Property from "@/models/property.model";
import { NextRequest } from "next/server";

type Context = {
  params: {
    id: string;
  };
};

export async function PATCH(req: NextRequest, context: Context) {
  try {
    await connectDB();
    const { id } = context.params;

    const updatedProperty = await Property.findByIdAndUpdate(
      id,
      { verified: true },
      { new: true }
    );

    if (!updatedProperty) {
      return new Response(JSON.stringify({ message: "Property not found" }), {
        status: 404,
      });
    }

    return new Response(
      JSON.stringify({
        message: "Property approved",
        property: updatedProperty,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error approving property", error }),
      {
        status: 500,
      }
    );
  }
}
