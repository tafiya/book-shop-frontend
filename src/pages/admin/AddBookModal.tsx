import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateProductMutation } from "@/redux/features/products/productSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface AddBookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// ✅ Define validation schema using Zod
const bookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  price: z.number().min(1, "Price must be greater than 0"),
  category: z.enum([
    "Fiction",
    "Science",
    "SelfDevelopment",
    "Poetry",
    "Religious",
  ]),
  description: z.string().min(1, "Description is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  inStock: z.boolean(),
  imgURL: z.string().url("Invalid image URL"), // Image URL validation
});

const AddBookModal: React.FC<AddBookModalProps> = ({ isOpen, onClose }) => {
  const [createProduct] = useCreateProductMutation();
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof bookSchema>>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: "",
      author: "",
      price: 0,
      category: "Fiction",
      description: "",
      quantity: 1,
      inStock: true,
      imgURL: "",
    },
  });

  const inStock = watch("inStock");

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
        setValue("imgURL", imageUrl);
      }
    }
  };

  const onSubmit = async (data: z.infer<typeof bookSchema>) => {
    try {
      await createProduct(data).unwrap();
      toast.success("Book is created ✅");
      reset();
      onClose();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Error adding book");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Book</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Label>Title</Label>
          <Input {...register("title")} />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}

          <Label>Author</Label>
          <Input {...register("author")} />
          {errors.author && (
            <p className="text-red-500">{errors.author.message}</p>
          )}

          <Label>Price</Label>
          <Input
            type="number"
            {...register("price", { valueAsNumber: true })}
          />
          {errors.price && (
            <p className="text-red-500">{errors.price.message}</p>
          )}

          <Label>Category</Label>
          <select
            {...register("category")}
            className="w-full border p-2 rounded"
          >
            <option value="Fiction">Fiction</option>
            <option value="Science">Science</option>
            <option value="SelfDevelopment">Self Development</option>
            <option value="Poetry">Poetry</option>
            <option value="Religious">Religious</option>
          </select>
          {errors.category && (
            <p className="text-red-500">{errors.category.message}</p>
          )}

          <Label>Description</Label>
          <Input {...register("description")} />
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}

          <Label>Quantity</Label>
          <Input
            type="number"
            {...register("quantity", { valueAsNumber: true })}
          />
          {errors.quantity && (
            <p className="text-red-500">{errors.quantity.message}</p>
          )}

          <Label className="flex items-center gap-2">
            <Checkbox
              checked={inStock}
              onCheckedChange={(checked) =>
                setValue("inStock", checked as boolean)
              }
            />
            In Stock
          </Label>

          <Label>Image Upload</Label>
          <Input type="file" accept="image/*" onChange={handleFileChange} />
          {uploading && <p className="text-blue-500">Uploading image...</p>}
          {errors.imgURL && (
            <p className="text-red-500">{errors.imgURL.message}</p>
          )}

          <Button type="submit" disabled={uploading}>
            Add Book
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddBookModal;
