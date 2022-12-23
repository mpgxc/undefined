import { IsNotEmpty, IsUUID, Length } from 'class-validator';

export class NotificationInput {
  @IsNotEmpty()
  @IsUUID()
  tenantId!: string;

  @IsNotEmpty()
  @Length(5, 255)
  content!: string;

  @IsNotEmpty()
  category!: string;
}
