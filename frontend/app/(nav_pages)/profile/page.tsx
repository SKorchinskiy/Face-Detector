"use client";

import styles from "./page.module.css";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../_context/user.context";
import { fetchData } from "../_utils/fetch.util";
import Statistics from "./_components/statistics/statistics.component";

export default function Profile() {
  const [statistics, setStatistics] = useState<any>({});
  const [isSignedIn, setIsSignedIn] = useState(false);
  const userContext = useContext<any>(UserContext);

  useEffect(() => {
    setIsSignedIn(userContext.isSignedIn);
  }, [userContext]);

  useEffect(() => {
    const fetchStatistics = async () => {
      const url = "https://skorchinskiy.pro:8000/users/stats";
      const options = { method: "GET" };
      const stats = await fetchData({ url, options });
      setStatistics(stats);
    };
    fetchStatistics();
  }, []);

  return isSignedIn ? (
    <>
      <div className={styles["profile-page"]}>
        <div className={styles["profile-page__info-blocks"]}>
          <div className={styles["profile-page__info-blocks_element"]}>
            <h2>Personal Information</h2>
            <img
              src={"/profile-icon.png"}
              width={205}
              height={118}
              alt="profile-picture"
            />
            <div>
              <p>Id: {userContext?.currentUser?.id}</p>
              <p>Name: {userContext?.currentUser?.name}</p>
              <p>Email: {userContext?.currentUser?.email}</p>
              <p>Creation: {userContext?.currentUser?.created_at}</p>
            </div>
          </div>
          <Statistics statistics={statistics} />
        </div>
      </div>
    </>
  ) : null;
}
