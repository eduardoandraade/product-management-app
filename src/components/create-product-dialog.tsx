import React from 'react';
import {
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { DialogHeader, DialogFooter } from "./ui/dialog";
import { Input } from "./ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "@/data/products";

const createProductSchema = z.object({
  name: z.string().nonempty("O nome do produto é obrigatório"),
  price: z.coerce.number().positive("O preço deve ser um número positivo"),
});

type CreateProductsSchema = z.infer<typeof createProductSchema>;

export function CreateProductDialog() {
  const queryClient = useQueryClient();
  const dialogCloseRef = React.useRef<HTMLButtonElement>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<CreateProductsSchema>({
    resolver: zodResolver(createProductSchema),
  });

  const { mutateAsync: createProductFn } = useMutation({
    mutationFn: createProduct,
    onSuccess: (_, variables) => {
      queryClient.setQueryData<CreateProductsSchema[]>(["products"], (data = []) => {
        return [
          ...data,
          {
            id: crypto.randomUUID().slice(0, 3),
            name: variables.name,
            price: variables.price,
          },
        ];
      });

      alert('Produto cadastrado!');
      if (dialogCloseRef.current) {
        dialogCloseRef.current.click();
      }
    },
    onError: () => {
      alert("Erro ao cadastrar produto");
    }
  });

  async function handleCreateProduct(data: CreateProductsSchema) {
    try {
      await createProductFn({
        name: data.name,
        price: data.price,
      });
    } catch (err) {
      alert("Erro ao cadastrar produto");
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Novo produto</DialogTitle>
        <DialogDescription>Criar um novo produto no sistema</DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleCreateProduct)} className="space-y-6">
        <div className="grid grid-cols-4 items-center text-right gap-3">
          <Label htmlFor="name">Produto</Label>
          <Input className="col-span-3" id="name" {...register("name")} />
          {errors.name && <span className="text-red-500">{errors.name.message}</span>}
        </div>

        <div className="grid grid-cols-4 items-center text-right gap-3">
          <Label htmlFor="price">Preço</Label>
          <Input className="col-span-3" id="price" {...register("price")} />
          {errors.price && <span className="text-red-500">{errors.price.message}</span>}
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline" ref={dialogCloseRef}>
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit">Salvar</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
