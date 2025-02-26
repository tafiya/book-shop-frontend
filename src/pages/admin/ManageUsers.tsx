import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from "@/redux/features/user/userSlice";
import { TUser } from "@/types/product";
import toast from "react-hot-toast";

const ManageUsers = () => {
  const { data, refetch } = useGetAllUsersQuery(undefined, {
    pollingInterval: 30000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  const users = data?.data || [];
  // const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const handleRemove = async (id: string) => {
    try {
      await deleteUser(id);
      // Optimistically update UI without refreshing
      refetch();
      toast.success("Remove User......");
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  // const handleUpdate = async (id: string) => {
  //   await updateUser(id);
  // };
  console.log(users);
  return (
    <Card className="p-6  mx-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Picture</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Phone No</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user: TUser) => (
            <TableRow key={user._id}>
              <TableCell>
                {" "}
                <img
                  className="w-24 h-24 object-cover rounded-md"
                  src={user?.userImg}
                  alt={user.name}
                />
              </TableCell>
              <TableCell>{user?.name}</TableCell>
              <TableCell>{user?.role}</TableCell>
              <TableCell>{user?.email}</TableCell>
              <TableCell>{user?.address}</TableCell>
              <TableCell>{user?.phone}</TableCell>

              <TableCell className="">
                {/* {user.isBlocked ? (
                  <Ban color="red" />
                ) : (
                  <Button
                    variant="secondary"
                    onClick={() => handleUpdate(user._id)}
                  >
                    <CircleCheckBig color="green" />
                  </Button>
                )} */}
                <Button
                  variant="destructive"
                  onClick={() => handleRemove(user._id)}
                >
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default ManageUsers;
