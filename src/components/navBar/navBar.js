import { Outlet, Link } from "react-router-dom";
import styles from "../../cssModules/navBar.module.css";
export const NavBar = () => {
      return (
            <>
                  <nav className={styles["nav"]}>
                        <section>TECHTOTUBE</section>
                        <section>
                              <Link className={styles["nav-link"]}>login</Link>
                              <Link className={styles["nav-link"]}>logout</Link>
                        </section>
                  </nav>
                  <Outlet></Outlet>
            </>
      );
};
