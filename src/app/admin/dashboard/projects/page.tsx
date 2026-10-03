"use client";

import { useState, FormEvent } from "react";
import { Plus, Pencil, Trash2, X, Loader2, Save, AlertTriangle, ChevronDown } from "lucide-react";
import toast from "react-hot-toast";
import { usePortfolio } from "@/lib/PortfolioContext";
import type { Project } from "@/lib/types";

const emptyForm: Omit<Project, "id"> = {
  name: "",
  category: "Web Application",
  status: "Completed",
  shortDesc: "",
  description: "",
  problem: "",
  features: [],
  technologies: [],
  github: "",
  demo: "",
  image: "",
};

export default function AdminProjects() {
  const { projects, saveProject, deleteProjectItem } = usePortfolio();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState<Omit<Project, "id">>(emptyForm);
  const [techInput, setTechInput] = useState("");
  const [featInput, setFeatInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const openAdd = () => {
    setEditing(null);
    setForm(emptyForm);
    setTechInput("");
    setFeatInput("");
    setShowForm(true);
  };

  const openEdit = (project: Project) => {
    setEditing(project);
    setForm({ ...project });
    setTechInput("");
    setFeatInput("");
    setShowForm(true);
  };

  const addTech = () => {
    const t = techInput.trim();
    if (t && !form.technologies.includes(t)) {
      setForm((f) => ({ ...f, technologies: [...f.technologies, t] }));
    }
    setTechInput("");
  };

  const removeTech = (t: string) =>
    setForm((f) => ({ ...f, technologies: f.technologies.filter((x) => x !== t) }));

  const addFeat = () => {
    const feat = featInput.trim();
    if (feat) {
      setForm((f) => ({ ...f, features: [...f.features, feat] }));
    }
    setFeatInput("");
  };

  const removeFeat = (feat: string) =>
    setForm((f) => ({ ...f, features: f.features.filter((x) => x !== feat) }));

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) { toast.error("Project name required."); return; }
    setSaving(true);
    try {
      const itemToSave: Project = editing
        ? { ...editing, ...form }
        : { id: Date.now().toString(), ...form };
      await saveProject(itemToSave);
      toast.success(editing ? "Project updated!" : "Project added!");
      setShowForm(false);
    } catch {
      toast.error("Failed to save project.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProjectItem(id);
      setDeleteConfirm(null);
      toast.success("Project deleted.");
    } catch {
      toast.error("Failed to delete project.");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-display font-bold text-2xl text-slate-900">Projects</h2>
          <p className="text-slate-500 text-sm mt-1">{projects.length} completed projects</p>
        </div>
        <button onClick={openAdd} className="btn-primary text-sm" id="add-project-btn">
          <Plus size={16} /> Add Project
        </button>
      </div>

      {/* Projects list */}
      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project.id} className="bg-white border border-slate-200 rounded-2xl p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="badge badge-completed">✓ Completed</span>
                  <span className="badge badge-primary">{project.category}</span>
                </div>
                <h3 className="font-display font-bold text-slate-900 mb-1">{project.name}</h3>
                <p className="text-slate-500 text-sm line-clamp-2">{project.shortDesc}</p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {project.technologies.slice(0, 5).map((tech) => (
                    <span key={tech} className="badge badge-tech">{tech}</span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => openEdit(project)} className="p-2 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all" aria-label={`Edit ${project.name}`}>
                  <Pencil size={15} />
                </button>
                <button onClick={() => setDeleteConfirm(project.id)} className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all" aria-label={`Delete ${project.name}`}>
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h3 className="font-display font-bold text-xl text-slate-900">
                {editing ? "Edit Project" : "Add Project"}
              </h3>
              <button onClick={() => setShowForm(false)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-400">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="admin-label">Project Name</label>
                  <input className="admin-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Project name" required />
                </div>
                <div>
                  <label className="admin-label">Category</label>
                  <input className="admin-input" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="e.g. Web Application" />
                </div>
              </div>

              <div>
                <label className="admin-label">Short Description</label>
                <input className="admin-input" value={form.shortDesc} onChange={(e) => setForm({ ...form, shortDesc: e.target.value })} placeholder="One-line description for the card" />
              </div>

              <div>
                <label className="admin-label">Full Description</label>
                <textarea className="admin-textarea" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Detailed project description" />
              </div>

              <div>
                <label className="admin-label">Problem Solved</label>
                <textarea className="admin-textarea min-h-[80px]" value={form.problem} onChange={(e) => setForm({ ...form, problem: e.target.value })} placeholder="What problem does this project solve?" />
              </div>

              {/* Technologies */}
              <div>
                <label className="admin-label">Technologies</label>
                <div className="flex gap-2 mb-2">
                  <input className="admin-input" value={techInput} onChange={(e) => setTechInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTech())} placeholder="Add technology, press Enter" />
                  <button type="button" onClick={addTech} className="btn-primary text-sm px-4">Add</button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {form.technologies.map((t) => (
                    <span key={t} className="badge badge-primary flex items-center gap-1">
                      {t}
                      <button type="button" onClick={() => removeTech(t)} className="ml-1 hover:text-red-500" aria-label={`Remove ${t}`}><X size={10} /></button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <label className="admin-label">Key Features</label>
                <div className="flex gap-2 mb-2">
                  <input className="admin-input" value={featInput} onChange={(e) => setFeatInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addFeat())} placeholder="Add feature, press Enter" />
                  <button type="button" onClick={addFeat} className="btn-primary text-sm px-4">Add</button>
                </div>
                <ul className="space-y-1.5">
                  {form.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                      {f}
                      <button type="button" onClick={() => removeFeat(f)} className="ml-auto text-slate-400 hover:text-red-500" aria-label={`Remove feature: ${f}`}><X size={12} /></button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="admin-label">GitHub URL</label>
                  <input className="admin-input" type="url" value={form.github} onChange={(e) => setForm({ ...form, github: e.target.value })} placeholder="https://github.com/..." />
                </div>
                <div>
                  <label className="admin-label">Live Demo URL</label>
                  <input className="admin-input" type="url" value={form.demo} onChange={(e) => setForm({ ...form, demo: e.target.value })} placeholder="https://..." />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving} className="btn-primary flex-1 justify-center" id="save-project-btn">
                  {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
                  {editing ? "Update Project" : "Add Project"}
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="btn-ghost">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteConfirm && (
        <div className="modal-backdrop" role="alertdialog">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle size={22} className="text-red-500" />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Delete Project?</h3>
            <p className="text-slate-500 text-sm mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors" id="confirm-delete-project">Delete</button>
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 btn-ghost justify-center">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
