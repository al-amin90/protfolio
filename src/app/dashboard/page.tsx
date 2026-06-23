"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast"; // ← Add this import
import {
  FiPlus,
  FiTrash2,
  FiEdit2,
  FiArrowUp,
  FiArrowDown,
  FiLogOut,
  FiGrid,
  FiList,
  FiUpload,
  FiX,
  FiCheck,
  FiLoader,
  FiImage,
  FiTag,
  FiLink,
  FiEye,
  FiGithub,
  FiMenu,
} from "react-icons/fi";
import Image from "next/image";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Project = {
  _id: string;
  title: string;
  description: string;
  image?: string;
  tags?: string[];
  liveLink?: string;
  sourceLink?: string;
  order?: number;
};

// ─── Sortable Project Card ──────────────────────────────────────────────────

function SortableProjectCard({
  project,
  index,
  viewMode,
  onDelete,
  onEdit,
  onMove,
}: {
  project: Project;
  index: number;
  viewMode: "grid" | "list";
  onDelete: (id: string) => void;
  onEdit: (project: Project) => void;
  onMove: (id: string, dir: number) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: project._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...attributes}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className={`group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-[#6431FE]/30 transition-all duration-300 ${
        viewMode === "grid" ? "p-4" : "p-4 flex items-center gap-4"
      } ${isDragging ? "shadow-2xl shadow-[#6431FE]/30 z-50" : ""}`}
    >
      <div
        {...listeners}
        className="cursor-grab active:cursor-grabbing p-1.5 rounded-lg hover:bg-white/10 text-gray-500 hover:text-white transition-all flex-shrink-0"
      >
        <FiMenu className="text-sm" />
      </div>

      {viewMode === "grid" ? (
        // Grid View
        <div className="flex-1 min-w-0">
          <div className="relative w-full h-48 rounded-lg overflow-hidden bg-gradient-to-br from-[#6431FE]/10 to-[#B696FF]/10 mb-3">
            {project.image ? (
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <FiImage className="text-4xl" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            {project.tags && project.tags.length > 0 && (
              <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
                {project.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 bg-black/50 backdrop-blur-sm rounded-full text-xs text-white"
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 2 && (
                  <span className="px-2 py-0.5 bg-black/50 backdrop-blur-sm rounded-full text-xs text-white">
                    +{project.tags.length - 2}
                  </span>
                )}
              </div>
            )}
          </div>

          <div>
            <h3 className="text-white font-semibold mb-1">{project.title}</h3>
            <p className="text-gray-400 text-sm line-clamp-2 mb-3">
              {project.description || "No description"}
            </p>

            <div className="flex items-center gap-1 justify-between">
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-500">
                  Order: {project.order || index + 1}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onEdit(project)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-[#6431FE]/20 text-gray-400 hover:text-[#6431FE] transition-all"
                >
                  <FiEdit2 className="text-xs" />
                </button>
                <button
                  onClick={() => onDelete(project._id)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-all"
                >
                  <FiTrash2 className="text-xs" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // List View
        <>
          <div className="flex-1 flex items-center gap-4 min-w-0">
            <div className="w-12 h-12 rounded-lg overflow-hidden bg-gradient-to-br from-[#6431FE]/10 to-[#B696FF]/10 flex-shrink-0">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <FiImage className="text-xl" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-semibold truncate">
                {project.title}
              </h3>
              <p className="text-gray-400 text-sm truncate">
                {project.description || "No description"}
              </p>
            </div>
            {project.tags && project.tags.length > 0 && (
              <div className="hidden md:flex flex-wrap gap-1">
                {project.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 bg-white/5 rounded-full text-xs text-gray-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              onClick={() => onEdit(project)}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-[#6431FE]/20 text-gray-400 hover:text-[#6431FE] transition-all"
            >
              <FiEdit2 />
            </button>
            <button
              onClick={() => onDelete(project._id)}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-all"
            >
              <FiTrash2 />
            </button>
          </div>
        </>
      )}
    </motion.div>
  );
}

// ─── Main Dashboard ─────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const router = useRouter();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    try {
      const res = await fetch("/api/projects");
      if (res.status === 401) {
        toast.error("Session expired. Please login again.");
        return router.push("/login");
      }
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      toast.error("Failed to load projects");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) {
        toast.success("Logged out successfully");
        router.push("/login");
      } else {
        toast.error("Logout failed");
      }
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this project?")) return;

    // Optimistic update
    const previousProjects = [...projects];
    setProjects(projects.filter((p) => p._id !== id));

    const toastId = toast.loading("Deleting project...");

    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Project deleted successfully", { id: toastId });
      } else {
        setProjects(previousProjects);
        toast.error("Failed to delete project", { id: toastId });
      }
    } catch (error) {
      setProjects(previousProjects);
      toast.error("Failed to delete project", { id: toastId });
    }
  }

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = projects.findIndex((p) => p._id === active.id);
    const newIndex = projects.findIndex((p) => p._id === over.id);

    const newProjects = arrayMove(projects, oldIndex, newIndex);
    setProjects(newProjects);

    const toastId = toast.loading("Updating order...");

    try {
      const res = await fetch("/api/projects/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order: newProjects.map((p) => p._id),
        }),
      });

      if (res.ok) {
        toast.success("Order updated successfully", { id: toastId });
        await fetchProjects();
      } else {
        toast.error("Failed to update order", { id: toastId });
        await fetchProjects();
      }
    } catch (error) {
      toast.error("Failed to update order", { id: toastId });
      await fetchProjects();
    }
  }

  async function handleMove(id: string, dir: number) {
    const idx = projects.findIndex((p) => p._id === id);
    if (idx === -1) return;
    const newProjects = [...projects];
    const swapIdx = idx + dir;
    if (swapIdx < 0 || swapIdx >= newProjects.length) return;
    [newProjects[idx], newProjects[swapIdx]] = [
      newProjects[swapIdx],
      newProjects[idx],
    ];
    setProjects(newProjects);

    const toastId = toast.loading("Updating order...");

    try {
      const res = await fetch("/api/projects/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order: newProjects.map((p) => p._id),
        }),
      });

      if (res.ok) {
        toast.success("Order updated successfully", { id: toastId });
        await fetchProjects();
      } else {
        toast.error("Failed to update order", { id: toastId });
        await fetchProjects();
      }
    } catch (error) {
      toast.error("Failed to update order", { id: toastId });
      await fetchProjects();
    }
  }

  return (
    <div className="min-h-screen ">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#6431FE]/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#B696FF]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-[1480px] mx-auto px-4 py-6 md:py-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Dashboard
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Manage your projects • Drag to reorder
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2.5 rounded-xl transition-all duration-300 ${
                viewMode === "grid"
                  ? "bg-gradient-to-r from-[#6431FE] to-[#B696FF] text-white shadow-lg shadow-[#6431FE]/20"
                  : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
              }`}
            >
              <FiGrid className="text-lg" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2.5 rounded-xl transition-all duration-300 ${
                viewMode === "list"
                  ? "bg-gradient-to-r from-[#6431FE] to-[#B696FF] text-white shadow-lg shadow-[#6431FE]/20"
                  : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
              }`}
            >
              <FiList className="text-lg" />
            </button>

            <button
              onClick={handleLogout}
              className="px-4 py-2.5 bg-white/5 hover:bg-red-500/20 border border-white/10 rounded-xl text-gray-300 hover:text-red-400 transition-all duration-300 flex items-center gap-2"
            >
              <FiLogOut />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: "Total Projects", value: projects.length, icon: FiGrid },
            {
              label: "Published",
              value: projects.filter((p) => p.liveLink).length,
              icon: FiCheck,
            },
            {
              label: "With Images",
              value: projects.filter((p) => p.image).length,
              icon: FiImage,
            },
            {
              label: "Draft",
              value: projects.filter((p) => !p.liveLink).length,
              icon: FiEdit2,
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#6431FE]/20 to-[#B696FF]/20 flex items-center justify-center">
                  <stat.icon className="text-[#6431FE]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-gray-400">{stat.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Add Project Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <button
            onClick={() => setShowAddModal(true)}
            className="w-full p-4 border-2 border-dashed border-white/10 rounded-xl hover:border-[#6431FE]/50 transition-all duration-300 text-gray-400 hover:text-white flex items-center justify-center gap-2 group"
          >
            <FiPlus className="group-hover:rotate-90 transition-transform duration-300" />
            <span>Add New Project</span>
          </button>
        </motion.div>

        {/* Projects with Drag & Drop */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <FiLoader className="text-3xl text-[#6431FE] animate-spin" />
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No projects yet
            </h3>
            <p className="text-gray-400">
              Click the "Add New Project" button to get started
            </p>
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={projects.map((p) => p._id)}
              strategy={
                viewMode === "grid"
                  ? horizontalListSortingStrategy
                  : verticalListSortingStrategy
              }
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                    : "space-y-3"
                }
              >
                <AnimatePresence>
                  {projects.map((project, index) => (
                    <SortableProjectCard
                      key={project._id}
                      project={project}
                      index={index}
                      viewMode={viewMode}
                      onDelete={handleDelete}
                      onEdit={setEditingProject}
                      onMove={handleMove}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            </SortableContext>
          </DndContext>
        )}
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {(showAddModal || editingProject) && (
          <ProjectFormModal
            project={editingProject}
            onClose={() => {
              setShowAddModal(false);
              setEditingProject(null);
            }}
            onSuccess={() => {
              setShowAddModal(false);
              setEditingProject(null);
              fetchProjects();
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Project Form Modal ────────────────────────────────────────────────────

function ProjectFormModal({
  project,
  onClose,
  onSuccess,
}: {
  project?: Project | null;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [title, setTitle] = useState(project?.title || "");
  const [description, setDescription] = useState(project?.description || "");
  const [tags, setTags] = useState(project?.tags?.join(", ") || "");
  const [liveLink, setLiveLink] = useState(project?.liveLink || "");
  const [sourceLink, setSourceLink] = useState(project?.sourceLink || "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(project?.image || "");
  const [submitting, setSubmitting] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    const toastId = toast.loading(
      project ? "Updating project..." : "Adding project...",
    );

    try {
      let imageUrl = imagePreview;
      if (imageFile) {
        const fd = new FormData();
        fd.append("image", imageFile);
        const r = await fetch("/api/projects/upload", {
          method: "POST",
          body: fd,
        });
        const j = await r.json();
        if (!r.ok) {
          toast.error("Failed to upload image", { id: toastId });
          setSubmitting(false);
          return;
        }
        imageUrl = j.url;
      }

      const url = project ? `/api/projects/${project._id}` : "/api/projects";
      const method = project ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          tags: tags
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
          image: imageUrl,
          liveLink,
          sourceLink,
        }),
      });
      console.log("title", title);

      console.log("res", res);

      if (res.ok) {
        toast.success(
          project
            ? "Project updated successfully"
            : "Project added successfully",
          { id: toastId },
        );
        onSuccess();
      } else {
        const error = await res.json();
        toast.error(error?.message || "Failed to save project", {
          id: toastId,
        });
      }
    } catch (error) {
      toast.error("Failed to save project", { id: toastId });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-2xl bg-[#1a1b26] border border-white/10 rounded-2xl shadow-2xl shadow-[#6431FE]/10 p-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
        >
          <FiX />
        </button>

        <h2 className="text-2xl font-bold text-white mb-6">
          {project ? "Edit Project" : "Add New Project"}
        </h2>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Title *
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Project title"
              required
              className="w-full px-4 py-3 bg-[#0a0a1a]/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6431FE]/50 focus:border-[#6431FE] transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Project description"
              rows={3}
              className="w-full px-4 py-3 bg-[#0a0a1a]/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6431FE]/50 focus:border-[#6431FE] transition-all resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Tags (comma separated)
            </label>
            <input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="React, Next.js, TypeScript"
              className="w-full px-4 py-3 bg-[#0a0a1a]/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6431FE]/50 focus:border-[#6431FE] transition-all"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Live Link
              </label>
              <input
                value={liveLink}
                onChange={(e) => setLiveLink(e.target.value)}
                placeholder="https://..."
                className="w-full px-4 py-3 bg-[#0a0a1a]/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6431FE]/50 focus:border-[#6431FE] transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Source Link
              </label>
              <input
                value={sourceLink}
                onChange={(e) => setSourceLink(e.target.value)}
                placeholder="https://github.com/..."
                className="w-full px-4 py-3 bg-[#0a0a1a]/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6431FE]/50 focus:border-[#6431FE] transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Image
            </label>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setImageFile(file);
                      setImagePreview(URL.createObjectURL(file));
                    }
                  }}
                  className="w-full px-4 py-3 bg-[#0a0a1a]/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6431FE]/50 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#6431FE] file:text-white hover:file:bg-[#6431FE]/80"
                />
              </div>
              {imagePreview && (
                <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={submitting}
              className={`flex-1 py-3 rounded-xl font-semibold text-white transition-all duration-300 ${
                submitting
                  ? "bg-gradient-to-r from-[#6431FE]/50 to-[#B696FF]/50 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#6431FE] to-[#B696FF] hover:shadow-lg hover:shadow-[#6431FE]/30"
              }`}
            >
              {submitting ? (
                <span className="flex items-center justify-center gap-2">
                  <FiLoader className="animate-spin" />
                  {project ? "Saving..." : "Adding..."}
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <FiCheck />
                  {project ? "Update Project" : "Add Project"}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 text-gray-400 hover:text-white transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
