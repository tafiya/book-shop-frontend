/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegisterMutation } from "@/redux/features/auth/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import * as z from "zod";
const registerSchema = z.object({
  name: z.string(),
  address: z.string(),
  phone: z.string(),
  userImg: z.string().url("Invalid image URL"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
const Register = () => {
  const navigate = useNavigate();
  const [register] = useRegisterMutation();
  const [uploading, setUploading] = useState(false);
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      address: "",
      email: "",
      password: "",
      userImg: "",
      phone: "",
    },
  });
  // ✅ Handle image upload to Cloudinary
  const uploadImage = async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "my_preset"); // 🔹 Replace with your Cloudinary preset

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/demnpqwx3/image/upload",
        formData
      );
      setUploading(false);
      return response.data.secure_url; // ✅ Get the uploaded image URL
    } catch (error) {
      console.error("Image upload failed", error);
      setUploading(false);
      return null;
    }
  };

  //  Handle file input change
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const imageUrl = await uploadImage(e.target.files[0]);
      if (imageUrl) {
        form.setValue("userImg", imageUrl);
      }
    }
  };
  const onsubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      await register(data).unwrap();
      toast.success("Registration successful! Redirecting to login...");
      form.reset();
      setTimeout(() => navigate("/login"), 1000);
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    }
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-[#ecefec] via-[#f5f3ef] to-[#f6f4f0]">
      {/* login div */}
      <div className="  border-[#00a76b] border rounded-lg md:w-[530px] w-[350px] p-12 shadow-xl">
        <p className="text-4xl text-[#00a76b] font-semibold border-b pb-6">
          Register
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onsubmit)}
            className=" pt-8 space-y-3"
          >
            <div className=" flex flex-wrap justify-between ">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=" text-lg">Name</FormLabel>
                    <FormControl>
                      <Input
                        className="p-5 border-[#00a76b]"
                        placeholder="name"
                        required
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=" text-lg">Email</FormLabel>
                    <FormControl>
                      <Input
                        className="p-5 border-[#00a76b]"
                        placeholder="email"
                        required
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className=" flex flex-wrap justify-between mb-2 ">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=" text-lg">Address</FormLabel>
                    <FormControl>
                      <Input
                        className="p-5 border-[#00a76b]"
                        placeholder="Address"
                        required
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=" text-lg">Phone</FormLabel>
                    <FormControl>
                      <Input
                        className="p-5 border-[#00a76b]"
                        placeholder="01XXXXXXXXX"
                        required
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className=" mt-2">
              <Label className=" text-lg ">User Image</Label>
              <Input
                className=" border-[#00a76b]"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
              {uploading && <p className="text-blue-500">Uploading image...</p>}
            </div>

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" text-lg">Password</FormLabel>
                  <FormControl>
                    <Input
                      className="p-5 border-[#00a76b]"
                      type="password"
                      placeholder="password"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="bg-[#00a76b] hover:bg-[#00a76b]/40 hover:text-[#00a76b] text-lg hover:border-[#00a76b] "
              type="submit"
              disabled={uploading}
            >
              Register
            </Button>
          </form>
        </Form>
        <p className=" text-sm pt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className=" text-base font-semibold text-[#00a76b] hover:underline "
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
