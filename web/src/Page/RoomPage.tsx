import React, { useEffect } from "react";
import "../styles/welcome.css";
import { BlackButton } from "../Component/BlackButton";
import { useHistory, useParams } from "react-router";
export default function RoomPage() {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  useEffect(() => {}, [id]);
  if (id) {
    return <>{id}</>;
  }
  return <>Nothing</>;
}
