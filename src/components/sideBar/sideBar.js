import styles from "../../cssModules/sideBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
      faCirclePlay,
      faClock,
      faHeart,
      faFutbol,
      faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
export const SideBar = (props) => {
      const sideBarCloseButtonClickHandler = (event) => {
            event.stopPropagation();
            props.setShowSideBar(false);
      };
      return (
            <div className={styles["side-bar-overlay"]}>
                  <button
                        className={styles["side-bar-close-button"]}
                        onClick={sideBarCloseButtonClickHandler}
                  >
                        <FontAwesomeIcon icon={faXmark} />
                  </button>
                  <div className={styles["side-bar-links"]}>
                        <Link
                              to="/playLists"
                              className={styles["side-bar-link"]}
                              onClick={sideBarCloseButtonClickHandler}
                        >
                              <FontAwesomeIcon
                                    icon={faCirclePlay}
                                    className={styles["side-bar-link-icon"]}
                              />
                              Play lists
                        </Link>
                        <Link
                              to="/watchHistory"
                              className={styles["side-bar-link"]}
                              onClick={sideBarCloseButtonClickHandler}
                        >
                              <FontAwesomeIcon
                                    icon={faClock}
                                    className={styles["side-bar-link-icon"]}
                              />
                              Watch History
                        </Link>
                        <Link
                              className={styles["side-bar-link"]}
                              onClick={sideBarCloseButtonClickHandler}
                        >
                              <FontAwesomeIcon
                                    icon={faHeart}
                                    className={styles["side-bar-link-icon"]}
                              />
                              Likes
                        </Link>
                        <Link
                              to="/watchLater"
                              className={styles["side-bar-link"]}
                              onClick={sideBarCloseButtonClickHandler}
                        >
                              <FontAwesomeIcon
                                    icon={faFutbol}
                                    className={styles["side-bar-link-icon"]}
                              />
                              Watch Later
                        </Link>
                  </div>
            </div>
      );
};
