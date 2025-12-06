import React, { useEffect, useState } from "react";
import api from "../api";
import Loader from "../components/Loader";
import { useAuth } from "../context/AuthContext";

export default function AdminEnquiries() {
  const [loading, setLoading] = useState(true);
  const [enquiries, setEnquiries] = useState([]);
  const { logout } = useAuth();

  useEffect(() => {
    fetchEnquiries();
  }, []);

  async function fetchEnquiries() {
    setLoading(true);
    try {
      const res = await api.get("/enquiries");

      const data = res.data.data || [];
      setEnquiries(data);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401 || err.response?.status === 403) {
        alert("Session expired, login again");
        logout();
      } else {
        alert("Failed to load enquiries");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Enquiries</h1>
        <div className="flex gap-2">
          <button
            onClick={fetchEnquiries}
            className="px-3 py-1 border rounded-md"
          >
            Refresh
          </button>
          <button
            onClick={logout}
            className="px-3 py-1 bg-red-500 text-white rounded-md"
          >
            Logout
          </button>
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : enquiries.length === 0 ? (
        <div className="bg-white p-6 rounded-xl shadow text-center text-gray-600">
          No enquiries yet
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                  ID
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                  Product
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                  Name
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                  Email
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                  Phone
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                  Message
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                  Created
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {enquiries.map((e) => (
                <tr key={e.id}>
                  <td className="px-4 py-3 text-sm">{e.id}</td>
                  <td className="px-4 py-3 text-sm">
                    {e.product_name || e.product_id || "-"}
                  </td>
                  <td className="px-4 py-3 text-sm">{e.name}</td>
                  <td className="px-4 py-3 text-sm">{e.email}</td>
                  <td className="px-4 py-3 text-sm">{e.phone}</td>
                  <td className="px-4 py-3 text-sm">{e.message}</td>
                  <td className="px-4 py-3 text-sm">
                    {new Date(e.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
