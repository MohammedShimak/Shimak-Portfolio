"use client";

import { useState, FormEvent } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Loader2,
  Save,
  AlertTriangle,
} from "lucide-react";
import toast from "react-hot-toast";
import { usePortfolio } from "@/lib/PortfolioContext";
import type { Skill } from "@/lib/types";

const categories = [
  "Programming",
  "Web Technologies",
  "Database",
  "Core Concepts",
  "Tools",
  "AI / ML",
];
const levels = ["Beginner", "Intermediate", "Advanced", "Expert"];

type SkillForm = Omit<Skill, "id">;

const emptyForm: SkillForm = { category: categories[0], name: "", level: "Beginner" };

export default function AdminSkills() {
  const { skills, saveSkill, deleteSkillItem } = usePortfolio();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Skill | null>(null);
  const [form, setForm] = useState<SkillForm>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const openAdd = () => {
    setEditing(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (skill: Skill) => {
    setEditing(skill);
    setForm({ category: skill.category, name: skill.name, level: skill.level });
    setShowForm(true);
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error("Skill name is required.");
      return;
    }
    setSaving(true);
    try {
      const itemToSave: Skill = editing
        ? { ...editing, ...form }
        : { id: Date.now().toString(), ...form };
      await saveSkill(itemToSave);
      toast.success(editing ? "Skill updated!" : "Skill added!");
      setShowForm(false);
    } catch {
      toast.error("Failed to save skill.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteSkillItem(id);
      setDeleteConfirm(null);
      toast.success("Skill deleted.");
    } catch {
      toast.error("Failed to delete skill.");
    }
  };

  const grouped = categories.map((cat) => ({
    cat,
    items: skills.filter((s) => s.category === cat),
  }));

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-display font-bold text-2xl text-slate-900">
            Skills
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            {skills.length} skills across {categories.length} categories
          </p>
        </div>
        <button
          onClick={openAdd}
          className="btn-primary text-sm"
          id="add-skill-btn"
        >
          <Plus size={16} />
          Add Skill
        </button>
      </div>

      {/* Skills grouped by category */}
      <div className="space-y-8">
        {grouped.map(({ cat, items }) => (
          <div key={cat}>
            <h3 className="font-semibold text-slate-700 text-sm uppercase tracking-wider mb-3">
              {cat}{" "}
              <span className="ml-1 text-slate-400 font-normal">
                ({items.length})
              </span>
            </h3>
            {items.length === 0 ? (
              <p className="text-slate-400 text-sm italic">
                No skills in this category yet.
              </p>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {items.map((skill) => (
                  <div
                    key={skill.id}
                    className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between gap-3"
                  >
                    <div>
                      <p className="font-medium text-slate-800 text-sm">
                        {skill.name}
                      </p>
                      <p className="text-slate-400 text-xs mt-0.5">
                        {skill.level}
                      </p>
                    </div>
                    <div className="flex gap-1.5 flex-shrink-0">
                      <button
                        onClick={() => openEdit(skill)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
                        aria-label={`Edit skill: ${skill.name}`}
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(skill.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
                        aria-label={`Delete skill: ${skill.name}`}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add/Edit modal */}
      {showForm && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display font-bold text-lg text-slate-900">
                {editing ? "Edit Skill" : "Add Skill"}
              </h3>
              <button
                onClick={() => setShowForm(false)}
                className="p-2 hover:bg-slate-100 rounded-lg text-slate-400"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="admin-label">Skill Name</label>
                <input
                  className="admin-input"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Java"
                  required
                  autoFocus
                />
              </div>
              <div>
                <label className="admin-label">Category</label>
                <select
                  className="admin-input"
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                >
                  {categories.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="admin-label">Level</label>
                <select
                  className="admin-input"
                  value={form.level}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      level: e.target.value as Skill["level"],
                    })
                  }
                >
                  {levels.map((l) => (
                    <option key={l}>{l}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="btn-primary flex-1 justify-center"
                  id="save-skill-btn"
                >
                  {saving ? (
                    <Loader2 size={15} className="animate-spin" />
                  ) : (
                    <Save size={15} />
                  )}
                  {editing ? "Update" : "Add Skill"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="btn-ghost"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {deleteConfirm && (
        <div className="modal-backdrop" role="alertdialog" aria-modal="true">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle size={22} className="text-red-500" />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Delete Skill?</h3>
            <p className="text-slate-500 text-sm mb-6">
              This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 py-2.5 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors"
                id="confirm-delete-skill"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 btn-ghost justify-center"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
