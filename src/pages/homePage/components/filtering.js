import { forwardRef, useEffect, useRef, useState } from "react";
import { Form, useFetcher, useSubmit } from "react-router-dom";
import styles from "../cssModules/filtering.module.css";

const radioFilterIds = ["all", "cars", "monitors", "tablets", "laptops"];

export const Filtering = forwardRef(
      (
            {
                  setLoaderData,
                  setFilterChangeLoader,
                  setFilterValues,
                  setShowNextPageData,
                  setShowNextPageItems,
            },
            ref
      ) => {
            const filterChangeFetcher = useFetcher();
            const [filterChangeFetcherFlag, setFilterChangeFetcherFlag] =
                  useState(false);
            const filterChangeFetcherStatus =
                  filterChangeFetcher.state === "idle" &&
                  filterChangeFetcher.data;

            useEffect(() => {
                  if (filterChangeFetcherFlag) {
                        if (filterChangeFetcherStatus) {
                              const data = filterChangeFetcher.data.loaderData;
                              if (data.status === "success") {
                                    setLoaderData(data);
                                    setShowNextPageData("success");
                                    setShowNextPageItems(false);
                              }
                              setFilterChangeLoader(false);
                              setFilterChangeFetcherFlag(false);
                        } else if (filterChangeFetcher.state !== "idle") {
                              setFilterChangeLoader(true);
                        }
                  }
            }, [filterChangeFetcher]);
            const [currentActiveRadioId, setCurrentActiveRadioId] =
                  useState("all");

            const filterChangeHandler = (event) => {
                  const category = event.target.id;
                  setCurrentActiveRadioId(event.target.id);
                  setFilterChangeFetcherFlag(true);
                  setFilterValues({
                        category,
                        page: 0,
                  });
                  filterChangeFetcher.load(`/?page=0&category=${category}`);
                  event.preventDefault();
            };
            return (
                  <section className={styles["filtering-section"]}>
                        <Form
                              className={styles["filtering-form"]}
                              onChange={filterChangeHandler}
                        >
                              {radioFilterIds.map((id) => {
                                    let labelClassName =
                                          styles["radio-filter-label"];
                                    if (id === currentActiveRadioId) {
                                          labelClassName =
                                                labelClassName +
                                                " " +
                                                styles["active-radio-filter"];
                                    }
                                    return (
                                          <>
                                                <input
                                                      type="radio"
                                                      id={id}
                                                      name="category"
                                                      className={
                                                            styles[
                                                                  "videos-filter-radio-input"
                                                            ]
                                                      }
                                                      value={id}
                                                ></input>
                                                <label
                                                      htmlFor={id}
                                                      className={labelClassName}
                                                >
                                                      {id}
                                                </label>
                                          </>
                                    );
                              })}
                        </Form>
                  </section>
            );
      }
);
