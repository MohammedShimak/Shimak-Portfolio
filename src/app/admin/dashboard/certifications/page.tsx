"use client";

import { useState, FormEvent } from "react";
import { Plus, Pencil, Trash2, X, Loader2, Save, AlertTriangle } from "lucide-react";
import toast from "react-hot-toast";
import { usePortfolio } from "@/lib/PortfolioContext";
import type { Certification } from "@/lib/types";

const emptyForm: Omit<Certification, "id"> = { name: "", issuer: "", year: "", url: "" };

export default function AdminCertifications() {
  const { certifications: certs, saveCertificationItem, deleteCertificationItem } = usePortfolio();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Certification | null>(null);
  const [form, setForm] = useState<Omit<Certification, "id">>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const openAdd = () => { setEditing(null); setForm(emptyForm); setShowForm(true); };
  const openEdit = (c: Certification) => { setEditing(c); setForm({ name: c.name, issuer: c.issuer, year: c.year, url: c.url }); setShowForm(true); };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) { toast.error("Name required."); return; }
    setSaving(true);
    try {
      const itemToSave: Certification = editing
        ? { ...editing, ...form }
        : { id: Date.now().toString(), ...form };
      await saveCertificationItem(itemToSave);
      toast.success(editing ? "Updated!" : "Added!");
      setShowForm(false);
    } catch { toast.error("Failed to save."); } finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCertificationItem(id);
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
          <h2 className="font-display font-bold text-2xl text-slate-900">Certifications</h2>
          <p className="text-slate-500 text-sm mt-1">{certs.length} certifications</p>
        </div>
        <button onClick={openAdd} className="btn-primary text-sm" id="add-cert-btn"><Plus size={16} /> Add Certification</button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {certs.map((cert) => (
          <div key={cert.id} className="bg-white border border-slate-200 rounded-2xl p-5">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-slate-900 text-sm leading-tight mb-1">{cert.name}</h3>
                <p className="text-slate-500 text-xs">{cert.issuer}</p>
                {cert.year && <span className="badge badge-primary text-xs mt-2 inline-flex">{cert.year}</span>}
              </div>
              <div className="flex gap-1.5 ml-2 flex-shrink-0">
                <button onClick={() => openEdit(cert)} className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50" aria-label={`Edit ${cert.name}`}><Pencil size={13} /></button>
                <button onClick={() => setDeleteConfirm(cert.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50" aria-label={`Delete ${cert.name}`}><Trash2 size={13} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h3 className="font-display font-bold text-xl text-slate-900">{editing ? "Edit" : "Add"} Certification</h3>
              <button onClick={() => setShowForm(false)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-400"><X size={18} /></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div><label className="admin-label">Certification Name</label><input className="admin-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. MERN Stack Development" required /></div>
              <div><label className="admin-label">Issuer / Organization</label><input className="admin-input" value={form.issuer} onChange={(e) => setForm({ ...form, issuer: e.target.value })} placeholder="e.g. Yellowmatics" /></div>
              <div><label className="admin-label">Year</label><input className="admin-input" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} placeholder="e.g. 2025" /></div>
              <div><label className="admin-label">Certificate URL (optional)</label><input className="admin-input" type="url" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} placeholder="https://..." /></div>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving} className="btn-primary flex-1 justify-center" id="save-cert-btn">{saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}{editing ? "Update" : "Add"}</button>
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
            <h3 className="font-bold text-slate-900 mb-2">Delete Certification?</h3>
            <p className="text-slate-500 text-sm mb-6">This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600" id="confirm-delete-cert">Delete</button>
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 btn-ghost justify-center">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
