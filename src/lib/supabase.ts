import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string;
          user_id: string;
          age: number;
          sex: 'male' | 'female';
          weight: number;
          height: number;
          activity_level: 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active';
          goal: 'lose' | 'maintain' | 'gain';
          current_water_intake: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['user_profiles']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['user_profiles']['Insert']>;
      };
      meals: {
        Row: {
          id: string;
          user_id: string;
          food_name: string;
          calories: number;
          protein: number;
          carbs: number;
          fat: number;
          portion: string;
          meal_type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
          meal_date: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['meals']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['meals']['Insert']>;
      };
      water_intake: {
        Row: {
          id: string;
          user_id: string;
          amount: number;
          intake_date: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['water_intake']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['water_intake']['Insert']>;
      };
    };
  };
};
