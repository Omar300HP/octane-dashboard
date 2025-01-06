import { queryDefinitions } from "@/services/api/config";
import { baseApi } from "../base";
import {
  CreateUserRes,
  GetUsersListReqParams,
  GetUsersListRes,
  CreateUserReq,
  GetUserRes,
  GetUserReqParams,
  DeleteUserReqParams,
  DeleteUserRes,
  UpdateUserRes,
  UpdateUserReqBody,
  UpdateUserReqParams,
} from "../request_response";

export const userExtendedApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserList: builder.query<GetUsersListRes, GetUsersListReqParams>({
      query: (params: GetUsersListReqParams) =>
        queryDefinitions.getUsersList(params),
      providesTags: (_, error) => (error ? [] : [{ type: "users" }]),
    }),

    createUser: builder.mutation<CreateUserRes, { reqBody: CreateUserReq }>({
      query: ({ reqBody }: { reqBody: CreateUserReq }) =>
        queryDefinitions.createUser(reqBody),

      invalidatesTags: (_, error) => (error ? [] : ["users"]),
    }),

    getUserById: builder.query<GetUserRes, GetUserReqParams>({
      query: (params: GetUserReqParams) => queryDefinitions.getUserById(params),
      providesTags: (_, error, { userId }) =>
        error ? [] : [{ type: "user", id: userId }],
    }),

    deleteUser: builder.mutation<DeleteUserRes, DeleteUserReqParams>({
      query: (params: DeleteUserReqParams) =>
        queryDefinitions.deleteUser(params),

      invalidatesTags: (_, error, { id }) =>
        error ? [] : [{ type: "users" }, { type: "user", id }],
    }),

    updateUser: builder.mutation<
      UpdateUserRes,
      { reqBody: UpdateUserReqBody; params: UpdateUserReqParams }
    >({
      query: ({ reqBody }: { reqBody: UpdateUserReqBody }) =>
        queryDefinitions.updateUser(reqBody),

      invalidatesTags: (user, error) =>
        error ? [] : [{ type: "users" }, { type: "user", id: user?.id }],
    }),
  }),

  overrideExisting: false,
});

export const {
  useGetUserListQuery,
  useCreateUserMutation,
  useGetUserByIdQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = userExtendedApi;
