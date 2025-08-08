"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CldUploadWidget } from "next-cloudinary";
import api from "@/lib/axiosInstance";
import { useSession } from "next-auth/react";

const AccountPage = () => {
  const { data } = useSession();

  const user = data?.user;
  console.log(user);
  const router = useRouter();
  const [name, setName] = useState(user?.name);
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    console.log(user?.id)

    try {
      const response = await api.put("/users/", {
        userId: user?.id,
        name,
        avatar,
      });

      const data = response.data;
      console.log("Profile updated:", data);
      // Optionally show success message or refresh data
    } catch (err: any) {
      setError(err.message || "Failed to update profile");
      console.error("Profile update error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      setError("New passwords do not match");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await api.put("/users/", {
        userId: "current-user-id", // You'll need to get this from your auth context
        currentPassword: oldPassword,
        newPassword,
      });
      const data = response.data;
      console.log("Password updated:", data);
      // Clear form fields on success
      setOldPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      // Optionally show success message
    } catch (err: any) {
      setError(err.message || "Failed to update password");
      console.error("Password update error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    router.push("/auth");
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Please log in to manage your account</h1>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Manage Account</h1>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      <form onSubmit={handleProfileUpdate} className="mb-6">
        <div className="mb-4">
          <label className="block font-medium mb-2">Name</label>
          <input
            type="text"
            value={name as string}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter your name"
            disabled={isLoading}
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-2">Avatar</label>
          <CldUploadWidget
            uploadPreset="default" // Replace with your Cloudinary upload preset
            onSuccess={(result: any) => {
              setAvatar(result.info.secure_url);
            }}
            options={{
              sources: ["local"],
              multiple: false,
              maxFiles: 1,
            }}
          >
            {({ open }: { open: any }) => {
              return (
                <button
                  type="button"
                  onClick={() => open()}
                  className="px-4 py-2 bg-gray-200 rounded mb-2"
                  disabled={isLoading}
                >
                  Upload Avatar
                </button>
              );
            }}
          </CldUploadWidget>
          {avatar && (
            <div className="mt-4">
              <Image
                src={avatar}
                alt="Avatar"
                width={100}
                height={100}
                className="rounded-full"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
          disabled={isLoading}
        >
          {isLoading ? "Updating..." : "Update Profile"}
        </button>
      </form>

      <form onSubmit={handlePasswordUpdate}>
        <h2 className="text-xl font-bold mb-4">Update Password</h2>

        <div className="mb-4">
          <label className="block font-medium mb-2">Old Password</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter old password"
            disabled={isLoading}
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-2">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter new password"
            disabled={isLoading}
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-2">Confirm New Password</label>
          <input
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Confirm new password"
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded disabled:bg-green-300"
          disabled={isLoading}
        >
          {isLoading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
};

export default AccountPage;
