import { useRouter } from 'next/router';
import { fetchPost } from '../../helpers/api';
import BlogCard from '../../components/blogCard/BlogCard';
import Loading from '@/components/loading/Loading';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { GetServerSidePropsContext } from 'next';

const PostPage = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);
  const { data, isLoading, error } = useQuery({
    queryKey: ['blog', id],
    queryFn: () => fetchPost(id),
  });
  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <p>Error</p>;
  }
  if (data) {
    return (
      <div>
        <BlogCard
          id={data.blog.id}
          image={data.blog.photo_url}
          title={data.blog.title}
          description={data.blog.description}
          date={data.blog.updated_at}
        />
      </div>
    );
  }
};

export default PostPage;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { id } = ctx.query;
  const queryClient = new QueryClient();

  queryClient.prefetchQuery({
    queryKey: ['blog', id],
    queryFn: () => fetchPost(id),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
