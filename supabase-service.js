import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const superbaseUrl = "https://qxtviuohozgpbhksexyj.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4dHZpdW9ob3pncGJoa3NleHlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODgzMDQzOTUsImV4cCI6MjAwMzg4MDM5NX0.KXrZPsh_3xQAj2MG_9WuaHC2X_L1QyDImrCXTcuN0jM";

const supabase = createClient(superbaseUrl, supabaseKey, {
  localStorage: AsyncStorage,
});

export { supabase };
