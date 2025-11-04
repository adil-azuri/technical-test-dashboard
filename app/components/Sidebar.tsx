"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import {
  LogOut,
  LayoutGrid,
  MessageSquare,
  Calendar,
  Bell,
  Package,
  Phone,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Data Menu untuk iterasi
const menuItems = [
  { name: "Home", icon: LayoutGrid, href: "#" },
  { name: "Products", icon: Package, href: "/products" },
  { name: "Walk In queue", icon: MessageSquare, href: "#" },
  { name: "Appointments", icon: Calendar, href: "#" },
  { name: "Notifications", icon: Bell, href: "#" },
  { name: "Services", icon: Phone, href: "#" },
];

interface SidebarProps {
  onToggle?: (minimized: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onToggle }) => {
  const { logout } = useAuth();
  const pathname = usePathname();
  const [minimized, setMinimized] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = "/login";
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleToggle = () => {
    const newMinimized = !minimized;
    setMinimized(newMinimized);
    if (onToggle) {
      onToggle(newMinimized);
    }
  };

  return (
    <div className="p-2">
      <div
        className={`fixed top-2 left-3 h-[calc(100vh-32px)] ${
          minimized ? "w-17" : "w-60"
        } bg-white rounded-2xl shadow-lg border border-gray-100 z-40 flex flex-col justify-between transition-all duration-300`}
      >
        <div className="flex-1 overflow-y-auto">
          {/* Logo Section */}
          <div className="p-3 pb-8">
            <button
              onClick={handleToggle}
              className={`bg-amber-600 hover:bg-amber-700 flex items-center space-x-3 p-3 rounded-lg text-base font-medium transition-colors duration-200 ${
                minimized ? "justify-center" : ""
              } text-white border-none shadow-md`}
            >
              {minimized ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
              {!minimized && <span>Collapse</span>}
            </button>

            <div className="flex items-center space-x-3 mt-4">
              <div className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-lg shadow-sm">
                <span className="text-orange-500 font-bold text-md">MH</span>
              </div>
              {!minimized && (
                <span className="text-xl font-semibold text-gray-800">
                  MarkHub
                </span>
              )}
            </div>
          </div>

          <div className={`${minimized ? "px-2" : "px-6"} space-y-6`}>
            {!minimized && (
              <h3 className="text-sm font-medium text-gray-500 mb-4 tracking-wider">
                Main Menu
              </h3>
            )}

            <nav className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center space-x-3 p-3 rounded-lg text-base font-medium transition-colors duration-200 ${
                      isActive
                        ? "bg-amber-100 text-amber-800"
                        : "bg-white text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {!minimized && <span>{item.name}</span>}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        <div
          className={`${
            minimized ? "p-2 pt-4" : "p-6 pt-4"
          } border-t border-gray-100`}
        >
          <button
            onClick={handleLogout}
            className={`w-full bg-amber-600 hover:bg-amber-700 flex items-center justify-start space-x-3 p-3 text-base font-medium text-white rounded-lg border-none shadow-md transition-colors duration-200 ${
              minimized ? "justify-center" : ""
            }`}
          >
            {/* Ikon untuk Logout (Mirip Ikon Desain) */}
            <LogOut className="w-5 h-5 text-white transform rotate-180" />
            {!minimized && <span>Log Out</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
