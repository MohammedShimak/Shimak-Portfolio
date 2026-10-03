"use client";

import { useState, FormEvent } from "react";
import { Plus, Pencil, Trash2, X, Loader2, Save, AlertTriangle } from "lucide-react";
import toast from "react-hot-toast";
import { usePortfolio } from "@/lib/PortfolioContext";
import type { UpcomingProject } from "@/lib/types";

const emptyForm: Omit<UpcomingProject, "id"> = {
  name: "",
  category: "AI / ML",
  status: "Coming Soon",
  shortDesc: "",
  description: "",
  technologies: [],
};

export default function AdminUpcoming() {
  const { upcomingProjects, saveUpcomingProject, deleteUpcomingProjectItem } = usePortfolio();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<UpcomingProject | null>(null);
  const [form, setForm] = useState<Omit<UpcomingProject, "id">>(emptyForm);
  const [techInput, setTechInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const openAdd = () => { setEditing(null); setForm(emptyForm); setTechInput(""); setShowForm(true); };
  const openEdit = (p: UpcomingProject) => { setEditing(p); setForm({ ...p }); setTechInput(""); setShowForm(true); };

  const addTech = () => {
    const t = techInput.trim();
    if (t && !form.technologies.includes(t)) setForm((f) => ({ ...f, technologies: [...f.technologies, t] }));
    setTechInput("");
  };
  const removeTech = (t: string) => setForm((f) => ({ ...f, technologies: f.technologies.filter((x) => x !== t) }));

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) { toast.error("Name required."); return; }
    setSaving(true);
    try {
      const itemToSave: UpcomingProject = editing
        ? { ...editing, ...form }
        : { id: Date.now().toString(), ...form };
      await saveUpcomingProject(itemToSave);
      toast.success(editing ? "Updated!" : "Added!");
      setShowForm(false);
    } catch { toast.error("Failed to save."); } finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteUpcomingProjectItem(id);
      setDeleteConfirm(null);
      toast.success("Deleted.");
    } catch {
      toast.error("Failed to delete.");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-display font-bold text-2xl text-slate-900">Upcoming Projects</h2>
          <p className="text-slate-500 text-sm mt-1">{upcomingProjects.length} upcoming projects</p>
        </div>
        <button onClick={openAdd} className="btn-primary text-sm" id="add-upcoming-btn"><Plus size={16} /> Add Upcoming</button>
      </div>

      <div className="space-y-4">
        {upcomingProjects.map((project: UpcomingProject) => (
          <div key={project.id} className="bg-white border-2 border-dashed border-slate-200 rounded-2xl p-5 flex items-start justify-between gap-4">
            <div>
              <div className="flex gap-2 mb-2">
                <span className="badge badge-coming-soon">Coming Soon</span>
                <span className="badge badge-primary">{project.category}</span>
              </div>
              <h3 className="font-bold text-slate-900">{project.name}</h3>
              <p className="text-slate-500 text-sm mt-1 line-clamp-2">{project.shortDesc}</p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {project.technologies.map((t) => <span key={t} className="badge badge-tech">{t}</span>)}
              </div>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => openEdit(project)} className="p-2 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all" aria-label={`Edit ${project.name}`}><Pencil size={15} /></button>
              <button onClick={() => setDeleteConfirm(project.id)} className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all" aria-label={`Delete ${project.name}`}><Trash2 size={15} /></button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h3 className="font-display font-bold text-xl text-slate-900">{editing ? "Edit" : "Add"} Upcoming Project</h3>
              <button onClick={() => setShowForm(false)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-400"><X size={18} /></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="admin-label">Name</label>
                <input className="admin-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Project name" required />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="admin-label">Category</label>
                  <input className="admin-input" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
                </div>
                <div>
                  <label className="admin-label">Status</label>
                  <input className="admin-input" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} />
                </div>
              </div>
              <div>
                <label className="admin-label">Short Description</label>
                <input className="admin-input" value={form.shortDesc} onChange={(e) => setForm({ ...form, shortDesc: e.target.value })} placeholder="One-line description" />
              </div>
              <div>
                <label className="admin-label">Full Description</label>
                <textarea className="admin-textarea" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>
              <div>
                <label className="admin-label">Technologies</label>
                <div className="flex gap-2 mb-2">
                  <input className="admin-input" value={techInput} onChange={(e) => setTechInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTech())} placeholder="Add tech, Enter to add" />
                  <button type="button" onClick={addTech} className="btn-primary text-sm px-4">Add</button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {form.technologies.map((t) => (
                    <span key={t} className="badge badge-primary flex items-center gap-1">
                      {t}<button type="button" onClick={() => removeTech(t)}><X size={10} /></button>
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving} className="btn-primary flex-1 justify-center" id="save-upcoming-btn">
                  {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
                  {editing ? "Update" : "Add"}
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="btn-ghost">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteConfirm && (
        <div className="modal-backdrop" role="alertdialog">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4"><AlertTriangle size={22} className="text-red-500" /></div>
            <h3 className="font-bold text-slate-900 mb-2">Delete Project?</h3>
            <p className="text-slate-500 text-sm mb-6">This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600" id="confirm-delete-upcoming">Delete</button>
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 btn-ghost justify-center">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
