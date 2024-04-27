import Loading from "@/components/loading/Loading";
import { fetchPosts } from "@/helpers/api";
import useHomePageData from "@/helpers/hooks";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { Flex, Pagination } from "antd";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import Blog from "../components/blog/Blog";

export default function Home() {
  const router = useRouter();
  const { data, isLoading, error, page, pageSize } = useHomePageData();

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <p>Error</p>;
  }
  return (
    <Flex align="center" vertical>
      <Flex wrap="wrap" gap={50} flex="1 1 30%">
        {data.blogs?.map((blog: BlogsProps) => (
          <div key={blog.id} style={{ flex: "1 1 30%" }}>
            <Blog
              id={blog.id}
              image={blog.photo_url}
              title={blog.title}
              date={blog.updated_at}
            />
          </div>
        ))}
      </Flex>
      <Pagination
        current={page}
        defaultPageSize={pageSize}
        onChange={(current: number, pageSize: number) => {
          router.push({
            pathname: "/",
            query: { page: current, pageSize: pageSize },
          });
        }}
        total={data.total_blogs}
      />
    </Flex>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const page = ctx.query.page || "1";
  const pageSize = ctx.query.pageSize || "10";
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["blogs", page, pageSize],
    queryFn: () => fetchPosts(page, pageSize),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
