"use client";

import { useState, FormEvent } from "react";
import { Plus, Pencil, Trash2, X, Loader2, Save, AlertTriangle } from "lucide-react";
import toast from "react-hot-toast";
import { usePortfolio } from "@/lib/PortfolioContext";
import type { Achievement } from "@/lib/types";

const emptyForm: Omit<Achievement, "id"> = { title: "", event: "", organizer: "", year: "", description: "", type: "Competition" };
const types = ["Research", "Competition", "Award", "Other"];

export default function AdminAchievements() {
  const { achievements: items, saveAchievementItem, deleteAchievementItem } = usePortfolio();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Achievement | null>(null);
  const [form, setForm] = useState<Omit<Achievement, "id">>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const openAdd = () => { setEditing(null); setForm(emptyForm); setShowForm(true); };
  const openEdit = (a: Achievement) => { setEditing(a); setForm({ title: a.title, event: a.event, organizer: a.organizer, year: a.year, description: a.description, type: a.type }); setShowForm(true); };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) { toast.error("Title required."); return; }
    setSaving(true);
    try {
      const itemToSave: Achievement = editing
        ? { ...editing, ...form }
        : { id: Date.now().toString(), ...form };
      await saveAchievementItem(itemToSave);
      toast.success(editing ? "Updated!" : "Added!");
      setShowForm(false);
    } catch { toast.error("Failed to save."); } finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteAchievementItem(id);
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
          <h2 className="font-display font-bold text-2xl text-slate-900">Achievements</h2>
          <p className="text-slate-500 text-sm mt-1">{items.length} achievements</p>
        </div>
        <button onClick={openAdd} className="btn-primary text-sm" id="add-achievement-btn"><Plus size={16} /> Add Achievement</button>
      </div>

      <div className="space-y-4">
        {items.map((a) => (
          <div key={a.id} className="bg-white border border-slate-200 rounded-2xl p-5 flex items-start justify-between gap-4">
            <div>
              <div className="flex gap-2 mb-2">
                <span className="badge badge-primary">{a.type}</span>
                {a.year && <span className="text-slate-400 text-xs font-medium self-center">{a.year}</span>}
              </div>
              <h3 className="font-bold text-slate-900 mb-0.5">{a.title}</h3>
              <p className="text-indigo-600 text-sm font-medium">{a.event}</p>
              <p className="text-slate-500 text-xs mt-0.5">{a.organizer}</p>
              {a.description && <p className="text-slate-500 text-sm mt-2 line-clamp-2">{a.description}</p>}
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => openEdit(a)} className="p-2 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50" aria-label={`Edit ${a.title}`}><Pencil size={15} /></button>
              <button onClick={() => setDeleteConfirm(a.id)} className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50" aria-label={`Delete ${a.title}`}><Trash2 size={15} /></button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h3 className="font-display font-bold text-xl text-slate-900">{editing ? "Edit" : "Add"} Achievement</h3>
              <button onClick={() => setShowForm(false)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-400"><X size={18} /></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div><label className="admin-label">Title</label><input className="admin-input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Paper Presentation" required /></div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className="admin-label">Event / Conference</label><input className="admin-input" value={form.event} onChange={(e) => setForm({ ...form, event: e.target.value })} /></div>
                <div><label className="admin-label">Type</label><select className="admin-input" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>{types.map((t) => <option key={t}>{t}</option>)}</select></div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className="admin-label">Organizer</label><input className="admin-input" value={form.organizer} onChange={(e) => setForm({ ...form, organizer: e.target.value })} /></div>
                <div><label className="admin-label">Year</label><input className="admin-input" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} placeholder="2025" /></div>
              </div>
              <div><label className="admin-label">Description</label><textarea className="admin-textarea" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving} className="btn-primary flex-1 justify-center" id="save-achievement-btn">{saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}{editing ? "Update" : "Add"}</button>
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
            <h3 className="font-bold text-slate-900 mb-2">Delete Achievement?</h3>
            <p className="text-slate-500 text-sm mb-6">This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600" id="confirm-delete-achievement">Delete</button>
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 btn-ghost justify-center">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
