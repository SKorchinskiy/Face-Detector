"use client";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../_context/user.context";
import { fetchData } from "../../../_utils/fetch.util";
import Image from "next/image";

export default function Profile() {
  const [statistics, setStatistics] = useState<any>({});
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

  // profile image, name,
  return isSignedIn ? (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          height: "150%",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            width: "100%",
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-around",
              width: "40%",
              padding: "10px",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
              height: "60%",
              overflow: "clip",
            }}
          >
            <h2>Personal Information</h2>
            <Image
              src={"/profile-icon.png"}
              width={205}
              height={118}
              alt="profile-picture"
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                padding: "10px",
              }}
            >
              <p>ID: {userContext?.currentUser?.id}</p>
              <p>NAME: {userContext?.currentUser?.name}</p>
              <p>EMAIL: {userContext?.currentUser?.email}</p>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "40%",
              padding: "10px",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
              height: "60%",
            }}
          >
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
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
            width: "90%",
            padding: "10px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
            height: "60%",
            overflow: "clip",
          }}
        >
          <h2>Recent Activity</h2>
          {statistics?.detections ? (
            statistics.detections
              .slice(0, 5)
              .map((detection: any, index: number) => {
                return (
                  <div
                    key={index}
                    style={{
                      width: "100%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-around",
                      }}
                    >
                      <span>user id</span>
                      <span>user id</span>
                      <span>user id</span>
                      <span>user id</span>
                      <span>user id</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-around",
                      }}
                    >
                      <span>{detection.detection_id}</span>
                      <span>{detection.face_id}</span>
                      <span>{detection.user_id}</span>
                      <span>{detection.performed_at}</span>
                    </div>
                  </div>
                );
              })
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  ) : (
    <>Go away!</>
  );
}
