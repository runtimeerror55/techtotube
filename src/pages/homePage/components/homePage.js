import { useEffect, useRef, useState } from "react";
import { useAsyncValue } from "react-router-dom";
import styles from "../cssModules/homePage.module.css";
import { Video } from "./video";
import { Filtering } from "./filtering";
import { PageLandingLoader } from "../../../components/loaders/pageLandingLoader";
import { NextPageItems } from "./nexPageItems";

export const HomePage = () => {
      const [loaderData, setLoaderData] = useState(useAsyncValue());
      const [showFilterChangeLoader, setFilterChangeLoader] = useState(false);
      const [filtersValues, setFilterValues] = useState({
            page: 0,
            category: "all",
      });
      const [showNextPageItems, setShowNextPageItems] = useState(false);
      const [nextpageData, setShowNextPageData] = useState("success");
      const triggerRef = useRef();

      //   useEffect(() => {
      //         const scrollEventCallBack = (event) => {
      //               console.log(showNextPageItems);
      //               if (!showNextPageItems) {
      //                     if (
      //                           Math.abs(
      //                                 document.documentElement.scrollHeight -
      //                                       window.scrollY -
      //                                       document.documentElement.clientHeight
      //                           ) <= 1
      //                     ) {
      //                           //   setFilterValues((previous) => {
      //                           //         return {
      //                           //               ...previous,
      //                           //               page: previous.page + 1,
      //                           //         };
      //                           //   });
      //                           setShowNextPageItems(true);
      //                     }
      //               }
      //         };
      //         window.addEventListener("scroll", scrollEventCallBack);
      //         return () => {
      //               window.removeEventListener("scroll", scrollEventCallBack);
      //         };
      useEffect(() => {
            const scrollEventCallBack = (event) => {
                  const triggerElementPostionInformation =
                        triggerRef.current.getBoundingClientRect();

                  if (!showNextPageItems) {
                        if (
                              triggerElementPostionInformation.top + 40 <
                              window.innerHeight
                        ) {
                              //   setFilterValues((previous) => {
                              //         return {
                              //               ...previous,
                              //               page: previous.page + 1,
                              //         };
                              //   });
                              setShowNextPageItems(true);
                        }
                  }
            };
            window.addEventListener("scroll", scrollEventCallBack);
            return () => {
                  window.removeEventListener("scroll", scrollEventCallBack);
            };
      }, []); //   }, []);

      if (loaderData.status === "error") {
            return <div>{loaderData.message}</div>;
      }
      return (
            <main className={styles["main"]}>
                  <Filtering
                        setLoaderData={setLoaderData}
                        setFilterChangeLoader={setFilterChangeLoader}
                        setFilterValues={setFilterValues}
                        setShowNextPageData={setShowNextPageData}
                        setShowNextPageItems={setShowNextPageItems}
                  ></Filtering>

                  <section className={styles["videos"]}>
                        {showFilterChangeLoader ? (
                              <PageLandingLoader></PageLandingLoader>
                        ) : (
                              loaderData.payload.map((video, index) => {
                                    return (
                                          <Video
                                                video={video}
                                                key={video._id}
                                          ></Video>
                                    );
                              })
                        )}
                  </section>
                  {showNextPageItems && nextpageData === "success" ? (
                        <section className={styles["next-page-section"]}>
                              <NextPageItems
                                    setLoaderData={setLoaderData}
                                    setShowNextPageItems={setShowNextPageItems}
                                    filtersValues={filtersValues}
                                    setShowNextPageData={setShowNextPageData}
                                    setFilterValues={setFilterValues}
                              ></NextPageItems>
                        </section>
                  ) : null}
                  <div style={{ height: "50px" }} ref={triggerRef}></div>
            </main>
      );
};

// export const homePageLoader = async () => {
//       const response = await fetch("http://localhost:8080");
//       const data = await response.json();
//       return data;
// };
