'use server'

import { ActionResult } from '@/types/actions';

export async function getEnvVars(): Promise<ActionResult<Record<string, string>>> {
  try {
    // Process.env is available on the server
    const envs = process.env;
    
    // We'll create a simple record of keys and values
    const envRecord: Record<string, string> = {};
    
    Object.keys(envs).forEach(key => {
      envRecord[key] = envs[key] || '';
    });

    return {
      success: true,
      data: envRecord
    };
  } catch (error) {
    console.error('Error fetching env vars:', error);
    return {
      success: false,
      error: 'Failed to fetch environment variables'
    };
  }
}

