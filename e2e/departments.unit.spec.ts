import { expect, test } from '@playwright/test'
import { loadDepartment } from '../src/lib/departments'

test('loadDepartment returns null when the database is unreachable', async () => {
  const dep = await loadDepartment('primarstufe', async () => {
    throw new Error('no db')
  })
  expect(dep).toBeNull()
})

test('loadDepartment returns null when no department has the slug', async () => {
  const dep = await loadDepartment('gibt-es-nicht', async () => ({ find: async () => ({ docs: [] }) }))
  expect(dep).toBeNull()
})
