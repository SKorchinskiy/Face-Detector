import styles from "./statistics.module.css";

type Statistics = {
  detections: Array<any>;
  comparisons: Array<any>;
  recent: {
    detections: Array<any>;
    comparisons: Array<any>;
  };
  latest: {
    detections: Array<any>;
    comparisons: Array<any>;
  };
};

export default function Statistics({ statistics }: { statistics: Statistics }) {
  return (
    <div className={styles["profile-page__info-blocks_element"]}>
      <div>
        <div>
          <h2>All time statistics:</h2>
          <p>
            Total detections:{" "}
            {statistics.detections
              ? statistics.detections.length - 2 * statistics.comparisons.length
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
    </div>
  );
}
