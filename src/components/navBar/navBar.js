import { Outlet, Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import styles from "../../cssModules/navBar.module.css";
import { SideBar } from "../sideBar/sideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authContext } from "../../context/authentication";

export const NavBar = () => {
      const [showSideBar, setShowSideBar] = useState(false);
      const SideBarOpenButtonClickHandler = () => {
            setShowSideBar(true);
      };

      const { token, logout } = useContext(authContext);

      const navigate = useNavigate();

      const logoutHandler = () => {
            logout();
            navigate("/login");
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
                                          HOME
                                    </Link>
                                    {token ? (
                                          <button
                                                onClick={logoutHandler}
                                                className={
                                                      styles["logout-button"]
                                                }
                                          >
                                                LOGOUT
                                          </button>
                                    ) : (
                                          <>
                                                <Link
                                                      to="/login"
                                                      className={
                                                            styles["nav-link"]
                                                      }
                                                >
                                                      LOGIN
                                                </Link>
                                                <Link
                                                      to="/register"
                                                      className={
                                                            styles["nav-link"]
                                                      }
                                                >
                                                      REGISTER
                                                </Link>
                                          </>
                                    )}
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
