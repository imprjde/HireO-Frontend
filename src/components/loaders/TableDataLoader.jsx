import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const TableDataLoader = () => {
  const skeletonRow = (
    <tr>
      <TableCell>
        <div className="w-9 h-9 animate-pulse bg-gray-600 rounded-full"></div>
      </TableCell>
      <TableCell>
        <div className="w-32 h-7 animate-pulse bg-gray-600 rounded"></div>
      </TableCell>
      <TableCell>
        <div className="w-32 h-7 animate-pulse bg-gray-600 rounded"></div>
      </TableCell>
      <TableCell className="m-auto flex justify-end">
        <div className="w-24 h-7 animate-pulse bg-gray-600 rounded justify-end"></div>
      </TableCell>
    </tr>
  );

  return (
    <Table>
      <TableHeader>
        <TableRow className=" hover:bg-black ">
          <TableHead className="text-gray-100">Logo</TableHead>
          <TableHead className="text-gray-100">Name</TableHead>
          <TableHead className="text-gray-100">Registered on</TableHead>
          <TableHead className="text-right text-white">Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody className="text-white font-semibold tracking-wider ">
        {Array.from({ length: 7 }).map((_, index) => (
          <React.Fragment key={index}>{skeletonRow}</React.Fragment>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableDataLoader;
