import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatHyderabadTime,
  filterProjects,
  getProjectById,
  validateContactForm,
  formatPhoneNumber
} from './portfolio.ts';
import { PROJECTS } from '../data/portfolioData.ts';

test('formatHyderabadTime formats time with AM/PM', () => {
  const sampleDate = new Date('2026-10-16T12:30:00Z');
  const formatted = formatHyderabadTime(sampleDate);
  assert.ok(typeof formatted === 'string');
  assert.match(formatted, /(AM|PM)/i);
});

test('filterProjects correctly returns all projects for All filter', () => {
  const result = filterProjects(PROJECTS, 'All');
  assert.equal(result.length, PROJECTS.length);
  assert.equal(result.length, 6);
});

test('filterProjects correctly filters by AI & Agents or Cybersecurity', () => {
  const cyber = filterProjects(PROJECTS, 'Cybersecurity');
  assert.ok(cyber.length >= 1);
  assert.equal(cyber[0].id, 'garuda-x');

  const aiProjects = filterProjects(PROJECTS, 'AI & Agents');
  assert.ok(aiProjects.length >= 2);
});

test('getProjectById retrieves exact project', () => {
  const project = getProjectById('edge');
  assert.ok(project !== undefined);
  assert.equal(project?.title, 'EDGE');
  assert.equal(project?.subtitle, 'Evidence-Driven Game Engine');
});

test('validateContactForm catches invalid inputs and passes valid inputs', () => {
  const invalid = validateContactForm({
    fullName: '',
    email: 'not-an-email',
    projectType: '',
    budget: '',
    details: ''
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.fullName);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.projectType);
  assert.ok(invalid.errors.details);

  const valid = validateContactForm({
    fullName: 'Ada Lovelace',
    email: 'ada@example.com',
    projectType: 'ai-agents',
    budget: '5k-10k',
    details: 'Interested in building an autonomous agentic network system.'
  });
  assert.equal(valid.valid, true);
  assert.equal(Object.keys(valid.errors).length, 0);
});

test('formatPhoneNumber formats 10 digit Indian numbers', () => {
  const formatted = formatPhoneNumber('8074142645');
  assert.equal(formatted, '+91 80741 42645');
});
