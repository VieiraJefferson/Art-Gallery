-- ============================================
-- SCHEMA SQL PARA SUPABASE - PALLAS GALAXY
-- ============================================
-- Execute este SQL no Supabase SQL Editor
-- https://supabase.com/dashboard/project/SEU_PROJETO/sql

-- Habilita a extensão para UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABELA: users (autenticação)
-- ============================================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin', 'editor')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABELA: collections (coleções principais)
-- ============================================
CREATE TABLE IF NOT EXISTS collections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABELA: subcollections (subcoleções/períodos)
-- ============================================
CREATE TABLE IF NOT EXISTS subcollections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  collection_id UUID NOT NULL REFERENCES collections(id) ON DELETE CASCADE,
  cover_picture_id UUID, -- será referenciado depois
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABELA: pictures (imagens)
-- ============================================
CREATE TABLE IF NOT EXISTS pictures (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  src TEXT NOT NULL, -- URL do Cloudinary
  is_cover BOOLEAN DEFAULT FALSE,
  subcollection_id UUID NOT NULL REFERENCES subcollections(id) ON DELETE CASCADE,
  uploaded_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Adiciona a FK de cover_picture após pictures existir
ALTER TABLE subcollections 
ADD CONSTRAINT fk_cover_picture 
FOREIGN KEY (cover_picture_id) REFERENCES pictures(id) ON DELETE SET NULL;

-- ============================================
-- ÍNDICES para performance
-- ============================================
CREATE INDEX idx_subcollections_collection ON subcollections(collection_id);
CREATE INDEX idx_pictures_subcollection ON pictures(subcollection_id);
CREATE INDEX idx_pictures_is_cover ON pictures(is_cover) WHERE is_cover = TRUE;
CREATE INDEX idx_users_email ON users(email);

-- ============================================
-- FUNÇÃO: atualizar updated_at automaticamente
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para atualizar updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_collections_updated_at
  BEFORE UPDATE ON collections
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subcollections_updated_at
  BEFORE UPDATE ON subcollections
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pictures_updated_at
  BEFORE UPDATE ON pictures
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- FUNÇÃO: garantir apenas uma imagem como capa por subcoleção
-- ============================================
CREATE OR REPLACE FUNCTION ensure_single_cover()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_cover = TRUE THEN
    -- Remove is_cover de outras imagens da mesma subcoleção
    UPDATE pictures 
    SET is_cover = FALSE 
    WHERE subcollection_id = NEW.subcollection_id 
      AND id != NEW.id 
      AND is_cover = TRUE;
    
    -- Atualiza o cover_picture_id da subcoleção
    UPDATE subcollections 
    SET cover_picture_id = NEW.id 
    WHERE id = NEW.subcollection_id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_ensure_single_cover
  AFTER INSERT OR UPDATE OF is_cover ON pictures
  FOR EACH ROW
  WHEN (NEW.is_cover = TRUE)
  EXECUTE FUNCTION ensure_single_cover();

-- ============================================
-- RLS (Row Level Security) - Opcional
-- ============================================
-- Descomente se quiser usar RLS

-- ALTER TABLE collections ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE subcollections ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE pictures ENABLE ROW LEVEL SECURITY;

-- Política: qualquer um pode ler
-- CREATE POLICY "Public read access" ON collections FOR SELECT USING (true);
-- CREATE POLICY "Public read access" ON subcollections FOR SELECT USING (true);
-- CREATE POLICY "Public read access" ON pictures FOR SELECT USING (true);

-- ============================================
-- VIEWS para facilitar consultas
-- ============================================

-- View: subcoleções com capa
CREATE OR REPLACE VIEW subcollections_with_cover AS
SELECT 
  s.id,
  s.name,
  s.description,
  s.collection_id,
  s.created_at,
  c.name as collection_name,
  p.id as cover_id,
  p.name as cover_name,
  p.src as cover_src,
  (SELECT COUNT(*) FROM pictures WHERE subcollection_id = s.id) as pictures_count
FROM subcollections s
LEFT JOIN collections c ON s.collection_id = c.id
LEFT JOIN pictures p ON s.cover_picture_id = p.id;

-- View: todas as coleções com subcoleções (formato similar ao MongoDB)
CREATE OR REPLACE VIEW collections_full AS
SELECT 
  c.id,
  c.name,
  c.description,
  c.created_at,
  COALESCE(
    json_agg(
      json_build_object(
        'id', s.id,
        'name', s.name,
        'description', s.description,
        'coverPicture', CASE 
          WHEN p.id IS NOT NULL THEN json_build_object('name', p.name, 'src', p.src)
          ELSE NULL
        END,
        'picturesCount', (SELECT COUNT(*) FROM pictures WHERE subcollection_id = s.id)
      )
    ) FILTER (WHERE s.id IS NOT NULL),
    '[]'
  ) as subcollections
FROM collections c
LEFT JOIN subcollections s ON s.collection_id = c.id
LEFT JOIN pictures p ON s.cover_picture_id = p.id
GROUP BY c.id, c.name, c.description, c.created_at;

-- ============================================
-- DADOS INICIAIS (exemplo)
-- ============================================
-- Descomente e edite para inserir dados iniciais

/*
-- Inserir coleção principal
INSERT INTO collections (name, description) VALUES 
('Pallas Galaxy Collection', 'Main collection of surrealist artworks');

-- Inserir subcoleções
INSERT INTO subcollections (name, collection_id) VALUES 
('2010-2012', (SELECT id FROM collections WHERE name = 'Pallas Galaxy Collection')),
('2013', (SELECT id FROM collections WHERE name = 'Pallas Galaxy Collection')),
('2014-2015', (SELECT id FROM collections WHERE name = 'Pallas Galaxy Collection')),
('2016-2018', (SELECT id FROM collections WHERE name = 'Pallas Galaxy Collection')),
('2019-2022', (SELECT id FROM collections WHERE name = 'Pallas Galaxy Collection')),
('Till Today', (SELECT id FROM collections WHERE name = 'Pallas Galaxy Collection'));
*/

-- ============================================
-- FIM DO SCHEMA
-- ============================================
