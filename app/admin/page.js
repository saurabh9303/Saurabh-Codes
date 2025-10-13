"use client";

import React, { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

// Add animations CSS
const styles = `
  @keyframes slide-in-right {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  @keyframes scale-in {
    from {
      transform: scale(0.9);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
  
  .animate-slide-in-right {
    animation: slide-in-right 0.3s ease-out;
  }
  
  .animate-fade-in {
    animation: fade-in 0.2s ease-out;
  }
  
  .animate-scale-in {
    animation: scale-in 0.2s ease-out;
  }
`;

// Date formatting
function formatDate12Hour(dateString) {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  const hh = String(hours).padStart(2, "0");
  return `${dd}/${mm}/${yyyy} ${hh}:${minutes}:${seconds} ${ampm}`;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    type: "",
    title: "",
    message: "",
    onConfirm: null,
  });
  const [toast, setToast] = useState({ show: false, type: "", message: "" });

  // Protect admin route
  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      setUnauthorized(true);
      return;
    }
    if (session.user.role !== "admin") {
      router.replace("/");
    }
  }, [session, status, router]);

  // Fetch users
  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      const text = await res.text();
      const data = text ? JSON.parse(text) : { users: [] };

      if (res.ok) setUsers(data.users || []);
      else {
        console.error(data.error || "Failed to fetch users");
        setUsers([]);
      }
    } catch (err) {
      console.error("Fetch users error:", err);
      setUsers([]);
    }
  };


  // Fetch forms
  const fetchForms = async () => {
    try {
      const res = await fetch("/api/forms");
      const text = await res.text();
      const data = text ? JSON.parse(text) : { forms: [] };

      if (res.ok) {
        setForms(data.forms || []);
      } else {
        console.error(data.error || "Failed to fetch forms");
        setForms([]);
      }
    } catch (err) {
      console.error("Fetch forms error:", err);
      setForms([]);
    }
  };

  useEffect(() => {
    if (session?.user.role === "admin") {
      fetchUsers();
      fetchForms();
      setLoading(false);
    }
  }, [session]);

  // Show toast notification
  const showToast = (type, message) => {
    setToast({ show: true, type, message });
    setTimeout(() => {
      setToast({ show: false, type: "", message: "" });
    }, 3000);
  };

  // Show confirmation modal
  const showConfirmation = (title, message, onConfirm) => {
    setModalConfig({ type: "confirm", title, message, onConfirm });
    setShowModal(true);
  };

  // Actions
  const updateUserStatus = async (id, status) => {
    const action = status === "banned" ? "ban" : "unban";
    showConfirmation(
      `${action.charAt(0).toUpperCase() + action.slice(1)} User`,
      `Are you sure you want to ${action} this user?`,
      async () => {
        try {
          const res = await fetch(`/api/admin/users/${id}/status`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status }),
          });
          if (res.ok) {
            fetchUsers();
            showToast("success", `User ${action}ned successfully!`);
          } else {
            showToast("error", `Failed to ${action} user`);
          }
        } catch (err) {
          console.error(err);
          showToast("error", `Error ${action}ning user`);
        }
      }
    );
  };

  const deleteUser = async (id) => {
    showConfirmation(
      "Delete User",
      "Are you sure you want to delete this user? This action cannot be undone.",
      async () => {
        try {
          // ✅ Keep the working logic with query param (?id=)
          const res = await fetch(`/api/admin/users?id=${id}`, { method: "DELETE" });
          const data = await res.json();

          if (data.success) {
            fetchUsers(); // refresh user list
            showToast("success", data.message || "User deleted successfully!");
          } else {
            showToast("error", data.error || "Failed to delete user");
          }
        } catch (err) {
          console.error("Error deleting user:", err);
          showToast("error", "Something went wrong while deleting user");
        }
      }
    );
  };



  const deleteForm = async (id) => {
    showConfirmation(
      "Delete Form",
      "Are you sure you want to delete this form? This action cannot be undone.",
      async () => {
        try {
          const res = await fetch(`/api/forms?id=${id}`, { method: "DELETE" });
          const data = await res.json();

          if (data.success) {
            fetchForms();
            showToast("success", data.message || "Form deleted successfully!");
          } else {
            showToast("error", data.error || "Failed to delete form");
          }
        } catch (err) {
          console.error(err);
          showToast("error", "Error deleting form");
        }
      }
    );
  };

  // Categorize forms
  const categories = ["contact", "services", "portfolio"];
  const categorizedForms = categories.reduce((acc, type) => {
    acc[type] = forms.filter((f) => f.formType === type);
    return acc;
  }, {});

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-xl bg-gray-900">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (unauthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-900 to-red-700 text-white p-4">
        <div className="text-center max-w-md bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Access Denied 🚫</h1>
          <p className="mb-6 text-gray-200">Please sign in with an admin account to access this dashboard.</p>
          <button
            onClick={() => signIn()}
            className="bg-yellow-400 hover:bg-yellow-500 transition-colors px-6 py-3 rounded-full font-semibold text-black shadow-lg hover:shadow-xl"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <style>{styles}</style>

      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in-right">
          <div
            className={`flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl backdrop-blur-lg border ${toast.type === "success"
              ? "bg-green-600/90 border-green-400"
              : "bg-red-600/90 border-red-400"
              }`}
          >
            <div className="flex-shrink-0">
              {toast.type === "success" ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </div>
            <p className="font-semibold">{toast.message}</p>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full border border-gray-700 animate-scale-in">
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-600/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white">{modalConfig.title}</h3>
                </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">{modalConfig.message}</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-3 rounded-xl font-semibold bg-gray-700 hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    modalConfig.onConfirm();
                    setShowModal(false);
                  }}
                  className="flex-1 px-4 py-3 rounded-xl font-semibold bg-red-600 hover:bg-red-700 transition-colors shadow-lg shadow-red-600/50"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Header */}
      <div className="md:hidden bg-gray-800 p-4 flex items-center justify-between border-b border-gray-700">
        <h1 className="text-xl font-bold">Admin Panel</h1>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {sidebarOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"
            } md:translate-x-0 fixed md:relative z-20 w-64 bg-gray-800 h-full transition-transform duration-300 ease-in-out border-r border-gray-700 flex flex-col`}
        >
          <div className="p-6 border-b border-gray-700 hidden md:block">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Admin Panel
            </h2>
          </div>

          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-2">
              <li>
                <button
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${activeTab === "users"
                    ? "bg-indigo-600 shadow-lg shadow-indigo-600/50"
                    : "hover:bg-gray-700"
                    }`}
                  onClick={() => {
                    setActiveTab("users");
                    setSidebarOpen(false);
                  }}
                >
                  <span className="font-medium">👥 Users</span>
                </button>
              </li>
              {categories.map((type) => (
                <li key={type}>
                  <button
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${activeTab === type
                      ? "bg-indigo-600 shadow-lg shadow-indigo-600/50"
                      : "hover:bg-gray-700"
                      }`}
                    onClick={() => {
                      setActiveTab(type);
                      setSidebarOpen(false);
                    }}
                  >
                    <span className="font-medium">
                      {type === "contact" && "📧"}
                      {type === "services" && "🛠️"}
                      {type === "portfolio" && "💼"}{" "}
                      {type.charAt(0).toUpperCase() + type.slice(1)} Forms
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-10 md:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Main content */}
        <main className="flex-1 overflow-auto">
          <div className="p-4 md:p-6 lg:p-8">
            {activeTab === "users" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-2xl md:text-3xl font-bold">All Users</h1>
                  <span className="px-3 py-1 bg-indigo-600 rounded-full text-sm font-medium">
                    {users.length} Total
                  </span>
                </div>

                {/* Desktop Table View */}
                <div className="hidden lg:block bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-700">
                  <div className="overflow-x-auto overflow-y-auto max-h-[400px]">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-900/50 text-gray-300 uppercase text-xs tracking-wider">
                        <tr>
                          <th className="px-4 py-4 text-left whitespace-nowrap">#</th>
                          <th className="px-4 py-4 text-left whitespace-nowrap">Profile</th>
                          <th className="px-4 py-4 text-left whitespace-nowrap">Name</th>
                          <th className="px-4 py-4 text-left whitespace-nowrap">Email</th>
                          <th className="px-4 py-4 text-left whitespace-nowrap">Provider</th>
                          <th className="px-4 py-4 text-left whitespace-nowrap">Role</th>
                          <th className="px-4 py-4 text-left whitespace-nowrap">Status</th>
                          <th className="px-4 py-4 text-left whitespace-nowrap">Plan</th>
                          <th className="px-4 py-4 text-left whitespace-nowrap">Login Count</th>
                          <th className="px-4 py-4 text-left whitespace-nowrap">IP Address</th>
                          <th className="px-4 py-4 text-left whitespace-nowrap">Device</th>
                          <th className="px-4 py-4 text-left whitespace-nowrap">Location</th>
                          <th className="px-4 py-4 text-left whitespace-nowrap">Created At</th>
                          <th className="px-4 py-4 text-left whitespace-nowrap">Last Login</th>
                          <th className="px-4 py-4 text-center whitespace-nowrap">Actions</th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-gray-700">
                        {users.length > 0 ? (
                          users.map((u, idx) => (
                            <tr key={u._id} className="hover:bg-gray-700/50 transition-colors">
                              {/* Index */}
                              <td className="px-4 py-4 font-medium text-gray-400">{idx + 1}</td>

                              {/* Profile Image */}
                              <td className="px-4 py-4">
                                {u.image ? (
                                  <img
                                    src={u.image}
                                    alt={u.name}
                                    className="w-10 h-10 rounded-full object-cover border border-gray-600"
                                  />
                                ) : (
                                  <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-gray-200">
                                    {u.name?.charAt(0)?.toUpperCase() || "U"}
                                  </div>
                                )}
                              </td>

                              {/* Basic Info */}
                              <td className="px-4 py-4 font-medium">{u.name}</td>
                              <td className="px-4 py-4 text-gray-300">{u.email}</td>
                              <td className="px-4 py-4 text-gray-400 text-xs">{u.provider || "N/A"}</td>

                              {/* Role */}
                              <td className="px-4 py-4">
                                <span className="px-2 py-1 bg-purple-600/30 text-purple-300 rounded-md text-xs font-semibold">
                                  {u.role}
                                </span>
                              </td>

                              {/* Status */}
                              <td className="px-4 py-4">
                                <span
                                  className={`px-2 py-1 rounded-md text-xs font-semibold ${u.status === "active"
                                    ? "bg-green-600/30 text-green-300"
                                    : "bg-red-600/30 text-red-300"
                                    }`}
                                >
                                  {u.status}
                                </span>
                              </td>

                              {/* Extra Info */}
                              <td className="px-4 py-4 text-gray-400 text-xs">{u.plan || "free"}</td>
                              <td className="px-4 py-4 text-center text-gray-400 text-xs">{u.loginCount ?? 0}</td>
                              <td className="px-4 py-4 text-gray-400 text-xs">{u.ipAddress || "Unknown"}</td>
                              <td className="px-4 py-4 text-gray-400 text-xs">{u.device || "Unknown"}</td>
                              <td className="px-4 py-4 text-gray-400 text-xs">{u.location || "N/A"}</td>

                              {/* Date Fields */}
                              <td className="px-4 py-4 text-gray-400 text-xs">
                                {new Date(u.createdAt).toLocaleString("en-IN", {
                                  dateStyle: "medium",
                                  timeStyle: "short",
                                })}
                              </td>
                              <td className="px-4 py-4 text-gray-400 text-xs">
                                {new Date(u.lastLogin).toLocaleString("en-IN", {
                                  dateStyle: "medium",
                                  timeStyle: "short",
                                })}
                              </td>

                              {/* Action Buttons */}
                              <td className="px-4 py-4">
                                <div className="flex items-center justify-center gap-2">
                                  {u.status === "active" ? (
                                    <button
                                      onClick={() => updateUserStatus(u._id, "banned")}
                                      className="bg-red-600 hover:bg-red-700 transition-colors px-3 py-1.5 rounded-lg text-xs font-semibold shadow-lg hover:shadow-red-600/50"
                                    >
                                      Ban
                                    </button>
                                  ) : (
                                    <button
                                      onClick={() => updateUserStatus(u._id, "active")}
                                      className="bg-green-600 hover:bg-green-700 transition-colors px-3 py-1.5 rounded-lg text-xs font-semibold shadow-lg hover:shadow-green-600/50"
                                    >
                                      Unban
                                    </button>
                                  )}
                                  <button
                                    onClick={() => deleteUser(u._id)}
                                    className="bg-gray-600 hover:bg-gray-700 transition-colors px-3 py-1.5 rounded-lg text-xs font-semibold shadow-lg"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="14" className="text-center py-12 text-gray-400">
                              <div className="flex flex-col items-center gap-2">
                                <span className="text-4xl">👤</span>
                                <p>No users found</p>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>



                {/* Mobile Card View */}
                <div className="lg:hidden space-y-4">
                  {users.length > 0 ? (
                    users.map((u, idx) => (
                      <div
                        key={u._id}
                        className="bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-700 space-y-3"
                      >
                        {/* Top Row: Profile, Name, Email, Role, Status */}
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            {/* Profile Image */}
                            {u.image ? (
                              <img
                                src={u.image}
                                alt={u.name}
                                className="w-12 h-12 rounded-full object-cover border border-gray-600"
                              />
                            ) : (
                              <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center text-gray-200">
                                {u.name?.charAt(0)?.toUpperCase() || "U"}
                              </div>
                            )}
                            <div className="min-w-0">
                              <p className="text-xs text-gray-400 mb-1">User #{idx + 1}</p>
                              <h3 className="font-semibold text-lg truncate">{u.name}</h3>
                              <p className="text-sm text-gray-400 truncate">{u.email}</p>
                              <p className="text-xs text-gray-400 truncate">Provider: {u.provider || "N/A"}</p>
                            </div>
                          </div>

                          <div className="flex gap-2 ml-2 flex-shrink-0">
                            <span className="px-2 py-1 bg-purple-600/30 text-purple-300 rounded-md text-xs font-semibold h-fit">
                              {u.role}
                            </span>
                            <span
                              className={`px-2 py-1 rounded-md text-xs font-semibold h-fit ${u.status === "active"
                                  ? "bg-green-600/30 text-green-300"
                                  : "bg-red-600/30 text-red-300"
                                }`}
                            >
                              {u.status}
                            </span>
                          </div>
                        </div>

                        {/* User Details Grid */}
                        <div className="grid grid-cols-2 gap-3 text-xs text-gray-200">
                          <div>
                            <p className="text-gray-400">Plan</p>
                            <p className="mt-1">{u.plan || "free"}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Login Count</p>
                            <p className="mt-1">{u.loginCount ?? 0}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">IP Address</p>
                            <p className="mt-1">{u.ipAddress || "Unknown"}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Device</p>
                            <p className="mt-1">{u.device || "Unknown"}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Location</p>
                            <p className="mt-1">{u.location || "N/A"}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Created At</p>
                            <p className="mt-1">{new Date(u.createdAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Last Login</p>
                            <p className="mt-1">{new Date(u.lastLogin).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</p>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 pt-2 border-t border-gray-700">
                          {u.status === "active" ? (
                            <button
                              onClick={() => updateUserStatus(u._id, "banned")}
                              className="flex-1 bg-red-600 hover:bg-red-700 transition-colors px-4 py-2 rounded-lg text-sm font-semibold shadow-lg"
                            >
                              Ban User
                            </button>
                          ) : (
                            <button
                              onClick={() => updateUserStatus(u._id, "active")}
                              className="flex-1 bg-green-600 hover:bg-green-700 transition-colors px-4 py-2 rounded-lg text-sm font-semibold shadow-lg"
                            >
                              Unban User
                            </button>
                          )}
                          <button
                            onClick={() => deleteUser(u._id)}
                            className="flex-1 bg-gray-600 hover:bg-gray-700 transition-colors px-4 py-2 rounded-lg text-sm font-semibold shadow-lg"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="bg-gray-800 rounded-xl p-12 text-center text-gray-400 border border-gray-700">
                      <span className="text-4xl block mb-2">👤</span>
                      <p>No users found</p>
                    </div>
                  )}
                </div>

              </div>
            )}

            {categories.includes(activeTab) && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-2xl md:text-3xl font-bold">
                    {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Forms
                  </h1>
                  <span className="px-3 py-1 bg-indigo-600 rounded-full text-sm font-medium">
                    {categorizedForms[activeTab]?.length || 0} Total
                  </span>
                </div>

                {/* Desktop Table View */}
                <div className="hidden lg:block bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-700">
                  <div className="overflow-x-auto overflow-y-auto max-h-[400px]">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-900/50 text-gray-300 uppercase text-xs tracking-wider">
                        <tr>
                          <th className="px-4 py-4 text-left whitespace-nowrap">#</th>
                          <th className="px-4 py-4 text-left whitespace-nowrap">Name</th>
                          <th className="px-4 py-4 text-left whitespace-nowrap">Email</th>
                          {activeTab === "contact" && (
                            <th className="px-4 py-4 text-left whitespace-nowrap">Phone</th>
                          )}
                          {activeTab === "contact" && (
                            <th className="px-4 py-4 text-left whitespace-nowrap">Subject</th>
                          )}
                          {activeTab === "services" && (
                            <th className="px-4 py-4 text-left whitespace-nowrap">Service</th>
                          )}
                          <th className="px-4 py-4 text-left whitespace-nowrap">Message</th>
                          <th className="px-4 py-4 text-left whitespace-nowrap">Submitted By</th>
                          <th className="px-4 py-4 text-left whitespace-nowrap">Submitted Email</th>
                          <th className="px-4 py-4 text-left whitespace-nowrap">Created At</th>
                          <th className="px-4 py-4 text-center whitespace-nowrap">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-700">
                        {categorizedForms[activeTab]?.length > 0 ? (
                          categorizedForms[activeTab].map((f, idx) => (
                            <tr key={f._id} className="hover:bg-gray-700/50 transition-colors">
                              <td className="px-4 py-4 whitespace-nowrap font-medium text-gray-400">{idx + 1}</td>
                              <td className="px-4 py-4 whitespace-nowrap font-medium">{f.name}</td>
                              <td className="px-4 py-4 whitespace-nowrap text-gray-300">{f.email}</td>
                              {activeTab === "contact" && (
                                <td className="px-4 py-4 whitespace-nowrap text-gray-300">{f.phone}</td>
                              )}
                              {activeTab === "contact" && (
                                <td className="px-4 py-4 whitespace-nowrap text-gray-300">{f.subject}</td>
                              )}
                              {activeTab === "services" && (
                                <td className="px-4 py-4 whitespace-nowrap">
                                  <span className="px-2 py-1 bg-blue-600/30 text-blue-300 rounded-md text-xs font-semibold">
                                    {f.service}
                                  </span>
                                </td>
                              )}
                              <td className="px-4 py-4 max-w-xs">
                                <p className="truncate text-gray-300">{f.message}</p>
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap text-gray-300">{f.submittedBy}</td>
                              <td className="px-4 py-4 whitespace-nowrap text-gray-300">{f.submittedEmail}</td>
                              <td className="px-4 py-4 whitespace-nowrap text-gray-400 text-xs">
                                {formatDate12Hour(f.createdAt)}
                              </td>
                              <td className="px-4 py-4 whitespace-nowrap">
                                <div className="flex justify-center">
                                  <button
                                    onClick={() => deleteForm(f._id)}
                                    className="bg-red-600 hover:bg-red-700 transition-colors px-3 py-1.5 rounded-lg text-xs font-semibold shadow-lg hover:shadow-red-600/50"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="12" className="text-center py-12 text-gray-400">
                              <div className="flex flex-col items-center gap-2">
                                <span className="text-4xl">📄</span>
                                <p>No {activeTab} forms found</p>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Mobile Card View */}
                <div className="lg:hidden space-y-4">
                  {categorizedForms[activeTab]?.length > 0 ? (
                    categorizedForms[activeTab].map((f, idx) => (
                      <div
                        key={f._id}
                        className="bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-700 space-y-3"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-gray-400 mb-1">Form #{idx + 1}</p>
                            <h3 className="font-semibold text-lg truncate">{f.name}</h3>
                            <p className="text-sm text-gray-400 truncate">{f.email}</p>
                          </div>
                        </div>

                        <div className="space-y-2 text-sm">
                          {activeTab === "contact" && f.phone && (
                            <div>
                              <p className="text-gray-400 text-xs">Phone</p>
                              <p className="text-gray-200">{f.phone}</p>
                            </div>
                          )}
                          {activeTab === "contact" && f.subject && (
                            <div>
                              <p className="text-gray-400 text-xs">Subject</p>
                              <p className="text-gray-200">{f.subject}</p>
                            </div>
                          )}
                          {activeTab === "services" && f.service && (
                            <div>
                              <p className="text-gray-400 text-xs">Service</p>
                              <span className="inline-block px-2 py-1 bg-blue-600/30 text-blue-300 rounded-md text-xs font-semibold mt-1">
                                {f.service}
                              </span>
                            </div>
                          )}
                          <div>
                            <p className="text-gray-400 text-xs">Message</p>
                            <p className="text-gray-200 line-clamp-3">{f.message}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-3 pt-2">
                            <div>
                              <p className="text-gray-400 text-xs">Submitted By</p>
                              <p className="text-gray-200 truncate">{f.submittedBy}</p>
                            </div>
                            <div>
                              <p className="text-gray-400 text-xs">Email</p>
                              <p className="text-gray-200 truncate">{f.submittedEmail}</p>
                            </div>
                          </div>
                          <div>
                            <p className="text-gray-400 text-xs">Created At</p>
                            <p className="text-gray-200">{formatDate12Hour(f.createdAt)}</p>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-gray-700">
                          <button
                            onClick={() => deleteForm(f._id)}
                            className="w-full bg-red-600 hover:bg-red-700 transition-colors px-4 py-2 rounded-lg text-sm font-semibold shadow-lg"
                          >
                            Delete Form
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="bg-gray-800 rounded-xl p-12 text-center text-gray-400 border border-gray-700">
                      <span className="text-4xl block mb-2">📄</span>
                      <p>No {activeTab} forms found</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}