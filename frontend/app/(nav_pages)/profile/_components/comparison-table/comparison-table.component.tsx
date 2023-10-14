"use client";

import { useRouter } from "next/navigation";
import styles from "./comparison-table.module.css";

export type RecentComparisons = {
  comparison_id: number;
  first_face_id: number;
  second_face_id: number;
  similarity: number;
  performed_at: Date;
};

export type ComparisonTableProps = {
  recentComparisons: Array<RecentComparisons>;
};

export default function ComparisonTable({
  recentComparisons,
}: ComparisonTableProps) {
  const router = useRouter();

  return (
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
              <td className={styles["table__data"]}>{comparison.similarity}</td>
              <td className={styles["table__data"]}>
                {new Date(comparison.performed_at).toLocaleDateString()}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
