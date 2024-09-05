"use client";
import { Order } from "@/lib/models/OrderModel";
import Link from "next/link";
import useSWR from "swr";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function Orders() {
  const { data: orders, error } = useSWR(`/api/admin/orders`);
  if (error) return "An error has occurred.";
  if (!orders) return "Loading...";

  return (
    <div className="w-[90%] mx-auto h-auto ">
      <h1 className="py-4 text-2xl">Orders</h1>
      <div className="  overflow-x-auto">
        <div className="rounded-md border">
          <ScrollArea className="w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead className="hidden sm:table-cell">Paid</TableHead>
                  <TableHead className="hidden lg:table-cell">
                    Delivered
                  </TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order:any) => (
                  <TableRow key={order._id}>
                    <TableCell className="font-medium">
                      ..{order._id.substring(20, 24)}
                    </TableCell>
                    <TableCell>{order.user?.name || "Deleted user"}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {order.createdAt.substring(0, 10)}
                    </TableCell>
                    <TableCell>${order.totalPrice.toFixed(2)}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {order.isPaid && order.paidAt
                        ? `${order.paidAt.substring(0, 10)}`
                        : "Not paid"}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {order.isDelivered && order.deliveredAt
                        ? `${order.deliveredAt.substring(0, 10)}`
                        : "Not delivered"}
                    </TableCell>
                    <TableCell>
                      <Link
                        href={`/order/${order._id}`}
                        className="text-primary hover:underline"
                      >
                        Details
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
