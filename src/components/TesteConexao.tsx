import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export const TesteConexao = () => {
  const [texto, setTexto] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("teste_conexao")
          .select("texto")
          .limit(1)
          .maybeSingle();

        if (error) throw error;
        setTexto(data?.texto || "Nenhum texto encontrado");
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Card className="max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-lg">Teste de Conexão</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Carregando...
          </div>
        ) : error ? (
          <p className="text-destructive">Erro: {error}</p>
        ) : (
          <p className="text-foreground">{texto}</p>
        )}
      </CardContent>
    </Card>
  );
};
