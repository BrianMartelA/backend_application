import { IsNotEmpty, IsString } from 'class-validator';

// el id de la mascota viene en la url (POST /recetas-medicas/:id_mascota)
// y el usuario sale del token, asi que aca solo va el contenido de la receta
export class CreateRecetasMedicaDto {
  @IsString()
  @IsNotEmpty({ message: 'La receta no puede estar vacía' })
  medicamentos_indicaciones: string;
}
