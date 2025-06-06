import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface MenuTableProps {
  filter?: "ativos" | "inativos";
}

// Mock data - will be replaced with real API data later
const mockProducts = [
  {
    id: 1,
    image: "/placeholder.png",
    name: "X-Burger Clássico",
    price: 25.9,
    status: "Disponível",
    description:
      "Hambúrguer artesanal 150g, queijo cheddar, alface, tomate e molho especial da casa.",
  },
  {
    id: 2,
    image: "/placeholder.png",
    name: "Batata Frita com Cheddar e Bacon",
    price: 18.9,
    status: "Disponível",
    description:
      "Batata frita crocante coberta com cheddar cremoso e bacon crocante.",
  },
  {
    id: 3,
    image: "/placeholder.png",
    name: "Milk Shake de Ovomaltine",
    price: 16.9,
    status: "Inativo",
    description:
      "Milk shake cremoso de baunilha com ovomaltine crocante e calda de chocolate.",
  },
];

export function MenuTable({ filter }: MenuTableProps) {
  const filteredProducts = mockProducts.filter((product) => {
    if (filter === "ativos") return product.status === "Disponível";
    if (filter === "inativos") return product.status === "Inativo";
    return true;
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[400px]">Item</TableHead>
          <TableHead>Preço</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="max-w-[400px]">Descrição</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredProducts.map((product) => (
          <TableRow key={product.id}>
            <TableCell>
              <div className="flex items-center gap-4">
                <div className="relative h-12 w-12 rounded-md overflow-hidden border bg-muted">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-medium">{product.name}</span>
                  <span className="text-sm text-muted-foreground">
                    #{product.id.toString().padStart(4, "0")}
                  </span>
                </div>
              </div>
            </TableCell>
            <TableCell className="font-medium">
              R$ {product.price.toFixed(2)}
            </TableCell>
            <TableCell>
              <Badge
                variant={
                  product.status === "Disponível" ? "default" : "secondary"
                }
                className={
                  product.status === "Disponível"
                    ? "bg-green-500/10 text-green-600 hover:bg-green-500/20"
                    : ""
                }
              >
                {product.status}
              </Badge>
            </TableCell>
            <TableCell className="max-w-[400px]">
              <span className="line-clamp-1 text-sm text-muted-foreground">
                {product.description}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
