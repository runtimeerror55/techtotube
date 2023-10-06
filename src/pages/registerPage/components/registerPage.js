import styles from "../cssModules/registerPage.module.css";
import { Form, useFetcher, useNavigate } from "react-router-dom";
import { NavBar } from "../../../components/navBar/navBar";
import { useEffect, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import { authContext } from "../../../context/authentication";
import { ButtonWithActionAndLoader } from "../../../components/buttons/buttonWithActionAndLoader";
export const RegisterPage = () => {
      const { login } = useContext(authContext);
      const navigate = useNavigate();

      const callBack = (data) => {
            console.log(data);
            login(data);
            navigate("/");
      };
      return (
            <div className={styles["page"]}>
                  <NavBar></NavBar>

                  <main className={styles["main"]}>
                        <ButtonWithActionAndLoader
                              buttonText="Register"
                              buttonClass={styles["register-button"]}
                              loaderHeight="25"
                              loaderWidth="100"
                              action="/register"
                              method="POST"
                              formClass={styles["register-form"]}
                              callBack={callBack}
                              loaderColor="black"
                        >
                              <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="email"
                                    required
                                    className={styles["user-details-input"]}
                              ></input>
                              <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="name"
                                    required
                                    className={styles["user-details-input"]}
                              ></input>
                              <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="password"
                                    required
                                    className={styles["user-details-input"]}
                              ></input>
                        </ButtonWithActionAndLoader>
                  </main>
            </div>
      );
};
