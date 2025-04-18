import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../service/userAuth";
export function useSignup() {
  const { mutate: signup, isPending: isLoading } = useMutation({
    mutationFn: signupApi,
  });
  return { signup, isLoading };
}
