import { useEffect } from "react";
import { ColorRing } from "react-loader-spinner";
import { useFetcher } from "react-router-dom";
import { colorRingOptions } from "../../../utilities/utilities";

export const NextPageItems = ({
      setLoaderData,
      setShowNextPageItems,
      filtersValues,
      setShowNextPageData,
      setFilterValues,
}) => {
      const fetcher = useFetcher();
      const fetcherStatus = fetcher.data && fetcher.state === "idle";
      useEffect(() => {
            if (fetcherStatus) {
                  const data = fetcher.data;
                  console.log(data);
                  if (
                        data.loaderData.status === "success" &&
                        data.loaderData.payload.length > 0
                  ) {
                        setShowNextPageItems(false);
                        setLoaderData((previous) => {
                              return {
                                    status: "sucess",
                                    payload: [
                                          ...previous.payload,
                                          ...data.loaderData.payload,
                                    ],
                              };
                        });
                        setFilterValues((previous) => {
                              return {
                                    ...previous,
                                    page: previous.page + 1,
                              };
                        });
                  } else {
                        setShowNextPageItems(false);
                        setShowNextPageData("end");
                  }
            }
      }, [fetcher, fetcherStatus]);
      useEffect(() => {
            fetcher.load(
                  `/?page=${filtersValues.page + 1}&category=${
                        filtersValues.category
                  }`
            );
      }, []);

      return (
            <div>
                  <ColorRing {...colorRingOptions}></ColorRing>
            </div>
      );
};
