import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const productsFiltersSchema = z.object({
  id: z.string(),
  name: z.string(),
})

type ProductsFiltersSchema = z.infer<typeof productsFiltersSchema>

export function ProductsFilters() {
  const { register, handleSubmit, formState: { errors } } = useForm<ProductsFiltersSchema>({
    resolver: zodResolver(productsFiltersSchema)
  });

  function handleFilterProducts(data: ProductsFiltersSchema) {
    console.log(data);
  }

  return (
    <form
      onSubmit={handleSubmit(handleFilterProducts)}
      className="flex items-center gap-2"
    >
      <div>
        <Input id="id" {...register("id")} placeholder="ID do pedido" aria-invalid={!!errors.id} />
        {errors.id && <p className="text-red-600" role="alert">{errors.id.message}</p>}
      </div>
      <div>
        <Input id="name" {...register("name")} placeholder="Nome do produto" aria-invalid={!!errors.name} />
        {errors.name && <p className="text-red-600" role="alert">{errors.name.message}</p>}
      </div>

      <Button type="submit" variant="link">
        <Search className="w-4 h-4 mr-2" />
        Filtrar resultado
      </Button>
    </form>
  );
}
