/**
 * Firestore service layer
 * Provides read/write operations for all portfolio collections.
 * Public reads are allowed per security rules.
 * Writes require authenticated admin.
 */
import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "./firebase";

// ── Generic helpers ──────────────────────────────────────────────────────────

export async function getCollection<T>(collectionName: string): Promise<T[]> {
  const snap = await getDocs(collection(db, collectionName));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as T));
}

export async function getDocById<T>(collectionName: string, id: string): Promise<T | null> {
  const snap = await getDoc(doc(db, collectionName, id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as T;
}

export async function setDocument(collectionName: string, id: string, data: object) {
  await setDoc(doc(db, collectionName, id), data, { merge: true });
}

export async function addDocument(collectionName: string, data: object) {
  return await addDoc(collection(db, collectionName), data);
}

export async function updateDocument(collectionName: string, id: string, data: object) {
  await updateDoc(doc(db, collectionName, id), data);
}

export async function deleteDocument(collectionName: string, id: string) {
  await deleteDoc(doc(db, collectionName, id));
}

// ── Profile ──────────────────────────────────────────────────────────────────

export async function getProfile() {
  return getDocById("config", "profile");
}

export async function updateProfile(data: object) {
  await setDocument("config", "profile", data);
}

// ── Skills ────────────────────────────────────────────────────────────────────

export async function getSkills() {
  return getCollection("skills");
}

export async function addSkill(data: object) {
  return addDocument("skills", data);
}

export async function updateSkill(id: string, data: object) {
  return updateDocument("skills", id, data);
}

export async function deleteSkill(id: string) {
  return deleteDocument("skills", id);
}

// ── Projects ──────────────────────────────────────────────────────────────────

export async function getProjects() {
  return getCollection("projects");
}

export async function addProject(data: object) {
  return addDocument("projects", data);
}

export async function updateProject(id: string, data: object) {
  return updateDocument("projects", id, data);
}

export async function deleteProject(id: string) {
  return deleteDocument("projects", id);
}

// ── Upcoming Projects ─────────────────────────────────────────────────────────

export async function getUpcomingProjects() {
  return getCollection("upcomingProjects");
}

export async function addUpcomingProject(data: object) {
  return addDocument("upcomingProjects", data);
}

export async function updateUpcomingProject(id: string, data: object) {
  return updateDocument("upcomingProjects", id, data);
}

export async function deleteUpcomingProject(id: string) {
  return deleteDocument("upcomingProjects", id);
}

// ── Education ─────────────────────────────────────────────────────────────────

export async function getEducation() {
  return getCollection("education");
}

export async function addEducation(data: object) {
  return addDocument("education", data);
}

export async function updateEducation(id: string, data: object) {
  return updateDocument("education", id, data);
}

export async function deleteEducation(id: string) {
  return deleteDocument("education", id);
}

// ── Certifications ────────────────────────────────────────────────────────────

export async function getCertifications() {
  return getCollection("certifications");
}

export async function addCertification(data: object) {
  return addDocument("certifications", data);
}

export async function updateCertification(id: string, data: object) {
  return updateDocument("certifications", id, data);
}

export async function deleteCertification(id: string) {
  return deleteDocument("certifications", id);
}

// ── Achievements ──────────────────────────────────────────────────────────────

export async function getAchievements() {
  return getCollection("achievements");
}

export async function addAchievement(data: object) {
  return addDocument("achievements", data);
}

export async function updateAchievement(id: string, data: object) {
  return updateDocument("achievements", id, data);
}

export async function deleteAchievement(id: string) {
  return deleteDocument("achievements", id);
}
