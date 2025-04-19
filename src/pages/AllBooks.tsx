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
import { GiFunnel } from "react-icons/gi";
import ProductCard from "@/components/home/ProductCard";
import Spinner from "@/components/Spinner";
import { useGetAllProductQuery } from "@/redux/features/products/productSlice";
import { X } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const AllProduct = () => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  const initialCategory = searchParams.get("category") || "";
  const [search, setSearch] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [inStock, setInStock] = useState("");
  const [priceSort, setPriceSort] = useState("");
  useEffect(() => {
    if (searchTerm) {
      setSearch(searchTerm);
    }
    if (initialCategory) {
      setCategory(initialCategory);
    }
  }, [searchTerm, initialCategory]);
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

  const authors = [...new Set(productData?.data?.map((p) => p.author))];
  const categories = [...new Set(productData?.data?.map((a) => a.category))];

  const filteredProducts = productData?.data?.filter((item) => {
    if (inStock === "true") return item.inStock === true;
    if (inStock === "false") return item.inStock === false;
    return true;
  });
  // pagination

  const [currentPage, setCurrentPage] = useState(1);
  const ProductsPerPage = 8;
  const totalProducts = filteredProducts?.length ?? 0;
  const totalPages = Math.ceil(totalProducts / ProductsPerPage);

  // Paginate the filtered results
  const paginatedProducts = filteredProducts?.slice(
    (currentPage - 1) * ProductsPerPage,
    currentPage * ProductsPerPage
  );

  return (
    <div className=" ">
      <div className="w-full flex justify-center items-center bg-gradient-to-r from-[#ecefec] via-[#f5f3ef] to-[#f6f4f0] h-56 md:h-[320px] ">
        <div className=" md:pt-28 pt-16">
          <h2 className=" text-xl sm:text-2xl text-[#00a76b] md:text-3xl xl:text-5xl font-semibold leading-snug text-balance text-center">
            Find the <span className=" text-[#00a76b]">Perfect </span>
            Book
          </h2>
          <h2 className=" text-center text-lg font-medium mt-3">
            {" "}
            All The Collections
          </h2>
        </div>
      </div>
      <div className=" pb-10">
        <div className="xl:hidden mb-8 text-center text-black">
          <Sheet>
            <SheetTrigger asChild className=" flex justify-end">
              <Button variant="outline" className="border-[#00a76b]  text-[#00a76b] ">
                <GiFunnel />
                Filter Books
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[300px] sm:w-[400px] text-[#00a76b] py-8  px-6 overflow-y-scroll  "
            >
              <SheetTitle className="text-lg font-semibold mb-4"></SheetTitle>
              <div className=" flex justify-between items-center">
                <h2 className="text-xl font-semibold mb-4">Filters</h2>
                <button
                  onClick={() => {
                    setSearch("");
                    setAuthor("");
                    setInStock("All");
                    setCategory("");
                    setPriceSort("");
                  }}
                  className="text-base text-red-500 hover:underline"
                >
                  Clear All
                </button>
              </div>
              {/* <ScrollArea className="h-[450px]"> */}
         
              <div className="flex flex-col gap-6 w-full ">
              {/* Search by name */}
              <label
                className=" font-medium text-[15px] text-[#00a76b]"
                htmlFor=""
              >
                Search by Book Name
              </label>
              <Input
                placeholder="Search by product name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border-[#00a76b] text-[#00a76b]"
              />
              <label
                className=" font-medium text-[15px] text-[#00a76b]"
                htmlFor=""
              >
                Select Author
              </label>
              <div className="relative w-full ">
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
              <label
                className=" font-medium text-[15px] text-[#00a76b]"
                htmlFor=""
              >
                Select Category
              </label>
              <div className="relative w-full">
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
              <label
                className=" font-medium text-[15px] text-[#00a76b]"
                htmlFor=""
              >
                Sort by Price
              </label>
              <div className="relative w-full">
                <Select onValueChange={setPriceSort} value={priceSort}>
                  <SelectTrigger className="border-[#00a76b] text-[#00a76b]">
                    <SelectValue placeholder="Sort by Price" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price_asc">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price_desc">
                      Price: High to Low
                    </SelectItem>
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
              <label
                className=" font-medium text-[15px] text-[#00a76b]"
                htmlFor=""
              >
                Sort
              </label>
              <div className="relative w-full">
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
              {/* </ScrollArea> */}
            </SheetContent>
          </Sheet>
        </div>

        {/* Loading State */}
        {isFetching && (
          <div className=" flex justify-center items-center">
            <Spinner></Spinner>
          </div>
        )}
        {/* Desktop layout */}
        <div className="flex flex-col lg:flex-row gap-8 text-white">
          {/* Sidebar Filter for Large Devices */}
          <div className="hidden xl:block text-black w-full max-w-xs py-8 pb-12 bg-gradient-to-r from-[#ecefec] via-[#f5f3ef] to-[#f6f4f0] border-r-2 border-[#00a76b] px-6  rounded-b-xl shadow-md h-fit">
            <div className=" flex justify-between items-center">
              <h2 className="text-xl font-semibold mb-4">Filters</h2>
              <button
                onClick={() => {
                  setSearch("");
                  setAuthor("");
                  setInStock("All");
                  setCategory("");
                  setPriceSort("");
                }}
                className="text-base text-red-500 hover:underline"
              >
                Clear All
              </button>
            </div>

            <div className="flex flex-col gap-6 w-full ">
              {/* Search by name */}
              <label
                className=" font-medium text-[15px] text-[#00a76b]"
                htmlFor=""
              >
                Search by Book Name
              </label>
              <Input
                placeholder="Search by product name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border-[#00a76b] text-[#00a76b]"
              />
              <label
                className=" font-medium text-[15px] text-[#00a76b]"
                htmlFor=""
              >
                Select Author
              </label>
              <div className="relative w-full ">
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
              <label
                className=" font-medium text-[15px] text-[#00a76b]"
                htmlFor=""
              >
                Select Category
              </label>
              <div className="relative w-full">
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
              <label
                className=" font-medium text-[15px] text-[#00a76b]"
                htmlFor=""
              >
                Sort by Price
              </label>
              <div className="relative w-full">
                <Select onValueChange={setPriceSort} value={priceSort}>
                  <SelectTrigger className="border-[#00a76b] text-[#00a76b]">
                    <SelectValue placeholder="Sort by Price" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price_asc">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price_desc">
                      Price: High to Low
                    </SelectItem>
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
              <label
                className=" font-medium text-[15px] text-[#00a76b]"
                htmlFor=""
              >
                Sort
              </label>
              <div className="relative w-full">
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
          </div>

          {/* Book Cards */}
          <div className="flex-1">
            <div className="flex flex-wrap gap-16 justify-center my-10">
              {paginatedProducts?.length
                ? paginatedProducts.map((product, i) => (
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
        <div className="flex justify-center items-center mt-6 gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-[#00a76b] text-white"
                  : "bg-gray-800 text-white"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllProduct;
