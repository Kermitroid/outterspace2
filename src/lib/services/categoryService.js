import { supabase } from '@/lib/supabaseClient';

export const getCategories = async () => {
  const { data, error } = await supabase
    .from('categories')
    .select('id, name') // Ensure 'id' is selected if needed elsewhere
    .order('name');

  if (error) {
    console.error('Error fetching categories:', error);
    return [{ id: null, name: 'All' }]; 
  }
  return [{ id: null, name: 'All' }, ...data];
};