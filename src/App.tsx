import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "./components/ui/table";
import { Button } from "./components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ProductsFilters } from "./components/products-filter";
import { PlusCircle } from "lucide-react";
import { CreateProductDialog } from "./components/create-product-dialog";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "./data/products";
import { Spinner } from "./components/Spinner";

export function App() {
const { data: products, isLoading } = useQuery({
  queryKey: ['products'],
  queryFn: getProducts
})

if (isLoading) {
  return <div className="p-6 max-w-4xl mx-auto space-y-4">
  <h1 className="text-3xl font-bold">Produtos</h1>

  <div className="flex items-center justify-between">
    <ProductsFilters />

    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="w-4 h-4 mr-2" />
          Novo produto
        </Button>
      </DialogTrigger>

      <CreateProductDialog />
    </Dialog>
  </div>

  <div className="border rounded-lg p-2">
    <Table>
      <TableHeader>
        <TableHead>ID</TableHead>
        <TableHead>Produto</TableHead>
        <TableHead>Preço</TableHead>
      </TableHeader>
      <TableBody>
        <Spinner/>
      </TableBody>
    </Table>
  </div>
</div>;
}


  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Produtos</h1>

      <div className="flex items-center justify-between">
        <ProductsFilters />

        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="w-4 h-4 mr-2" />
              Novo produto
            </Button>
          </DialogTrigger>

          <CreateProductDialog />
        </Dialog>
      </div>

      <div className="border rounded-lg p-2">
        <Table>
          <TableHeader>
            <TableHead>ID</TableHead>
            <TableHead>Produto</TableHead>
            <TableHead>Preço</TableHead>
          </TableHeader>
          <TableBody>
            {products && products.map((products) => {
              return (
                <TableRow key={products.id}>
                  <TableCell>{products.id}</TableCell>
                  <TableCell>{products.name}</TableCell>
                  <TableCell>{products.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
