import React, { useState, useEffect } from "react";

function useScroll(callback) {
  const [isFetching, setIsFetching] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  function handleScroll() {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
    setIsFetching(true);
  }
  useEffect(() => {
    if (!isFetching) return;
    callback();
  }, [isFetching, callback]);
  return [isFetching, setIsFetching];
}

export default useScroll;
