import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useDeleteProductMutation,
  useGetAllProductQuery,
  useUpdateProductMutation,
} from "@/redux/features/products/productSlice";
import { IProduct } from "@/types/product";
import React, { useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import AddBookModal from "./AddBookModal";
interface Product {
  _id: string;
  title: string;
  author: string;
  price: number;
  imgURL: string;
  category: string;
  description: string;
  quantity: number;
  inStock: boolean;
  isDeleted: boolean;
}

const ManageProducts: React.FC = () => {
  // const dispatch = useDispatch();
  const { data, isFetching } = useGetAllProductQuery(undefined, {
    pollingInterval: 30000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  const [deleteProduct] = useDeleteProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  let products = data?.data || [];

  const handleRemove = async (title: string) => {
    await deleteProduct(title);
  };

  const handleUpdate = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };
  const handleCheckboxChange = (checked: boolean) => {
    if (selectedProduct) {
      setSelectedProduct({ ...selectedProduct, inStock: checked });
    }
  };

  const handleSave = async () => {
    if (selectedProduct) {
      try {
        await updateProduct({
          _id: selectedProduct._id,
          updatedProduct: selectedProduct,
        }).unwrap();
        setIsModalOpen(false);
      } catch (error) {
        console.error("Update failed:", error);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedProduct) {
      setSelectedProduct({
        ...selectedProduct,
        [e.target.name]: e.target.value,
      });
    }
  };

  const toggleSort = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  if (sortOrder === "asc") {
    products = [...products].sort((a, b) => a.price - b.price);
  } else {
    products = [...products].sort((a, b) => b.price - a.price);
  }

  return (
    <>
      {isFetching && (
        <div className=" flex justify-center items-center">
          <Spinner></Spinner>
        </div>
      )}
      <Card className="p-6  mx-auto">
        <div className="flex justify-between mb-4">
          <Button className="mb-4" onClick={toggleSort}>
            Sort by Price ({sortOrder})
          </Button>
          <Button onClick={() => setIsAddModalOpen(true)}>Add Book</Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>inStock</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product: IProduct) => (
              <TableRow key={product._id}>
                <TableCell>{product.title}</TableCell>
                <TableCell>{product.author}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>
                  {product.inStock ? (
                    <FaCircleCheck color="green" />
                  ) : (
                    <FaWindowClose color="red" />
                  )}
                </TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell className="flex gap-2">
                  <Button
                    variant="destructive"
                    onClick={() => handleRemove(product._id)}
                  >
                    Remove
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => handleUpdate(product)}
                  >
                    Update
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {isModalOpen && selectedProduct && (
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Update Book</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Label>Title</Label>
                <Input
                  name="title"
                  value={selectedProduct.title}
                  onChange={handleInputChange}
                />
                <Label>Author</Label>
                <Input
                  name="author"
                  value={selectedProduct.author}
                  onChange={handleInputChange}
                />

                <Label>Price</Label>
                <Input
                  name="price"
                  type="number"
                  value={selectedProduct.price}
                  onChange={handleInputChange}
                />
                <Label>
                  <Checkbox
                    name="inStock"
                    checked={selectedProduct.inStock}
                    onCheckedChange={(checked: boolean) =>
                      handleCheckboxChange(checked)
                    }
                  />{" "}
                  In Stock
                </Label>
                <Label>Quantity</Label>
                <Input
                  name="quantity"
                  type="number"
                  value={selectedProduct.quantity}
                  onChange={handleInputChange}
                />
                <Label>Description</Label>
                <Input
                  name="description"
                  value={selectedProduct.description}
                  onChange={handleInputChange}
                />
                <Button onClick={handleSave}>Save Changes</Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
        <AddBookModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
        />
      </Card>
    </>
  );
};

export default ManageProducts;
