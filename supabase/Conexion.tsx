import { createClient } from '@supabase/supabase-js';

// Tus credenciales de Supabase
const supabaseUrl = "https://yxjrelrixmqtrbjbxosf.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4anJlbHJpeG1xdHJiamJ4b3NmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4MTM5ODMsImV4cCI6MjA2ODM4OTk4M30.E0d98wbwgHCrOWyYp27uIW2hxUpOfgkZvdCqcI75d4M";

// Crea una única instancia del cliente Supabase para interactuar con tu base de datos
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Estas opciones son útiles para React Native para manejar la sesión de usuario
    autoRefreshToken: true, // Intenta refrescar automáticamente el token de la sesión
    persistSession: true,   // Guarda la sesión del usuario para que persista entre reinicios de la app
    detectSessionInUrl: false, // Importante para React Native, ya que no hay URL de navegador para detectar la sesión
  },
});
