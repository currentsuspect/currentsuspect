import { createClient } from '@supabase/supabase-js'

function envValue(name: string) {
  return process.env[name]?.trim() ?? ''
}

function getSupabaseUrl() {
  return envValue('NEXT_PUBLIC_SUPABASE_URL')
}

function getSupabasePublishableKey() {
  return (
    envValue('NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY') ||
    envValue('NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY') ||
    envValue('NEXT_PUBLIC_SUPABASE_ANON_KEY') ||
    ''
  )
}

export function hasSupabaseConfig() {
  return Boolean(getSupabaseUrl() && getSupabasePublishableKey())
}

export function createSupabaseClient() {
  const url = getSupabaseUrl()
  const key = getSupabasePublishableKey()

  if (!url || !key) {
    throw new Error('Supabase client configuration is missing')
  }

  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}

export function createSupabaseAdminClient() {
  const url = getSupabaseUrl()
  const serviceRoleKey = envValue('SUPABASE_SERVICE_ROLE_KEY')

  if (!url || !serviceRoleKey) {
    throw new Error('Supabase admin configuration is missing')
  }

  return createClient(url, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}
