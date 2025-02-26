import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetAllUsersQuery } from "@/redux/features/user/userSlice";
import { useAppSelector } from "@/redux/hook";
import { TUser } from "@/types/product";

const MyProfile = () => {
  const user = useAppSelector(selectCurrentUser);
  const { data } = useGetAllUsersQuery(undefined, {
    pollingInterval: 30000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  const users = data?.data || [];
  const userInfo = users.find(
    (customer: TUser) => customer.email == user?.email
  );
  console.log(data);
  console.log(user);
  return (
    <div className=" flex justify-center">
      <div className="max-w-[350px] space-y-8 rounded-2xl bg-white px-6 py-8 shadow-md dark:bg-[#18181B] md:max-w-[650px]">
        {/* profile image & bg  */}
        <div className="relative ">
          <img
            width={350}
            height={150}
            className="h-[150px] w-[350px] rounded-2xl bg-gray-500"
            src="https://res.cloudinary.com/demnpqwx3/image/upload/v1740586385/allBook_kswupr.jpg"
            alt="card navigate ui"
          />
          <img
            width={100}
            height={100}
            className="absolute -bottom-12 left-1/2 h-[100px] w-[100px] -translate-x-1/2 rounded-full border-4 border-white bg-gray-400 dark:border-[#18181B]"
            src={userInfo?.userImg}
            alt="card navigate ui"
          />
        </div>
        {/* profile name & role */}
        <div className="space-y-1 pt-8 text-center">
          <h1 className="text-xl md:text-2xl">{userInfo?.name}</h1>
          <p className="text-sm text-gray-400">{userInfo?.email}</p>
        </div>
        {/* post , followers following  */}
        <div className="flex flex-wrap items-center justify-between px-4">
          <div className="text-center">
            <h5 className="text-xl font-medium">17</h5>
            <p className="text-sm text-gray-400">Orders</p>
          </div>
          <div className="text-center">
            <h5 className="text-xl font-medium">9.7k</h5>
            <p className="text-sm text-gray-400">Followers</p>
          </div>
          <div className="text-center">
            <h5 className="text-xl font-medium">217</h5>
            <p className="text-sm text-gray-400">Following</p>
          </div>
        </div>
        <div className="flex justify-center">
          <button className="w-[80%] rounded-full py-2 font-medium text-gray-400 shadow-[0px_0px_10px_#E2DADA] duration-500  hover:scale-95 hover:bg-[#00a76b] hover:text-white hover:shadow-xl dark:shadow-[0px_2px_8px_0px_rgba(0,0,0,0.8)]">
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
