-- Create teste_conexao table
CREATE TABLE public.teste_conexao (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  texto TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.teste_conexao ENABLE ROW LEVEL SECURITY;

-- Allow public read access for testing
CREATE POLICY "Allow public read access"
ON public.teste_conexao
FOR SELECT
USING (true);

-- Insert sample data
INSERT INTO public.teste_conexao (texto) VALUES ('Conexão com o banco de dados funcionando! 🎉');