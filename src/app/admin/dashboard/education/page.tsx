"use client";

import { useState, FormEvent } from "react";
import { Plus, Pencil, Trash2, X, Loader2, Save, AlertTriangle } from "lucide-react";
import toast from "react-hot-toast";
import { usePortfolio } from "@/lib/PortfolioContext";
import type { Education } from "@/lib/types";

const emptyForm: Omit<Education, "id"> = {
  institution: "", location: "", degree: "", period: "", grade: "", type: "University", current: false,
};

export default function AdminEducation() {
  const { education: items, saveEducationItem, deleteEducationItem } = usePortfolio();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Education | null>(null);
  const [form, setForm] = useState<Omit<Education, "id">>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const openAdd = () => { setEditing(null); setForm(emptyForm); setShowForm(true); };
  const openEdit = (edu: Education) => { setEditing(edu); setForm({ institution: edu.institution, location: edu.location, degree: edu.degree, period: edu.period, grade: edu.grade, type: edu.type, current: edu.current }); setShowForm(true); };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.institution.trim()) { toast.error("Institution required."); return; }
    setSaving(true);
    try {
      const itemToSave: Education = editing
        ? { ...editing, ...form }
        : { id: Date.now().toString(), ...form };
      await saveEducationItem(itemToSave);
      toast.success(editing ? "Updated!" : "Added!");
      setShowForm(false);
    } catch { toast.error("Failed to save."); } finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteEducationItem(id);
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
          <h2 className="font-display font-bold text-2xl text-slate-900">Education</h2>
          <p className="text-slate-500 text-sm mt-1">{items.length} education entries</p>
        </div>
        <button onClick={openAdd} className="btn-primary text-sm" id="add-education-btn"><Plus size={16} /> Add Education</button>
      </div>

      <div className="space-y-4">
        {items.map((edu) => (
          <div key={edu.id} className="bg-white border border-slate-200 rounded-2xl p-5 flex items-start justify-between gap-4">
            <div>
              {edu.current && <span className="badge badge-primary mb-2 inline-flex">Current</span>}
              <h3 className="font-bold text-slate-900">{edu.degree}</h3>
              <p className="text-indigo-600 text-sm font-medium">{edu.institution}</p>
              <p className="text-slate-400 text-xs mt-0.5">{edu.location} · {edu.period}</p>
              {edu.grade && <p className="text-slate-500 text-sm mt-1 font-medium">{edu.grade}</p>}
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => openEdit(edu)} className="p-2 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50" aria-label={`Edit ${edu.institution}`}><Pencil size={15} /></button>
              <button onClick={() => setDeleteConfirm(edu.id)} className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50" aria-label={`Delete ${edu.institution}`}><Trash2 size={15} /></button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h3 className="font-display font-bold text-xl text-slate-900">{editing ? "Edit" : "Add"} Education</h3>
              <button onClick={() => setShowForm(false)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-400"><X size={18} /></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div><label className="admin-label">Institution</label><input className="admin-input" value={form.institution} onChange={(e) => setForm({ ...form, institution: e.target.value })} required /></div>
              <div><label className="admin-label">Degree / Program</label><input className="admin-input" value={form.degree} onChange={(e) => setForm({ ...form, degree: e.target.value })} /></div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className="admin-label">Location</label><input className="admin-input" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} /></div>
                <div><label className="admin-label">Period</label><input className="admin-input" value={form.period} onChange={(e) => setForm({ ...form, period: e.target.value })} placeholder="2023 – 2027" /></div>
              </div>
              <div><label className="admin-label">Grade / CGPA</label><input className="admin-input" value={form.grade} onChange={(e) => setForm({ ...form, grade: e.target.value })} placeholder="CGPA: 7.73" /></div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="is-current" checked={form.current} onChange={(e) => setForm({ ...form, current: e.target.checked })} className="w-4 h-4 accent-indigo-600" />
                <label htmlFor="is-current" className="text-sm font-medium text-slate-700">Currently studying here</label>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving} className="btn-primary flex-1 justify-center" id="save-education-btn">{saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}{editing ? "Update" : "Add"}</button>
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
            <h3 className="font-bold text-slate-900 mb-2">Delete Education Entry?</h3>
            <p className="text-slate-500 text-sm mb-6">This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600" id="confirm-delete-education">Delete</button>
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 btn-ghost justify-center">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
