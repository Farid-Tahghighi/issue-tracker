import { Pagination } from "./components";

interface Props {
  searchParams: Promise<{ page: string }>;
}

export default async function Home({ searchParams }: Props) {
  const currentParams = await Promise.resolve(searchParams);
  const currentPage = currentParams.page ? parseInt(currentParams.page) : 1;
  return (
    <Pagination
      currentPage={currentPage}
      itemsCount={1000}
      pageSize={10}
    />
  );
}
