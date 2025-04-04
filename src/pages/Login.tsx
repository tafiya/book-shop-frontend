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
import { useLoginMutation } from "@/redux/features/auth/auth";
import { setUser, TUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hook";
import { verifyToken } from "@/utils/VerifyToken";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GrUser, GrUserAdmin } from "react-icons/gr";
import * as z from "zod";
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.pathname || "/";

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [login] = useLoginMutation();
  const demoLogin = async (role: "User" | "Admin") => {
    console.log(role);
    const demoCredentials = {
      User: { email: "tafiapinkey@gmail.com", password: "Tafiya1234" },
      Admin: { email: "pinkey@gmail.com", password: "Abcd1234" },
    };

    const userInfo = demoCredentials[role];
    console.log(userInfo);

    try {
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.token) as TUser;
      dispatch(setUser({ user: user, token: res.data.token }));
      toast.success("Successfully logged in!");
      setTimeout(() => navigate(from), 1000);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error("Something went wrong");
    }
  };
  const onsubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const userInfo = {
        email: data.email,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();

      const user = verifyToken(res.data.token) as TUser;

      dispatch(setUser({ user: user, token: res.data.token }));
      toast.success("Successfully logged in!");
      setTimeout(() => navigate(from), 1000);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-[#ecefec] via-[#f5f3ef] to-[#f6f4f0]">
      {/* login div */}
      <div className="  border-[#00a76b] border rounded-lg  lg:w-[400px] w-[350px] px-12 pb-12 pt-8 shadow-xl">
        <div className=" flex flex-col items-center justify-center gap-2">
          <img src="ReadScape-logo.png" className="w-14 h-14" alt="" />
          <p className="text-4xl text-[#00a76b] font-semibold border-b pb-2">
            Sign in
          </p>
        </div>
        {/* Demo login buttons */}
        <div className="mt-4 flex flex-col gap-4 justify-center items-center ">
          <Button
            variant="outline"
            className="bg-[#00a76b] text-white py-5 w-full hover:text-[#00a76b] hover:border-[#00a76b] flex items-center gap-2 "
            onClick={() => demoLogin("User")}
          >
            {" "}
            <GrUser size={"2rem"} />
            User's Demo Login
          </Button>
          <Button
            variant="outline"
            className="bg-[#00a76b] text-white w-full py-5 hover:text-[#00a76b] hover:border-[#00a76b] flex items-center gap-2 "
            onClick={() => demoLogin("Admin")}
          >
            <GrUserAdmin size={"2rem"} />
            Admin's Demo Login
          </Button>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onsubmit)}
            className=" pt-6 space-y-7"
          >
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
            >
              Login
            </Button>
          </form>
        </Form>
        <p className=" text-sm pt-4">
          Don't have account?{" "}
          <Link
            to="/register"
            className=" text-base font-semibold text-[#00a76b] hover:underline "
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
