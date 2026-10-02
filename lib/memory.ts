import { readFile, writeFile, mkdir, rename } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import path from 'node:path';

export type MemoryKind = 'preference' | 'fact' | 'episode';
export type Memory = { id: string; kind: MemoryKind; text: string; createdAt: string };
type Store = Record<string, Memory[]>;

const FILE = path.join(process.cwd(), 'data', 'memory.json');
const MAX_PER_USER = 50;

async function load(): Promise<Store> {
  try { return JSON.parse(await readFile(FILE, 'utf8')); }
  catch { return {}; }
}

async function save(store: Store) {
  await mkdir(path.dirname(FILE), { recursive: true });
  const tmp = FILE + '.tmp';
  await writeFile(tmp, JSON.stringify(store, null, 2));
  await rename(tmp, FILE); // atomic: never leaves a half-written file
}

export async function listMemories(userId: string) {
  return (await load())[userId] ?? [];
}

export async function addMemory(userId: string, kind: MemoryKind, text: string) {
  const store = await load();
  const mine = store[userId] ?? [];
  const clean = text.trim();
  const dup = mine.find(m => m.text.toLowerCase() === clean.toLowerCase());
  if (dup) return { memory: dup, duplicate: true };

  const memory: Memory = { id: randomUUID().slice(0, 8), kind, text: clean, createdAt: new Date().toISOString() };
  store[userId] = [...mine, memory].slice(-MAX_PER_USER); // keep only the newest 50
  await save(store);
  return { memory, duplicate: false };
}

export async function searchMemories(userId: string, query: string, limit = 5) {
  const words = query.toLowerCase().split(/\W+/).filter(w => w.length > 2);
  return (await listMemories(userId))
    .map(m => ({ m, score: words.filter(w => m.text.toLowerCase().includes(w)).length }))
    .filter(x => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(x => x.m);
}

export async function forgetMemories(userId: string, id?: string) {
  const store = await load();
  const before = store[userId]?.length ?? 0;
  store[userId] = id ? (store[userId] ?? []).filter(m => m.id !== id) : [];
  await save(store);
  return before - store[userId].length;
}