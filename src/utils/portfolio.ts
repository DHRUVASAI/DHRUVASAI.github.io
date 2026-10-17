import type { Project } from '../data/portfolioData.ts';
import { PROJECTS } from '../data/portfolioData.ts';

export interface ContactFormData {
  fullName: string;
  email: string;
  projectType: string;
  budget: string;
  details: string;
}

export function formatHyderabadTime(date: Date = new Date()): string {
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Kolkata',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
    return formatter.format(date);
  } catch {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  }
}

export function filterProjects(projects: Project[], categoryFilter: string): Project[] {
  if (!categoryFilter || categoryFilter === 'All') {
    return projects;
  }
  return projects.filter(
    (p) =>
      p.type === categoryFilter ||
      p.tags.some((t) => t.toLowerCase().includes(categoryFilter.toLowerCase()))
  );
}

export function getProjectById(id: string): Project | undefined {
  return PROJECTS.find((p) => p.id === id);
}

export function validateContactForm(data: ContactFormData): {
  valid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your name (at least 2 characters).';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email.trim())) {
    errors.email = 'Please provide a valid email address.';
  }

  if (!data.projectType) {
    errors.projectType = 'Please select a project type or focus area.';
  }

  if (!data.details || data.details.trim().length < 5) {
    errors.details = 'Please share a brief note about what you are planning.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
}

export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  return phone;
}
