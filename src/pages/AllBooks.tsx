// AllBooks.tsx
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import ProductCard from "@/components/home/ProductCard";
import Spinner from "@/components/Spinner";
import { useGetAllProductQuery } from "@/redux/features/products/productSlice";
import { X } from "lucide-react";
import { useSearchParams } from "react-router-dom";

const AllProduct = () => {
  const [search, setSearch] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [inStock, setInStock] = useState("");
  const [priceSort, setPriceSort] = useState("");
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "";
  const queryParams = [
    { name: "page", value: 1 },
    { name: "limit", value: "100" },
    { name: "sort", value: priceSort || "_id" },
    ...(search ? [{ name: "searchTerm", value: search }] : []),
    ...(author ? [{ name: "author", value: author }] : []),
    ...(category ? [{ name: "category", value: category }] : []),
  ];

  const { data: productData, isFetching } = useGetAllProductQuery(queryParams, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (initialCategory) {
      setCategory(initialCategory);
    }
  }, [initialCategory]);

  const authors = [...new Set(productData?.data?.map((p) => p.author))];
  const categories = [...new Set(productData?.data?.map((a) => a.category))];

  const filteredProducts = productData?.data?.filter((item) => {
    if (inStock === "true") return item.inStock === true;
    if (inStock === "false") return item.inStock === false;
    return true;
  });

  return (
    <div className=" ">
      <div className="w-full flex justify-center items-center bg-gradient-to-r from-[#ecefec] via-[#f5f3ef] to-[#f6f4f0] h-64 md:h-[370px] ">
        <div className=" md:pt-40 pt-16">
          <h2 className=" text-xl sm:text-2xl md:text-3xl xl:text-4xl font-semibold leading-snug text-balance text-center">
            Find the <span className=" text-[#00a76b]">Perfect </span>
            <br />
            Book for <br /> Every <span className=" text-[#00a76b]">
              Mood
            </span>{" "}
            & Moment <span className=" text-[#00a76b]">!</span>
          </h2>
          <h2 className=" text-center text-lg font-medium mt-3">
            {" "}
            All The Collections
          </h2>
        </div>
      </div>
      <div className=" pt-10">
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <Input
            placeholder="Search by product name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-72 border-[#00a76b] text-[#00a76b]"
          />

          <div className="relative w-56 ">
            <Select onValueChange={setAuthor} value={author}>
              <SelectTrigger className="border-[#00a76b] text-[#00a76b]">
                <SelectValue placeholder="Filter by Brand" />
              </SelectTrigger>
              <SelectContent>
                {authors.map((b) => (
                  <SelectItem key={b} value={b}>
                    {b}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {author && (
              <X
                color="red"
                className="absolute top-2 right-2 cursor-pointer"
                onClick={() => setAuthor("")}
              />
            )}
          </div>

          <div className="relative w-56">
            <Select onValueChange={setCategory} value={category}>
              <SelectTrigger className="border-[#00a76b] text-[#00a76b]">
                <SelectValue placeholder="Filter by Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {category && (
              <X
                color="red"
                className="absolute top-2 right-2 cursor-pointer"
                onClick={() => setCategory("")}
              />
            )}
          </div>
          <div className="relative w-56">
            <Select onValueChange={setPriceSort} value={priceSort}>
              <SelectTrigger className="border-[#00a76b] text-[#00a76b]">
                <SelectValue placeholder="Sort by Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price_asc">Price: Low to High</SelectItem>
                <SelectItem value="price_desc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
            {priceSort && (
              <X
                color="red"
                className="absolute top-2 right-2 cursor-pointer"
                onClick={() => setPriceSort("")}
              />
            )}
          </div>

          <div className="relative w-56">
            <Select onValueChange={setInStock} value={inStock}>
              <SelectTrigger className="border-[#00a76b] text-[#00a76b]">
                <SelectValue placeholder="Stock Availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">In Stock</SelectItem>
                <SelectItem value="false">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
            {inStock && (
              <X
                color="red"
                className="absolute top-2 right-2 cursor-pointer"
                onClick={() => setInStock("")}
              />
            )}
          </div>
        </div>
        {/* Loading State */}
        {isFetching && (
          <div className=" flex justify-center items-center">
            <Spinner></Spinner>
          </div>
        )}

        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-16 justify-center my-10">
            {filteredProducts?.length
              ? filteredProducts.map((product, i) => (
                  <ProductCard key={i} product={product}></ProductCard>
                ))
              : !isFetching && (
                  <p className="text-center text-gray-500">
                    No products found.
                  </p>
                )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProduct;
