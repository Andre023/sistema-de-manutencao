-- CreateTable
CREATE TABLE "Veiculo" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "placa" TEXT NOT NULL,
    "ano_fab" INTEGER NOT NULL,
    "ano_model" INTEGER NOT NULL,
    "cor" TEXT NOT NULL,
    "combustivel" TEXT NOT NULL,
    "quilometragem" TEXT NOT NULL,
    "utilidade" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Veiculo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Revisao" (
    "id" SERIAL NOT NULL,
    "veiculo_id" INTEGER NOT NULL,
    "km_prox_rev" TEXT NOT NULL,
    "rev_feita" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Revisao_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Revisao" ADD CONSTRAINT "Revisao_veiculo_id_fkey" FOREIGN KEY ("veiculo_id") REFERENCES "Veiculo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
