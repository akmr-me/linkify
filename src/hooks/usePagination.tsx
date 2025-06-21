import { useRouter, useSearchParams } from "next/navigation";

export const usePagination = (
  initialPage: number = 1,
  initialLimit: number = 10
) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") || initialPage);
  const limit = Number(searchParams.get("limit") || initialLimit);

  const handleNextPage = () => router.push(`?page=${page + 1}&limit=${limit}`);
  const handlePreviousPage = () =>
    router.push(`?page=${page - 1}&limit=${limit}`);

  return {
    page,
    limit,
    handleNextPage,
    handlePreviousPage,
  };
};
