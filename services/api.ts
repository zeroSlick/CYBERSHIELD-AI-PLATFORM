
import { User, UserRole, Threat, Incident, IncidentStatus, Severity } from '../types';
import { supabase } from '../supabaseClient';

/**
 * CyberShield AI Backend Service (Supabase Powered)
 * Handles real-time data persistence and fetches.
 * Ready for future machine learning model scoring integration.
 */
class ApiService {
  
  async getThreats(): Promise<Threat[]> {
    const { data, error } = await supabase
      .from('threat_logs')
      .select('*')
      .order('timestamp', { ascending: false });
    
    if (error) {
      console.error("Error fetching threats:", error);
      return [];
    }
    return data as Threat[];
  }

  async getIncidents(): Promise<Incident[]> {
    const { data, error } = await supabase
      .from('incidents')
      .select('*')
      .order('createdAt', { ascending: false });

    if (error) {
      console.error("Error fetching incidents:", error);
      return [];
    }
    return data as Incident[];
  }

  async updateIncident(id: string, updates: Partial<Incident>): Promise<Incident | null> {
    const { data, error } = await supabase
      .from('incidents')
      .update({ ...updates, updatedAt: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error("Error updating incident:", error);
      return null;
    }
    return data as Incident;
  }

  async getUsers(): Promise<User[]> {
    // Note: Fetching users from a custom 'profiles' table is recommended in Supabase
    const { data, error } = await supabase
      .from('profiles')
      .select('*');

    if (error) {
      console.error("Error fetching users:", error);
      return [];
    }
    return data as User[];
  }

  async createUser(user: Omit<User, 'id' | 'lastLogin'>): Promise<User | null> {
    const { data, error } = await supabase
      .from('profiles')
      .insert([{ ...user, lastLogin: new Date().toISOString() }])
      .select()
      .single();

    if (error) {
      console.error("Error creating user profile:", error);
      return null;
    }
    return data as User;
  }

  // Generic helpers for REST-like interaction
  async get<T>(table: string): Promise<T[]> {
    const { data, error } = await supabase.from(table).select('*');
    if (error) throw error;
    return data as T[];
  }

  async post<T>(table: string, payload: any): Promise<T> {
    const { data, error } = await supabase.from(table).insert([payload]).select().single();
    if (error) throw error;
    return data as T;
  }
}

export const api = new ApiService();
