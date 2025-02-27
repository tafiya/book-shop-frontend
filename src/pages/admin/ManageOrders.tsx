import Spinner from "@/components/Spinner";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetOrdersQuery } from "@/redux/features/order/order";
interface Order {
  _id: string;
  user: {
    name: string;
  };
  transaction: {
    id: string;
  };
  products: {
    product: {
      title: string;
    };
  }[];
  totalPrice: number;
  status: string;
}

const ManageOrders = () => {
  const { data, isFetching } = useGetOrdersQuery(undefined, {
    pollingInterval: 30000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  const orders = data?.data || [];

  return (
    <div>
      {isFetching && (
        <div className=" flex justify-center items-center">
          <Spinner></Spinner>
        </div>
      )}
      <Card className="p-6">
        <Table>
          <TableHeader className=" text-base lg:text-xl">
            <TableRow>
              <TableHead className="text-[#00a76b]">Product Title</TableHead>
              <TableHead className="text-[#00a76b]">User Name</TableHead>
              <TableHead className="text-[#00a76b]">Transaction ID</TableHead>
              <TableHead className="text-[#00a76b]">Total Price (৳)</TableHead>
              <TableHead className="text-[#00a76b]">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order: Order) => (
              <TableRow key={order._id}>
                <TableCell className=" lg:text-base">
                  {order.products && order.products.length > 0
                    ? order.products
                        .map((item) => item.product?.title || "N/A")
                        .join(", ")
                    : "N/A"}
                </TableCell>
                <TableCell className=" lg:text-base">
                  {order.user?.name || "N/A"}
                </TableCell>
                <TableCell className=" lg:text-base">
                  {order.transaction?.id || "N/A"}
                </TableCell>
                <TableCell className=" lg:text-base">
                  {order.totalPrice ?? "N/A"}
                </TableCell>
                <TableCell className=" lg:text-base">
                  {order.status || "N/A"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default ManageOrders;
