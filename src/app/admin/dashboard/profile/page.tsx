"use client";

import { useState, FormEvent, useEffect } from "react";
import { Save, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { usePortfolio } from "@/lib/PortfolioContext";

export default function AdminProfile() {
  const { profile, updateProfileData } = usePortfolio();

  const [form, setForm] = useState({
    name: profile.name || "",
    headline: profile.headline || "",
    tagline: profile.tagline || "",
    about: profile.about || "",
    email: profile.email || "",
    location: profile.location || "",
    cgpa: profile.cgpa || "",
    degree: profile.degree || "",
    graduationYear: profile.graduationYear || "",
    github: profile.socialLinks?.github || "",
    linkedin: profile.socialLinks?.linkedin || "",
    leetcode: profile.socialLinks?.leetcode || "",
    resumeUrl: profile.resumeUrl || "",
  });

  useEffect(() => {
    setForm({
      name: profile.name || "",
      headline: profile.headline || "",
      tagline: profile.tagline || "",
      about: profile.about || "",
      email: profile.email || "",
      location: profile.location || "",
      cgpa: profile.cgpa || "",
      degree: profile.degree || "",
      graduationYear: profile.graduationYear || "",
      github: profile.socialLinks?.github || "",
      linkedin: profile.socialLinks?.linkedin || "",
      leetcode: profile.socialLinks?.leetcode || "",
      resumeUrl: profile.resumeUrl || "",
    });
  }, [profile]);

  const [saving, setSaving] = useState(false);

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error("Full Name cannot be empty.");
      return;
    }
    setSaving(true);
    try {
      await updateProfileData({
        name: form.name,
        headline: form.headline,
        tagline: form.tagline,
        about: form.about,
        email: form.email,
        location: form.location,
        cgpa: form.cgpa,
        degree: form.degree,
        graduationYear: form.graduationYear,
        resumeUrl: form.resumeUrl,
        socialLinks: {
          github: form.github,
          linkedin: form.linkedin,
          leetcode: form.leetcode,
        },
      });
      toast.success("Saved successfully!");
    } catch (err: unknown) {
      const eObj = err as { message?: string };
      toast.error(`Failed to save — ${eObj.message || "Check network/Firebase connection"}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8 border-b border-slate-200/80 pb-5">
        <h2 className="font-display font-bold text-2xl text-slate-900 tracking-tight">Edit Profile</h2>
        <p className="text-slate-500 text-sm mt-1">Manage your headline, bio, contact email, and hero stats.</p>
      </div>

      <form onSubmit={handleSave} className="max-w-4xl mx-auto space-y-8">
        {/* Basic info */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-display font-bold text-slate-900 text-base">Basic Information</h3>
            <p className="text-slate-400 text-xs mt-0.5">Your name, headline, and bio intro</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="admin-label">Full Name</label>
              <input className="admin-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div>
              <label className="admin-label">Headline</label>
              <input className="admin-input" value={form.headline} onChange={(e) => setForm({ ...form, headline: e.target.value })} />
            </div>
            <div>
              <label className="admin-label">Tagline</label>
              <input className="admin-input" value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} />
            </div>
            <div>
              <label className="admin-label">About (Full Bio)</label>
              <textarea className="admin-textarea min-h-[160px]" value={form.about} onChange={(e) => setForm({ ...form, about: e.target.value })} />
            </div>
            <div className="grid sm:grid-cols-2 gap-5 pt-2">
              <div>
                <label className="admin-label">Contact Email</label>
                <input className="admin-input" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              <div>
                <label className="admin-label">Location</label>
                <input className="admin-input" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
              </div>
            </div>
          </div>
        </div>

        {/* Education Display */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-display font-bold text-slate-900 text-base">Hero Section Metrics</h3>
            <p className="text-slate-400 text-xs mt-0.5">Quick stat badges displayed in your hero section</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            <div>
              <label className="admin-label">CGPA / Score</label>
              <input className="admin-input" value={form.cgpa} onChange={(e) => setForm({ ...form, cgpa: e.target.value })} />
            </div>
            <div>
              <label className="admin-label">Degree Title</label>
              <input className="admin-input" value={form.degree} onChange={(e) => setForm({ ...form, degree: e.target.value })} />
            </div>
            <div>
              <label className="admin-label">Graduation Year</label>
              <input className="admin-input" value={form.graduationYear} onChange={(e) => setForm({ ...form, graduationYear: e.target.value })} />
            </div>
          </div>
        </div>

        {/* Social links */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-display font-bold text-slate-900 text-base">Social Media & Resume</h3>
            <p className="text-slate-400 text-xs mt-0.5">Links to your profiles and resume file</p>
          </div>
          <div className="space-y-4">
            <div>
              <label className="admin-label">GitHub URL</label>
              <input className="admin-input" type="url" value={form.github} onChange={(e) => setForm({ ...form, github: e.target.value })} />
            </div>
            <div>
              <label className="admin-label">LinkedIn URL</label>
              <input className="admin-input" type="url" value={form.linkedin} onChange={(e) => setForm({ ...form, linkedin: e.target.value })} />
            </div>
            <div>
              <label className="admin-label">LeetCode URL</label>
              <input className="admin-input" type="url" value={form.leetcode} onChange={(e) => setForm({ ...form, leetcode: e.target.value })} />
            </div>
            <div>
              <label className="admin-label">Resume PDF Path</label>
              <input className="admin-input" value={form.resumeUrl} onChange={(e) => setForm({ ...form, resumeUrl: e.target.value })} placeholder="/resume/Mohammed_Shimak_A_Resume.pdf" />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button type="submit" disabled={saving} className="btn-primary px-8" id="save-profile-btn">
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            {saving ? "Saving..." : "Save Profile"}
          </button>
        </div>
      </form>
    </div>
  );
}
