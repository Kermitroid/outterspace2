import { supabase } from '@/lib/supabaseClient';

export const uploadFile = async (bucketName, filePath, file) => {
  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true, 
    });

  if (error) {
    console.error(`Error uploading file to ${bucketName}:`, error);
    throw error;
  }
  
  const { data: { publicUrl } } = supabase.storage.from(bucketName).getPublicUrl(data.path);
  return { path: data.path, publicUrl };
};

export const getPublicUrl = (bucketName, filePath) => {
  if (!bucketName || !filePath) return '';
  const { data: { publicUrl } } = supabase.storage.from(bucketName).getPublicUrl(filePath);
  return publicUrl;
};