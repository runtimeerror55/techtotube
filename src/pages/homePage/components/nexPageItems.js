import { useEffect } from "react";
import { ColorRing } from "react-loader-spinner";
import { useFetcher } from "react-router-dom";
import { colorRingOptions } from "../../../utilities/utilities";

export const NextPageItems = ({
      setLoaderData,
      setShowNextPageItems,
      filtersValues,
}) => {
      const fetcher = useFetcher();
      const fetcherStatus = fetcher.data && fetcher.state === "idle";
      useEffect(() => {
            if (fetcherStatus) {
                  const data = fetcher.data;
                  console.log(data);
                  if (data.loaderData.status === "success") {
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
                  } else {
                        setShowNextPageItems(false);
                  }
            }
      }, [fetcher, fetcherStatus]);
      useEffect(() => {
            fetcher.load(
                  `/?page=${filtersValues.page}&category=${filtersValues.category}`
            );
      }, []);

      return (
            <div>
                  <ColorRing {...colorRingOptions}></ColorRing>
            </div>
      );
};
