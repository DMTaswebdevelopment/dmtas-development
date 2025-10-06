import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { adminAuth, adminDb } from "@/app/lib/firebase-admin";

export async function POST(request: NextRequest) {
  try {
    const { login_id, password } = await request.json();

    if (!login_id || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Login ID and password are required",
        },
        { status: 400 }
      );
    }
    const usersRef = adminDb.collection("users");
    const snapshot = await usersRef.where("login_id", "==", login_id).get();

    if (snapshot.empty) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid login credentials",
          field: "login_id",
        },
        { status: 401 }
      );
    }

    const userDoc = snapshot.docs[0];
    const userData = userDoc.data();

    // Step 2: Check if user is active
    if (userData.status !== "active") {
      return NextResponse.json(
        {
          success: false,
          message: "Account is disabled. Please contact administrator.",
          field: "login_id",
        },
        { status: 403 }
      );
    }

    // Step 3: Verify password
    const isPasswordValid = await bcrypt.compare(password, userData.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid login credentials",
          field: "password",
        },
        { status: 401 }
      );
    }

    // Step 4: Create custom token with Firebase Admin
    const customToken = await adminAuth.createCustomToken(
      userData.firebase_uid,
      {
        login_id: userData.login_id,
        email: userData.email,
        user_id: userData.uid,
      }
    );

    // Step 5: Update last login
    await adminDb
      .collection("users")
      .doc(userDoc.id)
      .update({
        last_login: new Date(),
        login_count: (userData.login_count || 0) + 1,
      });

    return NextResponse.json({
      statusCode: 200,
      success: true,
      message: "Login successful",
      customToken,
      user: {
        login_id: userData.login_id,
        email: userData.email,
        user_id: userData.uid,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, message: "Login failed" },
      { status: 500 }
    );
  }
}
