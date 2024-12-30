export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      organizations: {
        Row: {
          id: string
          name: string
          type: 'Manufacturing Company' | 'Customer Brand'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          type: 'Manufacturing Company' | 'Customer Brand'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          type?: 'Manufacturing Company' | 'Customer Brand'
          created_at?: string
          updated_at?: string
        }
      }
      users: {
        Row: {
          id: string
          full_name: string
          organization_id: string
          role_id: string
          department: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name: string
          organization_id: string
          role_id: string
          department?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          organization_id?: string
          role_id?: string
          department?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      roles: {
        Row: {
          id: string
          name: string
          description: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      organization_type: 'Manufacturing Company' | 'Customer Brand'
    }
  }
}