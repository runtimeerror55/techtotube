import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import styles from "../../cssModules/navBar.module.css";
import { SideBar } from "../sideBar/sideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const NavBar = () => {
      const [showSideBar, setShowSideBar] = useState(false);
      const SideBarOpenButtonClickHandler = () => {
            setShowSideBar(true);
      };
      return (
            <>
                  <div className={styles["page"]}>
                        <ToastContainer></ToastContainer>
                        <nav className={styles["nav"]}>
                              <section>
                                    <button
                                          className={
                                                styles["side-bar-open-button"]
                                          }
                                          onClick={
                                                SideBarOpenButtonClickHandler
                                          }
                                    >
                                          <FontAwesomeIcon icon={faBars} />
                                    </button>

                                    <span className={styles["logo"]}>
                                          TECHTOTUBE
                                    </span>
                              </section>
                              <section>
                                    <input
                                          type="text"
                                          placeholder="search by title"
                                          className={styles["search-bar"]}
                                    ></input>
                              </section>
                              <section>
                                    <Link to="/" className={styles["nav-link"]}>
                                          Home
                                    </Link>
                                    <Link className={styles["nav-link"]}>
                                          Login
                                    </Link>
                                    <Link className={styles["nav-link"]}>
                                          Logout
                                    </Link>
                              </section>
                        </nav>
                        {showSideBar ? (
                              <aside>
                                    <SideBar
                                          setShowSideBar={setShowSideBar}
                                    ></SideBar>
                              </aside>
                        ) : (
                              ""
                        )}
                        <Outlet></Outlet>
                  </div>
            </>
      );
};
