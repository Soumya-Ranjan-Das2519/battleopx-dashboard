import React from "react";
import { useState } from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import StatCard from "../components/StatCard";
import LineChartCard from "../components/LineChartCard";
import DoughnutChartCard from "../components/DoughnutChartCard";
import UserTable from "../components/UserTable";

export default function Dashboard() {
  const [sidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-slate-950 text-white">
      
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        <Header
        title="Dashboard"
        subtitle="Welcome back! Here's your gaming platform overview"
      />

        <main className="p-6 overflow-y-auto space-y-6">

          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
<StatCard title="Total User" value="667" titleColor="text-green-400" />
<StatCard title="Total Deposit" value="3,66,451" titleColor="text-green-400" />
<StatCard title="Total Withdrawal" value="1,51,54,154" titleColor="text-white" />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <LineChartCard />
            </div>
            <DoughnutChartCard />
          </div>

          {/* Table */}
          <UserTable />

        </main>
      </div>
    </div>
  );
}
