
import React, { useState, useEffect, Suspense } from "react";
const MovieComponent = React.lazy(() => import("./movie-component"));

export const MovieList = (props) => {
  const [listItems, setListItems] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  //   const [movieData, getNextMovie]=useState(props.movies[0])
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetchData();
    window.addEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    if (
      Math.ceil(window.innerHeight + document.documentElement.scrollTop) !==
        document.documentElement.offsetHeight ||
      isFetching
    )
      return;
    setIsFetching(true);
    console.log(isFetching);
  };

  const fetchData = () => {
    // setTimeout(async () => {
    fetch(
      `https://imdb-api.com/en/API/Title/k_b8J57AJ4/${props.movies[page].id}`
    )
      .then((response) => response.json())
      .then((data) => {
        //    data.json();
        console.log("dasta", data);
        console.log("gdhsf", listItems);
        // const nextData = page + 1;
        // setPage(nextData);
        setListItems(listItems.push(data));
        // setListItems(() => {
        //   return data.id ? [...listItems, listItems.push(data])] : listItems;
        // });

        //   console.log(page);
        //   console.log(movieData);
        //   getNextMovie(()=>
        //   {
        //       return [props.movies[page]]
        //   }))
        // }, 1000);
      });
  };

  useEffect(() => {
    if (!isFetching) return;
    fetchMoreListItems();
  }, [isFetching]);

  const fetchMoreListItems = () => {
    setPage(page + 1);
    fetchData();
    setIsFetching(false);
  };

  return (
    <>
      {/* {listItems.map((listItem) => (
        <div className="card" key={listItem.id}> */}
      <Suspense fallback={<h4>Loading...</h4>}>
        <MovieComponent movies={listItems} />
      </Suspense>
      {/* </div> */}
      ))
      {isFetching && <h1>Fetching more list items...</h1>}
    </>
  );
};
