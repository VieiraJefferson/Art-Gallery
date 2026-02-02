// ============================================
// CONEXÃO COM SUPABASE - PALLAS GALAXY
// ============================================
const { createClient } = require('@supabase/supabase-js');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// Configuração do Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Variáveis SUPABASE_URL e SUPABASE_ANON_KEY são obrigatórias!');
  process.exit(1);
}

// Cliente público (para operações de leitura)
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Cliente admin (para operações de escrita com service key)
const supabaseAdmin = supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey)
  : supabase;

console.log('✅ Supabase configurado com sucesso!');

// Configuração do Cloudinary
const cloudinaryCloudName = process.env.CLOUDINARY_CLOUD_NAME;
const cloudinaryApiKey = process.env.CLOUDINARY_API_KEY;
const cloudinaryApiSecret = process.env.CLOUDINARY_API_SECRET;

if (cloudinaryCloudName && cloudinaryApiKey && cloudinaryApiSecret) {
  cloudinary.config({
    cloud_name: cloudinaryCloudName,
    api_key: cloudinaryApiKey,
    api_secret: cloudinaryApiSecret,
  });
  console.log('✅ Cloudinary configurado com sucesso!');
} else {
  console.warn('⚠️ Cloudinary não configurado. Upload de imagens não funcionará.');
}

module.exports = { supabase, supabaseAdmin, cloudinary };
