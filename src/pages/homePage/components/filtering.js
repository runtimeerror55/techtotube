import { forwardRef, useEffect, useRef, useState } from "react";
import { Form, useFetcher, useSubmit } from "react-router-dom";
import styles from "../cssModules/filtering.module.css";

const radioFilterIds = ["all", "cars", "monitors", "tablets", "laptops"];

export const Filtering = forwardRef(
      ({ setLoaderData, setFilterChangeLoader }, ref) => {
            const filterChangeFetcher = useFetcher();
            const filterChangeFetcherStatus =
                  filterChangeFetcher.state === "idle" &&
                  filterChangeFetcher.data;

            useEffect(() => {
                  if (filterChangeFetcherStatus) {
                        const data = filterChangeFetcher.data.loaderData;
                        if (data.status === "success") {
                              setLoaderData(data);
                        }
                        setFilterChangeLoader(false);
                  } else if (filterChangeFetcher.state !== "idle") {
                        setFilterChangeLoader(true);
                  }
            }, [filterChangeFetcher]);
            const [currentActiveRadioId, setCurrentActiveRadioId] =
                  useState("all");

            const filterChangeHandler = (event) => {
                  const query = event.target.id;
                  setCurrentActiveRadioId(event.target.id);
                  console.log(query);
                  filterChangeFetcher.load(`/?category=${query}`);
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
                                                      for={id}
                                                      className={labelClassName}
                                                >
                                                      {id}
                                                </label>
                                          </>
                                    );
                              })}

                              <select
                                    name="sort"
                                    className={styles["sort-filter"]}
                              >
                                    <option value="" disabled selected>
                                          sortby
                                    </option>
                                    <option value="1">price low to high</option>

                                    <option value="-1">
                                          price high to low
                                    </option>
                              </select>
                        </Form>
                  </section>
            );
      }
);
