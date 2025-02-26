import { baseApi } from "@/redux/api/baseApi";
import { TQueryParam, TResponseRedux } from "@/types/global";
import { IProduct } from "@/types/product";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (formData) => ({
        url: "/products",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Products"],
    }),
    getAllProduct: builder.query({
      providesTags: ["Products"],
      query: (args) => {
        const params = new URLSearchParams();
        if (args && Array.isArray(args)) {
          // Ensure args is an array
          args.forEach((item: TQueryParam) => {
            if (item && item.name && item.value) {
              params.append(item.name, item.value.toString());
            }
          });
        }
        //params.append("limit", "100"); // Ensure fetching all products
        return {
          url: `/products`,
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<IProduct[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    getProductById: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: ["Products"],
    }),
    updateProduct: builder.mutation({
      query: ({ _id, updatedProduct }) => ({
        url: `/products/${_id}`,
        method: "PUT",
        body: updatedProduct,
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProduct: builder.mutation({
      query: (_id) => ({
        url: `/products/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetAllProductQuery,
  useGetProductByIdQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
