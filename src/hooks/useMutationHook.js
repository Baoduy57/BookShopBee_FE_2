import { useMutation } from "@tanstack/react-query";

export const useMutationHooks = (fnCallback) => {
  const mutation = useMutation({
    mutationFn: fnCallback,
  });
  return mutation;
};

// useMutationHooks: Đây là một custom hook được định nghĩa để tái sử dụng logic về mutation trong nhiều nơi trong ứng dụng mà không cần phải viết lại code.
// fnCallback: Đây là một tham số mà custom hook nhận vào. Tham số này là một hàm callback, sẽ được gọi khi thực hiện mutation (thường là một API request hoặc một hành động thay đổi dữ liệu).
// useMutation: Đây là hook từ @tanstack/react-query dùng để thực hiện các thao tác thay đổi dữ liệu (mutation). mutationFn trong useMutation chính là hàm thực hiện mutation (trong trường hợp này là fnCallback).
