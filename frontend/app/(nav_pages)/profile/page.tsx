"use client";

import styles from "./page.module.css";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../_context/user.context";
import { fetchData } from "../_utils/fetch.util";
import Image from "next/image";
import DetectionTable from "./_components/detection-table/detection-table.component";
import ComparisonTable from "./_components/comparison-table/comparison-table.component";
import { RecentDetections } from "./_components/detection-table/detection-table.component";
import { RecentComparisons } from "./_components/comparison-table/comparison-table.component";

export default function Profile() {
  const [statistics, setStatistics] = useState<any>({});
  const [recentDetections, setRecentDetections] = useState<RecentDetections[]>(
    []
  );
  const [recentComparisons, setRecentComparisons] = useState<
    RecentComparisons[]
  >([]);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const userContext = useContext<any>(UserContext);

  useEffect(() => {
    setIsSignedIn(userContext.isSignedIn);
  }, [userContext]);

  useEffect(() => {
    const fetchStatistics = async () => {
      const url = "http://localhost:8000/users/stats";
      const options = { method: "GET" };
      const stats = await fetchData({ url, options });
      setStatistics(stats);
    };
    fetchStatistics();
  }, []);

  useEffect(() => {
    const fetchRecentDetections = async () => {
      // fix for dynamic user
      const url = "http://localhost:8000/detect/1";
      const options = { method: "GET" };
      const detections = await fetchData({
        url,
        options,
      });
      setRecentDetections(detections);
    };

    fetchRecentDetections();
  }, []);

  useEffect(() => {
    const fetchRecentComparisons = async () => {
      // fix for dynamic user
      const url = "http://localhost:8000/compare/1";
      const options = { method: "GET" };
      const comparisons = await fetchData({
        url,
        options,
      });
      setRecentComparisons(comparisons);
    };

    fetchRecentComparisons();
  }, []);

  return isSignedIn ? (
    <>
      <div className={styles["profile-page"]}>
        <div className={styles["profile-page__info-blocks"]}>
          <div className={styles["profile-page__info-blocks_element"]}>
            <h2>Personal Information</h2>
            <Image
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
          <div className={styles["profile-page__info-blocks_element"]}>
            <div>
              <div>
                <h2>All time statistics:</h2>
                <p>
                  Total detections:{" "}
                  {statistics.detections ? statistics.detections.length : 0}
                </p>
                <p>
                  Total comparisons:{" "}
                  {statistics.comparisons ? statistics.comparisons.length : 0}
                </p>
              </div>
              <div>
                <h2>Last 30 days statistics:</h2>
                <p>
                  Total detections:{" "}
                  {statistics?.recent ? statistics.recent.detections.length : 0}
                </p>
                <p>
                  Total comparisons:{" "}
                  {statistics?.recent
                    ? statistics.recent.comparisons.length
                    : 0}
                </p>
              </div>
              <div>
                <h2>Last 7 days statistics:</h2>
                <p>
                  Total detections:{" "}
                  {statistics?.latest ? statistics.latest.detections.length : 0}
                </p>
                <p>
                  Total comparisons:{" "}
                  {statistics?.latest
                    ? statistics.latest.comparisons.length
                    : 0}
                </p>
              </div>
            </div>
          </div>
          <div className={styles["profile-page__info-blocks_element"]}>
            <h2>Recent Detections</h2>
            <DetectionTable recentDetections={recentDetections} />
          </div>
          <div className={styles["profile-page__info-blocks_element"]}>
            <h2>Recent Comparisons</h2>
            <ComparisonTable recentComparisons={recentComparisons} />
          </div>
        </div>
      </div>
    </>
  ) : null;
}
