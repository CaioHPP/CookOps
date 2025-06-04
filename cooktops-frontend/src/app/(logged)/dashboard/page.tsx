import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Dashboard() {
  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Dashboard CookOps</h1>
        </div>{" "}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Bem-vindo!</CardTitle>
              <CardDescription>
                Você está logado no sistema CookOps
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Sistema de gestão para restaurantes e lanchonetes
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pedidos</CardTitle>
              <CardDescription>
                Gerencie os pedidos da sua empresa
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Funcionalidade em desenvolvimento...
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Produtos</CardTitle>
              <CardDescription>Gerencie o catálogo de produtos</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Funcionalidade em desenvolvimento...
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
