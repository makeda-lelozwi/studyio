"use client";
import React from "react";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [data, setData] = useState<HomePageProps | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const path = "/api/home-page";
      const BASE_URL = "http://localhost:1337";
      const url = new URL(path, BASE_URL);

      const response = await fetch(url.href);
      const result = await response.json();

      const transformedData: HomePageProps = {
        id: result.data.id,
        title: result.data.title,
      };
      setData(transformedData);
    };
    loadData();
  }, []);

  return <div>{data && <p>{data.title}</p>}</div>;
};

export default HomePage;
