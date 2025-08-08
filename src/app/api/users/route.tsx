import { NextResponse } from 'next/server';
import User from '@/models/User';
import dbConnect from '@/lib/dbConnect';

export async function PUT(req: Request) {
    try {
        const body = await req.json();
        const { userId, name, email, avatar, currentPassword, newPassword } = body;

        if (!userId) {
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
        }
        await dbConnect();

        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Update user info
        if (name) user.name = name;
        if (email) user.email = email;
        if (avatar) user.avatar = avatar;

        if (currentPassword && newPassword) {
            const isPasswordValid = await user.comparePassword(currentPassword); // Assuming comparePassword is a method in your User model
            if (!isPasswordValid) {
                return NextResponse.json({ error: 'Invalid current password' }, { status: 400 });
            }
            user.password = newPassword; // Assuming password hashing is handled in a pre-save hook
        }

        // Save the updated user to the database
        await user.save();

        return NextResponse.json({ message: 'User updated successfully', user });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
    }
}