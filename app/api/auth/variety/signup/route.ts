// app/api/auth/signup/route.ts

import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { adminAuth, adminDb } from "@/app/lib/firebase-admin";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
  try {
    const { login_id, password } = await request.json();

    // Validation
    if (!login_id || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Login ID and password are required",
        },
        { status: 400 }
      );
    }

    if (login_id.length < 3) {
      return NextResponse.json(
        {
          success: false,
          message: "Login ID must be at least 3 characters",
          field: "login_id",
        },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        {
          success: false,
          message: "Password must be at least 6 characters",
          field: "password",
        },
        { status: 400 }
      );
    }

    const normalizedLoginId = login_id;

    // Check if login_id already exists
    const usersRef = adminDb.collection("users");
    const existingUserQuery = await usersRef
      .where("login_id", "==", normalizedLoginId)
      .get();

    if (!existingUserQuery.empty) {
      return NextResponse.json(
        {
          success: false,
          message: "This Login ID is already taken",
          field: "login_id",
        },
        { status: 409 }
      );
    }

    // Create Firebase user with email format
    const email = `${normalizedLoginId}@dmtas.variety.com.au`;
    let firebaseUser;

    try {
      firebaseUser = await adminAuth.createUser({
        email: email,
        password: password,
      });
    } catch (firebaseError: any) {
      if (firebaseError.code === "auth/email-already-exists") {
        return NextResponse.json(
          {
            success: false,
            message: "This Login ID is already registered",
            field: "login_id",
          },
          { status: 409 }
        );
      }
      throw firebaseError;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Generate unique user ID
    const userId = uuidv4();

    // Create user document to match your login structure
    const userData = {
      uid: userId,
      firebase_uid: firebaseUser.uid,
      login_id: normalizedLoginId,
      email: email,
      password: hashedPassword,
      status: "active",
      created_at: new Date(),
      last_login: null,
      login_count: 0,
      is_active: true,
    };

    // Store user data in Firestore
    await adminDb.collection("users").doc(firebaseUser.uid).set(userData);

    return NextResponse.json({
      success: true,
      message: "Account created successfully",
      user: {
        login_id: userData.login_id,
        email: userData.email,
        user_id: userData.uid,
      },
    });
  } catch (error: any) {
    console.error("Signup error:", error);

    // Clean up Firebase user if it was created but Firestore failed
    // You might want to implement this cleanup logic

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create account. Please try again.",
      },
      { status: 500 }
    );
  }
}
