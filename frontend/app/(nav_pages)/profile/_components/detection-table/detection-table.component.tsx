"use client";

import { useRouter } from "next/navigation";
import styles from "./styles.module.css";

export type RecentDetections = {
  detection_id: number;
  face_count: number;
  face_id: number;
  performed_at: Date;
};

export type DetectionTableProps = {
  recentDetections: Array<RecentDetections>;
};

export default function DetectionTable({
  recentDetections,
}: DetectionTableProps) {
  const router = useRouter();

  return (
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
                onClick={() => router.push(`/images/${detection.face_id}`)}
              >
                {detection.face_id}
              </td>
              <td className={styles["table__data"]}> {detection.face_count}</td>
              <td className={styles["table__data"]}>
                {new Date(detection.performed_at).toLocaleDateString()}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
