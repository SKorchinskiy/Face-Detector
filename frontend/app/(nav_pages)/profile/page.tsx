"use client";

import styles from "./page.module.css";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../_context/user.context";
import { fetchData } from "../_utils/fetch.util";
import Image from "next/image";
import { useRouter } from "next/navigation";

type RecentDetections = {
  detection_id: number;
  face_count: number;
  face_id: number;
  performed_at: Date;
};

type RecentComparisons = {
  comparison_id: number;
  first_face_id: number;
  second_face_id: number;
  similarity: number;
  performed_at: Date;
};

export default function Profile() {
  const router = useRouter();
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
              <h2>All time statistics:</h2>
              <p>
                Total detections:{" "}
                {statistics.detections
                  ? statistics.detections.length -
                    2 * statistics.comparisons.length
                  : 0}
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
                {statistics?.recent
                  ? statistics.recent.detections.length -
                    2 * statistics.recent.comparisons.length
                  : 0}
              </p>
              <p>
                Total comparisons:{" "}
                {statistics?.recent ? statistics.recent.comparisons.length : 0}
              </p>
            </div>
            <div>
              <h2>Last 7 days statistics:</h2>
              <p>
                Total detections:{" "}
                {statistics?.latest
                  ? statistics.latest.detections.length -
                    2 * statistics.latest.comparisons.length
                  : 0}
              </p>
              <p>
                Total comparisons:{" "}
                {statistics?.latest ? statistics.latest.comparisons.length : 0}
              </p>
            </div>
          </div>
          <div className={styles["profile-page__info-blocks_element"]}>
            <h2>Recent Detections</h2>
            <table className={styles["table"]}>
              <thead>
                <tr className={styles["table__detections_head-row"]}>
                  <th>detection id</th>
                  <th>face id</th>
                  <th>face count</th>
                  <th>performed at</th>
                </tr>
              </thead>
              <tbody>
                {recentDetections.map((detection: RecentDetections) => {
                  return (
                    <tr
                      key={detection.detection_id}
                      className={styles["table__detections_body-row"]}
                    >
                      <td className={styles["table__data"]}>
                        {detection.detection_id}
                      </td>
                      <td
                        className={styles["table__data"]}
                        onClick={() =>
                          router.push(`/images/${detection.face_id}`)
                        }
                      >
                        {detection.face_id}
                      </td>
                      <td className={styles["table__data"]}>
                        {" "}
                        {detection.face_count}
                      </td>
                      <td className={styles["table__data"]}>
                        {new Date(detection.performed_at).toLocaleDateString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className={styles["profile-page__info-blocks_element"]}>
            <h2>Recent Comparisons</h2>
            <table className={styles["table"]}>
              <thead>
                <tr className={styles["table__comparisons_head-row"]}>
                  <th>comparison id</th>
                  <th>first face id</th>
                  <th>second face id</th>
                  <th>similarity</th>
                  <th>performed at</th>
                </tr>
              </thead>
              <tbody>
                {recentComparisons.map((comparison: RecentComparisons) => {
                  return (
                    <tr
                      key={comparison.comparison_id}
                      className={styles["table__comparisons_body-row"]}
                    >
                      <td className={styles["table__data"]}>
                        {comparison.comparison_id}
                      </td>
                      <td
                        className={styles["table__data"]}
                        onClick={() =>
                          router.push(`/images/${comparison.first_face_id}`)
                        }
                      >
                        {comparison.first_face_id}
                      </td>
                      <td
                        className={styles["table__data"]}
                        onClick={() =>
                          router.push(`/images/${comparison.second_face_id}`)
                        }
                      >
                        {comparison.second_face_id}
                      </td>
                      <td className={styles["table__data"]}>
                        {comparison.similarity}
                      </td>
                      <td className={styles["table__data"]}>
                        {new Date(comparison.performed_at).toLocaleDateString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  ) : (
    <>Go away!</>
  );
}
