import { useCallback, useEffect, useRef, useState } from 'react';

import { getComments } from '~/API/commentApi';

const DEFAULT_OPTION = {
  stop: false,
  firstLoad: false,
};

function useInfinityloading({ id, limit, depens, otp }) {
  const [commentsApi, setCommentsApi] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const btnRef = useRef();

  const option = { ...DEFAULT_OPTION, ...otp };

  useEffect(() => {
    setPage(1);
  }, [...depens]);

  useEffect(() => {
    const fetchApi = async () => {
      setLoading(true);

      try {
        const res = await getComments(id, {
          // call api
          params: {
            product_id: id,
            page: page,
            limit: limit,
          },
        });

        setLoading(false);
        setCommentsApi(res.data.comments);
      } catch (error) {
        setLoading(false);
        if (error.response?.data.message) {
          console.log(error.response?.data.message);
        } else {
          console.log(error.message);
        }
      }
    };

    fetchApi();
  }, [id, limit, page]);

  const handleLoadMore = useCallback(() => {
    if (option.stop) return;
    setPage((prev) => prev + 1);
  }, [option.stop]);

  useEffect(() => {
    const btn = btnRef.current;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && option.firstLoad) {
        handleLoadMore();
      }
    });

    if (btn) {
      observer.observe(btn);
    }

    return () => {
      if (btn) observer.unobserve(btn);
    }; //FIXME: Cần có hàm xóa để tránh rò rỉ
  }, [option.firstLoad, handleLoadMore]);

  const btnRender = () => {
    return (
      <button ref={btnRef} className="btn-load_more" onClick={handleLoadMore} disabled={option.stop}>
        Load more
      </button>
    );
  };

  return { commentsApi, loading, btnRender };
}

export default useInfinityloading;
