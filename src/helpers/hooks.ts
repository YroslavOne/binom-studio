import { useRouter } from 'next/router';
import { fetchPosts } from './api';
import { useQuery } from '@tanstack/react-query';

const useHomePageData = () => {
  const router = useRouter();
  const page = router.query.page || '1';
  const pageSize = router.query.pageSize || '10';
  console.log(page, pageSize);

  const q = useQuery({
    queryKey: ['blogs', page, pageSize],
    queryFn: () => fetchPosts(Number(page), Number(pageSize)),
    retry: 0,
  });
  return {
    ...q,
    page: page ? Number(page) : 1,
    pageSize: pageSize ? Number(pageSize) : 10,
  };
};

export default useHomePageData;
