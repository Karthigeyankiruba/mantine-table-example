"use client";

import { MantineReactTable } from "mantine-react-table";
import React, { useEffect, useMemo, useState } from "react";

const MantineTable = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("https://api.publicapis.org/entries");
        const json = await res.json();
        setData(json.entries);
      } catch (error) {
        setIsError(true);
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const columns = useMemo(() => [
    {
      id: "api",
      accessorKey: "API",
      header: "API",
    },
    {
      id: "category",
      accessorKey: "Category",
      header: "Category",
    },
    {
      id: "description",
      accessorKey: "Description",
      header: "Description",
    },
  ]);
  //   const columns = useMemo(() => [
  //     {
  //       accessorKey: "name.common",
  //       header: "Name",
  //     },
  //     {
  //       accessorKey: "capital",
  //       header: "Capital",
  //     },
  //     {
  //       accessorKey: "region",
  //       header: "Region",
  //     },
  //     {
  //       accessorKey: "flag",
  //       header: "Flag",
  //     },
  //   ]);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Something went wrong...</p>
      ) : (
        <MantineReactTable
          columns={columns}
          data={data}
          enableRowSelection
          enableColumnOrdering
          enableGlobalFilter={false}
        />
      )}
    </div>
  );
};

export default MantineTable;
